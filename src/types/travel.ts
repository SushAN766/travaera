
export interface TravelFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
  apiKey: string;
  includeTransportation?: boolean;
}

export interface ApiKeyFormData {
  apiKey: string;
  serpApiKey?: string;
}

export interface FlightData {
  best_flights: BestFlight[];
}

export interface BestFlight {
  flights: Flight[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  booking_token: string;
}

export interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: string[];
  overnight?: boolean;
}

export interface Airport {
  name: string;
  id: string;
  time: string;
}

export interface Layover {
  duration: number;
  name: string;
  id: string;
}

export interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}
