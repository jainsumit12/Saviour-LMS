"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Separator } from '../../components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Checkbox } from '../../components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/command'
import { 
  Building2, 
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
  ChevronDown,
  LayoutGrid,
  Table as TableIcon,
  Edit,
  X,
  Check
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
}

const mockInstitutes: Institute[] = [
  {
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
    approvedAt: '2024-01-16T10:15:00Z'
  },
  {
    id: '2',
    name: 'Stanford University',
    email: 'info@stanford.edu',
    phone: '+1 (650) 723-2300',
    address: '450 Jane Stanford Way',
    city: 'Stanford',
    state: 'California',
    country: 'United States',
    website: 'https://stanford.edu',
    contactPerson: 'Prof. Michael Chen',
    institutionType: 'university',
    status: 'approved',
    createdAt: '2024-01-10T09:45:00Z',
    approvedBy: 'Admin',
    approvedAt: '2024-01-11T14:20:00Z'
  },
  {
    id: '3',
    name: 'Indian Institute of Technology Delhi',
    email: 'office@iitd.ac.in',
    phone: '+91 11 2659 1000',
    address: 'Hauz Khas',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    website: 'https://iitd.ac.in',
    contactPerson: 'Dr. Rajesh Kumar',
    institutionType: 'university',
    status: 'approved',
    createdAt: '2024-01-20T11:30:00Z',
    approvedBy: 'Admin',
    approvedAt: '2024-01-21T16:45:00Z'
  }
]


 function InstituteManagement() {
  const router = useRouter()
  const [institutes, setInstitutes] = useState<Institute[]>(mockInstitutes)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [currentPage, setCurrentPage] = useState(1)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)

  const handleViewProfile = (instituteId: string) => {
  }


  useEffect(() => {
    setCurrentPage(1)
  }, [viewMode, statusFilter, typeFilter, countryFilter, searchTerm])

  const institutionTypes = Array.from(new Set(institutes.map(institute => institute.institutionType)))
  const availableCountries = Array.from(new Set(institutes.map(institute => institute.country))).sort()

  const handleApprove = async (instituteId: string) => {
    try {
      setInstitutes(prev => prev.map(inst => 
        inst.id === instituteId ? { 
          ...inst, 
          status: 'approved',
          approvedBy: 'Admin',
          approvedAt: new Date().toISOString()
        } : inst
      ))
      toast.success('Institute approved successfully')
    } catch (error) {
      console.log('Error approving institute:', error)
      toast.error('Failed to approve institute')
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
    setCountryFilter([])
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-xs whitespace-nowrap">
            <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            Approved
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs whitespace-nowrap">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            Pending
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive" className="text-xs whitespace-nowrap">
            <MoreHorizontal className="h-3 w-3 mr-1 flex-shrink-0" />
            Rejected
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

  const getInstituteInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const filteredInstitutes = institutes.filter(institute => {
    const matchesSearch = institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institute.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || institute.status === statusFilter
    const matchesType = typeFilter === 'all' || institute.institutionType === typeFilter
    const matchesCountry = countryFilter.length === 0 || countryFilter.includes(institute.country)
    return matchesSearch && matchesStatus && matchesType && matchesCountry
  })

  const currentItemsPerPage = viewMode === 'table' ? 10 : 9
  const totalPages = Math.ceil(filteredInstitutes.length / currentItemsPerPage)
  const paginatedInstitutes = filteredInstitutes.slice(0, currentPage * currentItemsPerPage)
  const hasMore = currentPage < totalPages

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const getStatusStats = () => {
    return {
      total: institutes.length,
      pending: institutes.filter(i => i.status === 'pending').length,
      approved: institutes.filter(i => i.status === 'approved').length,
      rejected: institutes.filter(i => i.status === 'rejected').length
    }
  }

  const stats = getStatusStats()

  const activeFiltersCount = [
    searchTerm !== '',
    statusFilter !== 'all',
    typeFilter !== 'all',
    countryFilter.length > 0
  ].filter(Boolean).length

  const CardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {paginatedInstitutes.map((institute) => (
        <Card key={institute.id} className="hover:shadow-md transition-shadow overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4 w-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src="" alt={institute.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInstituteInitials(institute.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight truncate">{institute.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{institute.institutionType?.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(institute.status)}
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{institute.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{institute.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{institute.city}, {institute.country}</span>
                </div>
                {institute.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <a 
                      href={institute.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline truncate text-xs"
                    >
                      {institute.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t gap-3">
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  Applied: {new Date(institute.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-xs whitespace-nowrap"
                    onClick={() => {
                      setSelectedInstitute(institute)
                      setViewDialogOpen(true)
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                    View
                  </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push("/institute/profile")}
                      className="h-7 px-2 text-xs whitespace-nowrap"
                    >
                      <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
                      Profile
                    </Button>
                  {institute.status === 'pending' && (
                    <Button 
                      size="sm"
                      className="h-7 px-2 text-xs whitespace-nowrap"
                      onClick={() => handleApprove(institute.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                      Approve
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
              <TableHead>Institute</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInstitutes.map((institute) => (
              <TableRow key={institute.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={institute.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInstituteInitials(institute.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate max-w-[200px]">{institute.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{institute.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize text-xs">
                    {institute.institutionType?.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{institute.contactPerson}</div>
                  <div className="text-xs text-muted-foreground">{institute.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{institute.city}, {institute.state}</div>
                  <div className="text-xs text-muted-foreground">{institute.country}</div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(institute.status)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">{new Date(institute.createdAt).toLocaleDateString()}</div>
                  {institute.approvedAt && (
                    <div className="text-xs text-muted-foreground">
                      Approved: {new Date(institute.approvedAt).toLocaleDateString()}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setSelectedInstitute(institute)
                        setViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => router.push("/institute/profile")}
                      >
                        <Building2 className="h-4 w-4" />
                      </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {institute.status === 'pending' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApprove(institute.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
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
          <h2 className="text-2xl font-bold tracking-tight">Institute Management</h2>
          <p className="text-muted-foreground">
            Manage institute registrations and approvals
          </p>
        </div>
        
        <Button 
          className="md:w-auto w-full"
          onClick={()=>router.push("/institute/add")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Institute
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Institutes</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
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
                placeholder="Search institutes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {institutionTypes.map(type => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={countryDropdownOpen} onOpenChange={setCountryDropdownOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-[200px] justify-between">
                  <span>
                    {countryFilter.length === 0 
                      ? 'Filter by country' 
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
                    {availableCountries.map((country) => (
                      <CommandItem
                        key={country}
                        onSelect={() => handleCountryToggle(country)}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={countryFilter.includes(country)}
                          disabled
                        />
                        <span>{country}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

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
              
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="px-3"
                >
                  Clear ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedInstitutes.length} of {filteredInstitutes.length} institutes
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

      {/* View Institute Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Institute Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedInstitute?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInstitute && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Institute Name</Label>
                  <p className="font-medium">{selectedInstitute.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <p className="font-medium capitalize">{selectedInstitute.institutionType.replace('-', ' ')}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Contact Person</Label>
                  <p className="font-medium">{selectedInstitute.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedInstitute.status)}</div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedInstitute.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedInstitute.phone}</p>
                </div>
                {selectedInstitute.website && (
                  <div className="md:col-span-2">
                    <Label className="text-sm text-muted-foreground">Website</Label>
                    <p className="font-medium">
                      <a 
                        href={selectedInstitute.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline"
                      >
                        {selectedInstitute.website}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <p className="font-medium">
                  {selectedInstitute.address}<br />
                  {selectedInstitute.city}, {selectedInstitute.state}<br />
                  {selectedInstitute.country}
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                  <Button onClick={() => {
                    handleViewProfile(selectedInstitute.id)
                    setViewDialogOpen(false)
                  }}>
                    View Full Profile
                  </Button>
                
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default InstituteManagement