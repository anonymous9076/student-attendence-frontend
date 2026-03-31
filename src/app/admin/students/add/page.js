'use client';
import { useCreateStudent } from '@/hooks/useStudents';
import { useCourses } from '@/hooks/useCourseSubject';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, User, ArrowLeft, Mail, Phone, Calendar, MapPin, GraduationCap, ChevronRight, UserCircle, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import DatePicker from '@/components/DatePicker';

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

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    courseId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const createMutation = useCreateStudent();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => router.push('/admin/students'),
    });
  };

  return (
    <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-3xl rounded-full -mr-64 -mt-64" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className="mb-12"
        >
          <Link href="/admin/students" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-semibold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Directory
          </Link>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Onboard New Student</h1>
          <p className="text-slate-500 font-medium">Capture comprehensive academic and personal details</p>
        </div>

        <form
          onSubmit={handleSubmit} 
          className="glass p-10 rounded-[2.5rem] shadow-2xl space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section: Academic Identity */}
            <div className="md:col-span-2 flex items-center gap-3 pb-2 border-b border-white/5">
              <GraduationCap className="text-blue-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Academic Identity</h2>
            </div>
            
            <div className="md:col-span-2">
              <Input label="Full Name" icon={UserCircle} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Alex Johnson" />
            </div>

            <Input label="Student Email" type="email" icon={Mail} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="alex.j@portal.edu" />
            
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
              <label className="text-sm font-semibold text-slate-400 ml-1">Academic Program (Course)</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none z-10" />
                <select 
                  required
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer"
                  value={formData.courseId}
                  onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                >
                  <option value="" disabled className="bg-slate-900">Select Enrolled Course</option>
                  {useCourses().data?.data?.map(c => (
                    <option key={c._id} value={c._id} className="bg-slate-900">{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section: Personal Details */}
            <div className="md:col-span-2 flex items-center gap-3 pt-4 pb-2 border-b border-white/5">
              <User className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Personal Details</h2>
            </div>

            <Input label="Contact Phone" type="tel" icon={Phone} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required placeholder="+1 (555) 000-0000" />
            
            <DatePicker label="Date of Birth" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} required />
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-1">Gender Identity</label>
              <select 
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-1">Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-500 w-5 h-5 pointer-events-none" />
                <textarea 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-600 min-h-[120px]" 
                  rows="3"
                  placeholder="Street, City, ZIP, Country"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} 
                  required 
                ></textarea>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={createMutation.isPending}
            className="w-full bg-blue-600 text-white py-5 rounded-[2rem] hover:bg-blue-500 transition-all font-bold text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
          >
            {createMutation.isPending ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Confirm Enrollment <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
