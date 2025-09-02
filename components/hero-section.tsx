"use client"

import { ContainerScroll, BentoGrid, BentoCell, ContainerScale } from '@/components/hero-gallery-scroll-animation'

export default function HeroSection() {
  return (
    <ContainerScroll className="h-[120vh] -mt-20">
      <ContainerScale className="z-10">
        <div className="text-center space-y-4 pt-40">
          <h1 className="text-4xl md:text-6xl font-bold">
            Cavavin La Réunion
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Plus de 250 vins et spiritueux d&apos;exception
          </p>
        </div>
      </ContainerScale>
      
      <div className="absolute inset-0 flex items-start justify-center px-4 pt-24">
        <BentoGrid className="max-w-5xl mx-auto w-full h-[500px] mt-8">
          <BentoCell className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800" 
              alt="Wine collection" 
              className="w-full h-full object-cover"
            />
          </BentoCell>
          <BentoCell className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800" 
              alt="Red wine" 
              className="w-full h-full object-cover"
            />
          </BentoCell>
          <BentoCell className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800" 
              alt="White wine" 
              className="w-full h-full object-cover"
            />
          </BentoCell>
          <BentoCell className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1547595628-c61a32d9b423?w=800" 
              alt="Champagne" 
              className="w-full h-full object-cover"
            />
          </BentoCell>
          <BentoCell className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800" 
              alt="Whisky" 
              className="w-full h-full object-cover"
            />
          </BentoCell>
        </BentoGrid>
      </div>
    </ContainerScroll>
  )
}