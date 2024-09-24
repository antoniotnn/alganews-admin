import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setBreadcrumb} from "../store/UI.slice";

export default function useBreadcrumb(newBreadcrumb?: string) {
    const dispatch = useDispatch();
    const breadcrumb = useSelector((state: RootState) => state.ui.breadcrumb);

    useEffect(() => {
        if (newBreadcrumb) {
            dispatch(setBreadcrumb(newBreadcrumb.split('/')));
        }
    }, [dispatch, newBreadcrumb]);

    return {
        breadcrumb
    }


}