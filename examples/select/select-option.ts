import { LitCustomElement, html } from 'lit-custom-element'

class SelectOption extends LitCustomElement {

  private _value;
  private _selected;

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
        selected: this.selected || false
      }
    }))
  }

  render() {
    return html `
      <style>
        .ar-select-option-item {
          line-height: 35px;
          margin: 0;
          padding: 0 15px;
          cursor: pointer;
          border-bottom: thin solid #ccc;
          font-size: 0.90em;
          font-family: Arial, Helvetica, sans-serif;
        }
        .ar-select-option-item:hover {
          border-bottom-color: #1668d3;
          background-color: #1668d3;
          color: #fff;
        }
        .ar-select-option-item.active {
          border-bottom-color: #0A3874;
          background-color: #0A3874;
          color:#FFF;
        }
      </style>
      <div class="ar-select-option-item ${this.selected ? 'active': ''}">
        ${this.innerHTML.trim()}
      </div>
    `
  }

}

customElements.define('ar-select-option', SelectOption)