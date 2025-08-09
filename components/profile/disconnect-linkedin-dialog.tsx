"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useDisconnectLinkedin } from "@/lib/api/me/hook";

export function DisconnectLinkedInDialog() {
    const [open, setOpen] = useState(false);

    const [isDisconnecting, setIsDisconnecting] = useState(false);

    const disconnectLinkedin = useDisconnectLinkedin();

    const handleDisconnect = async () => {
        setIsDisconnecting(true);

        disconnectLinkedin.mutate();

        setIsDisconnecting(false);
        setOpen(false);
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

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            disabled={isDisconnecting}
                            className="flex-1 bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDisconnect}
                            disabled={isDisconnecting}
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
