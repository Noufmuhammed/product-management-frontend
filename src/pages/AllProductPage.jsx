
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../services/productService'

const AllProductPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId)
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== productId)
      )
    } catch (error) {
      console.log(error)
      setError('Failed to delete product. Please try again.')
    }
  }

  return (
    <main>
      <h1>All Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>

          <Link to={`/products/${product._id}`}>View Details</Link>
          {' | '}
          <Link to={`/products/${product._id}/edit`}>Edit</Link>
          {' | '}
          <button onClick={() => handleDelete(product._id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </main>
  )
}

export default AllProductPage
