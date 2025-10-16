import React from 'react'
import { Card } from '../../components/ui/card'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../../components/ui/button'
import { Badge } from "@/components/ui/badge"


const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3xl bg-zinc-900 text-white" >
       <div className='space-y-5'>
            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'>
                        <h1 className='cursor-pointer font-bold text-lg'>
                            Create Ecomerce Project
                        </h1>

                        <DotFilledIcon/>
                        <p className="text-sm text-gray-400">Tech Stack</p>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button>
                                    <DotsVerticalIcon className=' rounded-full text-white' variant="ghost" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-zinc-900 text-white">
                                <DropdownMenuItem>
                                    Update
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <p className='text-gray-400 text-sm'>
                    Description comes here
                </p>

            </div>

            <div className='flex flex-wrap gap-2 items-center text-gray-200'>
                {
                    [1,1,1,1].map((item)=>
                    <Badge key={item} className="text-gray-300" variant="outline">
                     Frontend
                    </Badge>
                )
                }
            </div>
       </div>
    </Card>
  )
}

export default ProjectCard
