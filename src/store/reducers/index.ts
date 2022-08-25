import {ContactsReducer} from "./ContactsReducer";
import {combineReducers} from "redux";
import {EditlReducer} from "./EditlReducer";
import {LogInReducer} from "./LogInReducer";


export const rootReducer = combineReducers({
    contacts:ContactsReducer,
    modal: EditlReducer,
    auth: LogInReducer,
})

export type RootState = ReturnType<typeof rootReducer>