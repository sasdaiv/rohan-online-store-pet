import React from "react";
import { actions as cartActions } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import "./ProductList.scss";
import { Product } from "../../types/Product";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.products);
  const { items } = useAppSelector(state => state.cart);

  const handleInCart = (product: Product) => items.find(item => item.product.id === product.id);

  return (
    <>
      <h1 id="products" className="products__title">Products</h1>
      <div className="product__list">
        {products.slice(0, 8).map((product) => {
          return (
            <div key={product.id} className="product__item">
              <h3 className="product__item__title">{product.title}</h3>
              <div className="product__item--wrapper">
                <img
                  src={product.images[0]}
                  className="product__item--image"
                  alt="product"
                />
                <div className="product__item--info">
                  <p className="product__item--category">{product.category.name}</p>
                  <p className="product__item--price">{product.price}$</p>
                </div>
                <button
                  className={`product__item--add-button ${handleInCart(product) ? 'product__item--in-cart-button' : ''}`}
                  onClick={() => dispatch(cartActions.add({ product, quantity: 1 }))}
                >
                  {handleInCart(product) ? 'In cart/+1' : 'Add in cart'}
                </button>
                <button
                  className="product__item--details-button"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-wrapper">
        <a href="#products" className="go-up">↑</a>
      </div>
    </>

  );
};