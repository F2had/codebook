import { Provider } from "react-redux";

import CellList from "./CellList";
import { store } from "../State/store";

const App = () => {
  return (
    <Provider store={store}>
      <>
        <CellList />
      </>
    </Provider>
  );
};

export default App;
