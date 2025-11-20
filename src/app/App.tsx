import { Suspense } from "react";
import { Routes } from "./Routes";
import { UserHooks } from "@/entities/users/hooks";

function App() {
  const { data: me } = UserHooks.useGetMeQuery();

  return (
    <>
      <Suspense fallback={null}>
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
