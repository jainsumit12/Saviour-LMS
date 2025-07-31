"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Switch } from "@/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Separator } from "@/ui/separator";
import { Progress } from "@/ui/progress";
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Award,
  Activity,
  Grid3X3,
  List,
  MoreHorizontal,
  UserCheck,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt: string;
  status: "active" | "inactive" | "graduated";
  totalCourses: number;
  completedCourses: number;
  currentCourses: number;
  overallProgress: number;
  lastActive: string;
  avatar?: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-03-15",
    address: "123 Main St, Apt 4B",
    city: "New York",
    country: "United States",
    emergencyContact: "Bob Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    createdAt: "2024-01-15T10:30:00Z",
    status: "active",
    totalCourses: 3,
    completedCourses: 1,
    currentCourses: 2,
    overallProgress: 67,
    lastActive: "2024-01-25T14:30:00Z",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1992-07-22",
    address: "456 Oak Avenue",
    city: "San Francisco",
    country: "United States",
    emergencyContact: "Lisa Chen",
    emergencyPhone: "+1 (555) 234-5679",
    createdAt: "2024-01-10T09:15:00Z",
    status: "active",
    totalCourses: 2,
    completedCourses: 2,
    currentCourses: 0,
    overallProgress: 100,
    lastActive: "2024-01-24T16:45:00Z",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@email.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: "1998-11-08",
    address: "789 Pine Street",
    city: "Chicago",
    country: "United States",
    emergencyContact: "David Williams",
    emergencyPhone: "+1 (555) 345-6790",
    createdAt: "2024-01-20T11:45:00Z",
    status: "active",
    totalCourses: 4,
    completedCourses: 0,
    currentCourses: 4,
    overallProgress: 25,
    lastActive: "2024-01-26T09:20:00Z",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    dateOfBirth: "1990-05-12",
    address: "321 Elm Drive",
    city: "Miami",
    country: "United States",
    emergencyContact: "Maria Rodriguez",
    emergencyPhone: "+1 (555) 456-7891",
    createdAt: "2024-01-08T15:20:00Z",
    status: "graduated",
    totalCourses: 5,
    completedCourses: 5,
    currentCourses: 0,
    overallProgress: 100,
    lastActive: "2024-01-22T13:10:00Z",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    firstName: "Emma",
    lastName: "Taylor",
    email: "emma.taylor@email.com",
    phone: "+1 (555) 567-8901",
    dateOfBirth: "1996-09-30",
    address: "654 Maple Lane",
    city: "Seattle",
    country: "United States",
    emergencyContact: "John Taylor",
    emergencyPhone: "+1 (555) 567-8902",
    createdAt: "2024-01-12T08:30:00Z",
    status: "inactive",
    totalCourses: 1,
    completedCourses: 0,
    currentCourses: 1,
    overallProgress: 10,
    lastActive: "2024-01-18T12:00:00Z",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
  },
];

interface PartnerViewStudentsProps {
  onViewProfile?: (studentId: string) => void;
}

function PartnerViewStudents({ onViewProfile }: PartnerViewStudentsProps) {
  const router = useRouter();
  const [students] = useState<Student[]>(mockStudents);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            Inactive
          </Badge>
        );
      case "graduated":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            Graduated
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    const matchesCountry =
      countryFilter === "all" || student.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });

  const countries = Array.from(
    new Set(students.map((student) => student.country))
  );

  const handleViewProfile = (studentId: string) => {
    if (onViewProfile) {
      onViewProfile(studentId);
    }
  };

  const renderTableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={student.avatar}
                        alt={`${student.firstName} ${student.lastName}`}
                      />
                      <AvatarFallback>
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(student.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {student.city}, {student.country}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Overall</span>
                      <span>{student.overallProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(
                          student.overallProgress
                        )}`}
                        style={{ width: `${student.overallProgress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>{student.totalCourses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span>{student.completedCourses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span>{student.currentCourses}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {new Date(student.lastActive).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(
                        "/student-management/view-profile?" + student.id
                      )
                    }
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredStudents.map((student) => (
        <Card key={student.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={student.avatar}
                      alt={`${student.firstName} ${student.lastName}`}
                    />
                    <AvatarFallback>
                      {student.firstName[0]}
                      {student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </div>
                {getStatusBadge(student.status)}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {student.city}, {student.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Born {new Date(student.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">
                    {student.overallProgress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(
                      student.overallProgress
                    )}`}
                    style={{ width: `${student.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-medium">
                    {student.totalCourses}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-lg font-medium text-green-600">
                    {student.completedCourses}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-medium text-blue-600">
                    {student.currentCourses}
                  </div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
              </div>

              {/* Last Active */}
              <div className="text-sm text-muted-foreground">
                Last active: {new Date(student.lastActive).toLocaleDateString()}
              </div>

              {/* Actions */}
              <Button
                onClick={() => handleViewProfile(student.id)}
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">View Students</h1>
          <p className="text-muted-foreground">
            Manage and monitor your enrolled students
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "card" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("card")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-semibold text-green-600">
                  {students.filter((s) => s.status === "active").length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Graduated</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {students.filter((s) => s.status === "graduated").length}
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-semibold">
                  {Math.round(
                    students.reduce((acc, s) => acc + s.overallProgress, 0) /
                      students.length
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {viewMode === "table" ? renderTableView() : renderCardView()}
      </div>
    </div>
  );
}

export default PartnerViewStudents;
