import {createStore} from "redux";
import reducer from "./reducer";

// @todo add devtools support
const store = createStore(reducer);

export default store;