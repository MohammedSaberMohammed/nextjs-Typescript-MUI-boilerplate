export interface FileModel {
  isPrimary: boolean;
  file: File | null
}

export interface ValidateFileModel {
  file: File,
  accept: string,
  totalSize: number,
  validateOnSingleFileSize: boolean,
  maxFileSizeInMega: number,
  maxFilesSizeInMega?: number
}