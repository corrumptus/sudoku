export default function Login() {
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