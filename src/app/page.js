'use client';
import { useSelector } from 'react-redux';
import { Users, User, BookOpen, Calendar, GraduationCap, ArrowRight, ShieldCheck, Zap, Globe, BarChart, LayoutDashboard, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import ProfessorDashboard from '@/components/ProfessorDashboard';
import StudentDashboard from '@/components/StudentDashboard';

const FeatureCard = ({ title, desc, icon: Icon, delay, color }) => (
  <div 
    className="relative group p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
  >
    <div className={`absolute -right-12 -top-12 w-40 h-40 bg-${color}-500/10 blur-3xl group-hover:bg-${color}-500/20 transition-all duration-500`} />
    <div className={`w-16 h-16 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-6 border border-${color}-500/20`}>
      <Icon className={`w-8 h-8 text-${color}-400`} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
  </div>
);

const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center p-8 glass rounded-3xl border border-white/5 text-center transition-all hover:bg-white/5">
    <h4 className="text-4xl md:text-5xl font-black text-white mb-2">{value}</h4>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
  </div>
);

export default function Home() {
  const { user, isAuthenticated, isHydrated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-dvh bg-slate-950 overflow-hidden text-slate-300">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-3xl rounded-full" />
      </div>

      {/* Landing Page Header */}
      {!isAuthenticated && (
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              {/* Brand */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight hidden sm:block">UniPortal</span>
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
               
                <Link href="/login" className="px-5 py-2 text-sm font-bold text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          {/* Thin gradient accent line */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #3b82f6, #6366f1, #8b5cf6, transparent)' }} />
        </nav>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-32 max-w-4xl mx-auto animate-[fadeIn_0.8s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> Next-Gen University Portal
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight text-white leading-tight">
            Manage with <br/>
            <span style={{
              background: 'linear-gradient(to right, #60a5fa, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              display: 'inline-block',
              paddingBottom: '0.1em'
            }}>
                Absolute Precision.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            A comprehensive, high-performance platform unifying student records, academic tracking, and administrative workflows into one seamless experience.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/login" 
                className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-white/5 active:scale-95"
              >
                Access Portal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 border border-white/5 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                Explore Features <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
        </div>

        {isAuthenticated && user && isHydrated ? (
          <div className="w-full mt-20 animate-[fadeIn_0.6s_ease-out_forwards]">
            {user.role === 'admin' ? (
              <AdminDashboard />
            ) : user.role === 'professor' ? (
              <ProfessorDashboard />
            ) : (
              <StudentDashboard />
            )}
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                <StatBadge value="99.9%" label="Uptime Reliability" />
                <StatBadge value="50k+" label="Active Students" />
                <StatBadge value="100+" label="Global Courses" />
                <StatBadge value="24/7" label="System Access" />
            </div>

            {/* Features Section */}
            <div id="features" className="mb-32 scroll-mt-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Designed for Everyone</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">Tailored dashboards and tools specific to your role, ensuring maximum productivity and ease of use.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        delay={0.1}
                        color="blue"
                        icon={ShieldCheck}
                        title="For Administrators"
                        desc="Maintain absolute control over the institutional ecosystem. Effortlessly manage users, define courses, and oversee vast academic records securely."
                    />
                    <FeatureCard 
                        delay={0.2}
                        color="purple"
                        icon={GraduationCap}
                        title="For Professors"
                        desc="Focus on teaching, not paperwork. Utilize our bleeding-edge tools for instantaneous attendance tracking, interactive announcements, and deep student insights."
                    />
                    <FeatureCard 
                        delay={0.3}
                        color="green"
                        icon={User}
                        title="For Students"
                        desc="Your academic journey, visualized. Track your attendance history, view enrolled courses, and receive real-time updates directly from your professors."
                    />
                </div>
            </div>

            {/* Details/Highlights Section */}
            <div className="glass rounded-[3rem] p-12 lg:p-20 border border-white/5 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
                
                <div className="flex-1 space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Zero Friction.<br />Maximum <span className="text-blue-400">Performance</span>.
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Built from the ground up to eradicate the tedious processes of standard university management. Our architecture guarantees instant data retrieval, robust security, and an interface that feels like the future.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Real-time data synchronization",
                            "Role-based access control (RBAC)",
                            "Enterprise-grade encryption",
                            "Blazing fast user experience"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white font-medium text-lg">
                                <CheckCircle2 className="w-6 h-6 text-blue-500" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 w-full relative z-10">
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        {/* Window chrome */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-3 text-[10px] text-slate-500 font-mono tracking-wide">dashboard.university.edu</span>
                        </div>
                        
                        {/* Mini stat cards row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                                <p className="text-2xl font-black text-blue-400">248</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Students</p>
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
                                <p className="text-2xl font-black text-purple-400">12</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Courses</p>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                                <p className="text-2xl font-black text-emerald-400">94%</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Attendance</p>
                            </div>
                        </div>

                        {/* Mini table */}
                        <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
                            <div className="px-4 py-2.5 border-b border-white/5 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span>
                                <span className="text-[10px] text-blue-400 font-semibold">View All →</span>
                            </div>
                            {[
                                { name: 'Aarav Mehta', subject: 'Data Structures', status: 'present', color: 'emerald' },
                                { name: 'Priya Sharma', subject: 'Linear Algebra', status: 'present', color: 'emerald' },
                                { name: 'Rohan Patel', subject: 'DBMS', status: 'absent', color: 'red' },
                            ].map((row, i) => (
                                <div key={i} className="px-4 py-2.5 flex items-center justify-between border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">{row.name.charAt(0)}</div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">{row.name}</p>
                                            <p className="text-[10px] text-slate-500">{row.subject}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-${row.color}-500/10 text-${row.color}-400`}>{row.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-bold text-slate-300">University Portal Enterprise</span>
                </div>
                <p>© {new Date().getFullYear()} Next-Gen University. All Rights Reserved.</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
