import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [{ username, password }, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const { error, isLoading, login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // request in API Auth
    login(username, password);
  };

  const handleCahnge = async (event) => {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>
        <input name='username' onChange={handleCahnge} />
        <input type='password' name='password' onChange={handleCahnge} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
