export default function Loader({ size = "md", className = "" }) {
    const dimensions = 
        size === "sm" ? "w-6 h-6 border-2" : 
        size === "lg" ? "w-12 h-12 border-4" : 
        "w-10 h-10 border-[3px]";
    
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`${dimensions} border-blue-500 border-t-transparent rounded-full animate-spin`} />
        </div>
    );
}
