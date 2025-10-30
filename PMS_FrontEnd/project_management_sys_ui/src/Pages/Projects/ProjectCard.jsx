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
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { deleteProject } from '../../redux/projects/ProjecActions'


const ProjectCard = ({project}) => {

const dispatch=useDispatch();
const handleProjectDelete=()=>
{
    dispatch(deleteProject({ projectId: project.id }))
}
const nav=useNavigate()




  return (
    <Card className="p-5 w-full lg:max-w-3xl bg-[#0b1120]/90 text-white" >
       <div className='space-y-5'>
            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'>
                        <h1 onClick={()=>nav(`/project/${project.id}`)} className='cursor-pointer font-bold text-lg'>
                            {project.name}
                        </h1>

                        <DotFilledIcon/>
                        <p className="text-sm text-gray-400">{project.category}</p>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className="bg-[#0b1120]/90" >
                                    <DotsVerticalIcon className=' rounded-full text-white' variant="ghost" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#0b1120]/90 text-white">
                                <DropdownMenuItem>
                                    Update
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={handleProjectDelete} >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <p className='text-gray-400 text-sm'>
                    {project.description}
                </p>

            </div>

            <div className='flex flex-wrap gap-2 items-center text-gray-200'>
                {
                    project.tags.map((tag)=>
                    <Badge key={tag} className="text-gray-300" variant="outline">
                     {tag}
                    </Badge>
                )
                }
            </div>
       </div>
    </Card>
  )
}

export default ProjectCard
