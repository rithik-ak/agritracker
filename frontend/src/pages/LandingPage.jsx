import { Link } from "react-router-dom";
import {
  Leaf, BarChart2, CloudSun, ShoppingBasket,
  MessagesSquare, Bot, Star, ArrowRight,
  Mail, Phone, MapPin, ExternalLink,
} from "lucide-react";

/* ── data ── */
const features = [
  { icon: BarChart2,     title: "Expense Tracker",    desc: "Log income and expenses, visualise cash flow, and stay on top of your farm finances." },
  { icon: CloudSun,      title: "Weather Forecast",   desc: "Get real-time weather updates tailored to your farm location to plan your activities." },
  { icon: ShoppingBasket,title: "Market Prices",      desc: "Monitor daily crop market prices so you always sell at the right time." },
  { icon: MessagesSquare,title: "Community Chat",     desc: "Connect with fellow farmers, share tips, and grow together in real time." },
  { icon: Bot,           title: "AI Chatbot",         desc: "Ask our Llama-powered AI anything about crops, pests, soil, or irrigation." },
  { icon: BarChart2,     title: "Profit & Loss",      desc: "Instant P&L summaries so you always know how your farm is performing." },
];

const testimonials = [
  { name: "Ravi Kumar",    role: "Wheat Farmer, Punjab",       stars: 5, text: "Agri Tracker changed how I manage my farm. The expense tracker alone saved me thousands this season." },
  { name: "Priya Sharma",  role: "Vegetable Grower, Maharashtra", stars: 5, text: "The AI chatbot answered my pest control questions instantly. It's like having an agronomist in my pocket." },
  { name: "Suresh Patel",  role: "Dairy Farmer, Gujarat",      stars: 4, text: "Market prices and weather in one place — I no longer need five different apps. Highly recommended." },
];

/* ── sub-components ── */
const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-amber-400 text-amber-400" : "text-white/20"} />
    ))}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md ring-1 ring-inset ring-white/5 hover:bg-white/8 transition">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
      <Icon size={20} className="text-emerald-300" />
    </div>
    <h3 className="mb-2 font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/55">{desc}</p>
  </div>
);

const TestimonialCard = ({ name, role, stars, text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md ring-1 ring-inset ring-white/5">
    <StarRow count={stars} />
    <p className="mt-3 text-sm leading-relaxed text-white/70">"{text}"</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
        {name.split(" ").map((w) => w[0]).join("")}
      </div>
      <div>
        <p className="text-sm font-medium text-white/90">{name}</p>
        <p className="text-xs text-white/40">{role}</p>
      </div>
    </div>
  </div>
);

/* ── main page ── */
const LandingPage = () => (
  <div className="min-h-screen text-white">

    {/* ── HEADER / NAV ── */}
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081a16]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 ring-1 ring-emerald-400/30">
            <Leaf size={16} className="text-emerald-300" />
          </div>
          <span className="bg-gradient-to-r from-lime-300 to-emerald-200 bg-clip-text text-lg font-bold text-transparent">
            Agri Tracker
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          <a href="#features"     className="hover:text-white transition">Features</a>
          <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
          <a href="#contact"      className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login"    className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition">Login</Link>
          <Link to="/register" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition">
            Get Started
          </Link>
        </div>
      </div>
    </header>

    {/* ── HERO ── */}
    <section className="relative overflow-hidden px-5 py-24 text-center">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <span className="mb-5 inline-block rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 uppercase tracking-widest">
          Smart Farming Assistant
        </span>
        <h1 className="mt-4 bg-gradient-to-br from-white via-lime-200 to-emerald-300 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
          Farm Smarter.<br />Earn Better.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
          Track farm finances, monitor market prices, check weather forecasts, consult an AI agronomist, and connect with farmers — all in one beautiful dashboard.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-400 transition"
          >
            Start for Free <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white/80 hover:bg-white/8 transition"
          >
            Login
          </Link>
        </div>

        {/* stats row */}
        <div className="mt-14 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          {[["10K+","Farmers"],["₹2Cr+","Tracked"],["99%","Uptime"]].map(([val, lbl]) => (
            <div key={lbl} className="py-5">
              <p className="text-2xl font-bold text-emerald-300">{val}</p>
              <p className="mt-0.5 text-xs text-white/45">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FEATURES ── */}
    <section id="features" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">What we offer</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Everything a farmer needs</h2>
          <p className="mt-3 text-sm text-white/50">One platform. All the tools. Zero complexity.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section id="testimonials" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Trusted by farmers across India</h2>
          <p className="mt-3 text-sm text-white/50">Real stories from real farmers who transformed their operations.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
        </div>
      </div>
    </section>

    {/* ── CTA BANNER ── */}
    <section className="px-5 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-12 text-center backdrop-blur-md ring-1 ring-emerald-400/10">
        <h2 className="text-3xl font-bold text-white">Ready to grow smarter?</h2>
        <p className="mt-3 text-white/55">Join thousands of farmers already using Agri Tracker.</p>
        <Link
          to="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 font-semibold text-white hover:bg-emerald-400 transition shadow-lg shadow-emerald-900/30"
        >
          Create Free Account <ArrowRight size={16} />
        </Link>
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer id="contact" className="border-t border-white/10 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 ring-1 ring-emerald-400/30">
                <Leaf size={15} className="text-emerald-300" />
              </div>
              <span className="bg-gradient-to-r from-lime-300 to-emerald-200 bg-clip-text font-bold text-transparent">
                Agri Tracker
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Empowering farmers with smart tools to manage, grow, and thrive.
            </p>
            <div className="mt-5 flex gap-3">
              {[ExternalLink, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:border-emerald-400/30 hover:text-emerald-300 transition">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* product */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Product</p>
            <ul className="space-y-2.5 text-sm text-white/45">
              {["Features","Market Prices","Weather","AI Chatbot","Community"].map((l) => (
                <li key={l}><a href="#features" className="hover:text-emerald-300 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* company */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Company</p>
            <ul className="space-y-2.5 text-sm text-white/45">
              {["About Us","Blog","Careers","Privacy Policy","Terms of Service"].map((l) => (
                <li key={l}><a href="#" className="hover:text-emerald-300 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Contact</p>
            <ul className="space-y-3 text-sm text-white/45">
              <li className="flex items-center gap-2"><Mail size={13} className="text-emerald-400" /> support@agritracker.in</li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-emerald-400" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin size={13} className="text-emerald-400" /> Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row">
          <p>© {new Date().getFullYear()} Agri Tracker. All rights reserved.</p>
          <p>Built with ❤️ for Indian Farmers</p>
        </div>
      </div>
    </footer>

  </div>
);

export default LandingPage;
