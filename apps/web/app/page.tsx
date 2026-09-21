import { LandingHeader } from "../features/landing/components/landing-header";
import { HeroSection } from "../features/landing/components/hero-section";
import { ValuePropSection } from "../features/landing/components/value-prop-section";
import { CoursesPreviewSection } from "../features/landing/components/courses-preview-section";
import { PracticeToolsSection } from "../features/landing/components/practice-tools-section";
import { ProgressGrowthSection } from "../features/landing/components/progress-growth-section";
import { CtaSection } from "../features/landing/components/cta-section";
import { LandingFooter } from "../features/landing/components/landing-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-foreground selection:bg-primary-muted selection:text-primary-light font-sans">
      {/* Header */}
      <LandingHeader />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <ValuePropSection />
        <CoursesPreviewSection />
        <PracticeToolsSection />
        <ProgressGrowthSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}