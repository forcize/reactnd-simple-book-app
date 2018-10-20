import React, { Component } from 'react';
import Bookshelf from './Bookshelf.js';
import Search from './Search.js';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';

class Apps extends Component {
  
  state = {
    books : [],
  };

// Thanks Guilherme for the snippet!

async componentDidMount() {
  const books = await BooksAPI.getAll()
  this.setState({ books })
}
  
  /**
  * @description Update the a given Book Shelf in the Books State based on the Category Selection
  * @constructor
  * @param {string} event - The result of the select event
  * @param {object} book - Contains the details of the selected book
  */
  
  handleChange = (event, book) => {
    
    //In Order to avoid state mutation I have decided to copy the state using a spread operator.
    // Reference: https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
    const existingItems = [...this.state.books]
    
    // Since the book exist in our collection, we look for it's shelf in order to update it with the new value
    existingItems[existingItems.findIndex(x => x.id === book.id)].shelf = event
    
    // Now we update the book position in the backend
    BooksAPI.update(book, event)
    
    this.setState(currentState => ({
      books: existingItems
    }))
    
  };
  
  /**
  * @description Updates the Books Collection State via the Search.js 
  * @constructor
  * @param {object} book - Contains the details of the selected book
  * @param {string} event - The result of the select event
  */
  
  updateCollection = (book, event) => {
    
    //In Order to avoid state mutation I have decided to copy the state using a spread operator.
    // Reference: https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
    
    const existingItems = [...this.state.books]

    // Check if index exist in our collection and then update the shelf to the one selected in the results
    existingItems.find(x => x.id === book.id) && (
    existingItems[existingItems.findIndex(x => x.id === book.id)].shelf = event
     )
    
    // If the book exist in our state we proceed to update it's shelf only else we add it.
    existingItems.some(search => search.id === book.id) ? 
      
    //If the item already exist in the bookshelf, we go ahead and update it's shelf only.
    this.setState(currentState => ({
      books: existingItems,
    })):
    
    //Else if the item doesn't exist, we go ahead and add it into the shelf along with it's new status.
    this.setState(currentState => ({
      books: [...currentState.books, book],
    }))
  };

  render(){
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <Bookshelf whereShelf='currentlyReading' books={this.state.books} onSelectHandle={this.handleChange} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <Bookshelf whereShelf='wantToRead' books={this.state.books} onSelectHandle={this.handleChange} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <Bookshelf whereShelf='read' books={this.state.books} onSelectHandle={this.handleChange} />
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )} />	
          <Route exact path='/search' render={() => (
              <Search booksInCatalog={this.state.books} updateCatalog={this.updateCollection} />
            )} />	
          </div>
        )
      }
    }
    
    export default Apps