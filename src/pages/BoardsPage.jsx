import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBoards, createBoard } from "../api";
import CreationForm from "../components/shared/ModalForm";
import Loader from "../components/shared/Loader";
import Toast from "../components/shared/Toast";
import toast from "react-hot-toast";
import { Container, Grid, Typography, Button, Paper } from "@mui/material";
import theme from "../styles/theme";

function BoardsPage() {
    const [boards, setBoards] = useState([]);
    const [formState, setFormState] = useState(true);
    const [loader, setLoaderState] = useState(true);

    useEffect(() => {
        async function fetchBoards() {
            try {
                setLoaderState(true);
                let boardsData = await getAllBoards();
                setBoards(boardsData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoaderState(false);
            }
        }
        fetchBoards();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let boardName = event.target.boardName.value;

        try {
            console.log(boards)
            if(boards.length == 10){
                throw new Error("Board creation limit exceeded!")
            }
            if (boardName.length > 2) {
                event.target.boardName.value = "";
                setLoaderState(true);
                let createdBoard = await createBoard(boardName);
                setBoards([createdBoard, ...boards]);
                setFormState(true);
                toast.success(`${boardName} created successfully!`);
            } else {
                throw new Error("Card name should be more than 2 characters.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
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
                    {boards.map((board) => (
                        <Grid item xs={12} sm={6} md={3} key={board.id}>
                            <Link
                                to={`/lists/${board.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 128,
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor:
                                            theme.palette.secondary.main,
                                        color: theme.palette.secondary
                                            .contrastText,
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
                            </Link>
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
