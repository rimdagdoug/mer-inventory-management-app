import React from 'react';
import "./productList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

const ProductList = ({ products, isLoading }) => {
  return (
    <div className='product-list'>
       <hr />
       <div className="table">
         <div className="--flex-between --flex-dir-column">
            <span>
                <h3>Inventory Items</h3>
            </span>
            <span>
                <h3>Search product</h3>
            </span>
          </div>
          {isLoading && <SpinnerImg />}
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                            <AiOutlineEye size={25} color={"purple"} />
                        </span>
                        <span>
                            <FaEdit size={20} color={"green"} />
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
    </div>
  )
}

export default ProductList;
