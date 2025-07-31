"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Separator } from '@/ui/separator'
import { Progress } from '@/ui/progress'
import {
  Search,
  Filter,
  Download,
  Eye,
  BookOpen,
  Users,
  Clock,
  Calendar,
  Star,
  Edit,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  Archive,
  Copy,
  Award,
  TrendingUp
} from 'lucide-react'

interface Course {
  id: string
  title: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: number
  currency: string
  status: 'active' | 'draft' | 'archived'
  enrolledStudents: number
  maxStudents: number
  rating: number
  totalRatings: number
  instructor: {
    name: string
    avatar?: string
  }
  startDate: string
  endDate: string
  description: string
  completionRate: number
  createdAt: string
  lastUpdated: string
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '16 weeks',
    price: 1299,
    currency: 'USD',
    status: 'active',
    enrolledStudents: 85,
    maxStudents: 100,
    rating: 4.8,
    totalRatings: 67,
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face'
    },
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    description: 'Comprehensive course covering modern web development technologies including React, Node.js, and databases.',
    completionRate: 78,
    createdAt: '2023-12-01',
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    category: 'Data Science',
    level: 'Beginner',
    duration: '12 weeks',
    price: 999,
    currency: 'USD',
    status: 'active',
    enrolledStudents: 62,
    maxStudents: 80,
    rating: 4.6,
    totalRatings: 45,
    instructor: {
      name: 'Prof. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    startDate: '2024-02-01',
    endDate: '2024-04-26',
    description: 'Introduction to data science concepts, Python programming, and statistical analysis.',
    completionRate: 85,
    createdAt: '2023-11-15',
    lastUpdated: '2024-01-18'
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '14 weeks',
    price: 1199,
    currency: 'USD',
    status: 'active',
    enrolledStudents: 48,
    maxStudents: 60,
    rating: 4.7,
    totalRatings: 32,
    instructor: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    startDate: '2024-01-22',
    endDate: '2024-05-03',
    description: 'Build cross-platform mobile applications using React Native and modern development practices.',
    completionRate: 72,
    createdAt: '2023-12-10',
    lastUpdated: '2024-01-22'
  },
  {
    id: '4',
    title: 'AI & Machine Learning',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    duration: '20 weeks',
    price: 1599,
    currency: 'USD',
    status: 'draft',
    enrolledStudents: 0,
    maxStudents: 40,
    rating: 0,
    totalRatings: 0,
    instructor: {
      name: 'Dr. Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    startDate: '2024-03-01',
    endDate: '2024-07-19',
    description: 'Advanced course covering machine learning algorithms, neural networks, and AI applications.',
    completionRate: 0,
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-25'
  },
  {
    id: '5',
    title: 'Cybersecurity Essentials',
    category: 'Cybersecurity',
    level: 'Beginner',
    duration: '10 weeks',
    price: 899,
    currency: 'USD',
    status: 'archived',
    enrolledStudents: 35,
    maxStudents: 50,
    rating: 4.5,
    totalRatings: 28,
    instructor: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    startDate: '2023-10-01',
    endDate: '2023-12-10',
    description: 'Introduction to cybersecurity principles, threat analysis, and security best practices.',
    completionRate: 92,
    createdAt: '2023-09-01',
    lastUpdated: '2023-12-15'
  }
]

function InstituteCourseManagement() {
  const [courses] = useState<Course[]>(mockCourses)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesLevel
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Draft</Badge>
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Beginner</Badge>
      case 'Intermediate':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-300">Intermediate</Badge>
      case 'Advanced':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Advanced</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const categories = Array.from(new Set(courses.map(course => course.category)))
  const levels = Array.from(new Set(courses.map(course => course.level)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Course Management</h1>
          <p className="text-muted-foreground">
            Manage your institute's course offerings and curriculum
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Courses
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-semibold">{courses.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-semibold">{courses.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold">{courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-semibold">
                  {(courses.filter(c => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) / 
                    courses.filter(c => c.rating > 0).length).toFixed(1)}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Display */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>
              Showing {filteredCourses.length} of {courses.length} courses
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Category & Level</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">
                              {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(course.price, course.currency)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{course.category}</p>
                        {getLevelBadge(course.level)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                          <AvatarFallback className="text-xs">
                            {course.instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{course.instructor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {course.enrolledStudents}/{course.maxStudents}
                        </p>
                        <Progress 
                          value={(course.enrolledStudents / course.maxStudents) * 100} 
                          className="w-20 h-2 mt-1"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{course.duration}</p>
                        <p className="text-muted-foreground">
                          {formatDate(course.startDate)} - {formatDate(course.endDate)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(course.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(course)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
                      <div className="flex items-center gap-2">
                        {getLevelBadge(course.level)}
                        {getStatusBadge(course.status)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback className="text-xs">
                        {course.instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{course.instructor.name}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span>{course.enrolledStudents}/{course.maxStudents}</span>
                    </div>
                    <Progress value={(course.enrolledStudents / course.maxStudents) * 100} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{formatCurrency(course.price, course.currency)}</span>
                  </div>

                  {course.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{course.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({course.totalRatings} reviews)</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Course Details Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={(open:any) => !open && setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCourse?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Overview */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Course Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedCourse.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      {getLevelBadge(selectedCourse.level)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedCourse.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span>{formatCurrency(selectedCourse.price, selectedCourse.currency)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Enrollment Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enrolled:</span>
                      <span>{selectedCourse.enrolledStudents}/{selectedCourse.maxStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate:</span>
                      <span>{selectedCourse.completionRate}%</span>
                    </div>
                    {selectedCourse.rating > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{selectedCourse.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reviews:</span>
                          <span>{selectedCourse.totalRatings}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Instructor */}
              <div>
                <h4 className="font-medium mb-3">Instructor</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} />
                    <AvatarFallback>
                      {selectedCourse.instructor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedCourse.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
              </div>

              <Separator />

              {/* Timeline */}
              <div>
                <h4 className="font-medium mb-3">Timeline</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{formatDate(selectedCourse.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">End Date:</span>
                    <span>{formatDate(selectedCourse.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Course
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InstituteCourseManagement;