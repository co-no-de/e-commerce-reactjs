import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  FrontPage,
  CartPage,
  AccountPage,
  LoginPage,
  RegisterPage,
  ProductPage,
  ProductsPage,
  ErrorPage
} from "./components/pages";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/products/category/:slug/:titleSlug"
          element={<ProductPage />}
        />
        <Route path="/products/category/:slug" element={<ProductsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Provider>
  );
}
export default App;
