export const tryParseInt = (value: any) => {
  return (parseInt(value) == value && parseFloat(value) !== NaN) ? parseInt(value) : value;
}

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export const tryParseValue = (value) => {
  const pattern = /^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$/g

  if (value) {
    if (typeof value == 'boolean') {
      return (/^(true|false|^$)$/.test(value.toString()));
    }
    if (typeof value == 'string') {
      const _value = value.match(pattern);
      if (_value && Array.isArray(_value) && /^(true|false|^$)$/.test(_value[0])) {
        return JSON.parse(_value[0])
      } 
    }
  }

  return tryParseInt(value);
}