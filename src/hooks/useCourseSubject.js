import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

// --- Course Hooks ---

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const { data } = await api.get('/courses');
            return data;
        },
    });
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newCourse) => {
            const { data } = await api.post('/courses', newCourse);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            toast.success('Course created successfully!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to create course');
        }
    });
};

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data } = await api.put(`/courses/${id}`, updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            toast.success('Course updated successfully!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to update course');
        }
    });
};

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/courses/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            toast.success('Course deleted.');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete course');
        }
    });
};

// --- Subject Hooks ---

export const useSubjects = (courseId) => {
    return useQuery({
        queryKey: ['subjects', courseId],
        queryFn: async () => {
            const url = courseId ? `/subjects?courseId=${courseId}` : '/subjects';
            const { data } = await api.get(url);
            return data;
        },
    });
};

export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newSubject) => {
            const { data } = await api.post('/subjects', newSubject);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['subjects', variables.courseId]);
            queryClient.invalidateQueries(['subjects']); // Invalidate general list too
            toast.success('Subject added to curriculum!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to add subject');
        }
    });
};

export const useUpdateSubject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data } = await api.put(`/subjects/${id}`, updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['subjects']);
            toast.success('Subject details updated!');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to update subject');
        }
    });
};

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/subjects/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['subjects']);
            toast.success('Subject removed.');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to remove subject');
        }
    });
};
