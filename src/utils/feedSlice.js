import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            const id = action.payload;
            const newFeed = state.filter(user => id !== user._id);
            return newFeed;
        }
    }
});

export const { addFeed, removeUser } = feedSlice.actions;

export default feedSlice.reducer;