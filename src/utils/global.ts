export const serializeQueryParams = (obj :{[key: string]: any}) => {
  let generatedQuery: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      generatedQuery.push(`${key}=${value}`);
    }
  });

  return generatedQuery.length ? `?${generatedQuery.join('&')}` : '';
};

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
