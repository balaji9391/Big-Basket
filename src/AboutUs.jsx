import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutus">
      {/* Hero Section */}
      <section className="aboutus-hero">
        <motion.div
          className="hero-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>
            About <span>MyCart</span>
          </h1>
          <p>
            Freshness delivered to your doorstep 🛒.  
            We bring you the best vegetables, dairy, chocolates, and more.
          </p>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img src="/images/groceries.png" alt="Groceries" />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="aboutus-mission">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          To make online grocery shopping simple, fast, and reliable – ensuring
          freshness, affordability, and customer happiness.
        </motion.p>
      </section>

      {/* Values Section */}
      <section className="aboutus-values">
        <h2>Why Choose Us?</h2>
        <div className="values-grid">
          {[
            {
              img: "/images/fresh.webp",
              title: "Freshness & Quality ✅",
              desc: "Only the best and freshest products reach your home."
            },
            {
              img: "/images/lp.png",
              title: "Affordable Prices 💰",
              desc: "We deliver high quality at pocket-friendly rates.",
            },
            {
              img: "/images/fd.webp",
              title: "Fast Delivery 🚚",
              desc: "Super quick delivery so your groceries stay fresh.",
            },
            {
              img: "/images/support1.png",
              title: "Customer Satisfaction 💖",
              desc: "We go the extra mile to make your shopping experience smooth.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="value-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="aboutus-team">
        <h2>Meet Our Team</h2>
        <p>
          Behind MyCart is a passionate team working round-the-clock to bring
          you the best service and products.
        </p>
        <div className="team-grid">
          {[
            { img: "/images/psPic.jpg", name: "Balaji", role: "Founder & CEO" },
            { img: "/images/manager.png", name: "Sneha", role: "Operations Manager" },
            { img: "/images/support.png", name: "Ajay", role: "Customer Support" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-member"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="aboutus-contact">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p>
            Email: <a href="mailto:srirambalajimamidisetti@gmail.com">srirambalajimamidisetti@gmail.com</a>
          </p>
          <p>
            Phone: <a href="tel:+919391732731">+91 9391732731</a>
          </p>
          <p>Address: Amalapuram,Andhra Pradesdh, India</p>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutUs;
