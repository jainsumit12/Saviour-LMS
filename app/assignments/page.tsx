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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Search,
  Filter,
  Play,
  Eye,
  Download,
  Upload,
  BookOpen,
  Target,
  Award,
  MoreVertical,
  Timer,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

function StudentAssignments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const assignments = [
    {
      id: "1",
      title: "React Hooks Implementation",
      type: "assignment",
      course: "Advanced React Development",
      courseId: "1",
      description:
        "Create a complex React application using various hooks including useState, useEffect, useContext, and custom hooks.",
      dueDate: "2024-01-25",
      submittedDate: null,
      maxScore: 100,
      score: null,
      status: "pending",
      difficulty: "Medium",
      estimatedTime: "4 hours",
      attempts: 0,
      maxAttempts: 3,
      instructions:
        "Build a task management app with the following features...",
      files: [],
      feedback: null,
    },
    {
      id: "2",
      title: "Data Analysis Quiz",
      type: "quiz",
      course: "Data Science Fundamentals",
      courseId: "2",
      description:
        "Test your knowledge of data analysis concepts, statistical methods, and Python libraries.",
      dueDate: "2024-01-28",
      submittedDate: null,
      maxScore: 50,
      score: null,
      status: "available",
      difficulty: "Hard",
      estimatedTime: "45 minutes",
      attempts: 0,
      maxAttempts: 2,
      questions: 25,
      timeLimit: 45,
      instructions: "Answer all questions within the time limit...",
      files: [],
      feedback: null,
    },
    {
      id: "3",
      title: "Component Architecture Design",
      type: "assignment",
      course: "Advanced React Development",
      courseId: "1",
      description:
        "Design and implement a scalable component architecture for a large React application.",
      dueDate: "2024-01-20",
      submittedDate: "2024-01-19",
      maxScore: 100,
      score: 92,
      status: "graded",
      difficulty: "Hard",
      estimatedTime: "6 hours",
      attempts: 1,
      maxAttempts: 2,
      instructions:
        "Create a component library with proper TypeScript definitions...",
      files: ["component-library.zip", "documentation.pdf"],
      feedback:
        "Excellent work on the component design. The TypeScript definitions are well-structured and the documentation is comprehensive. Consider adding more unit tests for better coverage.",
    },
    {
      id: "4",
      title: "Marketing Strategy Presentation",
      type: "assignment",
      course: "Digital Marketing Strategy",
      courseId: "3",
      description:
        "Create a comprehensive marketing strategy presentation for a fictional tech startup.",
      dueDate: "2024-01-15",
      submittedDate: "2024-01-14",
      maxScore: 100,
      score: 95,
      status: "graded",
      difficulty: "Medium",
      estimatedTime: "8 hours",
      attempts: 1,
      maxAttempts: 1,
      instructions:
        "Include market analysis, target audience, and promotional strategies...",
      files: ["marketing-strategy.pptx", "market-research.pdf"],
      feedback:
        "Outstanding presentation with thorough market analysis and creative promotional strategies. Your target audience segmentation was particularly well done.",
    },
    {
      id: "5",
      title: "Python Fundamentals Test",
      type: "quiz",
      course: "Data Science Fundamentals",
      courseId: "2",
      description:
        "Basic Python programming concepts and data manipulation using pandas.",
      dueDate: "2024-01-30",
      submittedDate: "2024-01-18",
      maxScore: 30,
      score: 28,
      status: "graded",
      difficulty: "Easy",
      estimatedTime: "30 minutes",
      attempts: 1,
      maxAttempts: 3,
      questions: 15,
      timeLimit: 30,
      instructions: "Complete all questions about Python basics...",
      files: [],
      feedback:
        "Good understanding of Python fundamentals. Review list comprehensions for better scores.",
    },
    {
      id: "6",
      title: "Final Project Submission",
      type: "project",
      course: "Data Science Fundamentals",
      courseId: "2",
      description:
        "Complete data science project involving data collection, analysis, and visualization.",
      dueDate: "2024-01-30",
      submittedDate: null,
      maxScore: 200,
      score: null,
      status: "in-progress",
      difficulty: "Hard",
      estimatedTime: "20 hours",
      attempts: 0,
      maxAttempts: 1,
      instructions:
        "Choose a dataset and perform complete analysis including...",
      files: [],
      feedback: null,
    },
  ];

  const courses = [
    { id: "1", name: "Advanced React Development" },
    { id: "2", name: "Data Science Fundamentals" },
    { id: "3", name: "Digital Marketing Strategy" },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || assignment.courseId === courseFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" &&
        ["pending", "available", "in-progress"].includes(assignment.status)) ||
      (activeTab === "submitted" &&
        ["submitted", "graded"].includes(assignment.status)) ||
      (activeTab === "overdue" && assignment.status === "overdue");

    return matchesSearch && matchesStatus && matchesCourse && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "submitted":
        return "bg-green-100 text-green-800";
      case "graded":
        return "bg-purple-100 text-purple-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return Clock;
      case "pending":
        return AlertTriangle;
      case "in-progress":
        return Play;
      case "submitted":
        return Upload;
      case "graded":
        return CheckCircle;
      case "overdue":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return Target;
      case "assignment":
        return FileText;
      case "project":
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTabCounts = () => {
    return {
      all: assignments.length,
      pending: assignments.filter((a) =>
        ["pending", "available", "in-progress"].includes(a.status)
      ).length,
      submitted: assignments.filter((a) =>
        ["submitted", "graded"].includes(a.status)
      ).length,
      overdue: assignments.filter((a) => a.status === "overdue").length,
    };
  };

  const tabCounts = getTabCounts();

  const handleStartAssignment = (assignment: any) => {
    console.log("Starting assignment:", assignment.id);
    // In a real app, this would navigate to the assignment/quiz interface
  };

  const handleViewSubmission = (assignment: any) => {
    console.log("Viewing submission:", assignment.id);
    // In a real app, this would show the submitted work and feedback
  };

  const handleDownloadFile = (fileName: string) => {
    console.log("Downloading file:", fileName);
    // In a real app, this would download the file
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Assignments & Quizzes</h2>
        <p className="text-muted-foreground">
          Track your assignments, quizzes, and project submissions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tabCounts.pending}
                </p>
              </div>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {tabCounts.submitted}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    assignments
                      .filter((a) => a.score)
                      .reduce(
                        (acc, a) => acc + (a.score! / a.maxScore) * 100,
                        0
                      ) / assignments.filter((a) => a.score).length
                  )}
                  %
                </p>
              </div>
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredAssignments.length} of {assignments.length}{" "}
              assignments
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="text-xs">
              {tabCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="text-xs">
              {tabCounts.pending}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="submitted" className="flex items-center gap-2">
            Submitted
            <Badge variant="secondary" className="text-xs">
              {tabCounts.submitted}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-2">
            Overdue
            <Badge variant="secondary" className="text-xs">
              {tabCounts.overdue}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredAssignments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No Assignments Found</h3>
                  <p className="text-muted-foreground">
                    No assignments match your current filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAssignments.map((assignment) => {
                const StatusIcon = getStatusIcon(assignment.status);
                const TypeIcon = getTypeIcon(assignment.type);
                const daysUntil = getDaysUntil(assignment.dueDate);

                return (
                  <Card
                    key={assignment.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <TypeIcon className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-semibold">
                              {assignment.title}
                            </h3>
                            <Badge
                              className={getStatusColor(assignment.status)}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {assignment.status.replace("-", " ")}
                            </Badge>
                            <Badge
                              className={getDifficultyColor(
                                assignment.difficulty
                              )}
                            >
                              {assignment.difficulty}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {assignment.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {assignment.course}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due {formatDate(assignment.dueDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {assignment.estimatedTime}
                            </span>
                            {assignment.type === "quiz" && (
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {assignment.questions} questions
                              </span>
                            )}
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
                              View Details
                            </DropdownMenuItem>
                            {assignment.files.length > 0 && (
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Files
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {assignment.score !== null ? (
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Score:{" "}
                              </span>
                              <span className="font-medium text-green-600">
                                {assignment.score}/{assignment.maxScore} (
                                {Math.round(
                                  (assignment.score / assignment.maxScore) * 100
                                )}
                                %)
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Max Score:{" "}
                              </span>
                              <span className="font-medium">
                                {assignment.maxScore} points
                              </span>
                            </div>
                          )}

                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Attempts:{" "}
                            </span>
                            <span className="font-medium">
                              {assignment.attempts}/{assignment.maxAttempts}
                            </span>
                          </div>

                          {daysUntil >= 0 && assignment.status !== "graded" && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Due in:{" "}
                              </span>
                              <span
                                className={`font-medium ${
                                  daysUntil <= 2
                                    ? "text-red-600"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {daysUntil === 0
                                  ? "Today"
                                  : `${daysUntil} days`}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {assignment.status === "available" && (
                            <Button
                              onClick={() => handleStartAssignment(assignment)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Start{" "}
                              {assignment.type === "quiz"
                                ? "Quiz"
                                : "Assignment"}
                            </Button>
                          )}

                          {assignment.status === "pending" && (
                            <Button
                              onClick={() => handleStartAssignment(assignment)}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          )}

                          {assignment.status === "in-progress" && (
                            <Button
                              onClick={() => handleStartAssignment(assignment)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Continue
                            </Button>
                          )}

                          {["submitted", "graded"].includes(
                            assignment.status
                          ) && (
                            <Button
                              variant="outline"
                              onClick={() => handleViewSubmission(assignment)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Submission
                            </Button>
                          )}
                        </div>
                      </div>

                      {assignment.feedback && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-medium text-sm mb-2">
                            Instructor Feedback:
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {assignment.feedback}
                          </p>
                        </div>
                      )}

                      {assignment.files.length > 0 && (
                        <div className="mt-4">
                          <h5 className="font-medium text-sm mb-2">
                            Submitted Files:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {assignment.files.map((file) => (
                              <Button
                                key={file}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadFile(file)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
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

export default StudentAssignments;
