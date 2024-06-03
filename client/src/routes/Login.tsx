import { useState } from "react";

export default function Login() {
  const [ login, setLogin ] = useState<{name: string, password: string}>({ name: "", password: "" });

  return (
    <div className="login">
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="text" id="password" />
        </div>
        <div>
          <button>Limpar</button>
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}