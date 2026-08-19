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