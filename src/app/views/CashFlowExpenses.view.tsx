import EntryCRUD from "../features/EntryCRUD";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";

export default function CashFlowExpensesView() {
    useBreadcrumb('Fluxo de caixa/Despesas');
    return <EntryCRUD type={'EXPENSE'} />;
}