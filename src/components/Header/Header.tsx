import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as cartActions } from "../../store/cartSlice";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
    <header className="header">
      <Link to="/" className="header__title">
        <img className="header__title--logo" src="logo.svg" alt="logo" />
      </Link>
      <nav className="nav">
        <NavLink className="nav__link" to="/">Home</NavLink>
        <NavLink className="nav__link" to="/products">Products</NavLink>
        <div className='nav__link nav__link--cart'  onClick={() => dispatch(cartActions.toggleCartVisibility())}>
          <img className="cart__icon" src="./images/icons/cart.svg" alt="cart" />
          {totalQuantity > 0 && <span className="cart__quantity">{totalQuantity}</span>}
        </div>
      </nav>
    </header></>
  )
}