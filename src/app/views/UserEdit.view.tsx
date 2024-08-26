import UserForm from "../features/UserForm";
import useUser from "../../core/hooks/useUser";
import {useEffect} from "react";
import {Skeleton} from "antd";

export default function UserEditView() {
    const { user, fetchUser } = useUser();

    useEffect(() => {
        fetchUser(1);
    }, [fetchUser]);

    if (!user) return <Skeleton />;

    return (
        <>
            <UserForm user={user}/>
        </>
    );
}