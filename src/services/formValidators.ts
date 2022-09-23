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

export const minLength = (value: string, length: number) => {
  if(!value) {
    return true;
  }

  return `${value}`.length >= length;
};

export const exactNumbersLength = (value: string, length: number) => {
  if(!value) {
    return true;
  }

  return `${value}`.length === length;
};