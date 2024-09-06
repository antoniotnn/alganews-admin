import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import * as UserActions from "../store/User.reducer";
import {User} from "tnn-sdk";

export default function useUsers() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.list);
    const fetching = useSelector((state: RootState) => state.user.fetching);
    const editors = useSelector((state: RootState) => state.user.list
        .filter((user) => user.role === 'EDITOR'));


    const fetchUsers = useCallback(() => {
        dispatch(UserActions.getAllUsers())
    }, [dispatch]);

    const toggleUserStatus = useCallback(
        async (user: User.Detailed | User.Summary) => {
            await dispatch(UserActions.toggleUserStatus(user));
            dispatch(UserActions.getAllUsers());
        },
        [dispatch]
    );

    return {
        fetchUsers,
        users,
        editors,
        fetching,
        toggleUserStatus
    };
}