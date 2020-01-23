import { LitCustomElement, Prop } from '../src/lit-custom-element'
import { html } from 'lit-html'

import { assert, expect } from 'chai'

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
    assert.ok(element)
  })

  it('should have attribute [name] and [age]', () => {
    expect(element.hasAttribute('name')).to.be.true
    expect(element.hasAttribute('age')).to.be.true
  })

  it('should initialize attribute and property to default value.', () => {
    expect(element.getAttribute('name')).equal('Jane')
    expect(element.hasAttribute('age')).to.be.true
  })

  it('should parse the prop into int.', () => {
    expect(typeof element.age == 'number').to.be.true
  })

  it('should reflect as attribute.', () => {
    const expected = 'Maria';

    element.name = expected;
    expect(element.getAttribute('name')).equal(expected);
  })

  it('should not reflect as attribute.', () => {
    const expected = 'Jane';

    element.name = expected;
    expect(element.getAttribute('name')).equal(expected);
  })

})