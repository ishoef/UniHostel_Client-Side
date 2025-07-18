import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};

  if (!plan) {
    navigate("/"); // or show error
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-orange-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Pay for {plan.name} Plan
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm plan={plan} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
