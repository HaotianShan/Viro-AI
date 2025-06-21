import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyBar from "@/components/landing/StickyBar";
import Pricing from "@/components/landing/Pricing";
import VideoSection from "@/components/landing/VideoDemo";
import AgentSystemVisualization from "@/components/landing/Features/AgentSystemVisualization";
import Test from "@/components/landing/Test";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
    {/* <Test /> */}
    <VideoSection />
    <AgentSystemVisualization />
    <Pricing />
    <FAQ />
    <CTA />
    <Footer />
    <StickyBar />
  </div>
);

export default Index;
