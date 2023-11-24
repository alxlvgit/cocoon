export type Contact = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type Course = {
  courseCode: string;
  url: string;
  courseName: string;
  format?: string;
  prerequisites?: string;
  credits?: number;
  cost?: string;
  duration?: string;
  crn?: string;
  classTimes?: string;
  instructor: string;
  importantInfo?: string;
  status?: string;
  terms?: string[];
  campus?: string[];
  offerings?: CourseOffering[];
  tuition?: string;
  schedule?: {
    date: string;
    day: string;
    time: string;
    location: string;
  }[];
};

export type CourseOffering = {
  crn: string;
  duration: string;
  tuition: string;
  schedule: {
    date: string;
    day: string;
    time: string;
    location: string;
  }[];
  instructor: string;
  status: string;
};

export type Program = {
  programName: string;
  tuitionDomestic?: string;
  url: string;
  tuition?: {
    domestic?: {
      twoTerms: string;
      threeTerms: string;
    };
    international?: {
      twoTerms: string;
      threeTerms: string;
    };
  };
  intakes: string[];
  degree: string;
  requiredCourses?: {
    courseName: string;
    credits: number;
  }[];
  totalCredits?: number;
  delivery: string;
  contact: Contact;
};

export type SemanticSearchResult = {
  pageContent: string;
  metadata: {
    id: number;
  };
};
