import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-box">
      <h1>📞 Contact Us</h1>
      <p>
        We’d love to hear from you! Whether you have questions about our products — dresses, handbags, jewelry, electronics — orders, or anything else, feel free to reach out.
      </p>
      <p>Email: contact@luxestyles.com</p>
      <p>Phone: +1 234-567-890</p>
      <div className="contact-images">
        <div className="first-img">
          <img src="/images/images.jpg" alt="Fashion and lifestyle products" />
        </div>
        <div className="second-img">
          <img src="/images/contact-images (1).jpg" alt="Fashion collage" />
        </div>
      </div>
    </div>
  );
}

export default Contact;