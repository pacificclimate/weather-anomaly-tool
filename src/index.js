import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "@/index.css";
import App from "@/components/main/App";
import registerServiceWorker from "@/registerServiceWorker";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //notifyOnChangeProps: 'tracked',
    },
  },
  queryCache: new QueryCache({
    onError: (error) =>
      console.error("An error occurred in the query cache", error),
  }),
});

let container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

registerServiceWorker();
