import {Route, Switch} from "react-router-dom";
import HomeView from "./app/views/Home.view";
import UserCreateView from "./app/views/UserCreate.view";
import UserListView from "./app/views/UserList.view";
import PaymentListView from "./app/views/PaymentList.view";
import PaymentCreateView from "./app/views/PaymentCreate.view";
import CashFlowRevenuesView from "./app/views/CashFlowRevenues.view";
import CashFlowExpensesView from "./app/views/CashFlowExpenses.view";

export default function Routes() {
    return <Switch>
        <Route path={'/'} exact component={HomeView}/>
        <Route path={'/usuarios/cadastro'} exact component={UserCreateView}/>
        <Route path={'/usuarios'} exact component={UserListView}/>
        <Route path={'/pagamentos'} exact component={PaymentListView}/>
        <Route path={'/pagamentos/cadastro'} exact component={PaymentCreateView}/>
        <Route path={'/fluxo-de-caixa/despesas'} exact component={CashFlowExpensesView}/>
        <Route path={'/fluxo-de-caixa/receitas'} exact component={CashFlowRevenuesView}/>
    </Switch>
}