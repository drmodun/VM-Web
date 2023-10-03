import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import UsersPage from "../Pages/Admin/IndexPages/UsersPage";
import { UserPage } from "../Pages/Admin/SingleItemPages/UserPage/UserPage";
import CategoriesPage from "../Pages/Admin/IndexPages/CategoriesPage";
import { CategoryPage } from "../Pages/Admin/SingleItemPages/CategoryPage/CategoryPage";
import { CompaniesPage } from "../Pages/Admin/IndexPages/CompaniesPage/CompaniesPage";
import { CompanyPage } from "../Pages/Admin/SingleItemPages/CompanyPage/CompanyPage";
import WebSubcategoryPage from "../Pages/Web/SubcategoryPage";
import { ServicesPage } from "../Pages/Admin/IndexPages/ServicesPage/ServicesPage";
import { ServicePage } from "../Pages/Admin/SingleItemPages/ServicePage/ServicePage";
import { PreviousClientsPage } from "../Pages/Admin/IndexPages/PreviousClient/PreviousClientsPage";
import WebCategoryPage from "../Pages/Web/CategoryPage";
import { PreviousClientPage } from "../Pages/Admin/SingleItemPages/PreviousClient/PreviousClientPage";
import { AdminLoginPage } from "../Pages/Admin/AdminLoginPage/AdminLoginPage";
import AdminHomepage from "../Pages/Admin/AdminHomepage";
import { TransactionPage } from "../Pages/Admin/SingleItemPages/TransactionPage/TransactionPage";
import BrandPage from "../Pages/Web/BrandPage";
import { TransactionsPage } from "../Pages/Admin/IndexPages/TransactionsPage/TransactionsPage";
import { Homepage } from "../Pages/Web/Homepage/Homepage";
import Layout from "./Web/Layout";
import WebUserPage from "../Pages/Web/UserPage";
import { LoginPage } from "../Pages/Web/LoginPage/LoginPage";
import { RegisterPage } from "../Pages/Web/RegisterPage/RegisterPage";
import { accountInfo } from "../Api/Shared";
import WebProductPage from "../Pages/Web/ProductPage/";
import FavouritesPage from "../Pages/Web/FavouritesPage";
import WebServicesPage from "../Pages/Web/ServicesPage";
import WebCompaniesPage from "../Pages/Web/CompaniesPage";
import WebPreviousClientPage from "../Pages/Web/PreviousClientsPage";
import WebProductsPage from "../Pages/Web/ProductsPage";
import WebCategoriesPage from "../Pages/Web/CategoriesPage";
import CartPage from "../Pages/Web/CartPage";
import OrderPage from "../Pages/Web/OrderPage";
import SearchPage from "../Pages/Web/SearchPage";
import ActivationPage from "../Pages/Web/ActivationPage";
import PasswordChangePage from "../Pages/Web/PasswordChangePage";
import { OrdersPage } from "../Pages/Admin/IndexPages/OrdersPage/OrdersPage";
import { OrderPageAdmin } from "../Pages/Admin/SingleItemPages/OrderPage/OrderPage";
import NotFoundPage from "../Pages/Web/404";
const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<AdminLayout />}>
        {accountInfo &&
          accountInfo.admin !== undefined &&
          new Date(localStorage.getItem("loginTime") ?? "") >
            new Date(Date.now() - 1000 * 60 * 60 * 8) && (
            <>
              <Route path="/admin" element={<AdminHomepage />}></Route>

              <Route path="/admin/categories">
                <Route index element={<CategoriesPage />}></Route>
                <Route path=":categoryId" element={<CategoryPage />}></Route>
              </Route>

              <Route path="/admin/companies">
                <Route index element={<CompaniesPage />}></Route>
                <Route path=":companyId" element={<CompanyPage />}></Route>
              </Route>

              <Route path="/admin/users">
                <Route index element={<UsersPage />}></Route>
                <Route path=":userId" element={<UserPage />}></Route>
              </Route>

              <Route path="/admin/orders">
                <Route index element={<OrdersPage />}></Route>
                <Route path=":orderId" element={<OrderPageAdmin />}></Route>
              </Route>

              <Route path="/admin/transactions">
                <Route index element={<TransactionsPage />}></Route>
                <Route
                  path=":transactionId"
                  element={<TransactionPage />}
                ></Route>
              </Route>

              <Route path="/admin/previousClients">
                <Route index element={<PreviousClientsPage />}></Route>
                <Route
                  path=":previousClientId"
                  element={<PreviousClientPage />}
                ></Route>
              </Route>

              <Route path="/admin/services">
                <Route index element={<ServicesPage />}></Route>
                <Route path=":serviceId" element={<ServicePage />}></Route>
              </Route>
            </>
          )}
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/services">
          <Route index element={<WebServicesPage />} />
          <Route path=":serviceId" element={<OrderPage />} />
        </Route>
        <Route path="/categories">
          <Route index element={<WebCategoriesPage />}></Route>
        </Route>
        <Route
          path="/user"
          element={accountInfo ? <WebUserPage /> : <LoginPage />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/activate" element={<ActivationPage />}></Route>
        <Route path="/reset" element={<PasswordChangePage />}></Route>
        <Route path="/clients" element={<WebPreviousClientPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/index.php?option=com_content&task=view&id=2"
          element={
            <Navigate to="https://www.microline.hr/EUWeb/StartEU.ashx" />
          }
        />

        <Route path="/index.php?option=com_contact&Itemid=3">
          <Navigate to="/" />
        </Route>

        <Route path="/index.php?option=com_content&task=view&id=1&Itemid=3">
          <Navigate to="/service" />
        </Route>
        <Route path="/brands">
          <Route index element={<WebCompaniesPage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
