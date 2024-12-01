import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", { position: "top-right", autoClose: 2000 });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", { position: "top-right", autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("brand", brand);
    formData.append("countInStock", stock);

    if (image && typeof image !== "string") {  // Only append if the image is a new file
      formData.append("image", image);
    }

    try {
      const data = await updateProduct({ productId: params._id, formData }).unwrap();
      console.log("Product updated successfully:", data);
      toast.success("Product updated successfully!");
      navigate("/admin/allproductslist");  // Redirect after update
    } catch (error) {
      toast.error(error.message || "Failed to update product.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, { autoClose: 2000 });
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed. Try again.", { autoClose: 2000 });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-xl font-bold">Update Product</div>

          {image && (
            <div className="text-center">
              <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
            </div>
          )}

          <div className="mb-3 ml-3">
            <label className="bg-[rgba(230,216,237,0.8)] border border-2 border-[rgb(150,150,150)] text-[rgb(82,82,82)] px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 flex items-center justify-center">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={`block mx-auto w-32 h-18 object-cover rounded-xl ${!image ? "hidden" : "text-black"}`}
              />
            </label>
          </div>

          <div className="p-3 flex flex-wrap">
            <div className="flex justify-between">
              <div className="one ml-1">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="two ml-4 flex-wrap">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="one ml-1">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="two ml-4 flex-wrap">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand"
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">Description</label>
            <textarea
              type="text"
              className="ml-2 p-2 mb-3 bg-[#f0f0f0] border border-[rgb(150,150,150)] rounded-lg w-[100%] text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div className="one ml-1">
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="ml-4">
                <label htmlFor="" className="my-1">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 mt-1 w-[28rem] border border-[rgb(150,150,150)] rounded-lg bg-[#f0f0f0] text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>
                    Select
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <button
                onClick={handleSubmit}
                className="py-3 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6 text-white"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-3 px-10 mt-5 rounded-lg text-lg font-bold bg-[rgb(93,0,124)] text-white"
              >
                Delete
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
