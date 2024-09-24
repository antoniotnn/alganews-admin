import UserForm from "../features/UserForm";
import usePageTitle from "../../core/hooks/usePageTitle";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";

export default function UserCreateView() {
    usePageTitle('Cadastro de usuário');
    useBreadcrumb('Usuários/Cadastro');
    return (
        <>
            <UserForm />
        </>
    );
}