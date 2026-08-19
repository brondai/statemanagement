import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import ProductList from './components/productList.jsx'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'
import ProductForm from './components/productForm.jsx'
import ProductDetails from './components/productDetails.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <BrowserRouter>
      <nav>
        <ul className='flex gap-3 justify-center'>
          <NavLink to="/" className="font-bold p-1"><li>Home</li></NavLink>
          <NavLink to="/about" className="font-bold p-1"><li>About</li></NavLink>
          <NavLink to="/contact" className="font-bold p-1"><li>Contact</li></NavLink>
          <NavLink to="/productList" className="font-bold p-1"><li>ProductList</li></NavLink>
        </ul>
      </nav>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/contact' element={<Contact />} />

      <Route path="/productList" element={<ProductList />} />
      <Route path="/productForm" element={<ProductForm />} />

      {/* // dynamic routing */}
      <Route path="/productDetails/:id" element={<ProductDetails />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
   </BrowserRouter>
  // </StrictMode>,
)
