import { html } from 'lit-html';
import { LitCustomElement, Prop } from 'lit-custom-element';

class DecoratorPropsElement extends LitCustomElement {

  @Prop() name = 'Jane';

  render() {
    return html `
      <h1>Hello ${this.name}</h1>
    `
  }

}

customElements.define('decorator-props', DecoratorPropsElement)

describe('DecoratorPropsElement', () => {
  let element: any;

  beforeEach(() => {
    element = document.createElement('decorator-props')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeAttribute(element);
  })  

  it('should have <decorator-props></decorator-props> element.', () => {
    expect(element).toBeDefined;
  })

  it('should have attribute [name]', () => {
    expect(element.hasAttribute('name')).toBeTruthy;
  })

  it('should reflect as attribute.', () => {
    const expected = 'Maria';

    element.name = expected;
    expect(element.getAttribute('name')).toEqual(expected);
  })

  it('should not reflect as attribute.', () => {
    const expected = 'Jane';

    element.name = expected;
    expect(element.getAttribute('name')).toEqual(expected);
  })

})