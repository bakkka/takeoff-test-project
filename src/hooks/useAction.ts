import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ContactActionCreator from '../store/action-creator/contact'

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ContactActionCreator, dispatch);
}