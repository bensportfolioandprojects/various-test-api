import './App.css';
import Header from './Components/Header'
import Body from './Components/Body'
import NavBar from './Components/NavBar';
import Image from './Components/Image';

export default function App() {
  return (
    <div className="app--container">
    <Header />
    <NavBar />
    <Image />
    <Body />
    </div>
  );

}