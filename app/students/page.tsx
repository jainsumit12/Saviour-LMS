"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Checkbox } from '../../components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/command'
import { 
  Users, 
  Search, 
  Filter,
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  GraduationCap,
  ChevronDown,
  LayoutGrid,
  Table as TableIcon,
  BookOpen,
  Building2,
  X,
  UserCheck,
  Clock,
  CheckCircle,
  Award,
  Handshake
} from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  studentId: string
  dateOfBirth: string
  enrollmentDate: string
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  institute: {
    id: string
    name: string
    type: string
  }
  partner?: {
    id: string
    name: string
    type: string
  }
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  courses: {
    id: string
    name: string
    category: string
    status: 'enrolled' | 'completed' | 'in_progress'
    enrollmentDate: string
    completionDate?: string
  }[]
  certificates: {
    id: string
    name: string
    issueDate: string
    type: 'completion' | 'achievement' | 'participation'
  }[]
  gpa?: number
  totalCredits: number
  profilePicture?: string
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    studentId: 'MIT2024001',
    dateOfBirth: '2002-03-15',
    enrollmentDate: '2022-09-01',
    status: 'active',
    institute: {
      id: '1',
      name: 'Massachusetts Institute of Technology',
      type: 'University'
    },
    partner: {
      id: '1',
      name: 'TechCorp Solutions',
      type: 'Corporate'
    },
    address: {
      street: '123 Student Ave',
      city: 'Cambridge',
      state: 'Massachusetts',
      country: 'United States',
      zipCode: '02139'
    },
    courses: [
      {
        id: '1',
        name: 'Computer Science Fundamentals',
        category: 'Computer Science & IT',
        status: 'completed',
        enrollmentDate: '2022-09-01',
        completionDate: '2023-01-15'
      },
      {
        id: '2',
        name: 'Advanced Algorithms',
        category: 'Computer Science & IT',
        status: 'in_progress',
        enrollmentDate: '2023-09-01'
      }
    ],
    certificates: [
      {
        id: '1',
        name: 'Computer Science Fundamentals Certificate',
        issueDate: '2023-01-20',
        type: 'completion'
      }
    ],
    gpa: 3.8,
    totalCredits: 45
  },
  {
    id: '2',
    firstName: 'Raj',
    lastName: 'Patel',
    email: 'raj.patel@email.com',
    phone: '+91 98765 43210',
    studentId: 'IIT2023045',
    dateOfBirth: '2001-11-20',
    enrollmentDate: '2021-08-15',
    status: 'active',
    institute: {
      id: '3',
      name: 'Indian Institute of Technology Delhi',
      type: 'University'
    },
    partner: {
      id: '2',
      name: 'Engineering Excellence Ltd',
      type: 'Industry'
    },
    address: {
      street: '45 Tech Park Road',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      zipCode: '110016'
    },
    courses: [
      {
        id: '3',
        name: 'Mechanical Engineering Design',
        category: 'Engineering & Technology',
        status: 'in_progress',
        enrollmentDate: '2023-08-15'
      },
      {
        id: '4',
        name: 'Thermodynamics',
        category: 'Engineering & Technology',
        status: 'completed',
        enrollmentDate: '2022-08-15',
        completionDate: '2022-12-20'
      }
    ],
    certificates: [
      {
        id: '2',
        name: 'Thermodynamics Excellence',
        issueDate: '2022-12-25',
        type: 'achievement'
      }
    ],
    gpa: 3.9,
    totalCredits: 60
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@email.com',
    phone: '+44 20 7946 0958',
    studentId: 'OX2022089',
    dateOfBirth: '2003-07-08',
    enrollmentDate: '2022-10-01',
    status: 'active',
    institute: {
      id: '4',
      name: 'University of Oxford',
      type: 'University'
    },
    partner: {
      id: '3',
      name: 'Global Business Partners',
      type: 'Consulting'
    },
    address: {
      street: '78 Oxford Street',
      city: 'Oxford',
      state: 'Oxfordshire',
      country: 'United Kingdom',
      zipCode: 'OX1 1HZ'
    },
    courses: [
      {
        id: '5',
        name: 'International Business Strategy',
        category: 'Business & Management',
        status: 'in_progress',
        enrollmentDate: '2023-10-01'
      },
      {
        id: '6',
        name: 'Marketing Fundamentals',
        category: 'Business & Management',
        status: 'completed',
        enrollmentDate: '2022-10-01',
        completionDate: '2023-02-15'
      }
    ],
    certificates: [
      {
        id: '3',
        name: 'Marketing Excellence Certificate',
        issueDate: '2023-02-20',
        type: 'completion'
      }
    ],
    gpa: 3.7,
    totalCredits: 36
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (650) 555-0123',
    studentId: 'STAN2023067',
    dateOfBirth: '2002-12-03',
    enrollmentDate: '2023-09-01',
    status: 'active',
    institute: {
      id: '2',
      name: 'Stanford University',
      type: 'University'
    },
    partner: {
      id: '4',
      name: 'Silicon Valley Innovation Hub',
      type: 'Technology'
    },
    address: {
      street: '321 Campus Drive',
      city: 'Stanford',
      state: 'California',
      country: 'United States',
      zipCode: '94305'
    },
    courses: [
      {
        id: '7',
        name: 'Data Science Fundamentals',
        category: 'Computer Science & IT',
        status: 'in_progress',
        enrollmentDate: '2023-09-01'
      },
      {
        id: '8',
        name: 'Machine Learning Basics',
        category: 'Computer Science & IT',
        status: 'enrolled',
        enrollmentDate: '2024-01-15'
      }
    ],
    certificates: [],
    gpa: 3.6,
    totalCredits: 18
  },
  {
    id: '5',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 22 9876 5432',
    studentId: 'MBA2021034',
    dateOfBirth: '1999-05-22',
    enrollmentDate: '2021-07-01',
    status: 'graduated',
    institute: {
      id: '15',
      name: 'Mumbai Business Academy',
      type: 'College'
    },
    partner: {
      id: '5',
      name: 'Financial Services Alliance',
      type: 'Finance'
    },
    address: {
      street: '567 Business District',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400051'
    },
    courses: [
      {
        id: '9',
        name: 'MBA in Finance',
        category: 'Business & Management',
        status: 'completed',
        enrollmentDate: '2021-07-01',
        completionDate: '2023-06-15'
      },
      {
        id: '10',
        name: 'Strategic Management',
        category: 'Business & Management',
        status: 'completed',
        enrollmentDate: '2022-07-01',
        completionDate: '2023-01-15'
      }
    ],
    certificates: [
      {
        id: '4',
        name: 'MBA in Finance Degree',
        issueDate: '2023-06-20',
        type: 'completion'
      },
      {
        id: '5',
        name: 'Strategic Management Excellence',
        issueDate: '2023-01-20',
        type: 'achievement'
      }
    ],
    gpa: 4.0,
    totalCredits: 90
  },
  {
    id: '6',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    phone: '+61 2 9876 5432',
    studentId: 'ANU2022156',
    dateOfBirth: '2001-09-14',
    enrollmentDate: '2022-02-01',
    status: 'active',
    institute: {
      id: '8',
      name: 'Australian National University',
      type: 'University'
    },
    address: {
      street: '890 University Avenue',
      city: 'Canberra',
      state: 'ACT',
      country: 'Australia',
      zipCode: '2601'
    },
    courses: [
      {
        id: '11',
        name: 'Political Science',
        category: 'Social Sciences',
        status: 'in_progress',
        enrollmentDate: '2023-02-01'
      },
      {
        id: '12',
        name: 'International Relations',
        category: 'Social Sciences',
        status: 'completed',
        enrollmentDate: '2022-02-01',
        completionDate: '2022-11-30'
      }
    ],
    certificates: [
      {
        id: '6',
        name: 'International Relations Certificate',
        issueDate: '2022-12-05',
        type: 'completion'
      }
    ],
    gpa: 3.5,
    totalCredits: 42
  },
  {
    id: '7',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+44 20 1234 5678',
    studentId: 'DLH2023089',
    dateOfBirth: '2004-01-30',
    enrollmentDate: '2023-01-15',
    status: 'inactive',
    institute: {
      id: '6',
      name: 'Digital Learning Hub',
      type: 'Online Platform'
    },
    partner: {
      id: '6',
      name: 'Digital Marketing Collective',
      type: 'Agency'
    },
    address: {
      street: '234 Tech Street',
      city: 'London',
      state: 'England',
      country: 'United Kingdom',
      zipCode: 'SW1A 1AA'
    },
    courses: [
      {
        id: '13',
        name: 'Digital Marketing Certificate',
        category: 'Digital Marketing',
        status: 'enrolled',
        enrollmentDate: '2023-01-15'
      }
    ],
    certificates: [],
    gpa: 3.2,
    totalCredits: 12
  },
  {
    id: '8',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@email.com',
    phone: '+82 2 1234 5678',
    studentId: 'TIT2021078',
    dateOfBirth: '2000-08-17',
    enrollmentDate: '2021-04-01',
    status: 'active',
    institute: {
      id: '13',
      name: 'Tokyo Institute of Technology',
      type: 'University'
    },
    partner: {
      id: '7',
      name: 'Robotics Innovation Network',
      type: 'Research'
    },
    address: {
      street: '456 Innovation Street',
      city: 'Tokyo',
      state: 'Tokyo',
      country: 'Japan',
      zipCode: '152-8550'
    },
    courses: [
      {
        id: '14',
        name: 'Robotics Engineering',
        category: 'Engineering & Technology',
        status: 'in_progress',
        enrollmentDate: '2023-04-01'
      },
      {
        id: '15',
        name: 'Artificial Intelligence',
        category: 'Computer Science & IT',
        status: 'completed',
        enrollmentDate: '2022-04-01',
        completionDate: '2023-01-20'
      }
    ],
    certificates: [
      {
        id: '7',
        name: 'AI Fundamentals Certificate',
        issueDate: '2023-01-25',
        type: 'completion'
      }
    ],
    gpa: 3.8,
    totalCredits: 72
  },
  {
    id: '9',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+33 1 23 45 67 89',
    studentId: 'EBS2022134',
    dateOfBirth: '2002-04-25',
    enrollmentDate: '2022-09-01',
    status: 'active',
    institute: {
      id: '12',
      name: 'European Business School',
      type: 'College'
    },
    partner: {
      id: '8',
      name: 'European Legal Consortium',
      type: 'Legal'
    },
    address: {
      street: '789 Business Boulevard',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      zipCode: '75001'
    },
    courses: [
      {
        id: '16',
        name: 'European Business Law',
        category: 'Law & Legal Studies',
        status: 'in_progress',
        enrollmentDate: '2023-09-01'
      },
      {
        id: '17',
        name: 'International Economics',
        category: 'Business & Management',
        status: 'completed',
        enrollmentDate: '2022-09-01',
        completionDate: '2023-05-15'
      }
    ],
    certificates: [
      {
        id: '8',
        name: 'International Economics Certificate',
        issueDate: '2023-05-20',
        type: 'completion'
      }
    ],
    gpa: 3.9,
    totalCredits: 48
  },
  {
    id: '10',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+1 (512) 555-0198',
    studentId: 'CCA2023045',
    dateOfBirth: '2003-02-11',
    enrollmentDate: '2023-08-15',
    status: 'suspended',
    institute: {
      id: '11',
      name: 'CodeCraft Academy',
      type: 'Training Center'
    },
    partner: {
      id: '9',
      name: 'Web Development Guild',
      type: 'Professional'
    },
    address: {
      street: '123 Developer Lane',
      city: 'Austin',
      state: 'Texas',
      country: 'United States',
      zipCode: '73301'
    },
    courses: [
      {
        id: '18',
        name: 'Web Development Bootcamp',
        category: 'Computer Science & IT',
        status: 'enrolled',
        enrollmentDate: '2023-08-15'
      }
    ],
    certificates: [],
    totalCredits: 6
  }
]

