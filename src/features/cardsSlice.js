import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCards, createCard, deleteCard } from "../api";
import { showLoader, hideLoader } from "./loaderSlice";

const initialState = {
    cardsByListId: {},
};

export const fetchCards = createAsyncThunk('cards/getCards', async (listId, { dispatch }) => {
    try {
        dispatch(showLoader());
        const cardsData = await getCards(listId);
        return { listId, cardsData };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const createNewCard = createAsyncThunk('cards/createCard', async ({ cardName, listId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        const createdCard = await createCard(cardName, listId);
        return { listId, createdCard };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

export const removeCard = createAsyncThunk('cards/deleteCard', async ({ cardId, listId }, { dispatch }) => {
    try {
        dispatch(showLoader());
        await deleteCard(cardId);
        return { cardId , listId };
    } catch (error) {
        throw error;
    } finally {
        dispatch(hideLoader());
    }
});

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            .addCase(removeCard.fulfilled, (state, action) => {
                const { cardId, listId } = action.meta.arg;
                state.cardsByListId[listId] = state.cardsByListId[listId].filter((card) => card.id !== cardId);
            })
    }
});

export const selectCardsByListId = (listId) => (state) => state.cards.cardsByListId[listId] || [];
export const selectLoader = (state) => state.cards.loader;

export default cardsSlice.reducer;
