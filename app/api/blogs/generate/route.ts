import OpenAI from "openai";


export async function POST(request: Request) {
    const client = new OpenAI();

    const response = await client.responses.create({
        model: "gpt-4.1",
        tools: [ { type: "web_search_preview" } ],
        instructions: "You are a marketing specialist. I will give you information about a product/brand, and I want you to search the news and trending topics that could be a good topic for a blog on their page.",
        input: "Autorly is a SaaS platform that uses large language models to automate content creation for digital marketing use cases. It is designed for early-stage startups, solo founders, small businesses, and lean marketing teams that need to publish consistent, high-quality written content but have limited time or copywriting resources. The platform generates blog posts, social media updates (e.g., LinkedIn, Twitter, Instagram), and branded content by combining AI-generated text with user-provided inputs (such as brand tone, keywords, or topic outlines). Autorly operates in the AI content automation and marketing technology (martech) industry, with a focus on delivering fast, relevant, and scalable content generation tailored to business goals.",
    });

    console.log(response.output_text);

    return Response.json({
        message: response.output_text,
        data: request,
    });
}