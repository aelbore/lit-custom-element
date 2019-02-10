import { render, html, TemplateResult, defaultTemplateProcessor } from 'lit-html';
import { toKebabCase, tryParseValue } from './utils';

const initProps = (target) => {
  const props = (target.constructor as any).props || {};
  const decorators = (target.constructor as any).propDecorators;
  for(const prop of Object.keys(decorators)) {
    decorators[prop] = target[prop];
  }
  return { ...props, ...decorators };
}

const renderTemplate = (element: any) => {
  render((element as any).render(), element.shadowRoot)
}

export { html }

export const template = (strings, ...values) => 
  new TemplateResult(strings, values, 'html', defaultTemplateProcessor)

export class LitCustomElement extends HTMLElement {

  protected static propDecorators = {};
  protected values = new Map();

  static get observedAttributes() {
    return Object.keys({ ...(this.constructor as any).props, ...this.propDecorators })
      .map(prop => toKebabCase(prop));
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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