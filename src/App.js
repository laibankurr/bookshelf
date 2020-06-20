import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch.js'
import BookList from './BookList.js'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount(){
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  shelfUpdate = (book, newShelf) => {
    book.shelf = newShelf
    BooksAPI.update(book, newShelf).then(
      this.setState(state => ({
        books: state.books.filter(data => data.id !== book.id).concat(book)
      }))
    )
  }

  searchBook = (query) => {
    BooksAPI.search(query).then((results) => {
      if(results && !results.error) {
        this.setState({
         searchedBooks: results
        })
      }
    })}

  render() {
    return (
        <div className="app">
          <Route path="/search" render={()=>(
            <BookSearch
            books={this.state.books}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            showingBooks={this.state.searchedBooks}
            onChangeShelf={(book, shelf) => {
              this.shelfUpdate(book,shelf)
            }}

            />
          )}
          />
          <Route exact path="/" render={()=>(
            <BookList
            books={this.state.books}
            onChangeShelf={(book, shelf)=> {
              this.shelfUpdate(book, shelf)
            }}
            />
          )}
          />
        </div>
    )
  }
}

export default BooksApp