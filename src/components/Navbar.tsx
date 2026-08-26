import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Code2, 
  Layers, 
  FileText, 
  BarChart3, 
  PlayCircle, 
  BookOpen, 
  Menu, 
  X, 
  User, 
  ShieldCheck,
  ChevronDown,
  LogOut,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInterview } from '../context/InterviewContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, darkMode, toggleDarkMode, loginDemoUser, logout } = useAuth();
  const { isInterviewActive } = useInterview();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'interview-setup', label: 'Mock Interview', icon: PlayCircle },
    { id: 'coding', label: 'Coding Arena', icon: Code2 },
    { id: 'system-design', label: 'System Design', icon: Layers },
    { id: 'resume', label: 'Resume AI', icon: FileText },
    { id: 'practice', label: 'Practice Mode', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
                  VertoMock
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/60">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Mock Assessment Engine
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-normal transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-indigo-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Quick Persona Demo Switcher */}
            <div className="relative">
              <button
                id="profile-dropdown-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user?.fullName || 'User'}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/50"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {user?.fullName || 'Alex Mercer'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {user?.role?.split(' ')[0] || 'Engineer'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {user?.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user?.email}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      <Zap className="w-3 h-3 fill-current" />
                      Readiness Score: {user?.readinessScore}%
                    </div>
                  </div>

                  <div className="px-3 py-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                      Switch Candidate Persona
                    </p>
                    <button
                      onClick={() => { loginDemoUser('senior'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <span>Alex Mercer (Senior Fullstack)</span>
                      <span className="text-[10px] text-emerald-500 font-bold">86%</span>
                    </button>
                    <button
                      onClick={() => { loginDemoUser('ai'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <span>Maya Lin (AI & ML Engineer)</span>
                      <span className="text-[10px] text-emerald-500 font-bold">89%</span>
                    </button>
                    <button
                      onClick={() => { loginDemoUser('fresher'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <span>Jordan Reed (Junior / Fresher)</span>
                      <span className="text-[10px] text-amber-500 font-bold">74%</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 px-2">
                    <button
                      onClick={() => { setCurrentTab('profile'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <User className="w-3.5 h-3.5" />
                      View Profile & Resume
                    </button>
                    <button
                      onClick={() => { setCurrentTab('admin'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                      Admin Control Panel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Start Mock CTA */}
            <button
              id="header-start-interview-btn"
              onClick={() => setCurrentTab(isInterviewActive ? 'interview-room' : 'interview-setup')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all duration-200 ${
                isInterviewActive
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20 animate-pulse'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20 hover:scale-[1.02]'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{isInterviewActive ? 'Resume Active Interview' : 'Start Mock'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
