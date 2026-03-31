'use client';
import { useProfessors, useDeleteProfessor, useUpdateProfessor } from '@/hooks/useProfessors';
import Loader from '@/components/Loader';
import { useCourses, useSubjects } from '@/hooks/useCourseSubject';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Edit3, User, Mail, GraduationCap, X, Phone, Briefcase } from 'lucide-react';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function ProfessorListPage() {
  const { data: professors, isLoading } = useProfessors();
  const deleteMutation = useDeleteProfessor();
  const updateMutation = useUpdateProfessor();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [professorToDelete, setProfessorToDelete] = useState(null);
  const [editingProfessor, setEditingProfessor] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    specialization: ''
  });

  const { data: courses } = useCourses();
  const selectedCourseObj = courses?.data?.find(c => c.name === editFormData.department);
  const { data: subjects } = useSubjects(selectedCourseObj?._id);

  if (isLoading) return <div className="flex items-center justify-center h-[70vh]"><Loader /></div>;

  const filteredProfessors = professors?.data?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (professor) => {
    setEditingProfessor(professor);
    setEditFormData({
      name: professor.name,
      email: professor.email,
      phone: professor.phone || '',
      department: professor.department || '',
      specialization: professor.specialization || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({ 
        id: editingProfessor._id, 
        data: editFormData 
      });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (professor) => {
    setProfessorToDelete(professor);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(professorToDelete._id);
      setIsDeleteModalOpen(false);
      setProfessorToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-dvh pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Faculty Directory</h1>
            <p className="text-slate-400 font-medium">Manage professor records and department assignments</p>
          </div>
          <Link href="/admin/professors/add">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add New Professor
            </motion.button>
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by professor name, email, or department..." 
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Table View */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-5 text-sm font-bold text-slate-300 uppercase tracking-widest">Professor</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-300 uppercase tracking-widest">Contact Info</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-300 uppercase tracking-widest">Department</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-300 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredProfessors?.map((professor, idx) => (
                    <motion.tr 
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      key={professor._id} 
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                            {professor.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">Dr. {professor.name}</div>
                            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{professor.specialization}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-slate-300 text-sm italic">
                            <Mail className="w-3.5 h-3.5" /> {professor.email}
                          </div>
                          <div className="text-slate-500 text-xs flex items-center gap-2">
                             <Phone className="w-3.5 h-3.5" /> {professor.phone || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                          <Briefcase className="w-3.5 h-3.5" /> {professor.department}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 transition-opacity">
                          <button 
                            onClick={() => handleEditClick(professor)}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(professor)} 
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {filteredProfessors?.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-white/5 mb-6 text-slate-600">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Professors Found</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your search criteria or add a new professor to the directory.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 text-slate-400 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Edit3 className="w-6 h-6 text-blue-500" />
                Edit Professor Profile
              </h2>

              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      required
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        required
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Department</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                      <select 
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-11 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer"
                        value={editFormData.department}
                        onChange={(e) => setEditFormData({...editFormData, department: e.target.value, specialization: ''})}
                      >
                        <option value="" disabled className="bg-slate-900">Select Department</option>
                        {courses?.data?.map(c => (
                           <option key={c.name} value={c.name} className="bg-slate-900">{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Specialization</label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                      <select 
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-11 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all appearance-none cursor-pointer disabled:opacity-50"
                        value={editFormData.specialization}
                        onChange={(e) => setEditFormData({...editFormData, specialization: e.target.value})}
                        disabled={!editFormData.department}
                      >
                        <option value="" disabled className="bg-slate-900">Select Specialization</option>
                        {subjects?.data?.map(s => (
                           <option key={s.name} value={s.name} className="bg-slate-900">{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
                  >
                    {updateMutation.isPending ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
        title="Revoke Professor Access?"
        message={`Are you sure you want to permanently delete Dr. ${professorToDelete?.name}? This will revoke their platform access and detach them from their modules.`}
        confirmText="Remove Record"
        type="danger"
      />
    </div>
  );
}
