import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoodStore.css';

const dataFromLocalStorage = JSON.parse(localStorage.getItem('items') || '[]');

function FoodStore() {
  const [title, setTitle] = useState('');
  let [listOfProducts, setListOfProducts] = useState(dataFromLocalStorage);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(listOfProducts));
  }, [listOfProducts]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addProductHandler = (e) => {
    e.preventDefault();

    const newProduct = {
      title: title,
      id:
        Date.now().toString(32).slice(-6) +
        Math.random().toString(32).slice(2, 8),
    };
    setListOfProducts([newProduct, ...listOfProducts]);

    toast.success('Product added successfully');
    setTitle('');
    setIsEdit(false);
  };

  const editProductHandler = (id) => {
    const productToEdit = listOfProducts.find((product) => product.id === id);
    setTitle(productToEdit.title);

    const newListOfProducts = listOfProducts.filter(
      (product) => product.id !== id,
    );
    setListOfProducts(newListOfProducts);
    setIsEdit(true);

    toast.info('Product edited successfully');
  };

  const deleteProductHandler = (id) => {
    const newList = listOfProducts.filter((product) => product.id !== id);
    setListOfProducts(newList);
    toast.error('Product deleted successfully');
  };

  const deleteAllRecordsHandler = () => {
    setListOfProducts([]);
    toast.error('All records deleted successfully!');
  };

  let content = (
    <>
      <ul>
        {listOfProducts.map((product) => (
          <li key={product.id}>
            {product.title}

            <button
              className="btn btn-warning btn-sm m-2 float-right color-white"
              onClick={() => editProductHandler(product.id)}
            >
              Edit Product
            </button>
            <button
              className="btn btn-danger btn-sm m-2 float-right "
              onClick={() => deleteProductHandler(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <h1>List of Items in our Store</h1>

      <div className="d-flex w-100 justify-content-between ">
        <input
          type="text"
          className="form-control m-1"
          placeholder="Enter product name"
          aria-describedby="button-addon2"
          value={title}
          onChange={handleTitleChange}
        />

        {isEdit ? (
          <button
            className="btn btn-outline-secondary m-1"
            type="button"
            onClick={addProductHandler}
            disabled={title.trim().length === 0}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-outline-secondary m-1"
            type="button"
            onClick={addProductHandler}
            disabled={title.trim().length === 0}
          >
            Add
          </button>
        )}

        <ToastContainer position="top-right" autoClose={1000} />
      </div>
      {content}
      {listOfProducts.length > 1 && (
        <button
          className="btn btn-danger"
          type="button"
          onClick={deleteAllRecordsHandler}
        >
          Delete All Records
        </button>
      )}
      {listOfProducts.length === 0 && (
        <ToastContainer position="top-right" autoClose={1000} />
      )}
    </>
  );
}

export default FoodStore;
