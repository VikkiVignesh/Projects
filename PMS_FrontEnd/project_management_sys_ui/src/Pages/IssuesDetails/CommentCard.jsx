import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../../components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'

const CommentCard = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <Avatar className="bg-[#0b1120]/90">
            <AvatarFallback className="bg-[#0b1120]/90">V</AvatarFallback>
        </Avatar>
      <div className='space-y-1'>
        <p>Comment here</p>
        <p>How much work is still pending?..</p>
      </div>

      <div>
        <Button size="icon" variant="ghost" className="bg-transparent">
            <TrashIcon/>
        </Button>
      </div>
      </div>
    </div>
  )

}

export default CommentCard
