import { Suspense } from "react";
import { Routes } from "./Routes";
import { Toaster } from "@/shared/shadcn-ui/ui/sonner";

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
