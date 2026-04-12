import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './DefaultProduct.css';
import { toast } from "react-toastify";

function DefaultProducts({ extraProducts, setProducts }) {

  const navigate = useNavigate()
  const [defaultProducts, setDefaultProducts] = useState([]);
   const [page, setPage] = useState(1);
  const limit = 10;

   useEffect(() => {
    const offset = (page - 1) * limit;

    axios
      .get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      )
      .then((response) => setDefaultProducts(response.data))
      .catch((error) =>
        console.error("Error fetching products:", error)
      );
  }, [page]);
const allProducts =
    page === 1
      ? [...defaultProducts, ...extraProducts]
      : defaultProducts;

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => setDefaultProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);
  
  console.log(allProducts);

  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedProduct, setUpdatedProducts] = useState({
    id: "",
    title: "",
    slug: "",
    price: "",
    description: "",
    images: "",
    category: "",


  });

  const handleEdit = (item) => {
    setUpdatedProducts(item);
    setShowEditForm(true);
  };


  const handleEditChange = (e) => {
    setUpdatedProducts({
      ...updatedProduct,
      [e.target.name]: e.target.value
    });
  };


  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`https://api.escuelajs.co/api/v1/products/${updatedProduct.id}`, updatedProduct)

      .then((response) => {
        console.log("Updated:", response.data);

        setDefaultProducts((prev) => prev.map((item) => item.id === updatedProduct.id ? updatedProduct : item));
toast.success("Updated successfully ✅");
        setShowEditForm(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleDelete = (id) => {
axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => {
        console.log("Deleted:", response);
       setDefaultProducts(prev =>
  prev.filter(item => item.id !== response.data.id)
);
 toast.success("Deleted successfully ✅");
      })
      .catch(error => console.error("Error deleting product:", error));
      
  };
  return (
    <div className="prod-card container">
      <div className="row mt-4">
        {allProducts.map((item, index) => (
          <div
            className="col-lg-4 col-md-6 col-12 mb-4"
            key={item.id || index}
          >
            <div className="card h-100">
              <img
                src={item.images?.[0]}
                className="card-img-top"
                alt={item.title}
              />


              <div className="card-body d-flex flex-column justify-content-between text-center">
                <h5 className="card-title">
                  {item.title?.length > 20
                    ? item.title.substring(0, 20) + "..."
                    : item.title}
                </h5>

                <p className="card-text">
                  {item.description?.length > 40
                    ? item.description.substring(0, 40) + "..."
                    : item.description || "No description"}
                </p>

                <p>
                  <strong className="price">₹{item.price}</strong>
                </p>

                <p>{item.category?.name}</p>


                <button
                  href="#"
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  View Product
                </button>

                <div className="sec-btn d-flex gap-2">
                  <button
                    className="btn btn-danger flex-fill"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-success flex-fill"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
<nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              &laquo;
            </button>
          </li>

          {[1, 2, 3, 4, 5].map((num) => (
            <li
              key={num}
              className={`page-item ${
                page === num ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>

      {showEditForm && (
        <div className="edit-modal">
          <form className="edit-form" onSubmit={handleUpdate}>
            <h3>Edit Product</h3>

            <input
              type="text"
              name="title"
              value={updatedProduct.title || ""}
              onChange={handleEditChange}
              placeholder="Title"
            />

            <input
              type="number"
              name="price"
              value={updatedProduct.price || ""}
              onChange={handleEditChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="category"
              value={updatedProduct.category || ""}
              onChange={handleEditChange}
              placeholder="Category"
            />

            <input
              type="text"
              name="image"
              value={updatedProduct.image || ""}
              onChange={handleEditChange}
              placeholder="Image URL"
            />

            <textarea
              name="description"
              value={updatedProduct.description || ""}
              onChange={handleEditChange}
              placeholder="Description"
            />

            <div className="d-flex gap-2 mt-2">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DefaultProducts;