"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Separator } from '../../components/ui/separator'
import { Progress } from '../../components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Checkbox } from '../../components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/command'

import { 
  Handshake, 
  Plus, 
  CheckCircle, 
  Clock, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  Globe,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Star,
  ChevronDown,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon,
  ExternalLink,
  Edit,
  Trash2,
  X,
  Check,
  Building,
  TrendingUp,
  DollarSign,
  Award,
  AlertCircle,
  XCircle,
  Briefcase,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

interface Partner {
  id: string
  name: string
  companyName: string
  email: string
  phone: string
  website?: string
  address: string
  city: string
  state: string
  country: string
  contactPerson: string
  designation: string
  partnerType: 'corporate' | 'educational' | 'technology' | 'consulting' | 'government'
  partnershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  contractValue: number
  contractStartDate: string
  contractEndDate: string
  servicesOffered: string[]
  clientsServed: number
  satisfactionRating: number
  createdAt: string
  updatedAt: string
  logo?: string
  description: string
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Switzerland', 'Austria', 'Belgium', 'Ireland', 'New Zealand', 'South Korea', 'Israel'
]

// Mock partner data
const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    companyName: 'TechCorp Solutions Inc.',
    email: 'partnerships@techcorp.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.com',
    address: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    contactPerson: 'Sarah Johnson',
    designation: 'Partnership Director',
    partnerType: 'technology',
    partnershipLevel: 'platinum',
    status: 'active',
    contractValue: 2500000,
    contractStartDate: '2024-01-01',
    contractEndDate: '2026-12-31',
    servicesOffered: ['Cloud Infrastructure', 'AI Solutions', 'Data Analytics', 'Cybersecurity'],
    clientsServed: 150,
    satisfactionRating: 4.8,
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    description: 'Leading technology solutions provider specializing in enterprise cloud infrastructure and AI-powered educational tools.'
  },
  {
    id: '2',
    name: 'EduConsult Partners',
    companyName: 'EduConsult Partners Ltd.',
    email: 'contact@educonsult.com',
    phone: '+44 20 7946 0958',
    website: 'https://educonsult.com',
    address: '25 Education Street',
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    contactPerson: 'Michael Chen',
    designation: 'Managing Partner',
    partnerType: 'consulting',
    partnershipLevel: 'gold',
    status: 'active',
    contractValue: 1800000,
    contractStartDate: '2024-02-01',
    contractEndDate: '2025-01-31',
    servicesOffered: ['Educational Consulting', 'Curriculum Development', 'Teacher Training', 'Assessment Solutions'],
    clientsServed: 85,
    satisfactionRating: 4.6,
    createdAt: '2024-01-10T09:45:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    description: 'Premier educational consulting firm helping institutions improve their academic programs and operational efficiency.'
  },
  {
    id: '3',
    name: 'Global Learning Systems',
    companyName: 'Global Learning Systems Pvt. Ltd.',
    email: 'partnerships@globallearning.in',
    phone: '+91 11 2659 8000',
    website: 'https://globallearning.in',
    address: 'Tech Park, Sector 15',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    contactPerson: 'Priya Sharma',
    designation: 'VP Business Development',
    partnerType: 'educational',
    partnershipLevel: 'silver',
    status: 'active',
    contractValue: 950000,
    contractStartDate: '2024-03-01',
    contractEndDate: '2025-02-28',
    servicesOffered: ['E-Learning Platforms', 'Virtual Classrooms', 'Content Development', 'Student Analytics'],
    clientsServed: 120,
    satisfactionRating: 4.4,
    createdAt: '2024-01-20T11:30:00Z',
    updatedAt: '2024-01-22T16:45:00Z',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop&crop=center',
    description: 'Innovative e-learning solutions provider focused on creating engaging digital educational experiences.'
  },
  {
    id: '4',
    name: 'Corporate Training Hub',
    companyName: 'Corporate Training Hub LLC',
    email: 'business@corptraininghub.com',
    phone: '+1 (416) 978-2000',
    website: 'https://corptraininghub.com',
    address: '456 Business Avenue',
    city: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    contactPerson: 'David Wilson',
    designation: 'Director of Partnerships',
    partnerType: 'corporate',
    partnershipLevel: 'gold',
    status: 'active',
    contractValue: 1600000,
    contractStartDate: '2024-01-15',
    contractEndDate: '2025-12-31',
    servicesOffered: ['Corporate Training', 'Leadership Development', 'Skills Assessment', 'Professional Certification'],
    clientsServed: 95,
    satisfactionRating: 4.7,
    createdAt: '2024-01-08T07:15:00Z',
    updatedAt: '2024-01-25T12:30:00Z',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=center',
    description: 'Comprehensive corporate training solutions for workforce development and professional skill enhancement.'
  },
  {
    id: '5',
    name: 'NextGen Education',
    companyName: 'NextGen Education Solutions',
    email: 'hello@nextgenedu.com',
    phone: '+61 2 6125 8000',
    website: 'https://nextgenedu.com',
    address: '789 Future Lane',
    city: 'Sydney',
    state: 'NSW',
    country: 'Australia',
    contactPerson: 'Emma Thompson',
    designation: 'Partnership Manager',
    partnerType: 'technology',
    partnershipLevel: 'silver',
    status: 'pending',
    contractValue: 750000,
    contractStartDate: '2024-04-01',
    contractEndDate: '2025-03-31',
    servicesOffered: ['EdTech Solutions', 'Mobile Learning Apps', 'Gamification', 'AR/VR Education'],
    clientsServed: 45,
    satisfactionRating: 4.2,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-28T15:30:00Z',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
    description: 'Cutting-edge educational technology company developing immersive learning experiences for modern students.'
  },
  {
    id: '6',
    name: 'Innovation Partners',
    companyName: 'Innovation Partners GmbH',
    email: 'info@innovationpartners.de',
    phone: '+49 30 1234 5678',
    website: 'https://innovationpartners.de',
    address: 'Unter den Linden 10',
    city: 'Berlin',
    state: 'Berlin',
    country: 'Germany',
    contactPerson: 'Klaus Mueller',
    designation: 'Head of Education Division',
    partnerType: 'consulting',
    partnershipLevel: 'bronze',
    status: 'inactive',
    contractValue: 450000,
    contractStartDate: '2023-06-01',
    contractEndDate: '2024-05-31',
    servicesOffered: ['Innovation Consulting', 'Research & Development', 'Strategic Planning', 'Change Management'],
    clientsServed: 32,
    satisfactionRating: 4.1,
    createdAt: '2023-05-15T13:20:00Z',
    updatedAt: '2024-01-10T09:45:00Z',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center',
    description: 'Strategic innovation consulting firm helping educational institutions transform through technology and process optimization.'
  },
  {
    id: '7',
    name: 'Ministry of Education',
    companyName: 'Singapore Ministry of Education',
    email: 'partnerships@moe.gov.sg',
    phone: '+65 6872 2220',
    website: 'https://moe.gov.sg',
    address: '1 North Buona Vista Drive',
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    contactPerson: 'Dr. Wei Lin',
    designation: 'Director, Digital Education',
    partnerType: 'government',
    partnershipLevel: 'platinum',
    status: 'active',
    contractValue: 3200000,
    contractStartDate: '2024-01-01',
    contractEndDate: '2027-12-31',
    servicesOffered: ['National Education Programs', 'Teacher Training', 'Digital Infrastructure', 'Policy Implementation'],
    clientsServed: 300,
    satisfactionRating: 4.9,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-30T16:20:00Z',
    logo: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=100&h=100&fit=crop&crop=center',
    description: 'Government partnership for nationwide educational transformation and digital learning initiatives.'
  },
  {
    id: '8',
    name: 'SkillBridge Academy',
    companyName: 'SkillBridge Academy Inc.',
    email: 'partners@skillbridge.com',
    phone: '+1 (555) 987-6543',
    website: 'https://skillbridge.com',
    address: '321 Skills Avenue',
    city: 'Austin',
    state: 'Texas',
    country: 'United States',
    contactPerson: 'Lisa Anderson',
    designation: 'VP Strategic Partnerships',
    partnerType: 'educational',
    partnershipLevel: 'gold',
    status: 'active',
    contractValue: 1350000,
    contractStartDate: '2024-02-15',
    contractEndDate: '2025-02-14',
    servicesOffered: ['Skills Assessment', 'Career Guidance', 'Job Placement', 'Industry Certifications'],
    clientsServed: 180,
    satisfactionRating: 4.5,
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-25T11:15:00Z',
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    description: 'Professional skills development academy bridging the gap between education and industry requirements.'
  }
]

