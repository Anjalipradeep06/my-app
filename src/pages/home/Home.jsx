import React, { useState } from "react";
import "./Home.css";
import DefaultProducts from "../../components/ProductCard/DefaultProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
function Home() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
  
    title: "",
    price: "",
    description: "",
    images: "",
    category: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {

    // e.preventDefault();
    // if (!formData.image.startsWith("http")) {
    //   alert("Enter a valid image URL");
    //   return;
    // }
    // const newProduct = {
    //   ...formData, id: Date.now(), islocal: true,
    // };

    // setProducts([...products, newProduct]);

    // setFormData({
    //   title: "",
    //   price: "",
    //   category: "",
    //   image: "",
    //   description: "",
    // });

    // setShowForm(false);
    e.preventDefault();
    if (!formData.image.startsWith("http")) {
      alert("Enter a valid image URL");
      return;
    }
 
  const product = {
    title: formData.title,
    price: formData.price,
    description: formData.description,
    categoryId:formData.category,
    images: [formData.image],
 };
axios.post('https://api.escuelajs.co/api/v1/products/', product)
  .then(response => {console.log(response.data)
    setProducts((prev)=>
    [...prev,{...response.data,isLocal:true},

    ]);
    toast.success("Added successfully ✅");
    setShowForm(false);
  })
  .catch((error)=>console.error("error adding product",error));
  



  };
  console.log(setProducts);


  return (
    <div className="home-box">


      <button
        className="add-button"
        onClick={() => setShowForm(true)}
      >
        + Add Product
      </button>


      <DefaultProducts extraProducts={products} setProducts={setProducts} />


      {showForm && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Product</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="Enter image URL"
                      value={formData.image}
                      onChange={handleChange}
                      required
                    />
                    <img
                      src={formData.image}
                      alt="preview"
                      className="image-preview"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />


                  </div>

                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    Save Product
                  </button>

                </form>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;