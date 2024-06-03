import AutoComplete from "./components/autocomplete";

export default function App() {
  const headingStyle = {
    "text-align": "center",
  };
  return (
    <div className="App">
      <h1 style={headingStyle}>AutoComplete / TypeAhead</h1>
      <AutoComplete
        placeholder={"Enter Receipe"}
        dataKey={"name"}
        customLoading={<>Loading Receipes....</>}
      />
    </div>
  );
}
