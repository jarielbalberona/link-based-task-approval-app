import { useQuery, useMutation } from "@tanstack/react-query";
import { appQueryClient } from "@/providers/react-query";
import { createTaskAPI, createTaskAssignmentAPI, deleteTaskAPI, getTaskAssignmentAPI, getTaskAssignmentsAPI, getTasksAPI, updateTaskAPI, updateTaskAssignmentAPI, updateTaskAssignmentStatusByTokenAPI } from "@/api/tasks";

export function useTasks(initialTasks?: any) {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksAPI,
    initialData: initialTasks,
  });
}

export function useTaskAssignments() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTaskAssignmentsAPI,
  });
}

export function useCreateTaskAssignment() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: createTaskAssignmentAPI,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTaskAssignment() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: updateTaskAssignmentAPI,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useCreateTask() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: createTaskAPI,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: updateTaskAPI,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: deleteTaskAPI,
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTaskAssignmentStatusByToken() {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: ({ token, status }: { token: string; status: 'approved' | 'rejected' }) =>
      updateTaskAssignmentStatusByTokenAPI(token, status),
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}


