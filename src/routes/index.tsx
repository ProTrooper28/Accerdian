import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Partners } from "@/components/site/Partners";
import { Edge } from "@/components/site/Edge";
import { Domains } from "@/components/site/Domains";
import { Segments } from "@/components/site/Segments";
import { Audience } from "@/components/site/Audience";
import { Framework } from "@/components/site/Framework";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Accredian Enterprise — Next-Gen Expertise for Your Enterprise" },
      {
        name: "description",
        content:
          "Tailored corporate training for high-performance teams. Leadership, Tech & Data, Gen-AI, Fintech, and more — measured by outcome.",
      },
      { property: "og:title", content: "Accredian Enterprise" },
      {
        property: "og:description",
        content: "Enterprise learning that compounds — tailored programs, measurable impact.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Stats />
      <Partners />
      <Edge />
      <Domains />
      <Segments />
      <Audience />
      <Framework />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
