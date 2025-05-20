import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/landing ui/dialog";
import { Button } from "@/components/landing ui/button";
import { Input } from "@/components/landing ui/input";
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Sign up submitted:", formData);
    onClose();
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-lg p-8 border-none shadow-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-3xl font-bold text-center">
            Sign up
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mb-8">
          <p className="text-xl">
            Join Thousands Finding Their Ideal Jobs with AI Assistance!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="h-14 text-lg rounded-md bg-white pl-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <Input id="password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="h-14 text-lg rounded-md bg-white pl-12" required />
            </div>
          </div>
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Sign up
            </Button>
          </div>
        </form>
        
        {/* Decorative elements matching the image */}
        <div className="absolute right-8 bottom-16">
          
        </div>
        <div className="absolute right-0 bottom-0">
          
        </div>
        <div className="absolute right-16 bottom-8">
          
        </div>
        
      </DialogContent>
    </Dialog>;
};
export default SignUpModal;