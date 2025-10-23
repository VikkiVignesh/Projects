import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import IssuesCard from './IssuesCard'
import { Button } from '../../components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'

const IssueList = ({title,status}) => {
  return (
    <div className='bg-zinc-900'>
        <Dialog className='bg-[#0b1120]/90 text-white'>
            <Card className="bg-[#0b1120]/90 text-white w-full md:w-[300px] lg:w-[310px]">
               <CardHeader>
                 <CardTitle>
                    {title}
                 </CardTitle>
               </CardHeader>
               <CardContent className="px-2 bg-[#0b1120]/90">
                <div className='space-y-2'>
                    <IssuesCard />
                </div>
               </CardContent>
               <CardFooter>

                <Dialog  className="bg-[#0b1120]/90">
                    <DialogTrigger>
                        <Button variant="outline" className="w-full text-white bg-[#0b1120]/90  flex items-center gap-2">
                            <PlusIcon/>
                            Create Issue
                        </Button>
                    </DialogTrigger>
                </Dialog>
                
               </CardFooter>
            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new Issue</DialogTitle>
                </DialogHeader>
                <CreateIssueForm/>
            </DialogContent>
            
        </Dialog>
    </div>
  )
}

export default IssueList
