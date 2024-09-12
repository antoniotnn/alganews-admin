import {CashFlow, CashFlowService} from "tnn-sdk";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EntriesCategoryState {
    fetching: boolean;
    expenses: CashFlow.CategorySummary[];
    revenues: CashFlow.CategorySummary[];
}

const initialState: EntriesCategoryState = {
    fetching: false,
    expenses: [],
    revenues: [],
};

export const getCategories = createAsyncThunk(
    'cash-flow/categories/getCategories',
    async (_, { dispatch }) => {
        const categories = await CashFlowService.getAllCategories({
            sort: ['id', 'asc']
        });

        /**
         * utilizando filtro local por que a API não prove uma forma
         * de recuperar as categorias separadamente por tipo
         *
         * @todo: melhorar isso assim que a API prover um endpoint
         */
        const expensesCategories = categories.filter(c => c.type === 'EXPENSE');
        const revenuesCategories = categories.filter(c => c.type === 'REVENUE');

        await dispatch(storeExpenses(expensesCategories));
        await dispatch(storeRevenues(revenuesCategories));
    }
);

export const createCategory = createAsyncThunk(
    'cash-flow/categories/createCategory',
    async (category: CashFlow.CategoryInput, { dispatch }) => {
        await CashFlowService.insertNewCategory(category);
        await dispatch(getCategories());
    }
);

export const deleteCategory = createAsyncThunk(
    'cash-flow/categories/deleteCategory',
    async (categoryId: number, { dispatch }) => {
        await CashFlowService.removeExistingCategory(categoryId);
        await dispatch(getCategories());
    }
);

export const entriesCategorySlice = createSlice({
    initialState,
    name: 'cash-flow/categories',
    reducers: {
        storeExpenses: (state, action: PayloadAction<CashFlow.CategorySummary[]>) => {
            state.expenses = action.payload;
        },
        storeRevenues: (state, action: PayloadAction<CashFlow.CategorySummary[]>) => {
            state.revenues = action.payload;
        },
        storeFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload;
        },
    },
});

export const {storeExpenses, storeRevenues, storeFetching}
    = entriesCategorySlice.actions;

const entriesCategoryReducer = entriesCategorySlice.reducer;
export default entriesCategoryReducer;

