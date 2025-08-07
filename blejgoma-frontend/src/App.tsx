import { useScrollToTop } from "./lib/hooks/useScrollToTop";
import { Page } from "./components/Page/Page";

//Partials
import { Header } from "./components/partials/Header/Header";

import { Footer } from "./components/partials/Footer/Footer";
import { Routes } from "./routes/Routes";
import { ReactComponent as LogoIcon } from "./assets/images/logo-gray.svg";

import "./App.scss";
import { useAuthContext } from "./lib/context/AuthContext/AuthContext";

function App() {
  const authCtx = useAuthContext();
  useScrollToTop();
  return (
    <div className="App">
      {authCtx.isLoading && <AppLoader />}
      <Header />
      <Page>
        <Routes />
      </Page>
      <Footer />
    </div>
  );
}
export function AppLoader() {
  return (
    <div className="App__loader">
      <LogoIcon />
    </div>
  );
}
export default App;
