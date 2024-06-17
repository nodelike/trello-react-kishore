import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardsPage from './pages/BoardsPage';
import ListsPage from './pages/ListsPage';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import Navbar from './components/shared/Navbar';

const router = createBrowserRouter([
    {
        path: "/",
        element: <BoardsPage />
    },
    {
        path: "/lists/:boardId",
        element: <ListsPage />
    },

])

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
