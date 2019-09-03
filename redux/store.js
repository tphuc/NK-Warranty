import { createStore, combineReducers, applyMiddleware } from 'redux';
import History from './reducer'

const store = createStore(History)

export default store;