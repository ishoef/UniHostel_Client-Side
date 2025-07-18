import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  //   const axiosSecure = useAxiosSecure();
  console.log(plan);

 const price = plan.price;
 const priceInCents = Math.round(price * 100); //Convert to cents for stripe

  console.log(`Price in cents: ${priceInCents}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (!card) {
      return Swal.fire("Error", "Card element not found", "error");
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    console.log("Payment Method:", paymentMethod);

    if (error) {
      setLoading(false);
      //   Swal.fire("Error", error.message, "error");
      setError(error.message);
    } else {
      setError(null);
    }

    //   Create Payment Intent
    try {
      // Send paymentMethod + plan + user info to backend
      const res = await axios.post(
        `http://localhost:5000/create-payment-intent`,
        {
          userID: user.uid,
          userName: user.displayName,
          email: user.email,
          plan: plan.name.toLowerCase(),
          price: priceInCents,
          paymentMethodId: paymentMethod.id,
        }
      );

      console.log("Payment Intent Response:", res);

      const { clientSecret } = res.data;
      // Confirm the payment

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
    
    console.log("Payment Result:", result);

      if (result.error) {
        setLoading(false);
        setError(result.error.message);
        Swal.fire("Error", result.error.message, "error");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setLoading(false);
          Swal.fire("Success", "Payment successful!", "success");
        }
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Payment failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Summary */}
      <div className="p-4 border border-orange-500 rounded-xl bg-white/60 shadow-sm text-md text-gray-700">
        <p>
          <span className="font-semibold text-orange-600">Plan:</span>{" "}
          {plan.name}
        </p>
        <p>
          <span className="font-semibold">Duration:</span> {plan.duration}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${plan.price.toFixed(2)}
        </p>
        <p className="text-green-600">💡 {plan.highlights.join(" + ")}</p>
      </div>

      {/* Card Input */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#1f2937", // text-gray-800
              backgroundColor: "#fff",
              fontFamily: '"Inter", sans-serif',
              "::placeholder": {
                color: "#9ca3af", // text-gray-400
              },
            },
            invalid: {
              color: "#ef4444", // red-500
            },
          },
        }}
        className="p-4 border-2 border-orange-300 rounded-2xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe}
        className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold shadow transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${plan.price.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
