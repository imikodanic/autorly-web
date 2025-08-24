"use client";

import { useState, useEffect } from "react";
import { Sparkles, Calendar, Clock, Save, Send, Edit3, Loader2 } from "lucide-react";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface GeneratePostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPublish: (content: string) => void;
    onSchedule: (content: string, scheduledFor: Date) => void;
    onSaveDraft: (content: string) => void;
    onSave?: (content: string) => void; // Added onSave handler for scheduled posts
    isEditMode?: boolean;
    initialContent?: string;
    postStatus?: "published" | "scheduled" | "draft"; // Added postStatus prop
}

export function GeneratePostDialog({
    open,
    onOpenChange,
    onPublish,
    onSchedule,
    onSaveDraft,
    onSave, // Added onSave prop
    isEditMode = false,
    initialContent = "",
    postStatus, // Added postStatus prop
}: GeneratePostDialogProps) {
    const [step, setStep] = useState<"input" | "preview" | "schedule">(
        isEditMode ? "preview" : "input"
    );
    const [prompt, setPrompt] = useState("");
    const [contentMode, setContentMode] = useState<"user" | "autorly">("user");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(isEditMode ? initialContent : "");
    const [isEditing, setIsEditing] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedHour, setSelectedHour] = useState("9");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

    useEffect(() => {
        if (isEditMode && initialContent) {
            setGeneratedContent(initialContent);
            setStep("preview");
        } else if (!isEditMode) {
            setStep("input");
            setGeneratedContent("");
        }
    }, [isEditMode, initialContent]);

    const handleGenerate = async () => {
        setIsGenerating(true);

        const response = await fetch("/api/linkedin/posts/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: prompt,
            }),
        });

        const { data } = await response.json();

        setGeneratedContent(data.content);
        setIsGenerating(false);
        setStep("preview");
    };

    const handlePublishNow = () => {
        onPublish(generatedContent);
        handleClose();
    };

    const handleSaveAsDraft = () => {
        onSaveDraft(generatedContent);
        handleClose();
    };

    const handleScheduleClick = () => {
        setStep("schedule");
    };

    const handleScheduleConfirm = () => {
        if (!selectedDate) return;

        let hours = Number.parseInt(selectedHour);
        if (selectedPeriod === "PM" && hours !== 12) {
            hours += 12;
        } else if (selectedPeriod === "AM" && hours === 12) {
            hours = 0;
        }

        const scheduledDateTime = new Date(selectedDate);
        scheduledDateTime.setHours(hours, Number.parseInt(selectedMinute), 0, 0);

        onSchedule(generatedContent, scheduledDateTime);
        handleClose();
    };

    const handleSuggestedTimeClick = (hour: number, minute: number, period: "AM" | "PM") => {
        setSelectedHour(hour.toString());
        setSelectedMinute(minute.toString().padStart(2, "0"));
        setSelectedPeriod(period);
    };

    const handleClose = () => {
        onOpenChange(false);
        setStep(isEditMode ? "preview" : "input");
        setPrompt("");
        setContentMode("user");
        if (!isEditMode) {
            setGeneratedContent("");
        }
        setIsEditing(false);
        setSelectedDate(undefined);
        setSelectedHour("9");
        setSelectedMinute("00");
        setSelectedPeriod("AM");
    };

    const handleSave = () => {
        // Added handleSave function
        if (onSave) {
            onSave(generatedContent);
            handleClose();
        }
    };

    const suggestedTimes = [
        { hour: 8, minute: 0, period: "AM" as const, label: "Morning commute" },
        { hour: 12, minute: 0, period: "PM" as const, label: "Lunch break" },
        { hour: 5, minute: 0, period: "PM" as const, label: "End of workday" },
        { hour: 7, minute: 0, period: "PM" as const, label: "Evening engagement" },
    ];

    const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

    const minuteOptions = ["00", "15", "30", "45"];

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                handleClose();
                onOpenChange(isOpen);
            }}
        >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        {step === "input" && "Generate LinkedIn Post"}
                        {step === "preview" && (isEditMode ? "Edit Your Post" : "Review Your Post")}
                        {step === "schedule" && "Schedule Your Post"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "input" && "Choose how you want to create your LinkedIn post"}
                        {step === "preview" &&
                            (isEditMode
                                ? "Edit your post content and choose what to do next"
                                : "Review and edit your generated content before publishing")}
                        {step === "schedule" &&
                            "Choose when you want this post to be published on LinkedIn"}
                    </DialogDescription>
                </DialogHeader>

                {step === "input" && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Label>How would you like to create your post?</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setContentMode("user")}
                                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                                        contentMode === "user"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <div
                                                className={`font-medium ${contentMode === "user" ? "text-blue-900" : "text-gray-900"}`}
                                            >
                                                I&apos;ll provide a topic
                                            </div>
                                            <div
                                                className={`text-sm mt-1 ${contentMode === "user" ? "text-blue-700" : "text-gray-600"}`}
                                            >
                                                Tell us what you want to post about and we&apos;ll
                                                help you create engaging content
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setContentMode("autorly");
                                        setPrompt("");
                                    }}
                                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                                        contentMode === "autorly"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <div
                                                className={`font-medium ${contentMode === "autorly" ? "text-blue-900" : "text-gray-900"}`}
                                            >
                                                Let Autorly decide
                                            </div>
                                            <div
                                                className={`text-sm mt-1 ${contentMode === "autorly" ? "text-blue-700" : "text-gray-600"}`}
                                            >
                                                Give us complete control to choose the topic and
                                                create engaging content for you
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {contentMode === "user" && (
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
                        )}

                        <Button
                            onClick={handleGenerate}
                            disabled={(contentMode === "user" && !prompt.trim()) || isGenerating}
                            className="w-full bg-blue-600 hover:bg-blue-700"
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
                )}

                {step === "preview" && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>{isEditMode ? "Post Content" : "Generated Content"}</Label>
                                <div className="flex items-center gap-2">
                                    {!isEditMode && <Badge variant="secondary">AI Generated</Badge>}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <Edit3 className="h-4 w-4 mr-1" />
                                        {isEditing ? "Done" : "Edit"}
                                    </Button>
                                </div>
                            </div>

                            {isEditing ? (
                                <Textarea
                                    value={generatedContent}
                                    onChange={(e) => setGeneratedContent(e.target.value)}
                                    rows={12}
                                    className="font-mono text-sm"
                                />
                            ) : (
                                <div className="bg-muted p-4 rounded-lg">
                                    <div className="whitespace-pre-wrap text-sm">
                                        {generatedContent}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handlePublishNow}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Publish Now
                            </Button>
                            <Button
                                onClick={handleScheduleClick}
                                variant="outline"
                                className="flex-1 bg-transparent"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule
                            </Button>
                            {isEditMode && postStatus === "scheduled" ? (
                                <Button
                                    onClick={handleSave}
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSaveAsDraft}
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save as Draft
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {step === "schedule" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal bg-transparent"
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Select Time</Label>
                            <div className="flex gap-2">
                                <Select value={selectedHour} onValueChange={setSelectedHour}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Hour" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hourOptions.map((hour) => (
                                            <SelectItem key={hour} value={hour}>
                                                {hour}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Min" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {minuteOptions.map((minute) => (
                                            <SelectItem key={minute} value={minute}>
                                                {minute}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={selectedPeriod}
                                    onValueChange={(value: "AM" | "PM") => setSelectedPeriod(value)}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AM">AM</SelectItem>
                                        <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Selected: {selectedHour}:{selectedMinute} {selectedPeriod}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Suggested Times</Label>
                            <div className="grid grid-cols-1 gap-2">
                                {suggestedTimes.map((suggestion) => (
                                    <Button
                                        key={`${suggestion.hour}-${suggestion.period}`}
                                        variant="outline"
                                        size="sm"
                                        className="justify-start text-left h-auto p-3 bg-transparent"
                                        onClick={() =>
                                            handleSuggestedTimeClick(
                                                suggestion.hour,
                                                suggestion.minute,
                                                suggestion.period
                                            )
                                        }
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        <div>
                                            <div className="font-medium">
                                                {suggestion.hour}:
                                                {suggestion.minute.toString().padStart(2, "0")}{" "}
                                                {suggestion.period}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {suggestion.label}
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handleScheduleConfirm}
                                disabled={!selectedDate}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Post
                            </Button>
                            <Button variant="outline" onClick={() => setStep("preview")}>
                                Back
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
