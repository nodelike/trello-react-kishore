import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCheckitems, createCheckitem, deleteCheckitem, updateCheckitem } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    checkitemsByChecklistId: {},
    error: ""
};

export const fetchCheckitems = createAsyncThunk('checkitems/getCheckitems', async (checklistId, { dispatch }) => {
    try {
        dispatch(showLoader());
        const checkitemsData = await getCheckitems(checklistId);
        return { checklistId, checkitemsData };
    } catch (error) {
        throw error
    } finally {
        dispatch(hideLoader());
    }
});

export const createNewCheckitem = createAsyncThunk('checkitems/createCheckitem', async ({ checkitemName, checklistId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        const createdCheckitem = await createCheckitem(checkitemName, checklistId);
        return { checklistId, createdCheckitem };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const modifyCheckitem = createAsyncThunk('checkitem/updateCheckitem', async ({ cardId, checklistId, checkitemId, checkState }, { dispatch }) => {
    try {
        dispatch(showLoader());
        await updateCheckitem(cardId, checkitemId, checkState);
        return { checkitemId, checklistId, checkState };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
})

export const removeCheckitem = createAsyncThunk('checkitems/deleteCheckitem', async ({ checkitemId, checklistId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        await deleteCheckitem(checkitemId, checklistId);
        return { checkitemId, checklistId };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

const checkitemsSlice = createSlice({
    name: "checkitems",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            .addCase(modifyCheckitem.fulfilled, (state, action) => {
                const { checkitemId, checklistId, checkState } = action.meta.arg;
                state.checkitemsByChecklistId[checklistId]  = state.checkitemsByChecklistId[checklistId].map((checkitem) =>
                    checkitem.id === checkitemId
                        ? { ...checkitem, state: checkState }
                        : checkitem
                );
            })
            .addCase(removeCheckitem.fulfilled, (state, action) => {
                const { checkitemId, checklistId } = action.meta.arg;
                state.checkitemsByChecklistId[checklistId] = state.checkitemsByChecklistId[checklistId].filter((checkitem) => checkitem.id !== checkitemId);
            })
    }
});

export const selectCheckitemsByChecklistId = (checklistId) => (state) => state.checkitems.checkitemsByChecklistId[checklistId] || [];

export default checkitemsSlice.reducer;
