'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProfile } from '@/hooks/useProfile';
import { useAttendance } from '@/hooks/useAttendance';
import { useCourses, useSubjects } from '@/hooks/useCourseSubject';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Calendar, 
    Filter, 
    ChevronDown, 
    CheckCircle, 
    XCircle,
    User,
    Book
} from 'lucide-react';
import DatePicker from '@/components/DatePicker';
import Loader from '@/components/Loader';

export default function AttendanceRecordsPage() {
    const { user } = useSelector((state) => state.auth);
    const { data: profile } = useProfile();
    const [filters, setFilters] = useState({
        courseId: '',
        subjectId: '',
        date: ''
    });

    const { data: attendance, isLoading } = useAttendance(filters);
    const { data: courses } = useCourses();
    const { data: subjects } = useSubjects(filters.courseId);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Auto-select course and subject for professor
    useEffect(() => {
        if (user?.role === 'professor' && profile?.professor) {
            const updates = {};
            let shouldUpdate = false;
            
            if (courses?.data) {
                const courseObj = courses.data.find(c => c.name === profile.professor.department);
                if (courseObj && filters.courseId !== courseObj._id) {
                    updates.courseId = courseObj._id;
                    shouldUpdate = true;
                }
            }
            
            if (subjects?.data && filters.courseId) {
                const subjectObj = subjects.data.find(s => s.name === profile.professor.specialization);
                if (subjectObj && filters.subjectId !== subjectObj._id) {
                    updates.subjectId = subjectObj._id;
                    shouldUpdate = true;
                }
            }
            
            if (shouldUpdate) {
                setFilters(prev => ({ ...prev, ...updates }));
            }
        }
    }, [user, profile, courses, subjects, filters.courseId, filters.subjectId]);

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Attendance Repository</h1>
                    <p className="text-slate-400 font-medium">Historical records and audit logs</p>
                </motion.div>

                {/* Filters Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-4xl mb-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
                >
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Course</label>
                        <select 
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none transition-all disabled:opacity-50"
                            value={filters.courseId}
                            onChange={(e) => {
                                handleFilterChange('courseId', e.target.value);
                                handleFilterChange('subjectId', '');
                            }}
                            disabled={user?.role === 'professor'}
                        >
                            <option value="">All Courses</option>
                            {courses?.data?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Subject</label>
                        <select 
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none transition-all disabled:opacity-50"
                            value={filters.subjectId}
                            onChange={(e) => handleFilterChange('subjectId', e.target.value)}
                            disabled={!filters.courseId || user?.role === 'professor'}
                        >
                            <option value="">All Subjects</option>
                            {subjects?.data?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="w-full">
                        <DatePicker 
                            label="Date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            date: '',
                            ...(user?.role !== 'professor' ? { courseId: '', subjectId: '' } : {})
                        }))}
                        className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all border border-white/5"
                    >
                        Clear Filters
                    </button>
                </motion.div>

                {/* Table Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-4xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Course & Subject</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center">
                                            <div className="flex justify-center mb-4">
                                                <Loader size="sm" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    attendance?.data?.map((record, idx) => (
                                        <motion.tr 
                                            key={record._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group hover:bg-white/2 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                                                        {record.studentId?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{record.studentId?.name}</p>
                                                        <p className="text-xs text-slate-500">{record.studentId?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                                        <Book className="w-3.5 h-3.5" /> {record.subjectId?.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {record.courseId?.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                    <Calendar className="w-4 h-4 text-slate-500" />
                                                    {new Date(record.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    record.status === 'present' 
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                }`}>
                                                    {record.status === 'present' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                    {record.status}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!isLoading && attendance?.data?.length === 0 && (
                        <div className="p-20 text-center">
                            <Filter className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">No Records Found</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Try adjusting the filters to find the data you're looking for.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