interface PartnerManagementProps {
  onViewProfile?: (partnerId: string) => void
}

 function PartnerManagement({ onViewProfile }: PartnerManagementProps = {}) {
  const [partners, setPartners] = useState<Partner[]>(mockPartners)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [currentPage, setCurrentPage] = useState(1)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    contactPerson: '',
    designation: '',
    partnerType: '',
    partnershipLevel: 'bronze',
    contractValue: '',
    contractStartDate: '',
    contractEndDate: '',
    description: ''
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  // Reset pagination when view mode or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [viewMode, statusFilter, typeFilter, levelFilter, countryFilter, searchTerm])

  // Get unique values for filters
  const partnerTypes = Array.from(new Set(partners.map(partner => partner.partnerType)))
  const partnershipLevels = ['bronze', 'silver', 'gold', 'platinum']
  const availableCountries = Array.from(new Set(partners.map(partner => partner.country))).sort()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newPartner: Partner = {
        id: (partners.length + 1).toString(),
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        contactPerson: formData.contactPerson,
        designation: formData.designation,
        partnerType: formData.partnerType as Partner['partnerType'],
        partnershipLevel: formData.partnershipLevel as Partner['partnershipLevel'],
        status: 'pending',
        contractValue: parseInt(formData.contractValue) || 0,
        contractStartDate: formData.contractStartDate,
        contractEndDate: formData.contractEndDate,
        servicesOffered: [],
        clientsServed: 0,
        satisfactionRating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: formData.description
      }

      setPartners(prev => [newPartner, ...prev])
      setDialogOpen(false)
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        contactPerson: '',
        designation: '',
        partnerType: '',
        partnershipLevel: 'bronze',
        contractValue: '',
        contractStartDate: '',
        contractEndDate: '',
        description: ''
      })
      toast.success('Partner application submitted successfully')
    } catch (error) {
      console.log('Error submitting partner:', error)
      toast.error('Failed to submit partner application')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (partnerId: string, newStatus: Partner['status']) => {
    try {
      setPartners(prev => prev.map(partner => 
        partner.id === partnerId ? { ...partner, status: newStatus } : partner
      ))
      toast.success('Partner status updated successfully')
    } catch (error) {
      console.log('Error updating partner status:', error)
      toast.error('Failed to update partner status')
    }
  }

  const handleCountryToggle = (country: string) => {
    setCountryFilter(prev => {
      if (prev.includes(country)) {
        return prev.filter(c => c !== country)
      } else {
        return [...prev, country]
      }
    })
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setTypeFilter('all')
    setLevelFilter('all')
    setCountryFilter([])
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
            <XCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            Inactive
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs whitespace-nowrap">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            Pending
          </Badge>
        )
      case 'suspended':
        return (
          <Badge variant="destructive" className="text-xs whitespace-nowrap">
            <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
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

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'platinum':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-xs">Platinum</Badge>
      case 'gold':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">Gold</Badge>
      case 'silver':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200 text-xs">Silver</Badge>
      case 'bronze':
        return <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs">Bronze</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{level}</Badge>
    }
  }

  const getPartnerInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter
    const matchesType = typeFilter === 'all' || partner.partnerType === typeFilter
    const matchesLevel = levelFilter === 'all' || partner.partnershipLevel === levelFilter
    const matchesCountry = countryFilter.length === 0 || countryFilter.includes(partner.country)
    return matchesSearch && matchesStatus && matchesType && matchesLevel && matchesCountry
  })

  // Pagination logic
  const currentItemsPerPage = viewMode === 'table' ? 10 : 9
  const totalPages = Math.ceil(filteredPartners.length / currentItemsPerPage)
  const paginatedPartners = filteredPartners.slice(0, currentPage * currentItemsPerPage)
  const hasMore = currentPage < totalPages

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const getStats = () => {
    return {
      total: partners.length,
      active: partners.filter(p => p.status === 'active').length,
      totalValue: partners.reduce((sum, partner) => sum + partner.contractValue, 0),
      avgRating: partners.length > 0 ? (partners.reduce((sum, partner) => sum + partner.satisfactionRating, 0) / partners.length).toFixed(1) : '0',
      totalClients: partners.reduce((sum, partner) => sum + partner.clientsServed, 0)
    }
  }

  const stats = getStats()

  // Count active filters
  const activeFiltersCount = [
    searchTerm !== '',
    statusFilter !== 'all',
    typeFilter !== 'all',
    levelFilter !== 'all',
    countryFilter.length > 0
  ].filter(Boolean).length

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    )
  }

  const CardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {paginatedPartners.map((partner) => (
        <Card key={partner.id} className="hover:shadow-md transition-shadow overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4 w-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={partner.logo} alt={partner.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getPartnerInitials(partner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight truncate">{partner.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{partner.partnerType?.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(partner.status)}
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{partner.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{partner.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{partner.city}, {partner.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">${partner.contractValue.toLocaleString()}</span>
                </div>
                {partner.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline truncate text-xs"
                    >
                      {partner.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Rating & Level</span>
                  <div className="flex items-center gap-2">
                    {renderStars(partner.satisfactionRating)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getLevelBadge(partner.partnershipLevel)}
                  <Badge variant="outline" className="text-xs">
                    {partner.clientsServed} clients
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t gap-3">
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  Since: {new Date(partner.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs whitespace-nowrap"
                    onClick={() => {
                      setSelectedPartner(partner)
                      setViewDialogOpen(true)
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                    View
                  </Button>
                  {onViewProfile && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 px-2 text-xs whitespace-nowrap"
                      onClick={() => onViewProfile(partner.id)}
                    >
                      <Handshake className="h-3 w-3 mr-1 flex-shrink-0" />
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
  )

  const TableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contract Value</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPartners.map((partner) => (
              <TableRow key={partner.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={partner.logo} alt={partner.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getPartnerInitials(partner.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate max-w-[200px]">{partner.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{partner.companyName}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize text-xs">
                    {partner.partnerType?.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{partner.contactPerson}</div>
                  <div className="text-xs text-muted-foreground">{partner.email}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{partner.city}, {partner.state}</div>
                  <div className="text-xs text-muted-foreground">{partner.country}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">${partner.contractValue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{partner.clientsServed} clients served</div>
                </TableCell>
                <TableCell>
                  {getLevelBadge(partner.partnershipLevel)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(partner.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setSelectedPartner(partner)
                        setViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onViewProfile && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onViewProfile(partner.id)}
                      >
                        <Handshake className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
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
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Partner Management</h2>
          <p className="text-muted-foreground">
            Manage business partnerships and collaborations
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="md:w-auto w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Partner</DialogTitle>
              <DialogDescription>
                Add a new business partner to the platform with their contact information, partnership details, and contract terms.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Partner Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter partner name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partnerType">Partner Type</Label>
                  <Select value={formData.partnerType} onValueChange={(value) => setFormData(prev => ({ ...prev, partnerType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnershipLevel">Partnership Level</Label>
                  <Select value={formData.partnershipLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, partnershipLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@partner.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="Contact person name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                    placeholder="Job title"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://partner.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractValue">Contract Value</Label>
                  <Input
                    id="contractValue"
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, contractValue: e.target.value }))}
                    placeholder="Contract value in USD"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractStartDate">Contract Start Date</Label>
                  <Input
                    id="contractStartDate"
                    type="date"
                    value={formData.contractStartDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, contractStartDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractEndDate">Contract End Date</Label>
                <Input
                  id="contractEndDate"
                  type="date"
                  value={formData.contractEndDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractEndDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the partnership"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Partner'}
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
                <p className="text-sm font-medium text-muted-foreground">Total Partners</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Handshake className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contract Value</p>
                <p className="text-2xl font-bold text-purple-600">${(stats.totalValue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clients Served</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalClients}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
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
                placeholder="Search partners by name, company, contact person, or location..."
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

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {partnerTypes.map(type => (
                      <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Award className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {partnershipLevels.map(level => (
                      <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Multi-select Countries Filter */}
                <Popover open={countryDropdownOpen} onOpenChange={setCountryDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={countryDropdownOpen}
                      className="w-full sm:w-[180px] justify-between"
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {countryFilter.length === 0 ? (
                          "Countries"
                        ) : countryFilter.length === 1 ? (
                          countryFilter[0]
                        ) : (
                          `${countryFilter.length} countries`
                        )}
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search countries..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {availableCountries.map((country) => (
                            <CommandItem
                              key={country}
                              onSelect={() => handleCountryToggle(country)}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <Checkbox
                                checked={countryFilter.includes(country)}
                                onCheckedChange={() => handleCountryToggle(country)}
                              />
                              <span className="flex-1">{country}</span>
                              {countryFilter.includes(country) && (
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
                  Showing {paginatedPartners.length} of {filteredPartners.length} partners
                </Badge>
                
                {/* View Toggle */}
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'card' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('card')}
                    className="h-8 px-3"
                  >
                    <LayoutGrid className="h-4 w-4 mr-1" />
                    Cards
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="h-8 px-3"
                  >
                    <TableIcon className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Country Filters Display */}
            {countryFilter.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Countries:</span>
                {countryFilter.map((country) => (
                  <Badge key={country} variant="secondary" className="flex items-center gap-1">
                    {country}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleCountryToggle(country)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Partners Display */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading partners...</p>
              </div>
            </CardContent>
          </Card>
        ) : paginatedPartners.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Handshake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {activeFiltersCount > 0 ? 'No partners found' : 'No partners yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {activeFiltersCount > 0
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by adding the first partner to the platform'
                }
              </p>
              {activeFiltersCount > 0 ? (
                <Button variant="outline" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              ) : (
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Partner
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === 'card' ? <CardView /> : <TableView />}

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
                      View More Partners
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Showing {paginatedPartners.length} of {filteredPartners.length} partners
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* View Partner Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Partner Overview</DialogTitle>
            <DialogDescription>
              View detailed information about this partner including contact details, partnership level, performance metrics, and contract information.
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedPartner.logo} alt={selectedPartner.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getPartnerInitials(selectedPartner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedPartner.name}</h3>
                    <p className="text-muted-foreground">{selectedPartner.companyName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getLevelBadge(selectedPartner.partnershipLevel)}
                      {getStatusBadge(selectedPartner.status)}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="mt-1 text-sm">{selectedPartner.description}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contact Person</Label>
                    <div className="mt-1">
                      <p className="text-sm font-medium">{selectedPartner.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{selectedPartner.designation}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contact Information</Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>{selectedPartner.email}</p>
                      <p>{selectedPartner.phone}</p>
                      {selectedPartner.website && (
                        <a 
                          href={selectedPartner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedPartner.website}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Partnership Details</Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Type: <span className="capitalize">{selectedPartner.partnerType}</span></p>
                      <p>Level: <span className="capitalize">{selectedPartner.partnershipLevel}</span></p>
                      <p>Contract Value: ${selectedPartner.contractValue.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contract Period</Label>
                    <div className="text-sm mt-1 space-y-1">
                      <p>Start: {new Date(selectedPartner.contractStartDate).toLocaleDateString()}</p>
                      <p>End: {new Date(selectedPartner.contractEndDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Performance</Label>
                    <div className="text-sm mt-1 space-y-2">
                      <p>Clients Served: {selectedPartner.clientsServed}</p>
                      <div>
                        <span>Satisfaction Rating:</span>
                        <div className="mt-1">
                          {renderStars(selectedPartner.satisfactionRating)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <div className="text-sm mt-1">
                      <p>{selectedPartner.address}</p>
                      <p>{selectedPartner.city}, {selectedPartner.state}</p>
                      <p>{selectedPartner.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPartner.servicesOffered.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Services Offered</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPartner.servicesOffered.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                {onViewProfile && (
                  <Button onClick={() => {
                    setViewDialogOpen(false)
                    onViewProfile(selectedPartner.id)
                  }}>
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
  )
}
export default PartnerManagement