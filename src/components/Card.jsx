import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { removeCard } from "../features/cardsSlice";
import { useSelector, useDispatch } from 'react-redux'
import CardModal from "./CardModal";
import { Typography, IconButton, Paper } from "@mui/material";
import toast from "react-hot-toast";
import theme from "../styles/theme";

function Card({ data }) {
    const [cardModalState, setModalState] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteCard = async (event) => {
        event.stopPropagation();
        try {
            dispatch(removeCard({ cardId: data.id, listId: data.idList}));
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    border: 2,
                    borderColor: theme.palette.primary.main,
                    backgroundColor: "black",
                    color: "white",
                    cursor: "pointer",
                    mb: 1,
                }}
                onClick={() => setModalState(true)}
            >
                <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "white" }}
                >
                    {data.name}
                </Typography>
                <IconButton
                    onClick={handleDeleteCard}
                    sx={{
                        color: theme.palette.primary.delete,
                        "&:hover": {
                            color: theme.palette.primary.deleteHover, // Change to your desired color on hover
                        },
                        transition: "0.1s ease",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ fontSize: "1.2rem" }}
                    />
                </IconButton>
            </Paper>
            {cardModalState && (
                <CardModal
                    state={cardModalState}
                    setModalState={setModalState}
                    data={data}
                    key={data.id}
                />
            )}
        </>
    );
}

export default Card;
