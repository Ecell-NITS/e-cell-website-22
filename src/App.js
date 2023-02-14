import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Team from './pages/Team/Team'
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery'
import Footerconstant from "./components/shared/FooterConstant/Footerconstant";
import NotFound from './pages/404/NotFound';
import ScrollToTop from './components/shared/ScrollToTop/ScrollToTop';
import Scrolling from "./components/shared/ScrollToTop/Scrolling";
import Events from "./pages/Events/Events";
import Resources from "./pages/Resources/Resources";
function App() {
  return (
    <>
      <BrowserRouter>
        <Scrolling>
          <Routes>
            <Route exact path="/" element={<Home />} key="route-home-screen" />
            <Route
              exact
              path="/gallery"
              element={<Gallery />}
              key="route-gallery-screen"
            />
            <Route
              exact
              path="/team"
              element={<Team />}
              key="route-team-screen"
            />
             <Route
              exact
              path="/events"
              element={<Events />}
              key="route-events-screen"
            />
              <Route
              exact
              path="/resources"
              element={<Resources />}
              key="route-events-screen"
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Scrolling>
        <ScrollToTop />
        <Footerconstant />
      </BrowserRouter>
    </>
  );
}

export default App;
