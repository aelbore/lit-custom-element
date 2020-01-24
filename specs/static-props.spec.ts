import { LitCustomElement } from 'lit-custom-element';
import { html } from 'lit-html';

import { expect, assert } from 'chai'

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
    assert.ok(element)
  })

  it('should have shadowRoot.', () => {
    assert.ok(element.shadowRoot)
  })

  it('should have attribute [message]', () => {
    expect(element.hasAttribute('message')).to.be.true
  })

  it('should have initial value.', () => {
    expect(element.getAttribute('message')).equal('World');
  })

})