
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import AllProductPage from './pages/AllProductPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CreateProductPage from './pages/CreateProductPage'
import UpdateProductPage from './pages/UpdateProductPage'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<AllProductPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/:id/edit" element={<UpdateProductPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
