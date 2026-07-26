import { Link } from 'react-router-dom';
import {
  Droplet, Search, Bell, ShieldCheck, MapPin, Clock, Heart,
  Users, Building2, ArrowRight, UserPlus, Siren, HeartPulse,
} from 'lucide-react';

const stats = [
  { value: '8', label: 'Blood Groups Tracked', icon: Droplet },
  { value: '<15 min', label: 'Avg. Donor Match Time', icon: Clock },
  { value: '24/7', label: 'Emergency Requests', icon: Siren },
  { value: '100%', label: 'Verified Hospital Access', icon: ShieldCheck },
];

const steps = [
  {
    title: 'Register your profile',
    desc: 'Donors sign up once with their blood group, city, and area. Hospitals register with verified credentials.',
    icon: UserPlus,
  },
  {
    title: 'Hospital raises a request',
    desc: 'RLKMU Hospital posts an emergency request specifying blood group, units, and urgency level.',
    icon: Siren,
  },
  {
    title: 'Matching donors are notified',
    desc: 'The request appears instantly on the dashboards of available donors with a matching blood group nearby.',
    icon: Bell,
  },
  {
    title: 'Donor responds & saves a life',
    desc: 'A willing donor reaches out, visits the hospital, and the donation is logged to their history.',
    icon: HeartPulse,
  },
];

const reasons = [
  { title: 'One donation, three lives', desc: 'A single blood donation can be separated into red cells, plasma, and platelets to help multiple patients.' },
  { title: 'Your body replenishes fast', desc: 'Blood volume is typically restored within 24–48 hours, and red cells within a few weeks.' },
  { title: 'A five-minute act, a lasting impact', desc: 'The donation itself takes about 10 minutes, but the difference it makes can last a lifetime.' },
  { title: 'Always in demand', desc: 'Accident victims, surgical patients, and those with chronic conditions rely on a steady donor pool.' },
];

const features = [
  { title: 'Smart Donor Search', desc: 'Hospitals filter registered donors instantly by blood group, city, and area.', icon: Search },
  { title: 'Live Emergency Feed', desc: 'Every active request reaches available donors the moment it is posted.', icon: Bell },
  { title: 'Availability Control', desc: 'Donors toggle their status so hospitals only reach out when they are ready to give.', icon: ShieldCheck },
  { title: 'Donation History', desc: 'A running record of past donations helps donors and hospitals track impact over time.', icon: Heart },
  { title: 'Location-Aware Matching', desc: 'City and area fields keep donor discovery fast and locally relevant.', icon: MapPin },
  { title: 'Secure Accounts', desc: 'JWT-based authentication keeps donor and hospital data protected.', icon: Users },
];

