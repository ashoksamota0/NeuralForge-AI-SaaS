// import React from 'react'
// import {PricingTable} from '@clerk/clerk-react'

// const Plan = () => {
//   return (
//     <div className='max-w-2xl mx-auto z-20 my-30'>

//       <div className='text-center'>
//         <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
//         <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
//       </div>

//       <div className='mt-14 max-sm:mx-8'>
//         <PricingTable />
//       </div>

//     </div>
//   )
// }

// export default Plan

import React from "react";

const Plan = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center">
        <h2 className="text-slate-800 text-5xl font-bold">Choose Your Plan</h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-4">
          Choose a plan to unlock advanced AI content creation tools and boost
          your productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        {/* Free Plan */}
        <div className="border rounded-2xl p-8 shadow-sm bg-white">
          <h3 className="text-2xl font-semibold text-slate-800">Free Plan</h3>

          <p className="text-gray-500 mt-3">
            Perfect for getting started with AI-powered content creation.
          </p>

          <div className="text-4xl font-bold mt-6">
            ₹0
            <span className="text-lg text-gray-500 font-normal"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✓ AI Article Generation</li>
            <li>✓ Blog Title Generator</li>
            <li>✓ Limited Usage</li>
          </ul>

          <button className="w-full mt-8 border border-gray-300 py-3 rounded-lg font-medium">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border-2 border-indigo-500 rounded-2xl p-8 shadow-md bg-white">
          <h3 className="text-2xl font-semibold text-slate-800">
            Premium Plan
          </h3>

          <p className="text-gray-500 mt-3">
            Unlock all advanced AI features without limits.
          </p>

          <div className="text-4xl font-bold mt-6">
            ₹499
            <span className="text-lg text-gray-500 font-normal"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✓ Unlimited AI Articles</li>
            <li>✓ AI Image Generation</li>
            <li>✓ Resume Review</li>
            <li>✓ Background Removal</li>
            <li>✓ Object Removal</li>
            <li>✓ Priority Access</li>
          </ul>

          <button className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg cursor-not-allowed opacity-80">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
