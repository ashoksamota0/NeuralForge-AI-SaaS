import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800">Contact Us</h1>
          <p className="text-gray-500 mt-4">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              { icon: "📧", title: "Email", value: "support@neuralforge.ai" },
              { icon: "💬", title: "Response Time", value: "Within 24 hours" },
              { icon: "🌍", title: "Based In", value: "India" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
