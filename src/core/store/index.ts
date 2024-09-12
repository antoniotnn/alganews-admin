import {combineReducers, configureStore, isRejected, Middleware} from "@reduxjs/toolkit";
import UserReducer from "./User.reducer";
import {notification} from "antd";
import paymentReducer from "./Payment.slice";
import expenseReducer from "./Expense.slice";
import revenueReducer from "./Revenue.slice";
import entriesCategoryReducer from "./EntriesCategory.slice";


const observeActions: Middleware = () => (next) => (action) => {
    if (isRejected(action)) {
        // necessário por conta do unwrap do dispatch
        const ignoredActions = [
            'cash-flow/categories/createCategory/rejected',
            'cash-flow/categories/deleteCategory/rejected',
        ];

        const shouldNotify = !ignoredActions.includes(action.type);

        if (shouldNotify) {
            notification.error({
                message: action.error.message
            });
        }

    }

    next(action);
}

const cashFlowReducer = combineReducers({
    expense: expenseReducer,
    revenue: revenueReducer,
    category: entriesCategoryReducer
});


export const store = configureStore({
    reducer: {
        user: UserReducer,
        payment: paymentReducer,
        cashFlow: cashFlowReducer,

    },
    middleware: function (getDefaultMiddlewares) {
        return getDefaultMiddlewares().concat(observeActions);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
