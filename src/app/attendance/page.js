'use client';
import { useAttendanceSummary, useStudentAttendance } from '@/hooks/useAttendance';
import { useProfile } from '@/hooks/useProfile';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import { 
    Activity, 
    Calendar, 
    CheckCircle, 
    XCircle, 
    TrendingUp, 
    Book,
    PieChart,
    Clock,
    AlertCircle,
    ChevronRight,
    Search
} from 'lucide-react';

export default function StudentAttendancePage() {
    const { data: profile } = useProfile();
    const studentId = profile?.student?._id;

    const { data: summary, isLoading: loadingSummary } = useAttendanceSummary(studentId);
    const { data: records, isLoading: loadingRecords } = useStudentAttendance(studentId);

    const overall = summary?.data?.overall;
    const subjects = summary?.data?.subjectWise || [];
    const history = records?.data || [];

    if (loadingSummary || loadingRecords) return <div className="flex items-center justify-center h-[70vh]"><Loader /></div>;

    const StatCard = ({ label, value, icon: Icon, color, subText, span = 'col-span-1' }) => (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`${span} glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group shadow-2xl`}
        >
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${color}-500/5 blur-3xl rounded-full group-hover:bg-${color}-500/10 transition-all`} />
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-500 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
                </div>
                <div>
                    <h2 className={`text-5xl font-black mb-2 ${color === 'red' ? 'text-red-500' : 'text-white'} tracking-tight`}>
                        {value}
                    </h2>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{subText}</p>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-3xl rounded-full -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-3xl rounded-full -ml-96 -mb-96" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Header */}
                <motion.div 
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            Live Attendance Data
                        </div>
                        <h1 className="text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                            Academic Presence
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl">
                            Consolidated tracking for your academic performance and participation metrics.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="glass px-6 py-4 rounded-3xl border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                                {overall?.percentage?.toFixed(0) || 0}%
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase">Current Performance</p>
                                <p className="text-sm font-bold text-white uppercase tracking-tighter">Above Average</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <StatCard 
                        label="Overall Attendance" 
                        value={`${overall?.percentage?.toFixed(1) || 0}%`} 
                        icon={TrendingUp} 
                        color="blue"
                        subText="Consolidated Rate"
                        span="lg:col-span-1"
                    />
                    <StatCard 
                        label="Lecture Sessions" 
                        value={overall?.totalClasses || 0} 
                        icon={Activity} 
                        color="purple"
                        subText="Total Enrolled"
                    />
                    <StatCard 
                        label="Confirmed Present" 
                        value={overall?.present || 0} 
                        icon={CheckCircle} 
                        color="emerald"
                        subText="Verified Participation"
                    />
                    <StatCard 
                        label="Recorded Absent" 
                        value={overall?.absent || 0} 
                        icon={XCircle} 
                        color="red"
                        subText="Missed Opportunities"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Subject Analysis */}
                    <motion.div 
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <PieChart className="w-6 h-6 text-blue-500" />
                                Subject Breakdown
                            </h3>
                            <span className="text-[10px] font-black text-slate-600 uppercase">Analysis</span>
                        </div>

                        {subjects.length > 0 ? (
                            <div className="space-y-4">
                                {subjects.map((sub, idx) => (
                                    <div key={idx} className="glass p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="space-y-1">
                                                <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{sub.subject}</h4>
                                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                                    <Book className="w-3 h-3" />
                                                    {sub.present} of {sub.totalClasses} Present
                                                </div>
                                            </div>
                                            <div className={`text-2xl font-black ${sub.percentage >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {sub.percentage.toFixed(0)}%
                                            </div>
                                        </div>
                                        <div className="w-full bg-slate-900/50 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${sub.percentage}%` }}
                                                className={`h-full rounded-full ${sub.percentage >= 75 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass p-12 rounded-[2.5rem] border-white/5 border-dashed border-2 flex flex-col items-center text-center">
                                <AlertCircle className="w-12 h-12 text-slate-700 mb-4" />
                                <p className="text-slate-500 font-medium italic">No subject-wise analysis available yet.</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Attendance Logs */}
                    <motion.div 
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-purple-500" />
                                Transaction Logs
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                                <Search className="w-3 h-3" />
                                Recent History
                            </div>
                        </div>

                        <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 sticky top-0 backdrop-blur-3xl z-20 border-b border-white/5">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Session Date</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Course Module</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {history.length > 0 ? (
                                            history.map((record, idx) => (
                                                <motion.tr 
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    key={idx} 
                                                    className="group hover:bg-white/[0.03] transition-colors cursor-default"
                                                >
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                                                            <span className="text-sm font-bold text-slate-300">
                                                                {new Date(record.date).toLocaleDateString(undefined, { 
                                                                    weekday: 'short',
                                                                    month: 'short', 
                                                                    day: 'numeric' 
                                                                })}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
                                                                <Book className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-black text-white uppercase tracking-tight">
                                                                {record.subjectId?.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                            record.status === 'present' 
                                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                        }`}>
                                                            {record.status === 'present' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                            {record.status}
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-white/5">
                                                            <Activity className="w-6 h-6 text-slate-700" />
                                                        </div>
                                                        <p className="text-slate-500 font-medium italic">Your course logs are currently empty.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
