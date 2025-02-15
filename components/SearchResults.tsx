import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Check,
  Star,
  Calendar,
  Users,
  Stethoscope,
  Building,
  Clock,
  IndianRupee,
  ChevronRight,
  Search,
  Activity,
  SlidersHorizontal,
  LandPlot,
} from "lucide-react";
import { triage } from "@/lib/gemini";
import { StarHalf, Star as StarOutline } from "lucide-react";
import { Slider } from "./ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "./Footer";
import Link from "next/link";
// Types based on the API response
interface HospitalFacilities {
  beds: {
    total: number;
    available: number;
    shared: number;
    generalWard: number;
  };
  singleRoom: { total: number; available: number };
  opd: { total: number; available: number };
  icu: { total: number; available: number };
  labs: { total: number; available: number };
  doctors: { total: number; available: number };
}

interface HospitalInfo {
  id: string;
  name: string;
  imageUrl: string | null;
  licenceno: string;
  estyear: number;
  Website: string;
  contactno: string;
  alternatecontactno: string;
  email: string;
  address: string;
  City: string;
  State: string;
  Zipcode: string;
  facilities: HospitalFacilities;
  anyotherdetails: string | null;
  isVerified: boolean;
  dist: number;
}

interface DepartmentStatistics {
  minFees: number;
  maxFees: number;
  averageFees: number;
  totalDoctors: number;
  availableDoctors: number;
}

interface Doctor {
  doctorId: string;
  name: string;
  imageUrl: string;
  contactno: string;
  email: string;
  consulationFees: number;
  isAvailable: boolean;
  ratings: number;
}

interface Department {
  departmentId: string;
  departmentName: string;
  hod: string;
  statistics: DepartmentStatistics;
  doctors: Doctor[];
}

interface HospitalStatistics {
  totalRelevantDepartments: number;
  totalRelevantDoctors: number;
  averageFeesAcrossDepartments: number;
  occupancyRates: {
    beds: string;
    opd: string;
    icu: string;
    labs: string;
  };
}

interface Hospital {
  hospitalInfo: HospitalInfo;
  statistics: HospitalStatistics;
  departments: Department[];
}

interface APIResponse {
  totalHospitals: number;
  hospitals: Hospital[];
}

