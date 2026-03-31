'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { LogOut, User, Users, Home, LayoutDashboard, Calendar, ClipboardList, BookOpen, GraduationCap, Bell, Library } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isHydrated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (!isHydrated || !isAuthenticated) return null;

    const navLinks = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard, show: true },
        { name: 'Students', href: '/admin/students', icon: Users, show: user?.role === 'admin' },
        { name: 'Professors', href: '/admin/professors', icon: GraduationCap, show: user?.role === 'admin' },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen, show: user?.role === 'admin' },
        { name: 'Subjects', href: '/admin/subjects', icon: Library, show: user?.role === 'admin' },
        { name: 'Records', href: '/admin/attendance/records', icon: ClipboardList, show: user?.role === 'admin' || user?.role === 'professor' },
        { name: 'Mark Attendance', href: '/admin/attendance/mark', icon: Calendar, show: user?.role === 'professor' },
        { name: 'Announcements', href: '/admin/notifications', icon: Bell, show: user?.role === 'admin' || user?.role === 'professor' },
        { name: 'My Course', href: '/my-course', icon: GraduationCap, show: user?.role === 'student' },
        { name: 'My Attendance', href: '/attendance', icon: Calendar, show: user?.role === 'student' },
        { name: 'My Profile', href: '/profile', icon: User, show: user?.role === 'student' || user?.role === 'professor' },
    ];

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Home className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">University</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          {navLinks.filter(link => link.show).map((link) => {
            const IconComponent = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                title={link.name}
                className={`flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 relative group ${
                  pathname === link.href 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10 uppercase tracking-widest">
                  {link.name}
                </span>
              </Link>
            );
          })}
          
          <div className="h-6 w-[1px] bg-white/10 mx-2 hidden sm:block" />

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-white">{user?.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">{user?.role}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
