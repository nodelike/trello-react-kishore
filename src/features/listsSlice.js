// features/listsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLists, createList, deleteList } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    lists: [],
};

export const fetchLists = createAsyncThunk( "lists/fetchLists",  async (boardId, { dispatch }) => {
        try {
            dispatch(showLoader());
            const listsData = await getLists(boardId);
            return listsData;
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

export const createNewList = createAsyncThunk(
    "lists/createList",
    async ({ listName, boardId }, { dispatch }) => {
        try {
            dispatch(showLoader());
            const createdList = await createList(listName, boardId);
            return createdList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

export const removeList = createAsyncThunk( "lists/deleteList", async (listId, { dispatch }) => {
        try {
            dispatch(showLoader());
            const deletedList = await deleteList(listId);
            return deletedList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        let originalList = [];
        builder
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.lists = action.payload;
            })
            .addCase(createNewList.fulfilled, (state, action) => {
                state.lists.unshift(action.payload);
            })
            .addCase(removeList.pending, (state, action) => {
                originalList = [...state.lists];
                state.lists = state.lists.filter( (list) => list.id !== action.meta.arg);
            })
            .addCase(removeList.rejected, (state) => {
                state.lists = originalList;
            });
    },
});

export const selectLists = (state) => state.lists.lists;

export default listsSlice.reducer;
