import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

export default function Login() {
  const [ login, setLogin ] = useState<{name: string, password: string}>({ name: "", password: "" });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.id;
    const newValue = e.target.value;

    setLogin(prev => ({...prev, [field]: newValue}));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(login)
    });

    if (!response.ok) {
      const { error }: { error: string } = await response.json();

      alert(error);
      return;
    }

    const { token }: { token: string } = await response.json();

    localStorage.setItem("sudoku-token", token);
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
      <form onSubmit={handleSubmit}>
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