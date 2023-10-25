import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "../src/components/layout/Title";
import "./App.css";
import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import Person from "./components/lists/Person";
import { Divider } from "antd";

function App() {
  return (
    <div className="App">
      <Title />
      <Divider>Add Person</Divider>
      <AddPerson />
      <Divider>Add Cars</Divider>
      <AddCar />
      <Divider>Records</Divider>
      <Person />
    </div>
  );
}

export default App;
