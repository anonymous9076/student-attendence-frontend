'use client';
import { useCourses, useSubjects } from '@/hooks/useCourseSubject';
import { useAddProfessor } from '@/hooks/useProfessors';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, User, ArrowLeft, Mail, Phone, Calendar, MapPin, GraduationCap, ChevronRight, UserCircle, Lock, Briefcase, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-400 ml-1">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
      <input 
        {...props}
        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-600" 
      />
    </div>
  </div>
);

export default function AddProfessorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    specialization: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const { data: courses } = useCourses();
  const selectedCourseObj = courses?.data?.find(c => c.name === formData.department);
  const { data: subjects } = useSubjects(selectedCourseObj?._id);
  
  const createMutation = useAddProfessor();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => router.push('/admin/professors'),
    });
  };

  return (
    <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-3xl rounded-full -mr-64 -mt-64" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className="mb-12"
        >
          <Link href="/admin/professors" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-semibold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Directory
          </Link>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Onboard New Professor</h1>
          <p className="text-slate-500 font-medium">Capture comprehensive academic and personal details for faculty</p>
        </div>

        <form
          onSubmit={handleSubmit} 
          className="glass p-10 rounded-[2.5rem] shadow-2xl space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section: Professional Identity */}
            <div className="md:col-span-2 flex items-center gap-3 pb-2 border-b border-white/5">
              <Briefcase className="text-indigo-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Professional Identity</h2>
            </div>
            
            <div className="md:col-span-2">
              <Input label="Full Name" icon={UserCircle} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Sarah Connor" />
            </div>

            <Input label="Faculty Email" type="email" icon={Mail} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="sarah.c@university.edu" />
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-1">Portal Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-600" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 text-slate-500 hover:text-slate-300 transition-colors touch-manipulation"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-1">Department</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value, specialization: ''})}
                >
                  <option value="" disabled className="bg-slate-900">Select Department</option>
                  {courses?.data?.map(c => (
                    <option key={c.name} value={c.name} className="bg-slate-900">{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-1">Specialization</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer disabled:opacity-50"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  disabled={!formData.department}
                >
                  <option value="" disabled className="bg-slate-900">Select Specialization</option>
                  {subjects?.data?.map(s => (
                    <option key={s.name} value={s.name} className="bg-slate-900">{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section: Personal Details */}
            <div className="md:col-span-2 flex items-center gap-3 pt-4 pb-2 border-b border-white/5">
              <User className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Personal Details</h2>
            </div>

            <div className="md:col-span-2">
              <Input label="Contact Phone" type="tel" icon={Phone} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={createMutation.isPending}
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] hover:bg-indigo-500 transition-all font-bold text-lg shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group"
          >
            {createMutation.isPending ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Confirm Registration <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
