import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../../components/ui/button'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Input } from "@/components/ui/input"
import ProjectCard from './ProjectCard'


export const tags=[
  "all",
  "react",
  "nextjs",
  "spring boot",
  "mysql",
  "mongodb",
  "angular",
  "python",
  "flask",
  "djano",
  "android"
];
const ProjecList = () => {

  const [keywords,setKeywords]=useState("")

  const handleFilterChange=(section,value)=>{
    console.log("Value: ",value)
  }

  const handleSearchChange=(e)=>
  {
    setKeywords(e.target.value) 
  }
  return (
    <>
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5 text-shadow-amber-50 "bg-[#0b1120]/90'>

    <section className='filterSection bg-[#0b1120]/90'>
      <Card className="p-5 sticky top-10 bg-[#0b1120]/90 text-shadow-white">
        <div className='flex justify-between lg:w-[20rem]'>
          <p className='text-xl text-white -tracking-wider'>Filters</p>

          <Button variant="ghost" size="icon" >
           <MixerHorizontalIcon className="text-6xl text-white"/>
          </Button>
        </div>


        <CardContent className="mt-5 text-blue-50">
          <ScrollArea className="space-y-7 h-[65vh]">

            <div>
              <h1 className='pb-3 text-gray-400 border-b'>
                Category
              </h1>

              <div className='pt-5'>
                <RadioGroup className="text-white" defaultValue="all" onValueChange={(val)=>handleFilterChange("category",val)}>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value="all" id="r1"
                    className="border-white text-white transition-colors duration-200 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <Label htmlFor="r1"> All</Label>
                  </div>

                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value="fullsatck" id="r2"
                    className="border-white text-white transition-colors duration-200 data-[state=checked]:bg-white data-[state=checked]:text-black"/>
                    <Label htmlFor="r2"> Fullstack</Label>
                  </div>


                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value="frontend" id="r3" className="border-white text-white transition-colors duration-200 data-[state=checked]:bg-white data-[state=checked]:text-black"/>
                    <Label htmlFor="r3"> Front-End</Label>
                  </div>

                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value="backend" id="r4" className="border-white text-white transition-colors duration-200 data-[state=checked]:bg-white data-[state=checked]:text-black"/>
                    <Label htmlFor="r4"> Back-End</Label>
                  </div>
                </RadioGroup>
              </div>

            </div>



             <div className='mt-10'>
              <h1 className='pb-3 text-gray-400 border-b'>
                Tech Stack
              </h1>

              <div className='pt-5'>
                <RadioGroup className="text-white" defaultValue="all" onValueChange={(val)=>handleFilterChange("category",val)}>
                  {
                    tags.map((item)=>
                    <div key={item} className='flex items-center gap-2'>
                    <RadioGroupItem value={item} id={`r1-${item}`}
                    className="border-white text-white transition-colors duration-200 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <Label className="capitalize" htmlFor="r1"> {item}</Label>
                  </div>)
                  }

                 
                </RadioGroup>
              </div>

            </div>
          </ScrollArea>
        </CardContent>
      </Card>

    </section>

    <section className='projectListSection w-full lg:w-[48rem]'>
    
    <div className='flex gap-2 items-center pb-5 justify-between'>

        <div className='relative p-1 w-full'>
            <Input
            
            onChange={handleSearchChange}
            placeholder="Search Project"
            className="40% px-9 text-white"
            />

            <MagnifyingGlassIcon className='w-5 h-6  text-white absolute top-3 left-4'/>
        </div>
    </div>


    <div>
      <div className='bg-[#0b1120]/90 space-y-5 min-h[74vh] text-white'>
        {
          keywords?[1,1,1].map((item)=>
          <ProjectCard key={item} />)
          :
          [1,1,1,4].map((item)=> <ProjectCard key={item}/>
          )
        }
      </div>
    </div>


    </section>
    </div>
    </>
  )
}

export default ProjecList
