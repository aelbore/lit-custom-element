import { LitCustomElement, template } from 'lit-custom-element';

export class HelloWorld extends LitCustomElement  {

  message;

  static get props() {
    return {
      message: 'World'
    }
  }

  render() {
    return template `<h1>Hello ${this.message}</h1>`
  }

}

