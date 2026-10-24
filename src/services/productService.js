
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const productAPI = axios.create({
  baseURL: BASE_URL + '/products',
})

const getProducts = async () => {
  const response = await productAPI.get('/')
  return response.data
}

const getProductById = async (productId) => {
  const response = await productAPI.get(`/${productId}`)
  return response.data
}

const createProduct = async (productData) => {
  const response = await productAPI.post('/', productData)
  return response.data
}

const updateProduct = async (productId, productData) => {
  const response = await productAPI.put(`/${productId}`, productData)
  return response.data
}

const deleteProduct = async (productId) => {
  const response = await productAPI.delete(`/${productId}`)
  return response.data
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
