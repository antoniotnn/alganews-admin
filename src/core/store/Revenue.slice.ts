import {CashFlow, CashFlowService} from "tnn-sdk";
import {Key} from "antd/lib/table/interface";
import moment from "moment";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";
import getThunkStatus from "../utils/getThunkStatus";

interface RevenueState {
    list: CashFlow.EntrySummary[];
    fetching: boolean;
    query: CashFlow.Query;
    selected: Key[]
}

const initialState: RevenueState = {
    list: [],
    fetching: false,
    query: {
        type: 'REVENUE',
        sort: ['transactedOn', 'desc'],
        yearMonth: moment().format('YYYY-MM')
    },
    selected: []
};

export const getRevenues = createAsyncThunk(
    'cash-flow/revenues/getRevenues',
    async (_, {getState, dispatch}) => {
        const {query} = (getState() as RootState).cashFlow.revenue;
        const revenues = await CashFlowService.getAllEntries(query);
        await dispatch(storeList(revenues));
    }
);


export const removeEntriesInBatch = createAsyncThunk(
    'cash-flow/revenues/removeEntriesInBatch',
    async (ids: number[], {dispatch}) => {
        await CashFlowService.removeEntriesBatch(ids);
        await dispatch(getRevenues());
    }
);

export const setQuery = createAsyncThunk(
    'cash-flow/revenues/setQuery',
    async (query: Partial<CashFlow.Query>, {dispatch}) => {
        await dispatch(_setQuery(query));
        await dispatch(getRevenues());
    }
);

const revenueSlice = createSlice({
    initialState,
    name: 'cash-flow/revenues',
    reducers: {
        storeList(state, action: PayloadAction<CashFlow.EntrySummary[]>) {
            state.list = action.payload;
        },
        setSelectedRevenues(state, action: PayloadAction<Key[]>) {
            state.selected = action.payload;
        },
        setQuery(state, action: PayloadAction<Partial<CashFlow.Query>>) {
            state.query = {
                ...state.query,
                ...action.payload
            };
        },
        setFetching(state, action: PayloadAction<boolean>) {
            state.fetching = action.payload;
        }
    },
    extraReducers(builder) {
        const {error, loading, success} = getThunkStatus([getRevenues, removeEntriesInBatch]);

        builder
            .addMatcher(error, (state) => {
                state.fetching = false;
            })
            .addMatcher(success, (state) => {
                state.fetching = false
            })
            .addMatcher(loading, (state) => {
                state.fetching = true;
            });
    }
});

export const {
    storeList,
    setSelectedRevenues,
    setQuery: _setQuery,
    setFetching
} = revenueSlice.actions;

const revenueReducer = revenueSlice.reducer;
export default revenueReducer;