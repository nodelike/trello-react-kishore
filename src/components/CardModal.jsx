import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Checklist from "./Checklist";
import {
    createNewChecklist,
    removeChecklist,
    selectChecklistsbyCardId,
    fetchChecklists
} from "../features/checklistSlice";
import toast from "react-hot-toast";
import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    InputBase,
    Typography,
} from "@mui/material";
import theme from "../styles/theme";
import { useSelector, useDispatch } from "react-redux";

function CardModal({ state, setModalState, data, setLoaderState }) {
    const checklists = useSelector(selectChecklistsbyCardId(data.id));
    const dispatch = useDispatch();

    useEffect(() => {
        const getChecklists = async () => {
            try {
                await dispatch(fetchChecklists(data.id));
            } catch (error) {
                toast.error("Error in fetching checklists");
            }
        }
        getChecklists();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const checklistName = event.target.checklistName.value;
        try {
            if (checklistName.length > 2) {
                event.target.checklistName.value = "";
                await dispatch(createNewChecklist({ cardName: checklistName, cardId: data.id }));
                toast.success(`${checklistName} created successfully!`);
            } else {
                throw new Error("Checklist name should be more than 2 characters.");
            }
        } catch (error) {
            toast.error("Error in creating checklist");
        }
    };

    const handleDeleteChecklist = async (checklistId) => {
        try {
            await dispatch(removeChecklist({ checklistId, cardId: data.id }));
        } catch (error) {
            toast.error("Error in handling checklist!");
        }
    };

    return (
        <Modal
            open={state}
            onClose={() => setModalState(false)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(5px)",
                zIndex: 1200
            }}
        >
            <Paper
                sx={{
                    position: "relative",
                    width: { md: "60%", xs: "80%" },
                    maxHeight: "90%",
                    maxWidth: "800px",
                    overflow: "auto",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: theme.palette.secondary.main,
                    border: 1,
                    borderColor: theme.palette.primary.main,
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        color: theme.palette.primary.contrastText,
                        width: "48px",
                        height: "48px",
                    }}
                    onClick={() => setModalState(false)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        pb: 1,
                        mb: 2,
                    }}
                >
                    {data.name}
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ minWidth: "40px", minHeight: "48px" }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <InputBase
                        placeholder="Add new Checklist"
                        id="checklistName"
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                            px: 4,
                            py: 1,
                            borderRadius: "5px",
                            flex: 1,
                            minHeight: "32px",
                            width: "100px",
                        }}
                        autoFocus
                    />
                </form>
                <Box
                    sx={{
                        mt: 2,
                        overflowY: "auto",
                        maxHeight: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    {checklists.map((checklist) => (
                        <Checklist
                            data={checklist}
                            key={checklist.id}
                            deleteChecklist={() =>
                                handleDeleteChecklist(checklist.id)
                            }
                            setLoaderState={setLoaderState}
                        />
                    ))}
                </Box>
            </Paper>
        </Modal>
    );
}

export default CardModal;
