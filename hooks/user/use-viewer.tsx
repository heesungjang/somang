import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const useViewer = () => {
  const viewer = useQuery(api.users.viewer);

  return viewer;
};

export default useViewer;
