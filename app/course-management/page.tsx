"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Separator } from "@/ui/separator";
import { Progress } from "@/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover";
import { Checkbox } from "@/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";

import {
  BookOpen,
  Plus,
  CheckCircle,
  Clock,
  Eye,
  Building2,
  Users,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon,
  ExternalLink,
  Edit,
  Trash2,
  X,
  Check,
  ChevronDown,
  Globe,
  Award,
  AlertCircle,
  XCircle,
  PlayCircle,
  GraduationCap,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  institute: {
    id: string;
    name: string;
    logo?: string;
  };
  instructor: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
  enrollments: number;
  rating: number;
  status: "active" | "inactive" | "pending" | "suspended";
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  completionRate?: number;
  totalRevenue?: number;
  language?: string;
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "Netherlands",
];

// Enhanced mock data with more comprehensive course information
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development Bootcamp",
    description:
      "Comprehensive course covering React, Node.js, MongoDB, and deployment strategies for modern web applications.",
    institute: {
      id: "inst1",
      name: "Tech Academy Institute",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Dr. Sarah Johnson",
    category: "Technology",
    duration: "16 weeks",
    price: 2999,
    currency: "USD",
    enrollments: 245,
    rating: 4.8,
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-20T10:15:00Z",
    startDate: "2024-02-01",
    endDate: "2024-05-15",
    maxStudents: 300,
    level: "intermediate",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
    completionRate: 87,
    totalRevenue: 734755,
    language: "English",
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    description:
      "Learn modern digital marketing strategies, SEO, social media marketing, and analytics to grow your business.",
    institute: {
      id: "inst2",
      name: "Business Skills Institute",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Mark Thompson",
    category: "Marketing",
    duration: "12 weeks",
    price: 1999,
    currency: "USD",
    enrollments: 189,
    rating: 4.6,
    status: "active",
    createdAt: "2024-01-10T09:45:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
    startDate: "2024-01-25",
    endDate: "2024-04-18",
    maxStudents: 200,
    level: "beginner",
    tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
    completionRate: 92,
    totalRevenue: 376811,
    language: "English",
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description:
      "Introduction to data analysis, statistics, machine learning, and Python programming for data science.",
    institute: {
      id: "inst3",
      name: "DataTech Academy",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Dr. Emily Chen",
    category: "Data Science",
    duration: "20 weeks",
    price: 3499,
    currency: "USD",
    enrollments: 156,
    rating: 4.9,
    status: "pending",
    createdAt: "2024-01-20T11:30:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
    startDate: "2024-03-01",
    endDate: "2024-07-20",
    maxStudents: 150,
    level: "advanced",
    tags: ["Python", "Machine Learning", "Statistics", "Pandas"],
    completionRate: 85,
    totalRevenue: 545844,
    language: "English",
  },
  {
    id: "4",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications using React Native, covering iOS and Android development.",
    institute: {
      id: "inst1",
      name: "Tech Academy Institute",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Alex Rodriguez",
    category: "Technology",
    duration: "14 weeks",
    price: 2799,
    currency: "USD",
    enrollments: 98,
    rating: 4.7,
    status: "inactive",
    createdAt: "2023-12-15T07:15:00Z",
    updatedAt: "2024-01-10T12:30:00Z",
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    maxStudents: 120,
    level: "intermediate",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    completionRate: 78,
    totalRevenue: 274302,
    language: "English",
  },
  {
    id: "5",
    title: "Graphic Design Essentials",
    description:
      "Master the fundamentals of visual design, typography, branding, and design tools like Photoshop and Illustrator.",
    institute: {
      id: "inst4",
      name: "Creative Arts Institute",
      logo: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Lisa Anderson",
    category: "Design",
    duration: "10 weeks",
    price: 1599,
    currency: "USD",
    enrollments: 203,
    rating: 4.5,
    status: "active",
    createdAt: "2024-01-05T09:30:00Z",
    updatedAt: "2024-01-15T14:15:00Z",
    startDate: "2024-02-10",
    endDate: "2024-04-20",
    maxStudents: 250,
    level: "beginner",
    tags: ["Photoshop", "Illustrator", "Branding", "Typography"],
    completionRate: 89,
    totalRevenue: 324597,
    language: "English",
  },
  {
    id: "6",
    title: "Advanced Machine Learning",
    description:
      "Deep dive into neural networks, deep learning, and AI applications with hands-on projects.",
    institute: {
      id: "inst3",
      name: "DataTech Academy",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Prof. Michael Zhang",
    category: "AI & Machine Learning",
    duration: "18 weeks",
    price: 4299,
    currency: "USD",
    enrollments: 89,
    rating: 4.9,
    status: "active",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-25T15:30:00Z",
    startDate: "2024-03-15",
    endDate: "2024-07-05",
    maxStudents: 100,
    level: "advanced",
    tags: ["Deep Learning", "TensorFlow", "PyTorch", "Neural Networks"],
    completionRate: 82,
    totalRevenue: 382611,
    language: "English",
  },
  {
    id: "7",
    title: "Cybersecurity Fundamentals",
    description:
      "Learn the basics of cybersecurity, network security, threat assessment, and security tools.",
    institute: {
      id: "inst5",
      name: "Security Training Center",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "James Wilson",
    category: "Cybersecurity",
    duration: "12 weeks",
    price: 2499,
    currency: "USD",
    enrollments: 134,
    rating: 4.6,
    status: "active",
    createdAt: "2024-01-18T08:45:00Z",
    updatedAt: "2024-01-28T11:20:00Z",
    startDate: "2024-02-20",
    endDate: "2024-05-10",
    maxStudents: 150,
    level: "intermediate",
    tags: [
      "Network Security",
      "Ethical Hacking",
      "Penetration Testing",
      "Security Tools",
    ],
    completionRate: 91,
    totalRevenue: 334866,
    language: "English",
  },
  {
    id: "8",
    title: "UX/UI Design Bootcamp",
    description:
      "Complete user experience and user interface design course with portfolio projects.",
    institute: {
      id: "inst4",
      name: "Creative Arts Institute",
      logo: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Sophie Martinez",
    category: "Design",
    duration: "14 weeks",
    price: 2299,
    currency: "USD",
    enrollments: 167,
    rating: 4.7,
    status: "active",
    createdAt: "2024-01-12T13:15:00Z",
    updatedAt: "2024-01-20T16:40:00Z",
    startDate: "2024-02-05",
    endDate: "2024-05-25",
    maxStudents: 180,
    level: "intermediate",
    tags: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    completionRate: 86,
    totalRevenue: 383933,
    language: "English",
  },
];

interface CourseManagementProps {
  onViewProfile?: (courseId: string) => void;
}

function CourseManagement({ onViewProfile }: CourseManagementProps = {}) {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [instituteFilter, setInstituteFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(viewMode === "table" ? 10 : 9);
  const [instituteDropdownOpen, setInstituteDropdownOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    duration: "",
    price: "",
    currency: "USD",
    maxStudents: "",
    level: "",
    startDate: "",
    endDate: "",
    language: "English",
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  // Reset pagination when view mode or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    viewMode,
    statusFilter,
    categoryFilter,
    levelFilter,
    instituteFilter,
    searchTerm,
  ]);

  // Get unique values for filters
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );
  const institutes = Array.from(
    new Set(courses.map((course) => course.institute.name))
  ).sort();
  const levels = ["beginner", "intermediate", "advanced"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newCourse: Course = {
        id: (courses.length + 1).toString(),
        title: formData.title,
        description: formData.description,
        institute: {
          id: "inst1",
          name: "Tech Academy Institute",
        },
        instructor: formData.instructor,
        category: formData.category,
        duration: formData.duration,
        price: parseInt(formData.price),
        currency: formData.currency,
        enrollments: 0,
        rating: 0,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        maxStudents: parseInt(formData.maxStudents),
        level: formData.level as "beginner" | "intermediate" | "advanced",
        tags: [],
        completionRate: 0,
        totalRevenue: 0,
        language: formData.language,
      };

      setCourses((prev) => [newCourse, ...prev]);
      setDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        instructor: "",
        category: "",
        duration: "",
        price: "",
        currency: "USD",
        maxStudents: "",
        level: "",
        startDate: "",
        endDate: "",
        language: "English",
      });
      toast.success("Course created successfully");
    } catch (error) {
      console.log("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    courseId: string,
    newStatus: Course["status"]
  ) => {
    try {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, status: newStatus } : course
        )
      );
      toast.success("Course status updated successfully");
    } catch (error) {
      console.log("Error updating course status:", error);
      toast.error("Failed to update course status");
    }
  };

  const handleInstituteToggle = (institute: string) => {
    setInstituteFilter((prev) => {
      if (prev.includes(institute)) {
        return prev.filter((i) => i !== institute);
      } else {
        return [...prev, institute];
      }
    });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setLevelFilter("all");
    setInstituteFilter([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant="secondary"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Beginner
          </Badge>
        );
      case "intermediate":
        return (
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            Intermediate
          </Badge>
        );
      case "advanced":
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            Advanced
          </Badge>
        );
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getCourseInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const matchesInstitute =
      instituteFilter.length === 0 ||
      instituteFilter.includes(course.institute.name);
    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesLevel &&
      matchesInstitute
    );
  });

  // Pagination logic
  const currentItemsPerPage = viewMode === "table" ? 10 : 9;
  const totalPages = Math.ceil(filteredCourses.length / currentItemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    0,
    currentPage * currentItemsPerPage
  );
  const hasMore = currentPage < totalPages;

  const handleViewMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const getStats = () => {
    return {
      total: courses.length,
      active: courses.filter((c) => c.status === "active").length,
      totalEnrollments: courses.reduce(
        (sum, course) => sum + course.enrollments,
        0
      ),
      avgRating:
        courses.length > 0
          ? (
              courses.reduce((sum, course) => sum + course.rating, 0) /
              courses.length
            ).toFixed(1)
          : "0",
      totalRevenue: courses.reduce(
        (sum, course) => sum + (course.totalRevenue || 0),
        0
      ),
    };
  };

  const stats = getStats();

  // Count active filters
  const activeFiltersCount = [
    searchTerm !== "",
    statusFilter !== "all",
    categoryFilter !== "all",
    levelFilter !== "all",
    instituteFilter.length > 0,
  ].filter(Boolean).length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  const CardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {paginatedCourses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {course.category}
                    </p>
                  </div>
                </div>
                {getStatusBadge(course.status)}
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{course.institute.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    {course.enrollments}/{course.maxStudents} enrolled
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Enrollment
                  </span>
                  <span className="text-xs">
                    {Math.round(
                      (course.enrollments / course.maxStudents) * 100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={(course.enrollments / course.maxStudents) * 100}
                  className="h-1.5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">${course.price}</span>
                </div>
                {renderStars(course.rating)}
              </div>

              <div className="flex items-center gap-1 pt-2">
                {getLevelBadge(course.level)}
                <Badge variant="outline" className="text-xs">
                  {course.language}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(course.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => {
                      setSelectedCourse(course);
                      setViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {onViewProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => onViewProfile(course.id)}
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCourses.map((course) => (
              <TableRow key={course.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate max-w-[200px]">
                        {course.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {course.duration} • {getLevelBadge(course.level)}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={course.institute.logo}
                        alt={course.institute.name}
                      />
                      <AvatarFallback className="text-xs">
                        {course.institute.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate max-w-[120px]">
                      {course.institute.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{course.instructor}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {course.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {course.enrollments}/{course.maxStudents}
                  </div>
                  <Progress
                    value={(course.enrollments / course.maxStudents) * 100}
                    className="w-16 h-1 mt-1"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">${course.price}</div>
                </TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setSelectedCourse(course);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onViewProfile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onViewProfile(course.id)}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Course Management
          </h2>
          <p className="text-muted-foreground">
            Manage all courses from partner institutes
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter course title"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter course description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        instructor: e.target.value,
                      }))
                    }
                    placeholder="Instructor name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    placeholder="e.g., 12 weeks"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="Course price"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxStudents: e.target.value,
                      }))
                    }
                    placeholder="Maximum students"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Courses
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Enrollments
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalEnrollments}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Rating
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.avgRating}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${(stats.totalRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses by title, instructor, or institute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem
                        key={level}
                        value={level}
                        className="capitalize"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Multi-select Institutes Filter */}
                <Popover
                  open={instituteDropdownOpen}
                  onOpenChange={setInstituteDropdownOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={instituteDropdownOpen}
                      className="w-full sm:w-[180px] justify-between"
                    >
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        {instituteFilter.length === 0
                          ? "Institutes"
                          : instituteFilter.length === 1
                          ? instituteFilter[0]
                          : `${instituteFilter.length} institutes`}
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search institutes..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No institute found.</CommandEmpty>
                        <CommandGroup>
                          {institutes.map((institute) => (
                            <CommandItem
                              key={institute}
                              onSelect={() => handleInstituteToggle(institute)}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={instituteFilter.includes(institute)}
                                onCheckedChange={() =>
                                  handleInstituteToggle(institute)
                                }
                              />
                              <span className="flex-1">{institute}</span>
                              {instituteFilter.includes(institute) && (
                                <Check className="h-4 w-4" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear ({activeFiltersCount})
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="hidden lg:block">
                  Showing {paginatedCourses.length} of {filteredCourses.length}{" "}
                  courses
                </Badge>

                {/* View Toggle */}
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "card" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("card")}
                    className="h-8 px-3"
                  >
                    <LayoutGrid className="h-4 w-4 mr-1" />
                    Cards
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="h-8 px-3"
                  >
                    <TableIcon className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Institute Filters Display */}
            {instituteFilter.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Institutes:
                </span>
                {instituteFilter.map((institute) => (
                  <Badge
                    key={institute}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {institute}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleInstituteToggle(institute)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Courses Display */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading courses...</p>
              </div>
            </CardContent>
          </Card>
        ) : paginatedCourses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {activeFiltersCount > 0 ? "No courses found" : "No courses yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {activeFiltersCount > 0
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding the first course to the platform"}
              </p>
              {activeFiltersCount > 0 ? (
                <Button variant="outline" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              ) : (
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Course
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === "card" ? <CardView /> : <TableView />}

            {/* View More Button */}
            {hasMore && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={handleViewMore}
                      className="w-full md:w-auto"
                    >
                      View More Courses
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Showing {paginatedCourses.length} of{" "}
                      {filteredCourses.length} courses
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* View Course Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Overview</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedCourse.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedCourse.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getLevelBadge(selectedCourse.level)}
                      {getStatusBadge(selectedCourse.status)}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Description
                    </Label>
                    <p className="mt-1 text-sm">{selectedCourse.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Institute
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={selectedCourse.institute.logo}
                          alt={selectedCourse.institute.name}
                        />
                        <AvatarFallback className="text-xs">
                          {selectedCourse.institute.name
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {selectedCourse.institute.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Instructor
                    </Label>
                    <p className="mt-1 text-sm">{selectedCourse.instructor}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Duration & Dates
                    </Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Duration: {selectedCourse.duration}</p>
                      <p>
                        Start:{" "}
                        {new Date(
                          selectedCourse.startDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        End:{" "}
                        {new Date(selectedCourse.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Pricing
                    </Label>
                    <p className="mt-1 text-lg font-semibold">
                      ${selectedCourse.price}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Enrollment
                    </Label>
                    <div className="text-sm mt-1">
                      <p>
                        {selectedCourse.enrollments} /{" "}
                        {selectedCourse.maxStudents} students
                      </p>
                      <Progress
                        value={
                          (selectedCourse.enrollments /
                            selectedCourse.maxStudents) *
                          100
                        }
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Rating
                    </Label>
                    <div className="mt-1">
                      {renderStars(selectedCourse.rating)}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Performance
                    </Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Completion Rate: {selectedCourse.completionRate}%</p>
                      <p>
                        Total Revenue: $
                        {selectedCourse.totalRevenue?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
                {onViewProfile && (
                  <Button
                    onClick={() => {
                      setViewDialogOpen(false);
                      onViewProfile(selectedCourse.id);
                    }}
                  >
                    View Full Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CourseManagement;
