// app/search/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import SearchResults from "@/components/SearchResults";
import { Card } from "@/components/ui/card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  if (!query) {
    return (
      <div className="container mx-auto py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Search HealthSync</h1>
          <p className="text-muted-foreground">
            Please enter a search term to find doctors, hospitals, or departments.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-6">
      <div className="container mx-auto">
        <Card className="mb-6 p-6">
          <h1 className="text-2xl font-semibold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Showing results for doctors and hospitals
          </p>
        </Card>
        <SearchResults searchQuery={query} />
      </div>
    </div>
  );
}