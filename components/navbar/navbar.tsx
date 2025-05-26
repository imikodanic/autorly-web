import { MainNav } from "@/components/navbar/main-nav";
import BrandSwitcher from "@/components/navbar/brand-switcher";
import { UserNav } from "@/components/navbar/user-nav";

export function Navbar() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <BrandSwitcher />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                </div>
            </div>
        </div>
    );
}
