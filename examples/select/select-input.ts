import { LitCustomElement, html } from 'lit-custom-element'

class SelectInput extends LitCustomElement {

  private _placeholder: string;
  private _value: any;

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

  render() {
    return html `
      <style>
        .ar-dropdown-input {
          background: var(--bg);
          border: var(--border);
          width: calc(22px - var(--width));
          color: var(--color-input);
          padding: var(--padding);
          margin: var(--margin);
          font-size: var(--font-size);
          line-height: var(--line-height);
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
        .ar-dropdown-input:focus { border-color: #0075b0;  }
        .ar-dropdown-input.editable { padding-right: 25px; }
        .ar-dropdown-clear {
          position: absolute;
          right: 45px;
          top: 4px;
        }
        a.ar-dropdown-clear, a.ar-dropdown-clear .fa { color: #4d4d4d; }
        a.ar-dropdown-clear:hover, a.ar-dropdown-clear .fa:hover { color: #c00; }       
      </style>
      <input class="sc-dropdown-input" type="text" placeholder="${this.placeholder}" />
      <a class="ar-dropdown-clear">
        <svg id="2db62e2c-0104-41ee-b5a7-66afaae3c7b8" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 300 300"><title>sc-x</title>
          <path d="M170.13,151.12c-1.12-1.12-1.12-2.24,0-4.47L221.58,95.2a8.48,8.48,0,0,0,2.24-4.47,8.48,8.48,0,0,0-2.24-4.47l-8.95-8.95c-1.12-1.12-3.36-1.12-4.47-1.12-2.24,0-3.36,1.12-4.47,2.24l-51.45,51.45c-1.12,1.12-2.24,1.12-4.47,0L97.43,78.42c-2.24-2.24-3.36-2.24-5.59-2.24a8.48,8.48,0,0,0-4.47,2.24l-8.95,8.95a8.48,8.48,0,0,0-2.24,4.47,8.48,8.48,0,0,0,2.24,4.47l51.45,51.45c1.12,1.12,1.12,2.24,0,4.47L78.42,203.69c-1.12,1.12-2.24,2.24-2.24,4.47a8.48,8.48,0,0,0,2.24,4.47l8.95,8.95a8.48,8.48,0,0,0,4.47,2.24,8.48,8.48,0,0,0,4.47-2.24l51.45-51.45c1.12-1.12,2.24-1.12,4.47,0l51.45,51.45a8.48,8.48,0,0,0,4.47,2.24,8.48,8.48,0,0,0,4.47-2.24l8.95-8.95a8.48,8.48,0,0,0,2.24-4.47,8.48,8.48,0,0,0-2.24-4.47Z" 
            style="fill:#024"/>
        </svg>
      </a>
    `
  }
  
}

customElements.define('ar-select-input', SelectInput)