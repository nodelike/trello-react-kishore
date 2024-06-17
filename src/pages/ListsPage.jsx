import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    CircularProgress,
    Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getLists, createList } from "../api";
import List from "../components/List";
import CreationForm from "../components/shared/ModalForm";
import Loader from "../components/shared/Loader";
import Toast from "../components/shared/Toast";
import toast from "react-hot-toast";
import theme from "../styles/theme";

function ListsPage() {
    const { boardId } = useParams();
    const [lists, setLists] = useState([]);
    const [formState, setFormState] = useState(true);
    const [loader, setLoaderState] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                setLoaderState(true);
                const listsData = await getLists(boardId);
                setLists(listsData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoaderState(false);
            }
        };
        fetchLists();
    }, [boardId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const listName = event.target.boardName.value;
        try {
            if (listName.length > 2) {
                event.target.boardName.value = "";

                const createdList = await createList(listName, boardId);
                setLists([createdList, ...lists]);
                toast.success(`${listName} created successfully!`);
            } else {
                throw new Error("List name should be more than 2 characters.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setFormState(true);
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
                            Lists
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
                    {lists.length > 0 || loader ? (lists.map((list) => (
                        <List
                            data={list}
                            key={list.id}
                            lists={lists}
                            setLists={setLists}
                            setLoaderState={setLoaderState}
                        />
                    ))) : (<Typography sx={{textAlign: "center", width: "100%", fontWeight: "500", fontSize: "1.3rem", py: 12}}>No lists available...</Typography>)}
                </Box>
            </Box>
            <CreationForm
                state={formState}
                setState={setFormState}
                name="List"
                onSubmit={handleSubmit}
            />
            {loader && <Loader />}
            <Toast />
        </>
    );
}

export default ListsPage;
