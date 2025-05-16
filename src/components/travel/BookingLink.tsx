
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { createBookingUrl } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BookingLinkProps {
  bookingToken: string;
}

export function BookingLink({ bookingToken }: BookingLinkProps) {
  const { toast } = useToast();
  
  const handleBooking = () => {
    const bookingUrl = createBookingUrl(bookingToken);
    
    // Open the booking URL in a new tab
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
    
    // Show a toast notification to confirm
    toast({
      title: "Opening booking page",
      description: "Redirecting you to complete your booking.",
    });
  };

  return (
    <Button 
      onClick={handleBooking} 
      className="mt-4 w-full bg-travel-blue hover:bg-travel-blue/90"
    >
      <ExternalLink className="mr-2 h-4 w-4" /> Book Now
    </Button>
  );
}
