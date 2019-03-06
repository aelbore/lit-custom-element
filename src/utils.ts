export const tryParseInt = (value: any) => {
  return (parseInt(value) == value && parseFloat(value) !== NaN) ? parseInt(value) : value;
}

export const getSetProps = (target) => {
  return Object.getOwnPropertyNames(target.constructor.prototype)
          .filter(s => (typeof target[s] != 'function' ))
          .filter(key => !/^(|length|arguments|caller)$/.test(key))
          .reduce((acc, cur, i) => {
            acc[cur] = null;
            return acc;
          }, {})
}

export const initProps = (target) => {
  const props = (target.constructor as any).props || {};
  const decorators = (target.constructor as any).propDecorators;
  for(const prop of Object.keys(decorators)) {
    decorators[prop] = target[prop];
  }
  return { ...props, ...decorators };
}

export const autoBind = (element) => {
  const proto = element.constructor.prototype;
  const propertyNames = Object.getOwnPropertyNames(proto)
          .filter(s => (typeof element[s] == 'function' ))
          .filter(key => !/^(prototype|name|constructor|render|connectedCallback|attributeChangedCallback)$/.test(key))

  for (const prop of propertyNames) {
    element[prop] = element[prop].bind(element)
  }
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