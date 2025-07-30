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
import { Progress } from "@/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  BookOpen,
  PlayCircle,
  Clock,
  User,
  Calendar,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Download,
  Star,
  Users,
  Award,
  Building2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const courses = [
    {
      id: "1",
      title: "Advanced React Development",
      description:
        "Master modern React patterns, hooks, and state management for building scalable applications.",
      institute: "Tech University",
      instructor: "Dr. Michael Chen",
      instructorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      category: "Programming",
      level: "Advanced",
      duration: "8 weeks",
      totalLessons: 24,
      completedLessons: 18,
      progress: 75,
      rating: 4.8,
      enrolledDate: "2024-01-01",
      nextLesson: "React Hooks Deep Dive",
      status: "in-progress",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      lastAccessed: "2024-01-22",
      certificate: false,
      assignments: 3,
      completedAssignments: 2,
    },
    {
      id: "2",
      title: "Data Science Fundamentals",
      description:
        "Learn the basics of data analysis, machine learning, and statistical modeling.",
      institute: "Analytics Institute",
      instructor: "Prof. Sarah Williams",
      instructorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      category: "Data Science",
      level: "Beginner",
      duration: "10 weeks",
      totalLessons: 30,
      completedLessons: 13,
      progress: 43,
      rating: 4.6,
      enrolledDate: "2024-01-08",
      nextLesson: "Machine Learning Basics",
      status: "in-progress",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      lastAccessed: "2024-01-21",
      certificate: false,
      assignments: 5,
      completedAssignments: 2,
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      description:
        "Comprehensive guide to modern digital marketing techniques and strategies.",
      institute: "Marketing Academy",
      instructor: "John Davis",
      instructorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      category: "Marketing",
      level: "Intermediate",
      duration: "6 weeks",
      totalLessons: 18,
      completedLessons: 18,
      progress: 100,
      rating: 4.9,
      enrolledDate: "2023-12-01",
      nextLesson: "Course Completed",
      status: "completed",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      lastAccessed: "2024-01-15",
      certificate: true,
      assignments: 4,
      completedAssignments: 4,
    },
    {
      id: "4",
      title: "UI/UX Design Principles",
      description:
        "Learn fundamental design principles and user experience best practices.",
      institute: "Design Institute",
      instructor: "Emily Rodriguez",
      instructorAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      category: "Design",
      level: "Beginner",
      duration: "8 weeks",
      totalLessons: 22,
      completedLessons: 0,
      progress: 0,
      rating: 4.7,
      enrolledDate: "2024-01-20",
      nextLesson: "Introduction to Design Thinking",
      status: "not-started",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      lastAccessed: null,
      certificate: false,
      assignments: 6,
      completedAssignments: 0,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institute.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && course.status === "in-progress") ||
      (activeTab === "completed" && course.status === "completed") ||
      (activeTab === "not-started" && course.status === "not-started");

    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "not-started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in-progress":
        return PlayCircle;
      case "not-started":
        return Clock;
      default:
        return Clock;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTabCounts = () => {
    return {
      all: courses.length,
      "in-progress": courses.filter((c) => c.status === "in-progress").length,
      completed: courses.filter((c) => c.status === "completed").length,
      "not-started": courses.filter((c) => c.status === "not-started").length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">My Courses</h2>
        <p className="text-muted-foreground">
          Track your learning progress and continue your educational journey
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Courses
            <Badge variant="secondary" className="text-xs">
              {tabCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            In Progress
            <Badge variant="secondary" className="text-xs">
              {tabCounts["in-progress"]}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">
              {tabCounts.completed}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="not-started" className="flex items-center gap-2">
            Not Started
            <Badge variant="secondary" className="text-xs">
              {tabCounts["not-started"]}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6">
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No Courses Found</h3>
                  <p className="text-muted-foreground mb-4">
                    No courses match your current filters.
                  </p>
                  <Button>Browse Course Catalog</Button>
                </CardContent>
              </Card>
            ) : (
              filteredCourses.map((course) => {
                const StatusIcon = getStatusIcon(course.status);

                return (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-48 h-48 md:h-auto">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {course.title}
                              </h3>
                              {course.certificate && (
                                <Award className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {course.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {course.institute}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {course.instructor}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <Badge className={getStatusColor(course.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {course.status.replace("-", " ")}
                              </Badge>
                              <Badge className={getLevelColor(course.level)}>
                                {course.level}
                              </Badge>
                              <Badge variant="outline">{course.category}</Badge>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>{course.rating}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Course Details
                              </DropdownMenuItem>
                              {course.certificate && (
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Certificate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {course.status !== "not-started" && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>
                                {course.progress}% • {course.completedLessons}/
                                {course.totalLessons} lessons
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {course.status === "completed" ? (
                              <span>
                                Completed on {formatDate(course.lastAccessed)}
                              </span>
                            ) : course.status === "in-progress" ? (
                              <span>Next: {course.nextLesson}</span>
                            ) : (
                              <span>
                                Enrolled on {formatDate(course.enrolledDate)}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {course.status === "completed" ? (
                              <>
                                <Button variant="outline" size="sm">
                                  Review Course
                                </Button>
                                {course.certificate && (
                                  <Button size="sm">
                                    <Award className="h-4 w-4 mr-2" />
                                    View Certificate
                                  </Button>
                                )}
                              </>
                            ) : course.status === "in-progress" ? (
                              <Button size="sm">
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Continue Learning
                              </Button>
                            ) : (
                              <Button size="sm">
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Start Course
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Assignment Progress */}
                        {course.assignments > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Assignments
                              </span>
                              <span className="flex items-center gap-2">
                                <span>
                                  {course.completedAssignments}/
                                  {course.assignments} completed
                                </span>
                                {course.completedAssignments ===
                                  course.assignments && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentCourses;
