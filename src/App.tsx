import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from 'routes'
import './App.css'
import { AxiosInterceptor } from 'service/axiosinstance'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AxiosInterceptor>
            <AppRoutes />
          </AxiosInterceptor>
        </BrowserRouter>
      </QueryClientProvider>

    </>
  )
}

export default App
