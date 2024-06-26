import authReducer from "./authReducer";
import appReducer from "./appReducer"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
})

export default rootReducer