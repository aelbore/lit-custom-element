[![Coverage Status](https://coveralls.io/repos/github/aelbore/lit-custom-element/badge.svg?branch=master&service=github)](https://coveralls.io/github/aelbore/lit-custom-element?branch=master)
[![Build Status](https://travis-ci.com/aelbore/lit-custom-element.svg?branch=master)](https://travis-ci.com/aelbore/lit-custom-element)
[![npm version](https://badge.fury.io/js/lit-custom-element.svg)](https://www.npmjs.com/package/lit-custom-element)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# lit-custom-element
Lightweight library for building native web components

Installation
------------

  ```
    npm install lit-custom-element
  ```

```javascript
  import { LitCustomElement, html } from 'lit-custom-element'

  class HelloWorld extends LitCustomElement {

    get message() {
      return this._message
    }

    set message(value) {
      this._message = value
      this.onPropertyChanged('message', true)
    }

    static get styles() {
      return `
        h1 { 
          color: red;
        }
      `
    }

    render() {
      return html `<h1>Hello ${this.message}!</h1>`
    }

  }

  customElements.define('hello-world', HelloWorld)
```
