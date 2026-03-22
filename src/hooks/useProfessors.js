import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

export const useProfessors = () => {
    return useQuery({
        queryKey: ['professors'],
        queryFn: async () => {
            const { data } = await api.get('/professors');
            return data;
        },
    });
};

export const useProfessor = (id) => {
    return useQuery({
        queryKey: ['professors', id],
        queryFn: async () => {
            const { data } = await api.get(`/professors/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useAddProfessor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (professorData) => {
            const { data } = await api.post('/professors', professorData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['professors']);
            toast.success('Professor profile created successfully', {
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.05)'
                }
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to create professor');
        }
    });
};

export const useUpdateProfessor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await api.put(`/professors/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['professors']);
            toast.success('Professor profile updated successfully', {
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.05)'
                }
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update professor');
        }
    });
};

export const useDeleteProfessor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/professors/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['professors']);
            toast.success('Professor access revoked securely', {
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.05)'
                }
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to delete professor');
        }
    });
};
