import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { studentService } from '@/services/studentService';
import { toast } from 'sonner';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: studentService.getStudents
  });
};

export const useStudent = (id) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => studentService.getStudent(id),
    enabled: !!id
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
      toast.success('Student registered successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || 'Failed to create student');
    }
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => studentService.updateStudent(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['students']);
      queryClient.invalidateQueries(['student', variables.id]);
    }
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });
};
