import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
// this sis test change
//  asdf 

// this is change from rahul

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