import { useState } from "react";
import rootMenu from "./data/rootmenu";
import "./Menu.css";
import arrowSvg from "./assets/arrow.svg";

function MenuItem({ item, level = 0, isOpen, onToggle, openSubmenuIndex, onSubmenuToggle }) {
  const [submenu, setSubmenu] = useState(item.submenu || null);
  const hasLazy = typeof item.lazy === "function";

  const handleToggle = async (e) => {
    e.stopPropagation();

    if (hasLazy && !submenu) {
      const mod = await item.lazy();
      setSubmenu(mod.default);
    }

    onToggle();
  };

  return (
    <li className={`menu-item level-${level}`}>
      <div className="menu-title">
        {item.link ? (
          <a href={item.link}>{item.title}</a>
        ) : (
          <span>{item.title}</span>
        )}

        {(submenu || hasLazy) && (
          <span
            className={`arrow ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
          >
            <img src={arrowSvg} alt="arrow" />
          </span>
        )}
      </div>

      {submenu && (
        <ul className={`submenu ${isOpen ? "open" : ""}`}>
          {submenu.map((subItem, idx) => (
            <SubMenuItem
              key={idx}
              item={subItem}
              level={level + 1}
              isOpen={openSubmenuIndex === idx}
              onToggle={() => onSubmenuToggle(idx)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function SubMenuItem({ item, level, isOpen, onToggle }) {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [submenu, setSubmenu] = useState(item.submenu || null);
  const hasLazy = typeof item.lazy === "function";

  const handleToggle = async (e) => {
    e.stopPropagation();

    if (hasLazy && !submenu) {
      const mod = await item.lazy();
      setSubmenu(mod.default);
    }

    onToggle();
    if (!isOpen) setOpenSubmenuIndex(null);
  };

  const handleSubmenuToggle = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  return (
    <li className={`menu-item level-${level}`}>
      <div className="menu-title">
        {item.link ? (
          <a href={item.link}>{item.title}</a>
        ) : (
          <span>{item.title}</span>
        )}

        {(submenu || hasLazy) && (
          <span
            className={`arrow ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
          >
            <img src={arrowSvg} alt="arrow" />
          </span>
        )}
      </div>

      {submenu && (
        <ul className={`submenu ${isOpen ? "open" : ""}`}>
          {submenu.map((subItem, idx) => (
            <SubMenuItem
              key={idx}
              item={subItem}
              level={level + 1}
              isOpen={openSubmenuIndex === idx}
              onToggle={() => handleSubmenuToggle(idx)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Menu({ open }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [search, setSearch] = useState("");

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
    setOpenSubmenuIndex(null);
  };

  return (
    <nav className={`mobile-menu glass ${open ? "open" : ""}`}>
      <div className="menu-search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="menu-list">
        {rootMenu.map((item, idx) => (
          <MenuItem
            key={idx}
            item={item}
            isOpen={openMenuIndex === idx}
            onToggle={() => handleMenuToggle(idx)}
            openSubmenuIndex={openSubmenuIndex}
            onSubmenuToggle={setOpenSubmenuIndex}
          />
        ))}
      </ul>
    </nav>
  );
}
