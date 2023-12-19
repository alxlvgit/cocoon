# Cocoon
Cocoon is an AI-driven app designed to help you switch careers seamlessly. 

## What it does
It scans your resume to identify your skills and then uses open job data, Udemy courses, and college programs to create a tailored roadmap for your new career. By finding transferable skills and suggesting relevant courses, Cocoon makes it easier to fill skill gaps and prepare for a successful transition.

## Tech Stack
- TypeScript
- Next.js
- Tailwind CSS
- Redux
- AWS Lambda
- Amazon Textract
- LangChain
- Open AI API
- Udemy Affiliate API
- Google Docs API
- O*NET Web Services API
- Chart.js
- daisyUI
- mammoth 
- react-pdf 
- Drizzle ORM
- Neon
- PostgreSQL

## Key Features:
- **Resume Parsing**:
    - Utilizes Amazon Textract, Mammoth, and Google Docs API for extracting information from resumes uploaded in PDF, DOCX, or Google Docs format.
 - **Career Information**:
    - Integrates O*NET Web Services API to provide detailed career information.
    - Offers users a comprehensive view of various careers, including essential details and requirements.
- **Text to Structured Data Conversion**:
    - Employs LangChain and Open AI function calling model for turning the text into structured data.
    - Extracts skills and qualifications from parsed resume text, as well as duties and responsibilities from career descriptions.
- **Semantic Search**:
    - Employs LangChain and Open AI embedding model for semantic search functionality.
    - Matches skills and qualifications from resumes with duties and responsibilities from career descriptions.
    - Identifies relevant courses and programs for users to fill skill gaps and prepare for a successful transition.
- **Udemy Courses Integration**:
    - Utilizes Udemy Affiliate API to provide users with relevant courses.
    - Links users with a variety of educational resources from the Udemy database.
- **User Dashboard**:
    - Enables users to view their learning path and track their progress.
