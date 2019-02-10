import { LitCustomElement, template } from 'lit-custom-element';

class BooleanProps extends LitCustomElement {

  checked;

  static get props() {
    return {
      checked: false
    }
  }

  render() {
    return template `
      <div class="${ this.checked ? 'checked': '' }"></div>
    `
  }

}

customElements.define('boolean-props', BooleanProps);

describe('BooleanProps', () => {

  let element: any;

  beforeEach(() => {
    element = document.createElement('boolean-props')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element);
  })  

  it('should have <boolean-props></boolean-props> element.', () => {
    expect(element).toBeDefined();
  })

  it('should have attribute [checked]', () => {
    expect(element.hasAttribute('checked')).toBeTruthy();
  })

  it('should initialize attribute or property to default value.', () => {
    expect(element.getAttribute('checked')).toEqual('false')
    expect(element.checked).toEqual(false)
  })

  it('should have initialize attribute thru element create.', () => {
    document.body.removeChild(element)

    const template = document.createElement('template');
    template.innerHTML = `<boolean-props checked="true"></boolean-props>`;
    document.body.appendChild(document.importNode(template.content, true));

    element = document.body.querySelector('boolean-props');
    const shadowRoot = element.shadowRoot;

    expect(element).toBeDefined()
    expect(shadowRoot).toBeDefined()
    expect(element.getAttribute('checked')).toEqual('true')
    expect(typeof element.checked == 'boolean').toBeTruthy()
    expect(element.checked).toEqual(true)
    expect(shadowRoot.querySelector('div').getAttribute('class')).toContain('checked')
  })

})