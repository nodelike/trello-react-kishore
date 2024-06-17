import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import theme from "../../styles/theme";

function CreationForm({ state, setState, name, onSubmit }) {
    return (
        <Dialog open={!state} onClose={() => setState(true)}>
            <DialogTitle
                style={{ backgroundColor: theme.palette.secondary.main }}
                component="div"
            >
                <Typography variant="h6" align="center">
                    Create a new {name}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={() => setState(true)}
                    sx={{
                        position: "absolute",
                        right: theme.spacing(1),
                        top: theme.spacing(1),
                        color: theme.palette.grey[500],
                    }}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: theme.palette.primary.contrastText }}
                    />
                </IconButton>
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent
                    dividers
                    style={{
                        backgroundColor: theme.palette.secondary.main,
                        borderTop: `1px solid ${theme.palette.secondary.border}`,
                        borderBottom: `1px solid ${theme.palette.secondary.border}`,
                    }}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="boardName"
                        label={`${name} title`}
                        type="text"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: theme.palette.text.primary },
                        }}
                        InputProps={{
                            style: { color: theme.palette.text.primary },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme.palette.text.primary,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme.palette.secondary.border,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.secondary.border,
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 2,
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            border: `2px solid ${theme.palette.secondary.border}`,
                        }}
                    >
                        Create
                    </Button>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default CreationForm;
