
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/productService'

const CreateProductPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    price: '',
    quantity: '',
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      })

      navigate('/products')
    } catch (error) {
      console.log(error)
      alert('Could not create product. Please check your information.')
    }
  }

  return (
    <main>
      <h1>Create Product</h1>

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

        <button type="submit">Create Product</button>
      </form>
    </main>
  )
}

export default CreateProductPage
