// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CustomerSearchStep from '../CustomerSearchStep/CustomerSearchStep';
// import VehicleSelectionStep from '../VehicleSelectionStep/VehicleSelectionStep';
// import Addservices from '../CustomerProfile/Addservices';

// const NewOrderForm = () => {
//   const [step, setStep] = useState(1);
//   const [orderData, setOrderData] = useState({
//     customer: null,
//     vehicle: null,
//     services: [],
//     notes: '',
//     estimatedCompletion: ''
//   });
//   const navigate = useNavigate();

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const updateOrderData = (field, value) => {
//     setOrderData(prev => ({ ...prev, [field]: value }));
//   };

//   const submitOrder = async () => {
//     try {
//       // Implement your API call to submit the order
//       // await orderService.createOrder(orderData);
//       navigate('/admin/orders');
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <CustomerSearchStep 
//             onNext={(customer) => {
//               updateOrderData('customer', customer);
//               nextStep();
//             }}
//           />
//         );
//       case 2:
//         return (
//           <VehicleSelectionStep
//             customer={orderData.customer}
//             onNext={(vehicle) => {
//               updateOrderData('vehicle', vehicle);
//               nextStep();
//             }}
//             onBack={prevStep}
//           />
//         );
//       case 3:
//         return (
//           <Addservices
//             customer={orderData.customer}
//             vehicle={orderData.vehicle}
//             onBack={prevStep}
//             onSubmit={submitOrder}
//             onServicesSelect={(services) => updateOrderData('services', services)}
//           />
//         );
//       default:
//         return <CustomerSearchStep onNext={nextStep} />;
//     }
//   };

//   return (
//     <div className="card mb-4">
//       <div className="card-body">
//         <h2 className="mb-4">Create a New Order - Step {step} of 3</h2>
//         {renderStep()}
//       </div>
//     </div>
//   );
// };

// export default NewOrderForm;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerSearchStep from '../CustomerSearchStep/CustomerSearchStep';
import VehicleSelectionStep from '../VehicleSelectionStep/VehicleSelectionStep';
import Addservices from '../CustomerProfile/Addservices';

const NewOrderForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerIdFromUrl = queryParams.get('customerId');
  
  const [step, setStep] = useState(customerIdFromUrl ? 2 : 1);
  const [orderData, setOrderData] = useState({
    customer: customerIdFromUrl ? { customer_id: customerIdFromUrl } : null,
    vehicle: null,
    services: [],
    notes: '',
    estimatedCompletion: ''
  });
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateOrderData = (field, value) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const submitOrder = async () => {
    try {
      // Implement your API call to submit the order
      // await orderService.createOrder(orderData);
      navigate('/admin/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CustomerSearchStep 
            onNext={(customer) => {
              updateOrderData('customer', customer);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <VehicleSelectionStep
            customer={orderData.customer}
            onNext={(vehicle) => {
              updateOrderData('vehicle', vehicle);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Addservices
            customer={orderData.customer}
            vehicle={orderData.vehicle}
            onBack={prevStep}
            onSubmit={submitOrder}
            onServicesSelect={(services) => updateOrderData('services', services)}
          />
        );
      default:
        return <CustomerSearchStep onNext={nextStep} />;
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
      <div className="contact-title">
      <h2 className="mb-4">Create a new order</h2>

              </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default NewOrderForm;