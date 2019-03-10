import { LitCustomElement, html } from 'lit-custom-element'

class SelectIcon extends LitCustomElement {

  private _flip;

  get flip() {
    return this._flip
  }

  set flip(value) {
    this._flip = value
  }

  render() {
    return html `
      <style>
        .flip-vertical svg {
          transform: scale(-1, -1);
        }
        .ar-select-icon {
          align-items: center;
          display: inline-flex;
          justify-content: center;
          color: #fff;
          transition: all 0.2s ease;
          height: auto;
          min-height: 37px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          width: 35px;
          cursor: pointer;
          font-size: 14px;
          border: .5px solid #ccc;
          border-left: 0px;
        }
        .ar-select-icon svg { height: 16px; }
        .ar-select-icon:hover { fill: #fff; }
        .ar-select-icon.state-disabled { opacity: 0.5; }      
      </style>
      <i class="ar-select-icon flip-vertical">
        <svg id="943b9e1f-cbfa-4c38-a33a-0829728d90a7" 
          data-name="Layer 1" 
          viewBox="0 0 300 300"><title>caret-up</title>
          <path d="M244.22,211.74H55.76a14.62,14.62,0,0,1-10.32-25l94.23-94.23a14.67,14.67,0,0,1,20.72,0l94.23,94.23a14.65,14.65,0,0,1-10.4,25Z" 
            style="fill:#024"/>
        </svg>  
      </i>      
    `
  }

}

customElements.define('ar-select-icon', SelectIcon)