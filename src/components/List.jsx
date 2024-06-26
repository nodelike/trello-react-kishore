import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getCards, createCard, deleteList } from "../api";
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

function List({ data, lists, setLists, setLoaderState }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoaderState(true);
                const cardsData = await getCards(data.id);
                setCards(cardsData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoaderState(false);
            }
        };
        fetchCards();
    }, [data.id, setLoaderState]);

    const handleDeleteList = async () => {
        const originalList = [...lists];
        const newList = lists.filter((list) => list.id !== data.id);
        setLists(newList);

        try {
            setLoaderState(true);
            await deleteList(data.id);
        } catch (error) {
            toast.error(error.message);
            setLists(originalList);
        } finally {
            setLoaderState(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardName = event.target.cardName.value;
        try {
            if (cardName.length > 2) {
                setLoaderState(true);
                event.target.cardName.value = "";
                const createdCard = await createCard(cardName, data.id);
                setCards([createdCard, ...cards]);
                toast.success(`${cardName} created successfully!`);
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
                        cards={cards}
                        setCards={setCards}
                        setLoaderState={setLoaderState}
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
