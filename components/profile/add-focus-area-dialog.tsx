"use client";

import { useState } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AddFocusAreaDialogProps {
    currentFocusAreas: string[];
    onAddFocusArea: (focusArea: string) => void;
}

const suggestedFocusAreas = [
    "Digital Marketing",
    "Content Strategy",
    "Social Media",
    "Brand Building",
    "Customer Experience",
    "Business Development",
    "Thought Leadership",
    "Industry Insights",
    "Professional Growth",
    "Networking",
    "Public Speaking",
    "Consulting",
    "Freelancing",
    "Remote Work",
    "Work-Life Balance",
    "Mental Health",
    "Diversity & Inclusion",
    "Sustainability",
    "Technology Trends",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Software Development",
    "UX/UI Design",
    "Project Management",
    "Agile Methodology",
    "Finance",
    "Investment",
    "Cryptocurrency",
    "Real Estate",
    "Healthcare",
    "Education",
    "Non-Profit",
    "Travel",
    "Food & Beverage",
    "Fashion",
    "Sports",
    "Entertainment",
    "Photography",
    "Writing",
];

export function AddFocusAreaDialog({ currentFocusAreas, onAddFocusArea }: AddFocusAreaDialogProps) {
    const [open, setOpen] = useState(false);
    const [customInput, setCustomInput] = useState("");
    const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

    // Filter out already selected focus areas
    const availableSuggestions = suggestedFocusAreas.filter(
        (area) => !currentFocusAreas.includes(area) && !selectedSuggestions.includes(area)
    );

    const handleAddCustom = () => {
        if (customInput.trim() && !currentFocusAreas.includes(customInput.trim())) {
            onAddFocusArea(customInput.trim());
            setCustomInput("");
        }
    };

    const handleToggleSuggestion = (suggestion: string) => {
        setSelectedSuggestions((prev) =>
            prev.includes(suggestion) ? prev.filter((s) => s !== suggestion) : [...prev, suggestion]
        );
    };

    const handleAddSelected = () => {
        selectedSuggestions.forEach((area) => onAddFocusArea(area));
        setSelectedSuggestions([]);
        setOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddCustom();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Focus Area
                </Badge>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        Add Content Focus Areas
                    </DialogTitle>
                    <DialogDescription>
                        Add topics you want AI to focus on when creating content. This helps
                        generate more relevant and targeted posts.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Custom Input */}
                    <div className="space-y-3">
                        <Label htmlFor="custom-focus">Add Custom Focus Area</Label>
                        <div className="flex gap-2">
                            <Input
                                id="custom-focus"
                                placeholder="e.g., Machine Learning, Startup Funding, etc."
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <Button
                                onClick={handleAddCustom}
                                disabled={
                                    !customInput.trim() ||
                                    currentFocusAreas.includes(customInput.trim())
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {customInput.trim() && currentFocusAreas.includes(customInput.trim()) && (
                            <p className="text-xs text-red-600">This focus area already exists</p>
                        )}
                    </div>

                    <Separator />

                    {/* Suggested Focus Areas */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Suggested Focus Areas</Label>
                            {selectedSuggestions.length > 0 && (
                                <Button
                                    onClick={handleAddSelected}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Add Selected ({selectedSuggestions.length})
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                            {availableSuggestions.map((suggestion) => (
                                <Badge
                                    key={suggestion}
                                    variant={
                                        selectedSuggestions.includes(suggestion)
                                            ? "default"
                                            : "outline"
                                    }
                                    className={`cursor-pointer justify-center text-center py-2 transition-colors ${
                                        selectedSuggestions.includes(suggestion)
                                            ? "bg-blue-600 hover:bg-blue-700"
                                            : "hover:bg-muted"
                                    }`}
                                    onClick={() => handleToggleSuggestion(suggestion)}
                                >
                                    {suggestion}
                                </Badge>
                            ))}
                        </div>

                        {availableSuggestions.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>All suggested focus areas have been added!</p>
                                <p className="text-sm">
                                    You can still add custom focus areas above.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Selected Preview */}
                    {selectedSuggestions.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <Label>Selected to Add ({selectedSuggestions.length})</Label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSuggestions.map((area) => (
                                        <Badge
                                            key={area}
                                            className="bg-green-100 text-green-800 hover:bg-green-100"
                                        >
                                            {area}
                                            <X
                                                className="ml-1 h-3 w-3 cursor-pointer hover:text-green-600"
                                                onClick={() => handleToggleSuggestion(area)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Current Focus Areas Preview */}
                    {currentFocusAreas.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-3">
                                <Label>Current Focus Areas ({currentFocusAreas.length})</Label>
                                <div className="flex flex-wrap gap-2">
                                    {currentFocusAreas.map((area) => (
                                        <Badge key={area} variant="secondary" className="text-xs">
                                            {area}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-transparent"
                        >
                            Close
                        </Button>
                        {selectedSuggestions.length > 0 && (
                            <Button
                                onClick={handleAddSelected}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Add {selectedSuggestions.length} Focus Area
                                {selectedSuggestions.length > 1 ? "s" : ""}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
