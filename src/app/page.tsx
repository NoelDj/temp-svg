import { auth } from "@/auth";
import EditorWrapper from "@/components/EditorWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Footer from "@/features/landing-page/components/Footer";
import BlogSection from "@/features/landing-page/components/BlogSection";
import FeaturesSection from "@/features/landing-page/components/FeaturesSection";
import Header from "@/features/landing-page/components/Header";
import TimelineSection from "@/features/landing-page/components/TimelineSection";
import PricingSection from "@/features/landing-page/components/PricingSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Change SVG Color Online For Free – No Login Required',
    description: 'Edit or Change the color of your SVG Vectors in just a few clicks with our free SVG editing tool. Get color suggestions using the color detection tool.',
}

export default async function Home() {


    return (
        <div>

            <Header />

            <div className='my-8 px-18 mb-30'>
                <h1 className='text-5xl text-center mb-2'>Change Svg Color Online</h1>
                <p className='mb-8 text-center max-w-7xl mx-auto'>Quickly edit colors, height and width on your SVGs with this free tool.</p>
                <EditorWrapper />
            </div>

            <div className="w-full max-w-[1200px] mx-auto">
                <TimelineSection />
                {/* <BlogSection /> */}
                {/* <FeaturesSection />
                <PricingSection /> */}

                <BlogSection />
            </div>

            <Footer />
        </div>
    );
}