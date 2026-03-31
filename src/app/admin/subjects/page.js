'use client';
import { useCourses } from '@/hooks/useCourseSubject';
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '@/hooks/useCourseSubject';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Book, 
    Code, 
    X,
    FolderPlus,
    Filter,
    ChevronDown,
    AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function SubjectManagementPage() {
    const { data: courses } = useCourses();
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const { data: subjects, isLoading } = useSubjects(selectedCourseId);
    
    const createMutation = useCreateSubject();
    const updateMutation = useUpdateSubject();
    const deleteMutation = useDeleteSubject();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);
    const [editingSubject, setEditingSubject] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        courseId: ''
    });

    useEffect(() => {
        if (courses?.data?.length > 0 && !selectedCourseId) {
            setSelectedCourseId(courses.data[0]._id);
        }
    }, [courses]);

    const handleOpenModal = (subject = null) => {
        if (subject) {
            setEditingSubject(subject);
            setFormData({
                name: subject.name,
                code: subject.code,
                description: subject.description,
                courseId: subject.courseId._id || subject.courseId
            });
        } else {
            setEditingSubject(null);
            setFormData({ 
                name: '', 
                code: '', 
                description: '', 
                courseId: selectedCourseId 
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSubject) {
                await updateMutation.mutateAsync({ id: editingSubject._id, ...formData });
            } else {
                await createMutation.mutateAsync(formData);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (subject) => {
        setSubjectToDelete(subject);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteMutation.mutateAsync(subjectToDelete._id);
            setIsDeleteModalOpen(false);
            setSubjectToDelete(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Subject Management</h1>
                        <p className="text-slate-400 font-medium">Manage academic subjects for each course</p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="relative w-full sm:w-64 group">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                            <select 
                                value={selectedCourseId}
                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-10 text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer"
                            >
                                {courses?.data?.map(c => (
                                    <option key={c._id} value={c._id} className="bg-slate-900 text-white">
                                        {c.name} ({c.code})
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-white transition-colors" />
                        </div>

                        <motion.button
                            initial={{ opacity: 1, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => handleOpenModal()}
                            disabled={!selectedCourseId}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                        >
                            <Plus className="w-5 h-5" />
                            Add Subject
                        </motion.button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {subjects?.data?.map((subject) => (
                                <motion.div
                                    key={subject._id}
                                    layout
                                    initial={{ opacity: 1, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass p-6 rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button 
                                            onClick={() => handleOpenModal(subject)}
                                            className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(subject)}
                                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
                                            <Book className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black uppercase tracking-widest text-indigo-500/60">{subject.code}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                        {subject.description || 'No description provided.'}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {subjects?.data?.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white/5 rounded-4xl border border-dashed border-white/10">
                                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FolderPlus className="w-8 h-8 text-slate-600" />
                                </div>
                                <p className="text-slate-500 font-medium">No subjects added for this course yet.</p>
                                <button 
                                    onClick={() => handleOpenModal()}
                                    className="text-blue-500 hover:underline mt-2 font-bold text-sm"
                                >
                                    Click here to add the first one
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 1, scale: 1, y: 0 }}
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
                                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Parent Course</label>
                                    <select 
                                        required
                                        value={formData.courseId}
                                        onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                                        className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-slate-900">Select Course</option>
                                        {courses?.data?.map(c => (
                                            <option key={c._id} value={c._id} className="bg-slate-900">
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Subject Name</label>
                                        <input 
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                            placeholder="e.g. Data Structures"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Subject Code</label>
                                        <input 
                                            required
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all uppercase"
                                            placeholder="e.g. CS202"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                                    <textarea 
                                        rows="4"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all resize-none"
                                        placeholder="Optional: Briefly describe the subject..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {editingSubject ? 'Update Subject' : 'Create Subject'}
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
                title="Delete Subject?"
                message={`Are you sure you want to permanently delete the ${subjectToDelete?.name} curriculum? This cannot be undone.`}
                confirmText="Delete Subject"
                type="danger"
            />
        </div>
    );
}
