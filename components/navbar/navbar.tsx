import { MainNav } from "@/components/navbar/main-nav";
import { UserNav } from "@/components/navbar/user-nav";
import Image from "next/image";

export function Navbar() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Image src="/logo-icon.png" alt="Autorly Logo" width={40} height={40} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                </div>
            </div>
        </div>
    );
}
