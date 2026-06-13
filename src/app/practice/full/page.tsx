"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Send,
  Code2,
  Loader2,
  FileText,
  Bot,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import Editor, { loader } from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Problem {
  title: string;
  description: string;
  hints: string[];
}

const INITIAL_CODE = `# Implement binary search to find a target value in a sorted array

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Target not found

# Example usage:
# arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
# target = 23
# result = binary_search(arr, target)
# print(f"Target {target} found at index {result}")
`;

const INITIAL_PROBLEM = {
  title: "Binary Search Implementation",
  // Added <strong> tags for more prominent bolding
  description: `Write a function to perform binary search on a sorted array.

<strong>Requirements:</strong>
1. The function should take an array and a target value as parameters
2. It should return the index of the target value if found
3. If the array is not sorted, what should the function do? (Consider adding error handling or a pre-check).
4. If the target is not in the array, return -1
5. The array will typically be sorted in ascending order

<strong>Example:</strong>
- Input: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23
- Expected output: 5 (index of value 23)

<strong>Constraints:</strong>
- Time complexity should be O(log n)
- Space complexity should be O(1)

You may discuss your approach before coding, and feel free to ask clarifying questions.`,
  hints: [], // Removed hints array
};

const WELCOME_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Welcome to your mock interview! I'll be your interviewer today. We'll cover technical coding problems, behavioral questions, and systems design based on your selected experience level.",
  },
];

// Problem Panel Component
const ProblemPanel = ({ problem }: { problem: Problem }) => (
  <div className="flex flex-col h-full">
    {/* Consistent Header Style */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/20 backdrop-blur-sm">
      <FileText className="w-5 h-5 text-primary" />
      <h1 className="text-base font-semibold text-primary">
        Problem Statement
      </h1>
    </div>

    <ScrollArea className="flex-1 px-4 pr-6 py-4">
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground gradient-text">
          {problem.title}
        </h2>
        <div className="prose prose-sm dark:prose-invert">
          {/* Problem description rendered directly */}
          <div
            className="whitespace-pre-wrap markdown-content"
            dangerouslySetInnerHTML={{ __html: problem.description }} // Used dangerouslySetInnerHTML to render HTML tags like <strong>
          ></div>

          {/* Removed hints rendering logic */}
        </div>
      </div>
    </ScrollArea>
  </div>
);

// API function to send messages to backend
const sendToInterviewAPI = async (userId: string, message: string): Promise<string> => {
  const res = await fetch("http://localhost:5000/interview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message }),
  });
  const data = await res.json();
  return data.response;
};

