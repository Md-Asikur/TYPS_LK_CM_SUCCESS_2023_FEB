import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools } from "redux-devtools-extension"
import { allusersReducer, clearHistory, profileReducer, updateUserReducer, userDetailsReducer, userReducer } from "./reducers/userReducer"
import { createProductReducer, getAllProductReducer, productDetailsReducer, updDelproductReducer } from "./reducers/productReducer"
import categoryReducer from "./reducers/categoryReducer"
import commentReducer from "./reducers/commentReducer"
const middleware = [thunk]
const reducer = combineReducers({
  user: userReducer,

  allProducts: getAllProductReducer,
  category: categoryReducer,
  comments: commentReducer,
  updateUser: updateUserReducer,
  clearHistory: clearHistory,
  allUsers: allusersReducer,
  userDetails: userDetailsReducer,
  //PRODUCTS
  products: createProductReducer,

  productDetails: productDetailsReducer,
  updDelProduct: updDelproductReducer,
});
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store