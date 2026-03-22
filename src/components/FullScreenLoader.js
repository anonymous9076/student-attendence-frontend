'use client';
import { motion } from 'framer-motion';

export default function FullScreenLoader({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative flex items-center justify-center"
            >
                {/* Outer glowing ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 rounded-full border-[3px] border-t-blue-500 border-r-blue-500/30 border-b-blue-500/10 border-l-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                />
                
                {/* Inner glowing ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-16 h-16 rounded-full border-[3px] border-t-cyan-400 border-l-cyan-400/30 border-b-cyan-400/10 border-r-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                />

                {/* Center dot */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 text-blue-400 font-black tracking-[0.2em] uppercase text-xs"
            >
                {message}
            </motion.p>
        </div>
    );
}
