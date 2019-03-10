import './select-input'

import { tryParseValue } from 'lit-custom-element';

describe('SelectInput', () => {
  let element: any;

  const createElement = () => {
    const template = document.createElement('template')
    template.innerHTML = `<ar-select-input value="Orange" placeholder="Search"></ar-select-input>`
    document.body.appendChild(template.content.cloneNode(true))
  
    return document.querySelector('ar-select-input');
  }  

  beforeEach(() => {
    element = document.createElement('ar-select-input')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should have element.', () => {
    expect(element).toBeDefined();
  })

  it('should have shadowRoot.', () => {
    expect(element.shadowRoot).toBeDefined()
  })

  it('should not have attribute [value]', () => {
    expect(element.hasAttribute('value')).toBeFalsy()
  })

  it('should not have attribute [placeholder]', () => {
    expect(element.hasAttribute('placeholder')).toBeFalsy()
  })

  it('should reflect to attribute when property [value] changed', () => {
    element.value = 'Orange'
    expect(element.hasAttribute('value')).toBeTruthy()
    expect(element.getAttribute('value')).toEqual('Orange')
  })

  it('should reflect to property when [value] attribute set', () => {
    element.setAttribute('value', 'Orange')

    expect(element.value).toEqual('Orange')
  })

  it('should reflect to attribute when property [placeholder] changed', () => {
    element.placeholder = 'Search'
    expect(element.hasAttribute('placeholder')).toBeTruthy()
    expect(element.getAttribute('placeholder')).toEqual('Search')
  })

  it('should reflect to property when [placeholder] attribute set', () => {
    element.setAttribute('placeholder', 'Search')

    expect(element.placeholder).toEqual('Search')
  })

  it('should clear the value when icon x is click.', () => {
    document.body.removeChild(element)

    element = createElement()
    const oldValue = element.getAttribute('value')

    element.shadowRoot.querySelector('a').click()

    expect(element.value).not.toEqual(oldValue)
    expect(element.value).toEqual('')
  })


})