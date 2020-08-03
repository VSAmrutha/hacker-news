import React from "react";
import Layout from "./components/Layout/Layout";
import Table from "./components/Table/Table";
import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Layout>
            <Table />
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
