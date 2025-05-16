
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiKeyFormData } from "@/types/travel";
import { useForm } from "react-hook-form";
import { Key } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ApiKeyInputProps {
  onSubmit: (data: ApiKeyFormData) => void;
  initialGeminiKey?: string;
  initialSerpApiKey?: string;
  isDialog?: boolean;
}

export function ApiKeyInput({ 
  onSubmit, 
  initialGeminiKey = "", 
  initialSerpApiKey = "", 
  isDialog = false 
}: ApiKeyInputProps) {
  const form = useForm<ApiKeyFormData>({
    defaultValues: {
      apiKey: initialGeminiKey,
      serpApiKey: initialSerpApiKey,
    },
  });

  return (
    <Card className={isDialog ? "" : "w-full max-w-md mx-auto"}>
      {!isDialog && (
        <CardHeader>
          <CardTitle className="text-center">API Keys</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Gemini API Key (Required)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Google Gemini API key"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-2">
                    Your API key is stored locally in your browser and is not sent to our servers. 
                    Get your key at{" "}
                    <a
                      href="https://ai.google.dev/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-travel-blue underline hover:text-travel-blue/90"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serpApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    SerpAPI Key (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your SerpAPI key for flight data"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-2">
                    SerpAPI key is needed for real flight data. Get your key at{" "}
                    <a
                      href="https://serpapi.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-travel-blue underline hover:text-travel-blue/90"
                    >
                      SerpAPI
                    </a>
                  </p>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-travel-blue hover:bg-travel-blue/90 transition"
            >
              {isDialog ? "Save Keys" : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
