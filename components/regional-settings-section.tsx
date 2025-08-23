import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@radix-ui/react-select";
import { Globe } from "lucide-react";

export function RegionalSettingsSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Regional Settings
                </CardTitle>
                <CardDescription>Configure your location and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-sm">Country/Region</Label>
                    <Select value={"United States"}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm">Timezone</Label>
                    <Select value={"America/Los_Angeles"}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="Europe/Paris">
                                Central European Time (CET)
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                            <SelectItem value="Australia/Sydney">
                                Australian Eastern Time (AET)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm">Language</Label>
                    <Select value={"English (US)"}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English (US)">English (US)</SelectItem>
                            <SelectItem value="English (UK)">English (UK)</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
