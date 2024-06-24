import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchBoards, createNewBoard, selectBoards } from '../features/boardsSlice';
import ModalForm from '../components/shared/ModalForm';
import Loader from '../components/shared/Loader';
import Toast from '../components/shared/Toast';
import toast from 'react-hot-toast';
import theme from '../styles/theme';
import { selectLoader } from '../features/loaderSlice';

function BoardsPage() {
  const boards = useSelector(selectBoards);
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getBoards = async () => {
      try {
          dispatch(fetchBoards());
      } catch (error) {
          toast.error(error.message);
      }
    }
    getBoards();
  }, []);

  const handleBoardClick = (board) => {
    navigate(`/boards/${board.id}`);
  };


  return (
    <>
      <Container sx={{ width: "80%", py: 8 }} disableGutters>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          gap={3}
        >
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                letterSpacing: "2px",
                margin: 0,
              }}
              gutterBottom
            >
              Boards
            </Typography>
          </Grid>
          <Grid item>
            {boards.length != 10 && (<ModalForm name="Board"/>)}
          
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {boards.length > 0 && boards.map((board) => (
            <Grid item xs={12} sm={6} md={3} key={board.id}>
              <Paper
                onClick={() => handleBoardClick(board)}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 128,
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  border: `3px solid ${theme.palette.primary.main}`,
                  transition: "0.1s ease-in",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                {board.name}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{position: "absolute", bottom: 10, right: 20, fontWeight: "400" , letterSpacing: "2px", color: "#555"}}>Implemented with REDUX</Box>
      {loader && <Loader />}
      <Toast />
    </>
  );
}

export default BoardsPage;
