import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {PropTypes} from 'prop-types';

class BookSearch extends Component {

  state = {
    query: ""
  }

  updateSearchedBooks = (query) => {
    this.setState({ query: query.trim()})
    query && this.props.onSearchBook(query, 20)
  }

  render() {
    
    let searchedBooks = this.props.showingBooks.map((searchBook) => {
      if(searchBook !== null || 'undefined'){
          this.props.books.map((ownedBook) => {
            if (searchBook.id === ownedBook.id) {
                searchBook.shelf = ownedBook.shelf
            }
              return searchBook
          })
          return searchBook
        }
        return searchBook
      })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event)=> this.updateSearchedBooks(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

          {searchedBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                <select value={book.shelf?book.shelf:"none"} onChange={(event)=>this.props.onChangeShelf(book,event.target.value)}>
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}

        </ol>
      </div>
    </div>
    )
  }
}

BookSearch.propTypes = {
  books: PropTypes.array.isRequired,
  onSearchBook: PropTypes.func.isRequired,
  showingBooks: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookSearch
