import React, { useState, useRef } from "react";
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
import { createNewBoard } from '../../features/boardsSlice';
import { createNewList } from "../../features/listsSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";




function ModalForm({ name }) {
    const { boardId } = useParams();
    const itemNameRef = useRef();
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let itemName = itemNameRef.current.value;
        try {
          if (itemName.length > 2) {
            itemNameRef.current.value = '';
            if(name == "Board"){
                dispatch(createNewBoard(itemName))
            } else {
                await dispatch(createNewList({ listName:itemName, boardId}));
            }
            setModalOpen(false);
            toast.success(`${itemName} created successfully!`);
          } else {
            throw new Error(`${name} name should be more than 2 characters.`);
          }
        } catch (error) {
          toast.error(error.message);
        }
    };
    
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setModalOpen(true)}
                sx={{
                    fontWeight: "bold",
                    borderRadius: "40px",
                    py: 2,
                    px: 4,
                    backgroundColor: theme.palette.primary.accent,
                    color: theme.palette.primary.dark,
                    "&:hover": {
                    backgroundColor: theme.palette.primary.accent,
                    color: theme.palette.primary.dark,
                    },
                }}
            >
                + Create {name}
            </Button>
            <Dialog open={isModalOpen} onClose={() => setModalOpen(true)}>
                <DialogTitle
                    style={{ backgroundColor: theme.palette.secondary.main }}
                    component="div"
                >
                    <Typography variant="h6" align="center">
                        Create a new {name}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setModalOpen(false)}
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
                <form onSubmit={handleSubmit}>
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
                            id="itemName"
                            label={`${name} title`}
                            type="text"
                            fullWidth
                            variant="outlined"
                            inputRef={itemNameRef}
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
        </>
    );
}

export default ModalForm;
