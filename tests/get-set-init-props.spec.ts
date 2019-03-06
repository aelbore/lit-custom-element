import { LitCustomElement, html } from 'lit-custom-element'

describe('GetSetInitProps', () => {
  customElements.define('get-set-init-props', class extends LitCustomElement {

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
  
  })

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

describe('NotReflectToAttribute', () => {
  customElements.define('not-reflect-to-attribute', class extends LitCustomElement {

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
  
  })

  let element;

  beforeEach(() => {
    element = document.createElement('not-reflect-to-attribute')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should not reflect to attribute when [attribute: false], [name] has a value', () => {
    expect(element.hasAttribute('name')).toBeFalsy()
  })

})

describe('NotReflectToAttributeWhenPropUndefined', () => {
  customElements.define('not-reflect-to-attribute-when-prop-undefined', class extends LitCustomElement {

    private _name;
  
    initPropAccessors(props) {
      props.forEach(prop => {
        this.propertyChanged(prop, false)
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
  
  })

  let element;

  beforeEach(() => {
    element = document.createElement('not-reflect-to-attribute-when-prop-undefined')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should not reflect to attribute when [attribute: false], [name: undefined]', () => {
    expect(element.name).toBeUndefined()
    expect(element.hasAttribute('name')).toBeFalsy()
  })

  it('should have [name] attribute when property changed and config attribute to false', () => {
    element.name = "Maria"
    expect(element.hasAttribute('name')).toBeFalsy()
  })

})