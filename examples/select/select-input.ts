import { LitCustomElement, html } from 'lit-custom-element'

class SelectInput extends LitCustomElement {

  private _value;
  private _placeholder;

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
    this.onPropertyChanged('value', true)
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value
    this.onPropertyChanged('placeholder', true)
  }

  onClear(e) {
    const oldValue = this.value;
    this.value = '';
    
    this.dispatchEvent(new CustomEvent('clear', {
      detail: { value: this.value, oldValue: oldValue }
    }))
  }

  onClick(e) {
    this.dispatchEvent(new CustomEvent('ar.input.click', {
      detail: { value: this.value }
    }))
  }

  render() {
    return html `
      <style>
       .ar-dropdown-input {
          background: #FFFFFF;
          border: 1px solid #d6d6d6;
          width: 100%;
          color: #515256;
          padding: 7px 15px 7px 15px;
          margin: 0;
          font-size: 14px;
          line-height: 22px;
          box-sizing: border-box;
          flex-grow: 1;
          height: inherit;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          outline: none;
        }   
        .ar-dropdown-input:disabled {
          color: #222;
          background-color: #fff;
          opacity: 0.75;
          cursor: not-allowed;
        }
        .ar-dropdown-clear {
          position: absolute;
          cursor: pointer;
          right: 37px;
          height: 23px;
          top: 8px;
        }
        .ar-dropdown-clear svg { height: 23px; }
        .ar-dropdown-input:focus { border-color: #0075b0;  }
        .ar-dropdown-input.editable { padding-right: 25px; }
        
        a.ar-dropdown-clear, a.ar-dropdown-clear .fa { color: #4d4d4d; }
        a.ar-dropdown-clear:hover, a.ar-dropdown-clear .fa:hover { color: #c00; }
      </style>
      <input 
        @click="${this.onClick}" 
        value="${this.value}" 
        placeholder="${this.placeholder}" 
        class="ar-dropdown-input" type="text" 
      />
      <a @click="${this.onClear}" class="ar-dropdown-clear">
        <svg data-name="Capa 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 300 300">
          <path d="M170.08 151.07c-1.12-1.12-1.12-2.24 0-4.47l51.45-51.45a8.48 8.48 0 0 0 2.24-4.47 8.48 8.48 0 0 0-2.24-4.47l-8.95-8.95c-1.12-1.12-3.36-1.12-4.47-1.12-2.24 0-3.36 1.12-4.47 2.24l-51.45 51.45c-1.12 1.12-2.24 1.12-4.47 0L97.38 78.37c-2.24-2.24-3.36-2.24-5.59-2.24a8.48 8.48 0 0 0-4.47 2.24l-8.95 8.95a8.48 8.48 0 0 0-2.24 4.47 8.48 8.48 0 0 0 2.24 4.47l51.45 51.45c1.12 1.12 1.12 2.24 0 4.47l-51.45 51.46c-1.12 1.12-2.24 2.24-2.24 4.47a8.48 8.48 0 0 0 2.24 4.47l8.95 8.95a8.48 8.48 0 0 0 4.47 2.24 8.48 8.48 0 0 0 4.47-2.24l51.45-51.45c1.12-1.12 2.24-1.12 4.47 0l51.45 51.45a8.48 8.48 0 0 0 4.47 2.24 8.48 8.48 0 0 0 4.47-2.24l8.95-8.95a8.48 8.48 0 0 0 2.24-4.47 8.48 8.48 0 0 0-2.24-4.47z"/>
        </svg>
      </a>
    `
  }
  
}

customElements.define('ar-select-input', SelectInput)