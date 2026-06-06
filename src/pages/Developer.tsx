import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Eye, EyeOff, ShieldCheck, Mail, Calendar, Trash2, LogOut, 
  Terminal, Users, Layers, ExternalLink, Plus, Edit, RefreshCw, X, Save 
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  objective: string;
  message: string;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  name?: string;
  tagline: string;
  desc: string;
  challenge: string;
  solution: string;
  image: string;
  img?: string;
  wireframe: string;
  preview?: string;
  color: string;
  liveLink: string;
  order: number;
}

export default function Developer() {
  const [sessionToken, setSessionToken] = useState<string | null>(() => localStorage.getItem('mo_session_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tabs: 'inquiries' | 'portfolio'
  const [activeTab, setActiveTab] = useState<'inquiries' | 'portfolio'>('inquiries');

  // Dashboard Inbox State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // CMS Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [cmsError, setCmsError] = useState('');

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      localStorage.setItem('mo_session_token', data.token);
      setSessionToken(data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mo_session_token');
    setSessionToken(null);
    setInquiries([]);
    setProjects([]);
    setEditingProject(null);
  };

  // Fetch inquiries when session exists
  const fetchInquiries = async () => {
    if (!sessionToken) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (!response.ok) {
        if (response.status === 403) {
          handleLogout();
        }
        throw new Error('Failed to retrieve messages');
      }
      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsProjectsLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Projects fetch error:', err);
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (response.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
      } else {
        alert('Failed to delete query.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Delete Project CMS operation
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project template?')) return;
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (response.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (editingProject?.id === id) {
          setEditingProject(null);
        }
      } else {
        alert('Failed to delete project.');
      }
    } catch (err) {
      console.error('Delete project error:', err);
    }
  };

  // Populate dynamic inputs for Add or Edit
  const handleOpenAddForm = () => {
    setEditingProject({
      id: 'new',
      title: '',
      tagline: '',
      desc: '',
      challenge: '',
      solution: '',
      image: '',
      wireframe: '',
      color: 'from-slate-700/20 to-zinc-900/20',
      liveLink: '',
      order: projects.length + 1
    });
    setCmsError('');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleOpenEditForm = (proj: Project) => {
    setEditingProject({ ...proj });
    setCmsError('');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Submit Project CMS form to server
  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) {
      setCmsError('Project title is mandatory.');
      return;
    }
    setIsSavingProject(true);
    setCmsError('');

    const payload = {
      ...editingProject,
      name: editingProject.title, // Synchronize name block
      img: editingProject.image, // Synchronize img block
      preview: editingProject.wireframe // Synchronize preview block
    };

    const isNew = editingProject.id === 'new';
    const endpoint = isNew ? '/api/admin/projects' : `/api/admin/projects/${editingProject.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errObj = await response.json();
        throw new Error(errObj.error || 'Request failed.');
      }

      setEditingProject(null);
      await fetchProjects();
    } catch (err: any) {
      setCmsError(err.message || 'Error occurred while saving your project.');
    } finally {
      setIsSavingProject(false);
    }
  };

  // Restore/Seed original default project items
  const handleRestoreDefaults = async () => {
    if (!confirm('WARNING: This will overwrite existing custom projects with default samples. Proceed?')) return;
    setIsProjectsLoading(true);
    try {
      const response = await fetch('/api/admin/projects/seed', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (response.ok) {
        await fetchProjects();
        alert('Sample portfolio projects loaded successfully into Firestore.');
      } else {
        alert('Failed to reset default portfolio databases.');
      }
    } catch (err) {
      console.error('Restore error:', err);
    } finally {
      setIsProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionToken) {
      fetchInquiries();
      fetchProjects();
    }
  }, [sessionToken]);

  // Calculations
  const totalInquiries = inquiries.length;
  const projectRequests = inquiries.filter(i => i.objective === 'New Project').length;
  const consultations = inquiries.filter(i => i.objective === 'Consultation').length;

  return (
    <main className="min-h-screen pt-32 pb-40 px-6 sm:px-12 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <AnimatePresence mode="wait">
        {!sessionToken ? (
          /* Login Screen */
          <motion.div 
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-flex p-4 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-2xl mb-4">
                <Lock size={24} />
              </div>
              <h1 className="text-4xl font-display font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                Mo's Console
              </h1>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-400 font-bold mt-2">
                Developer Authentication Gateway
              </p>
            </div>

            <div className="glass rounded-3xl p-8 border border-slate-200/50 dark:border-white/5 relative">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-extrabold">
                    Developer Keyname
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. mo"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 text-sm" 
                  />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40 ml-1 font-extrabold">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 outline-none focus:border-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 text-sm font-mono" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium text-center">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-extrabold rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all disabled:opacity-50 cursor-pointer shadow-lg dark:shadow-none"
                >
                  {isSubmitting ? 'Decrypting Secure Vault...' : 'Access Console'}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* Developer Dashboard Portal */
          <motion.div 
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-display font-black tracking-tight uppercase text-slate-900 dark:text-white">
                    Dev Command Center
                  </h1>
                  <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    <ShieldCheck size={10} /> Live Auth
                  </span>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">
                  Secure administration interface for <span className="text-slate-900 dark:text-white font-semibold">Mo.dev</span> database nodes & layouts.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-red-500/10 border border-slate-200/50 dark:bg-white/5 hover:dark:bg-red-500/10 dark:border-white/5 hover:text-red-500 text-slate-600 dark:text-gray-400 hover:dark:border-red-500/20 text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer"
              >
                <LogOut size={12} />
                Terminate Session
              </button>
            </div>

            {/* Quick Analytics Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Inquiries', val: totalInquiries, icon: <Terminal className="text-blue-500" /> },
                { label: 'Project Briefings', val: projectRequests, icon: <Users className="text-amber-500" /> },
                { label: 'Consultations', val: consultations, icon: <Layers className="text-purple-500" /> },
                { label: 'CMS Active Node', val: projects.length, icon: <Layers className="text-emerald-500" /> }
              ].map((stat, i) => (
                <div key={i} className="glass border border-slate-200/40 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-extrabold uppercase tracking-widest">
                      {stat.label}
                    </h3>
                    <p className="text-2xl font-bold font-display text-slate-800 dark:text-white mt-1">
                      {stat.val}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Tab Swapping Control */}
            <div className="flex border-b border-slate-200 dark:border-white/10 gap-8">
              <button
                onClick={() => { setActiveTab('inquiries'); setEditingProject(null); }}
                className={`pb-4 text-xs font-bold uppercase tracking-widest relative cursor-pointer ${
                  activeTab === 'inquiries' ? 'text-blue-500' : 'text-slate-400 dark:text-gray-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Inbox ({totalInquiries})
                {activeTab === 'inquiries' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('portfolio'); }}
                className={`pb-4 text-xs font-bold uppercase tracking-widest relative cursor-pointer ${
                  activeTab === 'portfolio' ? 'text-blue-500' : 'text-slate-400 dark:text-gray-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Portfolio CMS ({projects.length})
                {activeTab === 'portfolio' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            </div>

            {activeTab === 'inquiries' ? (
              /* TAB 1: Transmission message logs list */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    Incoming Transmission Logs
                  </h2>
                  <button
                    onClick={fetchInquiries}
                    className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                    Refresh Logs
                  </button>
                </div>

                {isLoading ? (
                  <div className="py-20 text-center text-slate-400 text-sm">
                    Connecting to secure ledger...
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="glass border border-dashed border-slate-200 dark:border-white/10 rounded-3xl py-16 text-center text-slate-500 dark:text-gray-400 text-sm">
                    No transmissions found inside deep-space memory.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {inquiries.map((inq) => (
                      <motion.div
                        layout
                        key={inq.id}
                        className="glass border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-white/10 transition-colors relative group"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          {/* Client Info */}
                          <div className="space-y-4 max-w-2xl w-full">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg">
                                {inq.objective}
                              </span>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {inq.name}
                              </h3>
                            </div>

                            <p className="text-slate-700 dark:text-white/80 text-sm font-medium leading-relaxed bg-slate-100/50 dark:bg-white/3 p-4 rounded-xl border border-slate-200/20 dark:border-white/2">
                              {inq.message}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-500 dark:text-gray-400 font-medium">
                              <a 
                                href={`mailto:${inq.email}`} 
                                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors shrink-0"
                              >
                                <Mail size={12} />
                                {inq.email}
                                <ExternalLink size={10} />
                              </a>
                              <span className="flex items-center gap-1.5 shrink-0">
                                <Calendar size={12} />
                                {inq.createdAt ? new Date(inq.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'Unknown'}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="md:self-center shrink-0">
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="flex items-center justify-center p-3 bg-red-500/10 hover:bg-red-500 border border-red-500/15 text-red-500 hover:text-white rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/5"
                              title="Wipe record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* TAB 2: Custom Project Portfolio CMS */
              <div className="space-y-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                      Portfolio Management Schema
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct CRUD override parameters linking database rows to dynamic display cards.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleRestoreDefaults}
                      className="flex items-center gap-2 px-4 py-2 border border-blue-500/20 text-blue-500 hover:bg-blue-600 hover:text-white text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Seed Defaults
                    </button>

                    <button
                      onClick={handleOpenAddForm}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-xl shadow-lg transition-colors cursor-pointer"
                    >
                      <Plus size={12} />
                      Add Project
                    </button>
                  </div>
                </div>

                {/* Form Editor Section (Inline) */}
                <AnimatePresence>
                  {editingProject && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="glass border border-blue-600/30 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 space-y-6"
                    >
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
                        <h3 className="text-sm font-extrabold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                          <Terminal size={14} />
                          {editingProject.id === 'new' ? 'Build New Digital Masterpiece' : 'Refactor Existing Index'}
                        </h3>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-lg cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProjectForm} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Title */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Project Title</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Jays Roofing"
                              value={editingProject.title || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white"
                            />
                          </div>

                          {/* Tagline */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tagline (One-line subtitle)</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Premium Domestic Shielding & Structural Engineering"
                              value={editingProject.tagline || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white"
                            />
                          </div>

                          {/* Image URL */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Main Banner Image URL</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                              value={editingProject.image || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-mono text-xs"
                            />
                          </div>

                          {/* Wireframe URL */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Wireframe Preview Image URL</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                              value={editingProject.wireframe || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, wireframe: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-mono text-xs"
                            />
                          </div>

                          {/* Live production link */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Live URL Production Link</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. https://jays-roofing.vercel.app"
                              value={editingProject.liveLink || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-mono text-xs"
                            />
                          </div>

                          {/* Display Order */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Display Order index</label>
                            <input
                              required
                              type="number"
                              min="1"
                              value={editingProject.order || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value, 10) })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white"
                            />
                          </div>

                          {/* Description */}
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Homepage Short Description (1-2 sentences)</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. A premium digital branding portal for elite roofing craftsmen in Melton, Victoria..."
                              value={editingProject.desc || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white"
                            />
                          </div>

                          {/* Gradient Selection */}
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Visual Background Gradient (Tailwind scale)</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. from-slate-700/20 to-zinc-900/20"
                              value={editingProject.color || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, color: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-mono"
                            />
                          </div>

                          {/* Challenge details */}
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Detailed Challenge Description</label>
                            <textarea
                              required
                              rows={4}
                              placeholder="Explain what problems the business faced and why code structure mattered..."
                              value={editingProject.challenge || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white resize-none"
                            />
                          </div>

                          {/* Solution description */}
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Detailed Solution Description</label>
                            <textarea
                              required
                              rows={4}
                              placeholder="Explain your technical engineering logic and layout decisions..."
                              value={editingProject.solution || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 text-slate-900 dark:text-white resize-none"
                            />
                          </div>
                        </div>

                        {cmsError && (
                          <div className="p-3 bg-red-500/10 border border-red-500/15 rounded-xl text-red-500 font-medium text-xs text-center">
                            {cmsError}
                          </div>
                        )}

                        <div className="flex gap-4 items-center justify-end">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-5 py-2.5 hover:bg-slate-100 hover:dark:bg-white/5 text-[10px] uppercase font-extrabold tracking-widest text-slate-500 dark:text-gray-400 rounded-xl transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            disabled={isSavingProject}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold tracking-widest text-[10px] uppercase px-6 py-3 rounded-xl cursor-pointer"
                          >
                            {isSavingProject ? (
                              <>
                                <RefreshCw className="animate-spin" size={12} />
                                Synchronizing Ledger...
                              </>
                            ) : (
                              <>
                                <Save size={12} />
                                Commit Changes
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Projects Catalog Grid */}
                {isProjectsLoading ? (
                  <div className="py-20 text-center text-slate-400 text-sm">
                    Querying portfolio nodes...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="glass border border-dashed border-slate-200 dark:border-white/10 rounded-3xl py-16 text-center text-slate-500 dark:text-gray-400 text-sm">
                    No custom portfolio items stored inside database. Direct fallbacks will be shown instead.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="glass border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Order 0{proj.order}</span>
                              <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">{proj.title}</h3>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditForm(proj)}
                                className="p-2 bg-slate-100 hover:bg-blue-600 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-white dark:hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit project"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 bg-slate-100 hover:bg-red-500 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-white dark:hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="aspect-video w-full rounded-xl overflow-hidden">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                          </div>

                          <p className="text-slate-500 dark:text-gray-400 text-xs italic">
                            "{proj.tagline}"
                          </p>
                          <p className="text-slate-600 dark:text-white/60 text-xs line-clamp-3">
                            {proj.desc || proj.challenge}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-6 flex items-center justify-between text-[11px] font-medium text-slate-500">
                          <span className="font-mono text-[9px] text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded">ID: {proj.id}</span>
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                          >
                            Live URL <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
