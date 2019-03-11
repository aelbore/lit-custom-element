[![Coverage Status](https://coveralls.io/repos/github/aelbore/lit-custom-element/badge.svg?branch=master&service=github)](https://coveralls.io/github/aelbore/lit-custom-element?branch=master)
[![Build Status](https://travis-ci.com/aelbore/lit-custom-element.svg?branch=master)](https://travis-ci.com/aelbore/lit-custom-element)
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

  class HelloName extends LitCustomElement {

    get name() {
      return this._name
    }

    set name(value) {
      this._name = value
      this.onPropertyChanged('name', true)
    }

    render() {
      return html `<h1>Hello ${this.name}!</h1>`
    }

  }

  customElements.define('hello-name', HelloName)
```