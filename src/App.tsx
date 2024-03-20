import React from "react";
import DropdownSelect from "./components/DropdownSelect";

function App() {
  const Items = [
    { id: "1", label: "Art 🎭" },
    { id: "2", label: "Sport 🏐" },
    { id: "3", label: "Health 👨‍⚕️" },
    { id: "3", label: "Game 🎮" },
  ];
  return (
    <div className="App">
      <DropdownSelect
        name="dropdownLst"
        placeholder="Type and press Enter to add"
        Item={Items}
      />
    </div>
  );
}

export default App;
