import { html } from 'lit-html'
import { LitElement } from 'lit-element'
import { LitCustomElement } from 'lit-custom-element'

class LitBooks extends LitCustomElement {

  private _books = []

  get books() {
    return this._books;
  }

  set books(value) {
    this._books = value
    this.onPropertyChanged('books')
  }

  render() {
    return html `
      <h3>Books</h3>
      <ul>${this.books.map(book => html `<li>${book.title}</li>`)}</ul>
    `
  }  

}

customElements.define('ar-books', LitBooks)

class AuthorLitElement extends LitElement {
  author; books;

  static get properties() {
    return {
      author: { type: Object },
      books: { type: Array }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.author = { firstName: '', lastName: '' }
    this.books = [
      { title: 'Game of Thrones', pages: 697 },
      { title: 'The Ice Dragon', pages: 521 }
    ]
  }

  render() {
    return html `
      <h2>Author</h2> 
      <h2>${this.author.lastName}, ${this.author.firstName}</h2>
      <ar-books .books="${this.books}"></ar-books>
    `
  }
  
}

customElements.define('ar-author', AuthorLitElement)

describe('Using LitELement', () => {
  let element: any;

  const books = [
    { title: 'Game of Thrones', pages: 697 },
    { title: 'The Ice Dragon', pages: 521 }
  ]

  const getBooks = async () => {
    await element.requestUpdate()
    return element.shadowRoot.querySelector('ar-books')    
  }

  beforeEach(() => {
    element = document.createElement('ar-author')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeAttribute(element);
  }) 

  it('should initialize properties', () => {
    const { firstName, lastName } = element.author

    expect(firstName).toEqual('')
    expect(lastName).toEqual('')
    expect(JSON.stringify(element.books)).toEqual(JSON.stringify(books))
  })

  it('should have <ar-books> element', async () => {
    const books = await getBooks()
    expect(books).toBeDefined()
  })

  it('should have <ar-books> shadowRoot.', async () => {
    const books = await getBooks()
    expect(books.shadowRoot).toBeDefined();
  })

  it('should render book list', async () => {
    const books = await getBooks()
    const h3 = books.shadowRoot.querySelector('h3')
    const ul = books.shadowRoot.querySelector('ul')

    expect(h3).toBeDefined()
    expect(h3.innerHTML).toEqual('Books')
    expect(ul).toBeDefined()
    expect(ul.querySelectorAll('li').length).toEqual(2)
  })


})