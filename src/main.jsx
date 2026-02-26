import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import router from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './features/public/loading';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <Suspense fallback={<Loading />}> */}
        <RouterProvider router={router} />
        {/* </Suspense> */}
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
