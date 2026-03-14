import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const url = `${import.meta.env.VITE_API_URL}/auth/login`;

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
    } else {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        localStorage.setItem('token', data.token);
        console.log(data);
        navigate('/decks');
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Something went wrong');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          name="email"
          placeholder="email"
          required
          type="email"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          name="password"
          placeholder="password"
          required
          type="password"
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
