import { Suspense } from "react";
import { ChatScreen } from "features/chat/components/chat-screen/ChatScreen";
import { ErrorBoundary } from "shared/components/error-boundary/ErrorBoundary";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen text-kumo-inactive">
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ChatScreen />
      </Suspense>
    </ErrorBoundary>
  );
}
