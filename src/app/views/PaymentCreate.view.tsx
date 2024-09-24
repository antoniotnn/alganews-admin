import PaymentForm from "../features/PaymentForm";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";

export default function PaymentCreateView() {
    useBreadcrumb('Pagamentos/Cadastro');
    return <>
        <PaymentForm />
    </>;
}