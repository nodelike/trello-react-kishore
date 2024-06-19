import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';  // Corrected import path and removed curly braces
import BoardsPage from './pages/BoardsPage';
import ListsPage from './pages/ListsPage';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import Navbar from './components/shared/Navbar';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoardsPage />
  },
  {
    path: "/boards",
    element: <BoardsPage />
  },
  {
    path: "/boards/:boardId",
    element: <ListsPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
