import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav className={cn("flex items-center", className)} {...props}>
            {/*<Link*/}
            {/*    href="/dashboard"*/}
            {/*    className="text-sm font-medium transition-colors hover:text-primary"*/}
            {/*>*/}
            {/*    Dashboard*/}
            {/*</Link>*/}
        </nav>
    );
}
