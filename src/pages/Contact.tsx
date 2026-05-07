import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5 flex items-center justify-center">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">Get In Touch</h1>
          <p className="text-gray-400 text-lg">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-green-400 text-xl font-semibold">Thank you!</p>
            <p className="text-gray-400 mt-2">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="mb-5">
              <label className="text-gray-300 text-sm font-semibold mb-2 block">Full Name</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-orange-500/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6b7280" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-transparent text-white text-sm outline-none border-none w-full py-3 px-3 placeholder-gray-600"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="text-gray-300 text-sm font-semibold mb-2 block">Email Address</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-orange-500/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6b7280" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-transparent text-white text-sm outline-none border-none w-full py-3 px-3 placeholder-gray-600"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-300 text-sm font-semibold mb-2 block">Message</label>
              <div className="flex bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-orange-500/50 transition-colors">
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="bg-transparent text-white text-sm outline-none border-none w-full py-3 px-3 placeholder-gray-600 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-bold text-base border-none cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
