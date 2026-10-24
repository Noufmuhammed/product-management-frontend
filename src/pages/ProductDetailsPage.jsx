
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        setError('Failed to load product. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <p>Loading product...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <main>
      <h1>{product.title}</h1>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>

      <Link to={`/products/${product._id}/edit`}>Edit Product</Link>
      {' | '}
      <Link to="/products">Back to Products</Link>
    </main>
  )
}

export default ProductDetailsPage
