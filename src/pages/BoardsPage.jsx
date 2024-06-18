import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchBoards, createNewBoard, selectBoards } from '../features/boardsSlice';
import { setSelectedBoard } from '../features/listsSlice';
import CreationForm from '../components/shared/ModalForm';
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
  const [formState, setFormState] = useState(true);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleBoardClick = (board) => {
    navigate(`/boards/${board.id}`);
    dispatch(setSelectedBoard(board));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let boardName = event.target.boardName.value;
    try {
      if (boards.length === 10) {
        throw new Error('Board creation limit exceeded!');
      }
      if (boardName.length > 2) {
        event.target.boardName.value = '';
        dispatch(createNewBoard(boardName));
        setFormState(true);
        toast.success(`${boardName} created successfully!`);
      } else {
        throw new Error('Board name should be more than 2 characters.');
      }
    } catch (error) {
      toast.error(error.message);
    }
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFormState(false)}
              sx={{
                fontWeight: "bold",
                borderRadius: "40px",
                py: 2,
                px: 4,
                backgroundColor: theme.palette.primary.accent,
                color: theme.palette.primary.dark,
                "&:hover": {
                  backgroundColor: theme.palette.primary.accent,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              + Create Board
            </Button>
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
      <CreationForm
        state={formState}
        setState={setFormState}
        name="Board"
        onSubmit={(event) => handleSubmit(event)}
      />
      {loader && <Loader />}
      <Toast />
    </>
  );
}

export default BoardsPage;
