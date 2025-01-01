import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for stats
const stats = {
  totalLeased: 145,
  totalSold: 89,
  listedToday: 12,
  leasedToday: 5,
};

// Dummy data for properties
const dummyProperties = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  address: `${i + 100} Main Street, City`,
  price: Math.floor(Math.random() * 1000000) + 500000,
  status: ["For Sale", "Leased", "Sold"][Math.floor(Math.random() * 3)],
  type: ["House", "Apartment", "Townhouse"][Math.floor(Math.random() * 3)],
  bedrooms: Math.floor(Math.random() * 5) + 1,
}));

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();
  const itemsPerPage = 10;

  const handleSync = () => {
    toast({
      title: "Sync Started",
      description: "Syncing properties from the API...",
    });
    // Add actual sync logic here
  };

  // Filter properties based on search and status
  const filteredProperties = dummyProperties.filter(
    (property) =>
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || property.status === statusFilter)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Leased</h3>
          <p className="text-2xl font-bold">{stats.totalLeased}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Sold</h3>
          <p className="text-2xl font-bold">{stats.totalSold}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Listed Today</h3>
          <p className="text-2xl font-bold">{stats.listedToday}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Leased Today</h3>
          <p className="text-2xl font-bold">{stats.leasedToday}</p>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="For Sale">For Sale</SelectItem>
            <SelectItem value="Leased">Leased</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSync} className="md:ml-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Properties
        </Button>
      </div>

      {/* Properties Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Bedrooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.id}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>${property.price.toLocaleString()}</TableCell>
                <TableCell>{property.status}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;