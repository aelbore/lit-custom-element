import { render } from 'lit-html';
import { toKebabCase, tryParseInt } from './utils';

const copyProps = (element, props) => {
  for (const prop of Object.keys(props)) {
    const propName = toKebabCase(prop);
    Object.defineProperty(element, prop, {
      get() { return element.values.get(propName) },
      set(value) { this.setAttribute(propName, value) }
    })
    element.setAttribute(propName, props[prop])
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

export class LitCustomElement extends HTMLElement {

  protected static propDecorators = {};
  protected values = new Map()

  static get observedAttributes() {
    return Object.keys({ ...((this as any).props || {}), ...this.propDecorators })
      .map(prop => toKebabCase(prop));
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue !== newValue) {
      this.__render();
    }
  }

  setAttribute(qualifiedName, value) {
    this.values.set(qualifiedName, tryParseInt(value));
    super.setAttribute(qualifiedName, this.values.get(qualifiedName))
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    
    this.__render()
    copyProps(this, initProps(this))
  }

  __render() {
    const template = (this as any).render();
    render(template, this.shadowRoot)
  }

}