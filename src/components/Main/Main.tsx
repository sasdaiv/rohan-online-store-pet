import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import './Main.scss';
import { useState } from 'react';
import { Product } from '../../types/Product';


export const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products)
  const navigate = useNavigate();
  const { items } = useAppSelector(state => state.cart);

  const handleInCart = (product: Product) => items.find(item => item.product.id === product.id);

  const sliderImages = [
    '/images/slider-image-1.png',
    '/images/slider-image-2.png',
    '/images/slider-image-3.png',
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide: number) => (prevSlide + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide: number) => (prevSlide - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <>
      <section className="section section__slider">
        <div className="slider">
          {sliderImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`slider__image ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ))}
        </div>
        <button className="slider__btn slider__prev-btn" onClick={prevSlide}>
          &#8249;
        </button>
        <button className="slider__btn slider__next-btn" onClick={nextSlide}>
          &#8250;
        </button>
      </section>

      <section className='section section__products'>
        <div className="product__list">
          {products.slice(3, 7).map((product) => {
            return (
              <div key={product.id} className="product__item">
                <h3 className="product__item__title">{product.title}</h3>
                <div className="product__item--wrapper">
                  <img
                    src={product.images[0]}
                    className="product__item--image"
                    alt="product"
                  />
                  <p className="product__item--category">{product.category}</p>
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
        <div>
          <button onClick={() => navigate('products')} className='section__products--details-button'>See All Products</button>
        </div>
      </section>
    </>
  );
};