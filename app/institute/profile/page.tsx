"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui//button'
import { Badge } from '@/components/ui//badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui//avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui//tabs'
import { Separator } from '@/components/ui//separator'
import { Progress } from '@/components/ui//progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui//table'
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  BookOpen, 
  Calendar,
  Star,
  Award,
  Clock,
  User,
  GraduationCap,
  ChevronLeft,
  Edit,
  MoreHorizontal,
  ExternalLink,
  ChevronRight,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus
} from 'lucide-react'

interface Institute {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  website?: string
  contactPerson: string
  institutionType: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  approvedBy?: string
  approvedAt?: string
  description?: string
  founded?: string
  accreditation?: string[]
  totalStudents?: number
  totalCourses?: number
  totalEducators?: number
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  price: number
  currency: string
  enrolledStudents: number
  maxStudents: number
  rating: number
  category: string
  instructor: string
  status: 'active' | 'draft' | 'archived'
  startDate: string
  endDate: string
  createdAt: string
}

interface Educator {
  id: string
  name: string
  email: string
  phone: string
  designation: string
  department: string
  experience: number
  qualification: string
  expertise: string[]
  rating: number
  totalCourses: number
  totalStudents: number
  joinedDate: string
  status: 'active' | 'inactive'
  profileImage?: string
}

// Mock data for institute details
const   mockInstitute: Institute = {
  id: '1',
  name: 'Massachusetts Institute of Technology',
  email: 'admissions@mit.edu',
  phone: '+1 (617) 253-1000',
  address: '77 Massachusetts Avenue',
  city: 'Cambridge',
  state: 'Massachusetts',
  country: 'United States',
  website: 'https://mit.edu',
  contactPerson: 'Dr. Sarah Johnson',
  institutionType: 'university',
  status: 'approved',
  createdAt: '2024-01-15T08:30:00Z',
  approvedBy: 'Admin',
  approvedAt: '2024-01-16T10:15:00Z',
  description: 'MIT is a world-renowned research university committed to advancing knowledge and preparing students to tackle the world\'s greatest challenges. Known for its cutting-edge research in science, technology, engineering, and mathematics.',
  founded: '1861',
  accreditation: ['NEASC', 'ABET', 'AACSB'],
  totalStudents: 11934,
  totalCourses: 156,
  totalEducators: 485
}

// Mock courses data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'A comprehensive introduction to computer science fundamentals including programming, algorithms, and data structures.',
    duration: '16 weeks',
    level: 'Beginner',
    price: 2500,
    currency: 'USD',
    enrolledStudents: 145,
    maxStudents: 200,
    rating: 4.8,
    category: 'Computer Science',
    instructor: 'Dr. John Smith',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning',
    description: 'Deep dive into machine learning algorithms, neural networks, and artificial intelligence applications.',
    duration: '12 weeks',
    level: 'Advanced',
    price: 3500,
    currency: 'USD',
    enrolledStudents: 89,
    maxStudents: 120,
    rating: 4.9,
    category: 'AI & Machine Learning',
    instructor: 'Dr. Emily Chen',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-05-20',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Master fundamental data structures and algorithms essential for software development and problem-solving.',
    duration: '14 weeks',
    level: 'Intermediate',
    price: 2800,
    currency: 'USD',
    enrolledStudents: 167,
    maxStudents: 180,
    rating: 4.7,
    category: 'Computer Science',
    instructor: 'Prof. Michael Rodriguez',
    status: 'active',
    startDate: '2024-02-15',
    endDate: '2024-06-01',
    createdAt: '2024-01-25T11:15:00Z'
  },
  {
    id: '4',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the basics of digital marketing including SEO, social media, and content marketing strategies.',
    duration: '8 weeks',
    level: 'Beginner',
    price: 1200,
    currency: 'USD',
    enrolledStudents: 234,
    maxStudents: 250,
    rating: 4.6,
    category: 'Marketing',
    instructor: 'Dr. Lisa Anderson',
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2024-05-05',
    createdAt: '2024-02-01T14:20:00Z'
  },
  {
    id: '5',
    title: 'Cybersecurity Essentials',
    description: 'Understand the fundamentals of cybersecurity, threat assessment, and protection strategies.',
    duration: '10 weeks',
    level: 'Intermediate',
    price: 2200,
    currency: 'USD',
    enrolledStudents: 78,
    maxStudents: 100,
    rating: 4.8,
    category: 'Cybersecurity',
    instructor: 'Dr. James Wilson',
    status: 'draft',
    startDate: '2024-04-01',
    endDate: '2024-06-10',
    createdAt: '2024-02-10T16:45:00Z'
  }
]

