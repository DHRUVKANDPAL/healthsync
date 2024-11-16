"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircleMore } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, ThumbsUp, Flag, Search, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import BeatLoader from "@/components/BeatLoader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ScrollingAnnouncement from "@/components/ScrollBanner";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  subject: string;
  createdAt: string;
  reply: { id: number; message: string; createdAt: string }[];
}
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters." }),
});
export default function Component() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [showAnonymous, setShowAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "anonymous@healthsync.com",
      name: "Anonymous-Healer",
      subject: "",
    },
  });
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/contact/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback data");
        }
        const data = await response.json();
        setFeedbacks(data.fb);
        setFilteredFeedbacks(data.fb);
        setIsLoading(false);
      } catch (err) {
        setError("An error occurred while fetching feedback data");
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);
  useEffect(() => {
    const newFilteredFeedbacks = showAnonymous
      ? feedbacks.filter(
          (feedback) =>
            feedback.name.toLowerCase().includes("anonymous") ||
            feedback.email.toLowerCase().includes("anonymous")
        )
      : feedbacks;
    setFilteredFeedbacks(
      [...newFilteredFeedbacks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, [showAnonymous, feedbacks]);
  useEffect(() => {
    const newFilteredFeedbacks = feedbacks.filter(
      (feedback) =>
        feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) // Add message filtering
    );
    setFilteredFeedbacks(
      newFilteredFeedbacks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, [searchQuery, feedbacks]);
  const handleReply = (feedbackId: number) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [feedbackId]: !prevState[feedbackId],
    }));
  };

  const handleSendReply = async (feedbackId: number) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/reply/${feedbackId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: replyText }),
        });
        if (!response.ok) {
          throw new Error("Failed to send reply");
        }
        const updatedFeedback = await response.json();
        setFeedbacks(updatedFeedback.fb);
        console.log(updatedFeedback);
        setReplyText("");
        setShowReplies((prevState) => ({
          ...prevState,
          [feedbackId]: false,
        }));
      } catch (err) {
        console.error("Error sending reply:", err);
      }
    });
  };
  const handleHideReplies = (feedbackId: number) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [feedbackId]: false,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen mx-auto py-10 text-center">
        <BeatLoader></BeatLoader>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(filteredFeedbacks)) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-lg text-red-500">
          Error: Feedback data is not available.
        </p>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await fetch("/api/contact/feedback", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success("Feedback sent successfully");
        window.location.reload();
      } else {
        toast.error("Unable to send feedback");
      }
    });
  }
  return (
    <>
      <Header></Header>
      <div className="fixed bottom-0 left-0 right-0 z-50">
      <ScrollingAnnouncement></ScrollingAnnouncement>
      </div>
      <div className=" w-full mx-auto py-10">
        <div className=" fixed bottom-16 right-8 rounded-full  bg-blue-800 w-12 h-12 cursor-pointer hover:bg-blue-600 transition-all duration-300 flex justify-center items-center z-50">
          {" "}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className=" fixed bottom-16 right-8 rounded-full  bg-blue-800 w-12 h-12 cursor-pointer data-[state=open]:bg-blue-600 hover:bg-blue-600 transition-all duration-300 flex justify-center items-center z-50">
                <MessageCircleMore className="text-white " />
              </MenubarTrigger>
              <MenubarContent className="p-5 mr-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-slate-200">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-slate-200">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your Email"
                                {...field}
                                className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-slate-200">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Message Subject"
                              {...field}
                              className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-slate-200">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your message here"
                              className="min-h-[120px] bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-blue-700 text-white"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <Card className="w-11/12 md:w-5/6 max-w-7xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center gap-8">
              <div>
                <CardTitle className="text-3xl">Feedback Dashboard</CardTitle>
                <CardDescription>
                  View and manage all user feedback in one place
                </CardDescription>
              </div>
              <div className="relative w-full sm:max-w-64 md:max-w-[380px] lg:max-w-[480px]">
                <Search className="absolute hidden sm:block left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hidden sm:block sm:max-w-64 md:max-w-[380px] lg:max-w-[480px] pl-8"
                />
              </div>
              <div className=" space-x-2 sm:block hidden">
                <Switch
                  id="anonymous-mode"
                  checked={showAnonymous}
                  onCheckedChange={setShowAnonymous}
                />
                <label htmlFor="anonymous-mode" className="text-sm font-medium">
                  Show Anonymous Only
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {filteredFeedbacks.map((feedback) => {
                  const date = new Date(feedback.createdAt);
                  const options = { timeZone: "Asia/Kolkata", hour12: false };
                  const istTime = date.toLocaleString("en-GB", options);

                  return (
                    <Card
                      key={feedback.id}
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <CardContent className="flex gap-4 pt-6">
                        <Avatar className="h-12 w-12 hidden sm:block">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${feedback.email}`}
                          />
                          <AvatarFallback>{feedback.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6  sm:hidden">
                                  <AvatarImage
                                    src={`https://avatar.vercel.sh/${feedback.email}`}
                                  />
                                  <AvatarFallback>
                                    {feedback.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold">
                                  {feedback.name}
                                </h3>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {feedback.email}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground sm:block hidden">
                              {istTime}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">{feedback.subject}</h4>
                            <p className="text-sm text-foreground opacity-70">
                              {feedback.message}
                            </p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReply(feedback.id)}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                          {showReplies[feedback.id] && (
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-end gap-2">
                                <Input
                                  type="text"
                                  placeholder="Type your reply..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    handleSendReply(feedback.id)
                                  }
                                />
                                <Button
                                  variant="default"
                                  disabled={isPending}
                                  onClick={() => handleSendReply(feedback.id)}
                                >
                                  {isPending ? (
                                    <Loader2 className="h-2 w-2 sm:w-8 sm:h-8 animate-spin" />
                                  ) : (
                                    <Send className="h-2 w-2 sm:w-8 sm:h-8" />
                                  )}
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {feedback?.reply?.map((reply) => (
                                  <>
                                    <div
                                      key={reply.id}
                                      className="bg-muted p-2 rounded flex flex-col space-y-2"
                                    >
                                      <div className="text-sm flex gap-2 ">
                                        <Avatar className="h-5 w-5  sm:block">
                                          <AvatarImage
                                            src={`https://avatar.vercel.sh/${
                                              reply.message + "0"
                                            }`}
                                          />
                                          <AvatarFallback>
                                            {feedback.name[0]}
                                          </AvatarFallback>
                                        </Avatar>
                                        {reply.message}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {new Date(
                                          reply.createdAt
                                        ).toLocaleString()}
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="h-16"></div>
      {/* <Footer></Footer> */}
    </>
  );
}
