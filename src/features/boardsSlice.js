import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBoards, createBoard } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
  boards: [],
};

export const fetchBoards = createAsyncThunk( "boards/fetchBoards", async (_, { dispatch }) => {
    try {
      dispatch(showLoader());
      const boardsData = await getAllBoards();
      return boardsData;
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const createNewBoard = createAsyncThunk( "boards/createNewBoard", async (boardName, { dispatch }) => {
    try {
      dispatch(showLoader());
      const createdBoard = await createBoard(boardName);
      return createdBoard;
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(createNewBoard.fulfilled, (state, action) => {
        state.boards.unshift(action.payload);
      });
  },
});

export const selectBoards = (state) => state.boards.boards;

export default boardsSlice.reducer;
