import { createStore } from 'redux';
import Reducer from '../reducers/reducer';

// Create Redux store
const store = createStore(Reducer);

export default store;