// Mock educators data
const mockEducators: Educator[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@mit.edu',
    phone: '+1 (617) 253-1234',
    designation: 'Professor',
    department: 'Computer Science',
    experience: 15,
    qualification: 'Ph.D. in Computer Science',
    expertise: ['Algorithms', 'Data Structures', 'Software Engineering'],
    rating: 4.8,
    totalCourses: 8,
    totalStudents: 1245,
    joinedDate: '2009-09-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@mit.edu',
    phone: '+1 (617) 253-1235',
    designation: 'Associate Professor',
    department: 'Artificial Intelligence',
    experience: 12,
    qualification: 'Ph.D. in Machine Learning',
    expertise: ['Machine Learning', 'Neural Networks', 'Deep Learning'],
    rating: 4.9,
    totalCourses: 6,
    totalStudents: 856,
    joinedDate: '2012-01-15',
    status: 'active'
  },
  {
    id: '3',
    name: 'Prof. Michael Rodriguez',
    email: 'michael.rodriguez@mit.edu',
    phone: '+1 (617) 253-1236',
    designation: 'Senior Lecturer',
    department: 'Computer Science',
    experience: 18,
    qualification: 'Ph.D. in Computer Science',
    expertise: ['Algorithms', 'Computational Theory', 'Systems Design'],
    rating: 4.7,
    totalCourses: 12,
    totalStudents: 2134,
    joinedDate: '2006-08-20',
    status: 'active'
  },
  {
    id: '4',
    name: 'Dr. Lisa Anderson',
    email: 'lisa.anderson@mit.edu',
    phone: '+1 (617) 253-1237',
    designation: 'Assistant Professor',
    department: 'Digital Marketing',
    experience: 8,
    qualification: 'Ph.D. in Marketing',
    expertise: ['Digital Marketing', 'Social Media', 'Brand Management'],
    rating: 4.6,
    totalCourses: 5,
    totalStudents: 789,
    joinedDate: '2016-03-10',
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. James Wilson',
    email: 'james.wilson@mit.edu',
    phone: '+1 (617) 253-1238',
    designation: 'Professor',
    department: 'Cybersecurity',
    experience: 20,
    qualification: 'Ph.D. in Information Security',
    expertise: ['Network Security', 'Cryptography', 'Threat Analysis'],
    rating: 4.8,
    totalCourses: 9,
    totalStudents: 1456,
    joinedDate: '2004-06-15',
    status: 'active'
  }
]

interface InstituteProfileProps {
  instituteId: string
  onBack: () => void
}

 function InstituteProfile({ instituteId, onBack }: InstituteProfileProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const institute = mockInstitute
  const courses = mockCourses
  const educators = mockEducators

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCourseStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'archived':
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInstituteInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Institutes
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Institute Profile</h1>
            <p className="text-muted-foreground">Detailed information about {institute.name}</p>
          </div>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={institute.name} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {getInstituteInitials(institute.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{institute.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {institute.institutionType.replace('-', ' ')}
                    </Badge>
                    {getStatusBadge(institute.status)}
                  </div>
                </div>
                {institute.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={institute.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {institute.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{institute.totalStudents?.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{institute.totalCourses}</div>
                  <div className="text-sm text-muted-foreground">Active Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{institute.totalEducators}</div>
                  <div className="text-sm text-muted-foreground">Educators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{institute.founded}</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses ({courses.length})</TabsTrigger>
          <TabsTrigger value="educators">Educators ({educators.length})</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{institute.contactPerson}</p>
                    <p className="text-sm text-muted-foreground">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{institute.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{institute.phone}</p>
                    <p className="text-sm text-muted-foreground">Phone</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{institute.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {institute.city}, {institute.state}, {institute.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accreditation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Accreditation & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {institute.accreditation?.map((acc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Registration Details</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Registered: {new Date(institute.createdAt).toLocaleDateString()}</p>
                    {institute.approvedAt && (
                      <p>Approved: {new Date(institute.approvedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Course Catalog</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold line-clamp-2">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.category} • {course.level}
                      </p>
                    </div>
                    {getCourseStatusBadge(course.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span>{course.enrolledStudents}/{course.maxStudents}</span>
                    </div>
                    <Progress 
                      value={(course.enrolledStudents / course.maxStudents) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">${course.price}</span>
                    </div>
                    {renderStars(course.rating)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>{course.instructor}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Educators Tab */}
        <TabsContent value="educators" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Faculty & Educators</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Educator
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {educators.map((educator) => (
              <Card key={educator.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={educator.profileImage} alt={educator.name} />
                      <AvatarFallback>
                        {educator.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{educator.name}</h4>
                      <p className="text-sm text-muted-foreground">{educator.designation}</p>
                    </div>
                    <Badge variant={educator.status === 'active' ? 'default' : 'secondary'}>
                      {educator.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{educator.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{educator.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{educator.experience} years experience</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Expertise</p>
                    <div className="flex flex-wrap gap-1">
                      {educator.expertise.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {educator.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{educator.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {renderStars(educator.rating)}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t text-center">
                    <div>
                      <div className="text-lg font-semibold text-primary">{educator.totalCourses}</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-primary">{educator.totalStudents}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default InstituteProfile