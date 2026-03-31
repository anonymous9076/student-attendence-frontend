'use client';
import { useNotifications } from '@/hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, Calendar, AlertCircle, ChevronRight } from 'lucide-react';

export default function NotificationFeed() {
    const { data: notifications, isLoading } = useNotifications();

    if (isLoading) return (
        <div className="space-y-4">
            {[1, 2].map(i => <div key={i} className="h-24 bg-white/5 rounded-3xl animate-pulse" />)}
        </div>
    );

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {notifications?.data?.length > 0 ? (
                    notifications.data.map((n, idx) => (
                        <motion.div
                            key={n._id}
                            initial={{ opacity: 1, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900 border border-white/5 p-5 rounded-3xl hover:border-blue-500/20 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Bell className="w-12 h-12 rotate-12" />
                            </div>
                            
                            <div className="relative z-10 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <h4 className="font-bold text-sm tracking-tight">{n.title}</h4>
                                </div>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
                                    {n.message}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(n.createdAt).toLocaleDateString()}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                        n.audience === 'all' ? 'text-blue-500' : 'text-purple-500'
                                    }`}>
                                        {n.audience === 'all' ? 'Announcement' : 'Course Alert'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="py-12 text-center glass rounded-4xl border border-dashed border-white/10">
                        <Bell className="w-10 h-10 text-slate-800 mx-auto mb-4" />
                        <p className="text-slate-500 text-xs font-medium italic">No recent announcements.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
