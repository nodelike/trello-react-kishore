import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import Checklist from './Checklist';
import { getChecklists, createChecklist, deleteChecklist } from '../api';
import toast from 'react-hot-toast';
import { Box, Button, IconButton, Modal, Paper, InputBase, Typography } from '@mui/material';
import theme from '../styles/theme';

function CardModal({ state, setModalState, data, setLoaderState }) {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        setLoaderState(true);
        const lists = await getChecklists(data.id);
        setChecklists(lists);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoaderState(false);
      }
    };

    fetchChecklists();
  }, [data.id, setLoaderState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checklistName = event.target.checklistName.value;
    try {
      if (checklistName.length > 2) {
        event.target.checklistName.value = "";
        setLoaderState(true);
        const createdChecklist = await createChecklist(checklistName, data.id);
        setChecklists([createdChecklist, ...checklists]);
        toast.success(`${checklistName} created successfully!`);
      } else {
        throw new Error("Checklist name should be more than 2 characters.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoaderState(false);
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    const originalChecklists = [...checklists];
    const newlist = checklists.filter((checklist) => checklistId !== checklist.id);
    setChecklists(newlist);

    try {
      setLoaderState(true);
      await deleteChecklist(checklistId);
    } catch (error) {
      toast.error(error.message);
      setChecklists(originalChecklists);
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <Modal
      open={state}
      onClose={() => setModalState(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          width: {md: '60%', xs: "80%"},
          maxHeight: '90%',
          maxWidth: "800px",
          overflow: 'auto',
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
            position: 'absolute',
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
            textAlign: 'center',
            fontWeight: 'bold',
            pb: 1,
            mb: 2,
          }}
        >
          {data.name}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: '40px', minHeight: '48px' }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <InputBase
            placeholder="Add new Checklist"
            id="checklistName"
            sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, px: 4, py:1, borderRadius: '5px', flex: 1, minHeight: "32px", width: "100px" }}
            autoFocus
          />
        </form>
        <Box sx={{ mt: 2, overflowY: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {checklists.map((checklist) => (
            <Checklist
              data={checklist}
              key={checklist.id}
              deleteChecklist={() => handleDeleteChecklist(checklist.id)}
              setLoaderState={setLoaderState}
            />
          ))}
        </Box>
      </Paper>
    </Modal>
  );
}

export default CardModal;
