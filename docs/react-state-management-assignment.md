# React State Management: Routing, Axios, and CRUD Practice

This handout is based on today's React class project. Read the setup first, review the code we already wrote, then complete the delete/edit assignment. At the end, create a new CRUD project using a different topic than products.

## Project Setup

If you are starting from a new Vite React project, create the project and install the required packages.

```bash
npm create vite@latest state-management
cd state-management
npm install
npm install axios react-router
npm run dev
```

We installed:

- `axios` to call APIs.
- `react-router` to create pages, routes, navigation, and dynamic URLs.

## Folder Structure Used In Class

```txt
src/
  main.jsx
  App.jsx
  pages/
    home.jsx
    about.jsx
    contact.jsx
    PageNotFound.jsx
  components/
    productList.jsx
    productDetails.jsx
    productForm.jsx
```

## Code We Already Have

### `src/main.jsx`

```jsx
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
        <ul>
          <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/about"><li>About</li></NavLink>
          <NavLink to="/contact"><li>Contact</li></NavLink>
          <NavLink to="/productList"><li>ProductList</li></NavLink>
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
```

### `src/App.jsx`

```jsx
import ProductForm from './components/productForm'
import ProductList from './components/productList'

const App = () => {

  return (
    <div>
      
thos os main page
      {/* <ProductForm />

      <ProductList /> */}
    </div>
  )
}

export default App
```

### `src/pages/home.jsx`

```jsx
import React from 'react'

export const Home = () => {
  return (
    <div>home</div>
  )
}
```

### `src/pages/about.jsx`

```jsx
import React from 'react'

export const About = () => {
  return (
    <div>A</div>
  )
}
```

### `src/pages/contact.jsx`

```jsx
import React from 'react'

const Contact = () => {
  return (
    <div>contact</div>
  )
}

export default Contact
```

### `src/pages/PageNotFound.jsx`

```jsx
import React from 'react'

export const PageNotFound = () => {
  return (
    <div>PageNotFound</div>
  )
}
```

### `src/components/productList.jsx`

