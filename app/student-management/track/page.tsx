"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Progress } from '@/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { Separator } from '@/ui/separator'
import {
  Search,
  Filter,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  BookOpen,
  BarChart3,
  Activity,
  Target,
  CheckCircle,
  Star,
  PlayCircle,
  PauseCircle,
  Download,
  Eye,
  ChevronRight,
  GraduationCap,
  Trophy,
  AlertCircle,
  Timer,
  Brain,
  Zap,
  FileText,
  Video,
  MessageSquare,
  ThumbsUp
} from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  enrollmentDate: string
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalProgress: number
  averageGrade: number
  studyHours: number
  lastActivity: string
  status: 'active' | 'inactive' | 'completed' | 'at-risk'
  location: string
  courses: CourseProgress[]
  achievements: Achievement[]
  activityTimeline: ActivityItem[]
}

interface CourseProgress {
  id: string
  title: string
  institute: string
  instructor: string
  category: string
  enrollmentDate: string
  progress: number
  grade: number
  status: 'in-progress' | 'completed' | 'paused' | 'not-started'
  completedLessons: number
  totalLessons: number
  timeSpent: number
  lastAccessed: string
  assignments: {
    total: number
    completed: number
    pending: number
  }
  quizzes: {
    total: number
    completed: number
    averageScore: number
  }
}

interface Achievement {
  id: string
  title: string
  description: string
  type: 'course' | 'assignment' | 'quiz' | 'milestone' | 'streak'
  earnedDate: string
  icon: string
  points: number
}

