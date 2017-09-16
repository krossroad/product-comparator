import param from 'jquery-param'

const PRODUCT_URL = 'http://localhost:8000/products'

export const getProducts = (queries) => {
  const url = PRODUCT_URL + '?' + param(queries);

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(res => res.json());
}
