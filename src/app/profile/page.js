'use client';
import { useSelector } from 'react-redux';
import { useProfile } from '@/hooks/useProfile';
import Loader from '@/components/Loader';
import { User, Mail, ShieldCheck, GraduationCap, MapPin, Phone, Calendar, AtSign, Fingerprint, Activity } from 'lucide-react';

export default function ProfilePage() {
  const { isHydrated } = useSelector((state) => state.auth);
  const { data: profile, isLoading } = useProfile();

  if (!isHydrated || isLoading) return <div className="flex items-center justify-center h-[70vh]"><Loader /></div>;

  const user = profile?.user;
  const student = profile?.student;
  const professor = profile?.professor;

  const ProfileCard = ({ icon: Icon, label, value, color, span = 'col-span-1' }) => (
    <div
      className={`${span} glass p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden`}
    >
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-${color}-500/5 blur-3xl rounded-full group-hover:bg-${color}-500/10 transition-all`} />
      <div className="flex flex-col gap-6 relative z-10">
        <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center border border-${color}-500/20 group-hover:border-${color}-500/40 transition-colors`}>
          <Icon className={`w-5 h-5 text-${color}-500`} />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">{label}</span>
          <span className="text-xl font-bold text-white tracking-tight break-words line-clamp-2">
            {value || 'Not Provided'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-3xl rounded-full -mt-96 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-3xl rounded-full -mb-96" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row items-center gap-10 mb-16 px-4"
        >
          <div className="relative">
            <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-500/20">
              <div className="w-full h-full rounded-[2.8rem] bg-slate-950 flex items-center justify-center overflow-hidden">
                <span className="text-7xl font-black text-white">{user?.name?.charAt(0)}</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-slate-950 flex items-center justify-center shadow-emerald-500/30 shadow-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Activity className="w-3 h-3" />
              Active System Session
            </div>
            <h1 className="text-6xl font-black text-white tracking-tight leading-tight mb-2">
               {user?.name}
            </h1>
            <p className="text-slate-400 text-lg font-medium flex items-center justify-center md:justify-start gap-2">
              <Fingerprint className="w-5 h-5 text-slate-500" />
              Verified {user?.role} Portal
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Main Identity - Span 2 */}
          <ProfileCard 
            icon={Mail} 
            label="Verified Registry Email" 
            value={user?.email} 
            color="blue" 
            span="md:col-span-2 shadow-blue-500/5 shadow-xl"
          />

          {/* Academic Highight - Span 2 */}
          <ProfileCard 
            icon={GraduationCap} 
            label={user?.role === 'professor' ? "Department Stream" : "Academic Discipline"} 
            value={user?.role === 'professor' ? professor?.department : student?.courseId?.name} 
            color="emerald" 
            span="md:col-span-2 shadow-emerald-500/5 shadow-xl"
          />

          {/* Contact Details */}
          <ProfileCard 
            icon={Phone} 
            label="Contact Terminal" 
            value={user?.role === 'professor' ? professor?.phone : student?.phone} 
            color="indigo" 
          />

          {/* Address - Large Span */}
          <ProfileCard 
            icon={MapPin} 
            label={user?.role === 'professor' ? "Specialization Focus" : "Residency Endpoint"} 
            value={user?.role === 'professor' ? professor?.specialization : student?.address} 
            color="rose" 
            span="md:col-span-2"
          />

          {/* Birth Date */}
          <ProfileCard 
            icon={Calendar} 
            label={user?.role === 'professor' ? "Tenure" : "Temporal Origin"} 
            value={user?.role === 'professor' ? 'Active Faculty' : (student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : null)} 
            color="amber" 
          />

          {/* System Info Cards */}
          <ProfileCard 
            icon={AtSign} 
            label="System Alias" 
            value={user?.email?.split('@')[0]} 
            color="purple" 
          />
          <ProfileCard 
            icon={ShieldCheck} 
            label="Encryption Status" 
            value="Standard / Verified" 
            color="emerald" 
          />
        </div>

        {/* Notice Section */}
        <div
          className="mt-12 glass p-10 rounded-[3rem] border-white/5 relative group"
        >
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
             <div className="p-5 rounded-3xl bg-blue-600/10 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 text-blue-500" />
             </div>
             <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">System Notification</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                  Your {user?.role === 'professor' ? 'faculty' : 'academic'} profile is synchronized with the central registry. 
                  {user?.role === 'student' ? ' Attendance heatmaps and digital certification downloads will be available in the upcoming v2.5 update.' : ' Performance analytics and advanced faculty tools will be expanded in the upcoming v2.5 update.'}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <span className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-500 text-xs font-bold uppercase">
                    Sync Status: 100%
                  </span>
                  <span className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-500 text-xs font-bold uppercase italic">
                    Last update: Today, {new Date().toLocaleTimeString()}
                  </span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
