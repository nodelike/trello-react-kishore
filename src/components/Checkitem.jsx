import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Toast from "./shared/Toast";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import theme from "../styles/theme";
import { useSelector, useDispatch } from 'react-redux';
import { modifyCheckitem, removeCheckitem, selectCheckitemsByChecklistId } from "../features/checkitemSlice";

function Checkitem({ data, cardId, updateProgressBar }) {
    const checkitems = useSelector(selectCheckitemsByChecklistId(data.idChecklist));
    const dispatch = useDispatch();

    useEffect(() => {
        updateProgressBar(checkitems);
    }, [checkitems, updateProgressBar]);

    const handleDeleteCheckitem = async () => {
        try {
            await dispatch(removeCheckitem({ checkitemId: data.id, checklistId: data.idChecklist}));
            // `checkitems` will be updated due to Redux state change, which triggers useEffect
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUpdateCheckitem = async (event) => {
        const checkState = event.target.checked ? "complete" : "incomplete";

        try {
            await dispatch(modifyCheckitem({cardId, checklistId: data.idChecklist, checkitemId: data.id, checkState}));
            // `checkitems` will be updated due to Redux state change, which triggers useEffect
        } catch (error) {
            toast.error(error.message);
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
                    onChange={handleUpdateCheckitem}
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
                onClick={handleDeleteCheckitem}
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