interface ActivityItem {
  id: string
  type: 'course_start' | 'lesson_complete' | 'quiz_complete' | 'assignment_submit' | 'achievement' | 'grade_received'
  title: string
  description: string
  date: string
  course?: string
  grade?: number
  points?: number
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face',
    enrollmentDate: '2024-01-15',
    totalCourses: 4,
    completedCourses: 2,
    inProgressCourses: 2,
    totalProgress: 78,
    averageGrade: 92,
    studyHours: 145,
    lastActivity: '2024-01-25T10:30:00Z',
    status: 'active',
    location: 'New York, USA',
    courses: [
      {
        id: '1',
        title: 'Full Stack Web Development',
        institute: 'Tech Academy',
        instructor: 'Dr. Sarah Johnson',
        category: 'Technology',
        enrollmentDate: '2024-01-15',
        progress: 85,
        grade: 94,
        status: 'in-progress',
        completedLessons: 34,
        totalLessons: 40,
        timeSpent: 89,
        lastAccessed: '2024-01-25T10:30:00Z',
        assignments: { total: 8, completed: 7, pending: 1 },
        quizzes: { total: 12, completed: 10, averageScore: 91 }
      },
      {
        id: '2',
        title: 'Digital Marketing Mastery',
        institute: 'Business Skills Institute',
        instructor: 'Mark Thompson',
        category: 'Marketing',
        enrollmentDate: '2023-11-20',
        progress: 100,
        grade: 89,
        status: 'completed',
        completedLessons: 25,
        totalLessons: 25,
        timeSpent: 56,
        lastAccessed: '2024-01-10T15:45:00Z',
        assignments: { total: 6, completed: 6, pending: 0 },
        quizzes: { total: 8, completed: 8, averageScore: 87 }
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'Fast Learner',
        description: 'Completed 10 lessons in a single week',
        type: 'milestone',
        earnedDate: '2024-01-20',
        icon: '⚡',
        points: 100
      },
      {
        id: '2',
        title: 'Perfect Score',
        description: 'Achieved 100% on 5 consecutive quizzes',
        type: 'quiz',
        earnedDate: '2024-01-18',
        icon: '🎯',
        points: 150
      }
    ],
    activityTimeline: [
      {
        id: '1',
        type: 'lesson_complete',
        title: 'Completed Lesson: React Hooks',
        description: 'Full Stack Web Development',
        date: '2024-01-25T10:30:00Z',
        course: 'Full Stack Web Development'
      },
      {
        id: '2',
        type: 'quiz_complete',
        title: 'Quiz Completed',
        description: 'JavaScript Fundamentals Quiz',
        date: '2024-01-24T14:20:00Z',
        course: 'Full Stack Web Development',
        grade: 96
      }
    ]
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    enrollmentDate: '2024-01-10',
    totalCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    totalProgress: 65,
    averageGrade: 87,
    studyHours: 98,
    lastActivity: '2024-01-24T16:15:00Z',
    status: 'active',
    location: 'San Francisco, USA',
    courses: [
      {
        id: '3',
        title: 'Data Science Fundamentals',
        institute: 'DataTech Academy',
        instructor: 'Dr. Emily Chen',
        category: 'Data Science',
        enrollmentDate: '2024-01-10',
        progress: 72,
        grade: 91,
        status: 'in-progress',
        completedLessons: 18,
        totalLessons: 25,
        timeSpent: 67,
        lastAccessed: '2024-01-24T16:15:00Z',
        assignments: { total: 5, completed: 3, pending: 2 },
        quizzes: { total: 7, completed: 5, averageScore: 89 }
      }
    ],
    achievements: [
      {
        id: '3',
        title: 'Data Explorer',
        description: 'Completed first data analysis project',
        type: 'assignment',
        earnedDate: '2024-01-22',
        icon: '📊',
        points: 75
      }
    ],
    activityTimeline: [
      {
        id: '3',
        type: 'assignment_submit',
        title: 'Assignment Submitted',
        description: 'Python Data Analysis Project',
        date: '2024-01-24T16:15:00Z',
        course: 'Data Science Fundamentals'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    enrollmentDate: '2023-12-05',
    totalCourses: 2,
    completedCourses: 2,
    inProgressCourses: 0,
    totalProgress: 100,
    averageGrade: 95,
    studyHours: 120,
    lastActivity: '2024-01-20T09:45:00Z',
    status: 'completed',
    location: 'Chicago, USA',
    courses: [
      {
        id: '4',
        title: 'UX/UI Design Masterclass',
        institute: 'Creative Design Academy',
        instructor: 'Alex Rodriguez',
        category: 'Design',
        enrollmentDate: '2023-12-05',
        progress: 100,
        grade: 96,
        status: 'completed',
        completedLessons: 30,
        totalLessons: 30,
        timeSpent: 75,
        lastAccessed: '2024-01-20T09:45:00Z',
        assignments: { total: 10, completed: 10, pending: 0 },
        quizzes: { total: 6, completed: 6, averageScore: 94 }
      }
    ],
    achievements: [
      {
        id: '4',
        title: 'Design Master',
        description: 'Completed UX/UI Design Masterclass with excellence',
        type: 'course',
        earnedDate: '2024-01-20',
        icon: '🎨',
        points: 200
      },
      {
        id: '5',
        title: 'Top Performer',
        description: 'Ranked in top 5% of all students',
        type: 'milestone',
        earnedDate: '2024-01-20',
        icon: '👑',
        points: 300
      }
    ],
    activityTimeline: [
      {
        id: '4',
        type: 'course_start',
        title: 'Course Completed',
        description: 'UX/UI Design Masterclass finished with 96% grade',
        date: '2024-01-20T09:45:00Z',
        course: 'UX/UI Design Masterclass',
        grade: 96
      }
    ]
  }
]

 function PartnerStudentTracking() {
  const [students] = useState<Student[]>(mockStudents)
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [progressFilter, setProgressFilter] = useState('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    
    const matchesProgress = 
      progressFilter === 'all' ||
      (progressFilter === 'high' && student.totalProgress >= 80) ||
      (progressFilter === 'medium' && student.totalProgress >= 50 && student.totalProgress < 80) ||
      (progressFilter === 'low' && student.totalProgress < 50)
    
    return matchesSearch && matchesStatus && matchesProgress
  })

