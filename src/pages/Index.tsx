
import { useState, useEffect } from "react";
import { TravelForm } from "@/components/travel/TravelForm";
import { TravelResults } from "@/components/travel/TravelResults";
import { ApiKeyInput } from "@/components/travel/ApiKeyInput";
import { ApiKeyDialog } from "@/components/travel/ApiKeyDialog";
import { TravelFormData, ApiKeyFormData, FlightData } from "@/types/travel";
import { generateTravelPlan, initializeGenAI, sendFollowUpQuestion } from "@/lib/gemini";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plane, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockFlightData } from "@/lib/mockFlightData";
import { fetchFlightData } from "@/lib/utils";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [serpApiKey, setSerpApiKey] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingFlights, setIsLoadingFlights] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [includeTransportation, setIncludeTransportation] = useState<boolean>(false);
  const [flightData, setFlightData] = useState<FlightData | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const storedApiKey = localStorage.getItem("gemini-api-key");
    const storedSerpApiKey = localStorage.getItem("serp-api-key");
    
    if (storedApiKey) {
      setApiKey(storedApiKey);
      try {
        initializeGenAI(storedApiKey);
      } catch (error) {
        console.error("Error initializing Gemini API:", error);
      }
    }
    
    if (storedSerpApiKey) {
      setSerpApiKey(storedSerpApiKey);
    }
  }, []);

  const handleApiKeySubmit = (data: ApiKeyFormData) => {
    try {
      initializeGenAI(data.apiKey);
      localStorage.setItem("gemini-api-key", data.apiKey);
      setApiKey(data.apiKey);
      
      if (data.serpApiKey) {
        localStorage.setItem("serp-api-key", data.serpApiKey);
        setSerpApiKey(data.serpApiKey);
      }
      
      toast({
        title: "API keys saved",
        description: "Your API keys have been saved in your browser.",
      });
    } catch (error) {
      console.error("Error setting API key:", error);
      toast({
        title: "Error",
        description: "Could not initialize the Gemini API with the provided key.",
        variant: "destructive",
      });
    }
  };

  const handleTravelFormSubmit = async (data: TravelFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const travelPlan = await generateTravelPlan(
        data.source,
        data.destination,
        data.startDate,
        data.endDate,
        data.budget,
        data.travelers,
        data.interests
      );
      setResult(travelPlan);
      
      // Set flight data if transportation is requested
      if (data.includeTransportation) {
        setIncludeTransportation(true);
        
        if (serpApiKey) {
          try {
            setIsLoadingFlights(true);
            toast({
              title: "Fetching flight data",
              description: "Getting real flight information for your trip...",
            });
            
            // Extract airport codes from source and destination
            // For a real implementation, you would need to handle this better
            const sourceMatch = data.source.match(/\(([A-Z]{3})\)/);
            const destinationMatch = data.destination.match(/\(([A-Z]{3})\)/);
            
            const sourceCode = sourceMatch ? sourceMatch[1] : "DEL"; // Default to DEL if not found
            const destCode = destinationMatch ? destinationMatch[1] : "HAN"; // Default to HAN if not found
            
            // Format the date for the API (YYYY-MM-DD)
            const formattedDate = data.startDate;
            
            console.log(`Using SerpAPI key: ${serpApiKey ? "Yes (key provided)" : "No"}`);
            console.log(`Fetching flights from ${sourceCode} to ${destCode} on ${formattedDate}`);
            
            try {
              const realFlightData = await fetchFlightData(
                sourceCode,
                destCode,
                formattedDate,
                serpApiKey
              );
              
              setFlightData(realFlightData);
              toast({
                title: "Success",
                description: "Real flight data has been loaded successfully.",
              });
            } catch (flightError: any) {
              console.error("Error fetching flight data:", flightError);
              
              // Provide a more detailed error message based on the error
              let errorMessage = "Could not load flight data. Using mock data instead.";
              
              if (flightError.message && flightError.message.includes("403")) {
                errorMessage = "Access denied by SerpAPI. Check your API key or SerpAPI subscription.";
              } else if (flightError.message && flightError.message.includes("429")) {
                errorMessage = "SerpAPI rate limit exceeded. Try again later.";
              } else if (flightError.message && flightError.message.includes("CORS")) {
                errorMessage = "CORS error when accessing SerpAPI. Using mock data instead.";
              }
              
              toast({
                title: "Error fetching flights",
                description: errorMessage,
                variant: "destructive",
              });
              
              setFlightData(mockFlightData);
            } finally {
              setIsLoadingFlights(false);
            }
          } catch (error) {
            console.error("General flight data error:", error);
            toast({
              title: "Error",
              description: "Something went wrong while fetching flight data. Using mock data instead.",
              variant: "destructive",
            });
            setFlightData(mockFlightData);
            setIsLoadingFlights(false);
          }
        } else {
          // If no SerpAPI key, use mock data
          setFlightData(mockFlightData);
          toast({
            title: "Using mock flight data",
            description: "Add a SerpAPI key to fetch real flight data.",
            variant: "default",
          });
        }
      } else {
        setIncludeTransportation(false);
        setFlightData(undefined);
      }
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error generating travel plan:", error);
      setError("Failed to generate travel plan. Please check your API key and try again.");
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setResult("");
    setIncludeTransportation(false);
    setFlightData(undefined);
  };

  const handleSendChatMessage = async (message: string): Promise<string> => {
    if (!apiKey) {
      throw new Error("API key is not set");
    }
    
    if (!result) {
      throw new Error("No travel plan to reference");
    }
    
    try {
      const response = await sendFollowUpQuestion(message, result);
      return response;
    } catch (error) {
      console.error("Error sending follow-up question:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky/10 to-white">
      <header className="py-8 text-center relative">
        <div className="absolute right-4 top-4">
          <ApiKeyDialog 
            onApiKeySave={handleApiKeySubmit}
            currentGeminiKey={apiKey}
            currentSerpApiKey={serpApiKey}
          />
        </div>
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-travel-blue">
          <Plane className="h-8 w-8" /> 
          Wanderlust AI
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Your AI Travel Planner
        </p>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8 mb-16">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!apiKey ? (
          <ApiKeyInput 
            onSubmit={handleApiKeySubmit} 
            initialSerpApiKey={serpApiKey}
          />
        ) : result ? (
          <TravelResults 
            result={result} 
            onStartOver={handleStartOver} 
            isLoading={isLoading || isLoadingFlights}
            flightData={flightData}
            includeTransportation={includeTransportation}
            onSendChatMessage={handleSendChatMessage}
          />
        ) : (
          <TravelForm 
            onSubmit={handleTravelFormSubmit} 
            isLoading={isLoading} 
            apiKey={apiKey}
            hasSerpApiKey={!!serpApiKey}
          />
        )}
      </main>

      <footer className="py-6 bg-gray-100 text-center text-gray-600 text-sm">
        <p>Wanderlust AI Travel Planner</p>
        <p>Powered by Google Generative AI</p>
      </footer>
    </div>
  );
};

export default Index;
