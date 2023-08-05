import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.scss'
import { actions as cartActions } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="checkout" onClick={() => dispatch(cartActions.toggleCartVisibility())}>
      <img src="/images/checkout.png" alt="checkout" />
      <h2>Order Placed Successfully!</h2>
    </div>
  );
};
