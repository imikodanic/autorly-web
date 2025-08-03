"use client";

import { useState } from "react";
import { Sparkles, ImageIcon, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GeneratePostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onGenerate: (content: string, imageUrl?: string) => void;
}

const postTypes = [
    { value: "insight", label: "Industry Insight" },
    { value: "tip", label: "Professional Tip" },
    { value: "story", label: "Personal Story" },
    { value: "question", label: "Engagement Question" },
    { value: "announcement", label: "Company Update" },
];

const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "inspiring", label: "Inspiring" },
    { value: "educational", label: "Educational" },
];

export function GeneratePostDialog({ open, onOpenChange, onGenerate }: GeneratePostDialogProps) {
    const [prompt, setPrompt] = useState("");
    const [postType, setPostType] = useState("");
    const [tone, setTone] = useState("");
    const [includeImage, setIncludeImage] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);

        // Simulate AI generation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockContent = `🚀 ${prompt}

Here's what I've learned from this experience:

✅ Key insight #1: Always focus on value first
✅ Key insight #2: Consistency beats perfection
✅ Key insight #3: Community is everything

What's your experience with this? Drop your thoughts below! 👇

#LinkedIn #AI #SaaS #Automation`;

        setGeneratedContent(mockContent);
        setIsGenerating(false);
    };

    const handleSave = () => {
        fetch("/api/linkedin/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: generatedContent,
            }),
        });

        const imageUrl = includeImage ? "/placeholder.svg?height=300&width=500" : undefined;
        onGenerate(generatedContent, imageUrl);
        onOpenChange(false);
        setPrompt("");
        setGeneratedContent("");
        setPostType("");
        setTone("");
        setIncludeImage(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        Generate LinkedIn Post
                    </DialogTitle>
                    <DialogDescription>
                        Use AI to create engaging LinkedIn content tailored to your audience
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="post-type">Post Type</Label>
                            <Select value={postType} onValueChange={setPostType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select post type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {postTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tone">Tone</Label>
                            <Select value={tone} onValueChange={setTone}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select tone" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tones.map((t) => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prompt">What would you like to post about?</Label>
                        <Textarea
                            id="prompt"
                            placeholder="e.g., Share insights about building a SaaS product, discuss the latest AI trends, or tell a story about overcoming challenges..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="include-image"
                            checked={includeImage}
                            onChange={(e) => setIncludeImage(e.target.checked)}
                            className="rounded"
                        />
                        <Label htmlFor="include-image" className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Generate accompanying image
                        </Label>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Post
                                </>
                            )}
                        </Button>
                    </div>

                    {generatedContent && (
                        <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                                <Label>Generated Content</Label>
                                <Badge variant="secondary">AI Generated</Badge>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <div className="whitespace-pre-wrap text-sm">
                                    {generatedContent}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Publish
                                </Button>
                                <Button variant="outline" onClick={handleGenerate}>
                                    Regenerate
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
