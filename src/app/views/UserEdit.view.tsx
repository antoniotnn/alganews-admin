import UserForm from "../features/UserForm";
import useUser from "../../core/hooks/useUser";
import {useCallback, useEffect} from "react";
import {Card, notification, Skeleton} from "antd";
import {User, UserService} from "tnn-sdk";
import moment from "moment";
import {Redirect, useParams} from "react-router-dom";

export default function UserEditView() {
    const params = useParams<{ id: string }>();
    const { user, fetchUser, notFound } = useUser();

    useEffect(() => {
        if (!isNaN(Number(params.id))) {
            fetchUser(Number(params.id));
        }
    }, [fetchUser, params.id]);

    const transformUserData = useCallback((user: User.Detailed) => {
        return {
          ...user,
          createdAt: moment(user.createdAt),
          updatedAt: moment(user.updatedAt),
          birthdate: moment(user.birthdate),
        };
    }, []);

    if (isNaN(Number(params.id))) {
        return <Redirect to={'/usuarios'}/>
    }

    if (notFound) {
        return <Card>usuário não encontrado</Card>;
    }

    function handleUserUpdate(user: User.Input) {
        UserService.updateExistingUser(
            Number(params.id),
            user
        ).then(() => {
            notification.success({
                message: 'Usuário atualizado com sucesso'
            })
        });
    }

    if (!user) return <Skeleton />;

    return (
        <>
            <UserForm
                onUpdate={handleUserUpdate}
                user={transformUserData(user)}
            />
        </>
    );
}