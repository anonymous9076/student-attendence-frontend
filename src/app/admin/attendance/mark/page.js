'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProfile } from '@/hooks/useProfile';
import { useStudents } from '@/hooks/useStudents';
import { useCourses, useSubjects } from '@/hooks/useCourseSubject';
import { useMarkAttendance } from '@/hooks/useAttendance';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, 
    BookOpen, 
    CheckCircle, 
    XCircle, 
    Save, 
    ChevronRight,
    Search,
    User
} from 'lucide-react';

export default function MarkAttendancePage() {
    const { user } = useSelector((state) => state.auth);
    const { data: profile } = useProfile();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [marks, setMarks] = useState({}); // { studentId: 'present' | 'absent' }
    const [searchTerm, setSearchTerm] = useState('');

    const { data: students, isLoading: loadingStudents } = useStudents();
    const { data: courses } = useCourses();
    const { data: subjects } = useSubjects(selectedCourse);
    const markMutation = useMarkAttendance();

    // Auto-select course and subject for professor
    useEffect(() => {
        if (user?.role === 'professor' && courses?.data && profile?.professor) {
            const courseObj = courses.data.find(c => c.name === profile.professor.department);
            if (courseObj && !selectedCourse) {
                setSelectedCourse(courseObj._id);
            }
        }
    }, [user, courses, selectedCourse, profile]);

    useEffect(() => {
        if (user?.role === 'professor' && subjects?.data && selectedCourse && profile?.professor) {
            const subjectObj = subjects.data.find(s => s.name === profile.professor.specialization);
            if (subjectObj && !selectedSubject) {
                setSelectedSubject(subjectObj._id);
            }
        }
    }, [user, subjects, selectedCourse, selectedSubject, profile]);

    // Default all students to present when course changes
    useEffect(() => {
        if (students?.data && selectedCourse) {
            const courseObj = courses?.data?.find(c => c._id === selectedCourse);
            const courseName = courseObj?.name;
            
            const initialMarks = {};
            students.data.forEach(student => {
                if (student.courseId?._id === selectedCourse) {
                    initialMarks[student._id] = 'present';
                }
            });
            setMarks(initialMarks);
        }
    }, [students, selectedCourse, courses]);

    const filteredStudents = students?.data?.filter(s => {
        const courseObj = courses?.data?.find(c => c._id === selectedCourse);
        const matchesCourse = s.courseId?._id === selectedCourse;
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCourse && matchesSearch;
    });

    const handleToggle = (studentId) => {
        setMarks(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
        }));
    };

    const handleSubmit = async () => {
        if (!selectedCourse || !selectedSubject || !date) {
            alert('Please select course, subject and date');
            return;
        }

        const attendanceData = {
            courseId: selectedCourse,
            subjectId: selectedSubject,
            date,
            students: Object.keys(marks).map(id => ({
                studentId: id,
                status: marks[id]
            }))
        };

        markMutation.mutate(attendanceData, {
            onSuccess: () => {
                alert('Attendance marked successfully!');
            },
            onError: (err) => {
                alert(`Error: ${err.response?.data?.error || err.message}`);
            }
        });
    };

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 bg-slate-950">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Mark Attendance</h1>
                    <p className="text-slate-400 font-medium">Bulk mark daily presence for your students</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Selectors Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 rounded-4xl h-fit sticky top-12"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Select Course</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <select 
                                        className="w-full bg-slate-900 border border-white/5 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none disabled:opacity-50"
                                        value={selectedCourse}
                                        onChange={(e) => {
                                            setSelectedCourse(e.target.value);
                                            setSelectedSubject('');
                                        }}
                                        disabled={user?.role === 'professor'}
                                    >
                                        <option value="">Choose Course</option>
                                        {courses?.data?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Select Subject</label>
                                <div className="relative text-white">
                                    <ChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <select 
                                        className="w-full bg-slate-900 border border-white/5 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none disabled:opacity-50"
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        disabled={!selectedCourse || user?.role === 'professor'}
                                    >
                                        <option value="">Choose Subject</option>
                                        {subjects?.data?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Select Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="date" 
                                        className="w-full bg-slate-900 border border-white/5 rounded-xl px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleSubmit}
                                disabled={markMutation.isPending || !selectedSubject}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                            >
                                <Save className="w-5 h-5" />
                                {markMutation.isPending ? 'Saving...' : 'Submit Attendance'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Students List */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        {!selectedCourse ? (
                            <div className="glass p-16 rounded-4xl text-center">
                                <Search className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                                <h2 className="text-xl font-bold text-white mb-2">No Course Selected</h2>
                                <p className="text-slate-500">Please select a course to load the student directory.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative mb-6">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        placeholder="Search student in this course..." 
                                        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <AnimatePresence mode="popLayout">
                                        {filteredStudents?.map((student, idx) => (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                key={student._id}
                                                className="glass p-5 rounded-2xl flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white">{student.name}</p>
                                                        <p className="text-xs text-slate-500">{student.email}</p>
                                                    </div>
                                                </div>

                                                <button 
                                                    onClick={() => handleToggle(student._id)}
                                                    className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                                                        marks[student._id] === 'present' 
                                                        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                                        : 'bg-red-500/10 border-red-500/20 text-red-500'
                                                    }`}
                                                >
                                                    {marks[student._id] === 'present' ? (
                                                        <>
                                                            <CheckCircle className="w-4 h-4" /> Present
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="w-4 h-4" /> Absent
                                                        </>
                                                    )}
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {filteredStudents?.length === 0 && (
                                        <div className="text-center p-12 glass rounded-2xl">
                                            <User className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                            <p className="text-slate-500 font-medium">No students found for this course.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) }
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
