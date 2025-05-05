
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// This key will need to be entered by the user in the UI
let apiKey = "";
let genAI: GoogleGenerativeAI | null = null;

export const initializeGenAI = (key: string) => {
  apiKey = key;
  genAI = new GoogleGenerativeAI(key);
  return genAI;
};

export const getGenAI = () => {
  if (!genAI && apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export const generateTravelPlan = async (
  source: string,
  destination: string,
  startDate: string,
  endDate: string,
  budget: string,
  travelers: number,
  interests: string[]
) => {
  const genAI = getGenAI();
  
  if (!genAI) {
    throw new Error("Gemini API not initialized. Please provide an API key.");
  }

  // Get the model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash" 
  });

  const prompt = `
    Create a comprehensive travel plan with the following details:
    - Trip from ${source} to ${destination}
    - Travel dates: ${startDate} to ${endDate} 
    - Budget: ${budget}
    - Number of travelers: ${travelers}
    - Interests: ${interests.join(", ")}

    Please provide a detailed travel itinerary including:
    1. Recommended flights or transportation options
    2. Accommodation suggestions that fit the budget
    3. Daily activities and sightseeing based on the interests
    4. Food and dining recommendations
    5. Estimated costs for major expenses
    6. Travel tips specific to the destination
    7. Alternative options if certain suggestions don't work out

    Format the response in clean sections with clear headings.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
};

export const sendFollowUpQuestion = async (
  question: string,
  travelPlan: string
) => {
  const genAI = getGenAI();
  
  if (!genAI) {
    throw new Error("Gemini API not initialized. Please provide an API key.");
  }

  // Get the model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash" 
  });

  const prompt = `
    Here is a travel plan that was previously generated:
    
    ${travelPlan}
    
    The user has a follow-up question about this travel plan:
    
    "${question}"
    
    Please provide a helpful and detailed answer to their question based on the travel plan.
    If the travel plan doesn't contain information to answer the question, provide general travel advice that would be relevant.
    Format your response using markdown for readability.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error sending follow-up question:", error);
    throw error;
  }
};
