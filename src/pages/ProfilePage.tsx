import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Award, 
  Save, 
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [location, setLocation] = useState(user?.location || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = () => {
    updateProfile({
      fullName,
      email,
      role,
      location,
      skills
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Candidate Profile & Target Preferences
            </h1>
            <p className="text-xs text-slate-500">
              Manage your personal credentials, education, and target interview roles
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{savedSuccess ? 'Saved!' : 'Save Profile'}</span>
        </button>
      </div>

      {/* Main Profile Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Avatar & Basics */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Candidate"
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {fullName || 'Candidate Name'}
            </h3>
            <p className="text-xs text-slate-500">{role || 'Software Engineer'}</p>
            <span className="inline-block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60 mt-1">
              Readiness Score: {user?.readinessScore || 86}%
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">Current Role / Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Skills Management */}
        <div className="space-y-3 pt-2">
          <label className="font-bold text-slate-700 dark:text-slate-300 text-xs block">
            Technical Skills ({skills.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Kubernetes, Golang)"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
