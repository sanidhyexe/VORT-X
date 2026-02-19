
import HostedTournaments from "@/components/dashboard/hosted-tournaments";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function HostedTournamentsPage() {
  return (
      <div className="container p-4 sm:p-6">
        <div className="mx-auto max-w-2xl space-y-4">
           <Button asChild variant="ghost" className="mb-2 -ml-4">
             <Link href="/">
               <ChevronLeft className="mr-2 h-4 w-4" />
               Back to Dashboard
             </Link>
           </Button>
           <HostedTournaments />
        </div>
      </div>
  );
}
