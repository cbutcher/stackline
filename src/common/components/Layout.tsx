import logo from '../../assets/logo.svg';
import ConnectedProduct from '../../features/products/components/ConnectedProduct';
import '../styles/layout.css';

// Constant default product id from mock data
const DEFAULT_PRODUCT_ID = 'B007TIE0GQ';

export default function Layout() {
  return (
    <>
      <header className="Header">
        <img className="Logo" src={logo} alt={'stackline logo'} />
      </header>
      <main className="Main">
        <ConnectedProduct productId={DEFAULT_PRODUCT_ID} />
      </main>
    </>
  );
}