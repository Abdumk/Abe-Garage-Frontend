import React from 'react'

import Weare from '../components/reuse/weare/Weare';
import  WhyChoose from '../components/reuse/whychoose/WhyChoose';
import Schedule from '../components/reuse/schedule/Schedule';
import Experience from '../components/reuse/experience/Experience';
import backgroundImage from '../../assets/template_assets/images/background/bg-1.jpg'; // Update path if needed
function Contact() {
  return (
    <>
  <div className="page-wrapper">
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="auto-container">
          {/* <h5>Working since 1992</h5> */}
          <h2>Contact Us</h2>
          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Home <br /> About Us
            </div>
          </div>
        </div>
      </section>
      </div>
      <br /> <br /> <br />    
      <div className="page-wrapper">
      <section className="contact-info-section">
  <div className="auto-container">
    <div className="row clearfix">
      {/* Map Column */}
      <div className="map-column col-lg-6 col-md-12 col-sm-12">
        <div className="map-outer">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.5731391563146!2d-77.05975968464891!3d39.038963979546025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c9b566278df9%3A0x2e4a8e5b4d6f7160!2sAutoserv%2C%202401%20University%20Blvd%20W%2C%20Wheaton%2C%20MD%2020902%2C%20USA!5e0!3m2!1sen!2set!4v1712462299180!5m2!1sen!2set"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Info Column */}
      <div className="info-column col-lg-6 col-md-12 col-sm-12">
        <div className="inner-column">
          <h2>Our Address</h2>
          <p className="text">
            Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service.
          </p>
          <ul className="list">
            <li>
              <div className="icon">
                <span className="flaticon-pin"></span>
              </div>
              <strong>Address:</strong> 54B, Tailstoi Town 5238 MT, La city, IA 5224
            </li>
            <li>
              <div className="icon">
                <span className="flaticon-email"></span>
              </div>
              <strong>Email:</strong> contact@buildtruck.com
            </li>
            <li>
              <div className="icon">
                <span className="flaticon-phone"></span>
              </div>
              <strong>Phone:</strong> 1800 456 7890 / 1254 897 3654
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
</div>


 
      <Schedule/>

    </>
  )
}

export default Contact