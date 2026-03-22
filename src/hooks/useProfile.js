import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await api.get('/auth/me');
            return data.data; // Backend returns { success: true, data: { user, student? } }
        },
    });
};
