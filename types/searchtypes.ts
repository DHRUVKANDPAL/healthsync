// types/index.ts

// Doctor related types
export interface DoctorType {
  doctorId: string;
  name: string;
  imageUrl: string;
  dob: string;
  licenceNo: string;
  contactno: string;
  email: string;
  consulationFees: number;
  isAvailable: boolean;
  assignedAt: string;
  createdAt: string;
}

// Department related types
export interface DepartmentStatistics {
  minFees: number;
  maxFees: number;
  averageFees: number;
  totalDoctors: number;
  availableDoctors: number;
}

export interface DepartmentType {
  departmentId: string;
  departmentName: string;
  hod: string;
  createdAt: string;
  statistics: DepartmentStatistics;
  doctors: DoctorType[];
}

// Hospital related types
export interface HospitalInfo {
  id: string;
  name: string;
  address: string;
  contactNo: string;
  email: string;
  imageUrl: string;
  createdAt: string;
}

export interface HospitalStatistics {
  totalDepartments: number;
  totalDoctors: number;
  averageFeesAcrossDepartments: number;
}

export interface HospitalType {
  hospitalInfo: HospitalInfo;
  statistics: HospitalStatistics;
  departments: DepartmentType[];
}

// Search result types for the UI
export interface DoctorWithHospitalInfo extends DoctorType {
  hospitalName: string;
  departmentName: string;
}

export interface SearchResultsProps {
  searchQuery: string;
}