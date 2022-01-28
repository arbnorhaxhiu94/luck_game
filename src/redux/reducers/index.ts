import { combineReducers } from "redux";
import { GetLeadersReducer } from "./GetLeaders/GetLeadersReducer";
import { UserReducer } from "./User/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { UpdateUsernameReducer } from "./UpdateUsername/UpdateUsernameReducer";

const UserPersistedReducer = persistReducer({
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['user']
  }, UserReducer);
  

const reducers = combineReducers({
    userReducer: UserPersistedReducer,
    getLeadersReducer: GetLeadersReducer,
    updateUsernameReducer: UpdateUsernameReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;