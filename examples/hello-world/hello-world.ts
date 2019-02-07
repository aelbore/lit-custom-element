import { html } from 'lit-html';
import { LitCustomElement } from 'lit-custom-element';

class HelloWorld extends LitCustomElement  {

  message;

  static get props() {
    return {
      message: 'World'
    }
  }

  render() {
    return html `<h1>Hello ${this.message}</h1>`
  }

}

customElements.define('hello-world', HelloWorld)

