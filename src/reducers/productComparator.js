import { getProducts } from '../services/productService';

const URL_CHANGE = 'URL_CHANGE';
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
const CHANGE_OVERLAY = 'CHANGE_OVERLAY';

const initialState = {
  firstUrl: '',
  secondUrl: '',
  products: [],
  showOverlay: false,
  overlayMessage: '',
  hasUrlChanged: false,
  commonKeys: []
}

export const updateUrl = (payload) => ({ type: URL_CHANGE, payload: payload });
export const updateProducts = (payload) => ({ type: UPDATE_PRODUCTS, payload: payload });

export const changeOverlayMessage = (showOverlay, overlayMessage = '') => ({
  type: CHANGE_OVERLAY,
  payload: { showOverlay, overlayMessage }
});

export const fetchProducts = (queries) => {
  return (dispatch) => {
    dispatch(changeOverlayMessage(true, 'Extracting product data!!'));
    getProducts(queries)
      .then(products => dispatch(updateProducts(products)))
      .then(() => dispatch(changeOverlayMessage(false)), () => dispatch(changeOverlayMessage(false)))
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case URL_CHANGE:
      return { ...state, hasUrlChanged: true, ...action.payload }

    case UPDATE_PRODUCTS:
      return { ...state, hasUrlChanged: false, commonKeys: action.payload.commonKeys, products: action.payload.products }

    case CHANGE_OVERLAY:
      return { ...state, showOverlay: action.payload.showOverlay, overlayMessage: action.payload.overlayMessage }

    default:
      return state
  }
}
