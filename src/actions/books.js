import { createAction } from 'redux-actions';
import axios from 'axios';

import * as uiActions from './ui';

export const selectBook = createAction('BOOK_SELECTED');
export const searchBooks = createAction('SEARCH_BOOKS');
export const addToMyLibrary = createAction('ADD_TO_MY_LIBRARY');
export const deleteBook = createAction('DELETE_BOOK');
export const setBookIndex = createAction('SET_BOOKINDEX');
export const setSearchTerm = createAction('SET_SEARCHTERM');
export const setTotalSearched = createAction('SET_TOTAL_SEARCHED');

export const getSearchedBooks = (searchTerm, maxResults = 40, bookIndex = 1) => (
  (dispatch) => {
    dispatch(uiActions.setLoading(true));
    const root = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    return axios.get(`${root}&maxResults=${maxResults}&startIndex=${bookIndex}`)
      .then((response) => {
        console.log('API Response', response.data);
        const totalItems = response.data.totalItems;
        const books = response.data.items;
        const searchedBooks = books.map((book, index) => {
          const { volumeInfo, id } = book;
          const { title, pageCount, imageLinks, industryIdentifiers, description, subtitle, publisher, publishedDate, previewLink, authors } = volumeInfo;
          return { id, title, subtitle, publisher, publishedDate, description, pageCount, imageLinks, industryIdentifiers, previewLink, authors };
        });
        dispatch(searchBooks(searchedBooks));
        dispatch(setTotalSearched(totalItems));
        dispatch(uiActions.setLoading(false));
        dispatch(uiActions.setError(false));
      })
      .catch((err) => {
        console.warn('API Error:', err); // eslint-disable-line no-console
        dispatch(uiActions.setLoading(false));
        dispatch(setTotalSearched(0));
        dispatch(uiActions.setError(true));
      });
  }
);