interface SearchResultsProps {
  searchQuery: string;
  latitude: number;
  longitude: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  latitude,
  longitude,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<APIResponse | null>(null);
  const [allDoctors, setAllDoctors] = useState<
    (Doctor & { departmentName: string; hospitalName: string })[]
  >([]);
  const [activeTab, setActiveTab] = useState<"doctors" | "hospitals">(
    "doctors"
  );
  const [departmentSuggestions, setDepartmentSuggestions] = useState<string[]>(
    []
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [maxFees, setMaxFees] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(3);
  const [interpretation, setInterpretation] = useState<string>("");

  const [sortBy, setSortBy] = useState<string>("relevance");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const response = await triage(searchQuery);
        console.log("Gemini suggestions:", response);
        setDepartmentSuggestions(response.possible_departments);
        setInterpretation(response.interpration);
        const searchResponse = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            departments: response.possible_departments,
            latitude: latitude,
            longitude: longitude,
          }),
        });

        const data: APIResponse = await searchResponse.json();
        console.log("Search results:", data);
        setSearchResults(data);

        const doctors = data.hospitals.flatMap((hospital) =>
          hospital.departments.flatMap((dept) =>
            dept.doctors.map((doctor) => ({
              ...doctor,
              departmentName: dept.departmentName,
              hospitalName: hospital.hospitalInfo.name,
            }))
          )
        );
        // setAllDoctors(doctors);
        const uniqueDoctors = Array.from(
          new Map(doctors.map((doc) => [doc.doctorId, doc])).values()
        );

        setAllDoctors(uniqueDoctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  const filteredDoctors = allDoctors.filter((doctor) => {
    const departmentMatch =
      !selectedDepartment || doctor.departmentName === selectedDepartment;
    const feesMatch = doctor.consulationFees <= maxFees;
    const ratingMatch = doctor.ratings >= minRating;
    const availabilityMatch = !availableOnly || doctor.isAvailable;
    return departmentMatch && feesMatch && ratingMatch && availabilityMatch;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case "fees-low-high":
        return a.consulationFees - b.consulationFees;
      case "fees-high-low":
        return b.consulationFees - a.consulationFees;
      case "rating-high-low":
        return b.ratings - a.ratings;
      default:
        return 0;
    }
  });

  const FilterSidebar = ({ className }: { className?: string }) => (
    <div className={`space-y-4 ${className}`}>
      {/* Sort Options */}
      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="fees-low-high">Fees: Low to High</SelectItem>
              <SelectItem value="fees-high-low">Fees: High to Low</SelectItem>
              <SelectItem value="rating-high-low">
                Rating: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Filters Card */}
      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Department Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Department</h3>
            <div className="flex flex-wrap gap-2">
              {departmentSuggestions.map((dept) => (
                <Badge
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedDepartment(
                      selectedDepartment === dept ? null : dept
                    )
                  }
                >
                  {dept}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fees Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Consultation Fees</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Max Fee:</span>
                <span className="flex items-center text-sm font-semibold text-teal-600">
                  <IndianRupee className="w-3 h-3 mr-1" />
                  {maxFees}
                </span>
              </div>
              <Slider
                defaultValue={[maxFees]}
                max={2000}
                min={100}
                step={100}
                value={[maxFees]}
                onValueChange={(value) => setMaxFees(value[0])}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Rating</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Min Rating:</span>
                <span className="flex items-center text-sm font-semibold text-amber-500">
                  <Star className="w-3 h-3 mr-1 fill-amber-500" />
                  {minRating}
                </span>
              </div>
              <Slider
                defaultValue={[minRating]}
                max={5}
                min={0}
                step={0.5}
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
              />
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium">Additional Filters</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="available-only">Show Available Only</Label>
                  <Switch
                    id="available-only"
                    checked={availableOnly}
                    onCheckedChange={setAvailableOnly}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified-only">Show Verified Only</Label>
                  <Switch
                    id="verified-only"
                    checked={verifiedOnly}
                    onCheckedChange={setVerifiedOnly}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 !== 0; // Check for a half star
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex items-center space-x-1">
        {/* Fully Filled Stars */}
        {[...Array(filledStars)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-teal-500 text-teal-500 dark:fill-teal-400 dark:text-teal-400"
          />
        ))}

        {/* Half Star if needed */}
        {hasHalfStar && (
          <StarHalf className="w-4 h-4 fill-teal-500 text-teal-500 dark:fill-teal-400 dark:text-teal-400" />
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline
            key={`empty-${i}`}
            className="w-4 h-4 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
          />
        ))}

        {/* Display Numeric Rating */}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Usage Example:
  // Example rating

  const DoctorCard = ({
    doctor,
  }: {
    doctor: Doctor & { departmentName: string; hospitalName: string };
  }) => (
    <Link href={`/searched-doctors/${doctor.doctorId}`} passHref>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-teal-500/10 hover:-translate-y-1">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-teal-500/20 ring-offset-2 ring-offset-background">
                <AvatarImage
                  src={doctor.imageUrl || "/api/placeholder/64/64"}
                />
                <AvatarFallback className="bg-teal-500/10 text-teal-700 dark:text-teal-300">
                  {doctor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-primary">
                  {doctor.name}
                </CardTitle>
                <Badge variant="outline" className="inline-flex items-center">
                  <Stethoscope className="w-3 h-3 mr-1.5" />
                  {doctor.departmentName}
                </Badge>
              </div>
            </div>
            <Badge
              variant={doctor.isAvailable ? "default" : "secondary"}
              className={`self-start ${
                doctor.isAvailable
                  ? "bg-teal-500/10 text-teal-700 dark:text-teal-300 dark:bg-teal-500/20"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {doctor.isAvailable && (
                <Clock className="w-3 h-3 mr-1.5 animate-pulse" />
              )}
              {doctor.isAvailable ? "Available Now" : "Unavailable"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate" title={doctor.hospitalName}>
                {doctor.hospitalName}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{doctor.contactno}</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{doctor.email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="mt-auto flex justify-between items-center bg-muted/50 p-4 rounded-b-lg">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < doctor.ratings
                    ? "text-teal-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {doctor.ratings.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center">
            <Badge className="mr-2 bg-teal-500/10 text-teal-700 dark:text-teal-300 dark:bg-teal-500/20">
              <IndianRupee className="w-3 h-3 mr-1" />
              {doctor.consulationFees}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
    <Link
      href={`/searched-hospitals/${
        hospital.hospitalInfo.id
      }/${departmentSuggestions.join(",")}`}
      passHref
    >
      <Card className="group h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1 relative overflow-hidden">
        {/* Background Image with Gradient */}
        {hospital.hospitalInfo.imageUrl && (
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${hospital.hospitalInfo.imageUrl})`,
                maskImage:
                  "linear-gradient(to bottom, white 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, white 50%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-60% to-white dark:to-slate-950" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white dark:to-slate-950" />
          </div>
        )}

        {/* Card Content - Positioned Relatively */}
        <div className="relative z-10">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    {hospital.hospitalInfo.name}
                  </CardTitle>
                  {hospital.hospitalInfo.isVerified && (
                    <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 dark:bg-blue-500/20">
                      <Check className="w-3 h-3 mr-1.5" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-muted-foreground font-semibold">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {hospital.hospitalInfo.City}, {hospital.hospitalInfo.State}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="self-start whitespace-nowrap border-2 border-slate-800/25"
              >
                <Calendar className="w-3 h-3 mr-1.5" />
                Est. {hospital.hospitalInfo.estyear}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {hospital.departments.map((dept) => (
                <Badge
                  key={dept.departmentId}
                  variant="secondary"
                  className="bg-blue-500/5 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10 transition-colors"
                >
                  {dept.departmentName}
                  <span className="ml-1.5 text-xs opacity-70">
                    ₹{dept.statistics.minFees}-{dept.statistics.maxFees}
                  </span>
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {hospital.statistics.totalRelevantDoctors} Doctors Available
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {hospital.hospitalInfo.contactno}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {hospital.hospitalInfo.email}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{hospital.hospitalInfo.email}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {hospital.hospitalInfo.Website}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{hospital.hospitalInfo.Website}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-b-lg">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-background/50">
                Single Rooms:{" "}
                {hospital.hospitalInfo.facilities.singleRoom.available}/
                {hospital.hospitalInfo.facilities.singleRoom.total}
              </Badge>
              <Badge variant="outline" className="bg-background/50">
                ICU: {hospital.hospitalInfo.facilities.icu.available}/
                {hospital.hospitalInfo.facilities.icu.total}
              </Badge>
             
            </div>
            <div className="flex items-center justify-end">
              <Badge className="mr-1.5 bg-teal-500/10 text-teal-700 dark:text-teal-300 dark:bg-teal-500/20">
                <LandPlot className="w-3 h-3 mr-1" />
                {hospital.hospitalInfo.dist.toFixed(1) + " km"}
              </Badge>
              <Badge className="mr-1.5  bg-blue-500/10 text-blue-700 dark:text-blue-300 dark:bg-blue-500/20">
                <IndianRupee className="w-3 h-3 mr-1" />
                Avg.{" "}
                {Math.round(hospital.statistics.averageFeesAcrossDepartments)}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
  const TabSwitcher = () => (
    <div className="flex justify-center mb-8">
      <div className="inline-flex gap-2">
        <Button
          variant={activeTab === "doctors" ? "default" : "outline"}
          className={`px-8 ${
            activeTab === "doctors"
              ? "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              : ""
          }`}
          onClick={() => setActiveTab("doctors")}
        >
          <Users className="w-4 h-4 mr-2" />
          Doctors ({allDoctors.length})
        </Button>
        <Button
          variant={activeTab === "hospitals" ? "default" : "outline"}
          className={`px-8 ${
            activeTab === "hospitals"
              ? "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              : ""
          }`}
          onClick={() => setActiveTab("hospitals")}
        >
          <Building className="w-4 h-4 mr-2" />
          Hospitals ({searchResults?.totalHospitals || 0})
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingState />;
  }

  if (!searchQuery) {
    return null;
  }

  if (!loading && (!searchResults || searchResults.hospitals?.length === 0)) {
    return (
      <Card className="container mx-auto py-12 text-center">
        <CardContent>
          <p className="text-lg text-muted-foreground">
            No results found for "{searchQuery}"
          </p>
          <div className="container mx-auto py-8 px-4 space-y-8 ">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Suggested Departments</h3>
              <p className="text-muted-foreground text-sm pb-2">
                Interpretation : {interpretation}
              </p>
              <div className="flex flex-wrap gap-3">
                {departmentSuggestions.map((dept) => (
                  <Badge
                    key={dept}
                    variant={
                      selectedDepartment === dept ? "default" : "outline"
                    }
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() =>
                      setSelectedDepartment(
                        selectedDepartment === dept ? null : dept
                      )
                    }
                  >
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters & Sort
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] overflow-y-auto"
            >
              <div className="py-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tab Switcher */}
        <TabSwitcher />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSidebar />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Results Count and Interpretation */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {activeTab === "doctors"
                  ? `${sortedDoctors.length} Doctors Found`
                  : `${searchResults?.hospitals.length || 0} Hospitals Found`}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {interpretation}
              </p>
            </div>

            {/* Active Filters */}
            {(selectedDepartment ||
              availableOnly ||
              verifiedOnly ||
              maxFees < 2000 ||
              minRating > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDepartment && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Department: {selectedDepartment}
                  </Badge>
                )}
                {availableOnly && (
                  <Badge variant="secondary">Available Only</Badge>
                )}
                {verifiedOnly && (
                  <Badge variant="secondary">Verified Only</Badge>
                )}
                {maxFees < 2000 && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Max Fee: ₹{maxFees}
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Min Rating: {minRating}★
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {activeTab === "doctors" &&
                sortedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.doctorId} doctor={doctor} />
                ))}
              {activeTab === "hospitals" &&
                searchResults?.hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.hospitalInfo.id}
                    hospital={hospital}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
      <Footer />
    </>
  );
};

const LoadingState = () => (
  <div className="container mx-auto py-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <Card key={n} className="overflow-hidden">
          <div className="relative h-48">
            <Skeleton className="absolute inset-0" />
          </div>
          <CardContent className="pt-8">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-muted/50 mt-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

export default SearchResults;
