import React from 'react';

const Signin = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-4xl font-bold mb-8">Welcome back</h1>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="example@gmail.com" type="email"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <div className="flex items-center justify-between">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Enter 6 characters or more" type="password"/>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">SIGN IN</button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-600">DON'T HAVE AN ACCOUNT?</span>
            <a className="font-bold text-red-600 hover:text-red-800" href="#">CREATE</a>
          </div>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gray-100 justify-center items-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">All workflows in one place</h2>
          <p className="text-gray-600 mb-8">Do not fill your head with details - sell auto parts</p>
          <img alt="Illustration of a box with documents and workflow items coming out of it" className="mx-auto" height="400" src="https://storage.googleapis.com/a1aa/image/4dynHzJM5U786vnZ7fXoIfSVm-IWIzRvigx-7r9HL-c.jpg" width="400"/>
        </div>
      </div>
    </div>
  );
};

export default Signin;
