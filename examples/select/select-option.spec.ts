import './select-option'

import { tryParseValue } from 'lit-custom-element'

describe('SelectOption', () => {
  let element: any;

  const createElement = () => {
    const template = document.createElement('template')
    template.innerHTML = `
      <ar-select-option value="orange" selected="true">Orange</ar-select-option>
    `
    document.body.appendChild(template.content.cloneNode(true))
  
    return document.querySelector('ar-select-option');
  }

  beforeEach(() => {
    element = document.createElement('ar-select-option')
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

  it('should not have attribute [selected]', () => {
    expect(element.hasAttribute('selected')).toBeFalsy()
  })

  it('should reflect to attribute when property [value] changed', () => {
    element.value = 'orange'
    expect(element.hasAttribute('value')).toBeTruthy()
    expect(element.getAttribute('value')).toEqual('orange')
  })

  it('should reflect to property when selected attribute set to [false]', () => {
    element.setAttribute('selected', false)

    expect(element.selected).toEqual(false)
    expect(element.selected)
      .toEqual(tryParseValue(element.getAttribute('selected')))
  })

  it('should selected when selected property changed and set to [true]', () => {
    element.selected = true;

    expect(element.shadowRoot.querySelector('div').classList).
      toContain('active')
  })

  it('should reflect to property when selected attribute set to [true]', () => {
    element.setAttribute('selected', true)

    expect(element.selected).toEqual(true)
    expect(element.selected)
      .toEqual(tryParseValue(element.getAttribute('selected')))
  })

  it('should not selected when selected property changed and set to [false].', () => {
    element.selected = false;
    
    expect(element.shadowRoot.querySelector('div').classList)
      .not.toContain('active')
  })

  it('should dispatch event when element click.', (done) => {
    document.body.removeChild(element)

    element = createElement()

    element.addEventListener('ar.select', (e) => {
      expect(e.detail.label).toEqual('Orange')
      expect(e.detail.value).toEqual('orange')
      expect(e.detail.selected).toEqual(true)
      done()
    })
    element.click()
  })

})