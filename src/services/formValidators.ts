import { FileModel } from '@/models/files';

export const isRequired = (value: string) => (value === null || value === undefined || isNaN(Number(value))) ? false : `${value}`.trim().length > 0;

export const startsWith = (value: string, char: string) => {
  if(!value) {
    return true;
  }

  return value.charAt(0) === char;
};

export const onlyNumbers = (value: string) => {
  if(!value) {
    return true;
  }

  return /^-{0,1}\d*\.{0,1}\d+$/.test(`${value}`);
};

export const onlyAlphanumeric = (value: string) => {
  if(!value) {
    return true;
  }

  return /^[a-zA-Z0-9]*$/ig.test(`${value}`);
};

export const maxLength = (value: string, length: number) => {
  if(!value) {
    return true;
  }

  return `${value}`.length <= length;
};

export const maxValue = (value: number, valueToCompareWith: number) => {
  if(!value) {
    return true;
  }

  return value <= valueToCompareWith;
};

export const minLength = (value: string | (string | number)[], length: number) => {
  const isValueAnArray = Array.isArray(value);

  if(!value && !isValueAnArray) {
    return true;
  }

  if(isValueAnArray) {
    return value.length >= length;
  }

  return value.length >= length;
};

export const minValue = (value: number, valueToCompareWith: number) => {
  if(!value) {
    return true;
  }

  return value >= valueToCompareWith;
};

export const exactNumbersLength = (value: string, length: number) => {
  if(!value) {
    return true;
  }

  return `${value}`.length === length;
};

export const coverPhoto = (selectedFiles: FileModel[]) => {
  if(!selectedFiles.length) {
    return true;
  }
  console.log('coverPhoto', selectedFiles, selectedFiles.some((file: FileModel) => file.isPrimary));
  return selectedFiles.some((file: FileModel) => file.isPrimary);
};