import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf.js';
import { Link } from 'react-router-dom';
import './App.css';

class Search extends Component {
  state = {
    results : [],
  };
  
  /**
  * @description Perform the search, assign the shelf to each book in the raw results and update results state.
  * @constructor
  * @param {string} query - The search term
  */
  
  onChangeQuery = (query) =>{
    BooksAPI.search(query).then((results) =>{
      results.map((result, index) => (
        this.props.booksInCatalog.some(search => search.id === result.id) ? 
        results[index].shelf = this.props.booksInCatalog[this.props.booksInCatalog.findIndex(search => search.id === result.id)].shelf : results[index].shelf="none"
      ))
      this.setState((thisState) => ({results}))
    }).catch((reason) => {
      this.setState((thisState) => ({results : []}))
      console.log(reason)
    });
  };
  
  /**
  * @description Update the Shelf of a given Book in the Results State based on the Category Selection
  * @constructor
  * @param {string} event - The result of the select event
  * @param {object} book - Contains the details of the selected book
  */
  
  handleChange = (event, book) => {
    
    //In Order to avoid state mutation I have decided to copy the state using a spread operator.
    // Reference: https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
    const resultsItems = [...this.state.results]
    
    // Since we the book exist in our array, we look for it's shelf in order to update it with the new value
    resultsItems[resultsItems.findIndex(x => x.id === book.id)].shelf = event
    
    //Update Selection
    BooksAPI.update(book, event)
    
    //Pass selection to the Apps.js Component
    this.props.updateCatalog(book, event)
    
     this.setState(currentState => ({
     results: resultsItems
     }));
  };
  
  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder="Search by title or author" 
              onChange={(e) => this.onChangeQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf books={this.state.results} whereShelf='disabled' onSelectHandle={this.handleChange} />
        </div>
      </div>
    )}
  }
  export default Search