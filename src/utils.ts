export const tryParseInt = (value: any) => {
  return (parseInt(value) == value && parseFloat(value) !== NaN) ? parseInt(value) : value;
}

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}