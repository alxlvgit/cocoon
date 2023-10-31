"use server"
require("dotenv").config()
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import programAndCourseData from "@/programs-data/programsData.json"

const programs = programAndCourseData.programs;
const courses = programAndCourseData.courses;

export async function generateProgramsEmbeddings() {
    try {
        const start = performance.now() / 1000

        // It reads the list of movies from our movies.json file.
        const textsToEmbed = programs.map(
            // For each movie, it generates a single string combining the title, year, actors, and storyline.
            (program) =>
                `ProgramName:${program.ProgramName}
                \n\nTuitionDomestic: ${program.TuitionDomestic}
                \n\nIntakes: ${program.Intakes.join(", ")}
                \n\nDegree: ${program.Degree}
                \n\nRequiredCourses: ${JSON.stringify(program.RequiredCourses)}
                \n\nTotalCredits: ${program.TotalCredits}
                \n\nDelivery: ${program.Delivery}
                \n\nContact: ${JSON.stringify(program.Contact)}
                \n\n`
        )

        // It creates an array of these strings (textsToEmbed) and an associated array of metadata (metadata). Each element in the metadata array is an object with an id field corresponding to the id of the movie.
        const metadata = programs.map((program) => ({ id: program.ProgramName }))

        // It creates a new instance of OpenAIEmbeddings which we'll use to convert our texts to embeddings.
        const embeddings = new OpenAIEmbeddings()

        // It uses the fromTexts method of the HNSWLib class to generate embeddings for each string in textsToEmbed and store them in a new vector store.
        const vectorStore = await HNSWLib.fromTexts(
            textsToEmbed,
            metadata,
            embeddings
        )

        // saves the embeddings in the ./movies directory in the root directory
        await vectorStore.save("programs")

        const end = performance.now() / 1000

        console.log(`Took ${(end - start).toFixed(2)}s`)

    } catch (error) {
        console.log(error)
    }
}

export async function generateCoursesEmbeddings() {
    try {
        const start = performance.now() / 1000

        // It reads the list of movies from our movies.json file.
        const textsToEmbed = courses.map(
            // For each movie, it generates a single string combining the title, year, actors, and storyline.
            (course) =>
                `CourseCode:${course.CourseCode}
                \n\nCourseName: ${course.CourseName}
                \n\nTerms: ${course.Terms?.join(',')}
                \n\nCampus: ${course.Campus?.join(',')}
                \n\nOfferings: ${JSON.stringify(course.Offerings)}
                \n\n`


        )

        // It creates an array of these strings (textsToEmbed) and an associated array of metadata (metadata). Each element in the metadata array is an object with an id field corresponding to the id of the movie.
        const metadata = courses.map((course) => ({ id: course.CourseCode }))

        // It creates a new instance of OpenAIEmbeddings which we'll use to convert our texts to embeddings.
        const embeddings = new OpenAIEmbeddings()

        // It uses the fromTexts method of the HNSWLib class to generate embeddings for each string in textsToEmbed and store them in a new vector store.
        const vectorStore = await HNSWLib.fromTexts(
            textsToEmbed,
            metadata,
            embeddings
        )

        // saves the embeddings in the ./movies directory in the root directory
        await vectorStore.save("courses")

        const end = performance.now() / 1000

        console.log(`Took ${(end - start).toFixed(2)}s`)

    } catch (error) {
        console.log(error)
    }
}