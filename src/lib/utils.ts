import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FlightData } from "@/types/travel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
}

export function createBookingUrl(bookingToken: string): string {
  // Create a realistic booking URL that includes the booking token
  // This simulates what a real booking API endpoint might look like
  
  // For demonstration purposes, we're using a sample booking domain
  // In a real implementation, this would point to an actual booking service
  const bookingDomain = "flights.wanderlust-ai.example.com";
  
  // Add some additional parameters that a real booking system might use
  const params = new URLSearchParams({
    token: bookingToken,
    source: "wanderlust-app",
    timestamp: new Date().getTime().toString(),
    redirect: "checkout" // Added redirect parameter to take user directly to checkout
  });
  
  return `https://${bookingDomain}/checkout?${params.toString()}`;
}

// Helper function to implement timeout for fetch requests
const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeoutMs: number = 10000
): Promise<Response> => {
  // Create an AbortController to allow canceling the fetch
  const controller = new AbortController();
  const { signal } = controller;
  
  // Create a timeout promise that rejects after the specified time
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  
  // Race the fetch against the timeout
  return Promise.race([
    fetch(url, { ...options, signal }),
    timeoutPromise
  ]);
};

export async function fetchFlightData(
  departureId: string,
  arrivalId: string,
  outboundDate: string,
  apiKey: string
): Promise<FlightData> {
  try {
    console.log(`Fetching flight data for ${departureId} to ${arrivalId} on ${outboundDate}`);
    
    // First try a more reliable proxy
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://serpapi.com/search.json?engine=google_flights&type=2&departure_id=${departureId}&arrival_id=${arrivalId}&outbound_date=${outboundDate}&currency=USD&hl=en&api_key=${apiKey}`;
    
    try {
      // Try with CORS Anywhere proxy
      const response = await fetchWithTimeout(
        `${corsAnywhere}${targetUrl}`, 
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data as FlightData;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (proxyError) {
      console.log("First proxy method failed, trying alternative method...");
      
      // If the first proxy fails, try the alternative proxy
      const allOriginsProxy = "https://api.allorigins.win/raw?url=";
      const encodedUrl = encodeURIComponent(targetUrl);
      const response = await fetchWithTimeout(allOriginsProxy + encodedUrl);
      
      if (!response.ok) {
        throw new Error(`Alternative proxy failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for SerpAPI-specific errors
      if (data.error) {
        throw new Error(`SerpAPI error: ${JSON.stringify(data.error)}`);
      }
      
      return data as FlightData;
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw error;
  }
}