"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    const imageRef=useRef(null);
    useEffect(()=>{
        const imageElement=imageRef.current;
        const handleScroll=()=>{
            const scrollPosition=window.scrollY;
            const scrollThreshold=100;
            if(scrollPosition > scrollThreshold){
                imageElement.classList.add("scrolled");
            }
            else {
    imageElement?.classList.remove("scrolled"); // ✅ remove when scrolling up
  }
        };
        window.addEventListener("scroll",handleScroll);
        return () => {
  window.removeEventListener("scroll", handleScroll); // ✅ cleanup
};
    },[]);
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
            <h1 className='gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl'>
                Your AI Carrer Coach for
                <br />
                Professional Success 
            </h1>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                Advance your carrer with personlize guidence,interview prep,and AI-powered tools for job success
            </p>
        </div>
        <div className='flex justify-center space-x-4 mb-5'>
        <Link href="/dashboard">
        <Button size="lg" className="px-8">
            GetStarted
        </Button>
        </Link>
        <Link href="/">
        <Button size="lg" className="px-8" variant="outline">
            GetStarted
        </Button>
        </Link>
        </div>
      </div>
      <div  className='m-4 hero-image-wrapper mt-5 md:mt-0'>
        <div ref={imageRef} className='hero-image'>
            <Image
            src={"/banner.jpeg"}
            width={1280}
            height={720}
            alt='banner sensai'
            className='rounded-lg shadow-2xl border mx-auto'
            priority></Image>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
