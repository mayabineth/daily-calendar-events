import React from "react";
import Hours from "./Hours";
import { events, renderDivs } from "./Function";

function App() {
  return (
    <section className="section-center">
      <h2>Wed, April 8, 2022</h2>
      <div className="wrapper">
        <Hours />
        <div className="content ">{renderDivs(events)}</div>
      </div>
    </section>
  );
}

export default App;
