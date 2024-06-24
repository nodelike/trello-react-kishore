import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSquareCheck,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
    Box,
    Typography,
    IconButton,
    LinearProgress,
    InputBase,
    Button,
} from "@mui/material";
import Checkitem from "./Checkitem";
import toast from "react-hot-toast";
import theme from "../styles/theme";
import { useSelector, useDispatch } from 'react-redux';
import { createNewCheckitem, modifyCheckitem, removeCheckitem, fetchCheckitems, selectCheckitemsByChecklistId } from "../features/checkitemSlice";

function Checklist({ data, deleteChecklist }) {
    const checkitems = useSelector(selectCheckitemsByChecklistId(data.id));
    const dispatch = useDispatch();

    const completedItems = checkitems.filter((item) => item.state === "complete").length;
    const percentCompletion = checkitems.length > 0 ? Math.round((completedItems /  checkitems.length) * 100) : 0;

    useEffect(() => {
        const getCheckitems = async () => {
            try {
                await dispatch(fetchCheckitems(data.id));
            } catch (error) {
                toast.error(error.message);
            }
        }
        getCheckitems();
    }, [data.id]);

    const handleUpdateCheckitem = async (event, checkitemId, checklistId, cardId) => {
        const checkState = event.target.checked ? "complete" : "incomplete";

        try {
            await dispatch(modifyCheckitem({cardId, checklistId, checkitemId, checkState}));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteCheckitem = async (checkitemId, checklistId) => {
        try {
            await dispatch(removeCheckitem({ checkitemId, checklistId}));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let checkitemName = event.target.checkitemName.value;
        try {
            if (checkitemName.length > 2) {
                event.target.checkitemName.value = "";
                await dispatch(createNewCheckitem({checkitemName, checklistId: data.id}))
            } else {
                throw new Error(
                    "Checkitem name should be more than 2 characters."
                );
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box
            sx={{
                border: "2px solid",
                borderColor: theme.palette.secondary.border,
                p: 4,
                borderRadius: 1,
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        style={{
                            width: "32px",
                            height: "32px",
                            color: theme.palette.primary.accent,
                        }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {data.name}
                    </Typography>
                </Box>
                <IconButton
                    onClick={deleteChecklist}
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
                        style={{ width: "24px", height: "24px" }}
                    />
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                <Typography
                    sx={{
                        width: "32px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    {percentCompletion}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={percentCompletion}
                    sx={{
                        width: "100%",
                        height: "10px",
                        borderRadius: "5px",
                        backgroundColor: theme.palette.primary.main,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.primary.accent,
                            transition: "0.3s ease"
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "start",
                }}
            >
                {checkitems.map((checkitem) => (
                    <Checkitem
                        key={checkitem.id}
                        checkitemData={{data:checkitem, cardId: data.idCard}}
                        deleteCheckitem={handleDeleteCheckitem}
                        updateCheckitem={handleUpdateCheckitem}
                    />
                ))}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            height: "100%",
                            minWidth: "40px",
                            fontSize: "1rem",
                            py: "15px",
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <InputBase
                        placeholder="Add item"
                        id="checkitemName"
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                            px: 4,
                            py: 1,
                            borderRadius: "5px",
                            flex: 1,
                            minHeight: "32px",
                            width: "100px",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Checklist;
