
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  travelPlan: string;
  onSendMessage: (message: string) => Promise<string>;
}

export function ChatInterface({ travelPlan, onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage = { role: "user" as const, content: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input field
    setNewMessage("");
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Send message to API and get response
      const response = await onSendMessage(newMessage);
      
      // Add assistant response to the chat
      setMessages((prev) => [
        ...prev, 
        { role: "assistant" as const, content: response }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-travel-blue" />
          <h3 className="text-xl font-semibold">Ask Follow-up Questions</h3>
        </div>
        
        {messages.length > 0 ? (
          <div className="mb-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  message.role === "user" 
                    ? "bg-travel-blue/10 ml-auto max-w-[80%]" 
                    : "bg-gray-100 mr-auto max-w-[80%]"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 my-8">
            <p>Have questions about your travel plan? Ask away!</p>
            <p className="text-sm mt-2">
              Examples: "What should I pack?", "Any local customs I should know about?", 
              "Can you suggest alternative activities?"
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="resize-none flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim() || isLoading}
            className="bg-travel-blue hover:bg-travel-blue/90 self-end"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
