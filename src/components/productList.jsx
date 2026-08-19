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