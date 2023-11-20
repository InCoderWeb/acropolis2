import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';

export const metadata = {
    title: 'Sign up | Acropolis FCA',
    description: 'InCoder Web',
}

const SignUpLayout = ({children}) => {
  return (
    <>
      <ToastContainer />
      <NextTopLoader color="#000" showSpinner={false} />
      {children}
    </>
  );
};

export default SignUpLayout;