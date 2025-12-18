import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { cartContext } from "../Context/cartContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadRazorpay } from "../utils/loadRazorpay";

function Payment() {
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // ✅ only two options now
  const [payment, setPayment] = useState("online");

  const { cart, total, reloadCart } = useContext(cartContext);
  const [savedShipping, setSavedShipping] = useState(null);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!savedShipping) {
      toast.error("Please save shipping details first!");
      return;
    }

    if (!payment) {
      toast.error("Please select a payment method!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) {
      toast.error("Please login to place an order");
      return;
    }

    // ✅ CASH ON DELIVERY
    if (payment === "cod") {
      try {
        await axios.post(
          "http://127.0.0.1:8000/orders/place_orders/",
          {
            shippingInfo: savedShipping,
            paymentMethod: "cod",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        reloadCart && reloadCart();
        toast.success("Order placed successfully");
        navigate("/order-success");
      } catch (err) {
        console.error(err);
        toast.error("Failed to place COD order");
      }
      return;
    }

    // 🚀 ONLINE PAYMENT (RAZORPAY)
    startRazorpayPayment(token);
  };

  const startRazorpayPayment = async (token) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order
      const orderRes = await axios.post(
        "http://127.0.0.1:8000/payment/create/",
        { amount: total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order_id, key } = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key,
        amount: total * 100,
        currency: "INR",
        name: "Medical Store",
        description: "Order Payment",
        order_id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            await axios.post(
              "http://127.0.0.1:8000/payment/verify/",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // 4️⃣ Place order after successful payment
            await axios.post(
              "http://127.0.0.1:8000/orders/place_orders/",
              {
                shippingInfo: savedShipping,
                paymentMethod: "online",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            reloadCart && reloadCart();
            toast.success("Payment successful 🎉");
            navigate("/order-success");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },

        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed", response.error);
        toast.error(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Unable to start payment");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold text-center mb-8">Payment Page</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* SHIPPING */}
          <div className="md:col-span-2 ml-10 bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Shipping Details
            </h3>

            {["fullName", "phone", "address", "pincode"].map((field) => (
              <div className="mb-4" key={field}>
                <input
                  placeholder={field}
                  className="w-4/5 p-2 rounded bg-gray-800 border border-gray-700"
                  value={shipping[field]}
                  onChange={(e) =>
                    setShipping({ ...shipping, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            <button
              className="w-4/5 mt-4 py-2 bg-green-600 rounded-lg"
              onClick={() => {
                if (
                  !shipping.fullName ||
                  !shipping.phone ||
                  !shipping.address ||
                  !shipping.pincode
                ) {
                  toast.error("Fill all shipping details");
                  return;
                }
                setSavedShipping(shipping);
                toast.success("Shipping details saved");
              }}
            >
              Continue
            </button>
          </div>

          {/* PAYMENT METHOD */}
          <div className="md:col-span-2 p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Payment Method
            </h3>

            <label className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mb-3 cursor-pointer">
              <input
                type="radio"
                value="online"
                checked={payment === "online"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Online Payment (GPay / Card / UPI)</span>
            </label>

            <label className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mb-3 cursor-pointer">
              <input
                type="radio"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>

            <button
              onClick={placeOrder}
              className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
