import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import UsersPage from "../Pages/Admin/IndexPages/UsersPage";
import { UserPage } from "../Pages/Admin/SingleItemPages/UserPage/UserPage";
import CategoriesPage from "../Pages/Admin/IndexPages/CategoriesPage";
import { CategoryPage } from "../Pages/Admin/SingleItemPages/CategoryPage/CategoryPage";
import { SubcategoriesPage } from "../Pages/Admin/IndexPages/SubcategoriesPage/SubcategoriesPage";
import { SubcategoryPage } from "../Pages/Admin/SingleItemPages/SubcategoryPage/SubcategoryPage";
import { CompaniesPage } from "../Pages/Admin/IndexPages/CompaniesPage/CompaniesPage";
import { CompanyPage } from "../Pages/Admin/SingleItemPages/CompanyPage/CompanyPage";
import { ServicesPage } from "../Pages/Admin/IndexPages/ServicesPage/ServicesPage";
import { ServicePage } from "../Pages/Admin/SingleItemPages/ServicePage/ServicePage";
import { ProductsPage } from "../Pages/Admin/IndexPages/ProductsPage/ProductsPage";
import { ProductPage } from "../Pages/Admin/SingleItemPages/ProductPage/ProductPage";
import { PreviousClientsPage } from "../Pages/Admin/IndexPages/PreviousClient/PreviousClientsPage";
import { PreviousClientPage } from "../Pages/Admin/SingleItemPages/PreviousClient/PreviousClientPage";
import { AdminLoginPage } from "../Pages/Admin/AdminLoginPage/AdminLoginPage";
const placeholders = () => {
  return <div></div>;
};
const placeholder = () => {
  return <div></div>;
};
// gonna write the admin layout later
//all of theese are placeholders for now
// gonna write the admin layout laterq
//gonna write non admin routes later
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AdminLayout />}>
        { localStorage.getItem("token") !== null ?
        ( <>
          <Route path="/admin" element={<></>}></Route>
        <Route path="/admin/products">
          <Route index element={<ProductsPage />}></Route>
          <Route path=":productId" element={<ProductPage />}></Route>
        </Route>

        <Route path="/admin/categories">
          <Route index element={<CategoriesPage />}></Route>
          <Route path=":categoryId" element={<CategoryPage />}></Route>
        </Route>

        <Route path="/admin/subcategories">
          <Route index element={<SubcategoriesPage />}></Route>
          <Route path=":subcategoryId" element={<SubcategoryPage />}></Route>
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
          <Route index element={<ProductsPage />}></Route>
          <Route path=":orderId" element={<ProductPage />}></Route>
        </Route>

        <Route path="/admin/transactions">
          <Route index element={<ProductsPage />}></Route>
          <Route path=":transactionId" element={<ProductPage />}></Route>
        </Route>

        <Route path="/admin/previousClients">
          <Route index element={<PreviousClientsPage />}></Route>
          <Route path=":previousClientId" element={<PreviousClientPage />}></Route>
        </Route>

        <Route path="/admin/services">
          <Route index element={<ServicesPage />}></Route>
          <Route path=":serviceId" element={<ServicePage />}></Route>
        </Route></>)
        : <Route path="*" element={<AdminLoginPage />} />
      }
        <Route path="*" element={<ProductPage />} />
      </Route>
      <Route path="*" element={<ProductPage />} />
    </>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
