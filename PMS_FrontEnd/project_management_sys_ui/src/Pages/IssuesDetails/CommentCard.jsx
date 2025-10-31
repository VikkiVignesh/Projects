import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../../components/ui/button'
import { PersonIcon, TrashIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../redux/comments/comAction'

const CommentCard = ({comment}) => {


  console.log("Comments ",comment);
  
  const dispatch=useDispatch();

  const handleDeleteComment=()=>
  {
    dispatch(deleteComment(comment.id))
  }

  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <Avatar className="bg-[#0b1120]/90">
            <AvatarFallback className="bg-[#0b1120]/90">
            {comment?.user?.name
            ? comment.user.name.charAt(0).toUpperCase()
            : <PersonIcon className="w-4 h-4" />}
            </AvatarFallback>
        </Avatar>
      <div className='space-y-1'>
        <p>{comment.user?.name}</p>
        <p>{comment.content}</p>
      </div>

      <div>
        <Button size="icon" variant="ghost" className="cursor-pointer bg-transparent" onClick={()=>handleDeleteComment()}>
            <TrashIcon/>
        </Button>
      </div>
      </div>
    </div>
  )

}

export default CommentCard
