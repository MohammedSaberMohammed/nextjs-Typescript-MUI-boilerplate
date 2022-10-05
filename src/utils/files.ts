import { ValidateFileModel } from '@/models/files';

const getFileSizeInBytes = (size: number) => {
  return size * 1024 * 1024;
};

const isValidFileType = (mimeType: string, accept: string) => {
  var regex = new RegExp( accept.replace( /\*/g, '.\*' ).replace( /\,/g, '|' ) );

  return regex.test(mimeType);
};

const isValidFileSize = (fileMeta: ValidateFileModel) => {
  let error = '';
  const { file, totalSize, maxFileSizeInMega, maxFilesSizeInMega, validateOnSingleFileSize } = fileMeta;
  const isValidSizeLimit = file.size <= getFileSizeInBytes(maxFileSizeInMega);

  const isValidCurrentSize = validateOnSingleFileSize ? isValidSizeLimit : true;
  const isValidWithTotalSize = maxFilesSizeInMega ? (totalSize + file.size) <= getFileSizeInBytes(maxFilesSizeInMega) : true;

  if(!isValidCurrentSize) {
    error = 'maxFileSizeExceeded';
  }      
  
  if(!isValidWithTotalSize) {
    error = 'maxFilesSizeExceeded';
  }

  return {
    error,
    isValid: isValidCurrentSize && isValidWithTotalSize,
  };
};

const isValidFile = (fileMeta: ValidateFileModel) => {
  const { accept, file } = fileMeta;
  const isValidType = isValidFileType(file.type, accept);

  if (isValidType) {
    const { isValid, error } = isValidFileSize(fileMeta);

    return {
      error,
      isValid,
    };
  } 

  return {
    isValid: false,
    error: 'invalidFileType'
  };
};

export {
  isValidFile
};