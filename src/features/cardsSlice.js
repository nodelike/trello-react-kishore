import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCards, createCard, deleteCard } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    cardsByListId: {},
};

export const fetchCards = createAsyncThunk('cards/getCards', async (listId, { dispatch }) => {
    dispatch(showLoader());
    const cardsData = await getCards(listId);
    dispatch(hideLoader());
    return { listId, cardsData };
});

export const createNewCard = createAsyncThunk('cards/createCard', async ({ cardName, listId }, { dispatch }) => {
    dispatch(showLoader());
    const createdCard = await createCard(cardName, listId);
    dispatch(hideLoader());
    return { listId, createdCard };
});

export const removeCard = createAsyncThunk('cards/deleteCard', async ({ cardId, listId }, { dispatch }) => {
    dispatch(showLoader());
    await deleteCard(cardId);
    dispatch(hideLoader());
    return { cardId , listId };
});

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        let originalList = [];
        builder
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cardsByListId[action.payload.listId] = action.payload.cardsData;
            })
            .addCase(createNewCard.fulfilled, (state, action) => {
                if (!state.cardsByListId[action.payload.listId]) {
                    state.cardsByListId[action.payload.listId] = [];
                }
                state.cardsByListId[action.payload.listId].unshift(action.payload.createdCard);
            })

            .addCase(removeCard.pending, (state, action) => {
                const { cardId, listId } = action.meta.arg;
                originalList = [...state.cardsByListId[listId]];
                state.cardsByListId[listId] = state.cardsByListId[listId].filter((card) => card.id !== cardId);
            })
            .addCase(removeCard.rejected, (state, action) => {
                const { listId } = action.meta.arg;
                state.cardsByListId[listId] = originalList;
            });
    }
});

export const selectCardsByListId = (listId) => (state) => state.cards.cardsByListId[listId] || [];
export const selectLoader = (state) => state.cards.loader;

export default cardsSlice.reducer;
