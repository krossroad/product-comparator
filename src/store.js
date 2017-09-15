import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productComparator from './reducers/productComparator'

export default createStore(
    productComparator,
    applyMiddleware(thunk)
)
