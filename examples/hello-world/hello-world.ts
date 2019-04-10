import { LitCustomElement, html } from 'lit-custom-element';
import './hello-world.css'

export class HelloWorld extends LitCustomElement  {

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

