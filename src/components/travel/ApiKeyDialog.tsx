
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ApiKeyInput } from "./ApiKeyInput";
import { ApiKeyFormData } from "@/types/travel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ApiKeyDialogProps {
  onApiKeySave: (data: ApiKeyFormData) => void;
  currentGeminiKey?: string;
  currentSerpApiKey?: string;
}

export function ApiKeyDialog({ onApiKeySave, currentGeminiKey, currentSerpApiKey }: ApiKeyDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (data: ApiKeyFormData) => {
    onApiKeySave(data);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          API Keys
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage API Keys</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter your API keys to enable full functionality
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-sm">
              SerpAPI requires a paid subscription. Make sure your account has access to the Google Flights API and your key is active.
              Some regions may have access restrictions.
            </AlertDescription>
          </Alert>
          
          <ApiKeyInput 
            onSubmit={handleSubmit} 
            initialGeminiKey={currentGeminiKey}
            initialSerpApiKey={currentSerpApiKey}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
