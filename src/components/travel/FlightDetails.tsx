
import { BestFlight, FlightData } from "@/types/travel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration, formatTimestamp } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Plane, Calendar, Clock, Banknote, Info } from "lucide-react";
import Image from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { BookingLink } from "./BookingLink";

interface FlightDetailsProps {
  flightData: FlightData;
}

export function FlightDetails({ flightData }: FlightDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Plane className="h-6 w-6" />
        Available Flights
      </h2>
      
      {flightData.best_flights.map((flight, index) => (
        <FlightCard key={index} flight={flight} index={index} />
      ))}
    </div>
  );
}

function FlightCard({ flight, index }: { flight: BestFlight; index: number }) {
  const firstFlight = flight.flights[0];
  const lastFlight = flight.flights[flight.flights.length - 1];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Option {index + 1}</CardTitle>
          <Badge className="bg-travel-blue">${flight.price}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {flight.airline_logo && (
              <img 
                src={flight.airline_logo} 
                alt={firstFlight.airline} 
                className="h-8 w-8 object-contain"
              />
            )}
            <div>
              <p className="font-medium">{firstFlight.airline}</p>
              <p className="text-sm text-gray-500">{flight.type}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {formatDuration(flight.total_duration)}
            </div>
            {flight.flights.length > 1 && (
              <p className="text-sm text-gray-500">
                {flight.flights.length - 1} stop{flight.flights.length - 1 > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-bold">{firstFlight.departure_airport.id}</p>
            <p className="text-sm text-gray-500">
              {formatTimestamp(firstFlight.departure_airport.time)}
            </p>
          </div>
          <div className="flex-1 px-4">
            <div className="relative h-0.5 bg-gray-200 w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <Plane className="h-4 w-4 text-travel-blue rotate-90" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{lastFlight.arrival_airport.id}</p>
            <p className="text-sm text-gray-500">
              {formatTimestamp(lastFlight.arrival_airport.time)}
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger className="text-sm">Flight Details</AccordionTrigger>
            <AccordionContent>
              {flight.flights.map((segment, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  {idx > 0 && (
                    <div className="py-2 px-3 bg-gray-50 rounded my-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {formatDuration(flight.layovers[idx - 1].duration)} layover at {flight.layovers[idx - 1].name} ({flight.layovers[idx - 1].id})
                      </span>
                    </div>
                  )}
                  
                  <div className="border rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={segment.airline_logo} 
                        alt={segment.airline} 
                        className="h-6 w-6 object-contain"
                      />
                      <span className="font-medium">{segment.airline} {segment.flight_number}</span>
                      <Badge variant="outline">{segment.travel_class}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium">{segment.departure_airport.id} → {segment.arrival_airport.id}</p>
                        <p className="text-xs text-gray-500">{segment.airplane}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatTimestamp(segment.departure_airport.time)} - {formatTimestamp(segment.arrival_airport.time)}</p>
                        <p className="text-xs text-gray-500">{formatDuration(segment.duration)}</p>
                      </div>
                    </div>
                    
                    {segment.extensions && segment.extensions.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        <ul className="list-disc list-inside space-y-1">
                          {segment.extensions.map((ext, extIdx) => (
                            <li key={extIdx}>{ext}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add the booking link button */}
              <BookingLink bookingToken={flight.booking_token} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
