import React from "react";
import { Header } from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../../pages/HomePage";
import ProductListingPage from "../../pages/ProductListingPage";
import CartPage from "../../pages/CartPage";
import ProductDetailPage from "../../pages/ProductDetailsPage";
import { useEffect } from "react";
import { actions as productsActions } from "../../store/productsSlice";
import { useAppDispatch } from "../../store/hooks";
import './Layout.scss'

export const Layout = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(res => res.json())
      .then(json => dispatch(productsActions.set(json)))
  })


  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" >
            <Route index element={<ProductListingPage />} />
            <Route path=":productId" element={<ProductDetailPage />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<h1>Page not found...</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}