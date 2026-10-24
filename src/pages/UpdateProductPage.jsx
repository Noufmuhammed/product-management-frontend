
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getProductById,
  updateProduct,
} from '../services/productService'

const UpdateProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    price: '',
    quantity: '',
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id)

        setFormData({
          title: product.title,
          description: product.description || '',
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      })

      navigate(`/products/${id}`)
    } catch (error) {
      console.log(error)
      alert('Could not update product. Please check your information.')
    }
  }

  return (
    <main>
      <h1>Update Product</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
          />
        </label>

        <br />

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
        </label>

        <br />

        <label>
          Price
          <input
            type="number"
            name="price"
            min="0.1"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="0"
            step="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <button type="submit">Save Changes</button>
      </form>
    </main>
  )
}

export default UpdateProductPage
