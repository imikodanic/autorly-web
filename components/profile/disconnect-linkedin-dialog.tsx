"use client";

import { useState } from "react";
import { AlertTriangle, Linkedin, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface DisconnectLinkedInDialogProps {
    onConfirmDisconnect?: () => void;
    userProfile?: {
        name: string;
        email: string;
    };
}

export function DisconnectLinkedInDialog({
    // onConfirmDisconnect,
    userProfile = { name: "Alex Johnson", email: "alex.johnson@example.com" },
}: DisconnectLinkedInDialogProps) {
    const [open, setOpen] = useState(false);

    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [confirmationChecked, setConfirmationChecked] = useState(false);

    const handleDisconnect = async () => {
        setIsDisconnecting(true);

        // Simulate disconnect process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // onConfirmDisconnect();
        setIsDisconnecting(false);
        setConfirmationChecked(false);
    };

    const handleCancel = () => {
        setConfirmationChecked(false);
    };

    const consequences = [
        {
            title: "Auto-posting will stop",
            description: "Scheduled posts will not be published automatically",
        },
        {
            title: "Analytics will be limited",
            description: "You'll lose access to LinkedIn performance data",
        },
        {
            title: "Content generation affected",
            description: "AI won't have access to your LinkedIn audience insights",
        },
        {
            title: "Scheduled posts remain",
            description: "Your scheduled posts will be saved but won't auto-publish",
        },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Disconnect
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-left">Disconnect LinkedIn?</DialogTitle>
                            <DialogDescription className="text-left">
                                This will remove your LinkedIn connection
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Current Connection Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Linkedin className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="font-medium text-blue-900">{userProfile.name}</p>
                                <p className="text-sm text-blue-700">{userProfile.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Warning Alert */}
                    <Alert className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                            <strong>Warning:</strong> Disconnecting will affect several features and
                            cannot be undone without reconnecting.
                        </AlertDescription>
                    </Alert>

                    {/* Consequences List */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">What happens when you disconnect:</h4>
                        <div className="space-y-3">
                            {consequences.map((consequence, index) => (
                                <div key={index} className="flex gap-3">
                                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {consequence.title}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {consequence.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Checkbox
                            id="confirm-disconnect"
                            checked={confirmationChecked}
                            onCheckedChange={(checked) =>
                                setConfirmationChecked(checked as boolean)
                            }
                        />
                        <Label htmlFor="confirm-disconnect" className="text-sm leading-relaxed">
                            I understand the consequences and want to disconnect my LinkedIn
                            account. I can reconnect later if needed.
                        </Label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isDisconnecting}
                            className="flex-1 bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDisconnect}
                            disabled={!confirmationChecked || isDisconnecting}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                            {isDisconnecting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Disconnecting...
                                </div>
                            ) : (
                                "Disconnect LinkedIn"
                            )}
                        </Button>
                    </div>

                    {/* Help Text */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            You can reconnect your LinkedIn account anytime from the profile
                            settings.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
