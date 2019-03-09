import { LitCustomElement, html } from 'lit-custom-element'

export class SelectElement extends LitCustomElement {

  render() {
    return html `
      <style>
        :host {
          --bg: var(--select-bg, #FFFFFF);
          --border: var(--select-border, 1px solid #d6d6d6);
          --width: var(--select-width, 100%);
          --height: var(--select-height, auto);
          --min-height: var(--select-min-height, 38px);
          --margin: var(--select-margin, 0);
          --padding: var(--select-padding, 7px 15px 7px 15px);
          --line-height: var(--select-line-height, 22px);
          --color: var(--select-menu-text, #515256);
          --color-input: var(--select-input-text, #005C84);
          --font-size: var(--select-font-size, 14px);
        }  
        .ar-dropdown {
          width: var(--width);
          height: var(--height);
          min-height: var(--min-height);
          color: var(--color);
          position: relative;
          box-sizing: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
        } 
        .ar-dropdown-icon {
          align-items: center;
          display: inline-flex;
          justify-content: center;
          color: #fff;
          transition: all 0.2s ease;
          background-color: #0075b0;
          height: var(--height);
          min-height: var(--min-height);
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          width: 35px;
          cursor: pointer;
          font-size: 14px;
        }
        .ar-dropdown-icon:hover { fill: #fff; background-color: #1f89ce; }
        .ar-dropdown-icon.state-disabled { opacity: 0.5; }
      </style>
      <div class="ar-dropdown" tabindex="0">
        <ar-select-input placeholder="Enter Text"></ar-select-input>
        <i class="ar-dropdown-icon">
          <svg id="943b9e1f-cbfa-4c38-a33a-0829728d90a7" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 300 300"><title>sc-caret-up</title>
            <path d="M244.22,211.74H55.76a14.62,14.62,0,0,1-10.32-25l94.23-94.23a14.67,14.67,0,0,1,20.72,0l94.23,94.23a14.65,14.65,0,0,1-10.4,25Z" 
              style="fill:#024"/>
          </svg>  
        </i>
      </div>
    `
  }

}