import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate("creator")

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
      error: error,
    })
  }
}
