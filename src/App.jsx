import "./app.css";
import {} from "antd";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import PageContent from "./Components/PageContent/PageContent";
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
