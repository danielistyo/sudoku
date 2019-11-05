import React from "react";
import './Header.scss'

export default function Header() {
  return (
    <header className="c-header">
      <img
        className="c-header__logo"
        src={`${process.env.PUBLIC_URL}/logo-sudoku.png`}
        alt="logo"
      />
    </header>
  );
}
