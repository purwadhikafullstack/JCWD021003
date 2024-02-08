import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Auth } from './components/Auth';
import Signup from './pages/Register';
import Signin from './pages/Login';
import Verification from './pages/user-verification';
import Profile from './pages/profileUser';
import { ProductDetailPage } from './pages/detailProduct';
import { LoggedInRoute } from './components/Auth/ProtectedRoute';
import RequestPasswordReset from './pages/request-reset-password';
import ResetPassword from './pages/ResetPassword';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/Checkout';
import ManageAddress from './pages/user-address';
import CreateAddress from './pages/create Address';
import AccountManagement from './pages/Admin dashboard/account management';
import CreateAccount from './pages/create account';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import WarehouseList from './pages/Admin dashboard/warehouse management';
import CreateWarehouse from './pages/Admin dashboard/warehouse management/create warehouse page';

function App() {
  const AdminRoute = ({ children }) => {
    const userRoleId = useSelector((state) => state.AuthReducer.user.roleId);

    return userRoleId === 1 ? children : <Navigate to="/" />;
  };
  const user = useSelector((state) => state.AuthReducer.user.roleId);
  console.log('roleID',user);
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/auth/email-verification" element={<Verification />} />
        <Route
          path="/password-reset-request"
          element={<RequestPasswordReset />}
        />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <LoggedInRoute>
              <Profile />
            </LoggedInRoute>
          }
        />
        <Route
          path="/manage-address"
          element={
            <LoggedInRoute>
              <ManageAddress />
            </LoggedInRoute>
          }
        />
        <Route
          path="/create-address"
          element={
            <LoggedInRoute>
              <CreateAddress />
            </LoggedInRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <LoggedInRoute>
              <CartPage />
            </LoggedInRoute>
          }
        />
        <Route
          path="/cart/shipment"
          element={
            <LoggedInRoute>
              <CheckoutPage />
            </LoggedInRoute>
          }
        />
        <Route
          path="/admin-dashboard/account-management"
          element={
            <AdminRoute>
              <AccountManagement />
            </AdminRoute>
          }
        />
         <Route
          path="/admin-dashboard/account-management/create-account"
          element={
            <AdminRoute>
              <CreateAccount />
            </AdminRoute>
          }
        />
          <Route path="/admin-dashboard/warehouse-management" element={<WarehouseList />} />
          <Route path="/warehouse-management/create-warehouse" element={<CreateWarehouse />} />


      </Routes>
    </Auth>
  );
}

export default App;
