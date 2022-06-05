import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Posts from "./features/posts/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Posts />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
