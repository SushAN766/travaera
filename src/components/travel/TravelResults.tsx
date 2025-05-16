
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { FlightDetails } from "./FlightDetails";
import { ChatInterface } from "./ChatInterface";
import { FlightData } from "@/types/travel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TravelResultsProps {
  result: string;
  onStartOver: () => void;
  isLoading: boolean;
  flightData?: FlightData;
  includeTransportation?: boolean;
  onSendChatMessage?: (message: string) => Promise<string>;
}

export function TravelResults({ 
  result, 
  onStartOver, 
  isLoading, 
  flightData, 
  includeTransportation = false,
  onSendChatMessage
}: TravelResultsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Travel Plan</h2>
            <Button 
              variant="outline" 
              onClick={onStartOver}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Plan a New Trip
            </Button>
          </div>
          
          <Separator className="mb-4" />
          
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>
              {result}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {includeTransportation && (
        <div className="mb-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-8 w-8 animate-spin text-travel-blue" />
                    <p className="text-gray-500">Loading flight information...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : flightData ? (
            <Card>
              <CardContent className="p-6">
                <FlightDetails flightData={flightData} />
              </CardContent>
            </Card>
          ) : (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error fetching flights</AlertTitle>
              <AlertDescription>
                Unable to load flight data. Please try again later or check your API key.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Always show the chat interface when there's a travel plan result */}
      {result && (
        <ChatInterface 
          travelPlan={result} 
          onSendMessage={onSendChatMessage || (async () => "Sorry, I can't process your question right now.")} 
        />
      )}
    </div>
  );
}
