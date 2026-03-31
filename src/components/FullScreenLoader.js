'use client';
import { motion } from 'framer-motion';
import Loader from './Loader';

export default function FullScreenLoader({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <Loader />
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
