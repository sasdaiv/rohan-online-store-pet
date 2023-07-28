import { actions as cartActions } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import './Cart.scss'; // Імпорт стилів

export const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector(state => state.cart);

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(cartActions.increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(cartActions.decreaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(cartActions.remove(itemId));
  };

  const handleClearCart = () => {
    dispatch(cartActions.clear());
  };
  const handleCheckout = () => {
    dispatch(cartActions.clear());
    navigate('/products')
  };

  const total = items.reduce((acc, item) => +item.product.price * item.quantity + acc, 0);

return (
  <div className="cart">
    <h2 className="cart__title">Your Cart</h2>
    <ul className="cart__items">
      {items.map(item => (
        <li key={item.product.id} className="cart__item">
          <div className="cart__item--left">
            <img
              src={item.product.images[1]}
              className="cart__item--image"
              alt="product"
            />
            <div className="cart__item--left--text">
              <h3 className="cart__item-title">{item.product.title}</h3>
              <p className="cart__item-price">{`${+item.product.price * item.quantity} $ for ${item.quantity}`}</p>
            </div>
          </div>
          <div className="cart__item--rigth">
            <div className="cart__item-quantity">
              <button className="cart__item-quantity-btn" onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>
              <span className="cart__item-quantity-count">{item.quantity}</span>
              <button className="cart__item-quantity-btn" onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>
            </div>
            <button className="cart__item-remove-btn" onClick={() => handleRemoveItem(item.product.id)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
    {items.length > 0 ? (
      <>
        <div>
          {`Total: ${total}$`}
        </div>
        <div className="cart__main-buttons">
          <button className="cart__btn cart__clear-btn" onClick={handleClearCart}>Clear Cart</button>
          <button className="cart__btn cart__checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </>
    ) : (
      <p className="cart__empty">Your cart is empty</p>
    )}
  </div>);
};