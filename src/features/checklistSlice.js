import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChecklists, createChecklist, deleteChecklist } from '../api';
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    checklistsByCardId: {},
};

export const fetchChecklists = createAsyncThunk('checklists/getChecklists', async (cardId, { dispatch } ) => {
    try {
        dispatch(showLoader());
        const checklistsData = await getChecklists(cardId);
        return { cardId, checklistsData };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const createNewChecklist = createAsyncThunk('checklists/createChecklist', async ({ cardName, cardId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        const createdChecklist = await createChecklist(cardName, cardId);
        return { cardId, createdChecklist };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const removeChecklist = createAsyncThunk('checklists/deleteChecklists', async ({ checklistId, cardId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        await deleteChecklist(checklistId);
        return { checklistId, cardId };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

const checklistSlice = createSlice({
    name: "checklists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            .addCase(removeChecklist.fulfilled, (state, action) => {
                const { checklistId, cardId } = action.meta.arg;
                state.checklistsByCardId[cardId] = state.checklistsByCardId[cardId].filter((checklist) => checklist.id !== checklistId);
            })
    }
});

export const selectChecklistsbyCardId = (cardId) => (state) => state.checklists.checklistsByCardId[cardId] || [];

export default checklistSlice.reducer;
