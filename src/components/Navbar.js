'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { LogOut, User, Users, Home, LayoutDashboard, Calendar, ClipboardList, BookOpen, GraduationCap, Bell, Library, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isHydrated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
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

  const visibleLinks = navLinks.filter(link => link.show);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Home className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">University</span>
          </Link>

          {/* Desktop Nav — hidden below md */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {visibleLinks.map((link) => {
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
            
            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden lg:block" />

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

          {/* Mobile Hamburger — shown below md */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all touch-manipulation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              {visibleLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all touch-manipulation ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-semibold">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all touch-manipulation"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-semibold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
