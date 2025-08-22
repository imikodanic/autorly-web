"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, TrendingUp, Sparkles } from "lucide-react";

export function PostingPatterns() {
    return (
        <div className="space-y-6">
            <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                    <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700 border-orange-200"
                    >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Coming Soon
                    </Badge>
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        Optimal Posting Times
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold text-muted-foreground mb-2">
                            AI-Powered Timing Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                            We&apos;re analyzing your audience engagement patterns to recommend the
                            best times to post for maximum reach and interaction.
                        </p>
                        <div className="space-y-2 opacity-50">
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="font-medium">Monday - Friday</div>
                                        <div className="text-sm text-muted-foreground">
                                            Peak engagement times
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="secondary">Analyzing...</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                    <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700 border-orange-200"
                    >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Coming Soon
                    </Badge>
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        Posting Frequency Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold text-muted-foreground mb-2">
                            Smart Frequency Recommendations
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                            Get personalized recommendations on how often to post based on your
                            industry, audience, and engagement goals.
                        </p>
                        <div className="grid grid-cols-2 gap-4 opacity-50">
                            <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-muted-foreground">--</div>
                                <div className="text-sm text-muted-foreground">Current</div>
                            </div>
                            <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-muted-foreground">--</div>
                                <div className="text-sm text-muted-foreground">Recommended</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
