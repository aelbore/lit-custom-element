import { LitCustomElement, html } from 'lit-custom-element'

class SelectOption extends LitCustomElement {

  private _selected: boolean;
  private _value: any;

  constructor() {
    super()
    this.addEventListener('click', () => this.selectItem())
  }
  
  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
    this.onPropertyChanged('value', true)
  }

  get selected() {
    return this._selected
  }

  set selected(value) {
    this._selected = value
    this.onPropertyChanged('selected', true)
  } 

  selectItem() {
    this.dispatchEvent(new CustomEvent('ar.select', { 
      bubbles: true, 
      composed: true,  
      detail: {
        label: this.innerHTML.trim(),
        value: this.value,
        selected: this.selected
      }
    }))
  }

  render() {
    return html `
      <style>
        .ar-select-option-item {
          line-height: 35px;
          margin: 0;
          padding: 0 10px;
          cursor: pointer;
          border-bottom: thin solid #d6d6d6;
          font-size: 14px;
        }
        .ar-select-option-item:hover {
          border-bottom: 1px solid #69be28;
          background-color: #f4feec;
          color: #3f9c35;
        }
        .ar-select-option-item.active {
          cursor: auto;
          background-color: #69be28;
          color: #fff;
        }
      </style>
      <div class="ar-select-option-item ${this.selected ? 'active': ''}">
        ${this.innerHTML.trim()}
      </div>
    `
  }

}

customElements.define('ar-select-option', SelectOption)