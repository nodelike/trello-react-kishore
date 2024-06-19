import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import List from "../components/List";
import CreationForm from "../components/shared/ModalForm";
import Loader from "../components/shared/Loader";
import Toast from "../components/shared/Toast";
import toast from "react-hot-toast";
import theme from "../styles/theme";
import {
    createNewList,
    fetchLists,
    selectLists,
} from "../features/listsSlice";
import { selectLoader } from "../features/loaderSlice";
import { fetchBoard, selectSelectedBoard } from "../features/boardsSlice";

function ListsPage() {
    const { boardId } = useParams();
    const selectedBoard = useSelector(selectSelectedBoard(boardId));
    const lists = useSelector(selectLists);
    const loader = useSelector(selectLoader);
    const [formState, setFormState] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(fetchBoard(boardId));
        } catch (error) {
            toast.error(error.message);
        }
    }, [dispatch, boardId])

    useEffect(() => {
        try {
            if (selectedBoard.id) {
                dispatch(fetchLists(selectedBoard.id));
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [dispatch, selectedBoard.id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const listName = event.target.listName.value;
        try {
            if (listName.length > 2) {
                event.target.listName.value = "";
                await dispatch(
                    createNewList({ listName, boardId: selectedBoard.id })
                );
                setFormState(true);
                toast.success(`${listName} created successfully!`);
            } else {
                throw new Error("List name should be more than 2 characters.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "80%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    py: 8,
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                >
                    <Grid
                        item
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                        <IconButton component={Link} to="/">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{
                                    color: theme.palette.secondary.contrastText,
                                }}
                            />
                        </IconButton>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: 2,
                                margin: 0,
                            }}
                            gutterBottom
                        >
                            {selectedBoard.name}
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
                                    backgroundColor:
                                        theme.palette.primary.accent,
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            + Create List
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        alignItems: { md: "start", xs: "center" },
                        gap: 2,
                        p: 2,
                        overflowX: { md: "scroll", sm: "auto" },
                    }}
                >
                    {lists && lists.length > 0 ? (
                        lists.map((list) => <List data={list} key={list.id} />)
                    ) : (
                        <Typography
                            sx={{
                                textAlign: "center",
                                width: "100%",
                                fontWeight: "500",
                                fontSize: "1.3rem",
                                py: 12,
                            }}
                        >
                            No lists available...
                        </Typography>
                    )}
                </Box>
            </Box>
            <Box sx={{position: "absolute", bottom: 10, right: 20, fontWeight: "400" , letterSpacing: "2px", color: "#444"}}>Implemented with REDUX</Box>
            <CreationForm
                state={formState}
                setState={setFormState}
                name="list"
                onSubmit={handleSubmit}
            />
            {loader && <Loader />}
            <Toast />
        </>
    );
}

export default ListsPage;
