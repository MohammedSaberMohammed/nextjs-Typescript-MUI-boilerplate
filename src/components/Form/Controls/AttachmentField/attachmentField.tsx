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
import { FileModel } from '@/models/files';

interface Props {
  name: string,
  label?: string,
  accept?: string,
  value?: FileModel[],
  maxAttachments?: number;
  maxFileSizeInMega?: number;
  maxFilesSizeInMega?: number;
  isMultiple?: boolean,
  validateOnSingleFileSize?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (name:string, selectedFiles: FileModel[]) => void 
}

const AttachmentField: FC<Props> = ({
  name,
  value,
  label,
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

  const loadInitialAttachments = () => {
    const models = range(maxAttachments || 1).map(() => ({
      file: null,
      isPrimary: false
    } as FileModel));

    setSelectedFiles(models);
  };

  useEffect(() => {
    loadInitialAttachments();
  }, [maxAttachments]);

  const isValidSelectedAttachments = useMemo(() => selectedFiles.some((file: FileModel) => Boolean(file)), [selectedFiles]);

  useEffect(() => {
    const isEmptyValueAndSelectedFiles = (value && !value.length);

    if(isEmptyValueAndSelectedFiles && isValidSelectedAttachments) {
      loadInitialAttachments();
    }
  }, [value, isValidSelectedAttachments]);
  
  useEffect(() => {
    // ? Update parent
    onChange && onChange(name, selectedFiles);
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

  const computedSelectedFiles = useMemo(() => {
    return selectedFiles.map((selectedFile: FileModel) => ({ 
      ...selectedFile,
      previewedFile: selectedFile.file ? URL?.createObjectURL(selectedFile.file) : null
    }));
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
    // ! Only update in case of different primary is selected 
    if(!selectedFiles[index].isPrimary) {
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
    }
  };

  const onDeleteSelectedFile = (index: number) => {
    setSelectedFiles(prevFiles => {
      const currentFiles = [...prevFiles];

      currentFiles[index] = {
        file: null,
        isPrimary: false,
        previewedFile:null,
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

      <p className={classes.label}>{label}</p>

      <div className={classes.imagesWrapper}>
        {computedSelectedFiles.map(({ file, isPrimary, previewedFile }: FileModel, index) => (
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
                  src={previewedFile} 
                  layout='fill'
                  objectFit='cover'
                  alt={`${file.name} icon`} 
                />

                <Button 
                  variant={isPrimary ? 'contained' : 'outlined'}
                  onClick={() => onSelectPrimaryFile(index)}
                  className={classNames(classes.mainPicAction, {[classes.primary]: isPrimary})} 
                >
                  {t('coverPhoto')}
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
  label: '',
  accept: 'image/*',
  
  value: [],

  maxAttachments: 5,
  maxFileSizeInMega: 1,
  maxFilesSizeInMega: 10,
  
  isMultiple: false,
  validateOnSingleFileSize: false,

  onChange() {}
};

export default AttachmentField;
