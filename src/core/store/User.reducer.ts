import {User, UserService} from "tnn-sdk";
import {createAsyncThunk, createReducer, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";

interface UserState {
    list: User.Summary[];
    fetching: boolean;
}

const initialState: UserState = {
    fetching: false,
    list: []
};

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async () => UserService.getAllUsers()
);

export default createReducer(initialState, (builder) => {
    const success = isFulfilled(getAllUsers);
    const error = isRejected(getAllUsers);
    const loading = isPending(getAllUsers);

    builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.list = action.payload;
        })
        .addMatcher(success, (state) => {
            state.fetching = false
        });
    builder
        .addMatcher(error, (state) => {
            state.fetching = false
        });
    builder
        .addMatcher(loading, (state) => {
            state.fetching = true
        });
});