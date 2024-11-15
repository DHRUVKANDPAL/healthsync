"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  subject: string;
  createdAt: string;
  reply: { id: number; message: string; createdAt: string }[];
}

export default function Component() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [showAnonymous, setShowAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
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
  };
  const handleHideReplies = (feedbackId: number) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [feedbackId]: false,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-lg">Loading feedback data...</p>
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

  return (
    <>
      <Header></Header>
      <div className="w-full mx-auto py-10">
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
              <div className="flex items-center space-x-2 sm:block hidden">
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
                              <h3 className="font-semibold">{feedback.name}</h3>
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
                            <p className="text-sm text-muted-foreground">
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
                                  onClick={() => handleSendReply(feedback.id)}
                                >
                                  <Send className="h-2 w-2 sm:w-8 sm:h-8" />
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
                                        <Avatar className="h-5 w-5 hidden sm:block">
                                          <AvatarImage
                                            src={`https://avatar.vercel.sh/${reply.message+'0'}`}
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
      <Footer></Footer>
    </>
  );
}
