import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Toast from "./shared/Toast";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import theme from "../styles/theme";

function Checkitem({ checkitemData, deleteCheckitem, updateCheckitem }) {
    const { data, cardId } = checkitemData;

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
                    onChange={(event) => updateCheckitem(event, data.id, data.idChecklist, cardId)}
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
                onClick={() => deleteCheckitem(data.id, data.idChecklist)}
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
