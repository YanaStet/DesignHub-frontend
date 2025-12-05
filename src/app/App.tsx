import { Suspense } from "react";
import { Routes } from "./Routes";
import { Toaster } from "@/shared/shadcn-ui/ui/sonner";

function App() {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

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
