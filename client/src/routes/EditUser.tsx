import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/edit-user.css";

type EditType = "name" | "pass" | undefined;

export default function EditUser() {
  const TRANSITION_TIME = 1000;
  const NAME = localStorage.getItem("sudoku-name");

  const navigate = useNavigate();

  useEffect(() => {
    if (NAME === null)
      navigate("/");
  }, []);

  const [ editType, setEditType ] = useState<EditType>();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ closer, setCloser ] = useState<number | undefined>(undefined);

  const [ typeValue, setTypeValue ] = useState({
    name: NAME || "",
    pass: "",
    "c-pass": ""
  });

  function makeTranstion(newType: EditType) {
    const isClosing = editType === newType;

    if (isClosing) {
      setIsOpen(false);

      const timeout = setTimeout(() => {
        setEditType(undefined);
      }, TRANSITION_TIME);

      setCloser(timeout);
    } else {
      setEditType(newType);
      setIsOpen(true);

      if (closer !== undefined)
        clearTimeout(closer);

      setCloser(undefined);
    }
  }

  function handleChangeType(e: MouseEvent) {
    const type = (e.target as HTMLButtonElement).id as EditType;

    makeTranstion(type);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.id.replace("-i", "");
    const value = e.target.value;

    setTypeValue(prev => ({...prev, [field]: value}));
  }

  async function handleTrocar() {
    if (editType === undefined)
      return;

    if (editType === "name") {
      const response = await fetch("http://localhost:5000/user/edit/name", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem("sudoku-token") || ""
        },
        body: JSON.stringify({ name: typeValue.name })
      });

      if (!response.ok) {
        const { error } = await response.json();

        alert(error);
      } else {
        const { name } = await response.json();

        localStorage.setItem("sudoku-name", name);

        navigate("/user/" + name);
      }

      return;
    }

    if (typeValue.pass !== typeValue["c-pass"]) {
      alert("Senha e senha de confirmação devem ser iguais");
      return;
    }

    const response = await fetch("http://localhost:5000/user/edit/password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("sudoku-token") || ""
      },
      body: JSON.stringify({ password: typeValue.pass })
    });

    if (!response.ok) {
      const { error } = await response.json();

      alert(error);
    } else {
      navigate("/user/" + NAME);
    }
  }

  return (
    <div className="edit-user">
      <div className={`door left ${isOpen ? "open" : ""}`}>
        <button id="name" onClick={handleChangeType}>Nome</button>
      </div>
      <div className={`door right ${isOpen ? "open" : ""}`}>
        <button id="pass" onClick={handleChangeType}>Senha</button>
      </div>
      <div className="form">
        <div className="form-container">
          {editType === "name" &&
            <>
              <div>
                <label htmlFor="name-i">Trocar nome de usuário</label>
                <input type="text" id="name-i" value={typeValue.name} onChange={handleChange} />
              </div>
              <button onClick={handleTrocar}>Trocar</button>
            </>
          }
          {editType === "pass" &&
            <>
              <div>
                <label htmlFor="pass-i">Trocar senha de usuário</label>
                <input type="text" id="pass-i" value={typeValue.pass} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="c-pass-i">Confirmar nova senha</label>
                <input type="text" id="c-pass-i" value={typeValue["c-pass"]} onChange={handleChange} />
              </div>
              <button onClick={handleTrocar}>Trocar</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}