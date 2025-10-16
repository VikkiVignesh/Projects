"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

import{DialogClose} from "@/components/ui/dialog"
import { tags } from "../Projects/ProjecList";
import { Cross1Icon } from "@radix-ui/react-icons";

const CreateProjectForm = () => {
  
    const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Project Created:", data);
  };

  const handleTagsChange=(newValue)=>
  {
    const currentTags=form.getValues("tags");

    const updatedTags=currentTags.includes(newValue)?
    currentTags.filter(tag=>tag!==newValue):[...currentTags,newValue];
    form.setValue("tags",updatedTags)
  }

  return (
    <Form {...form} className="space-y-4 bg-zinc-600 text-gray-200">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-2 py-4 md:p-4 w-full max-w-lg mx-auto"
      >
      
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input
                    name="name"
                    type="text"
                    placeholder="Enter your project name"
                    {...field}
                    className=" border-gray-500  placeholder-gray-400"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input
                    name="description"
                    type="text"
                    placeholder="Enter your project description"
                    {...field}
                    className=" border-gray-500  placeholder-gray-400 bg-transparent"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Select
                    value={field.value} 
                    onValueChange={(val) => field.onChange(val)}
                    defaultValue="fullstack"
                
                    //className=" border-gray-500  placeholder-gray-400"
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>

                    <SelectContent className="cursor-pointer bg-zinc-600">
                        <SelectItem value="fullstack"> Full Stack</SelectItem>
                        <SelectItem value="frontend"> Front-End</SelectItem>
                        <SelectItem value="backend"> Back-End</SelectItem>
                        <SelectItem value="genai">Gen AI</SelectItem>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Select
                     value={""} 
                    onValueChange={(val) => handleTagsChange(val)}
                    //defaultValue="spring boot"
                
                    //className=" border-gray-500  placeholder-gray-400"
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tech stack" />
                    </SelectTrigger>

                    <SelectContent className="cursor-pointer bg-zinc-600">
                        {
                            tags.map((item)=>
                            <SelectItem key={item} value={item} className="capitalize">{item}</SelectItem>
                        )
                        }
                    </SelectContent>
                    </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                {
                    field.value.map((item) =>
                    <div key={item}
                    onClick={()=>handleTagsChange(item)}
                    className="flex gap-2 px-4 py-1 cursor-pointer rounded-full border items-center justify-between">
                        <span className="text-sm">{item}</span>
                        <Cross1Icon className="h-3 w-3"/>
                    </div>
                )}
                </div>
                <FormMessage />
            </FormItem>
          )}
        />

      <DialogClose>
          { false?<div>
            <p>you can create only 3 project in free plan ,please upgrade your plan</p>
          </div>:
          <Button type="submit" className="bg-green-400 w-full py-5 mt-5 text-white"> Create Project</Button>
          }
      </DialogClose>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
