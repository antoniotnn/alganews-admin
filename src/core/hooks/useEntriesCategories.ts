import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {useCallback} from "react";
import * as CategoryActions from "../store/EntriesCategory.slice";
import {CashFlow} from "tnn-sdk";

export default function useEntriesCategories() {
    const dispatch = useDispatch();
    const expenses = useSelector((s: RootState) => s.cashFlow.category.expenses);
    const revenues = useSelector((s: RootState) => s.cashFlow.category.revenues);

    const fetchCategories = useCallback(
        () => dispatch(CategoryActions.getCategories()),
        [dispatch]
    );

    const createCategory = useCallback(
        (category: CashFlow.CategoryInput) => dispatch(CategoryActions.createCategory(category)),
        [dispatch]
    );


    return {
        expenses,
        revenues,
        fetchCategories,
        createCategory
    };
}