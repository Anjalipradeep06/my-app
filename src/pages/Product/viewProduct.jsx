import React, { useEffect, useState } from "react";
import axios from "axios";
import './viewProduct.css'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ViewProduct = () => {
  const [product, setProduct] = useState([]);
  const {id}=useParams()
  const navigate=useNavigate();
useEffect(() => {
  axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then(response => {
      console.log("singleproduct:", response.data);
      setProduct(response.data);
    })
    .catch(error =>
      console.log("error showing single product", error)
    );
}, [id]); 
const handleBack=()=>{
  navigate("/")
  
}

const [imgLoading, setImgLoading] = useState(true);

    

  return (
    // <div className="container mt-4 text-center">
    //   <h2>{product.title}</h2>

    //   <img
    //     src={product.image}
    //     alt={product.title}
    //     style={{ height: "300px", objectFit: "contain" }}
    //   />

    //   <p className="mt-3">{product.description}</p>

    //   <h4>₹{product.price}</h4>

    //   <p>{product.category}</p>
    //    <button>Get Back</button>
    // </div>
    <div className="product-container">
  <div className="card mb-3 product-card">
    <div className="sec-part">

      <div className=" box1">
          {imgLoading && <h2 className="img-loader">Loading...</h2>}
        <img
         src={product.images?.[0]}
    className="card-image"
    alt={product.title}
    onLoad={() => setImgLoading(false)}   // ✅ when image loads
    onError={() => setImgLoading(false)}  // ✅ if image fails
    style={{ display: imgLoading ? "none" : "block" }}
        />
      </div>

      <div className="col-md-8 box2">
        <div className="card-body">
          <h5 className="card-title"> {product.title?.length > 90
        ? product.title.substring(0, 90) + "..."
        : product.title}</h5>

          <p className="card-text"> {product.description?.length > 140
        ? product.description.substring(0, 140) + "..."
        : product.description || "No description"}</p>

          <h6 className="price">₹{product.price}</h6>

          <p className="text-muted">
            {product.category?.name}
          </p>
          <button className="get-btn btn danger"
          onClick={handleBack}>Get Back</button>
        </div>
      </div>

    </div>
  </div>
</div>


   
  );
};

export default ViewProduct;
