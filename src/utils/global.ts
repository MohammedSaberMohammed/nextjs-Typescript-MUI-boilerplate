export const serializeQueryParams = (obj :{[key: string]: any}) => {
  let generatedQuery: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if ((typeof value === 'string' && value) || typeof value === 'number') {
      generatedQuery.push(`${key}=${value}`);
    }

    if(Array.isArray(value) && value.length) {
      value.forEach((param: any) => generatedQuery.push(`${key}=${param}`));
    }
  });

  return generatedQuery.length ? `?${generatedQuery.join('&')}` : '';
};

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
