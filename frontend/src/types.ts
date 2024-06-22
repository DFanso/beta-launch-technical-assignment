export interface Employee {
    fullName: string;
    initials: string;
    displayName: string;
    gender: string;
    dateOfBirth: string; 
    email: string;
    mobileNumber: string;
    employeeId?: number;
    designation: string;
    employeeType: 'Full time' | 'Part time' | 'Contract';
    experience: number;
    joinedDate: string; 
    salary: number;
    personalNotes?: string;
  }