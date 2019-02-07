import { html } from 'lit-html';
import { LitCustomElement, Prop } from 'lit-custom-element';

class Counter extends LitCustomElement  {

  @Prop() count = 0;

  incrementCount(e: CustomEvent) {
    this.count = this.count + 1;
  }

  render() {
    return html `
      <style>
        :host {
          display: inline-block;
        }
        :host button {
          width: 50px;
          height: 50px;
          color: white;
          background-color: #000;
          border: 0;
          border-radius: 5px;
          font-size: 20px;
          outline: none;
          cursor: pointer;
        }  
      </style>  
      <button id="count" @click=${this.incrementCount.bind(this)}>
        ${this.count}
      </button>
    `
  }

}

customElements.define('ar-counter', Counter)

