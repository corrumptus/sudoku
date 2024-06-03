import { ChangeEvent, MouseEvent, useState } from "react";

export default function Login() {
  const [ login, setLogin ] = useState<{name: string, password: string}>({ name: "", password: "" });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.id;
    const newValue = e.target.value;

    setLogin(prev => ({...prev, [field]: newValue}));
  }

  function clear(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    setLogin({
      name: "",
      password: ""
    });
  }

  return (
    <div className="login">
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" value={login.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="text" id="password" value={login.password} onChange={handleChange} />
        </div>
        <div>
          <button onClick={clear}>Limpar</button>
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}