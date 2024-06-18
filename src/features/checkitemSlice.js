import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCheckitems, createCheckitem, deleteCheckitem, updateCheckitem } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    checkitemsByChecklistId: {},
};

export const fetchCheckitems = createAsyncThunk('checkitems/getCheckitems', async (checklistId, { dispatch }) => {
    dispatch(showLoader());
    const checkitemsData = await getCheckitems(checklistId);
    dispatch(hideLoader());
    return { checklistId, checkitemsData };
});

export const createNewCheckitem = createAsyncThunk('checkitems/createCheckitem', async ({ checkitemName, checklistId }, { dispatch }) => {
    dispatch(showLoader());
    const createdCheckitem = await createCheckitem(checkitemName, checklistId);
    dispatch(hideLoader());
    return { checklistId, createdCheckitem };
});

export const modifyCheckitem = createAsyncThunk('checkitem/updateCheckitem', async ({ cardId, checklistId, checkitemId, checkState }, { dispatch }) => {
    dispatch(showLoader());
    await updateCheckitem(cardId, checkitemId, checkState);
    dispatch(hideLoader());
    return { checkitemId, checklistId, checkState };
})

export const removeCheckitem = createAsyncThunk('checkitems/deleteCheckitem', async ({ checkitemId, checklistId }, { dispatch }) => {
    dispatch(showLoader());
    await deleteCheckitem(checkitemId, checklistId);
    dispatch(hideLoader());
    return { checkitemId, checklistId };
});

const checkitemsSlice = createSlice({
    name: "checkitems",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        let originalList = [];
        builder
            .addCase(fetchCheckitems.fulfilled, (state, action) => {
                
                state.checkitemsByChecklistId[action.payload.checklistId] = action.payload.checkitemsData;
            })
            .addCase(createNewCheckitem.fulfilled, (state, action) => {
                if (!state.checkitemsByChecklistId[action.payload.checklistId]) {
                    state.checkitemsByChecklistId[action.payload.checklistId] = [];
                }
                state.checkitemsByChecklistId[action.payload.checklistId].unshift(action.payload.createdCheckitem);
            })
            .addCase(modifyCheckitem.pending, (state, action) => {
                const { checkitemId, checklistId, checkState } = action.meta.arg;
                originalList = [...state.checkitemsByChecklistId[checklistId]];
                state.checkitemsByChecklistId[checklistId]  = state.checkitemsByChecklistId[checklistId].map((checkitem) =>
                    checkitem.id === checkitemId
                        ? { ...checkitem, state: checkState }
                        : checkitem
                );
            })
            .addCase(modifyCheckitem.rejected, (state, action) => {
                const { checklistId } = action.meta.arg;
                state.checkitemsByChecklistId[checklistId] = originalList;
            })
            .addCase(removeCheckitem.pending, (state, action) => {
                const { checkitemId, checklistId } = action.meta.arg;
                originalList = [...state.checkitemsByChecklistId[checklistId]];
                state.checkitemsByChecklistId[checklistId] = state.checkitemsByChecklistId[checklistId].filter((checkitem) => checkitem.id !== checkitemId);
            })
            .addCase(removeCheckitem.rejected, (state, action) => {
                const { checklistId } = action.meta.arg;
                state.checkitemsByChecklistId[checklistId] = originalList;
            });
    }
});

export const selectCheckitemsByChecklistId = (checklistId) => (state) => state.checkitems.checkitemsByChecklistId[checklistId] || [];

export default checkitemsSlice.reducer;
