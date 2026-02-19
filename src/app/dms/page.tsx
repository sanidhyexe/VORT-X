
import DmsPage from "@/components/dms/dms-page";
import { Suspense } from "react";

/**
 * A fallback component to display while the main Direct Messages page content is loading.
 * @returns {JSX.Element} A loading indicator.
 */
function DmsPageFallback() {
    // You can add a loading skeleton here if you want
    return <div>Loading DMs...</div>
}

/**
 * The main page for Direct Messages. It includes the app header and wraps the core
 * DMS functionality in a Suspense boundary to handle loading states gracefully.
 * @returns {JSX.Element} The rendered Direct Messages page.
 */
export default function DirectMessagesPage() {
  return (
    <Suspense fallback={<DmsPageFallback />}>
        <DmsPage />
    </Suspense>
  );
}
