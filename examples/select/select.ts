import './select-icon'
import './select-input'
import './select-option'

import { LitCustomElement, html } from 'lit-custom-element'

class SelectElement extends LitCustomElement {

  private _showContent;
  private _placeholder;
  private _selected;

  constructor() {
    super()
    this._showContent = false
    this.selected = ''
    
    this.addEventListener('ar.select', this.onSelect)
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value
    this.onPropertyChanged('placeholder', true)
  }

  get selected() {
    return this._selected
  }

  set selected(value) {
    this._selected = value;
    this.onPropertyChanged('selected')
  }

  get showContent() {
    return this._showContent;
  }

  set showContent(value) {
    this._showContent = value;
    this.onPropertyChanged('showContent', false)
  }

  onClear(e) {
    Array.from(this.querySelectorAll('ar-select-option'))
      .forEach((option: any) => option.selected = false)
  }

  onSelect(e) {
    this.selected = e.detail.label;
    this.showContent = true;
    const options: any[] = Array.from(this.querySelectorAll('ar-select-option'))
    for (const option of options) {
      if (option.value === e.detail.value) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    }
  }

  render() {
    return html `
      <style>
        ar-select-input { width: 100%; }
        .ar-dropdown {
          width: 100%;
          height: auto;
          min-height: 38px;
          color: #515256;
          position: relative;
          box-sizing: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
        } 
        .ar-dropdown-content {
          z-index: 10 !important;
          width: calc(100% - 35px);
          position: absolute;
          top: 38px;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          display: flex;
          flex-direction: column;
          left: 0;
        }
        .ar-select-options { overflow-x: auto; height: auto; max-height: 145px; }
      </style>
      <div class="ar-dropdown" tabindex="0">
        <ar-select-input 
          @ar.input.click="${e => this.showContent = !this.showContent}" 
          @clear="${this.onClear}" 
          value="${this.selected}" 
          placeholder="${this.placeholder}">
        </ar-select-input>  
        <ar-select-icon @click="${e => this.showContent = !this.showContent}"></ar-select-icon>
        <div class="ar-dropdown-content">
          <div class="ar-select-options" ?hidden="${this.showContent}">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }

}

customElements.define('ar-select', SelectElement)