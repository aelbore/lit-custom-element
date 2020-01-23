import { LitCustomElement as CustomElement, html } from '../src/lit-custom-element'
import './styles.spec.css'

import { expect } from 'chai'

class HelloWorldStyles extends CustomElement {

  private _message;

  get message() {
    return this._message
  }

  set message(value) {
    this._message = value
    this.onPropertyChanged('message')
  }

  render() {
    return html `<h1>Hello ${ this.message}</h1>`
  }

}

customElements.define('hello-world-styles', HelloWorldStyles)

describe('HelloWorldStyles', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('hello-world-styles')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should have styles static get accessor', () => {
    const style = element.shadowRoot.querySelector('style');
    expect(style).not.to.be.null
  })

})