export const AddPayment = () => {


  // utils/loadRazorpay.js
 const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


  const createOrder = async () => {
    // console.log("createOrder");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Check your connection.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/create-order',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: 100
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message ?? 'Failed to create order. Please try again.');
        return;
      }

      const data = await response.json()

      if (!data.success || !data.order) {
        alert(data.message ?? 'Order creation failed. Please try again.');
        return;
      }


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public key, safe in frontend
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'ArtTech',
        description: 'Order Payment',
        order_id: data.order.id, // this ties the popup to the exact order your backend created
        handler: async function (
          response: any
        ) {
      // response contains: razorpay_order_id, razorpay_payment_id, razorpay_signature
      console.log("Response Verify Payment",response)
    try {
      const verifyRes = await fetch('http://localhost:3000/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id, 
          razorpay_signature:  response.razorpay_signature 
        }),
      });
      const result = await verifyRes.json();
      console.log("verify response",result)
      if (result.success) {
        alert('Payment successful!');
        // TODO: redirect to a success page, update UI, clear cart, etc.
      } else {
        alert('Payment verification failed. Contact support if money was deducted.');
      }
    } catch (err) {
      alert('Something went wrong verifying your payment. Please contact support.');
    }
  },
        // prefill: {
        //   name: 'Customer Name',
        //   email: 'customer@example.com',
        //   contact: '9999999999',
        // },
        theme: { color: '#3399cc' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
    catch (error) {
      console.log(error)
    }
  }



  
  return (
    <section className="flex justify-center items-center min-h-[40vh] p-8 w-full border-2"
      onClick={createOrder}
    >
      <button 
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/50 active:translate-y-px active:scale-[0.98] active:shadow-md flex items-center gap-3" 
        aria-label="Add Payment Method"
      >
        {/* <svg 
          className="w-6 h-6 fill-current" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" />
        </svg> */}
        <span>Add Method</span>
      </button>
    </section>
  );
};
