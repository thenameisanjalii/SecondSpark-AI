import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Battery,
  Leaf,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Recycle,
  BrainCircuit,
  Globe,
  Award
} from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    color: 'emerald',
    title: 'AI-Powered Battery Grading',
    desc: 'RandomForest ML model trained on thousands of charge cycles predicts State of Health (SOH) and Remaining Useful Life (RUL) with surgical precision — in milliseconds.'
  },
  {
    icon: Recycle,
    color: 'indigo',
    title: 'Second-Life Routing Engine',
    desc: 'Don\'t scrap it — repurpose it. Our recommendation engine intelligently routes EV batteries to their next highest-value use: EV use, solar storage, or material recovery.'
  },
  {
    icon: BarChart3,
    color: 'violet',
    title: 'Real-Time Diagnostic Dashboard',
    desc: 'Live battery diagnostics via an interactive React dashboard. Input raw battery metrics and get instant AI-driven health grading and lifecycle classification.'
  },
  {
    icon: ShieldCheck,
    color: 'sky',
    title: 'Digital Material Passport',
    desc: 'Every battery gets a traceable identity. A blockchain-ready material passport records health history, composition data, and circular economy impact in one secure record.'
  },
  {
    icon: Leaf,
    color: 'green',
    title: 'Carbon Offset Intelligence',
    desc: 'Quantify the green impact. For every battery kept alive, SecondSpark AI calculates estimated CO₂ savings vs. manufacturing a new battery from raw materials.'
  },
  {
    icon: Globe,
    color: 'amber',
    title: 'Circular Economy Protocol',
    desc: 'Built for the future of sustainable mobility. We align with EU Battery Regulation 2023/1542 and support global circular economy initiatives by extending battery lifetime.'
  }
];

const stats = [
  { value: '2x', label: 'Battery Lifespan Extended' },
  { value: '150kg', label: 'CO₂ Saved Per Battery' },
  { value: '<100ms', label: 'Prediction Latency' },
  { value: '98%', label: 'SOH Accuracy' },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 py-5 border-b border-slate-800/60 backdrop-blur-sm bg-slate-950/80 sticky top-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/30">
            <Zap className="text-slate-950" size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            SecondSpark<span className="text-emerald-400">AI</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-slate-500 px-3 py-1 border border-slate-700 rounded-full">
            🏆 Hackathon 2026
          </span>
          <button
            id="nav-try-now"
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:shadow-emerald-500/20 hover:scale-[1.03]"
          >
            <span>Try Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-4 py-2 mb-8 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Award size={13} />
          <span>Circular Economy · AI for Sustainability · Battery Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 max-w-4xl">
          Every Battery Deserves<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            A Second Life.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-4 leading-relaxed">
          SecondSpark AI uses machine learning to predict EV battery health,
          extend lifespan, and intelligently route retired batteries into their
          highest-value second-life use — from solar storage to material recovery.
        </p>
        <p className="text-base text-slate-500 max-w-xl mb-10">
          Built in 24 hours for the future of mobility. Powered by RandomForest ML, FastAPI, and React.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="hero-try-now"
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center space-x-3 shadow-2xl shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.04] text-lg"
          >
            <span>Try the Live Demo</span>
            <ChevronRight size={22} />
          </button>
          <a
            href="#features"
            className="text-slate-400 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all duration-200 flex items-center space-x-2"
          >
            <span>Learn More</span>
          </a>
        </div>

        {/* Hero visual — animated battery cell grid */}
        <div className="mt-20 grid grid-cols-5 gap-3 opacity-30 select-none" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-12 h-6 rounded border border-emerald-500/40 bg-emerald-500/10 flex items-center"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div
                className="h-full bg-emerald-500/40 rounded-sm"
                style={{ width: `${30 + ((i * 17 + 23) % 65)}%` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">What We Built</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Not Just a Dashboard.<br />
            <span className="text-slate-400">A Full Battery Intelligence Platform.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Six integrated capabilities, one mission: stop wasting batteries that still have life left in them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <div
                key={f.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50 group"
              >
                <div className={`w-11 h-11 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className={c.text} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 bg-slate-900/50 border-y border-slate-800 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">The Flow</p>
            <h2 className="text-4xl font-black text-white mb-3">From Dead Battery to New Purpose</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Three steps. One intelligent pipeline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Battery, title: 'Input Battery Data', desc: 'Enter charge cycles, voltage, temperature, and capacity into the diagnostic interface.' },
              { step: '02', icon: BrainCircuit, title: 'AI Grades the Battery', desc: 'Our RandomForest model predicts SOH and RUL with high accuracy in under 100ms.' },
              { step: '03', icon: Recycle, title: 'Get a Second-Life Plan', desc: 'Receive an intelligent routing recommendation: keep driving, store solar, or extract materials.' },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="text-8xl font-black text-slate-800 select-none absolute -top-4 left-1/2 -translate-x-1/2">{item.step}</div>
                <div className="relative z-10 bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full">
                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-indigo-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
        <div className="bg-gradient-to-br from-emerald-950/60 to-indigo-950/60 border border-emerald-500/20 rounded-3xl p-12 md:p-16 shadow-2xl shadow-emerald-900/20">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap size={32} className="text-emerald-400" fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Ready to Spark<br />a Second Life?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Plug in your battery data and watch AI determine whether it powers your next
            road trip, your home's solar grid, or a cleaner recycling stream.
          </p>
          <button
            id="cta-try-now"
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 py-5 rounded-2xl text-xl flex items-center space-x-3 mx-auto shadow-2xl shadow-emerald-900/50 transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.04]"
          >
            <span>Launch Dashboard</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-800 px-6 py-8 text-center text-slate-600 text-sm">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-1 bg-emerald-500 rounded-md">
            <Zap size={12} className="text-slate-950" fill="currentColor" />
          </div>
          <span className="font-bold text-slate-400">SecondSpark AI</span>
        </div>
        <p>Built with ❤️ by Team Auto_Catalysts · Circular Economy · AI for Sustainability</p>
      </footer>
    </div>
  );
};

export default LandingPage;
