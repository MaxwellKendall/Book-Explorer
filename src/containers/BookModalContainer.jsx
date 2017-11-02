import { connect } from 'react-redux';

import * as actions from '../actions/books';
import * as uiActions from '../actions/ui';
import * as bookSelectors from '../selectors/books';

import BookModal from '../components/BookModal';

const mapStateToProps = state => ({
  activeBook: bookSelectors.getActiveBook(state),
  activeBookId: state.books.activeBookId,
  loading: state.ui.loading,
});

const mapDispatchToProps = dispatch => ({
  selectBook: book => dispatch(actions.selectBook(book)),
  setLoading: bool => dispatch(uiActions.setLoading(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookModal);
