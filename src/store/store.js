import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import listsReducer from '../features/listsSlice'
import cardsReducer from '../features/cardsSlice'
import loaderReducer from '../features/loaderSlice';
import checklistReducer from '../features/checklistSlice'
import checkitemsReducer from '../features/checkitemSlice'

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checklists: checklistReducer,
    checkitems: checkitemsReducer,
    loader: loaderReducer,
  },
});

export default store;
