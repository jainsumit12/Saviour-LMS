"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Textarea } from "../../../ui/textarea";
import { Badge } from "../../../ui/badge";
import { Building2, MapPin, Phone, Users, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  instituteSchema_1,
  instituteSchema_2,
  instituteSchema_3,
  instituteSchema_4,
  fullInstituteSchema,
} from "@/utils/validation-schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomField from "@/components/reusableComponents/customField";
interface InstituteFormData {
  name: string;
  type: string;
  establishedYear: string;
  accreditation: string;
  website: string;
  email: string;
  phone: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  description: string;
  specialization: string[];
  studentCapacity: string;
  facultyCount: string;
}

const instituteTypes = [
  "University",
  "College",
  "Institute",
  "Academy",
  "School",
  "Training Center",
  "Online Platform",
  "Research Institution",
];

const specializations = [
  "Engineering & Technology",
  "Medical & Healthcare",
  "Business & Management",
  "Arts & Sciences",
  "Law & Legal Studies",
  "Education & Teaching",
  "Computer Science & IT",
  "Design & Creative Arts",
  "Agriculture & Life Sciences",
  "Social Sciences",
  "Languages & Literature",
  "Mathematics & Statistics",
];

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "Malaysia",
  "UAE",
];
const schemas = [
  instituteSchema_1,
  instituteSchema_2,
  instituteSchema_3,
  instituteSchema_4,
];
function AddInstitute() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  const form = useForm({
    resolver: zodResolver(schemas[activeSection]),
    defaultValues: {
      name: "",
      website: "",
      contactPersonName: "",
      contactPersonEmail: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      contactPersonPhone: "",
      establishedYear: "",
      accreditation: "",
      description: "",
    },
  });

  const handleSpecializationToggle = (spec: string) => {
    const updated = selectedSpecializations.includes(spec)
      ? selectedSpecializations.filter((s) => s !== spec)
      : [...selectedSpecializations, spec];

    setSelectedSpecializations(updated);
    form.setValue("specializations", updated);
  };

  const handleFormSubmit = (data: any) => {
    console.log("✅ Form Data Submitted:", data);
    setActiveSection((prev) => prev + 1);
   
  };

  const sections = [
    { id: "basic", label: "Basic Information", icon: Building2 },
    { id: "contact", label: "Contact Details", icon: Phone },
    { id: "address", label: "Address Information", icon: MapPin },
    { id: "details", label: "Institution Details", icon: Users },
  ];

  const cardDescriptions = [
    "Provide basic information about the institute",
    "Enter contact details for communication",
    "Provide the physical address of the institute",
    "Add specific details about the institution",
  ];

  const renderBasicInformation = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CustomField
          isLoading={false}
          control={form.control}
          name="name"
          label="Institute Name"
          placeholder="Enter institute name"
        />
        {/* <CustomField
          control={form.control}
          name="type"
          label="Institute Type"
          placeholder="Select institute type"
          type="select"
          options={instituteTypes.map((type) => ({
            label: type,
            value: type,
          }))}
        /> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CustomField
          isLoading={false}
          control={form.control}
          name="establishedYear"
          label="Established Year"
          placeholder="e.g., 1995"
          type="number"
        />
        <CustomField
          isLoading={false}
          control={form.control}
          name="accreditation"
          label="Accreditation"
          placeholder="e.g., NAAC A+, UGC Approved"
        />
      </div>

      <CustomField
        isLoading={false}
        control={form.control}
        name="website"
        label="Website"
        placeholder="https://www.example.com"
        type="url"
      />

      <CustomField
        isLoading={false}
        control={form.control}
        name="description"
        label="Description"
        placeholder="Brief description of the institute"
        type="textarea"
      />
    </div>
  );

  const renderContactDetails = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CustomField
          isLoading={false}
          control={form.control}
          name="contactPersonEmail"
          label="Primary Email"
          placeholder="contact@institute.edu"
          type="email"
        />
        <CustomField
          isLoading={false}
          control={form.control}
          name="contactPersonPhone"
          label="Primary Phone"
          placeholder="+1 (555) 123-4567"
          type="tel"
        />
      </div>

      <CustomField
        isLoading={false}
        control={form.control}
        name="alternatePhone"
        label="Alternate Phone"
        placeholder="+1 (555) 987-6543"
        type="tel"
      />
    </div>
  );

  const renderAddressInformation = () => (
    <div className="space-y-4">
      <CustomField
        isLoading={false}
        control={form.control}
        name="address"
        label="Street Address"
        placeholder="Enter complete address"
        type="textarea"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <CustomField
          isLoading={false}
          control={form.control}
          name="city"
          label="City"
          placeholder="Enter city"
        />
        <CustomField
          isLoading={false}
          control={form.control}
          name="state"
          label="State/Province"
          placeholder="Enter state or province"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* <CustomField
          control={form.control}
          name="country"
          label="Country"
          placeholder="Select country"
          type="select"
          options={countries.map((c) => ({ label: c, value: c }))}
        /> */}
        <CustomField
          isLoading={false}
          control={form.control}
          name="postalCode"
          label="ZIP/Postal Code"
          placeholder="Enter ZIP code"
        />
      </div>
    </div>
  );

  const renderInstitutionDetails = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Specializations *</p>
        <p className="text-sm text-muted-foreground">
          Select areas of expertise for your institute
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {specializations.map((spec) => (
            <div
              key={spec}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedSpecializations.includes(spec)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleSpecializationToggle(spec)}
            >
              <div className="text-sm font-medium">{spec}</div>
            </div>
          ))}
        </div>

        {selectedSpecializations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSpecializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CustomField
          isLoading={false}
          control={form.control}
          name="studentCapacity"
          label="Student Capacity"
          placeholder="e.g., 5000"
          type="number"
        />
        <CustomField
          isLoading={false}
          control={form.control}
          name="facultyCount"
          label="Faculty Count"
          placeholder="e.g., 200"
          type="number"
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 0:
        return renderBasicInformation();
      case 1:
        return renderContactDetails();
      case 2:
        return renderAddressInformation();
      case 3:
        return renderInstitutionDetails();
      default:
        return renderBasicInformation();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add New Institute</h1>
        <p className="text-muted-foreground">
          Register a new educational institute on the platform
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 cursor-pointer ${
                    activeSection === index
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                  onClick={() => setActiveSection(index)}
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
            <h3 className="font-medium">{sections[activeSection].label}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle />
          <CardDescription>{cardDescriptions[activeSection]}</CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form
              id="instituteForm"
              onSubmit={form.handleSubmit(handleFormSubmit)}
            >
              {renderSectionContent()}
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setActiveSection((prev) => prev - 1)}
          disabled={activeSection === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {activeSection < sections.length - 1 ? (
            <Button form="instituteForm" type="submit">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button form="instituteForm" type="submit">
              {/* <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                  Adding Institute...
                </> */}
              <Save className="w-4 h-4 mr-2" />
              Add Institute
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddInstitute;
