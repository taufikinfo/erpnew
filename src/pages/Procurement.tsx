import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Eye, Edit, Trash2, Building2 } from 'lucide-react';
import { useSuppliers, usePurchaseOrders } from '@/hooks/useProcurement';
import ProcurementSkeleton from '@/components/skeletons/ProcurementSkeleton';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';

const Procurement = () => {
  const { suppliers, isLoading: suppliersLoading, createSupplier, updateSupplier, deleteSupplier } = useSuppliers();
  const { purchaseOrders, isLoading: ordersLoading, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = usePurchaseOrders();
  
  const [isSupplierCreateOpen, setIsSupplierCreateOpen] = useState(false);
  const [isPOCreateOpen, setIsPOCreateOpen] = useState(false);
  const [isSupplierEditOpen, setIsSupplierEditOpen] = useState(false);
  const [isPOEditOpen, setIsPOEditOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedPO, setSelectedPO] = useState<any>(null);

  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
  });

  const [poForm, setPOForm] = useState({
    po_number: '',
    supplier_id: '',
    total_amount: 0,
    status: 'draft' as 'draft' | 'sent' | 'approved' | 'delivered' | 'cancelled',
    order_date: new Date().toISOString().split('T')[0],
    expected_delivery: '',
    notes: '',
  });

  const handleCreateSupplier = () => {
    createSupplier(supplierForm);
    setIsSupplierCreateOpen(false);
    setSupplierForm({ name: '', contact_person: '', email: '', phone: '', address: '' });
  };

  const handleCreatePO = () => {
    const nextPONumber = `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`;
    createPurchaseOrder({
      ...poForm,
      po_number: nextPONumber,
    });
    setIsPOCreateOpen(false);
    setPOForm({
      po_number: '',
      supplier_id: '',
      total_amount: 0,
      status: 'draft',
      order_date: new Date().toISOString().split('T')[0],
      expected_delivery: '',
      notes: '',
    });
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSupplierForm({
      name: supplier.name || '',
      contact_person: supplier.contact_person || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
    });
    setIsSupplierEditOpen(true);
  };

  const handleUpdateSupplier = () => {
    if (!selectedSupplier) return;
    updateSupplier({
      id: selectedSupplier.id,
      ...supplierForm,
    });
    setIsSupplierEditOpen(false);
    setSelectedSupplier(null);
    setSupplierForm({ name: '', contact_person: '', email: '', phone: '', address: '' });
  };

  const handleEditPO = (po: any) => {
    setSelectedPO(po);
    setPOForm({
      po_number: po.po_number || '',
      supplier_id: po.supplier_id || '',
      total_amount: Number(po.total_amount) || 0,
      status: po.status || 'draft',
      order_date: po.order_date || '',
      expected_delivery: po.expected_delivery || '',
      notes: po.notes || '',
    });
    setIsPOEditOpen(true);
  };

  const handleUpdatePO = () => {
    if (!selectedPO) return;
    updatePurchaseOrder({
      id: selectedPO.id,
      ...poForm,
    });
    setIsPOEditOpen(false);
    setSelectedPO(null);
    setPOForm({
      po_number: '',
      supplier_id: '',
      total_amount: 0,
      status: 'draft',
      order_date: new Date().toISOString().split('T')[0],
      expected_delivery: '',
      notes: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const purchaseOrderColumns: ColumnDef<any>[] = [
    {
      id: 'po_number',
      header: 'PO Number',
      accessorKey: 'po_number',
      sortable: true,
      filterable: true,
    },
    {
      id: 'supplier',
      header: 'Supplier',
      accessorKey: 'suppliers',
      cell: (row) => row.suppliers?.name || 'Unknown',
      sortable: true,
      filterable: true,
    },
    {
      id: 'total_amount',
      header: 'Amount',
      accessorKey: 'total_amount',
      cell: (row) => `$${Number(row.total_amount).toLocaleString()}`,
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <Badge className={getStatusColor(row.status)}>{row.status}</Badge>,
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['draft', 'sent', 'approved', 'delivered', 'cancelled'],
    },
    {
      id: 'order_date',
      header: 'Order Date',
      accessorKey: 'order_date',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
    {
      id: 'expected_delivery',
      header: 'Expected Delivery',
      accessorKey: 'expected_delivery',
      cell: (row) => row.expected_delivery || 'Not set',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
  ];

  const supplierColumns: ColumnDef<any>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'contact_person',
      header: 'Contact Person',
      accessorKey: 'contact_person',
      sortable: true,
      filterable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
      filterable: true,
    },
    {
      id: 'phone',
      header: 'Phone',
      accessorKey: 'phone',
      sortable: true,
      filterable: true,
    },
    {
      id: 'address',
      header: 'Address',
      accessorKey: 'address',
      sortable: true,
      filterable: true,
    },
  ];

  if (suppliersLoading || ordersLoading) {
    return <ProcurementSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Procurement Management</h1>
          <p className="text-gray-600 mt-1">Manage suppliers and purchase orders</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{suppliers.length}</div>
            <p className="text-xs text-blue-600">Active suppliers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Purchase Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{purchaseOrders.length}</div>
            <p className="text-xs text-green-600">Total orders</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{purchaseOrders.filter(po => po.status === 'draft' || po.status === 'sent').length}</div>
            <p className="text-xs text-yellow-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Total Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${purchaseOrders.reduce((sum, po) => sum + Number(po.total_amount), 0).toLocaleString()}
            </div>
            <p className="text-xs text-purple-600">All purchase orders</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="purchase-orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="purchase-orders" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Manage purchase orders and procurement</CardDescription>
              </div>
              <Dialog open={isPOCreateOpen} onOpenChange={setIsPOCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Purchase Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Purchase Order</DialogTitle>
                    <DialogDescription>Add a new purchase order</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Select value={poForm.supplier_id} onValueChange={(value) => setPOForm({...poForm, supplier_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="total_amount">Total Amount</Label>
                      <Input
                        id="total_amount"
                        type="number"
                        value={poForm.total_amount}
                        onChange={(e) => setPOForm({...poForm, total_amount: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={poForm.status} onValueChange={(value: 'draft' | 'sent' | 'approved' | 'delivered' | 'cancelled') => setPOForm({...poForm, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expected_delivery">Expected Delivery</Label>
                      <Input
                        id="expected_delivery"
                        type="date"
                        value={poForm.expected_delivery}
                        onChange={(e) => setPOForm({...poForm, expected_delivery: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        id="notes"
                        value={poForm.notes}
                        onChange={(e) => setPOForm({...poForm, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreatePO}>Create Purchase Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <AdvancedDataTable
                data={purchaseOrders}
                columns={purchaseOrderColumns}
                title={undefined}
                description={undefined}
                isLoading={ordersLoading}
                actions={(po) => (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEditPO(po)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deletePurchaseOrder(po.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>Manage supplier information and contacts</CardDescription>
              </div>
              <Dialog open={isSupplierCreateOpen} onOpenChange={setIsSupplierCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Supplier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Supplier</DialogTitle>
                    <DialogDescription>Add a new supplier to the system</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="name">Supplier Name</Label>
                      <Input
                        id="name"
                        value={supplierForm.name}
                        onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact_person">Contact Person</Label>
                      <Input
                        id="contact_person"
                        value={supplierForm.contact_person}
                        onChange={(e) => setSupplierForm({...supplierForm, contact_person: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={supplierForm.email}
                        onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={supplierForm.phone}
                        onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={supplierForm.address}
                        onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateSupplier}>Add Supplier</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <AdvancedDataTable
                data={suppliers}
                columns={supplierColumns}
                title={undefined}
                description={undefined}
                isLoading={suppliersLoading}
                actions={(supplier) => (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEditSupplier(supplier)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteSupplier(supplier.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialogs */}
      <Dialog open={isPOEditOpen} onOpenChange={setIsPOEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
            <DialogDescription>Update purchase order information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-supplier">Supplier</Label>
              <Select value={poForm.supplier_id} onValueChange={(value) => setPOForm({...poForm, supplier_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-total_amount">Total Amount</Label>
              <Input
                id="edit-total_amount"
                type="number"
                value={poForm.total_amount}
                onChange={(e) => setPOForm({...poForm, total_amount: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={poForm.status} onValueChange={(value: 'draft' | 'sent' | 'approved' | 'delivered' | 'cancelled') => setPOForm({...poForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-expected_delivery">Expected Delivery</Label>
              <Input
                id="edit-expected_delivery"
                type="date"
                value={poForm.expected_delivery}
                onChange={(e) => setPOForm({...poForm, expected_delivery: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Input
                id="edit-notes"
                value={poForm.notes}
                onChange={(e) => setPOForm({...poForm, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdatePO}>Update Purchase Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSupplierEditOpen} onOpenChange={setIsSupplierEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>Update supplier information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Supplier Name</Label>
              <Input
                id="edit-name"
                value={supplierForm.name}
                onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-contact_person">Contact Person</Label>
              <Input
                id="edit-contact_person"
                value={supplierForm.contact_person}
                onChange={(e) => setSupplierForm({...supplierForm, contact_person: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={supplierForm.email}
                onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={supplierForm.phone}
                onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={supplierForm.address}
                onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateSupplier}>Update Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Procurement;
