interface RequiredCourses {
    CourseName: string;
    Credits: number;
}

interface Contact {
    Name: string;
    Role: string;
    Phone: string;
    Email: string;
}

interface Schedule {
    Date: string;
    Day: string;
    Time: string;
    Location: string;
}

interface Offerings {
    CRN: string;
    Duration: string;
    Tuition: string;
    Schedule: Schedule[];
    Instructor: string;
    Status: string;
}

interface SearchResults {
    results: {
        programs: {

            ProgramName: string;
            TuitionDomestic: string;
            Intakes: string[];
            Degree: string;
            RequiredCourses: RequiredCourses[];
            TotalCredits: number;
            Delivery: string;
            Contact: Contact;
        }[],
        courses: {
            CourseCode: string;
            CourseName?: string;
            title?: string;
            Terms: string[];
            Campus: string[];
            Offerings: Offerings[];
            code: string;
            cost?: string;
            duration?: string;
        }[]
    }
}

interface Schedule {
    Date: string;
    Day: string;
    Time: string;
    Location: string;
}

interface Offerings {
    CRN: string;
    Duration: string;
    Tuition: string;
    Schedule: Schedule[];
    Instructor: string;
    Status: string;
}

interface CourseProps {
    CourseCode?: string;
    CourseName?: string;
    title?: string;
    Terms?: string[];
    Campus?: string[];
    Offerings?: Offerings[];
    code?: string;
    cost?: string;
    duration?: string;
}

interface RequiredCourses {
    CourseName: string;
    Credits: number;
}

interface Contact {
    Name: string;
    Role: string;
    Phone: string;
    Email: string;
}

interface Tuition {
    Domestic: {
        twoTerms: string;
        threeTerms: string;
    };
    International: {
        twoTerms: string;
        threeTerms: string;
    };
}

interface ProgramProps {
    ProgramName?: string;
    TuitionDomestic?: string;
    Tuition?: string | Tuition;
    Intakes?: string[];
    Degree?: string;
    RequiredCourses?: RequiredCourses[];
    TotalCredits?: number;
    Delivery?: string;
    Contact?: Contact;
}

export type { SearchResults, CourseProps, ProgramProps, Offerings }
