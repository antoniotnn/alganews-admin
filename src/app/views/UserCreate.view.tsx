import UserForm from "../features/UserForm";
import usePageTitle from "../../core/hooks/usePageTitle";

export default function UserCreateView() {
    usePageTitle('Cadastro de usuário');
    return (
        <>
            <UserForm />
        </>
    );
}