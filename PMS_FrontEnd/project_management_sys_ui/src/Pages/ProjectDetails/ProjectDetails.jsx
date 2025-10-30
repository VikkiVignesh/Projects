import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetch_Project_Id } from "../../redux/projects/ProjecActions";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectDetails } = useSelector((state) => state.project || {});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data) => {
    console.log("Invite sent to:", data.email);
    reset();
  };

  useEffect(() => {
    dispatch(fetch_Project_Id(id));
  }, [id, dispatch]);

  // ✅ Prevent crash before data loads
  if (!projectDetails) {
    return (
      <div className="text-gray-400 text-center mt-10">
        Loading project details...
      </div>
    );
  }

  return (
    <div className="mt-6 lg:px-10 text-white">
      <div className="lg:flex gap-5 w-[100%]">
        {/* Left Section */}
        <ScrollArea className="h-[85vh] w-full lg:w-[70%] pr-2">
          <div className="space-y-6">
            {/* Header */}
            <div className="pb-4 border-b border-gray-700">
              <h1 className="text-2xl font-bold">{projectDetails.name}</h1>
              <p className="mt-2 text-gray-400">{projectDetails.description}</p>
            </div>

            {/* Project Info */}
            <div className="p-6 rounded-lg shadow-md space-y-6 w-[60%] border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Project Details</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-gray-300">Project Lead:</p>
                  <p className="text-white">{projectDetails.owner?.name || "N/A"}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-gray-300">Members:</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {projectDetails.team?.length ? (
                      projectDetails.team.map((member) => (
                        <Avatar key={member.id} className="cursor-pointer">
                          <AvatarFallback className="bg-gray-600">
                            {member.name?.charAt(0).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                      ))
                    ) : (
                      <p className="text-gray-400">No members</p>
                    )}

                    {/* Invite Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          Invite
                          <PlusIcon className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0b1120]/90 text-white rounded-lg p-6">
                        <DialogHeader>
                          <DialogTitle>Invite Member</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                          <input
                            type="email"
                            placeholder="Enter member email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white outline-none"
                          />
                          {errors.email && (
                            <p className="text-red-400 text-sm">{errors.email.message}</p>
                          )}
                          <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            Send Invite
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-gray-300">Category:</p>
                  <p className="text-white">{projectDetails.category || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <section>
              <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in_progress" title="In Progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Right Sidebar */}
        <div className="lg:block lg:w-[30%]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
