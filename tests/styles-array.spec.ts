import { LitCustomElement as CustomElement, html } from 'lit-custom-element'
import './styles.spec.css'
import './styles-array.spec.css'

class HelloWorldArrayStyles extends CustomElement {

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

customElements.define('hello-world-array-styles', HelloWorldArrayStyles)

describe('HelloWorldArrayStyles', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('hello-world-array-styles')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should have styles static get accessor', () => {
    const style = element.shadowRoot.querySelector('style');    
    
    expect(style).not.toBeNull()
  })

})