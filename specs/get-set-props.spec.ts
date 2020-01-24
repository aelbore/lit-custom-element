import { LitCustomElement } from 'lit-custom-element'
import { html } from 'lit-html'

import { expect } from 'chai'

class GetSetProps extends LitCustomElement {

  private _name;

  initPropAccessors(props) {
    props.forEach(prop => {
      this.propertyChanged(prop)
    })
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value
  }

  render() {
    return html `<h1>Hello ${this.name}</h1>`
  }

}

customElements.define('get-set-props', GetSetProps)

describe('GetSetProps', () => {
  let element;

  const createElement = () => {
    const template = document.createElement('template')
    template.innerHTML = `<get-set-props name="Jane"></get-set-props>`
    document.body.appendChild(template.content.cloneNode(true))
  
    return document.querySelector('get-set-props');
  }

  beforeEach(() => {
    element = document.createElement('get-set-props')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  xit('should have no attribute [name]', () => {
    expect(element.hasAttribute('name')).to.be.false
  })

  it('should rerender when property changed.', () => {
    const oldValue = element.shadowRoot.innerHTML.replace(/<!---->/g, '')

    element.name = "Maria"
    const newValue = element.shadowRoot.innerHTML.replace(/<!---->/g, '')

    expect(oldValue).not.equal(newValue)
    expect(newValue).equal('<h1>Hello Maria</h1>')
  })

  it('should not rerender when property doesnt changed', () => {
    element.name = "Maria"
    const oldValue = element.shadowRoot.innerHTML.replace(/<!---->/g, '')

    element.name = "Maria"
    const newValue = element.shadowRoot.innerHTML.replace(/<!---->/g, '')

    expect(oldValue).equal(newValue)
    expect(oldValue).equal('<h1>Hello Maria</h1>')
    expect(newValue).equal('<h1>Hello Maria</h1>')
  })

  it('should set the property when attribute changed', () => {
    element.setAttribute('name', 'Maria')
    expect(element.name).equal(element.getAttribute('name'))
  })

  it('should set the property when attribute initialize.', () => {
    document.body.removeChild(element)

    element = createElement()

    expect(element.name).equal(element.getAttribute('name'))
  })

})