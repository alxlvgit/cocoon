import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { NextResponse } from "next/server"
import programAndCourseData from "../../../programs-data/programsData.json"

const programs = programAndCourseData.programs;
const courses = programAndCourseData.courses;


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const q = searchParams.get("q")

    if (!q) {
        return new NextResponse(JSON.stringify({ message: "Missing query" }), {
            status: 400,
        })
    }

    const vectorStore = await HNSWLib.load("programs", new OpenAIEmbeddings())
    // const courseVectorStore = await HNSWLib.load("courses", new OpenAIEmbeddings())

    const searchResult = await vectorStore.similaritySearch(q, 4)
    // const courseSearchResult = await courseVectorStore.similaritySearch(q, 2)

    const searchResultIds = searchResult.map((r) => r.metadata.id)
    // const courseSearchResultIds = courseSearchResult.map((r) => r.metadata.id)

    let results = programs.filter((program) => searchResultIds.includes(program.ProgramName))
    // let courseResults = courses.filter((course) => courseSearchResultIds.includes(course.CourseName))

    return NextResponse.json({ results })
}
