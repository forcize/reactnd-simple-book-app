import React, {Component} from 'react';
import './App.css';

class Bookshelf extends Component {

    /**
    * @description Assign shelfs. If props.whereShelf is disabled, use re-use component for the Search.js
    * @param {object} book - Contains all the properties of a single book
    */
    
    shelf = (book) =>(
      this.props.whereShelf !== 'disabled' ? this.props.whereShelf : book.shelf
    );

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => {     				
            return this.shelf(book) === book.shelf && (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
					{book.imageLinks ? 
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
					 : 
					<div className="book-cover"></div>
					}
                    <div className="book-shelf-changer">
                      <select value={book.shelf} 
                        onChange={(event) => this.props.onSelectHandle(event.target.value, book)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors} <br /></div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }}
  
  export default Bookshelf