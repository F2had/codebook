import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import CellList from "./CellList";
import { persistor, store } from "../State/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <>
          <CellList />
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;
