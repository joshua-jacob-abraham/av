import { useState } from "react";
import "./Header.css";
import Menu from "./Menu";

function ExpandButton({ open, closing, onClick }) {
  return (
    <button
      className={`expand ${open ? "open" : ""} ${closing ? "closing" : ""}`}
      onClick={onClick}
      aria-label="Expand menu"
    >
      <span className="line vertical"></span>
      <span className="line horizontal"></span>
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleMenu = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 800);
    } else {
      setOpen(true);
    }
  };

  return (
    <header className="header">
      <h1 className="logo">ADDVERB</h1>
      <ExpandButton open={open} closing={closing} onClick={toggleMenu} />
      <Menu open={open && !closing} />
    </header>
  );
}

export default Header;
