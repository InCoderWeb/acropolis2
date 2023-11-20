import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';

export const metadata = {
    title: 'Sign in | Acropolis FCA',
    description: 'InCoder Web',
}

const SignInLayout = ({children}) => {
  return (
    <>
      <ToastContainer />
      <NextTopLoader color="#1d4ed8" showSpinner={false} />
      {children}
    </>
  );
};

export default SignInLayout;