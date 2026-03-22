'use client';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Users, User, BookOpen, Calendar, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import ProfessorDashboard from '@/components/ProfessorDashboard';
import StudentDashboard from '@/components/StudentDashboard';

const Card = ({ title, desc, icon: Icon, href, color }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative group p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
  >
    <div className={`absolute -right-8 -top-8 w-32 h-32 bg-${color}-600/10 blur-3xl group-hover:bg-${color}-600/20 transition-colors`} />
    <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-6 border border-${color}-500/20`}>
      <Icon className={`w-7 h-7 text-${color}-500`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
    <Link href={href} className="flex items-center gap-2 text-sm font-semibold text-white group/link">
      Explore Module <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

export default function Home() {
  const { user, isAuthenticated, isHydrated } = useSelector((state) => state.auth);

  if (!isHydrated) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <ShieldCheck className="w-4 h-4" /> Next-Gen University
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Manage with <span className="gradient-text">Precision</span>.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A comprehensive, high-performance platform for student records, 
            academic tracking, and administrative excellence.
          </p>
        </motion.div>

        {isAuthenticated && user ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            {user.role === 'admin' ? (
              <AdminDashboard />
            ) : user.role === 'professor' ? (
              <ProfessorDashboard />
            ) : (
              <StudentDashboard />
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-12 rounded-[2.5rem] bg-slate-900/50 border border-white/5 text-center max-w-3xl mx-auto overflow-hidden group"
          >
             <div className="absolute inset-0 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-colors" />
             <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Experience Professional Management</h2>
                <p className="text-slate-400 mb-10 text-lg">Sign in to access your administrative dashboard or student profile.</p>
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-white/5"
                >
                  Enter Portal <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
          </motion.div>
        )}
      </div>
      
      {/* Background Glow */}
      <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
  );
}
