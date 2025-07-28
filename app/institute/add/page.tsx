"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Users,
  Save,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner'

interface InstituteFormData {
  // Basic Information
  name: string
  type: string
  establishedYear: string
  accreditation: string
  website: string
  
  // Contact Information
  email: string
  phone: string
  alternatePhone: string
  
  // Address Information
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  
  // Institution Details
  description: string
  specialization: string[]
  studentCapacity: string
  facultyCount: string
}

const instituteTypes = [
  'University',
  'College',
  'Institute',
  'Academy',
  'School',
  'Training Center',
  'Online Platform',
  'Research Institution'
]

const specializations = [
  'Engineering & Technology',
  'Medical & Healthcare',
  'Business & Management',
  'Arts & Sciences',
  'Law & Legal Studies',
  'Education & Teaching',
  'Computer Science & IT',
  'Design & Creative Arts',
  'Agriculture & Life Sciences',
  'Social Sciences',
  'Languages & Literature',
  'Mathematics & Statistics'
]

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Japan', 'Singapore', 'Malaysia', 'UAE'
]
  
 function AddInstitute() {
  const [formData, setFormData] = useState<InstituteFormData>({
    name: '',
    type: '',
    establishedYear: '',
    accreditation: '',
    website: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    description: '',
    specialization: [],
    studentCapacity: '',
    facultyCount: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeSection, setActiveSection] = useState('basic')

  const handleInputChange = (field: keyof InstituteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSpecializationToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }))
  }

  const validateForm = () => {
    const requiredFields = ['name', 'type', 'email', 'phone', 'address', 'city', 'state', 'country']
    const missingFields = requiredFields.filter(field => !formData[field as keyof InstituteFormData])
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in required fields: ${missingFields.join(', ')}`)
      return false
    }
    
    if (formData.specialization.length === 0) {
      toast.error('Please select at least one specialization')
      return false
    }
    
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Institute added successfully to the platform!')
      setIsSubmitting(false)
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        establishedYear: '',
        accreditation: '',
        website: '',
        email: '',
        phone: '',
        alternatePhone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        description: '',
        specialization: [],
        studentCapacity: '',
        facultyCount: ''
      })
      setActiveSection('basic')
    }, 2000)
  }

  const sections = [
    { id: 'basic', label: 'Basic Information', icon: Building2 },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'address', label: 'Address Information', icon: MapPin },
    { id: 'details', label: 'Institution Details', icon: Users }
  ]

  const renderBasicInformation = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Institute Name *</Label>
          <Input
            id="name"
            placeholder="Enter institute name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Institute Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select institute type" />
            </SelectTrigger>
            <SelectContent>
              {instituteTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="establishedYear">Established Year</Label>
          <Input
            id="establishedYear"
            type="number"
            placeholder="e.g., 1995"
            value={formData.establishedYear}
            onChange={(e) => handleInputChange('establishedYear', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accreditation">Accreditation</Label>
          <Input
            id="accreditation"
            placeholder="e.g., NAAC A+, UGC Approved"
            value={formData.accreditation}
            onChange={(e) => handleInputChange('accreditation', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://www.example.com"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the institute"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )

  const renderContactDetails = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Primary Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@institute.edu"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Primary Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alternatePhone">Alternate Phone</Label>
        <Input
          id="alternatePhone"
          type="tel"
          placeholder="+1 (555) 987-6543"
          value={formData.alternatePhone}
          onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
        />
      </div>
    </div>
  )

  const renderAddressInformation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Textarea
          id="address"
          placeholder="Enter complete address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={2}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province *</Label>
          <Input
            id="state"
            placeholder="Enter state or province"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
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
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
          <Input
            id="zipCode"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderInstitutionDetails = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Specializations *</Label>
        <p className="text-sm text-muted-foreground">Select areas of expertise for your institute</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {specializations.map(spec => (
            <div
              key={spec}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                formData.specialization.includes(spec)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSpecializationToggle(spec)}
            >
              <div className="text-sm font-medium">{spec}</div>
            </div>
          ))}
        </div>
        {formData.specialization.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.specialization.map(spec => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studentCapacity">Student Capacity</Label>
          <Input
            id="studentCapacity"
            type="number"
            placeholder="e.g., 5000"
            value={formData.studentCapacity}
            onChange={(e) => handleInputChange('studentCapacity', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facultyCount">Faculty Count</Label>
          <Input
            id="facultyCount"
            type="number"
            placeholder="e.g., 200"
            value={formData.facultyCount}
            onChange={(e) => handleInputChange('facultyCount', e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'basic': return renderBasicInformation()
      case 'contact': return renderContactDetails()
      case 'address': return renderAddressInformation()
      case 'details': return renderInstitutionDetails()
      default: return renderBasicInformation()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Add New Institute</h1>
        <p className="text-muted-foreground">
          Register a new educational institute on the platform
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 cursor-pointer ${
                    activeSection === section.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="w-4 h-4" />
                </div>
                {index < sections.length - 1 && (
                  <div className="w-12 h-0.5 bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h3 className="font-medium">{sections.find(s => s.id === activeSection)?.label}</h3>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {sections.find(s => s.id === activeSection)?.icon && (
              React.createElement(sections.find(s => s.id === activeSection)!.icon, { className: "w-5 h-5" })
            )}
            {sections.find(s => s.id === activeSection)?.label}
          </CardTitle>
          <CardDescription>
            {activeSection === 'basic' && 'Provide basic information about the institute'}
            {activeSection === 'contact' && 'Enter contact details for communication'}
            {activeSection === 'address' && 'Provide the physical address of the institute'}
            {activeSection === 'details' && 'Add specific details about the institution'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderSectionContent()}
        </CardContent>
      </Card>

      {/* Navigation & Submit */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === activeSection)
            if (currentIndex > 0) {
              setActiveSection(sections[currentIndex - 1].id)
            }
          }}
          disabled={activeSection === 'basic'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {activeSection !== 'details' ? (
            <Button
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection)
                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id)
                }
              }}
            >
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                  Adding Institute...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Institute
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default AddInstitute;