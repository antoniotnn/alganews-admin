import {User, UserService} from "tnn-sdk";
import {createAsyncThunk, createReducer, isFulfilled, isPending, isRejected,} from "@reduxjs/toolkit";

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
    async (_, { rejectWithValue }) => {
        try {
            return await UserService.getAllUsers();
        } catch (error: any) {
            return rejectWithValue({ ...error });
        }
    }
);

export const toggleUserStatus = createAsyncThunk(
    'user/toggleUserStatus',
    async (user: User.Summary | User.Detailed) => {

        user.active
            ? await UserService.deactivateExistingUser(user.id)
            : await UserService.activateExistingUser(user.id);

        return user;
    }
);

export default createReducer(initialState, (builder) => {
    const success = isFulfilled(
        getAllUsers,
        toggleUserStatus
    );
    const error = isRejected(
        getAllUsers,
        toggleUserStatus
    );
    const loading = isPending(
        getAllUsers,
        toggleUserStatus
    );

    builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.list = action.payload;
        })
        .addMatcher(success, (state) => {
            state.fetching = false
        });
    builder
        .addMatcher(error, (state, action) => {
            state.fetching = false
        });
    builder
        .addMatcher(loading, (state) => {
            state.fetching = true
        });
});