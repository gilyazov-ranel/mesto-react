import logoMesto from '../image/logo_mesto.svg';

function Header() {
  return (

    <header className="header">
      <img src={logoMesto} alt="Логотип Места России" className="header__logo" />
    </header>

  );
}

export default Header;