'use client';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/hooks/useCourseSubject';
import FullScreenLoader from '@/components/FullScreenLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    BookOpen, 
    Code, 
    Clock, 
    X,
    Search,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function CourseManagementPage() {
    const { data: courses, isLoading } = useCourses();
    const createMutation = useCreateCourse();
    const updateMutation = useUpdateCourse();
    const deleteMutation = useDeleteCourse();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        duration: ''
    });

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                name: course.name,
                code: course.code,
                description: course.description,
                duration: course.duration
            });
        } else {
            setEditingCourse(null);
            setFormData({ name: '', code: '', description: '', duration: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await updateMutation.mutateAsync({ id: editingCourse._id, ...formData });
            } else {
                await createMutation.mutateAsync(formData);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteMutation.mutateAsync(courseToDelete._id);
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredCourses = courses?.data?.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <FullScreenLoader message="Loading Courses..." />;

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Course Management</h1>
                        <p className="text-slate-400 font-medium">Define and organize academic programs</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Course
                    </motion.button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                        type="text"
                        placeholder="Search courses by name or code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                    />
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses?.map((course) => (
                            <motion.div
                                key={course._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass p-6 rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button 
                                        onClick={() => handleOpenModal(course)}
                                        className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteClick(course)}
                                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{course.name}</h3>
                                        <span className="text-xs font-black uppercase tracking-widest text-blue-500/60">{course.code}</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span>Duration: {course.duration} {course.duration === 1 ? 'Year' : 'Years'}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCourses?.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-500 font-medium">No courses found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 text-slate-400 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold mb-8">
                                {editingCourse ? 'Edit Course' : 'Add New Course'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Name</label>
                                        <div className="relative">
                                            <input 
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                                placeholder="e.g. Computer Science"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Code</label>
                                        <div className="relative">
                                            <input 
                                                required
                                                type="text"
                                                value={formData.code}
                                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all uppercase"
                                                placeholder="e.g. CS101"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Duration (Years)</label>
                                    <input 
                                        required
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                        placeholder="e.g. 4"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                                    <textarea 
                                        required
                                        rows="4"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all resize-none"
                                        placeholder="Describe the course objective and outcomes..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {editingCourse ? 'Update Course' : 'Create Course'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Confirm Delete Modal */}
            <ConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
                title="Delete Course?"
                message={`Are you sure you want to permanently delete the ${courseToDelete?.name} program? All associated student records will remain but will lose their course association.`}
                confirmText="Delete Program"
                type="danger"
            />
        </div>
    );
}
