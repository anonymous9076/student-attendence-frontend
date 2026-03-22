import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/admin');
            return data;
        },
    });
};

export const useStudentDashboard = () => {
    return useQuery({
        queryKey: ['studentDashboard'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/student');
            return data;
        },
    });
};
