import { render, html } from 'lit-html';
import { toKebabCase, tryParseValue, initProps, autoBind, getSetProps } from './utils';

const renderTemplate = (rootElement: HTMLElement | ShadowRoot) => {
  /// @ts-ignore
  render(rootElement.render(), rootElement.shadowRoot)
}

export const Prop = () => {
  return (target, propName) => {
    target.constructor.propDecorators[propName] = null;
  }
}

export { html }

export class LitCustomElement extends HTMLElement {

  protected static propDecorators = {};
  protected static fieldProps = {};
  protected values = new Map();

  static get observedAttributes() {
    this.fieldProps = { ...getSetProps(this) }
    return Object.keys({ ...(this.constructor as any).props, ...this.propDecorators, ...this.fieldProps })
      .map(prop => toKebabCase(prop));
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    autoBind(this)
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    oldValue = tryParseValue(oldValue), newValue = tryParseValue(newValue)
    if (oldValue !== newValue) {
      if (this[name] !== newValue) {
        this[name] = newValue
      }
      renderTemplate(this)
    }
  }

  setAttribute(qualifiedName: string, value: string) {
    this.values.set(qualifiedName, tryParseValue(value))
    super.setAttribute(qualifiedName, this.values.get(qualifiedName))
  }

  propertyChanged(prop: string, attribute: boolean = true) {
    const descriptor = Object.getOwnPropertyDescriptor(this.constructor.prototype, prop)
    Object.defineProperty(this, prop, { 
      ...descriptor, 
      get() {
        return descriptor.get.call(this)
      },
      set(value) {
        descriptor.set.call(this, value)
        this.onPropertyChanged(prop, attribute)
      }
    })  
    if (attribute && this[prop]) {
      this.setAttribute(prop, this[prop])
    }   
  }

  onPropertyChanged(propName: string, attribute?: boolean) {
    const propValue = tryParseValue(this[propName])
    if (this.values.get(propName) !== propValue) { 
      this.values.set(propName, propValue)
      if (attribute) {
        super.setAttribute(propName, propValue)
      } 
      renderTemplate(this)
    }
  }

  connectedCallback() {
    const props = initProps(this);

    /// @ts-ignore
    this.initPropAccessors &&
      /// @ts-ignore
      this.initPropAccessors(Object.keys(this.constructor.fieldProps))      

    for (const prop of Object.keys(props)) {
      const propName = toKebabCase(prop);
      Object.defineProperty(this, prop, {
        get() { return this.values.get(propName) },
        set(value) { this.setAttribute(propName, value) }
      })
      if (this.hasAttribute(propName)) {
        this.setAttribute(propName, this.getAttribute(propName)) 
      } else {
        this.setAttribute(propName, props[prop])
      }
    }

    renderTemplate(this);
  }

}