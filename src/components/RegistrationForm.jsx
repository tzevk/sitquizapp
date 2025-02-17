import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from 'next/image'
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    typeof window !== "undefined" && localStorage.removeItem("user");
    typeof window !== "undefined" && localStorage.removeItem("questions");
    typeof window !== "undefined" && localStorage.removeItem("timeRemaining");

    if (
      formData.contact.length !== 10 ||
      isNaN(parseInt(formData.contact)) ||
      !/^\d+$/.test(formData.contact)
    ) {
      toast({
        title: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.post("/api/users", formData);
      if (res.status === 200) {
        toast({ title: "All the best for your quiz!" });
        typeof window !== "undefined" &&
          localStorage.setItem("user", JSON.stringify(formData));
        router.push("/quiz");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: JSON.stringify(error?.response?.data?.error || error.message),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-1/3">
      {/* <h2 className="text-xl font-semibold mb-4">Registration Form</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block font-semibold mb-2 text-zinc-900"
          >
            NAME:
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded placeholder:font-light"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="contact"
            className="block mb-2 font-semibold text-zinc-900"
          >
            PHONE NUMBER:
          </Label>
          <Input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded placeholder:font-light"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="occupation"
            className="block mb-2 font-semibold text-zinc-900"
          >
            Are you:
          </Label>
          <Select
            required
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="rounded-md text-black">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="bg-white" value="iti">
                ITI Student
              </SelectItem>
              <SelectItem value="diploma">Diploma Student</SelectItem>
              <SelectItem value="btech">B.Tech / B.E. Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-500 font-bold px-4 py-2 rounded-lg transition duration-300 mt-2"
          >
            Continue -&gt;
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
