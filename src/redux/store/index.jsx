import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import PropTypes from "prop-types";

import { rootReducer } from "../reducers/rootReducer";

export const Store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
