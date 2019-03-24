import { LitCustomElement } from 'lit-custom-element';
import { html } from 'lit-html';

class StaticPropsElement extends LitCustomElement {

  message;

  static get props() {
    return {  
      message: 'World'
    }
  }

  render() {
    return html `
      <h1>Hello ${this.message}</h1>
    `
  }

}

customElements.define('static-props', StaticPropsElement)

describe('StaticPropsElement', () => {
  let element: any;

  beforeEach(() => {
    element = document.createElement('static-props')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeAttribute(element);
  })  

  it('should have <static-props></static-props> element.', () => {
    expect(element).toBeDefined();
  })

  it('should have shadowRoot.', () => {
    expect(element.shadowRoot).toBeDefined();
  })

  it('should have attribute [message]', () => {
    expect(element.hasAttribute('message')).toBeTruthy();
  })

  it('should have initial value.', () => {
    expect(element.getAttribute('message')).toEqual('World');
  })

})