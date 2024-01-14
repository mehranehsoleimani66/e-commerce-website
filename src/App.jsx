import "./App.css";
import {} from "antd";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import PageContent from "./Components/PageContent";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
