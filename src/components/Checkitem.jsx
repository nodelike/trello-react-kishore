import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCheckitem, updateCheckitem } from "../api";
import toast from "react-hot-toast";
import Toast from "./shared/Toast";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import theme from "../styles/theme";

function Checkitem({
    data,
    cardId,
    checkitems,
    setCheckitems,
    updateProgressBar,
}) {
    const handleDeleteCheckitem = async (checkitemId) => {
        const originalCheckitems = [...checkitems];
        const newCheckitems = checkitems.filter(
            (checkitem) => checkitem.id !== checkitemId
        );
        setCheckitems(newCheckitems);
        updateProgressBar(newCheckitems);

        try {
            await deleteCheckitem(data.id, data.idChecklist);
        } catch (error) {
            toast.error(error.message);
            setCheckitems(originalCheckitems);
            updateProgressBar(originalCheckitems);
        }
    };

    const handleUpdateCheckitem = async (event, id) => {
        const checkState = event.target.checked ? "complete" : "incomplete";

        const originalCheckitems = [...checkitems];
        const updatedList = checkitems.map((checkitem) =>
            checkitem.id === id
                ? { ...checkitem, state: checkState }
                : checkitem
        );
        setCheckitems(updatedList);
        updateProgressBar(updatedList);

        try {
            await updateCheckitem(cardId, id, checkState);
        } catch (error) {
            toast.error(error.message);
            setCheckitems(originalCheckitems);
            updateProgressBar(originalCheckitems);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: theme.palette.secondary.dark,
                p: 0,
                pr: 1,
                borderRadius: 1,
                mb: 1,
            }}
            key={data.id}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox
                    checked={data.state === "complete"}
                    onChange={(event) => handleUpdateCheckitem(event, data.id)}
                    sx={{
                        color: "white",
                        "&.Mui-checked": {
                            color: theme.palette.primary.accent,
                        },
                    }}
                />
                <Typography>{data.name}</Typography>
            </Box>
            <IconButton
                onClick={() => handleDeleteCheckitem(data.id)}
                sx={{
                    color: theme.palette.primary.delete,
                    "&:hover": {
                        color: theme.palette.primary.deleteHover, // Change to your desired color on hover
                    },
                    transition: "0.1s ease",
                    fontSize: "1.2rem",
                }}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </IconButton>
            <Toast />
        </Box>
    );
}

export default Checkitem;
