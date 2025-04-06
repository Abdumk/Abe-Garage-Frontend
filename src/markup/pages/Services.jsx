import React from 'react'
import Weare from '../components/reuse/weare/Weare';
import  WhyChoose from '../components/reuse/whychoose/WhyChoose';
import Schedule from '../components/reuse/schedule/Schedule';

import Ourservices from '../components/reuse/ourservices/Ourservices';
import backgroundImage from '../../assets/images/banner/banner.jpg'; // Adjust path as needed
function Services() {
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
          <h5>Working since 1992</h5>
          <h2>Our Services</h2>
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
              Home <br /> Services
            </div>
          </div>
        </div>
      </section>
   
<Ourservices />

 <WhyChoose/>
      <Weare/>
      <Schedule/>
      </div>
    </>
  )
}

export default Services