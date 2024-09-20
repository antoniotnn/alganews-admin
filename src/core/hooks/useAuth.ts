import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {useCallback} from "react";
import * as AuthActions from "../store/Auth.slice";
import AuthService from "../../auth/Authorization.service";

export default function useAuth() {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((s: RootState) => s.auth.user);
    const fetching = useSelector((s: RootState) => s.auth.fetching);

    const fetchUser = useCallback((userId: number) => {
        dispatch(AuthActions.fetchUser(userId)).unwrap();
    }, [dispatch])

    return {
        user,
        fetching,
        fetchUser,
    };
}
