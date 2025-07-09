import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Package,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  AlertTriangle,
} from "lucide-react";
import { useInventory } from "@/hooks/useInventory";
import type { InventoryItem } from "@/hooks/useInventory";
import {
  AdvancedDataTable,
  ColumnDef,
} from "@/components/table/AdvancedDataTable";
import InventorySkeleton from "@/components/skeletons/InventorySkeleton";

const Inventory = () => {
  const {
    inventoryItems,
    isLoading,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  } = useInventory();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    unit_price: 0,
    supplier: "",
    status: "in stock" as "in stock" | "low stock" | "out of stock",
  });

  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    category: "",
    stock: 0,
    unit_price: 0,
    supplier: "",
    status: "in stock" as "in stock" | "low stock" | "out of stock",
  });

  const handleCreate = () => {
    createInventoryItem(newItem);
    setIsCreateOpen(false);
    setNewItem({
      name: "",
      category: "",
      stock: 0,
      unit_price: 0,
      supplier: "",
      status: "in stock",
    });
  };

  const handleEdit = (item: any) => {
    setEditItem({
      id: item.id,
      name: item.name,
      category: item.category,
      stock: item.stock,
      unit_price: Number(item.unit_price),
      supplier: item.supplier,
      status: item.status,
    });
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    updateInventoryItem(editItem);
    setIsEditOpen(false);
    setEditItem({
      id: "",
      name: "",
      category: "",
      stock: 0,
      unit_price: 0,
      supplier: "",
      status: "in stock",
    });
  };

  const handleDelete = (id: string) => {
    deleteInventoryItem(id);
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "in stock":
        return "bg-green-100 text-green-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Column definitions for AdvancedDataTable
  const inventoryColumns: ColumnDef<any>[] = [
    {
      id: "name",
      header: "Item",
      accessorKey: "name",
      sortable: true,
      filterable: true,
      cell: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        "Electronics",
        "Clothing",
        "Food & Beverage",
        "Office Supplies",
        "Other",
      ],
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
      sortable: true,
      cell: (item) => <span className="font-semibold">{item.stock}</span>,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: ["in stock", "low stock", "out of stock"],
      cell: (item) => (
        <Badge className={getStockStatusColor(item.status)}>
          {item.status}
        </Badge>
      ),
    },
    {
      id: "unit_price",
      header: "Unit Price",
      accessorKey: "unit_price",
      sortable: true,
      cell: (item) => (
        <span className="font-semibold">
          ${Number(item.unit_price).toFixed(2)}
        </span>
      ),
    },
    {
      id: "supplier",
      header: "Supplier",
      accessorKey: "supplier",
      sortable: true,
      filterable: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: (item) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" onClick={() => handleView(item)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600"
            onClick={() => handleDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <InventorySkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage your inventory items
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Item</DialogTitle>
                <DialogDescription>
                  Add a new item to the inventory
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Food & Beverage">
                        Food & Beverage
                      </SelectItem>
                      <SelectItem value="Office Supplies">
                        Office Supplies
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={String(newItem.stock)}
                    onChange={(e) =>
                      setNewItem({ ...newItem, stock: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="unit_price">Unit Price</Label>
                  <Input
                    id="unit_price"
                    type="number"
                    value={String(newItem.unit_price)}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        unit_price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) =>
                      setNewItem({ ...newItem, supplier: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newItem.status}
                    onValueChange={(
                      value: "in stock" | "low stock" | "out of stock"
                    ) => setNewItem({ ...newItem, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in stock">In Stock</SelectItem>
                      <SelectItem value="low stock">Low Stock</SelectItem>
                      <SelectItem value="out of stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Create Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {inventoryItems.length}
            </div>
            <p className="text-xs text-blue-600">
              In stock:{" "}
              {
                inventoryItems.filter((item) => item.status === "in stock")
                  .length
              }
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Total Stock
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {inventoryItems.reduce((acc, item) => acc + item.stock, 0)}
            </div>
            <p className="text-xs text-green-600">Combined stock level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Low Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {
                inventoryItems.filter((item) => item.status === "low stock")
                  .length
              }
            </div>
            <p className="text-xs text-yellow-600">Items needing attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              Out of Stock
            </CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {
                inventoryItems.filter((item) => item.status === "out of stock")
                  .length
              }
            </div>
            <p className="text-xs text-red-600">Items currently unavailable</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0">
         

        <AdvancedDataTable
          data={inventoryItems}
          columns={inventoryColumns}
          title="Inventory Items"
          description="Manage your stock levels and item details"
          searchPlaceholder="Search items by name, category, or supplier..."
          defaultPageSize={10}
        />
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={() => setIsViewOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
            <DialogDescription>
              View detailed information about the selected item
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedItem && (
              <>
                <div className="text-lg font-semibold">{selectedItem.name}</div>
                <div>
                  <span className="font-medium">Category:</span>{" "}
                  {selectedItem.category}
                </div>
                <div>
                  <span className="font-medium">Stock Level:</span>{" "}
                  {selectedItem.stock}
                </div>
                <div>
                  <span className="font-medium">Unit Price:</span> $
                  {Number(selectedItem.unit_price).toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Supplier:</span>{" "}
                  {selectedItem.supplier}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {selectedItem.status}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Edit the details of the selected item
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={editItem.category}
                onValueChange={(value) =>
                  setEditItem({ ...editItem, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Food & Beverage">
                    Food & Beverage
                  </SelectItem>
                  <SelectItem value="Office Supplies">
                    Office Supplies
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                type="number"
                value={String(editItem.stock)}
                onChange={(e) =>
                  setEditItem({ ...editItem, stock: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-unit_price">Unit Price</Label>
              <Input
                id="edit-unit_price"
                type="number"
                value={String(editItem.unit_price)}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    unit_price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-supplier">Supplier</Label>
              <Input
                id="edit-supplier"
                value={editItem.supplier}
                onChange={(e) =>
                  setEditItem({ ...editItem, supplier: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editItem.status}
                onValueChange={(
                  value: "in stock" | "low stock" | "out of stock"
                ) => setEditItem({ ...editItem, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in stock">In Stock</SelectItem>
                  <SelectItem value="low stock">Low Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
