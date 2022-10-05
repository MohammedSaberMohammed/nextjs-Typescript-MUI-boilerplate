import { FC, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// Lodash
import range from 'lodash/range';
// MUI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// Styles
import classes from './attachmentField.module.scss';
// Utils
import { toast } from 'react-toastify';
import { isValidFile } from '@/utils/files';
import { FilesConfigs } from '@/configs/files';
import classNames from 'classnames';

interface FileModel {
  isPrimary: boolean;
  file: File | null
}

interface Props {
  accept?: string,
  maxAttachments?: number;
  maxFileSizeInMega?: number;
  maxFilesSizeInMega?: number;
  isMultiple?: boolean,
  validateOnSingleFileSize?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (selectedFiles: FileModel[]) => void 
}

const AttachmentField: FC<Props> = ({
  accept,
  onChange,
  isMultiple,
  maxAttachments,
  maxFileSizeInMega,
  maxFilesSizeInMega,
  validateOnSingleFileSize
}) => {
  const { t } = useTranslation('common');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileModel[]>([]);
  const [clickedAttachmentIndex, setClickedAttachmentIndex] = useState<number>(0);

  useEffect(() => {
    const models = range(maxAttachments || 1).map(() => ({
      file: null,
      isPrimary: false
    } as FileModel));

    setSelectedFiles(models);
  }, [maxAttachments]);

  useEffect(() => {
    // ? Update parent
    onChange && onChange(selectedFiles);
  }, [selectedFiles]);

  const onSelectFile = (index: number) => {
    inputRef.current?.click();

    setClickedAttachmentIndex(index);
  };

  const totalSize = useMemo(() => {
    return selectedFiles.reduce((acc: number, curr: FileModel) => {
      const {file} = curr; 
      
      return file ? acc + file.size : acc;
    }, 0);
  }, [selectedFiles]);

  const onSelectAttachment = () => {
    const files = inputRef.current?.files;

    if (files && files[0]) {
      const selectedFile = files[0];

      const { error, isValid } = isValidFile({
        accept: accept || FilesConfigs.accept,
        totalSize,
        file: selectedFile,
        maxFileSizeInMega: maxFileSizeInMega || 1,
        maxFilesSizeInMega: maxFilesSizeInMega || 5,
        validateOnSingleFileSize: validateOnSingleFileSize || false,
      });

      if(isValid) {
        setSelectedFiles((prevFiles: FileModel[]) => {
          const currentFiles = [...prevFiles];
    
          currentFiles[clickedAttachmentIndex] = {
            ...prevFiles[clickedAttachmentIndex],
            file: (files && files.length) ? files[0] : null
          };
    
          return currentFiles;
        });
      } else {
        toast(t(error), { type: 'error'  });
      }
  
      setTimeout(() => {
        if(inputRef && inputRef.current) {
          // ? Reset input Files
          // inputRef.current.files = null;
          inputRef.current.value = '';
        }
      });
    }
  };

  const onPreviewedImageClicked = (e: FormEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSelectPrimaryFile = (index: number) => {
    setSelectedFiles(prevFiles => {
      // Reset All isPrimary Fields
      const currentFiles = [...prevFiles.map((file: FileModel) => ({ 
        ...file,
        isPrimary: false
      }))];

      const clickedFile = currentFiles[index];

      currentFiles[index] = {
        ...clickedFile,
        isPrimary: true
      };

      return currentFiles;
    });
  };

  const onDeleteSelectedFile = (index: number) => {
    setSelectedFiles(prevFiles => {
      const currentFiles = [...prevFiles];

      currentFiles[index] = {
        file: null,
        isPrimary: false
      };

      return currentFiles;
    });
  };

  return (
    <div className={classes.wrapper}>
      <input 
        type='file'
        accept={accept}
        multiple={isMultiple}
        ref={inputRef}
        className={classes.input}
        onChange={onSelectAttachment}
      />

      <div className={classes.imagesWrapper}>
        {selectedFiles.map(({ file, isPrimary }: FileModel, index) => (
          <div 
            key={index} 
            className={classes.imagePlaceholder} 
            onClick={() => onSelectFile(index)}
          >
            {!file && (
              <Image 
                src='/icons/camera.svg'
                width={29}
                height={29}
                alt='camera '
              />
            )}

            {file && (
              <div 
                className={classes.selectedImage} 
                onClick={onPreviewedImageClicked}
              >
                <Image 
                  src={URL.createObjectURL(file)} 
                  width={100}
                  height={100}
                  alt={`${file.name} icon`} 
                />

                <Button 
                  variant={isPrimary ? 'contained' : 'outlined'}
                  onClick={() => onSelectPrimaryFile(index)}
                  className={classNames(classes.mainPicAction, {[classes.primary]: isPrimary})} 
                >
                  صورة الغلاف
                </Button>

                <IconButton
                  disableFocusRipple
                  disableRipple
                  className={classes.delete}
                  onClick={() => onDeleteSelectedFile(index)}
                >
                  <Image 
                    src='/icons/trash.svg' 
                    width={24}
                    height={24}
                    alt='delete icon' 
                  />
                </IconButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

AttachmentField.defaultProps = {
  accept: 'image/*',
  
  maxAttachments: 5,
  maxFileSizeInMega: 1,
  maxFilesSizeInMega: 10,
  
  isMultiple: false,
  validateOnSingleFileSize: false,

  onChange() {}
};

export default AttachmentField;
