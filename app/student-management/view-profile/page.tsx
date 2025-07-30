"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Textarea } from '@/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Progress } from '@/ui/progress'
import { Separator } from '@/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import {
  ArrowLeft,
  User,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Download,
  Eye,
  Activity,
  Users,
  GraduationCap,
  Plus,
  UserCheck,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  country: string
  emergencyContact: string
  emergencyPhone: string
  createdAt: string
  status: 'active' | 'inactive' | 'graduated'
  avatar?: string
}

interface Course {
  id: string
  title: string
  institute: string
  instructor: string
  duration: string
  price: number
  purchaseDate: string
  status: 'completed' | 'in-progress' | 'not-started'
  progress: number
  startDate: string
  endDate: string
  certificateId?: string
}

interface AttendanceRecord {
  id: string
  courseId: string
  courseName: string
  date: string
  status: 'present' | 'absent' | 'late'
  duration: string
  sessionTitle: string
  notes?: string
}

interface Certificate {
  id: string
  courseId: string
  courseName: string
  institute: string
  issuedDate: string
  expiryDate?: string
  grade: string
  status: 'issued' | 'pending' | 'expired'
  downloadUrl?: string
}

const mockStudent: Student = {
  id: '1',
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.johnson@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1995-03-15',
  address: '123 Main St, Apt 4B',
  city: 'New York',
  country: 'United States',
  emergencyContact: 'Bob Johnson',
  emergencyPhone: '+1 (555) 123-4568',
  createdAt: '2024-01-15T10:30:00Z',
  status: 'active',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face'
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development Bootcamp',
    institute: 'Tech Academy Institute',
    instructor: 'Dr. Sarah Johnson',
    duration: '16 weeks',
    price: 2999,
    purchaseDate: '2024-01-15T10:30:00Z',
    status: 'in-progress',
    progress: 75,
    startDate: '2024-01-20T09:00:00Z',
    endDate: '2024-05-15T17:00:00Z',
  },
  {
    id: '2',
    title: 'Digital Marketing Mastery',
    institute: 'Business Skills Institute',
    instructor: 'Mark Thompson',
    duration: '12 weeks',
    price: 1999,
    purchaseDate: '2024-01-10T14:20:00Z',
    status: 'completed',
    progress: 100,
    startDate: '2024-01-15T09:00:00Z',
    endDate: '2024-04-10T17:00:00Z',
    certificateId: 'CERT-001'
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    institute: 'DataTech Academy',
    instructor: 'Dr. Emily Chen',
    duration: '20 weeks',
    price: 3499,
    purchaseDate: '2024-01-25T11:45:00Z',
    status: 'not-started',
    progress: 0,
    startDate: '2024-02-01T09:00:00Z',
    endDate: '2024-06-20T17:00:00Z',
  }
]

const initialAttendance: AttendanceRecord[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Full Stack Web Development Bootcamp',
    date: '2024-01-26T09:00:00Z',
    status: 'present',
    duration: '2 hours',
    sessionTitle: 'Introduction to React Hooks'
  },
  {
    id: '2',
    courseId: '1',
    courseName: 'Full Stack Web Development Bootcamp',
    date: '2024-01-25T09:00:00Z',
    status: 'present',
    duration: '2 hours',
    sessionTitle: 'Node.js Express Framework'
  },
  {
    id: '3',
    courseId: '2',
    courseName: 'Digital Marketing Mastery',
    date: '2024-01-24T14:00:00Z',
    status: 'late',
    duration: '1.5 hours',
    sessionTitle: 'SEO Optimization Strategies'
  },
  {
    id: '4',
    courseId: '1',
    courseName: 'Full Stack Web Development Bootcamp',
    date: '2024-01-23T09:00:00Z',
    status: 'absent',
    duration: '2 hours',
    sessionTitle: 'Database Design Principles'
  }
]

