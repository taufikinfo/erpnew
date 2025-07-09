import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Employee {
  id: string;
  employee_id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  position: string;
  department: string;
  hire_date: string;
  salary: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface EmployeeInsert {
  employee_id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  hire_date: string;
  salary?: number;
  status: string;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  reason: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LeaveRequestInsert {
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status: string;
}

export const useEmployees = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const response = await apiClient.getEmployees();
        return response.items || response || [];
      } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createEmployee = useMutation({
    mutationFn: async (employee: EmployeeInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.createEmployee(employee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({ title: "Success", description: "Employee created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateEmployee = useMutation({
    mutationFn: async ({ id, ...employee }: Partial<Employee> & { id: string }) => {
      return await apiClient.updateEmployee(id, employee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({ title: "Success", description: "Employee updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteEmployee(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({ title: "Success", description: "Employee deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    employees,
    isLoading,
    createEmployee: createEmployee.mutate,
    updateEmployee: updateEmployee.mutate,
    deleteEmployee: deleteEmployee.mutate,
  };
};

export const useLeaveRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: leaveRequests = [], isLoading } = useQuery({
    queryKey: ['leave-requests'],
    queryFn: async () => {
      try {
        // For now, return mock data since we don't have leave requests endpoint
        return [
          {
            id: '1',
            employee_id: '1',
            leave_type: 'Annual Leave',
            start_date: '2024-01-15',
            end_date: '2024-01-20',
            days_requested: 5,
            reason: 'Family vacation',
            status: 'approved',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          {
            id: '2',
            employee_id: '2',
            leave_type: 'Sick Leave',
            start_date: '2024-01-10',
            end_date: '2024-01-12',
            days_requested: 3,
            reason: 'Medical appointment',
            status: 'pending',
            created_at: '2024-01-08T00:00:00Z',
            updated_at: '2024-01-08T00:00:00Z',
          },
        ];
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createLeaveRequest = useMutation({
    mutationFn: async (leaveRequest: LeaveRequestInsert) => {
      if (!user) throw new Error('User not authenticated');
      // Mock implementation - in real app, this would call API
      return { id: Date.now().toString(), ...leaveRequest, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      toast({ title: "Success", description: "Leave request created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateLeaveRequest = useMutation({
    mutationFn: async ({ id, ...leaveRequest }: Partial<LeaveRequest> & { id: string }) => {
      // Mock implementation - in real app, this would call API
      return { id, ...leaveRequest, updated_at: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      toast({ title: "Success", description: "Leave request updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteLeaveRequest = useMutation({
    mutationFn: async (id: string) => {
      // Mock implementation - in real app, this would call API
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      toast({ title: "Success", description: "Leave request deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    leaveRequests,
    isLoading,
    createLeaveRequest: createLeaveRequest.mutate,
    updateLeaveRequest: updateLeaveRequest.mutate,
    deleteLeaveRequest: deleteLeaveRequest.mutate,
  };
};

export const useHumanResources = () => {
  const employees = useEmployees();
  const leaveRequests = useLeaveRequests();

  return {
    employees: employees.employees,
    leaveRequests: leaveRequests.leaveRequests,
    isLoading: employees.isLoading || leaveRequests.isLoading,
    createEmployee: employees.createEmployee,
    updateEmployee: employees.updateEmployee,
    deleteEmployee: employees.deleteEmployee,
    createLeaveRequest: leaveRequests.createLeaveRequest,
    updateLeaveRequest: leaveRequests.updateLeaveRequest,
    deleteLeaveRequest: leaveRequests.deleteLeaveRequest,
  };
};
