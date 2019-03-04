import { render, html, TemplateResult, defaultTemplateProcessor } from 'lit-html';
import { toKebabCase, tryParseValue, initProps, autoBind, getSetProps } from './utils';

const renderTemplate = (element: any) => {
  render((element as any).render(), element.shadowRoot)
}

export { html }

export const template = (strings, ...values) => 
  new TemplateResult(strings, values, 'html', defaultTemplateProcessor)

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
      renderTemplate(this);
    }
  }

  setAttribute(qualifiedName: string, value: string) {
    this.values.set(qualifiedName, tryParseValue(value))
    super.setAttribute(qualifiedName, this.values.get(qualifiedName))
  }

  connectedCallback() {
    const props = initProps(this);

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