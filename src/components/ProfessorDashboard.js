'use client';
import { useAdminDashboard } from '@/hooks/useDashboard';
import { motion } from 'framer-motion';
import {
    Users,
    BookOpen,
    Layers,
    CalendarCheck,
    TrendingUp,
    Clock,
    Plus,
    BookPlus,
    UserPlus,
    ArrowRight,
    Bell,
    ClipboardList,
    UserCircle
} from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ title, value, icon: Icon, color, subValue, isLoading }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`glass p-6 rounded-4xl border border-white/5 relative overflow-hidden group`}
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-500/10 blur-2xl rounded-full group-hover:bg-${color}-500/20 transition-all`} />
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-4 border border-${color}-500/20`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            {isLoading ? (
                <div className="h-9 w-24 bg-white/5 rounded-xl animate-pulse" />
            ) : (
                <h3 className="text-3xl font-extrabold text-white mb-2">{value}</h3>
            )}
            {subValue && !isLoading && <span className="text-xs font-medium text-slate-500">{subValue}</span>}
            {isLoading && <div className="h-3 w-32 bg-white/5 rounded-lg mt-2 animate-pulse" />}
        </div>
    </motion.div>
);

export default function ProfessorDashboard() {
    const { data: dashboard, isLoading } = useAdminDashboard();

    const stats = dashboard?.data;

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold mb-2">Faculty Overview</h2>
                <p className="text-slate-400">Welcome back, Professor. Here's a snapshot of the academic metrics.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats?.counts?.students || 0}
                    icon={Users}
                    color="blue"
                    subValue="Active enrollment"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Courses"
                    value={stats?.counts?.courses || 0}
                    icon={Layers}
                    color="purple"
                    subValue="Academic programs"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Subjects"
                    value={stats?.counts?.subjects || 0}
                    icon={BookOpen}
                    color="indigo"
                    subValue="Curriculum modules"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Attendance"
                    value={`${stats?.overallPercentage || 0}%`}
                    icon={CalendarCheck}
                    color="emerald"
                    subValue="Overall rate"
                    isLoading={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Recent Tracking Activity
                        </h3>
                    </div>

                    <div className="glass rounded-4xl border border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Latest Entries</h4>
                        </div>
                        <div className="divide-y divide-white/5">
                            {isLoading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                                                <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="h-6 w-20 bg-white/5 rounded-full animate-pulse" />
                                    </div>
                                ))
                            ) : stats?.recentAttendance?.length > 0 ? (
                                stats.recentAttendance.map((record) => (
                                    <div key={record._id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                                                {record.studentId?.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{record.studentId?.name}</p>
                                                <p className="text-xs text-slate-500">{record.subjectId?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${record.status === 'present' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {record.status}
                                            </span>
                                            <span className="text-[10px] text-slate-600 font-mono">
                                                {new Date(record.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-slate-500 text-sm italic">
                                    No attendance records found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        Quick Actions
                    </h3>
                    <div className="space-y-4 flex flex-col">
                        <Link href="/admin/attendance/mark">
                            <div className="p-4 rounded-3xl bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-between group cursor-pointer shadow-lg shadow-blue-500/10">
                                <div className="flex items-center gap-3 text-white">
                                    <CalendarCheck className="w-5 h-5" />
                                    <span className="font-bold">Mark Attendance</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link href="/admin/attendance/records">
                            <div className="p-4 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                                    <ClipboardList className="w-5 h-5 text-indigo-500" />
                                    <span className="font-bold">View Records</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link href="/admin/notifications">
                            <div className="p-4 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                                    <Bell className="w-5 h-5 text-amber-500" />
                                    <span className="font-bold">Announcements</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link href="/profile">
                            <div className="p-4 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                                    <UserCircle className="w-5 h-5 text-rose-500" />
                                    <span className="font-bold">My Profile</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
