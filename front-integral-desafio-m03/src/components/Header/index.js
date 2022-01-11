import './style.css'
import logo from '../../assets/logo.svg';

function Header() {
  return (
    <nav className="container-header">
      <img className="logo" src={logo} alt="Logo" />
    </nav>
  );
}

export default Header;