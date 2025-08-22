import { Loader2 } from "lucide-react";

export function PageLoadingState() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Autorly</h3>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        </div>
    );
}
