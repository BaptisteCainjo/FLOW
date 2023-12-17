import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, loadUsers } from "./userAction.js";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                console.error(action.error.message);
                state.loading = false;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (action, state) => {
                console.error(action.error.message);
            })
    }
});

export default userSlice.reducer;