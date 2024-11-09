import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { user, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: user,
            tag: tag,
            prompt: prompt,

        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })

    } catch (error) {
        return new Response("Failed to create Prompt!", { status: 500 })
    }
}