import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

const CreateIssueForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { issue: "", description:"" },
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    // You can send data to your API here
    reset() // clears form after submission
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3 bg-[#0b1120]/90">
      <input
        type="issue"
        placeholder="Enter issue name"
        {...register("issue", { required: "Issue name is required" })}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none"
      />
      {errors.issue && (
        <p className="text-red-400 text-sm">{errors.issue.message}</p>
      )}

      <input
        type="description"
        placeholder="Enter issue description"
        {...register("description", { required: "description is required" })}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none"
      />
      {errors.description && (
        <p className="text-red-400 text-sm">{errors.description.message}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
      >
       Create Issue
      </Button>
    </form>
  )
}

export default CreateIssueForm
