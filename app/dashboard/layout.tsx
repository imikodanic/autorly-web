import {Navbar} from "@/components/navbar/navbar";

export default function Layout({ children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}