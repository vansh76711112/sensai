"use client";

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { Label } from "@/components/ui/label";
import { industries } from "@/data/industries";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { updateUser } from "@/actions/user";
import useFetch from "@/hooks/user-fetch";
import { Loader, Loader2 } from "lucide-react";
import { updateUser } from "@/actions/user";
const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  

  const{
    loading:updateLoading,
    fn: updateUserFn,
    data: updateResult 
  }=useFetch(updateUser)


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);


  const watchIndustry=watch("industry")

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry and specialization to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", ""); // reset subIndustry when industry changes
                }}
              >
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                 please enter the valid industry  
                </p>
              )}
            </div>

            {/* SubIndustry */}
          
            {watchIndustry && (<div className="space-y-2">
              <Label htmlFor="subIndustry">Specialization</Label>
              <Select
                onValueChange={(value) => {
                  setValue("subIndustry", value);
                }}>

              
                <SelectTrigger id="subIndustry" className="w-full">
                  <SelectValue placeholder="Select a subIndustry" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndustry?.subIndustries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-sm text-red-500">
                   Please enter the valid specialization  

                </p>
              )}
            </div>)}

            
              {/* // takeing years of experince */}
            <div className="space-y-2">
              <Label htmlFor="experince">Year Of Experince</Label>
             <Input
             id="experince"
             type="number"
             min="0"
             max="50"
             placeholder="Enter your years of experience"
             {...register("experience")}
             />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>


            {/* taking the skills from the user */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
             <Input
             id="skills"
            
             placeholder="JavaScript, Python, Project Management,Sales"
             {...register("skills")}
             />
             <p>Enter the skills with sperated comma's</p>
              {errors.skills && (
                <p className="text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Professional Bio  */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
             <Textarea
             id="bio"
             placeholder="Tells about your professional background... "
             className="h-32"
             {...register("bio")}
             />
              {errors.bio && (
                <p className="text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>
           <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )

};

export default OnboardingForm;
