import React from "react";
import "./App.css";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

function App() {
  return (
    <div className="App">
      <main>
        <section className="table1">
          <h2>Yearly Max/Min Crop Production</h2>
          <Table1 />
        </section>
        <section className="table2">
          <h2>Cultivation with Crops Yield</h2>
          <Table2 />
        </section>
      </main>
    </div>
  );
}

export default App;
