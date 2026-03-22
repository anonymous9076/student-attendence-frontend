import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

export const useAttendance = (filters) => {
    return useQuery({
        queryKey: ['attendance', filters],
        queryFn: async () => {
            const { data } = await api.get('/attendance', {
                params: filters
            });
            return data;
        },
        enabled: !!filters
    });
};

export const useMarkAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (attendanceData) => {
            const { data } = await api.post('/attendance/mark', attendanceData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['attendance']);
            toast.success('Attendance records saved!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to save attendance');
        }
    });
};

export const useStudentAttendance = (studentId) => {
    return useQuery({
        queryKey: ['attendance', 'student', studentId],
        queryFn: async () => {
            const { data } = await api.get(`/attendance/student/${studentId}`);
            return data;
        },
        enabled: !!studentId
    });
};

export const useAttendanceSummary = (studentId) => {
    return useQuery({
        queryKey: ['attendance', 'summary', studentId],
        queryFn: async () => {
            const { data } = await api.get(`/attendance/summary/${studentId}`);
            return data;
        },
        enabled: !!studentId
    });
};
