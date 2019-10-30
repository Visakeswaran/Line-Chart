import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BidirectionalBar from "./components/BidirectionalBar";

function App() {
  return (
    <div className="App">
      <div className="graph-container">
        <BidirectionalBar
          width={1168}
          height={439}
          margin={{ top: 50, right: 80, bottom: 90, left: 50 }}
          keys={["Twitter", "Facebook", "Instagram"]}
          data={[
            {
              date: "2019-06-12T00:00:00.000Z",
              Twitter: 10,
              Facebook: -5,
              Instagram: 5
            },
            {
              date: "2019-06-12T01:00:00.000Z",
              Twitter: -10,
              Facebook: -2,
              Instagram: 8
            },
            {
              date: "2019-06-12T02:00:00.000Z",
              Twitter: 4,
              Facebook: 5,
              Instagram: 5
            },
            {
              date: "2019-06-12T03:00:00.000Z",
              Twitter: 1,
              Facebook: -1,
              Instagram: -5
            },
            {
              date: "2019-06-12T04:00:00.000Z",
              Twitter: 4,
              Facebook: -10,
              Instagram: -2
            },
            {
              date: "2019-06-12T05:00:00.000Z",
              Twitter: -8,
              Facebook: -5,
              Instagram: 10
            },
            {
              date: "2019-06-12T06:00:00.000Z",
              Twitter: 5,
              Facebook: 9,
              Instagram: 5
            }
          ]}
        />
      </div>
    </div>
  );
}

export default App;