```jsx
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const ProductList = () => {
const navigate = useNavigate()

  const [productList, setProductList] = useState([])

  const handleDelete = async(id) => {
    await axios(`https://dummyjson.com/products/${id}`) //template literal
  }

  useEffect(() => {
    const callApi = async () => {
     const response = await axios(`https://dummyjson.com/products`)
     setProductList(response.data)
    }

    callApi()
  }, [])

  return (
    <div>
        <button onClick={() => navigate('/productForm')} style={{ background: "green"}}>Create New Product</button>
        {
            productList?.products?.map((product, index) => {
                return (
                    <div key={index} style={{ padding: "10px", margin: "5px", border: "1px solid black", }}>
                        <p >Name: {product.title}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>

                        <button onClick={() => navigate(`/productDetails/${product.id}`)}>View Details</button>
                        <button onClick= {() => handleDelete(product.id)}> delete</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ProductList
```

### `src/components/productDetails.jsx`

```jsx
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ProductDetails = () => {
const navigate = useNavigate()
  const params =  useParams()

  const [productDetail, setProductDetail] = useState()

  useEffect(() => {
      const getDetail = async () => {
          const response = await axios(`https://dummyjson.com/products/${params.id}`)
          console.log(response)
          setProductDetail(response.data)
      }
    
      getDetail()
  }, [params.id])

  return (
    <div>
        <button onClick={() => navigate('/productList')} >Back to product list</button>

        <hr />
        <p>Name: {productDetail?.title}</p>
        <p>Category: {productDetail?.category}</p>
        <p>Price: {productDetail?.price}</p>
    </div>
  )
}

export default ProductDetails
```

### `src/components/productForm.jsx`

```jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const formInitialValue = {
    productName: "",
    category: "",
    price: "",
    isAvailable: false,
}

function ProductForm() {
  const navigate = useNavigate()

  const goToProductList = () => {
    navigate('/productList')
  }

  const [product, setProduct] = useState(formInitialValue);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(product);

    // Add to list from backend
    axios.post(`https://dummyjson.com/products/add`, product)

    // Clear form
    setProduct(formInitialValue)
    goToProductList()
  };

  const handleChange = (e) => {
    setProduct(() => {
      return {
        ...product,
        [e.target.name]:
          e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value,
      };
    });
  };

  return (
    <>
    <button onClick={goToProductList}>Back to product List</button>
    <form onSubmit={handleSubmit}>
      <span>Product Name:</span>
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={handleChange}
      />

      <br />
      <span>Category:</span>
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={(e) => {
            handleChange(e)
        }}
      />

      <br />
      <span>Price:</span>
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
      />
      <br />
      <span>Available:</span>
      <input
        type="checkbox"
        name="isAvailable"
        checked={product.isAvailable}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
      <button onClick={goToProductList}>Cancel</button>

    </form>
    </>
  );
}

export default ProductForm;
```

## Revision: Axios

Axios is used to communicate with an API.

### Import Axios

```jsx
import axios from "axios"
```

### GET Request

Use `GET` when you want to read data.

```jsx
const response = await axios(`https://dummyjson.com/products`)
setProductList(response.data)
```

You can also write:

```jsx
const response = await axios.get(`https://dummyjson.com/products`)
```

### POST Request

Use `POST` when you want to create new data.

```jsx
await axios.post(`https://dummyjson.com/products/add`, product)
```

### PUT Request

Use `PUT` when you want to update existing data.

```jsx
await axios.put(`https://dummyjson.com/products/${id}`, product)
```

### DELETE Request

Use `DELETE` when you want to delete existing data.

```jsx
await axios.delete(`https://dummyjson.com/products/${id}`)
```

### Important Axios Notes

- `response.data` contains the actual API data.
- `async` and `await` help us wait for the API response.
- Template literals use backticks and `${}` to place variables inside a string.
- For example: `` `https://dummyjson.com/products/${id}` ``.

## Revision: React Router

React Router is used to create multiple pages in a React app without refreshing the browser.

### BrowserRouter

Wrap routes inside `BrowserRouter`.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
</BrowserRouter>
```

### NavLink

Use `NavLink` to create navigation links.

```jsx
<NavLink to="/about">
  <li>About</li>
</NavLink>
```

### Route

Use `Route` to connect a URL path to a component.

```jsx
<Route path="/productList" element={<ProductList />} />
```

### useNavigate

Use `useNavigate` when you want to move to another page after a button click or form submit.

```jsx
const navigate = useNavigate()

navigate('/productList')
```

### Dynamic Route

Use `:id` when the route needs a dynamic value.

```jsx
<Route path="/productDetails/:id" element={<ProductDetails />} />
```

### useParams

Use `useParams` to read dynamic route values.

```jsx
const params = useParams()

axios(`https://dummyjson.com/products/${params.id}`)
```

## Assignment 1: Complete Delete and Edit In Product CRUD

Your task is to complete the missing CRUD operations in the product project.

### Part 1: Delete Product

In `productList.jsx`, update `handleDelete`.

Requirements:

- Use `axios.delete`.
- Pass the selected product id.
- Ask for confirmation before deleting.
- After delete succeeds, remove that product from the displayed list.

Example direction:

```jsx
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?")

  if (!confirmDelete) {
    return
  }

  await axios.delete(`https://dummyjson.com/products/${id}`)

  setProductList((previousData) => {
    return {
      ...previousData,
      products: previousData.products.filter((product) => product.id !== id),
    }
  })
}
```

Important: Use `axios.delete`, not a normal `axios(...)` GET request.

### Part 2: Add Edit Button

In each product card, add an Edit button.

```jsx
<button onClick={() => navigate(`/productEdit/${product.id}`)}>
  Edit
</button>
```

### Part 3: Add Edit Route

In `main.jsx`, import your edit component and add a route.

```jsx
import ProductEdit from './components/productEdit.jsx'

<Route path="/productEdit/:id" element={<ProductEdit />} />
```

### Part 4: Create ProductEdit Component

Create a new file:

```txt
src/components/productEdit.jsx
```

The component should:

- Get the product id using `useParams`.
- Fetch the selected product using `axios.get`.
- Fill the form with the existing product data.
- Allow the user to change title/category/price.
- Submit updated data using `axios.put`.
- Navigate back to `/productList` after update.

Example starter:

```jsx
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const formInitialValue = {
  title: "",
  category: "",
  price: "",
}

const ProductEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState(formInitialValue)

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)

      setProduct({
        title: response.data.title,
        category: response.data.category,
        price: response.data.price,
      })
    }

    getProduct()
  }, [id])

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.put(`https://dummyjson.com/products/${id}`, product)

    navigate('/productList')
  }

  return (
    <div>
      <button onClick={() => navigate('/productList')}>
        Back to product list
      </button>

      <form onSubmit={handleSubmit}>
        <span>Product Name:</span>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
        />

        <br />
        <span>Category:</span>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <br />
        <span>Price:</span>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default ProductEdit
```

## Assignment 2: Build A New CRUD Project

Now create a new React project with a different CRUD topic. Do not use products again.

Choose one topic:

- Student Management CRUD
- Book Library CRUD
- Employee Management CRUD
- Course Management CRUD
- Movie Watchlist CRUD

Recommended project: **Student Management CRUD**

### Student Project Requirements

Create these pages/components:

```txt
src/
  main.jsx
  App.jsx
  components/
    studentList.jsx
    studentDetails.jsx
    studentForm.jsx
    studentEdit.jsx
```

The student object should have:

- `name`
- `email`
- `course`
- `age`
- `isActive`

Required features:

- Show all students.
- Show one student detail page using dynamic route `/studentDetails/:id`.
- Create a new student using a form.
- Edit an existing student.
- Delete a student.
- Use `axios`.
- Use `react-router`.
- Use controlled inputs.
- Use `useState`, `useEffect`, `useNavigate`, and `useParams`.

### Suggested Routes For Student CRUD

```jsx
<Route path="/studentList" element={<StudentList />} />
<Route path="/studentForm" element={<StudentForm />} />
<Route path="/studentDetails/:id" element={<StudentDetails />} />
<Route path="/studentEdit/:id" element={<StudentEdit />} />
```

### Suggested API Option

You may use `https://jsonplaceholder.typicode.com/users` for reading user-like data.

```txt
GET    https://jsonplaceholder.typicode.com/users
GET    https://jsonplaceholder.typicode.com/users/:id
POST   https://jsonplaceholder.typicode.com/users
PUT    https://jsonplaceholder.typicode.com/users/:id
DELETE https://jsonplaceholder.typicode.com/users/:id
```

Note: JSONPlaceholder also gives fake success responses. It does not permanently save new, updated, or deleted data.

## Submission Checklist

- [ ] Axios and React Router are installed.
- [ ] Product list loads correctly.
- [ ] View Details button works.
- [ ] Create New Product button works.
- [ ] Delete button calls the delete API.
- [ ] Deleted product is removed from the displayed list.
- [ ] Edit button opens the edit page with the correct product id.
- [ ] Edit form is pre-filled with existing product data.
- [ ] Update button calls the update API.
- [ ] After update, the app returns to the product list.
- [ ] New CRUD project uses a topic other than product.
- [ ] New CRUD project has list, details, create, edit, and delete.
- [ ] No console errors.

## Bonus Challenge

- Show a loading message while fetching data.
- Show an error message if the API call fails.
- Disable the submit button while saving.
- Use better keys in `.map()`, for example `key={product.id}` instead of `key={index}`.
- Reuse one form component for both create and edit.
- Add basic CSS styling for the list, form, and buttons.
