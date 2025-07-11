import React, { useState, useMemo, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Filter
} from 'lucide-react';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date';
  filterOptions?: string[];
}

interface AdvancedDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  defaultPageSize?: number;
}

export function AdvancedDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  description,
  searchPlaceholder = "Search...",
  isLoading = false,
  onRowClick,
  actions,
  defaultPageSize = 10
}: AdvancedDataTableProps<T>) {
  // State management
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({ key: '', direction: null });
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply global filter
    if (globalFilter) {
      filtered = filtered.filter(item =>
        columns.some(col => {
          if (col.accessorKey) {
            const value = item[col.accessorKey];
            return value?.toString().toLowerCase().includes(globalFilter.toLowerCase());
          }
          return false;
        })
      );
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([columnId, filterValue]) => {
      if (filterValue && filterValue.trim() !== '' && filterValue !== 'all') {
        const column = columns.find(col => col.id === columnId);
        if (column?.accessorKey) {
          filtered = filtered.filter(item => {
            const value = item[column.accessorKey!];
            const stringValue = value?.toString() || '';
            
            // Handle different filter types
            if (column.filterType === 'select') {
              return stringValue.toLowerCase() === filterValue.toLowerCase();
            } else if (column.filterType === 'date') {
              // For date filtering, format both dates for comparison
              try {
                const itemDate = new Date(stringValue).toISOString().split('T')[0];
                const filterDate = new Date(filterValue).toISOString().split('T')[0];
                return itemDate === filterDate;
              } catch {
                // Fallback to string comparison if date parsing fails
                return stringValue.includes(filterValue);
              }
            } else {
              // Default text filtering
              return stringValue.toLowerCase().includes(filterValue.toLowerCase());
            }
          });
        }
      }
    });

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      const column = columns.find(col => col.id === sortConfig.key);
      if (column?.accessorKey) {
        filtered.sort((a, b) => {
          const aValue = a[column.accessorKey!];
          const bValue = b[column.accessorKey!];
          
          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            const result = aValue.localeCompare(bValue);
            return sortConfig.direction === 'asc' ? result : -result;
          }
          
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    return filtered;
  }, [data, globalFilter, columnFilters, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't handle keyboard events when user is typing in inputs
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            setCurrentPage(prev => Math.max(1, prev - 1));
            break;
          case 'ArrowRight':
            e.preventDefault();
            setCurrentPage(prev => Math.min(totalPages, prev + 1));
            break;
          case 'Home':
            e.preventDefault();
            setCurrentPage(1);
            break;
          case 'End':
            e.preventDefault();
            setCurrentPage(totalPages);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Handle page changes when data changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Visible columns
  const visibleColumns = columns.filter(col => columnVisibility[col.id]);

  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;

    setSortConfig(prev => {
      if (prev.key === columnId) {
        if (prev.direction === 'asc') return { key: columnId, direction: 'desc' };
        if (prev.direction === 'desc') return { key: '', direction: null };
      }
      return { key: columnId, direction: 'asc' };
    });
  };

  const getSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) return <ArrowUpDown className="h-4 w-4" />;
    if (sortConfig.direction === 'asc') return <ArrowUp className="h-4 w-4" />;
    if (sortConfig.direction === 'desc') return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const handleColumnFilterChange = (columnId: string, value: string) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      if (value === '' || value === 'all') {
        delete newFilters[columnId];
      } else {
        newFilters[columnId] = value;
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          {/* Column Visibility Toggle */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Toggle Columns</h4>
                {columns.map(column => (
                  <div key={column.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={column.id}
                      checked={columnVisibility[column.id]}
                      onCheckedChange={() => toggleColumnVisibility(column.id)}
                    />
                    <Label htmlFor={column.id} className="text-sm font-normal">
                      {column.header}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Global Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          {/* Advanced Filters */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {Object.values(columnFilters).some(v => v && v.trim() !== '' && v !== 'all') && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {Object.values(columnFilters).filter(v => v && v.trim() !== '' && v !== 'all').length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 max-h-96 overflow-y-auto bg-white border shadow-lg" 
              align="end" 
              side="bottom"
              sideOffset={5}
            >
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-gray-900">Advanced Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setColumnFilters({});
                      setCurrentPage(1);
                    }}
                    className="h-6 text-xs text-gray-600 hover:text-gray-900"
                  >
                    Clear All
                  </Button>
                </div>
                
                {(() => {
                  const filterableColumns = columns.filter(col => col.filterable);
                  
                  if (filterableColumns.length === 0) {
                    return (
                      <div className="p-4 text-center">
                        <p className="text-sm text-gray-500">No filterable columns available</p>
                      </div>
                    );
                  }
                  
                  return filterableColumns.map(column => (
                    <div key={column.id} className="space-y-2 p-3 border rounded bg-gray-50">
                      <Label className="text-sm font-medium text-gray-700">{column.header}</Label>
                      {column.filterType === 'select' && column.filterOptions ? (
                        <Select
                          value={columnFilters[column.id] || 'all'}
                          onValueChange={(value) => handleColumnFilterChange(column.id, value)}
                        >
                          <SelectTrigger className="h-8 bg-white">
                            <SelectValue placeholder={`Select ${column.header}`} />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="all">All</SelectItem>
                            {column.filterOptions.map(option => (
                              <SelectItem key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : column.filterType === 'date' ? (
                        <Input
                          type="date"
                          placeholder={`Filter by ${column.header}`}
                          value={columnFilters[column.id] || ''}
                          onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
                          className="h-8 bg-white"
                        />
                      ) : (
                        <Input
                          placeholder={`Filter by ${column.header}`}
                          value={columnFilters[column.id] || ''}
                          onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
                          className="h-8 bg-white"
                        />
                      )}
                    </div>
                  ));
                })()}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Showing {paginatedData.length} of {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Show:</Label>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.id}>
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleSort(column.id)}
                        >
                          {getSortIcon(column.id)}
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + (actions ? 1 : 0)} className="text-center py-8">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No data found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                    onClick={() => onRowClick?.(item)}
                  >
                    {visibleColumns.map((column) => (
                      <TableCell key={column.id}>
                        {column.cell 
                          ? column.cell(item)
                          : column.accessorKey 
                            ? item[column.accessorKey]?.toString() || '-'
                            : '-'
                        }
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {actions(item)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages} • Showing {paginatedData.length} of {filteredAndSortedData.length} results
            </div>
            
            {/* Simple Pagination Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-8 px-3"
              >
                First
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3"
              >
                Previous
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3"
              >
                Next
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 px-3"
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}