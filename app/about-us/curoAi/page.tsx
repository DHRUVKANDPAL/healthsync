'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Bot, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Home, 
  User, 
  Send,
  AlertTriangle,
  Stethoscope,
  Heart,
  Shield,
  Building2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { curoAIResponse } from "@/lib/gemini";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  content: string | any;
};

const ResponseSection = ({ title, icon: Icon, children, className = "" }:any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn(
      "bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 backdrop-blur-sm",
      className
    )}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {title}
      </h2>
    </div>
    {children}
  </motion.div>
);

const CuroAI = () => {
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    messages.push({ role: "user", content: input });
    setMessages([...messages]);
    setLoading(true);

    if (messages.length > 15) {
      const updatedMessages = messages.slice(6);
      setMessages(updatedMessages);
    }

    const botMessageIndex = messages.length;
    messages.push({ role: "bot", content: "" });
    setMessages([...messages]);

    try {
      const response = await curoAIResponse(input);
      messages[botMessageIndex].content = response;
      setMessages([...messages]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      if (messages[botMessageIndex]) {
        messages[botMessageIndex].content =
          "Error generating bot response. Please try again.";
      }
      setMessages([...messages]);
    } finally {
      setLoading(false);
    }
    setInput("");
  };

  const processText = (text: string) => {
    const regex =
      /(\([^)]+\)|\[[^\]]+\]|{[^}]+}|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|#[^ ]+(?= |$)|"[^"]+"|[^()[\]{}#"*`]+)/g;
    const parts = text.match(regex) || [text];

    return parts.map((part, index) => {
      if (
        (part.startsWith("(") && part.endsWith(")")) ||
        (part.startsWith("[") && part.endsWith("]")) ||
        (part.startsWith("{") && part.endsWith("}")) ||
        (part.startsWith("**") && part.endsWith("**")) ||
        (part.startsWith("*") && part.endsWith("*")) ||
        (part.startsWith("`") && part.endsWith("`")) ||
        part.startsWith("#") ||
        (part.startsWith('"') && part.endsWith('"'))
      ) {
        return (
          <span
            key={index}
            className={cn(
              "font-bold",
              part.startsWith("#")
                ? "text-blue-400 dark:text-blue-300"
                : "text-slate-700 dark:text-slate-300"
            )}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const renderBotResponse = (content:any) => {
    if (!content || typeof content !== "object") return null;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <ResponseSection
          title="Interpretation"
          icon={Heart}
          className="border-l-4 border-violet-500"
        >
          <p className="text-slate-600 dark:text-slate-300">
            {processText(content.interpretation.summary)}
          </p>
        </ResponseSection>

        <ResponseSection
          title="Home Remedies"
          icon={Shield}
          className="border-l-4 border-blue-500"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {processText(content.home_remedies.detailed_explanation)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.home_remedies.remedies.map((remedy:any, index:any) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl"
              >
                <h3 className="font-medium text-violet-600 dark:text-violet-400 mb-2">
                  {remedy.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {remedy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ResponseSection>

        <ResponseSection
          title="Precautions"
          icon={AlertTriangle}
          className="border-l-4 border-yellow-500"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {processText(content.precautions.detailed_explanation)}
          </p>
          <ul className="space-y-2">
            {content.precautions.precaution_list.map((precaution:any, index:any) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
              >
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                {precaution}
              </motion.li>
            ))}
          </ul>
        </ResponseSection>

        <ResponseSection
          title="When to See a Doctor"
          icon={Stethoscope}
          className="border-l-4 border-red-500"
        >
          <button
            onClick={() => setShowDoctorInfo(!showDoctorInfo)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-slate-800 dark:text-white font-medium">
              View Medical Advice
            </span>
            {showDoctorInfo ? (
              <ChevronUp className="text-slate-600 dark:text-slate-400" />
            ) : (
              <ChevronDown className="text-slate-600 dark:text-slate-400" />
            )}
          </button>
          <AnimatePresence>
            {showDoctorInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-4"
              >
                <p className="text-slate-600 dark:text-slate-300">
                  {processText(content.when_to_see_doctor.detailed_explanation)}
                </p>
                <div className="space-y-4">
                  <h3 className="font-medium text-red-500 dark:text-red-400">
                    Red Flags:
                  </h3>
                  <ul className="space-y-2">
                    {content.when_to_see_doctor.red_flags.map((flag:any, index:any) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                      >
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        {processText(flag)}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ResponseSection>

        <ResponseSection
          title="Relevant Medical Departments"
          icon={Building2}
          className="border-l-4 border-green-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.relevant_medical_departments.map((dept:any, index:any) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl"
              >
                <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">
                  {dept.department}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {dept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ResponseSection>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-200">
      <Card className="mx-auto max-w-6xl h-[90vh] bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden transition-all duration-200">
        <CardHeader className="p-6 bg-gradient-to-r from-violet-500 to-blue-500 dark:from-violet-600 dark:to-blue-600">
          <CardTitle className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
            <Bot className="h-8 w-8" />
            Curo AI
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 flex-grow overflow-hidden bg-transparent">
          <ScrollArea className="h-[calc(90vh-12rem)] pr-4">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "bot" && (
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.role === "user"
                        ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg"
                        : "bg-transparent"
                    )}
                  >
                    {message.role === "user"
                      ? message.content
                      : message.content && renderBotResponse(message.content)}
                  </div>
                  {message.role === "user" && (
                    <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={onSubmit} className="flex w-full gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition-all duration-200"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white rounded-xl px-6 shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-violet-600 hover:to-blue-600 transition-all duration-200 md:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Home className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default CuroAI;