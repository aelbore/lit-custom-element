import { LitCustomElement, Prop } from 'lit-custom-element';
import { html } from 'lit-html';

class DecoratorPropsElement extends LitCustomElement {

  @Prop() name = 'Jane';
  @Prop() age = 18;

  render() {
    return html `
      <h1>Name: ${this.name}, age: ${this.age}</h1>
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
    expect(element).toBeDefined();
  })

  it('should have attribute [name] and [age]', () => {
    expect(element.hasAttribute('name')).toBeTruthy();
    expect(element.hasAttribute('age')).toBeTruthy();
  })

  it('should initialize attribute and property to default value.', () => {
    expect(element.getAttribute('name')).toEqual('Jane')
    expect(element.hasAttribute('age')).toBeTruthy(18);
  })

  it('should parse the prop into int.', () => {
    expect(typeof element.age == 'number').toBeTruthy()
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