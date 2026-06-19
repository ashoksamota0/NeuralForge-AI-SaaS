import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800">
            About NeuralForge
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We're on a mission to make AI-powered content creation accessible to
            everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed">
              NeuralForge was built with a simple idea — content creation
              shouldn't be hard. Whether you're a blogger, marketer, or
              developer, our AI tools help you generate articles, images, and
              more in seconds.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Powered by cutting-edge AI models, NeuralForge brings
              enterprise-grade content tools to individuals and small teams at
              an accessible price.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 flex items-center justify-center">
            <span className="text-7xl">🤖</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: "✍️",
              title: "AI Article Writer",
              desc: "Generate high-quality, engaging articles on any topic with our advanced AI writing technology.",
            },
            {
              icon: "#️⃣",
              title: "Blog Title Generator",
              desc: "Find the perfect, catchy title for your blog posts with our AI-powered title generator.",
            },
            {
              icon: "🎨",
              title: "AI Image Generation",
              desc: "Create stunning visuals from text prompts using state-of-the-art image generation models.",
            },
            {
              icon: "✂️",
              title: "Background Removal",
              desc: "Effortlessly remove backgrounds from your images with our AI-driven tool.",
            },
            {
              icon: "🪄",
              title: "Object Removal",
              desc: "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
            },
            {
              icon: "📄",
              title: "Resume Reviewer",
              desc: "Get actionable AI feedback on your resume to improve your chances of landing your dream job.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-indigo-200 mb-6">
            Join thousands of creators using NeuralForge today.
          </p>
          <a
            href="/ai"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Try for Free →
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
