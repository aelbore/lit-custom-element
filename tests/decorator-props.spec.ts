import { LitCustomElement, Prop, template } from 'lit-custom-element';

class DecoratorPropsElement extends LitCustomElement {

  @Prop() name = 'Jane';
  @Prop() age = 18;

  render() {
    return template `
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
    expect(element).toBeDefined;
  })

  it('should have attribute [name]', () => {
    expect(element.hasAttribute('name')).toBeTruthy;
  })

  it('should parse the prop into int.', () => {
    expect(typeof element.age == 'number').toBeTruthy
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