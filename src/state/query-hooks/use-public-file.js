import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import urljoin from "url-join";

export const PUBLIC_FILE_QUERY_KEY = ["public-file"];

export const getPublicFile = async (relativePath) => {
  if (!relativePath) {
    return null;
  }
  const { data } = await axios(urljoin(process.env.PUBLIC_URL, relativePath));
  return data;
};

export const publicFileQuery = (relativePath) => ({
  queryKey: [PUBLIC_FILE_QUERY_KEY, relativePath],
  queryFn: () => getPublicFile(relativePath),
  staleTime: Infinity, // public files should rarely change while on the same version
});

export const usePublicFile = (relativePath) => {
  // if (relativePath) {
  //   throw new Error("relativePath is required");
  // }
  return useQuery(publicFileQuery(relativePath));
};

export default usePublicFile;
