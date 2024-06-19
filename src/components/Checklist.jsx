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
import { createNewCheckitem, fetchCheckitems, selectCheckitemsByChecklistId } from "../features/checkitemSlice";

function Checklist({ data, deleteChecklist }) {
    const checkitems = useSelector(selectCheckitemsByChecklistId(data.id));
    const [percentageCompleted, setPercentageCompleted] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCheckitems(data.id));
    }, [data.id, dispatch]);

    useEffect(() => {
        updateProgressBar(checkitems);
    }, [checkitems]);

    const updateProgressBar = (items) => {
        try {
            let checkedItemsCount = items.filter(
                (checkitem) => checkitem.state === "complete"
            ).length;
            let completed = items.length
                ? Math.floor((checkedItemsCount / items.length) * 100)
                : 0;
            setPercentageCompleted(completed);
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
                    {percentageCompleted}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={percentageCompleted}
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
                        updateProgressBar={updateProgressBar}
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
