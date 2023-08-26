import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as cartActions } from "../../store/cartSlice";
import './ProductDetails.scss'

export const ProductDetails: React.FC = () => {
  const [localQuantity, setLocalQuantity] = React.useState(1);

  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const selectedProductId = productId ? +productId : 0;
  const { products } = useAppSelector((state) => state.products);

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  const handleLocalQuantityDecrease = (prev: number) => {
    if (prev > 1) {
      setLocalQuantity(prev - 1)
    }
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }


  return (
    <div className="product-details">
      <div className="product-details__image-gallery">
        {selectedProduct.images.map((image, index) => (
          <img key={index} className="product-details__image" src={image} alt={`Product ${index + 1}`} />
        )).slice(0,3)}
      </div>
      <div className="product-details__content">
        <h2 className="product-details__title">{selectedProduct.title}</h2>
        <div className="product-details__info">
          <div className="product-details__info--left">
            <p className="product-details__price">Price: {selectedProduct.price} $</p>
            <p className="product-details__category">Category: {selectedProduct.category}</p>
          </div>
          <div className="product-details__info--right">
            <p className="product-details__description"><span style={{ fontWeight: 700 }}>Description:</span> {selectedProduct.description}</p>
          </div>
        </div>
      </div>
      <div className="product-details__wrapper">
        <button className="product-details__quantity-btn" onClick={() => handleLocalQuantityDecrease(localQuantity)}>-</button>
        <span className="product-details__quantity-count">{localQuantity}</span>
        <button className="product-details__quantity-btn" onClick={() => setLocalQuantity(prev => prev + 1)}>+</button>
        <button
          className="product__item--add-button"
          onClick={() => dispatch(cartActions.add({ product: selectedProduct, quantity: localQuantity }))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};