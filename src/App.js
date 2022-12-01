
import { lazy, Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './context/UserProvider';
import AccountProvider from './context/AccountProvider';
import Loader from './components/loader/Loader';
const Messenger =lazy(()=> import('./components/Messenger'))

function App() {

  const clientId = '265977383813-958jqimm7vcjje02tlbf6jdlbh0jcfkh.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <AccountProvider>
          <Suspense fallback={<Loader />}>
            <Messenger/>
          </Suspense>
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
