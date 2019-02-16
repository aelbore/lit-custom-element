import { LitCustomElement, template, Prop } from 'lit-custom-element';

class Counter extends LitCustomElement  {

  count;

  static get props() {
    return {
      count: 0
    }
  }

  incrementCount(e: CustomEvent) {
    this.count = this.count + 1;
  }

  render() {
    return template ` 
      <button id="count" @click=${this.incrementCount}>
        ${this.count}
      </button>
    `
  }

}
customElements.define('bind-counter', Counter)

describe('Set-Bind-Methods', () => {

  let element: any;

  beforeEach(() => {
    element = document.createElement('bind-counter')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it(`should bind the method to [this].`, () => {    
    element.shadowRoot.querySelector('button').click()
    expect(element.count).toEqual(1)
    expect(element.getAttribute('count')).toEqual('1')
  })

})