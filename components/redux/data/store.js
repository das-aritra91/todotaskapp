import { createStore } from 'redux';
import Reducer from '../reducers/reducer';

// Create Redux store
const store = createStore(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__(
        {
            trace: true,
        }
    )
    );

export default store;