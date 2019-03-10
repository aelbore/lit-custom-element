import './select'

describe('SelectElement', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('ar-select')
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

  it('should not have attribute [placeholder]', () => {
    expect(element.hasAttribute('placeholder')).toBeFalsy()
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

})