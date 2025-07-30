"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Award,
  Download,
  Share2,
  Search,
  Calendar,
  Building2,
  User,
  Trophy,
  Star,
  Medal,
  Target,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

function StudentCertificates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const certificates = [
    {
      id: "1",
      title: "Digital Marketing Strategy Certification",
      course: "Digital Marketing Strategy",
      institute: "Marketing Academy",
      instructor: "John Davis",
      completionDate: "2024-01-15",
      issueDate: "2024-01-16",
      category: "Marketing",
      type: "completion",
      grade: 92,
      credentialId: "DMS-2024-001",
      verificationUrl: "https://verify.marketingacademy.com/DMS-2024-001",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      skills: [
        "Digital Marketing",
        "SEO",
        "Social Media Marketing",
        "Content Strategy",
      ],
      validUntil: "2027-01-15",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "React Development Excellence",
      course: "Advanced React Development",
      institute: "Tech University",
      instructor: "Dr. Michael Chen",
      completionDate: "2024-01-20",
      issueDate: "2024-01-21",
      category: "Programming",
      type: "achievement",
      grade: 88,
      credentialId: "REACT-2024-045",
      verificationUrl: "https://verify.techuniversity.com/REACT-2024-045",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      skills: [
        "React.js",
        "Hooks",
        "State Management",
        "Component Architecture",
      ],
      validUntil: null,
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Perfect Attendance Award",
      course: "Data Science Fundamentals",
      institute: "Analytics Institute",
      instructor: "Prof. Sarah Williams",
      completionDate: "2024-01-18",
      issueDate: "2024-01-18",
      category: "Data Science",
      type: "achievement",
      grade: null,
      credentialId: "ATT-2024-012",
      verificationUrl: "https://verify.analyticsinstitute.com/ATT-2024-012",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      skills: [],
      validUntil: null,
      downloadUrl: "#",
    },
  ];

  const achievements = [
    {
      id: "ach-1",
      title: "First Course Completion",
      description: "Successfully completed your first course",
      earnedDate: "2024-01-15",
      type: "milestone",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "ach-2",
      title: "High Achiever",
      description: "Scored above 90% in a course",
      earnedDate: "2024-01-15",
      type: "performance",
      icon: Star,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "ach-3",
      title: "Perfect Score",
      description: "Achieved 100% on an assignment",
      earnedDate: "2024-01-20",
      type: "performance",
      icon: Target,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "ach-4",
      title: "Week Streak",
      description: "Maintained 7-day learning streak",
      earnedDate: "2024-01-22",
      type: "engagement",
      icon: Medal,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const filteredCertificates = certificates
    .filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.institute.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        cert.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "grade":
          return (b.grade || 0) - (a.grade || 0);
        default:
          return 0;
      }
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "completion":
        return Award;
      case "achievement":
        return Star;
      default:
        return Award;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "completion":
        return "bg-green-100 text-green-800";
      case "achievement":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = (certificate: any) => {
    // In a real app, this would download the certificate PDF
    console.log("Downloading certificate:", certificate.id);
  };

  const handleShare = (certificate: any) => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: `I've earned the ${certificate.title} from ${certificate.institute}!`,
        url: certificate.verificationUrl,
      });
    } else {
      // Fallback: copy verification URL to clipboard
      navigator.clipboard.writeText(certificate.verificationUrl);
    }
  };

  const handleVerify = (certificate: any) => {
    window.open(certificate.verificationUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Certificates & Achievements</h2>
        <p className="text-muted-foreground">
          View your earned certificates and academic achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Certificates
                </p>
                <p className="text-2xl font-bold">{certificates.length}</p>
              </div>
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Achievements
                </p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Grade
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    certificates
                      .filter((c) => c.grade)
                      .reduce((acc, c) => acc + c.grade!, 0) /
                      certificates.filter((c) => c.grade).length
                  )}
                  %
                </p>
              </div>
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Skills Earned
                </p>
                <p className="text-2xl font-bold">
                  {certificates.reduce(
                    (acc, cert) => acc + cert.skills.length,
                    0
                  )}
                </p>
              </div>
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="grade">Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredCertificates.length} of {certificates.length}{" "}
              certificates
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Certificates */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Certificates</h3>

          {filteredCertificates.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium mb-2">No Certificates Found</h4>
                <p className="text-muted-foreground">
                  Complete courses to earn certificates.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCertificates.map((certificate) => {
              const TypeIcon = getTypeIcon(certificate.type);

              return (
                <Card key={certificate.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-48 h-32 md:h-auto">
                      <img
                        src={certificate.thumbnailUrl}
                        alt={certificate.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold mb-1">
                            {certificate.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {certificate.course}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {certificate.institute}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {certificate.instructor}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(certificate.issueDate)}
                            </span>
                          </div>
                        </div>

                        <Badge className={getTypeColor(certificate.type)}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {certificate.type}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {certificate.grade && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Grade:{" "}
                              </span>
                              <span className="font-medium text-green-600">
                                {certificate.grade}%
                              </span>
                            </div>
                          )}
                          <div className="text-sm">
                            <span className="text-muted-foreground">ID: </span>
                            <span className="font-mono text-xs">
                              {certificate.credentialId}
                            </span>
                          </div>
                        </div>
                      </div>

                      {certificate.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            Skills Demonstrated:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {certificate.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {certificate.validUntil ? (
                            <span>
                              Valid until {formatDate(certificate.validUntil)}
                            </span>
                          ) : (
                            <span>No expiration</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerify(certificate)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(certificate)}
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(certificate)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Achievements Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Achievements</h3>

          <Card>
            <CardContent className="p-4 space-y-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;

                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.color}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm">
                        {achievement.title}
                      </h5>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(achievement.earnedDate)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Next Goals */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Next Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Complete 5 Courses</p>
                  <p className="text-xs text-muted-foreground">2/5 completed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Maintain 95% Average</p>
                  <p className="text-xs text-muted-foreground">Current: 90%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentCertificates;
