import { LitCustomElement, html } from 'lit-custom-element'

class GetSetProps extends LitCustomElement {

  private _name;

  initPropAccessors(props) {
    props.forEach(prop => {
      this.propertyChanged(prop)
    })
  }

  constructor() {
    super()
    this._name = "Jane"
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

customElements.define('get-set-init-props', GetSetProps)

describe('GetSetInitProps', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('get-set-init-props')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should have attribute [name]', () => {
    expect(element.hasAttribute('name')).toBeTruthy()
  })

})

class NotReflectToAttribute extends LitCustomElement {

  private _name;

  initPropAccessors(props) {
    props.forEach(prop => {
      this.propertyChanged(prop, false)
    })
  }

  constructor() {
    super()
    this._name = "Jane"
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

customElements.define('not-reflect-to-attribute', NotReflectToAttribute)

describe('NotReflectToAttribute', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('not-reflect-to-attribute')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should not reflect to attribute', () => {
    expect(element.hasAttribute('name')).toBeFalsy()
  })

})