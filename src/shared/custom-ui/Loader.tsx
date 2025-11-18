import MoonLoader from "react-spinners/MoonLoader";

export const Loader = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <MoonLoader color="#0077AA" size={40} />
  </div>
);
