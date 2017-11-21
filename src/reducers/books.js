import { handleActions } from 'redux-actions';
import * as actions from '../actions/books';

const initialState = {
  activeBookId: '0',
  searchedBooks: [],
  totalSearched: 0,
  libraryBooks: [],
  bookIndex: 0,
  searchTerm: '',
};

export default handleActions({
  // make each function return the object you want state to be for the given object
  [actions.searchBooks]: (state, action) => ({ ...state, searchedBooks: action.payload }),
  [actions.setTotalSearched]: (state, action) => ({ ...state, totalSearched: action.payload }),
  [actions.setSearchTerm]: (state, action) => ({ ...state, searchTerm: action.payload }),
  [actions.selectBook]: (state, action) => ({ ...state, activeBookId: action.payload }),
  [actions.addToMyLibrary]: (state, action) => ({ ...state, libraryBooks: [...new Set([...state.libraryBooks, action.payload])] }),
  [actions.deleteBook]: (state, action) => ({ ...state, libraryBooks: [...state.libraryBooks.filter(book => book.id !== action.payload)] }),
  [actions.setBookIndex]: (state, action) => ({ ...state, bookIndex: action.payload }),
}, initialState);
