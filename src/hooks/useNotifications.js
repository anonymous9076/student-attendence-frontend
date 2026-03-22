import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

export const useNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await api.get('/notifications');
            return data;
        },
    });
};

export const useAdminNotifications = () => {
    return useQuery({
        queryKey: ['adminNotifications'],
        queryFn: async () => {
            const { data } = await api.get('/notifications/admin');
            return data;
        },
    });
};

export const useCreateNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newNotification) => {
            const { data } = await api.post('/notifications', newNotification);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['adminNotifications']);
            queryClient.invalidateQueries(['notifications']);
            toast.success('Announcement broadcasted successfully!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to send announcement');
        }
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/notifications/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['adminNotifications']);
            toast.success('Announcement removed.');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete announcement');
        }
    });
};
