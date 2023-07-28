import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__title">
        <img className="footer__title--logo" src="logo.svg" alt="logo" />
      </Link>
      <div className="footer__rights">&#169; All rights reserved.</div>

      <div className="footer__social">
        <a className="footer__social--link" href="https://facebook.com">
          <img className="footer__social--icon" src="/images/icons/facebook-logo.png" alt="facebook" />
        </a>
        <a className="footer__social--link" href="https://instagram.com">
          <img className="footer__social--icon" src="/images/icons/instagram-logo.png" alt="instagram" />
        </a>
      </div>
    </footer>
  )
}