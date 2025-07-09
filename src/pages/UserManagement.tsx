
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Shield, Group, Edit, Trash2, Settings, Key, Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import UserManagementSkeleton from '@/components/skeletons/UserManagementSkeleton';
import { useUserManagement } from '@/hooks/useUserManagement';
import { PasswordResetDialog } from '@/components/admin/PasswordResetDialog';
import { UserEditDialog } from '@/components/admin/UserEditDialog';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  job_title: string | null;
  bio: string | null;
  status: 'active' | 'inactive' | 'suspended';
  last_login: string | null;
  account_locked: boolean;
  user_roles?: Array<{ role: 'admin' | 'moderator' | 'user' }>;
  created_at: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const {
    users,
    usersLoading,
    adminActions,
    isAdmin,
    resetUserPassword,
    updateUserStatus,
    updateUserProfile,
    deleteUser,
    isResettingPassword,
    isUpdatingStatus,
    isUpdatingProfile,
    isDeletingUser,
  } = useUserManagement();

  // Dialog States
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [isUserEditOpen, setIsUserEditOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<User | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null);

  // Check if current user has admin privileges
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">You need administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  // Column definitions for users table
  const userColumns: ColumnDef<User>[] = [
    {
      id: 'display_name',
      header: 'Name',
      sortable: true,
      filterable: true,
      cell: (user) => (
        <div>
          <span className="font-medium">
            {user.first_name || user.last_name 
              ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
              : user.email.split('@')[0]
            }
          </span>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )
    },
    {
      id: 'user_role',
      header: 'Role',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['admin', 'user'],
      cell: (user) => {
        // Determine role based on job title or email
        const userRole = user.email === 'admin@erpnew.com' || 
                        user.job_title?.toLowerCase().includes('admin') || 
                        user.job_title?.toLowerCase().includes('administrator') ? 'admin' : 'user';
        return (
          <Badge variant={userRole === 'admin' ? 'destructive' : 'secondary'}>
            {userRole}
          </Badge>
        );
      }
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['active', 'inactive', 'suspended'],
      cell: (user) => (
        <div className="flex items-center gap-2">
          <Badge className={
            user.status === 'active' ? 'bg-green-100 text-green-800' : 
            user.status === 'suspended' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }>
            {user.status || 'active'}
          </Badge>
          {user.account_locked && (
            <Lock className="h-4 w-4 text-red-500" />
          )}
        </div>
      )
    },
    {
      id: 'last_login',
      header: 'Last Login',
      accessorKey: 'last_login',
      sortable: true,
      filterable: true,
      filterType: 'date',
      cell: (user) => user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'
    },
    {
      id: 'job_title',
      header: 'Job Title',
      accessorKey: 'job_title',
      sortable: true,
      filterable: true,
      cell: (user) => user.job_title || '-'
    }
  ];

  const handlePasswordReset = (user: User) => {
    setSelectedUserForReset(user);
    setIsPasswordResetOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUserForEdit(user);
    setIsUserEditOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  const handleConfirmPasswordReset = (newPassword: string) => {
    if (selectedUserForReset) {
      resetUserPassword({ 
        userId: selectedUserForReset.id, 
        newPassword 
      });
    }
  };

  const handleConfirmUserEdit = (userId: string, profileData: Partial<User>) => {
    updateUserProfile({ userId, profileData });
    setIsUserEditOpen(false);
    setSelectedUserForEdit(null);
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    updateUserStatus({ userId, status: newStatus });
  };

  const handleRoleChange = (userId: string, newRole: 'admin' | 'user') => {
    // Update job title to reflect role change
    const jobTitle = newRole === 'admin' ? 'Administrator' : 'User';
    updateUserProfile({ userId, profileData: { job_title: jobTitle } });
  };

  const userActions = (user: User) => (
    <div className="flex space-x-2">
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={() => handlePasswordReset(user)}
        title="Reset Password"
        disabled={isResettingPassword}
      >
        <Key className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={() => handleEditUser(user)}
        title="Edit User"
        disabled={isUpdatingProfile}
      >
        <Edit className="h-4 w-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            size="sm" 
            variant="ghost" 
            title="Delete User"
            disabled={isDeletingUser || user.id === currentUser?.id}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Select
        value={user.status || 'active'}
        onValueChange={(value) => handleStatusChange(user.id, value as 'active' | 'inactive' | 'suspended')}
        disabled={isUpdatingStatus}
      >
        <SelectTrigger className="w-24 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
      
      <Select
        value={user.email === 'admin@erpnew.com' || 
               user.job_title?.toLowerCase().includes('admin') || 
               user.job_title?.toLowerCase().includes('administrator') ? 'admin' : 'user'}
        onValueChange={(value) => handleRoleChange(user.id, value as 'admin' | 'user')}
        disabled={isUpdatingProfile || user.id === currentUser?.id}
      >
        <SelectTrigger className="w-24 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  if (usersLoading) {
    return <UserManagementSkeleton />;
  }

  const activeUsers = users?.filter(u => u.status === 'active').length || 0;
  const totalUsers = users?.length || 0;
  
  // Process users data to ensure proper typing and handle potential errors
  const processedUsers: User[] = (users || []).map(user => ({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    job_title: user.job_title,
    bio: user.bio,
    status: (user.status || 'active') as 'active' | 'inactive' | 'suspended',
    last_login: user.last_login,
    account_locked: user.account_locked || false,
    created_at: user.created_at,
    user_roles: [] // Not used in current implementation
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions with admin controls</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalUsers}</div>
            <p className="text-xs text-blue-600">Active: {activeUsers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Admin Actions</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{adminActions?.length || 0}</div>
            <p className="text-xs text-green-600">Recent actions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Suspended</CardTitle>
            <Lock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {processedUsers.filter(u => u.status === 'suspended').length || 0}
            </div>
            <p className="text-xs text-purple-600">Accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Admins</CardTitle>
            <Settings className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {processedUsers.filter(u => 
                u.email === 'admin@erpnew.com' || 
                u.job_title?.toLowerCase().includes('admin') || 
                u.job_title?.toLowerCase().includes('administrator')
              ).length || 0}
            </div>
            <p className="text-xs text-orange-600">Administrator accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        <AdvancedDataTable
          data={processedUsers}
          columns={userColumns}
          title="System Users"
          description="Manage user accounts, roles, and permissions"
          searchPlaceholder="Search users by name, email, or role..."
          actions={userActions}
          defaultPageSize={10}
        />
      </div>

      {/* Password Reset Dialog */}
      <PasswordResetDialog
        isOpen={isPasswordResetOpen}
        onClose={() => {
          setIsPasswordResetOpen(false);
          setSelectedUserForReset(null);
        }}
        onConfirm={handleConfirmPasswordReset}
        isLoading={isResettingPassword}
        userName={selectedUserForReset ? 
          `${selectedUserForReset.first_name || ''} ${selectedUserForReset.last_name || ''}`.trim() || 
          selectedUserForReset.email : ''
        }
      />

      {/* User Edit Dialog */}
      <UserEditDialog
        isOpen={isUserEditOpen}
        onClose={() => {
          setIsUserEditOpen(false);
          setSelectedUserForEdit(null);
        }}
        onSave={handleConfirmUserEdit}
        user={selectedUserForEdit}
        isLoading={isUpdatingProfile}
      />
    </div>
  );
};

export default UserManagement;
