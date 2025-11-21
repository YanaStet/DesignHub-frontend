import { Suspense } from "react";
import { Routes } from "./Routes";

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
