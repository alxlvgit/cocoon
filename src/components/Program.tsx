const program = {
    "ProgramName": "Digital Photography",
    "TuitionDomestic": "$2,100*",
    "Intakes": [
        "January",
        "April",
        "September"
    ],
    "Degree": "Statement of Completion",
    "RequiredCourses": [
        {
            "CourseName": "Raster Graphics: Adobe Photoshop",
            "Credits": 3.0
        },
        {
            "CourseName": "Photography 1",
            "Credits": 1.5
        },
        {
            "CourseName": "Digital Darkroom",
            "Credits": 1.5
        },
        {
            "CourseName": "Photography 2",
            "Credits": 1.5
        }
    ],
    "TotalCredits": 7.5,
    "Delivery": "Blended",
    "Contact": {
        "Name": "Gabriela Silva-Paula",
        "Role": "Program Assistant, Digital Arts",
        "Phone": "604-432-8248",
        "Email": "Gabriela_SilvaPaula@bcit.ca"
    }
};

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

interface ProgramProps {
    ProgramName: string;
    TuitionDomestic: string;
    Intakes: string[];
    Degree: string;
    RequiredCourses: RequiredCourses[];
    TotalCredits: number;
    Delivery: string;
    Contact: Contact;
};


export default function Program(programProps: ProgramProps) {
    let intakeString = "";
    intakeString = programProps.Intakes.join(", ");
    
    return (
        <div className="flex flex-col bg-gray-400 rounded-lg m-3">
            <h2 className="m-3 font-bold">{programProps.ProgramName}</h2>
            <div className="flex flex-row justify-between m-3">
                <p>Tuition Domestic: {programProps.TuitionDomestic}</p>
                <p>Degree: {programProps.Degree}</p>
            </div>
            <p className="m-3">Intakes: {intakeString}</p>
        </div>
    )
}