interface StudentManagementProps {
  onViewProfile?: (studentId: string) => void
}

 function StudentManagement({ onViewProfile }: StudentManagementProps = {}) {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [instituteFilter, setInstituteFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string[]>([])
  const [cityFilter, setCityFilter] = useState<string>('all')
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('all')
  const [partnerFilter, setPartnerFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [currentPage, setCurrentPage] = useState(1)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [viewMode, statusFilter, instituteFilter, countryFilter, cityFilter, courseCategoryFilter, partnerFilter, searchTerm])

  // Get unique values for filters
  const institutes = Array.from(new Set(students.map(student => student.institute.name))).sort()
  const countries = Array.from(new Set(students.map(student => student.address.country))).sort()
  const cities = Array.from(new Set(students.map(student => student.address.city))).sort()
  const courseCategories = Array.from(new Set(students.flatMap(student => 
    student.courses.map(course => course.category)
  ))).sort()
  const partners = Array.from(new Set(students.filter(student => student.partner).map(student => student.partner!.name))).sort()

  const handleCountryToggle = (country: string) => {
    setCountryFilter(prev => {
      if (prev.includes(country)) {
        return prev.filter(c => c !== country)
      } else {
        return [...prev, country]
      }
    })
  }

  const handlePartnerToggle = (partner: string) => {
    setPartnerFilter(prev => {
      if (prev.includes(partner)) {
        return prev.filter(p => p !== partner)
      } else {
        return [...prev, partner]
      }
    })
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setInstituteFilter('all')
    setCountryFilter([])
    setCityFilter('all')
    setCourseCategoryFilter('all')
    setPartnerFilter([])
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-xs whitespace-nowrap">
            <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            Active
          </Badge>
        )
      case 'inactive':
        return (
          <Badge variant="secondary" className="bg-gray-50 text-gray-700 border-gray-200 text-xs whitespace-nowrap">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            Inactive
          </Badge>
        )
      case 'graduated':
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs whitespace-nowrap">
            <GraduationCap className="h-3 w-3 mr-1 flex-shrink-0" />
            Graduated
          </Badge>
        )
      case 'suspended':
        return (
          <Badge variant="destructive" className="text-xs whitespace-nowrap">
            <X className="h-3 w-3 mr-1 flex-shrink-0" />
            Suspended
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {status}
          </Badge>
        )
    }
  }

  const getStudentInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    const matchesInstitute = instituteFilter === 'all' || student.institute.name === instituteFilter
    const matchesCountry = countryFilter.length === 0 || countryFilter.includes(student.address.country)
    const matchesCity = cityFilter === 'all' || student.address.city === cityFilter
    const matchesCourseCategory = courseCategoryFilter === 'all' || 
      student.courses.some(course => course.category === courseCategoryFilter)
    const matchesPartner = partnerFilter.length === 0 || 
      (student.partner && partnerFilter.includes(student.partner.name))
    
    return matchesSearch && matchesStatus && matchesInstitute && matchesCountry && matchesCity && matchesCourseCategory && matchesPartner
  })

  const currentItemsPerPage = viewMode === 'table' ? 10 : 9
  const totalPages = Math.ceil(filteredStudents.length / currentItemsPerPage)
  const paginatedStudents = filteredStudents.slice(0, currentPage * currentItemsPerPage)
  const hasMore = currentPage < totalPages

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const getStatusStats = () => {
    return {
      total: students.length,
      active: students.filter(s => s.status === 'active').length,
      inactive: students.filter(s => s.status === 'inactive').length,
      graduated: students.filter(s => s.status === 'graduated').length,
      suspended: students.filter(s => s.status === 'suspended').length,
      certificatesIssued: students.reduce((sum, student) => sum + student.certificates.length, 0)
    }
  }

  const stats = getStatusStats()

  const activeFiltersCount = [
    searchTerm !== '',
    statusFilter !== 'all',
    instituteFilter !== 'all',
    countryFilter.length > 0,
    cityFilter !== 'all',
    courseCategoryFilter !== 'all',
    partnerFilter.length > 0
  ].filter(Boolean).length

  const CardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {paginatedStudents.map((student) => (
        <Card key={student.id} className="hover:shadow-md transition-shadow overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4 w-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getStudentInitials(student.firstName, student.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight truncate">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-xs text-muted-foreground">{student.studentId}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(student.status)}
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{student.institute.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{student.address.city}, {student.address.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{student.courses.length} course{student.courses.length !== 1 ? 's' : ''}</span>
                </div>
                {student.partner && (
                  <div className="flex items-center gap-2">
                    <Handshake className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{student.partner.name}</span>
                  </div>
                )}
                {student.certificates.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{student.certificates.length} certificate{student.certificates.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {student.gpa && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">GPA: {student.gpa}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t gap-3">
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {onViewProfile && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 px-2 text-xs whitespace-nowrap"
                      onClick={() => onViewProfile(student.id)}
                    >
                      <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const TableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Certificates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getStudentInitials(student.firstName, student.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate max-w-[150px]">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {student.studentId}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm truncate max-w-[150px]">{student.institute.name}</div>
                  <div className="text-xs text-muted-foreground">{student.institute.type}</div>
                </TableCell>
                <TableCell>
                  {student.partner ? (
                    <div>
                      <div className="text-sm truncate max-w-[120px]">{student.partner.name}</div>
                      <div className="text-xs text-muted-foreground">{student.partner.type}</div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">No partner</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">{student.address.city}</div>
                  <div className="text-xs text-muted-foreground">{student.address.country}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{student.courses.length} course{student.courses.length !== 1 ? 's' : ''}</div>
                  <div className="text-xs text-muted-foreground">{student.totalCredits} credits</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{student.certificates.length} certificate{student.certificates.length !== 1 ? 's' : ''}</div>
                  {student.certificates.length > 0 && (
                    <div className="text-xs text-muted-foreground">Latest: {new Date(student.certificates[student.certificates.length - 1].issueDate).toLocaleDateString()}</div>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(student.status)}
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">
                    {student.gpa ? student.gpa.toFixed(1) : 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{new Date(student.enrollmentDate).toLocaleDateString()}</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {onViewProfile && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onViewProfile(student.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">
            Manage student enrollments and academic records
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Graduated</p>
                <p className="text-2xl font-bold">{stats.graduated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="h-4 w-4 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Certificates Issued</p>
                <p className="text-2xl font-bold">{stats.certificatesIssued}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">{stats.inactive + stats.suspended}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={instituteFilter} onValueChange={setInstituteFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Institute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutes</SelectItem>
                {institutes.map(institute => (
                  <SelectItem key={institute} value={institute} className="text-sm">
                    {institute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={countryDropdownOpen} onOpenChange={setCountryDropdownOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-[140px] justify-between">
                  <span>
                    {countryFilter.length === 0 
                      ? 'Country' 
                      : `${countryFilter.length} selected`
                    }
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandEmpty>No countries found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {countries.map((country) => (
                      <CommandItem
                        key={country}
                        onSelect={() => handleCountryToggle(country)}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={countryFilter.includes(country)}
                          readOnly
                        />
                        <span>{country}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={courseCategoryFilter} onValueChange={setCourseCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Course Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {courseCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={partnerDropdownOpen} onOpenChange={setPartnerDropdownOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-[140px] justify-between">
                  <span>
                    {partnerFilter.length === 0 
                      ? 'Partners' 
                      : `${partnerFilter.length} selected`
                    }
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search partners..." />
                  <CommandEmpty>No partners found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {partners.map((partner) => (
                      <CommandItem
                        key={partner}
                        onSelect={() => handlePartnerToggle(partner)}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={partnerFilter.includes(partner)}
                          readOnly
                        />
                        <span>{partner}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'card' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('card')}
                  className="px-3"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="px-3"
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="px-3"
              >
                Clear Filters ({activeFiltersCount})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedStudents.length} of {filteredStudents.length} students
          </p>
        </div>

        {viewMode === 'card' ? <CardView /> : <TableView />}

        {hasMore && (
          <div className="flex justify-center pt-4">
            <Button onClick={handleViewMore} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default StudentManagement