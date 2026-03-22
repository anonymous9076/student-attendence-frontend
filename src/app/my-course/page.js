'use client';
import { useSubjects } from '@/hooks/useCourseSubject';
import { useAttendanceSummary } from '@/hooks/useAttendance';
import { useProfile } from '@/hooks/useProfile';
import FullScreenLoader from '@/components/FullScreenLoader';
import { motion } from 'framer-motion';
import { GraduationCap, Book, Info, Calendar as CalendarIcon, BarChart3, ArrowUpRight, Clock, Code, Layers, Activity, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function MyCoursePage() {
    const { data: profile, isLoading: loadingProfile } = useProfile();
    const student = profile?.student;
    const course = student?.courseId;

    const { data: subjectsData, isLoading: loadingSubjects } = useSubjects(course?._id);
    const { data: summaryData } = useAttendanceSummary(student?._id);

    const subjects = subjectsData?.data || [];
    const overallAttendance = summaryData?.data?.overall?.percentage || 0;

    if (loadingProfile || loadingSubjects) return <FullScreenLoader message="Retrieving Curriculum..." />;

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 bg-slate-950 text-white relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -ml-96 -mt-96" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -mr-96 -mb-96" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between items-start gap-10 mb-16"
                >
                   <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10">
                            <Layers className="w-3 h-3" />
                            Academic Environment
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
                            Academic Program
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl">
                            A comprehensive overview of your enrolled curriculum and academic progress tracking.
                        </p>
                   </div>
                   <div className="hidden lg:block">
                        <div className="glass px-8 py-6 rounded-[2.5rem] border-white/5 flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated Enrollee</p>
                                <p className="text-xl font-bold uppercase tracking-tighter">{profile?.user?.name}</p>
                            </div>
                        </div>
                   </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 flex flex-col gap-8"
                    >
                        <div className="glass p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group shadow-2xl">
                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/[0.03] blur-3xl rounded-full transition-all group-hover:bg-blue-600/[0.08]" />
                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-10 border-b border-white/5">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 block">Active Primary Enrollment</span>
                                        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">{course?.name || 'Not Assigned'}</h2>
                                        <div className="flex items-center gap-3 text-slate-500 text-sm font-bold uppercase tracking-widest">
                                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">{course?.code || 'N/A'}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                            Curriculum ID: {course?._id?.slice(-8).toUpperCase() || 'NONE'}
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex flex-col items-center justify-center">
                                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Duration Log</span>
                                         <span className="text-2xl font-black text-blue-400">{course?.duration || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="space-y-6 mb-12">
                                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Program Abstract</h4>
                                    <p className="text-slate-400 text-lg leading-relaxed max-w-4xl font-medium">
                                        {course?.description || 'Curriculum description is currently unavailable. Please contact the department registrar for structural details of your academic path.'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/stat">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover/stat:scale-110 transition-transform"><Book className="w-5 h-5" /></div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Structure</span>
                                        </div>
                                        <p className="text-2xl font-black">{subjects.length} Modules</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/stat">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover/stat:scale-110 transition-transform"><Activity className="w-5 h-5" /></div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Activity Rate</span>
                                        </div>
                                        <p className={`text-2xl font-black ${overallAttendance >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {overallAttendance.toFixed(1)}%
                                        </p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/stat">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover/stat:scale-110 transition-transform"><ShieldCheck className="w-5 h-5" /></div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registry</span>
                                        </div>
                                        <p className="text-2xl font-black">Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-4">
                                <h3 className="text-2xl font-bold flex items-center gap-4">
                                    <Code className="w-6 h-6 text-blue-500" />
                                    Course Curriculum
                                </h3>
                                <p className="text-[10px] font-black text-slate-600 uppercase">Interactive Log</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {subjects.length > 0 ? subjects.map((sub, idx) => (
                                    <motion.div 
                                        key={sub._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="glass p-7 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group/sub cursor-default"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover/sub:bg-blue-600 group-hover/sub:text-white group-hover/sub:border-blue-500/50 transition-all duration-500">
                                                    <Code className="w-6 h-6" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-lg tracking-tight group-hover/sub:text-white transition-colors uppercase">{sub.name}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{sub.code}</span>
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Module: {idx + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover/sub:text-blue-500 transition-colors" />
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full py-20 glass rounded-[3rem] flex flex-col items-center justify-center border-dashed border-2 border-white/5 opacity-50">
                                        <Book className="w-12 h-12 text-slate-800 mb-4" />
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No Core Modules Assigned</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="glass p-10 rounded-[3.5rem] border border-blue-500/10 bg-blue-500/[0.02] shadow-xl">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <ArrowUpRight className="w-5 h-5 text-blue-500" />
                                Quick Links
                            </h3>
                            <div className="space-y-4 flex flex-col">
                                <Link href="/attendance">
                                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.05] transition-all group cursor-pointer border border-white/5 hover:border-white/10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400"><CalendarIcon className="w-6 h-6" /></div>
                                            <span className="font-bold uppercase tracking-tight text-sm">Attendance Logs</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                                            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-6 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center gap-5 opacity-40 grayscale cursor-not-allowed">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500"><Info className="w-6 h-6" /></div>
                                    <div>
                                        <span className="font-bold uppercase tracking-tight text-sm block">Exam Schedule</span>
                                        <span className="text-[9px] font-black text-slate-600 uppercase">Available Q3 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/50" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Portal Status</h4>
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 animate-ping absolute" />
                                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div>
                                    <span className="text-xl font-black text-emerald-500 tracking-tight block">ACTIVE</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Semester Sync Complete</span>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                Your academic credentials and course enrollments are verified as of today, {new Date().toLocaleDateString()}.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