  const selectedStudent = selectedStudentId ? students.find(s => s.id === selectedStudentId) : null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Inactive</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Completed</Badge>
      case 'at-risk':
        return <Badge className="bg-red-100 text-red-700 border-red-300">At Risk</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCourseStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">In Progress</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Completed</Badge>
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Paused</Badge>
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Not Started</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_start':
        return <PlayCircle className="h-4 w-4 text-green-600" />
      case 'lesson_complete':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'quiz_complete':
        return <Brain className="h-4 w-4 text-purple-600" />
      case 'assignment_submit':
        return <FileText className="h-4 w-4 text-orange-600" />
      case 'achievement':
        return <Trophy className="h-4 w-4 text-yellow-600" />
      case 'grade_received':
        return <Star className="h-4 w-4 text-pink-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedStudentId(null)}>
            ← Back to Students
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={selectedStudent.avatar} alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`} />
              <AvatarFallback>
                {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{selectedStudent.firstName} {selectedStudent.lastName}</h1>
              <p className="text-muted-foreground">{selectedStudent.email}</p>
            </div>
            {getStatusBadge(selectedStudent.status)}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Progress</p>
                  <p className="text-2xl font-semibold">{selectedStudent.totalProgress}%</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Progress value={selectedStudent.totalProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                  <p className="text-2xl font-semibold">{selectedStudent.averageGrade}%</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>Above average</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Hours</p>
                  <p className="text-2xl font-semibold">{selectedStudent.studyHours}h</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Last active: {formatDateTime(selectedStudent.lastActivity)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="text-2xl font-semibold">{selectedStudent.completedCourses}/{selectedStudent.totalCourses}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {selectedStudent.inProgressCourses} in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="space-y-4">
              {selectedStudent.courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.institute} • {course.instructor}</p>
                          <div className="flex items-center gap-2">
                            {getCourseStatusBadge(course.status)}
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold">{course.grade}%</p>
                          <p className="text-sm text-muted-foreground">Grade</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-lg font-semibold">{course.completedLessons}/{course.totalLessons}</p>
                          <p className="text-xs text-muted-foreground">Lessons</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold">{course.assignments.completed}/{course.assignments.total}</p>
                          <p className="text-xs text-muted-foreground">Assignments</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold">{course.quizzes.completed}/{course.quizzes.total}</p>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold">{course.timeSpent}h</p>
                          <p className="text-xs text-muted-foreground">Time Spent</p>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t">
                        <span>Enrolled: {formatDate(course.enrollmentDate)}</span>
                        <span>Last accessed: {formatDateTime(course.lastAccessed)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {selectedStudent.achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">{achievement.type}</Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-3 w-3" />
                            <span>{achievement.points} pts</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Earned on {formatDate(achievement.earnedDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Track student engagement and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedStudent.activityTimeline.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        {activity.grade && (
                          <Badge variant="outline" className="text-xs">
                            Grade: {activity.grade}%
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(activity.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quiz Average</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assignment Completion</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm text-green-900">Strong Performer</p>
                      <p className="text-xs text-green-700">Consistently high grades</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm text-blue-900">Regular Learner</p>
                      <p className="text-xs text-blue-700">Active daily engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-sm text-purple-900">Quick Learner</p>
                      <p className="text-xs text-purple-700">Fast lesson completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Track Students</h1>
          <p className="text-muted-foreground">
            Monitor student progress and engagement across all courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold">{students.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-semibold">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-semibold">{Math.round(students.reduce((acc, s) => acc + s.totalProgress, 0) / students.length)}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Courses</p>
                <p className="text-2xl font-semibold">{students.reduce((acc, s) => acc + s.completedCourses, 0)}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={progressFilter} onValueChange={setProgressFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Progress</SelectItem>
                <SelectItem value="high">High (80%+)</SelectItem>
                <SelectItem value="medium">Medium (50-79%)</SelectItem>
                <SelectItem value="low">Low (&lt;50%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedStudentId(student.id)}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                      <AvatarFallback>
                        {student.firstName[0]}{student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.firstName} {student.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <p className="text-xs text-muted-foreground">{student.location}</p>
                    </div>
                  </div>
                  {getStatusBadge(student.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{student.totalProgress}%</span>
                  </div>
                  <Progress value={student.totalProgress} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold">{student.averageGrade}%</p>
                    <p className="text-xs text-muted-foreground">Avg Grade</p>
                  </div>
                  <div>
                    <p className="font-semibold">{student.completedCourses}/{student.totalCourses}</p>
                    <p className="text-xs text-muted-foreground">Courses</p>
                  </div>
                  <div>
                    <p className="font-semibold">{student.studyHours}h</p>
                    <p className="text-xs text-muted-foreground">Study Time</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last active: {formatDate(student.lastActivity)}
                  </p>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PartnerStudentTracking