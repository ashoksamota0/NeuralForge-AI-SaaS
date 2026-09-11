import { Star, Quote } from "lucide-react";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      initials: "JD",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "NeuralForge has improved our marketing productivity. From blog content generation to campaign planning, it helps our team deliver results faster while maintaining quality.",
      rating: 5,
      avatar: "from-indigo-500 to-purple-500",
    },
    {
      initials: "JS",
      name: "Jane Smith",
      title: "Founder, Creative Studio",
      content:
        "The AI image generation and article writing tools are incredibly intuitive. NeuralForge has become my go-to platform for creating engaging content for social media and websites.",
      rating: 5,
      avatar: "from-pink-500 to-purple-500",
    },
    {
      initials: "DL",
      name: "David Lee",
      title: "Senior Content Strategist, GrowthHub",
      content:
        "What impressed me most is the versatility of NeuralForge. The resume review, content generation, and editing features save hours of manual work and help me focus on creativity.",
      rating: 5,
      avatar: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative overflow-hidden px-5 pt-14 pb-24 sm:px-8 lg:px-10">
      {/* Background Shapes */}
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-pink-50 px-4 py-1.5 text-xs font-medium text-pink-600 sm:text-sm">
            User Stories
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Loved by Creators
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyTestimonialData.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl border border-slate-100/80 border-t-2 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                index === 0
                  ? "border-t-indigo-300"
                  : index === 1
                    ? "border-t-pink-300"
                    : "border-t-blue-300"
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                <Quote className="h-5 w-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-4 w-4 ${
                        starIndex < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
              </div>

              {/* Content */}
              <p className="mt-6 min-h-[120px] text-sm leading-6 text-slate-600">
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-slate-100" />

              {/* User */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.avatar} text-sm font-semibold text-white shadow-sm`}
                >
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
