import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // This is a static contact form for the demo — wire it to a real endpoint/email service in production.
    setTimeout(() => {
      toast.success("Message sent — RLKMU's team will get back to you shortly.");
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 900);
  };

  return (
    <div>
      <section className="border-b border-black/5 bg-linen-50 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-5 text-lg text-ink-700">
            Whether you're a donor with a question or a hospital exploring the platform, reach out any time.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <div className="card space-y-6 p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-crimson-500" size={20} />
                <div>
                  <p className="font-semibold text-navy-900">Address</p>
                  <p className="text-sm text-ink-500">37-K, Block B1, Phase 1, Sector M-3, Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 shrink-0 text-crimson-500" size={20} />
                <div>
                  <p className="font-semibold text-navy-900">Phone</p>
                  <p className="text-sm text-ink-500">+92 42 3560 3800</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-crimson-500" size={20} />
                <div>
                  <p className="font-semibold text-navy-900">Email</p>
                  <p className="text-sm text-ink-500">bloodbridge@rlkmu.edu.pk</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 shrink-0 text-crimson-500" size={20} />
                <div>
                  <p className="font-semibold text-navy-900">Emergency Line</p>
                  <p className="text-sm text-ink-500">Staffed 24/7 for critical requests</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5 p-7 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="name">Full Name</label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Ayesha Khan" />
              </div>
              <div>
                <label className="label-field" htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="label-field" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" required value={form.subject} onChange={handleChange} className="input-field" placeholder="How can we help?" />
            </div>
            <div>
              <label className="label-field" htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} className="input-field resize-none" placeholder="Tell us more..." />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
              {submitting ? 'Sending…' : <>Send Message <Send size={16} /></>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
