import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WordsList from "./components/WordsList";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  const [searchFromdb, setSearchFromdb] = useState("");
  return (
    <div>
      <Provider store={store}>
        <SearchBar setSearchFromdb={setSearchFromdb} />
        <WordsList searchFromdb={searchFromdb} />
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
