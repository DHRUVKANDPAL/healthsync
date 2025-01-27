export interface Department {
  deptId: string;
  dept: {
    name: string;
  };
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  dob?: string;
  aadharNo?: string;
  licenceNo: string;
  contactno?: string;
  email?: string;
  createdAt?: string;
  departments: Department[];
}