import EntryCRUD from "../features/EntryCRUD";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";

export default function CashFlowRevenuesView() {
    useBreadcrumb('Fluxo de caixa/Receitas');
    return <EntryCRUD type={'REVENUE'} />;
}