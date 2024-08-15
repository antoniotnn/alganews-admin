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
        // para atualizar só no front end o dado alterado, será removido depois. para fazer uma nova chamada pro back end para pegar todos os dados atualizados
        .addCase(toggleUserStatus.fulfilled, (state, action) => {
            state.list = state.list.map(user => {
                if (user.id === action.payload.id) {
                    return {...user, active: !user.active};
                }
                return user;
            });
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