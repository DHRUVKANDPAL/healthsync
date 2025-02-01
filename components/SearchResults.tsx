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
} from "lucide-react";
import { triage } from "@/lib/gemini";
import {  StarHalf, Star as StarOutline } from "lucide-react";
import { Slider } from "./ui/slider";

// Types based on the API response
interface HospitalFacilities {
  beds: {
    total: number;
    available: number;
    shared: number;
    generalWard: number;
  };
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
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
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
          body: JSON.stringify({ departments: response.possible_departments }),
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

  const filteredDoctors = allDoctors.filter(
    (doctor) =>
      (!selectedDepartment || doctor.departmentName === selectedDepartment) &&
      doctor.consulationFees <= maxFees &&
      doctor.ratings >= minRating
  );
 

  const StarRating = ({ rating }:{rating:number}) => {
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
    <Card className="group relative transition-all duration-300 hover:shadow-xl dark:hover:shadow-teal-500/20 hover:scale-[1.02]">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <Avatar className="h-12 w-12 border-2 border-teal-500/20">
              <AvatarImage src={doctor.imageUrl || "/api/placeholder/64/64"} />
              <AvatarFallback className="bg-teal-500/10">
                {doctor.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-primary">
                {doctor.name}
              </CardTitle>
              <Badge variant="outline" className="mt-1">
                <Stethoscope className="w-3 h-3 mr-1" />
                {doctor.departmentName}
              </Badge>
            </div>
          </div>
          <Badge
            variant={doctor.isAvailable ? "default" : "secondary"}
            className={`${
              doctor.isAvailable
                ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300"
                : ""
            }`}
          >
            {doctor.isAvailable ? (
              <Clock className="w-3 h-3 mr-1 animate-pulse" />
            ) : null}
            {doctor.isAvailable ? "Available Now" : "Unavailable"}
          </Badge>
        </div>

        <div className="space-y-2">
          <CardDescription className="flex items-center text-sm">
            <Building className="w-4 h-4 mr-2 text-muted-foreground" />
            {doctor.hospitalName}
          </CardDescription>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              {doctor.contactno}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Mail className="w-4 h-4 mr-2" />
              <span title={doctor.email}>
                {doctor.email.length > 30
                  ? doctor.email.slice(0, 27) + "..."
                  : doctor.email}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-between items-center bg-muted/50 pt-4">
        <StarRating rating={doctor.ratings} />;
        <div className="flex items-center">
          <Badge className="mr-2 bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300">
            <IndianRupee className="w-3 h-3 mr-1" />
            {doctor.consulationFees}
          </Badge>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
    <Card className="group transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-500/20 hover:scale-[1.02]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg font-semibold text-primary">
                {hospital.hospitalInfo.name}
              </CardTitle>
              {hospital.hospitalInfo.isVerified && (
                <Badge
                  variant="default"
                  className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {hospital.hospitalInfo.City}, {hospital.hospitalInfo.State}
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
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
              className="bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
            >
              {dept.departmentName}
              <span className="ml-1 text-xs opacity-70">
                (₹{dept.statistics.minFees}-{dept.statistics.maxFees})
              </span>
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              {hospital.statistics.totalRelevantDoctors} Doctors Available
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              {hospital.hospitalInfo.contactno}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="w-4 h-4 mr-2" />
              {hospital.hospitalInfo.email}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="w-4 h-4 mr-2" />
              {hospital.hospitalInfo.Website}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center bg-muted/50 pt-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            OPD: {hospital.hospitalInfo.facilities.opd.available}/
            {hospital.hospitalInfo.facilities.opd.total}
          </Badge>
          <Badge variant="outline">
            ICU: {hospital.hospitalInfo.facilities.icu.available}/
            {hospital.hospitalInfo.facilities.icu.total}
          </Badge>
        </div>
        <div className="flex items-center">
          <Badge className="mr-2 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
            <IndianRupee className="w-3 h-3 mr-1" />
            Avg. {Math.round(hospital.statistics.averageFeesAcrossDepartments)}
          </Badge>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
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
              <p className="text-muted-foreground text-sm pb-2">Interpretation : {interpretation}</p>
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
    <div className="container mx-auto py-8 px-4 space-y-8 ">
      {/* Tabs */}
      <TabSwitcher />

      {/* Suggested Departments */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold">Suggested Departments</h3>
          <p className="text-muted-foreground text-sm pb-2">
            Interpretation : {interpretation}
          </p>
        </div>
        {/* <p>{interpretation}</p> */}
        <div className="flex flex-wrap gap-3">
          {departmentSuggestions.map((dept) => (
            <Badge
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() =>
                setSelectedDepartment(selectedDepartment === dept ? null : dept)
              }
            >
              {dept}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filters (Doctors Only) */}
      {activeTab === "doctors" && (
        <Card className="bg-background border-border ">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              Refine Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consultation Fees Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/80">
                    Maximum Consultation Fees
                  </h3>
                  <span className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400">
                    <IndianRupee className="w-3 h-3 mr-1" />
                    {maxFees}
                  </span>
                </div>
                <div className="px-1">
                  <Slider
                    defaultValue={[maxFees]}
                    max={2000}
                    min={100}
                    step={100}
                    value={[maxFees]}
                    onValueChange={(value) => setMaxFees(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">₹100</span>
                    <span className="text-xs text-muted-foreground">₹2000</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/80">
                    Minimum Rating
                  </h3>
                  <span className="flex items-center text-sm font-semibold text-amber-500">
                    <Star className="w-3 h-3 mr-1 fill-amber-500" />
                    {minRating.toFixed(1)}
                  </span>
                </div>
                <div className="px-1">
                  <Slider
                    defaultValue={[minRating]}
                    max={5}
                    min={0}
                    step={0.5}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">0</span>
                    <span className="text-xs text-muted-foreground">5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Stats */}
            <div className="pt-4 mt-6 border-t border-border">
              <p className="text-sm text-center text-muted-foreground">
                Showing doctors with consultation fees up to ₹{maxFees} and
                minimum rating of {minRating} stars
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Doctor & Hospital Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeTab === "doctors" &&
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.doctorId} doctor={doctor} />
          ))}
        {activeTab === "hospitals" &&
          searchResults?.hospitals.map((hospital) => (
            <HospitalCard key={hospital.hospitalInfo.id} hospital={hospital} />
          ))}
      </div>
    </div>
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