const mockCertificates: Certificate[] = [
  {
    id: 'CERT-001',
    courseId: '2',
    courseName: 'Digital Marketing Mastery',
    institute: 'Business Skills Institute',
    issuedDate: '2024-04-12T10:00:00Z',
    grade: 'A',
    status: 'issued',
    downloadUrl: '#'
  }
]

interface PartnerStudentProfileProps {
  studentId: string
  onBack: () => void
}
function PartnerStudentProfile({ studentId, onBack }: PartnerStudentProfileProps) {
  const [student] = useState<Student>(mockStudent)
  const [courses] = useState<Course[]>(mockCourses)
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance)
  const [certificates] = useState<Certificate[]>(mockCertificates)
  const [activeTab, setActiveTab] = useState('profile')
  const [showMarkAttendance, setShowMarkAttendance] = useState(false)
  const [markingAttendance, setMarkingAttendance] = useState(false)

  // Attendance form state
  const [attendanceForm, setAttendanceForm] = useState({
    courseId: '',
    date: new Date().toISOString().split('T')[0],
    sessionTitle: '',
    duration: '',
    status: '',
    notes: ''
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactive</Badge>
      case 'graduated':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Graduated</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCourseStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Not Started</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Present</Badge>
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Absent</Badge>
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Late</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCertificateStatusBadge = (status: string) => {
    switch (status) {
      case 'issued':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Issued</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleMarkAttendance = async () => {
    if (!attendanceForm.courseId || !attendanceForm.status || !attendanceForm.sessionTitle) {
      toast.error('Please fill in all required fields')
      return
    }

    setMarkingAttendance(true)

    // Simulate API call
    setTimeout(() => {
      const selectedCourse = courses.find(c => c.id === attendanceForm.courseId)
      
      const newAttendanceRecord: AttendanceRecord = {
        id: (attendance.length + 1).toString(),
        courseId: attendanceForm.courseId,
        courseName: selectedCourse?.title || '',
        date: new Date(attendanceForm.date).toISOString(),
        status: attendanceForm.status as 'present' | 'absent' | 'late',
        duration: attendanceForm.duration || '2 hours',
        sessionTitle: attendanceForm.sessionTitle,
        notes: attendanceForm.notes
      }

      setAttendance(prev => [newAttendanceRecord, ...prev])
      
      // Reset form
      setAttendanceForm({
        courseId: '',
        date: new Date().toISOString().split('T')[0],
        sessionTitle: '',
        duration: '',
        status: '',
        notes: ''
      })
      
      setShowMarkAttendance(false)
      setMarkingAttendance(false)
      
      toast.success('Attendance marked successfully!')
    }, 1000)
  }

  const overallProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
  )

  // Get active courses for attendance marking
  const activeCourses = courses.filter(course => course.status === 'in-progress')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{student.firstName} {student.lastName}</h1>
          <p className="text-muted-foreground">Student Profile & Progress</p>
        </div>
      </div>

      {/* Student Overview Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
              <AvatarFallback className="text-xl">
                {student.firstName[0]}{student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{student.firstName} {student.lastName}</h2>
                  <p className="text-muted-foreground">{student.email}</p>
                </div>
                {getStatusBadge(student.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold">{courses.length}</div>
                  <div className="text-sm text-muted-foreground">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-green-600">
                    {courses.filter(c => c.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-blue-600">
                    {courses.filter(c => c.status === 'in-progress').length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">{overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="courses">Courses Purchased</TabsTrigger>
          <TabsTrigger value="tracking">Course Tracking</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-sm">{student.firstName} {student.lastName}</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-sm">{student.email}</p>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <p className="text-sm">{student.phone}</p>
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <p className="text-sm">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Registration Date</Label>
                    <p className="text-sm">{new Date(student.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address & Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Address</Label>
                    <p className="text-sm">{student.address}</p>
                  </div>
                  <div>
                    <Label>City, Country</Label>
                    <p className="text-sm">{student.city}, {student.country}</p>
                  </div>
                  <Separator />
                  <div>
                    <Label>Emergency Contact</Label>
                    <p className="text-sm">{student.emergencyContact}</p>
                  </div>
                  <div>
                    <Label>Emergency Phone</Label>
                    <p className="text-sm">{student.emergencyPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Purchased Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Purchased Courses ({courses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{course.title}</h3>
                          {getCourseStatusBadge(course.status)}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Institute: {course.institute}</p>
                          <p>Instructor: {course.instructor}</p>
                          <p>Duration: {course.duration}</p>
                          <p>Purchased: {new Date(course.purchaseDate).toLocaleDateString()}</p>
                          <p>Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
                          <p>End Date: {new Date(course.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-medium">${course.price.toLocaleString()}</p>
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Tracking Tab */}
        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Course Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{course.title}</h3>
                      {getCourseStatusBadge(course.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label>Start Date</Label>
                        <p>{new Date(course.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <p>{new Date(course.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <p>{course.duration}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <p className="capitalize">{course.status.replace('-', ' ')}</p>
                      </div>
                    </div>
                    
                    {course.status === 'in-progress' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Continue Learning
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    )}
                    
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          {/* Mark Attendance Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Mark Attendance
                </div>
                <Button 
                  onClick={() => setShowMarkAttendance(!showMarkAttendance)}
                  variant={showMarkAttendance ? "secondary" : "default"}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {showMarkAttendance ? 'Cancel' : 'Mark Attendance'}
                </Button>
              </CardTitle>
              {showMarkAttendance && (
                <CardDescription>
                  Mark attendance for {student.firstName} in their enrolled courses
                </CardDescription>
              )}
            </CardHeader>
            {showMarkAttendance && (
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="course">Course *</Label>
                      <Select 
                        value={attendanceForm.courseId} 
                        onValueChange={(value) => setAttendanceForm(prev => ({ ...prev, courseId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                          {activeCourses.length === 0 && (
                            <SelectItem value="" disabled>
                              No active courses available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={attendanceForm.date}
                        onChange={(e) => setAttendanceForm(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="sessionTitle">Session Title *</Label>
                      <Input
                        id="sessionTitle"
                        placeholder="e.g., Introduction to React Hooks"
                        value={attendanceForm.sessionTitle}
                        onChange={(e) => setAttendanceForm(prev => ({ ...prev, sessionTitle: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 2 hours"
                        value={attendanceForm.duration}
                        onChange={(e) => setAttendanceForm(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Attendance Status *</Label>
                    <Select 
                      value={attendanceForm.status} 
                      onValueChange={(value) => setAttendanceForm(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendance status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes about the attendance..."
                      value={attendanceForm.notes}
                      onChange={(e) => setAttendanceForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleMarkAttendance} disabled={markingAttendance}>
                      {markingAttendance ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Marking Attendance...
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Mark Attendance
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setShowMarkAttendance(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Attendance Record */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Record ({attendance.length} sessions)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{record.courseName}</TableCell>
                      <TableCell>{record.sessionTitle}</TableCell>
                      <TableCell>{record.duration}</TableCell>
                      <TableCell>
                        {getAttendanceStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        {record.notes ? (
                          <span className="text-sm text-muted-foreground">{record.notes}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {attendance.filter(a => a.status === 'present').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Late</p>
                    <p className="text-2xl font-semibold text-yellow-600">
                      {attendance.filter(a => a.status === 'late').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="text-2xl font-semibold text-red-600">
                      {attendance.filter(a => a.status === 'absent').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certificates ({certificates.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {certificates.length > 0 ? (
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{certificate.courseName}</h3>
                            {getCertificateStatusBadge(certificate.status)}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Institute: {certificate.institute}</p>
                            <p>Certificate ID: {certificate.id}</p>
                            <p>Issued: {new Date(certificate.issuedDate).toLocaleDateString()}</p>
                            <p>Grade: {certificate.grade}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                  <p className="text-muted-foreground">
                    Certificates will appear here once the student completes courses
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PartnerStudentProfile