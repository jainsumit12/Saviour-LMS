"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Separator } from '@/ui/separator'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Textarea } from '@/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  Calendar,
  Award,
  Clock,
  User,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Shield,
  Hash,
  UserCheck,
  Upload,
  Camera,
  X
} from 'lucide-react'
import { toast } from 'sonner'

interface Institute {
  id?: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  website: string
  contactPerson: string
  institutionType: string
  status: string
  createdAt: string
  approvedBy: string
  approvedAt: string
  description: string
  founded: string
  accreditation: string[]
  totalStudents: number
  totalCourses: number
  totalEducators: number
}

// Mock data for the institute's own profile
const mockInstituteProfile: Institute = {
  name: 'Tech Excellence Institute',
  email: 'info@techexcellence.edu',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, Tech Park',
  city: 'San Francisco',
  state: 'California',
  country: 'United States',
  website: 'https://techexcellence.edu',
  contactPerson: 'Dr. Michael Chen',
  institutionType: 'Institute',
  status: 'approved',
  createdAt: '2023-03-15T08:30:00Z',
  approvedBy: 'Admin Team',
  approvedAt: '2023-03-16T10:15:00Z',
  description: 'Tech Excellence Institute is a leading educational institution specializing in cutting-edge technology education. We offer comprehensive programs in computer science, artificial intelligence, cybersecurity, and digital innovation.',
  founded: '2018',
  accreditation: ['ACCET', 'IEEE', 'ACM Institutional Member'],
  totalStudents: 2847,
  totalCourses: 42,
  totalEducators: 68
}

const institutionTypes = [
  'University',
  'College', 
  'Institute',
  'Academy',
  'School',
  'Training Center',
  'Online Platform',
  'Research Institution'
]

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'Malaysia', 'UAE', 'India'
]

 function InstituteMyProfile() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<Institute>(mockInstituteProfile)
  const [formData, setFormData] = useState<Institute>(mockInstituteProfile)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
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
            Pending Review
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Needs Attention
          </Badge>
        )
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>
    }
  }

  const getInstituteInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleInputChange = (field: keyof Institute, value: string | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAccreditationChange = (accreditations: string) => {
    const accreditationArray = accreditations.split(',').map(acc => acc.trim()).filter(acc => acc.length > 0)
    setFormData(prev => ({ ...prev, accreditation: accreditationArray }))
  }

  const handleSaveSection = async (section: string) => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setProfileData(formData)
      setEditingSection(null)
      setIsSubmitting(false)
      toast.success('Profile updated successfully!')
    }, 1500)
  }

  const handleCancelEdit = (section: string) => {
    setFormData(profileData)
    setEditingSection(null)
  }

  const renderEditableField = (
    label: string,
    field: keyof Institute,
    type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'number' = 'text',
    options?: string[]
  ) => {
    const isEditable = editingSection === 'basic' || editingSection === 'contact' || editingSection === 'details'
    
    if (!isEditable) {
      let displayValue = formData[field]
      if (Array.isArray(displayValue)) {
        displayValue = displayValue.join(', ')
      }
      return (
        <div className="space-y-1">
          <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
          <p className="text-sm">{displayValue?.toString() || 'Not provided'}</p>
        </div>
      )
    }

    if (type === 'textarea') {
      return (
        <div className="space-y-2">
          <Label htmlFor={field}>{label}</Label>
          <Textarea
            id={field}
            value={formData[field]?.toString() || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows={3}
          />
        </div>
      )
    }

    if (type === 'select' && options) {
      return (
        <div className="space-y-2">
          <Label htmlFor={field}>{label}</Label>
          <Select 
            value={formData[field]?.toString()} 
            onValueChange={(value) => handleInputChange(field, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        <Input
          id={field}
          type={type}
          value={formData[field]?.toString() || ''}
          onChange={(e) => handleInputChange(field, type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Institute Profile</h1>
          <p className="text-muted-foreground">Manage your institute information and settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Update Logo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Institute Logo</DialogTitle>
              <DialogDescription>
                Upload a new logo for your institute. Recommended size: 200x200px
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <Button variant="outline">Choose File</Button>
                  <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Upload Logo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Institute Header Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={profileData.name} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {getInstituteInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{profileData.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {profileData.institutionType}
                    </Badge>
                    {getStatusBadge(profileData.status)}
                  </div>
                </div>
                {profileData.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {profileData.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profileData.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profileData.totalCourses}</div>
                  <div className="text-sm text-muted-foreground">Active Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profileData.totalEducators}</div>
                  <div className="text-sm text-muted-foreground">Faculty Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profileData.founded}</div>
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
          <TabsTrigger value="overview">Basic Information</TabsTrigger>
          <TabsTrigger value="contact">Contact & Location</TabsTrigger>
          <TabsTrigger value="details">Additional Details</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                {editingSection !== 'basic' ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingSection('basic')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancelEdit('basic')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleSaveSection('basic')}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderEditableField('Institute Name', 'name')}
                {renderEditableField('Institution Type', 'institutionType', 'select', institutionTypes)}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {renderEditableField('Founded Year', 'founded')}
                {renderEditableField('Website', 'website', 'url')}
              </div>
              {renderEditableField('Description', 'description', 'textarea')}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact & Location Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  {editingSection !== 'contact' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingSection('contact')}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelEdit('contact')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSaveSection('contact')}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderEditableField('Primary Contact Person', 'contactPerson')}
                {renderEditableField('Email Address', 'email', 'email')}
                {renderEditableField('Phone Number', 'phone', 'tel')}
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderEditableField('Address', 'address', 'textarea')}
                <div className="grid gap-4 md:grid-cols-2">
                  {renderEditableField('City', 'city')}
                  {renderEditableField('State/Province', 'state')}
                </div>
                {renderEditableField('Country', 'country', 'select', countries)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Accreditation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Accreditation & Recognition
                  </CardTitle>
                  {editingSection !== 'details' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingSection('details')}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelEdit('details')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSaveSection('details')}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === 'details' ? (
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditations (comma-separated)</Label>
                    <Textarea
                      id="accreditation"
                      value={formData.accreditation.join(', ')}
                      onChange={(e) => handleAccreditationChange(e.target.value)}
                      placeholder="Enter accreditations separated by commas"
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {profileData.accreditation.map((acc, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Administrative Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Administrative Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{formatDate(profileData.createdAt)}</p>
                      <p className="text-sm text-muted-foreground">Registration Date</p>
                    </div>
                  </div>
                  
                  {profileData.approvedAt && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{formatDate(profileData.approvedAt)}</p>
                        <p className="text-sm text-muted-foreground">Approval Date</p>
                      </div>
                    </div>
                  )}
                  
                  {profileData.approvedBy && (
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{profileData.approvedBy}</p>
                        <p className="text-sm text-muted-foreground">Approved By</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistics (Read-only) */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Institute Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">{profileData.totalStudents.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Students Enrolled</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">{profileData.totalCourses}</div>
                    <div className="text-sm text-muted-foreground">Active Courses</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-600">{profileData.totalEducators}</div>
                    <div className="text-sm text-muted-foreground">Faculty Members</div>
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

export default InstituteMyProfile