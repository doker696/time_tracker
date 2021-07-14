import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import reducer from "./store/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

function saveToLocalStorage(state: TimeTracksState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const composeEnhancers = composeWithDevTools({ trace: true });
const store: Store<TimeTracksState, TimeAction> & {
  dispatch: DispatchType;
} = createStore(
  reducer,
  loadFromLocalStorage(),
  composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
