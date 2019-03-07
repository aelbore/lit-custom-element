import { LitCustomElement, html } from 'lit-custom-element'

export class HelloName extends LitCustomElement {

  private _name;

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value
    this.onPropertyChanged('name')
  }

  render() {
    return html `<h1>Hello ${this.name}</h1>`
  }

}