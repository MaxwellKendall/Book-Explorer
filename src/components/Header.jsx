import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  makeAPICall = () => {
    const { getSearchedBooks, setSearchTerm, setError, error } = this.props;
    if (error) setError(false);
    getSearchedBooks(this.state.searchTerm);
    setSearchTerm(this.state.searchTerm);
  }

  handleChange = (event) => {
    event.persist();
    this.setState(prevState => ({ ...prevState, searchTerm: event.target.value }));
  }

  render() {
    const { searchTerm, location } = this.state;
    return (
      <div className="header">
        {location === '/book-explorer/library' ? <h1>My Library</h1> : <h1>Google Books</h1>}
        <div className="search_bar__container">
          <input
            id="searchBar"
            value={searchTerm}
            onChange={this.handleChange}
            type="text"
            placeholder="Search by Title or Author"
          />
          <Link className="search" to="/book-explorer" onClick={this.makeAPICall}>Search</Link>
          <Link to="/book-explorer/library" className="library">
            My Library
          </Link>
        </div>
      </div>
    );
  }
}
