import { Hero } from "@/components/landing-page/hero";
import { Features } from "@/components/landing-page/features";
import { HowItWorks } from "@/components/landing-page/how-it-works";
import { Pricing } from "@/components/landing-page/pricing";
import { LandingPageCta } from "@/components/landing-page/landing-page-cta";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <LandingPageCta />
            <Footer />
        </div>
    );
}
