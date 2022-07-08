import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Header from "./features/header/Header";
import PostDetails from "./features/posts/PostDetails";
import Posts from "./features/posts/Posts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollbarWidth: "thin",
      },
      "html::-webkit-scrollbar": {
        width: "8px",
      },
      "html::-webkit-scrollbar-thumb": {
        backgroundColor: "#72757b",
      },
    },
  },
});

function Layout() {
  return (
    <Box>
      <Header />
      <Box marginTop="48px">
        <Outlet />
      </Box>
    </Box>
  );
}

function NotFound() {
  return <Box>404</Box>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Posts />}>
                <Route path=":sub/:sort" element={<Posts />} />
              </Route>
              <Route path=":sub/comments/:id" element={<PostDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
