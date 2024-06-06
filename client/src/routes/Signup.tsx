import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import "../styles/signup.css";

export default function Signup() {
  const [ signUp, setSignUp ] = useState<{
    name: string,
    password: string,
    confirmPassword: string
  }>({
    name: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.id;
    const newValue = e.target.value;

    setSignUp(prev => ({...prev, [field]: newValue}));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (signUp.password !== signUp.confirmPassword) {
      alert("A senha e a senha de confirmação devem ser iguais");
      return;
    }

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name: signUp.name, password: signUp.password })
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

    setSignUp({
      name: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" value={signUp.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="text" id="password" value={signUp.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmação de senha</label>
          <input type="text" id="confirmPassword" value={signUp.confirmPassword} onChange={handleChange} />
        </div>
        <div>
          <button onClick={clear}>Limpar</button>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  )
}