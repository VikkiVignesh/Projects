import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CreateCommentForm = ({ onNewComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { comment: "" } });

  const onSubmit = (data) => {
    if (onNewComment) onNewComment(data.comment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div>
        <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gray-600 ">V</AvatarFallback>
        </Avatar>
      </div>
      <input
        placeholder="Write a comment..."
        {...register("comment", { required: "Comment is required" })}
        className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <Button type="submit"
        className="flex cursor-pointer justify-center items-center rounded-lg bg-gray-200 text-black"
      >
        save
      </Button>
    </form>
  );
};

export default CreateCommentForm;
