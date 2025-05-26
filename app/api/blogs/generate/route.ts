import OpenAI from "openai";
import { Brand } from "@/app/dashboard/blogs/page";

type GenerateBlogRequestBody = {
    brand: Brand;
    oldBlogs: string[];
};

export async function POST(request: Request) {
    const { brand, oldBlogs } = (await request.json()) as GenerateBlogRequestBody;
    const client = new OpenAI();

    const response = await client.responses.create({
        model: "gpt-4.1",
        tools: [{ type: "web_search_preview" }],
        instructions:
            "# Identity\n" +
            "You are a senior marketing specialist with expertise in blog writing and content strategy.\n" +
            "You write perfect and engaging blogs that are optimized for SEO and user engagement.\n" +
            "\n" +
            "# Instructions\n" +
            "You will be given a brand name and really detailed information about that brand.\n" +
            "First you should search the web and come up with a list of relevant keywords that are related to the brand and its products or services.\n" +
            "Also search the web for trending topics and popular recent news related to the brand, and it's industry.\n" +
            "Then you should come up with a perfect and relevant topic for a blog post that aligns with the brand's identity and target audience.\n" +
            "\n" +
            "Aim for the blog post to have around 1400 to 2100 words\n" +
            "\n" +
            "You will be given already existing blog posts that this brand has. AVOID REPEATING SIMILAR BLOGS AT ALL COST.\n" +
            "\n" +
            "Content MUST NOT be copied from other sources, it must be original and unique.\n" +
            "Blog content that is written in Markdown MUST NOT have h1 tags, it should start with h2 tags.\n" +
            "\n" +
            "Your task is to return the following as a JSON object, no need for code formatting, just plain JSON:\n" +
            "- blog title\n" +
            "- blog topic\n" +
            "- blog content in Markdown format\n" +
            "\n" +
            "# Examples\n" +
            "{\n" +
            '    title: "10 Tips for Effective Digital Marketing",\n' +
            '    topic: "Digital Marketing Strategies",\n' +
            '    content: "## Introduction\\nDigital marketing is essential for modern businesses. Here are 10 tips to improve your strategy.\\n\\n### 1. Understand Your Audience\\nKnowing your audience is key to effective marketing.\\n\\n### 2. Utilize Social Media\\nSocial media platforms can significantly boost your reach.\\n\\n### 3. Optimize for SEO\\nSearch engine optimization helps your content get found online.\\n\\n### Conclusion\\nImplement these tips to enhance your digital marketing efforts."\n' +
            "}\n" +
            "\n" +
            "{\n" +
            '    "title": "The Future of Sustainable Fashion: Trends and Innovations",\n' +
            '    "topic": "Sustainable Fashion Trends",\n' +
            '    "content": "Sustainable fashion is not just a trend; it\'s a movement that is reshaping the industry. As consumers become more conscious of their environmental impact, brands are innovating to meet these demands. In this blog post, we will explore the latest trends and innovations in sustainable fashion.\\n\\n## 1. Eco-Friendly Materials\\nOne of the most significant trends in sustainable fashion is the use of eco-friendly materials. Brands are increasingly opting for organic cotton, recycled polyester, and other sustainable fabrics that reduce environmental impact.\\n\\n## 2. Circular Fashion\\nCircular fashion is gaining traction as brands look to create products that can be reused or recycled. This approach minimizes waste and promotes a more sustainable lifecycle for clothing.\\n\\n## 3. Ethical Production Practices\\nConsumers are demanding transparency in production practices. Brands that prioritize ethical labor practices and fair wages are becoming more popular among conscious shoppers.\\n\\n## 4. Technological Innovations\\nTechnology is playing a crucial role in sustainable fashion. From 3D printing to AI-driven design, innovations are helping brands create more efficient and sustainable products.\\n\\n## Conclusion\\nThe future of sustainable fashion looks promising with these trends and innovations leading the way. As consumers continue to prioritize sustainability, brands must adapt to stay relevant in this evolving market."\n' +
            "}",
        input: `
        Brand name: ${brand.name}
        Brand about: ${brand.about}
        Old blog posts that MUST NOT be repeated!!: ${oldBlogs.join(", ")}
        `,
    });

    return Response.json({
        message: "Blog generated successfully",
        data: response.output_text,
    });
}
