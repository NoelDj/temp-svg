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
import Image from "next/image";
import Link from "next/link";

export default async function Home() {


    return (
        <div>

            <Header />

            <div className='my-8 px-18 mb-50'>
                <h1 className='text-5xl text-center mb-2'>Change Svg Color Online</h1>
                <p className='mb-8 text-center max-w-7xl mx-auto'>Quickly edit colors, height and width on your SVGs with this free tool.</p>

                <EditorWrapper />
            </div>

            <div className="w-full max-w-[1500px] mx-auto">
                <TimelineSection />
                {/* <BlogSection /> */}
                <FeaturesSection />

            </div>

            <Footer />
        </div>
    );
}