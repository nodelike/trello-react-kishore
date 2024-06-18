import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChecklists, createChecklist, deleteChecklist } from '../api';
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    checklistsByCardId: {},
};

export const fetchChecklists = createAsyncThunk('checklists/getChecklists', async (cardId, { dispatch } ) => {
    dispatch(showLoader());
    const checklistsData = await getChecklists(cardId);
    dispatch(hideLoader());
    return { cardId, checklistsData };
});

export const createNewChecklist = createAsyncThunk('checklists/createChecklist', async ({ cardName, cardId }, { dispatch }) => {
    dispatch(showLoader());
    const createdChecklist = await createChecklist(cardName, cardId);
    dispatch(hideLoader());
    return { cardId, createdChecklist };
});

export const removeChecklist = createAsyncThunk('checklists/deleteChecklists', async ({ checklistId, cardId }, { dispatch }) => {
    dispatch(showLoader());
    await deleteChecklist(checklistId);
    dispatch(hideLoader());
    return { checklistId, cardId };
});

const checklistSlice = createSlice({
    name: "checklists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        let originalList = [];
        builder
            .addCase(fetchChecklists.fulfilled, (state, action) => {
                
                state.checklistsByCardId[action.payload.cardId] = action.payload.checklistsData;
            })
            .addCase(createNewChecklist.fulfilled, (state, action) => {
                if (!state.checklistsByCardId[action.payload.cardId]) {
                    state.checklistsByCardId[action.payload.cardId] = [];
                }
                state.checklistsByCardId[action.payload.cardId].unshift(action.payload.createdChecklist);
            })
            .addCase(removeChecklist.pending, (state, action) => {
                const { checklistId, cardId } = action.meta.arg;
                originalList = [...state.checklistsByCardId[cardId]];
                state.checklistsByCardId[cardId] = state.checklistsByCardId[cardId].filter((checklist) => checklist.id !== checklistId);
            })
            .addCase(removeChecklist.rejected, (state, action) => {
                const { cardId } = action.meta.arg;
                state.checklistsByCardId[cardId] = originalList;
            });
    }
});

export const selectChecklistsbyCardId = (cardId) => (state) => state.checklists.checklistsByCardId[cardId] || [];

export default checklistSlice.reducer;
