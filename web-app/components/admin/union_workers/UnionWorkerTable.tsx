"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample data for union workers
const unionWorkers = [
  {
    id: 1,
    mssv: "2001215836",
    name: "Kong Hòa Hưng",
    class: "12DHTH01",
    points: 100,
    activities: 0,
    status: "active"
  },
  {
    id: 2,
    mssv: "2001215852",
    name: "Đặng Thị Linh",
    class: "12DHTH01",
    points: 100,
    activities: 0,
    status: "active"
  },
  {
    id: 3,
    mssv: "2001215975",
    name: "Đặng Bảo Tùng",
    class: "12DHTH01",
    points: 100,
    activities: 0,
    status: "inactive"
   },
   {
     id: 4,
     mssv: "2001215856",
     name: "Võ Hồng Đông",
     class: "12DHTH01",
     points: 90,
     activities: 2,
     status: "active"
   },
   {
     id: 5,
     mssv: "2001215828",
     name: "Phạm Hồ Đăng Huy",
     class: "12DHTH01",
     points: 95,
     activities: 1,
     status: "active"
   },
   {
     id: 6,
     mssv: "2001215842",
     name: "Hoàng Bảo Hạnh",
     class: "12DHTH02",
     points: 85,
     activities: 3,
     status: "inactive"
   },
   {
     id: 7,
     mssv: "2001215800",
     name: "Huỳnh Thị An",
     class: "12DHTH02",
     points: 80,
     activities: 2,
     status: "active"
    }
  ];

export function UnionWorkerTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({
    mssv: "",
    name: "",
    class: "",
  });

  // Pagination settings
  const itemsPerPage = 5;
  
  // Filter workers based on search query and status filter
  const filteredWorkers = unionWorkers.filter((worker) => {
    const matchesSearch = 
      worker.mssv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? worker.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorkers = filteredWorkers.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle adding new worker
  const handleAddWorker = () => {
    // In a real application, this would make an API call
    toast.success("Đã thêm công tác viên mới");
    setIsAddDialogOpen(false);
    setNewWorker({ mssv: "", name: "", class: "" });
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1} 
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis or pages before current page
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else {
        items.push(
          <PaginationItem key={2}>
            <PaginationLink 
              isActive={currentPage === 2} 
              onClick={() => handlePageChange(2)}
            >
              2
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show current page and adjacent pages
      const startAdjacentPage = Math.max(2, currentPage - 1);
      const endAdjacentPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startAdjacentPage; i <= endAdjacentPage; i++) {
        if (i === 2 || i === totalPages - 1) continue;
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show ellipsis or pages after current page
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else {
        items.push(
          <PaginationItem key={totalPages - 1}>
            <PaginationLink 
              isActive={currentPage === totalPages - 1} 
              onClick={() => handlePageChange(totalPages - 1)}
            >
              {totalPages - 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm công tác viên..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select 
              value={statusFilter} 
              onValueChange={(value) => {
                setStatusFilter(value || undefined);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Tất cả trạng thái" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm công tác viên
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm công tác viên mới</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="mssv">MSSV</Label>
                  <Input 
                    id="mssv" 
                    value={newWorker.mssv} 
                    onChange={(e) => setNewWorker({...newWorker, mssv: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Họ tên</Label>
                  <Input 
                    id="name" 
                    value={newWorker.name} 
                    onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Lớp</Label>
                  <Input 
                    id="class" 
                    value={newWorker.class} 
                    onChange={(e) => setNewWorker({...newWorker, class: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddWorker}>Thêm mới</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>MSSV</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead>Điểm rèn luyện</TableHead>
              <TableHead>Số hoạt động</TableHead>
              <TableHead>Tình trạng</TableHead>
              <TableHead className="text-right">Tác vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWorkers.length > 0 ? (
              paginatedWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>{worker.mssv}</TableCell>
                  <TableCell className="font-medium">{worker.name}</TableCell>
                  <TableCell>{worker.class}</TableCell>
                  <TableCell>{worker.points}</TableCell>
                  <TableCell>{worker.activities}</TableCell>
                  <TableCell>
                    {worker.status === "active" ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Hoạt động</Badge>
                    ) : (
                      <Badge className="bg-red-500 hover:bg-red-600">Ngưng hoạt động</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Xem thông tin chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Xem hoạt động đã phân công</DropdownMenuItem>
                        {worker.status === "inactive" ? (
                          <DropdownMenuItem onClick={() => toast.success("Đã mở khóa hoạt động")}>Mở khóa hoạt động</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => toast.success("Đã khóa hoạt động")}>Khóa hoạt động</DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => toast.success("Đã reset mật khẩu")}>Reset mật khẩu</DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => toast.success("Đã xóa công tác viên")}
                        >
                          Xóa khỏi công tác viên
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy công tác viên nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">
          {filteredWorkers.length > 0 ? (
            `Hiển thị ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredWorkers.length)} trong tổng số ${filteredWorkers.length} công tác viên`
          ) : (
            "Không có công tác viên nào"
          )}
        </p>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}