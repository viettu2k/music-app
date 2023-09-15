import React, { useEffect, useState } from 'react';

const DEFAULT_ACCOUNT = {
  email: 'duc@gmail.com',
  password: '123123',
};

const Login = ({ setIsLogined }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentForm, setCurrentForm] = useState('login');
  const [accounts, setAccounts] = useState([DEFAULT_ACCOUNT]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const oldAccounts = JSON.parse(
      window.localStorage.getItem('accounts') ||
        JSON.stringify([DEFAULT_ACCOUNT])
    );

    setAccounts([...oldAccounts]);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    accounts.forEach((account) => {
      if (JSON.stringify(account) === JSON.stringify({ email, password })) {
        setIsLogined(true);
      }
    });

    setError('Account not found!');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('All fields must be filled!');
      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      return;
    }

    const existedAccount = accounts.find((account) => account.email === email);

    if (existedAccount) {
      setError('Account already exists!');
      return;
    }

    const newAccounts = [...accounts, { email, password }];
    setAccounts(newAccounts);
    window.localStorage.setItem('accounts', JSON.stringify(newAccounts));
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setSuccess('Registers successfully!');
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-br from-black to-[#121286] flex items-center justify-center'>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-[#121286] text-2xl text-center font-bold'>
            {currentForm.toUpperCase()}
          </h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {currentForm === 'register' && (
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='passwordConfirm'
              >
                Password Confirm
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='passwordConfirm'
                type='password'
                placeholder='Enter your password confirm'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <div className='mb-6'>
            {currentForm === 'login' ? (
              <p
                onClick={() => {
                  setError('');
                  setEmail('');
                  setPassword('');
                  setPasswordConfirm('');
                  setSuccess('');
                  setCurrentForm('register');
                }}
                className='text-blue-400 cursor-pointer font-bold'
              >
                Register a new account!
              </p>
            ) : (
              <p
                onClick={() => {
                  setError('');
                  setEmail('');
                  setPassword('');
                  setSuccess('');
                  setCurrentForm('login');
                }}
                className='text-blue-400 cursor-pointer font-bold'
              >
                Login with an existing account!
              </p>
            )}
          </div>

          {currentForm === 'login' ? (
            <div className='flex items-center justify-start'>
              <button
                onClick={handleLogin}
                className='self-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Login
              </button>
            </div>
          ) : (
            <div className='flex items-center justify-end'>
              <button
                onClick={handleRegister}
                className='self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
