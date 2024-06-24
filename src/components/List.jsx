import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import toast from "react-hot-toast";
import Toast from "./shared/Toast";
import {
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    Paper,
} from "@mui/material";
import theme from "../styles/theme";
import { createNewCard, selectCardsByListId } from "../features/cardsSlice";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards } from "../features/cardsSlice";
import { removeList } from "../features/listsSlice";

function List({ data }) {
    const cards = useSelector(selectCardsByListId(data.id));
    const dispatch = useDispatch();

    useEffect(() => {
        const getCards = async () => {
            try {
                await dispatch(fetchCards(data.id));
            } catch (error) {
                toast.error("Error in fetching lists!");
            }
        }
        getCards();
    }, []);

    const handleDeleteList = async () => {
        try {
            await dispatch(removeList(data.id))
        } catch (error) {
            toast.error("Error in deleting list!");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardName = event.target.cardName.value;
        try {
            if (cardName.length > 2) {
                event.target.cardName.value = "";
                await dispatch(createNewCard({ cardName, listId: data.id }));
                toast.success(`${cardName} created successfully!`);
            } else {
                throw new Error("Card name should be more than 2 characters.");
            }
        } catch (error) {
            toast.error("Error in creating new list");
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: theme.palette.secondary.main,
                border: `2px solid ${theme.palette.primary.main}`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {data.name}
                </Typography>
                <IconButton
                    onClick={handleDeleteList}
                    sx={{
                        color: theme.palette.primary.delete,
                        "&:hover": {
                            color: theme.palette.primary.deleteHover, // Change to your desired color on hover
                        },
                        transition: "0.1s ease"
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    overflowY: "auto",
                    maxHeight: 400,
                }}
            >
                {cards.map((card) => (
                    <Card
                        data={card}
                        key={card.id}
                    />
                ))}
            </Box>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 40, height: 40 }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <TextField
                    variant="outlined"
                    placeholder="Enter card name"
                    id="cardName"
                    name="cardName"
                    size="small"
                    sx={{ flexGrow: 1 }}
                />
            </form>
            <Toast />
        </Paper>
    );
}

export default List;
