import React from 'react'

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font overflow-hidden">
        <div className="px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="#">
                <img src={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOvm56EUJsSDp-c9ebwFgujoMB3twAaoS55ttO-3RqkDKz-xKGI5GREhg076IatTYNy5Jn_wd0kiunwG__ceRMB66gzOU1PQIW8lUVc_CnhiKBvvPJ5N-n0w2Bdrj1qg6mUfP7pNix6_0JTJY_mWTu7mcIkseTTtsgdQfaZHzZhAnvuCzoLUheKJCbm-YE/s320/acro.png"} alt="Acropolis" className="w-40 h-15 text-white p-2 " viewBox="0 0 24 24" />
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 hover:text-purple-600 font-semibold">Developed By Students Of FCA Department
            </p>
        </div>
    </footer>
  )
}

export default Footer