import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Leaf, 
  Battery, 
  Zap, 
  Thermometer, 
  RefreshCcw,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface BatteryMetrics {
  state_of_health: string;
  remaining_useful_life: string;
  health_status: string;
}

interface AIRecommendation {
  primary_action: string;
  target_ecosystem: string;
  technical_suitability: string;
}

interface PredictionResult {
  battery_metrics: BatteryMetrics;
  ai_recommendation: AIRecommendation;
}

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const SidebarItem = ({ id, icon: Icon, label, activeTab, setActiveTab }: SidebarItemProps) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      activeTab === id 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    cycle: 100,
    voltage: 3.8,
    temperature: 25.0,
    capacity: 1.95
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${baseUrl}/api/v1/battery/grade`, formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch prediction. Ensure the backend service is running and accessible.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/')} className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors" aria-label="Back to home">
            <ArrowLeft size={20} />
          </button>
          <div className="p-1.5 bg-emerald-500 rounded-lg">
            <Zap className="text-slate-950" size={18} fill="currentColor" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white">SecondSpark<span className="text-emerald-500">AI</span></h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside 
            className="w-64 max-w-[80vw] h-full border-r border-slate-800 p-6 flex flex-col space-y-8 bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 px-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Zap className="text-slate-950" size={20} fill="currentColor" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">SecondSpark<span className="text-emerald-500">AI</span></h1>
            </div>

            <nav className="flex-1 space-y-2">
              <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsMobileMenuOpen(false); }} />
              <SidebarItem id="passport" icon={FileText} label="Material Passport" activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsMobileMenuOpen(false); }} />
              <SidebarItem id="sustainability" icon={Leaf} label="Sustainability" activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsMobileMenuOpen(false); }} />
            </nav>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Secure Enterprise Node</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
                Circular Economy protocol v1.0
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-800 p-6 flex-col space-y-8 bg-slate-900/50 flex-shrink-0">
        <div className="flex items-center space-x-3 px-2">
          <button onClick={() => navigate('/')} className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors mr-1" title="Back to home">
            <ArrowLeft size={18} />
          </button>
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Zap className="text-slate-950" size={24} fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">SecondSpark<span className="text-emerald-500">AI</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="passport" icon={FileText} label="Material Passport" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="sustainability" icon={Leaf} label="Sustainability" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Secure Enterprise Node</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
            Circular Economy protocol v1.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'dashboard' ? 'Battery Intelligence' : 
               activeTab === 'passport' ? 'Digital Material Passport' : 'Sustainability Impact'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {activeTab === 'dashboard' ? 'Perform deep-life diagnostics and second-life grading.' : 
               activeTab === 'passport' ? 'Blockchain-verified material traceability and compliance.' : 'Carbon offset tracking and circular economy metrics.'}
            </p>
          </div>
          <div className="flex space-x-4 shrink-0">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">Backend: Online</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Analysis Form */}
            <section className="lg:col-span-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                  <BarChart3 size={18} className="text-emerald-500" />
                  <span>Input Parameters</span>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Charge Cycles</label>
                    <div className="relative">
                      <RefreshCcw className="absolute left-3 top-3 text-slate-600" size={18} />
                      <input 
                        type="number" name="cycle" value={formData.cycle} onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Voltage (V)</label>
                      <div className="relative">
                        <Zap className="absolute left-3 top-3 text-slate-600" size={18} />
                        <input 
                          type="number" step="0.01" name="voltage" value={formData.voltage} onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Temp (°C)</label>
                      <div className="relative">
                        <Thermometer className="absolute left-3 top-3 text-slate-600" size={18} />
                        <input 
                          type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Capacity (Ah)</label>
                    <div className="relative">
                      <Battery className="absolute left-3 top-3 text-slate-600" size={18} />
                      <input 
                        type="number" step="0.01" name="capacity" value={formData.capacity} onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Predict Health</span>
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-2 text-red-400 text-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Results Display */}
            <section className="lg:col-span-8">
              {!result && !loading && (
                <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                  <Battery size={48} className="mb-4 opacity-20" />
                  <p>Input battery parameters and run prediction to see results.</p>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Metric Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* SOH Gauge-like Card */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={80} />
                      </div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">State of Health</p>
                      <div className="flex items-end space-x-2">
                        <h4 className="text-5xl font-black text-white">{result.battery_metrics.state_of_health}</h4>
                      </div>
                      <div className="mt-4 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(100, parseFloat(result.battery_metrics.state_of_health))}%` }}
                        />
                      </div>
                    </div>

                    {/* RUL Card */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Remaining Life</p>
                      <h4 className="text-4xl font-bold text-white mb-2">{result.battery_metrics.remaining_useful_life}</h4>
                      <p className="text-sm text-slate-400">Estimated duration based on current degradation curve.</p>
                    </div>

                    {/* Status Card */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Diagnostic Result</p>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          result.battery_metrics.health_status === 'Healthy' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {result.battery_metrics.health_status}
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-400">Model: RandomForest Classifier v1.2</p>
                    </div>
                  </div>

                  {/* Recommendation Section */}
                  <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-3">Second-Life Recommendation</h3>
                        <h4 className="text-2xl font-bold text-white mb-2">{result.ai_recommendation.primary_action}</h4>
                        <p className="text-slate-400 max-w-lg">{result.ai_recommendation.technical_suitability}</p>
                      </div>
                      <div className="bg-indigo-500 text-white px-6 py-4 rounded-xl shadow-lg shadow-indigo-900/40 text-center">
                        <span className="block text-[10px] uppercase font-bold opacity-70 mb-1">Target Ecosystem</span>
                        <span className="text-lg font-bold">{result.ai_recommendation.target_ecosystem}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="h-[400px] border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 italic">
            <ShieldCheck size={48} className="mb-4 opacity-10" />
            <p>Module integration pending for Phase 2</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
