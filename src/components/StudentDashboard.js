'use client';
import { useStudentDashboard } from '@/hooks/useDashboard';
import FullScreenLoader from '@/components/FullScreenLoader';
import { motion } from 'framer-motion';
import { 
    GraduationCap, 
    Book, 
    Clock, 
    CheckCircle, 
    Calendar,
    ArrowRight,
    MapPin,
    Mail,
    Phone,
    Bell
} from 'lucide-react';
import Link from 'next/link';
import NotificationFeed from '@/components/NotificationFeed';

export default function StudentDashboard() {
    const { data: dashboard, isLoading } = useStudentDashboard();

    if (isLoading) return <FullScreenLoader message="Loading Student Dashboard..." />;

    const data = dashboard?.data;
    const student = data?.student;
    const attendance = data?.overallAttendance || 0;

    return (
        <div className="space-y-12">
            {/* Profile Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full -mr-32 -mt-32" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    {isLoading ? (
                        <div className="w-24 h-24 rounded-3xl bg-white/5 animate-pulse" />
                    ) : (
                        <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-4xl font-black shadow-2xl shadow-blue-600/20">
                            {student?.name?.charAt(0)}
                        </div>
                    )}
                    
                    <div className="flex-1 space-y-4">
                        {isLoading ? (
                            <div className="space-y-3">
                                <div className="h-8 w-64 bg-white/5 rounded-xl animate-pulse" />
                                <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-extrabold text-white">{student?.name}</h2>
                                <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">
                                    {student?.courseId?.name} • {student?.courseId?.code}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Mail className="w-4 h-4" /> {student?.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Phone className="w-4 h-4" /> {student?.phone}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="bg-white/5 border border-white/5 px-8 py-6 rounded-4xl text-center min-w-[160px]">
                        {isLoading ? (
                            <div className="h-10 w-20 bg-white/10 rounded-xl mx-auto animate-pulse" />
                        ) : (
                            <p className={`text-3xl font-black ${attendance >= 75 ? 'text-green-500' : 'text-red-500'}`}>
                                {attendance}%
                            </p>
                        )}
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">Total Attendance</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Course Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Book className="w-5 h-5 text-purple-500" />
                            Academic Program
                        </h3>
                        {!isLoading && <Link href="/my-course" className="text-xs font-bold text-blue-500 hover:underline">View Curriculum</Link>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-6 rounded-4xl border border-white/5">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Program Description</p>
                            {isLoading ? (
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                                    <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                                    <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse" />
                                </div>
                            ) : (
                                <p className="text-sm text-slate-300 leading-relaxed italic">
                                    "{student?.courseId?.description || 'Your program curriculum and objectives are being curated.'}"
                                </p>
                            )}
                        </div>
                        <div className="glass p-6 rounded-4xl border border-white/5 space-y-4">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Details</p>
                            {isLoading ? (
                                <div className="space-y-4 pt-2">
                                    <div className="h-6 w-full bg-white/5 rounded-xl animate-pulse" />
                                    <div className="h-6 w-full bg-white/5 rounded-xl animate-pulse" />
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-sm font-medium text-slate-400">Duration</span>
                                        <span className="text-sm font-bold">{student?.courseId?.duration} {student?.courseId?.duration === 1 ? 'Year' : 'Years'}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-sm font-medium text-slate-400">Status</span>
                                        <span className="text-xs font-black uppercase text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Enrolled</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts & Notifications */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Bell className="w-5 h-5 text-blue-500" />
                            Latest Announcements
                        </h3>
                        <NotificationFeed />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-500" />
                            Quick Access
                        </h3>
                        <div className="space-y-4 flex flex-col">
                            <Link href="/attendance">
                                <div className="p-5 rounded-3xl bg-slate-900 border border-white/5 hover:border-blue-500/20 transition-all flex items-center justify-between group cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm">Attendance History</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                            <Link href="/profile">
                                <div className="p-5 rounded-3xl bg-slate-900 border border-white/5 hover:border-purple-500/20 transition-all flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm">View Profile</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
