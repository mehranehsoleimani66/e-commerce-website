import { Routes, Route } from "react-router-dom";
import Category from "../pages/Category";

const AppRouts = () => {
  return (
    <Routes>
      <Route path="/" element={<Category />} />
      <Route path="/:categoryId" element={<Category />} />
    </Routes>
  );
};

export default AppRouts;
