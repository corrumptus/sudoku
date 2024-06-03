import { ChangeEvent, useState } from "react";

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

  return (
    <div>
      <form>
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
          <button>Limpar</button>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  )
}