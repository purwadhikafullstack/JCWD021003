import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ScrollToTop from './components/ScrollToTop';
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

function App() {
  return (
    <Auth>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/auth/email-verification" element={<Verification />} />
          <Route path="/password-reset-request" element={<RequestPasswordReset />} />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
          <Route path="/profile"
            element={
              <LoggedInRoute>
                <Profile />
              </LoggedInRoute> }
          />
          <Route path="/manage-address" element={
          <LoggedInRoute>
          <ManageAddress />
          </LoggedInRoute>} />
          <Route path='/create-address' element={<CreateAddress/>}/>

          <Route path="/product/:id" element={<ProductDetailPage/>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/cart/shipment' element={<CheckoutPage/>}/>
        </Routes>
      </ScrollToTop>
    </Auth>
  );
}

export default App;
