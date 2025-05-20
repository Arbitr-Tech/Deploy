import './App.css';
import '../src/styles/styles.css';
import { ToastContainer } from 'react-toastify';
import AppRouter from './routes/AppRouter';


function App() {
// const text = {number: 88005553535, company: 88005553535, address: 88005553535};

  return (
    <div className="app">
      <ToastContainer position="top-center" autoClose={5000} />
      {/* <TopBar /> */}
      {/* <RegistrationPage />
      <AuthorizationPage /> */}
      {/* <CargoForm data={{cargoName: "", weight: ""}}/> */}
      {/* <AutoForm data={{cargoName: "", weight: ""}}/> */}
      {/* <CargoPostPage typePage='add'/> */}
      {/* <AutoPostPage typePage='add'/> */}
      {/* <CargoListPage /> */}
      {/* <AutoListPage /> */}
      {/* <Popup text={'Вы действительно хотите удалить запись?'} typePopup={'del'}/> */}
      {/* <DriverForm></DriverForm> */}
      {/* <DriverPostPage /> */}
      <AppRouter />
      {/* <VerificationSuccessPage /> */}
      
    </div>
  );
}

export default App;
