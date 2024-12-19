"use client";

// Libs & Utils
import { useEffect } from "react";
import Link from "next/link";

// UI Components
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 rounded-lg">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-24 w-24 text-red-500" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="error-details">
              <AccordionTrigger>Show error details</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  {error.message}
                  {error.digest && (
                    <span className="block mt-2">Error ID: {error.digest}</span>
                  )}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
