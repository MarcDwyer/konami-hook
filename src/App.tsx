import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const useKonami = (secret: string) => {
  const [code, setCode] = useState<string[]>([]);
  const [isSet, setIsSet] = useState<boolean>(false);
  const handleKeydown = (e: KeyboardEvent) => {
    setCode(c => {
      const { length } = secret;
      if (c.length >= length) {
        let copy = [...c];
        copy.shift();
        return [...copy, e.key];
      } else {
        return [...c, e.key];
      }
    });
  };
  useEffect(() => {
    if (code.length) {
      if (code.join("") === secret) {
        setIsSet(true);
      }
    }
  }, [code]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return function() {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  console.log(code);
  return isSet;
};
const App: React.FC = () => {
  const konami = useKonami("apple");
  console.log(konami);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
