import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import IssuesCard from './IssuesCard'
import { Button } from '../../components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../../redux/Issue/IssueAction'
import { useParams } from 'react-router-dom'
import { store } from '../../redux/Store'

const IssueList = ({ title,status }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { issue } = useSelector(store => store)

  const [open, setOpen] = useState(false) // ✅ control Dialog here


  useEffect(() => {
    dispatch(fetchIssues(id))
  }, [id])

  return (
    <div className='bg-[#0b1120]/90'>
      <Card className="bg-[#0b1120]/90 text-white w-full md:w-[300px] lg:w-[310px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent className="px-2 bg-[#0b1120]/90">
          <div className='space-y-2'>
            {
             issue.issues.filter((issue=>issue.status==status)).map((item) => (
              <IssuesCard item={item} projectId={id} key={item.id} />
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-white bg-[#0b1120]/90 flex items-center gap-2"
              >
                <PlusIcon />
                Create Issue
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0b1120]/90 text-white">
              <DialogHeader>
                <DialogTitle>Create new Issue</DialogTitle>
              </DialogHeader>

              {/* ✅ Pass down closeDialog callback */}
              <CreateIssueForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

export default IssueList
