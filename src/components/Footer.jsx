import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    totalSearched: PropTypes.number.isRequired,
    bookIndex: PropTypes.number.isRequired,
    setBookIndex: PropTypes.func.isRequired,
    getSearchedBooks: PropTypes.func.isRequired,
  };

goNext = (e) => {
  e.preventDefault();
  const { bookIndex, setBookIndex, getSearchedBooks, searchTerm, totalSearched } = this.props;
  let newIndex = bookIndex + 40;
  if (newIndex >= totalSearched) {
    newIndex = totalSearched - 40;
  }
  setBookIndex(newIndex);
  getSearchedBooks(searchTerm, 40, newIndex);
}

goPrevious = (e) => {
  e.preventDefault();
  const { bookIndex, setBookIndex, getSearchedBooks, searchTerm } = this.props;
  let newIndex = bookIndex - 40;
  if (newIndex <= 0) {
    newIndex = 0;
  }
  setBookIndex(newIndex);
  getSearchedBooks(searchTerm, 40, newIndex);
}

renderPagination = () => {
  const pagination = (
    <ul className="footer__container">
      <li>
        <a href="" onClick={this.goPrevious}>Previous</a>
      </li>
      <li>
        <a href="" onClick={this.goNext}>Next</a>
      </li>
    </ul>
  );
  return pagination;
}

render() {
  return (
    <div className="footer">
      {this.renderPagination()}
    </div>
  );
}
}
