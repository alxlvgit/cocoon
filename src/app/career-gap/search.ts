require("dotenv").config()
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { HNSWLib } from "langchain/vectorstores/hnswlib"

const search = async (text: string) => {
    try {
        const programsVectorStore = await HNSWLib.load("programs", new OpenAIEmbeddings())
        const coursesVectorStore = await HNSWLib.load("courses", new OpenAIEmbeddings())

        const programResults = await programsVectorStore.similaritySearch(text, 6) // returns only 2 entries
        const courseResults = await coursesVectorStore.similaritySearch(text, 6) // returns only 2 entries

        programResults.forEach((r) => {
            console.log(r.pageContent.match(/Program Name:(.*)/)?.[0]) // Use regex to extract the title from the result text
        })

        courseResults.forEach((r) => {
            console.log(r.pageContent.match(/Course Name:(.*)/)?.[0]) // Use regex to extract the title from the result text
        })
    } catch (error) {
        console.error(error)
    }
}