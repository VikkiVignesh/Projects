import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { createIssue } from "../../redux/Issue/IssueAction";
import { useParams } from "react-router-dom";

const CreateIssueForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [date, setDate] = React.useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
    },
  });

  const onSubmit = async (data) => {
    const issueData = {
      ...data,
      dueDate: date ? format(date, "yyyy-MM-dd") : "",
      projectID: id,
    };

    console.log("Create Issue Data:", issueData);
    await dispatch(createIssue(issueData));

    reset();
    setDate(new Date());

    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4 bg-[#0b1120]/90 p-5 rounded-xl shadow-md"
    >
      {/* ✅ Title */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Issue Title</label>
        <input
          type="text"
          placeholder="Enter issue title"
          {...register("title", { required: "Title is required" })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none"
        />
        {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
      </div>

      {/* ✅ Description */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Description</label>
        <textarea
          placeholder="Enter issue description"
          {...register("description", { required: "Description is required" })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none resize-none"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-400 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* ✅ Status */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Status</label>
        <select
          {...register("status", { required: "Status is required" })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Resolved</option>
        </select>
        {errors.status && (
          <p className="text-red-400 text-sm">{errors.status.message}</p>
        )}
      </div>

      {/* ✅ Priority */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Priority</label>
        <select
          {...register("priority", { required: "Priority is required" })}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-400 text-sm">{errors.priority.message}</p>
        )}
      </div>

      {/* ✅ Due Date */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Due Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-gray-800 text-white border-gray-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-white" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#0b1120] border border-gray-700 rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none shadow-sm text-white"
              classNames={{
                months: "flex flex-col space-y-4 text-white",
                caption: "flex justify-center pt-3 pb-2 text-white font-semibold",
                nav: "flex items-center justify-between px-3 text-white",
                nav_button: "text-white hover:bg-gray-700 p-1 rounded",
                head_cell: "text-gray-300 font-normal w-9 text-[0.85rem]",
                day: "text-white hover:bg-gray-700 rounded-md transition-all duration-150",
                day_today: "text-gray-400 border border-gray-500 rounded-md",
                day_selected: "bg-green-600 text-white rounded-md hover:bg-green-700",
                day_outside: "text-gray-600",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* ✅ Submit Button */}
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 transition-all"
      >
        Create Issue
      </Button>
    </form>
  );
};

export default CreateIssueForm;
