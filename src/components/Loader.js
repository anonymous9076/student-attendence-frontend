export default function Loader({ size = "md" }) {
    const scale = size === "sm" ? 0.5 : size === "lg" ? 1.5 : 1;
    
    return (
        <div className="relative flex items-center justify-center py-4" style={{ transform: `scale(${scale})` }}>
            {/* Outer glowing ring */}
            <div
                className="absolute w-24 h-24 rounded-full border-[3px] border-t-blue-500 border-r-blue-500/30 border-b-blue-500/10 border-l-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-spin"
                style={{ animationDuration: '2s' }}
            />
            
            {/* Inner glowing ring */}
            <div
                className="absolute w-16 h-16 rounded-full border-[3px] border-t-cyan-400 border-l-cyan-400/30 border-b-cyan-400/10 border-r-cyan-400/30 animate-spin"
                style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
            />

            {/* Center dot */}
            <div
                className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"
                style={{ animationDuration: '1s' }}
            />
        </div>
    );
}
