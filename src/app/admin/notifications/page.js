'use client';
import { useCourses } from '@/hooks/useCourseSubject';
import { useAdminNotifications, useCreateNotification, useDeleteNotification } from '@/hooks/useNotifications';
import { useSelector } from 'react-redux';
import { useProfile } from '@/hooks/useProfile';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    Send, 
    Trash2, 
    Users, 
    Layers, 
    X, 
    Plus,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function NotificationManagement() {
    const { user } = useSelector((state) => state.auth);
    const { data: profile } = useProfile();
    const isProfessor = user?.role === 'professor';

    const { data: courses } = useCourses();
    const { data: notifications, isLoading } = useAdminNotifications();
    const createMutation = useCreateNotification();
    const deleteMutation = useDeleteNotification();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        audience: 'all',
        courseId: ''
    });

    const professorCourseName = isProfessor ? profile?.professor?.department : null;
    const professorCourseObj = courses?.data?.find(c => c.name === professorCourseName);
    const professorCourseId = professorCourseObj?._id || '';

    useEffect(() => {
        if (isModalOpen && isProfessor && professorCourseId) {
            setFormData(prev => ({ ...prev, audience: 'course', courseId: professorCourseId }));
        }
    }, [isModalOpen, isProfessor, professorCourseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createMutation.mutateAsync(formData);
            setIsModalOpen(false);
            setFormData({ title: '', message: '', audience: 'all', courseId: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (notification) => {
        setNotificationToDelete(notification);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteMutation.mutateAsync(notificationToDelete._id);
            setIsDeleteModalOpen(false);
            setNotificationToDelete(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-dvh pt-12 pb-24 px-6 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Announcements</h1>
                        <p className="text-slate-400 font-medium">Broadcast updates and alerts to the student body</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Bell className="w-5 h-5" />
                        New Announcement
                    </motion.button>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        notifications?.data?.map((n, idx) => (
                            <motion.div 
                                key={n._id}
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 transition-colors group"
                            >
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold">{n.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            n.audience === 'all' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'
                                        }`}>
                                            {n.audience === 'all' ? 'Global' : `Course: ${n.courseId?.name}`}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{n.message}</p>
                                    <p className="text-[10px] text-slate-600 font-mono">
                                        Sent on {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                { (n.createdBy === user?._id || n.createdBy === user?.id) && (
                                    <button 
                                        onClick={() => handleDeleteClick(n)}
                                        className="p-3 rounded-2xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </motion.div>
                        ))
                    )}

                    {!isLoading && notifications?.data?.length === 0 && (
                        <div className="text-center py-20 glass rounded-4xl border border-dashed border-white/10">
                            <Bell className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">No announcements have been sent yet.</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ opacity: 1, scale: 1, y: 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] p-8 relative shadow-2xl"
                            >
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Bell className="text-blue-500" /> Draft Announcement
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {!isProfessor && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Target Audience</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => setFormData({...formData, audience: 'all'})}
                                                    className={`p-4 rounded-2xl border flex items-center justify-center gap-2 transition-all font-bold text-sm ${
                                                        formData.audience === 'all' 
                                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <Users className="w-4 h-4" /> Global
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setFormData({...formData, audience: 'course'})}
                                                    className={`p-4 rounded-2xl border flex items-center justify-center gap-2 transition-all font-bold text-sm ${
                                                        formData.audience === 'course' 
                                                        ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' 
                                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <Layers className="w-4 h-4" /> Specific Course
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {formData.audience === 'course' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Target Course</label>
                                            <select 
                                                required
                                                disabled={isProfessor}
                                                className={`w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none ${isProfessor ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                value={formData.courseId}
                                                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                                            >
                                                <option value="" disabled className="bg-slate-900">Choose Course</option>
                                                {courses?.data?.map(c => <option key={c._id} value={c._id} className="bg-slate-900">{c.name}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Subject Header</label>
                                        <input 
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none"
                                            placeholder="Enter announcement title..."
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Message Content</label>
                                        <textarea 
                                            required
                                            rows="4"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none resize-none"
                                            placeholder="Write the full message details here..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={createMutation.isPending}
                                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                                    >
                                        <Send className="w-5 h-5" />
                                        {createMutation.isPending ? 'Processing...' : 'Broadcast Announcement'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
            {/* Confirm Delete Modal */}
            <ConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
                title="Remove Announcement?"
                message="Are you sure you want to delete this announcement? This will remove it from all student feeds."
                confirmText="Delete Bulletin"
                type="danger"
            />
        </div>
    );
}
