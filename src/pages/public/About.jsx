import { Link } from 'react-router-dom';
import { Target, Eye, HeartHandshake, ShieldCheck, Users, Building2 } from 'lucide-react';

const values = [
  { title: 'Speed', desc: 'Every minute matters in an emergency — the platform is built to close the gap between request and response.', icon: Target },
  { title: 'Trust', desc: 'Donor and hospital accounts are verified and protected, so every connection is a reliable one.', icon: ShieldCheck },
  { title: 'Community', desc: 'A growing network of donors across Lahore means RLKMU Hospital is never searching alone.', icon: Users },
  { title: 'Care', desc: 'Behind every request is a patient and a family — the platform is designed around that reality.', icon: HeartHandshake },
];

const About = () => {
  return (
    <div>
      <section className="border-b border-black/5 bg-linen-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            A bridge built for the moments that can't wait.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
            Blood Bridge was developed for Rashid Latif Khan Medical University Hospital to close the
            gap between patients in need and the donors ready to help them — replacing scattered phone
            calls with one reliable, real-time platform.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div className="card p-8">
            <Target className="text-crimson-500" size={26} />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy-900">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              To ensure that no patient at RLKMU Hospital waits longer than necessary for compatible
              blood, by giving hospital staff instant visibility into a network of willing, available
              donors organized by blood group and location.
            </p>
          </div>
          <div className="card p-8">
            <Eye className="text-navy-800" size={26} />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy-900">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              A future where every hospital in the region has the same real-time confidence in its
              blood supply — built on a culture of registered, engaged, and recognized donors.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-linen-100 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl">
            <span className="eyebrow">What Guides Us</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">Our core values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <Building2 size={28} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">Rashid Latif Khan Medical University</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                RLKMU is a teaching hospital and medical university dedicated to clinical excellence and
                community health across Lahore. Blood Bridge is developed in service of its emergency
                and surgical departments, and the patients they treat every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-navy-900 py-16 text-center text-white">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Join the network today</h2>
        <p className="mx-auto mt-3 max-w-md text-navy-200">Register as a donor or partner hospital in minutes.</p>
        <Link to="/signup" className="btn-primary mt-6 inline-flex">Get Started</Link>
      </section>
    </div>
  );
};

export default About;
