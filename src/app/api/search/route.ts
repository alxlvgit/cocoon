import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { NextResponse } from "next/server"
import programAndCourseData from "../../../programs-data/programsData.json"
import { redirect } from "next/dist/server/api-utils";

const programs = programAndCourseData.programs;
const courses = programAndCourseData.courses;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const q = searchParams.get("q")

    if (!q) {
        
        return new NextResponse(null, {
            status: 302,
            headers: {
                Location: '/education',
            },
        });
    }

    const programVectorStore = await HNSWLib.load("programs", new OpenAIEmbeddings())
    const courseVectorStore = await HNSWLib.load("courses", new OpenAIEmbeddings())

    const programSearchResult = await programVectorStore.similaritySearch(q, 4)
    const courseSearchResult = await courseVectorStore.similaritySearch(q, 4)


    const programSearchResultIds = programSearchResult.map((r) => r.metadata.id)
    const courseSearchResultIds = courseSearchResult.map((r) => r.metadata.id)

    // console.log(programSearchResultIds)
    // console.log(courseSearchResultIds)

    let programResults = programSearchResultIds.map((id) => programs[id])
    let courseResults = courseSearchResultIds.map((id) => courses[id])
    
    // console.log(programResults)
    // console.log(courseResults)
    return NextResponse.json({ results: {programs: programResults, courses: courseResults }})
} 