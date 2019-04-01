import { LitCustomElement, Prop, html } from 'lit-custom-element';
import './counter.css'

export class Counter extends LitCustomElement  {

  @Prop() count = 0;

  incrementCount(e: CustomEvent) {
    this.count = this.count + 1;
  }

  render() {
    return html `
      <button id="count" @click=${this.incrementCount}>
        ${this.count}
      </button>
    `
  }

}