const Home = () => {
  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-linen-50 pb-20 pt-14 lg:pb-28 lg:pt-20">
        {/* Ambient pulse-line watermark, signature motif */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 text-crimson-100 lg:block"
          height="180"
          viewBox="0 0 1400 180"
          fill="none"
        >
          <polyline
            points="0,90 260,90 300,20 340,160 380,50 420,90 1400,90"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="animate-fade-up">
            <span className="eyebrow">RLKMU Hospital · Blood Donor Network</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              A faster bridge between <span className="text-crimson-500">donors</span> and patients who need them.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-700">
              Blood Bridge connects Rashid Latif Khan Medical University Hospital with registered blood
              donors in real time — so emergencies are met with readiness, not delay.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary">
                <Droplet size={18} /> Become a Donor
              </Link>
              <Link to="/login" className="btn-secondary">
                <Siren size={18} /> Emergency Request
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <s.icon size={18} className="mb-1.5 text-crimson-500" />
                  <p className="font-mono text-xl font-bold text-navy-900">{s.value}</p>
                  <p className="text-xs text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: stylized donor match card stack */}
          <div className="relative hidden lg:block">
            <div className="card relative ml-auto w-80 -rotate-2 p-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Active Request</span>
                <span className="rounded-full bg-crimson-500 px-2.5 py-0.5 text-xs font-semibold text-white">Critical</span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-navy-900">O- needed · 3 units</p>
              <p className="mt-1 text-sm text-ink-500">RLKMU Hospital, Lahore</p>
              <div className="mt-4 flex items-center gap-2 border-t border-black/5 pt-4">
                <div className="h-8 w-8 rounded-full bg-navy-100" />
                <div className="h-8 w-8 rounded-full bg-crimson-100" />
                <div className="h-8 w-8 rounded-full bg-mint-100" />
                <span className="ml-1 text-xs font-medium text-ink-500">6 matching donors nearby</span>
              </div>
            </div>
            <div className="card absolute -bottom-8 -left-4 w-64 rotate-3 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-100 font-mono text-sm font-bold text-mint-500">
                  A+
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Marked Available</p>
                  <p className="text-xs text-ink-500">Gulberg, Lahore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT BLOOD BRIDGE + RLKMU ---------------- */}
      <section className="border-t border-black/5 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="eyebrow">About Blood Bridge</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Built to remove friction from every emergency.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-700">
              Blood Bridge is a dedicated donor management platform that gives RLKMU Hospital an
              always-on view of registered, willing donors. Instead of relying on phone chains and
              guesswork during a crisis, hospital staff can search by blood group and location, then
              broadcast a request that reaches the right people in seconds.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {['Verified donor and hospital accounts', 'Real-time emergency request feed', 'Location-aware donor matching'].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">About RLKMU Hospital</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              A teaching hospital rooted in community care.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-700">
              Rashid Latif Khan Medical University Hospital serves as a clinical and academic hub,
              training future physicians while treating patients across Lahore. Its emergency and
              surgical departments depend on a reliable blood supply — Blood Bridge extends that
              reliability into the community, one registered donor at a time.
            </p>
            <div className="card mt-6 flex items-center gap-4 p-5">
              <Building2 className="text-navy-800" size={28} />
              <div>
                <p className="font-display font-semibold text-navy-900">RLKMU Hospital</p>
                <p className="text-sm text-ink-500">37-K, Block B1, Phase 1, Sector M-3, Lahore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="bg-linen-100 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              From registration to donation, in four steps.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="card relative p-6">
                <span className="font-mono text-xs font-semibold text-crimson-400">STEP {String(i + 1).padStart(2, '0')}</span>
                <step.icon className="mt-4 text-navy-800" size={26} />
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY DONATE BLOOD ---------------- */}
      <section className="bg-navy-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-crimson-300">Why Donate Blood?</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Every donor keeps the bridge standing.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Heart className="text-crimson-400" size={22} />
                <h3 className="mt-4 font-display font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl">
            <span className="eyebrow">Platform Features</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Everything RLKMU needs to respond fast.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-50 text-crimson-500">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-linen-100 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-crimson-500 px-8 py-14 text-center text-white lg:px-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to be someone's bridge to recovery?</h2>
          <p className="mx-auto mt-4 max-w-lg text-crimson-50">
            Registration takes less than three minutes. Your blood group could be exactly what
            someone needs today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display font-semibold text-crimson-600 transition-transform hover:scale-[1.02]">
              Become a Donor <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-white/10">
              Contact RLKMU
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section id="contact" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 rounded-3xl border border-black/5 bg-linen-50 p-8 lg:grid-cols-3 lg:p-12">
            <div>
              <span className="eyebrow">Get in Touch</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy-900">Questions about Blood Bridge?</h2>
              <p className="mt-3 text-sm text-ink-500">Our team at RLKMU Hospital is happy to help donors and partner organizations alike.</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600">
                Visit contact page <ArrowRight size={15} />
              </Link>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-navy-800" size={20} />
              <div>
                <p className="font-semibold text-navy-900">Location</p>
                <p className="text-sm text-ink-500">37-K, Block B1, Phase 1, Sector M-3, Lahore, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 shrink-0 text-navy-800" size={20} />
              <div>
                <p className="font-semibold text-navy-900">Emergency Line</p>
                <p className="text-sm text-ink-500">Available 24/7 for critical blood requests</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
