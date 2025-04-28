import React from 'react'
//import img3 from "../../../../assets/template_assets/images/resource/image-3.jpg" //Adjust the path and dim is 946x533 as needed
import img3 from "../../../../assets/images/banner/young_car_workshop.jpg" //Adjust the path and dim is 946x533 as needed

function QualityService() {
  return (
    <div className="page-wrapper">
 <section className="features-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="inner-container">
              <h2>
                Quality Service And <br /> Customer Satisfaction !!
              </h2>
              <div className="text">
                We utilize the most recent symptomatic gear to ensure your vehicle is fixed or adjusted appropriately
                and in an opportune manner. We are an individual from Professional Auto Service, a first class
                execution arrange, where free assistance facilities share shared objectives of being world-class car
                administration focuses.
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image">
              <img src={img3} alt="Customer Satisfaction" />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default QualityService