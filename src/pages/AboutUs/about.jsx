import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-box">
      <h1> About LuxeStyles</h1>
      <p>
        Welcome to <strong>LuxeStyles</strong> — your premier destination for stylish fashion, accessories, and lifestyle essentials.
      </p>
      <br />
      <p>
        We believe your style is an expression of who you are. Whether you’re searching for elegant dresses, luxury handbags, sparkling jewelry, or the latest electronic gadgets, LuxeStyles brings you products that combine style, quality, and functionality.
      </p>
      <div className="about-list">
        <p>We focus on:</p>
        <ul>
          <li>✔️ Quality materials</li>
          <li>✔️ Affordable prices</li>
          <li>✔️ Trendy and timeless designs</li>
          <li>✔️ Customer satisfaction</li>
        </ul>
      </div>
      <div>
        <img
          className="about-img"
          src="/images/about-images (1).jpg"
          alt="Fashion and lifestyle products"
        />
      </div>
      <br />
      <p>
        Our mission is simple — to provide products that not only look great but also enhance your everyday life.
      </p>
      <p>Thank you for choosing LuxeStyles ❤️</p>
    </div>
  );
}

export default About;