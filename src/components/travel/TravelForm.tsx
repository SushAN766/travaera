
import { useState } from "react";
import { MapPin, Calendar, DollarSign, Users, Tag, Plus, X, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { TravelFormData } from "@/types/travel";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
  apiKey: string;
  hasSerpApiKey?: boolean;
}

const interestOptions = [
  "Adventure",
  "Art",
  "Beach",
  "Culture",
  "Food",
  "History",
  "Music",
  "Nature",
  "Nightlife",
  "Relaxation",
  "Shopping",
  "Sports",
  "Wildlife",
];

export function TravelForm({ onSubmit, isLoading, apiKey, hasSerpApiKey = false }: TravelFormProps) {
  const [customInterest, setCustomInterest] = useState("");
  const [dateRange, setDateRange] = useState<{ 
    from?: Date; 
    to?: Date; 
  } | undefined>();

  const form = useForm<TravelFormData>({
    defaultValues: {
      source: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      travelers: 1,
      interests: [],
      apiKey: apiKey || "",
      includeTransportation: false,
    },
  });

  const selectedInterests = form.watch("interests");

  const handleAddInterest = (interest: string) => {
    if (
      !selectedInterests.includes(interest) && 
      interest.trim() !== "" &&
      selectedInterests.length < 5
    ) {
      form.setValue("interests", [...selectedInterests, interest]);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    form.setValue(
      "interests",
      selectedInterests.filter((i) => i !== interest)
    );
  };

  const handleAddCustomInterest = () => {
    if (
      customInterest &&
      !selectedInterests.includes(customInterest) &&
      selectedInterests.length < 5
    ) {
      form.setValue("interests", [...selectedInterests, customInterest]);
      setCustomInterest("");
    }
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
    
    if (range.from) {
      form.setValue("startDate", format(range.from, "yyyy-MM-dd"));
    }
    
    if (range.to) {
      form.setValue("endDate", format(range.to, "yyyy-MM-dd"));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Plan Your Trip</h2>
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit({
                ...data,
                apiKey,
              });
            })}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Departure From
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City or Airport (e.g., DEL)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Destination
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City or Airport (e.g., HAN)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Travel Dates
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, yyyy")} -{" "}
                              {format(dateRange.to, "LLL dd, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, yyyy")
                          )
                        ) : (
                          <span>Select dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange as any}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $3000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Travelers
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value) || 1);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Interests (max 5)
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedInterests.map((interest) => (
                      <Button
                        key={interest}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleRemoveInterest(interest)}
                        className="flex items-center gap-1"
                        type="button"
                      >
                        {interest}
                        <X className="h-3 w-3" />
                      </Button>
                    ))}
                    {selectedInterests.length === 0 && (
                      <span className="text-sm text-muted-foreground py-1">
                        No interests selected
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Custom interest"
                      value={customInterest}
                      onChange={(e) => setCustomInterest(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      onClick={handleAddCustomInterest}
                      disabled={selectedInterests.length >= 5}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-2">
                    <p className="text-sm mb-2">Popular interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <Button
                          key={interest}
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => handleAddInterest(interest)}
                          disabled={
                            selectedInterests.includes(interest) ||
                            selectedInterests.length >= 5
                          }
                          className={
                            selectedInterests.includes(interest)
                              ? "opacity-50"
                              : ""
                          }
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeTransportation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-travel-blue" />
                      Include flight options
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {hasSerpApiKey 
                        ? "Real flight data will be fetched using SerpAPI" 
                        : "Mock flight data will be used (add a SerpAPI key to get real data)"}
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-travel-blue hover:bg-travel-blue/90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Generating Plan..." : "Generate Travel Plan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
