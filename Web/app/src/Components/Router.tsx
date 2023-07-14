import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
const ProductPage = () => {return (<div></div>)};
const ProductsPage = () => { return (<div></div>)};
// gonna write the admin layout later
//all of theese are placeholders for now
// gonna write the admin layout laterq
//gonna write non admin routes later
const router = createBrowserRouter(
    createRoutesFromElements(<>
    <Route element={<AdminLayout/>}>
        <Route path="/admin" element={<></>}>

        </Route>

        <Route path="/admin/products">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":productId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/categories">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":categoryId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/subcategories">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":subcategoryId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/companies">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":companyId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/users">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":userId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/orders">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":orderId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/transactions">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":transactionId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/previousClients">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":previousClientId" element={<ProductPage/>}></Route>
        </Route>

        <Route path="/admin/services">
            <Route index element={<ProductsPage/>}></Route>
            <Route path=":serviceId" element={<ProductPage/>}></Route>
        </Route>
        <Route path="*" element={<ProductPage/>} />






    </Route>
    <Route path="*" element={<ProductPage/>} />
    </>

    )
);