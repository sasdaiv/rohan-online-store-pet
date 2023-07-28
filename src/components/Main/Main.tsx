import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import './Main.scss';
import { useState } from 'react';


export const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products)
  const navigate = useNavigate();

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
      {/* <section className='section section__header'>
        <h1 className='section__header--title'>Welcome to our ROHAN ONLINE STORE</h1>
        <p>
          We take pride in offering a wide range of high-quality products to meet all your needs. Whether you are looking for stylish fashion items, top-notch electronics, or unique home decor, we've got you covered.
          <br/>
          At our store, we prioritize quality and affordability, ensuring that our customers get the best value for their money. Our curated collection of products is carefully selected to cater to diverse tastes and preferences, making shopping a delightful experience for everyone.
          <br/>
          We are committed to providing exceptional customer service, and our team is always ready to assist you with any inquiries or concerns. Your satisfaction is our top priority, and we strive to exceed your expectations with every purchase.
          <br/>
          Explore our website and discover the latest trends, exclusive deals, and must-have items that will add a touch of style and functionality to your life. Whether you are shopping for yourself or looking for the perfect gift, you'll find something special in our store.
          <br/>
          Thank you for choosing us as your go-to destination for all things shopping. Happy shopping and enjoy the delightful experience of discovering fantastic products in our online store!
        </p>
      </section> */}
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
                    src={product.images[1]}
                    className="product__item--image"
                    alt="product"
                  />
                  <p className="product__item--category">{product.category.name}</p>
                  <button
                    className="product__item--add-button"
                    onClick={() => dispatch(cartActions.add({ product, quantity: 1 }))}
                  >
                    Add to Cart
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