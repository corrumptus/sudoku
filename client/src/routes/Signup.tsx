import { useState } from "react";

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

  return (
    <div>
      <form>
        <h1>Entrar</h1>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="text" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmação de senha</label>
          <input type="text" id="confirmPassword" />
        </div>
        <div>
          <button>Limpar</button>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  )
}