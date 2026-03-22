import api from '@/lib/api';

export const studentService = {
  getStudents: async () => {
    const res = await api.get('/students');
    return res.data;
  },
  getStudent: async (id) => {
    const res = await api.get(`/students/${id}`);
    return res.data;
  },
  createStudent: async (data) => {
    const res = await api.post('/students', data);
    return res.data;
  },
  updateStudent: async (id, data) => {
    const res = await api.put(`/students/${id}`, data);
    return res.data;
  },
  deleteStudent: async (id) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  }
};
