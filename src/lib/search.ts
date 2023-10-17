import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
);
const index = client.initIndex("your_index_name");

const objects = [
  {
    objectID: 1,
    ProgramName: "Digital Photography",
    TuitionDomestic: "$2,100*",
    Intakes: ["January", "April", "September"],
    Degree: "Statement of Completion",
    RequiredCourses: [
      { CourseName: "Raster Graphics: Adobe Photoshop", Credits: 3.0 },
      { CourseName: "Photography 1", Credits: 1.5 },
      { CourseName: "Digital Darkroom", Credits: 1.5 },
      { CourseName: "Photography 2", Credits: 1.5 },
    ],
    TotalCredits: 7.5,
    Delivery: "Blended",
    Contact: {
      Name: "Gabriela Silva-Paula",
      Role: "Program Assistant, Digital Arts",
      Phone: "604-432-8248",
      Email: "Gabriela_SilvaPaula@bcit.ca",
    },
  },
  {
    objectID: 2,
    ProgramName: "Web Technologies",
    TuitionDomestic: "$5,000",
    Intakes: ["September", "January", "April"],
    Degree: "Associate Certificate",
    Delivery: "Online",
    Contact: {
      Name: "Gabriela Silva-Paula",
      Role: "Program Assistant, Digital Arts, Media and Design",
      Phone: "604-432-8248",
      Email: "gabriela_silvapaula@bcit.ca",
    },
  },
  {
    objectID: 3,
    ProgramName: "User Interface (UI) and User Experience (UX) Design",
    TuitionDomestic: "$3,000",
    Intakes: ["September", "January", "April"],
    Degree: "Associate Certificate",
    Delivery: "Online",
    Contact: {
      Name: "Gabriela Silva-Paula",
      Role: "Program Assistant, Digital Arts, Media and Design",
      Phone: "604-432-8248",
      Email: "gabriela_silvapaula@bcit.ca",
    },
  },
  {
    objectID: 4,
    ProgramName: "Graphic Design Foundations",
    TuitionDomestic: "$2,700",
    Intakes: ["September", "January", "April"],
    Degree: "Associate Certificate",
    Delivery: "Burnaby, Vancouver, Online",
    Contact: {
      Name: "Gabriela Silva-Paula",
      Role: "Program Assistant, Digital Arts, Media and Design",
      Phone: "604-432-8248",
      Email: "gabriela_silvapaula@bcit.ca",
    },
  },
  {
    objectID: 5,
    ProgramName: "Media Techniques for Business",
    TuitionDomestic: "$9,000",
    Intakes: ["September", "January", "April"],
    Degree: "Certificate",
    Contact: {
      Name: "Gabriela Silva-Paula",
      Role: "Program Assistant, Digital Arts, Media and Design",
      Phone: "604-432-8248",
      Email: "gabriela_silvapaula@bcit.ca",
    },
  },
  {
    objectID: 6,
    ProgramName: "Media Techniques and Marketing Communications",
    TuitionDomestic: "$9,500",
    Intakes: ["September", "January", "April"],
    Degree: "Certificate",
  },
];

const test = () => {
  index
    .saveObjects(objects)
    .then(({ objectIDs }) => {
      console.log(objectIDs);
    })
    .catch((err) => {
      console.log(err);
    });
  const keywords = [
    "BS in Electrical Engineering",
    "BS in Biometric Systems",
    "Research Assistant",
    "Co-op Intern",
    "Biometrics Engineer / Sysadmin Intern",
    "BS in Computer Science",
    "BS in Computer Engineering",
    "Sysadmin Intern",
    "Sysadmin",
    "Biometrics",
    "Engineer",
    "Computer Science",
    "Drawing",
    "Figma",
    "Adobe Tools",
  ];

  keywords.forEach((keyword) => {
    index
      .search(keyword)
      .then(({ hits }) => {
        console.log(hits, "hits");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default test;
