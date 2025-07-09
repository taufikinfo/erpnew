import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Factory, Plus, Eye, Edit, Trash2, LayoutGrid, Table2 } from 'lucide-react';
import { useWorkOrders } from '@/hooks/useManufacturing';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import ManufacturingSkeleton from '@/components/skeletons/ManufacturingSkeleton';
import KanbanBoard from '@/components/projects/KanbanBoard';

const Manufacturing = () => {
  const { workOrders, isLoading, createWorkOrder, updateWorkOrder, deleteWorkOrder } = useWorkOrders();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedWO, setSelectedWO] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [formData, setFormData] = useState({
    work_order_id: '',
    product: '',
    quantity: 0,
    status: 'planning' as 'planning' | 'in-progress' | 'completed',
    start_date: new Date().toISOString().split('T')[0],
    due_date: ''
  });

  const resetForm = () => {
    setFormData({
      work_order_id: '',
      product: '',
      quantity: 0,
      status: 'planning',
      start_date: new Date().toISOString().split('T')[0],
      due_date: ''
    });
  };

  const handleCreate = () => {
    const nextId = `WO-${String(workOrders.length + 1).padStart(3, '0')}`;
    createWorkOrder({
      ...formData,
      work_order_id: nextId,
    });
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEdit = (wo: any) => {
    setSelectedWO(wo);
    setFormData({
      work_order_id: wo.work_order_id || '',
      product: wo.product || '',
      quantity: wo.quantity || 0,
      status: wo.status || 'planning',
      start_date: wo.start_date || '',
      due_date: wo.due_date || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedWO) return;
    updateWorkOrder({
      id: selectedWO.id,
      ...formData,
    });
    setIsEditOpen(false);
    setSelectedWO(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteWorkOrder(id);
  };

  const handleView = (wo: any) => {
    setSelectedWO(wo);
    setIsViewOpen(true);
  };

  const handleStatusChange = (workOrderId: string, newStatus: string) => {
    updateWorkOrder({
      id: workOrderId,
      status: newStatus as 'planning' | 'in-progress' | 'completed',
    });
  };

  // Transform work orders for Kanban board compatibility
  const transformedWorkOrders = workOrders.map(wo => ({
    ...wo,
    name: wo.product,
    description: `Work Order: ${wo.work_order_id} | Quantity: ${wo.quantity}`,
    progress: wo.status === 'completed' ? 100 : wo.status === 'in-progress' ? 50 : 0,
    end_date: wo.due_date,
    budget: null
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Work order column definitions
  const workOrderColumns: ColumnDef<any>[] = [
    {
      id: 'work_order_id',
      header: 'Work Order',
      accessorKey: 'work_order_id',
      sortable: true,
      filterable: true,
      cell: (wo) => <span className="font-medium">{wo.work_order_id}</span>
    },
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'product',
      sortable: true,
      filterable: true,
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
      sortable: true,
      cell: (wo) => <span className="font-semibold">{wo.quantity}</span>
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['planning', 'in-progress', 'completed'],
      cell: (wo) => (
        <Badge className={getStatusColor(wo.status)}>
          {wo.status}
        </Badge>
      )
    },
    {
      id: 'start_date',
      header: 'Start Date',
      accessorKey: 'start_date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    },
    {
      id: 'due_date',
      header: 'Due Date',
      accessorKey: 'due_date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    }
  ];

  const workOrderActions = (wo: any) => (
    <div className="flex space-x-2">
      <Button size="sm" variant="ghost" onClick={() => handleView(wo)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleEdit(wo)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleDelete(wo.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  if (isLoading) {
    return <ManufacturingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manufacturing</h1>
          <p className="text-gray-600 mt-1">Manage production orders and manufacturing processes</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="flex items-center space-x-2"
            >
              <Table2 className="h-4 w-4" />
              <span>Table</span>
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="flex items-center space-x-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Kanban</span>
            </Button>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Work Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Work Order</DialogTitle>
                <DialogDescription>Add a new work order</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="product">Product</Label>
                  <Input
                    id="product"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'planning' | 'in-progress' | 'completed') => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Create Work Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Orders</CardTitle>
            <Factory className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{workOrders.filter(wo => wo.status === 'in-progress').length}</div>
            <p className="text-xs text-blue-600">In production</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Completed</CardTitle>
            <Factory className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{workOrders.filter(wo => wo.status === 'completed').length}</div>
            <p className="text-xs text-green-600">Orders finished</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Planning</CardTitle>
            <Factory className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{workOrders.filter(wo => wo.status === 'planning').length}</div>
            <p className="text-xs text-yellow-600">In planning phase</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Total Orders</CardTitle>
            <Factory className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{workOrders.length}</div>
            <p className="text-xs text-purple-600">All work orders</p>
          </CardContent>
        </Card>
      </div>

      
      {viewMode === 'table' ? (
        <AdvancedDataTable
          data={workOrders}
          columns={workOrderColumns}
          title="Work Orders"
          description="Track your manufacturing operations"
          searchPlaceholder="Search work orders by ID, product, status..."
          actions={workOrderActions}
          defaultPageSize={10}
        />
      ) : (
        <KanbanBoard
          projects={transformedWorkOrders}
          onViewProject={handleView}
          onEditProject={handleEdit}
          onDeleteProject={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Work Order</DialogTitle>
            <DialogDescription>Update work order information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-product">Product</Label>
              <Input
                id="edit-product"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-quantity">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'planning' | 'in-progress' | 'completed') => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-start_date">Start Date</Label>
              <Input
                id="edit-start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-due_date">Due Date</Label>
              <Input
                id="edit-due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Work Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Work Order Details</DialogTitle>
            <DialogDescription>View work order information</DialogDescription>
          </DialogHeader>
          {selectedWO && (
            <div className="grid gap-4 py-4">
              <div>
                <Label>Work Order ID</Label>
                <p className="font-medium">{selectedWO.work_order_id}</p>
              </div>
              <div>
                <Label>Product</Label>
                <p className="font-medium">{selectedWO.product}</p>
              </div>
              <div>
                <Label>Quantity</Label>
                <p className="font-medium">{selectedWO.quantity}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge className={getStatusColor(selectedWO.status)}>
                  {selectedWO.status}
                </Badge>
              </div>
              <div>
                <Label>Start Date</Label>
                <p className="font-medium">{selectedWO.start_date}</p>
              </div>
              <div>
                <Label>Due Date</Label>
                <p className="font-medium">{selectedWO.due_date}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manufacturing;
