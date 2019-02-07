import { render, TemplateResult, defaultTemplateProcessor } from 'lit-html';
import { toKebabCase, tryParseInt } from './utils';

const copyProps = (element, props) => {
  for (const prop of Object.keys(props)) {
    const propName = toKebabCase(prop);
    Object.defineProperty(element, prop, {
      get() { return element.values.get(propName) },
      set(value) { 
        this.values.set(propName, tryParseInt(value))
        this.setAttribute(propName, value) 
      }
    })
    element.values.set(propName, tryParseInt(props[prop]))
    element.setAttribute(propName, element.values.get(propName))
  }
}

const initProps = (target) => {
  const props = (target.constructor as any).props || {};
  const decorators = (target.constructor as any).propDecorators;
  for (const prop of Object.keys(decorators)) {
    props[prop] = target[prop];
  }
  return props;
}

const renderTemplate = (element: any) => {
  render((element as any).render(), element.shadowRoot)
}

export const template = (strings, ...values) => 
  new TemplateResult(strings, values, 'html', defaultTemplateProcessor)

export class LitCustomElement extends HTMLElement {

  protected static propDecorators = {};
  protected values = new Map()

  static get observedAttributes() {
    return Object.keys({ ...((this as any).props || {}), ...this.propDecorators })
      .map(prop => toKebabCase(prop));
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue !== newValue) {
      renderTemplate(this)
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    
    renderTemplate(this)
    copyProps(this, initProps(this))
  }

}