import React from 'react';
import PropTypes from 'prop-types';

import BookContainer from '../containers/BookContainer';

import * as utils from '../utils/utils';

const Books = (props) => {
  const addLibraryStyles = (node) => {
    console.log('addLibraryStyles');
    node.classList.add('added');
  };

  const displayNotification = (book, verbiage, bool, node) => {
    console.log(event);
    const action = bool ? 'add' : 'delete';
    const bookGalleryContainer = document.querySelector('html');
    const notificationSuccess = utils.createElement('span', `notification__library--${action}`);
    bookGalleryContainer.appendChild(notificationSuccess);
    notificationSuccess.innerHTML = `${book.title} has been ${verbiage} your library!`;
    setTimeout(() => bookGalleryContainer.removeChild(notificationSuccess), 1000);
    if (action === 'add') {
      addLibraryStyles(node);
    }
  };

  const renderBooks = book => (
    <BookContainer
      key={book.id}
      book={book}
      activeBook={props.activeBook}
      books={props.books}
      displayNotification={displayNotification}
    />
  );

  return (
    <div className="book-gallery-container">
      <ul className="books__container">
        {props.books.map(book => renderBooks(book))}
      </ul>
    </div>
  );
};

Books.propTypes = {
  activeBook: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Books;
