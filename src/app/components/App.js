import Main from './Main';
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.sessionStorage,
});


export default function App() {
  return (
    <ThemeProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Main />
        <ReactQueryDevtools initialIsOpen />
      </PersistQueryClientProvider>
    </ThemeProvider>
  );
}