const InterviewApp = () => {
  const [messages, setMessages] = useState([...WELCOME_MESSAGES]);
  const [code, setCode] = useState(INITIAL_CODE);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProblem] = useState(INITIAL_PROBLEM);
  const [topPanelHeight, setTopPanelHeight] = useState(75); // Adjusted for better default proportions
  const [assistantPanelHeight, setAssistantPanelHeight] = useState(25); // Adjusted for better default proportions
  const [isTTSEnabled, setIsTTSEnabled] = useState(true); // TTS toggle state
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if TTS is currently speaking

  // State for horizontal resize
  const [problemPanelWidth, setProblemPanelWidth] = useState(50); // Initial width percentage for Problem Panel
  const [isHorizontalDragging, setIsHorizontalDragging] = useState(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState(false);
  const horizontalContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the container holding the two panels
  const verticalContainerRef = useRef<HTMLElement | null>(null); // Ref for the vertical container

  // Handle window resize to adjust layout (vertical split)
  useEffect(() => {
    const handleResize = () => {
      // Adjust layout based on screen size
      if (window.innerWidth < 768) {
        setTopPanelHeight(50);
        setAssistantPanelHeight(50);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Horizontal dragging functions
  const startHorizontalDragging = useCallback(() => {
    setIsHorizontalDragging(true);
  }, []);

  const stopHorizontalDragging = useCallback(() => {
    setIsHorizontalDragging(false);
  }, []);

  const onHorizontalDragging = useCallback(
    (e: MouseEvent) => {
      if (!isHorizontalDragging || !horizontalContainerRef.current) return;

      const container = horizontalContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX;

      // Calculate the new width percentage based on mouse position
      const newWidthPercent =
        ((mouseX - containerRect.left) / containerRect.width) * 100;

      // Set minimum and maximum width percentages
      const minWidthPercent = 20; // Minimum 20% width
      const maxWidthPercent = 80; // Maximum 80% width

      const clampedWidth = Math.max(
        minWidthPercent,
        Math.min(maxWidthPercent, newWidthPercent)
      );

      setProblemPanelWidth(clampedWidth);
    },
    [isHorizontalDragging]
  );

  // Vertical dragging functions
  const startVerticalDragging = useCallback(() => {
    setIsVerticalDragging(true);
  }, []);

  const stopVerticalDragging = useCallback(() => {
    setIsVerticalDragging(false);
  }, []);

  const onVerticalDragging = useCallback(
    (e: MouseEvent) => {
      if (!isVerticalDragging || !verticalContainerRef.current) return;

      const container = verticalContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const mouseY = e.clientY;

      // Calculate the new height percentage based on mouse position
      const newHeightPercent =
        ((mouseY - containerRect.top) / containerRect.height) * 100;

      // Set minimum and maximum height percentages
      const minHeightPercent = 30; // Minimum 25% height
      const maxHeightPercent = 70; // Maximum 75% height

      const clampedHeight = Math.max(
        minHeightPercent,
        Math.min(maxHeightPercent, newHeightPercent)
      );

      setTopPanelHeight(clampedHeight);
      setAssistantPanelHeight(100 - clampedHeight);
    },
    [isVerticalDragging]
  );

  // Add and remove global drag event listeners for horizontal dragging
  useEffect(() => {
    if (isHorizontalDragging) {
      document.addEventListener("mousemove", onHorizontalDragging);
      document.addEventListener("mouseup", stopHorizontalDragging);
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
    } else {
      document.removeEventListener("mousemove", onHorizontalDragging);
      document.removeEventListener("mouseup", stopHorizontalDragging);
      // Restore text selection and cursor if vertical dragging is not active
      if (!isVerticalDragging) {
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", onHorizontalDragging);
      document.removeEventListener("mouseup", stopHorizontalDragging);
    };
  }, [isHorizontalDragging, onHorizontalDragging, stopHorizontalDragging]);

  // Add and remove global drag event listeners for vertical dragging
  useEffect(() => {
    if (isVerticalDragging) {
      document.addEventListener("mousemove", onVerticalDragging);
      document.addEventListener("mouseup", stopVerticalDragging);
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ns-resize';
    } else {
      document.removeEventListener("mousemove", onVerticalDragging);
      document.removeEventListener("mouseup", stopVerticalDragging);
      // Restore text selection and cursor if horizontal dragging is not active
      if (!isHorizontalDragging) {
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", onVerticalDragging);
      document.removeEventListener("mouseup", stopVerticalDragging);
    };
  }, [isVerticalDragging, onVerticalDragging, stopVerticalDragging]);

  // ===============================
  // Handlers (rest of the handlers remain the same)
  // ===============================

  useEffect(() => {
  loader.init().then((monaco) => {
    monaco.editor.defineTheme("oklch-light", {
      base: "vs",
      inherit: true,
      rules: [], // Optional: syntax token styling
      colors: {
        "editor.background": "#fcfcf9",          // --background
        "editor.foreground": "#1a1a1a",          // --foreground
        "editor.lineHighlightBackground": "#f3f3ee", // highlight
        "editorCursor.foreground": "#0f766e",    // --primary
        "editorLineNumber.foreground": "#a3a3a3",
        "editor.selectionBackground": "#d0f1ec", // soft green selection
      },
    });

    monaco.editor.defineTheme("oklch-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#101010",          // --background (dark)
        "editor.foreground": "#eeeeee",          // --foreground (light text)
        "editor.lineHighlightBackground": "#1a1a1a",
        "editorCursor.foreground": "#4ade80",    // green cursor
        "editorLineNumber.foreground": "#888888",
        "editor.selectionBackground": "#264d3a", // greenish dark selection
      },
    });
  });
}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = useCallback((text: string, role: Message["role"] = "user") => {
    if (!text.trim()) return;
    const newMessage = {
      id: crypto.randomUUID(),
      role,
      content: text,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    return newMessage;
  }, []);

  // Enhanced TTS function with better voice selection and error handling
  const speakText = useCallback((text: string) => {
    if (!isTTSEnabled) return; // Don't speak if TTS is disabled
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and select a good one
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize voices in this order: Google, Microsoft, native English voices
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('google') && voice.lang.startsWith('en')
    ) || voices.find(voice => 
      voice.name.toLowerCase().includes('microsoft') && voice.lang.startsWith('en')
    ) || voices.find(voice => 
      voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')
    ) || voices.find(voice => 
      voice.lang.startsWith('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Configure speech parameters for better experience
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 0.8; // Slightly quieter
    
    // Add event listeners for better UX
    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log('TTS started');
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('TTS finished');
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.error('TTS error:', event.error);
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, [isTTSEnabled]);

  // Function to stop current speech
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Function to toggle TTS
  const toggleTTS = useCallback(() => {
    setIsTTSEnabled(prev => !prev);
    if (isSpeaking) {
      stopSpeaking();
    }
  }, [isSpeaking, stopSpeaking]);

  // Load voices when component mounts (some browsers load voices asynchronously)
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      }
    };
    
    // Load voices immediately
    loadVoices();
    
    // Also load when voices change (for browsers that load them asynchronously)
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    sendMessage(input, "user");
    setIsProcessing(true);
    try {
      const assistantReply = await sendToInterviewAPI("mohith123", input); // use a session ID in prod
      const newAssistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantReply,
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      
      // Speak the assistant's reply using enhanced TTS
      speakText(assistantReply);
      
    } catch (err) {
      console.error("Error sending message to interview API:", err);
      setError("Failed to reach the AI interviewer.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleRecording = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      setInput("");
    } else {
      setInput("What is the time complexity of this implementation?");
    }
  };

  const { resolvedTheme } = useTheme();

  return (
    <main
      id="main-container"
      className="pt-20 pb-8 px-4 bg-background text-foreground flex flex-col light-grid-bg"
      style={{ height: "100vh" }}
      ref={verticalContainerRef}
    >
      {/* Light orbs for ambient effect */}
      <div className="light-orb w-[700px] h-[700px] opacity-30 top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 fixed"></div>
      <div className="light-orb w-[500px] h-[500px] opacity-20 bottom-[10%] right-[20%] z-0 fixed"></div>

      {/* Main container */}
      <div
        className="w-full flex flex-col flex-grow relative z-10 gap-4"
        style={{ height: "calc(100vh - 6rem)" }} // Adjusted to account for bottom padding
      >
        {/* Top Panel: Problem + Code */}
        <div
          className="relative flex-grow min-h-0"
          style={{ height: `${topPanelHeight}%` }}
        >
          {/* Changed to flex container, reduced gap, added ref */}
          <div ref={horizontalContainerRef} className="h-full flex gap-2">
            {" "}
            {/* Changed to flex, gap-2 */}
            {/* Problem Panel - Applied glass-card and shadow-md */}
            {/* Added dynamic width style */}
            <div
              className="flex flex-col rounded-xl overflow-hidden glass-card shadow-md"
              style={{ width: `${problemPanelWidth}%` }} // Dynamic width
            >
              <div className="flex-1 overflow-auto">
                <ProblemPanel problem={currentProblem} />
              </div>
            </div>
            {/* Draggable Divider */}
            <div
              className="w-2 cursor-ew-resize bg-border transition-colors hover:bg-primary/60 flex flex-col justify-center items-center" // Added flex centering
              onMouseDown={startHorizontalDragging}
              style={{ minHeight: "100%" }} // Ensure divider stretches full height
            >
                 {/* Visual drag handle (vertical bars) */}
                 <div className="pointer-events-none"> {/* pointer-events-none allows clicks to pass through */}
                    <div className="w-1 h-4 bg-muted-foreground/50 my-[1px] rounded-full"></div>
                    <div className="w-1 h-4 bg-muted-foreground/50 my-[1px] rounded-full"></div>
                    <div className="w-1 h-4 bg-muted-foreground/50 my-[1px] rounded-full"></div>
                 </div>
            </div>
            {/* Code Editor Panel - Applied glass-card and shadow-md */}
            {/* Used flex-grow to take remaining space */}
            <div className="flex flex-col rounded-xl overflow-hidden glass-card shadow-md flex-grow">
              {" "}
              {/* Added flex-grow */}
              {/* Consistent Header Style */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/20 backdrop-blur-sm">
                <Code2 className="w-5 h-5 text-primary" />
                <h1 className="text-base font-semibold gradient-text text-primary">
                  Code Editor
                </h1>
              </div>
              <div className="flex-1 p-4 overflow-hidden">

                <div className="h-full glass-input backdrop-blur-md rounded-md overflow-hidden">
                  <Editor
                    height="100%"
                    language="python"
                    value={code}
                    onChange={(value) => setCode(value ?? "")}
                    theme={resolvedTheme === "dark" ? "oklch-dark" : "oklch-light"}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
              {error && (
                <div className="mx-4 mb-4 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-md shadow-md">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Resize Handle */}
        <div
          className="h-2 cursor-ns-resize bg-border transition-colors hover:bg-primary/60 flex justify-center items-center"
          onMouseDown={startVerticalDragging}
        >
          {/* Visual drag handle (horizontal bars) */}
          <div className="pointer-events-none flex flex-row items-center">
            <div className="h-1 w-4 bg-muted-foreground/50 mx-[1px] rounded-full"></div>
            <div className="h-1 w-4 bg-muted-foreground/50 mx-[1px] rounded-full"></div>
            <div className="h-1 w-4 bg-muted-foreground/50 mx-[1px] rounded-full"></div>
          </div>
        </div>

        {/* ENHANCED ASSISTANT PANEL - Updated to match styling */}
        <div 
          className="flex flex-col rounded-xl overflow-hidden glass-card shadow-md mb-4"
          style={{ height: `${assistantPanelHeight}%`,
        minHeight: "30%" }}
        >
          {/* Consistent Header Style to match other panels */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/20 backdrop-blur-sm">
            <div className="bg-primary/90 text-primary-foreground h-8 w-8 rounded-lg flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-base font-semibold text-primary">
              Prepleet Assistant
            </h1>
            {/* Status indicator */}
            <div className="ml-auto flex items-center gap-2">
              {/* TTS Control Button */}
              <Button
                onClick={toggleTTS}
                className={cn(
                  "h-8 w-8 p-0 rounded-md",
                  isTTSEnabled
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                title={isTTSEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
              >
                {isTTSEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              
              {/* Stop Speaking Button (only shown when speaking) */}
              {isSpeaking && (
                <Button
                  onClick={stopSpeaking}
                  className="h-8 px-2 text-xs bg-red-500/10 text-red-600 hover:bg-red-500/20"
                  title="Stop Speaking"
                >
                  Stop
                </Button>
              )}
              
              <span className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                isSpeaking 
                  ? "bg-blue-500/10 text-blue-600" 
                  : "bg-primary/10 text-primary"
              )}>
                <span className={cn(
                  "mr-1 h-1.5 w-1.5 rounded-full",
                  isSpeaking ? "bg-blue-600 animate-pulse" : "bg-primary"
                )}></span>
                {isSpeaking ? "Speaking" : "Active"}
              </span>
            </div>
          </div>

          {/* Messages with enhanced styling, clear visual hierarchy, and fixed height */}
          <ScrollArea className="flex-1 px-4 py-3 space-y-4 assistant-messages-scroll-area" style={{ maxHeight: "calc(100% - 110px)" }}> 
            <div className="viewport space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex", 
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Different styling for assistant vs user messages */}
                  {message.role === "assistant" && (
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="h-8 w-8 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-card border border-border/60 rounded-2xl px-4 py-3 shadow-sm">
                        <p className="text-sm whitespace-pre-wrap break-words text-foreground">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {message.role === "user" && (
                    <div className="flex gap-2 max-w-[85%]">
                      <div 
                        className="rounded-2xl px-4 py-3 shadow-sm"
                        style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
                      >
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Enhanced input area with styling to match other panels */}
          <div className="p-3 border-t border-border bg-muted/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Ask a question or provide input..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-background text-foreground border-input focus-visible:ring-1 focus-visible:ring-primary text-sm h-10 pl-4"
                disabled={isProcessing}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isProcessing || isRecording || !input.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 p-0"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
              <Button
                onClick={handleToggleRecording}
                disabled={isProcessing}
                className={cn(
                  "rounded-full p-2 h-10 w-10",
                  isRecording
                    ? "bg-red-500 text-white hover:bg-red-600 glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
                title={isRecording ? "Stop Recording" : "Start Recording"}
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InterviewApp;
