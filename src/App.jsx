import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/404/NotFound";
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";
import Scrolling from "./components/shared/ScrollToTop/Scrolling";
import Team from "./pages/Team/Team";
import Gallery from "./pages/Gallery/Gallery";
import Events from "./pages/Events/Events";
import Resources from "./pages/Resources/Resources";
import AllEvents from "./components/EventsPage/AllEvents";
import Eventsred from "./pages/Events_red/Events_red";
import Recuitmentdetails from "./pages/Recruiting2324/Recuitmentdetails";
import Contactresponse from "./components/Home/Contact/Contactresponse";
import Newsletter from "./components/shared/Footer/Newsletter";
import Createblog from "./pages/Resources/Blogs/Createblog";
import Blogindividual from "./pages/Resources/Blogs/Blogindividual";
import Provisionalbloglist from "./components/Blog/Provisionalbloglist";
import Signup from "./pages/Auth/Signup/Signup";
import Login from "./pages/Auth/Login/Login";
import Dashboard from "./pages/Auth/Dashboard/Dashboard";
import Editprofile from "./pages/Auth/Dashboard/Editprofile";
import Allblogswritten from "./pages/Auth/Dashboard/Allblogswritten";
import Allprovblogs from "./pages/Auth/Dashboard/Allprovblogs";
import Alllikedblogs from "./pages/Auth/Dashboard/Alllikedblogs";
import Techresults from "./pages/Projectsubmission/Techresults";
import Editblogform from "./pages/Auth/Dashboard/EditBlog/Editblogform";
import Publicprofile from "./pages/Auth/Dashboard/Publicprofile";
import Forgotpwd from "./pages/Auth/Login/Forgotpwd";
import Tagspecificblog from "./components/Blog/Tagspecificblog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogRedirect from "./pages/Redirect/BlogRedirect";
import UserRedirect from "./pages/Redirect/UserRedirect";
import Logout from "./pages/Auth/Logout/Logout";
import Preloader from "./components/Loader/Loader";
import { useState, useEffect } from "react";
import ConnectionDropBanner from "./components/ConnectionDropBanner/ConnectionDropBanner";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete") {
          handleLoad();
        }
      });
    }

    return () => {
      document.removeEventListener("readystatechange", handleLoad);
    };
  }, []);

  return (
    <>
      <Router>
        <Scrolling>
          {loading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route exact path="/" element={<Home />} key="route-home-screen" />
              <Route
                exact
                path="/gallery"
                element={<Gallery />}
                key="route-gallery-screen"
              />
              <Route exact path="/team" element={<Team />} key="route-team-screen" />
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

              <Route
                exact
                path="/allevents"
                element={<AllEvents />}
                key="route-allevents-screen"
              />
              <Route
                exact
                path="/events_red"
                element={<Eventsred />}
                key="route-allevents-screen"
              />

              <Route
                exact
                path="/recruitusers"
                element={<Recuitmentdetails />}
                key="route-recruitment-screen"
              />

              <Route
                exact
                path="/contactresponses"
                element={<Contactresponse />}
                key="route-contactresponse-screen"
              />

              <Route
                exact
                path="/newsletterresponses"
                element={<Newsletter />}
                key="route-newsletterresponse-screen"
              />
              <Route
                exact
                path="/createblog"
                element={<Createblog />}
                key="route-createblog-screen"
              />
              <Route
                exact
                path="/provisionalblog"
                element={<Provisionalbloglist />}
                key="route-provisionalblog-screen"
              />

              <Route
                exact
                path="/signup"
                element={<Signup />}
                key="route-signup-screen"
              />
              <Route exact path="/login" element={<Login />} key="route-login-screen" />
              <Route
                exact
                path="/dashboard"
                element={<Dashboard />}
                key="route-dashboard-screen"
              />
              <Route
                exact
                path="/editprofile"
                element={<Editprofile />}
                key="route-dashboard-edit-profile-screen"
              />

              <Route
                exact
                path="/blog/:_id"
                element={<Blogindividual />}
                key="route-infividualblog-screen"
              />

              <Route
                exact
                path="/mypublishedblogs"
                element={<Allblogswritten />}
                key="route-Allblogswritten-screen"
              />

              <Route
                exact
                path="/myallblogs"
                element={<Allprovblogs />}
                key="route-Allblogswritten-screen"
              />

              <Route
                exact
                path="/likedblogs"
                element={<Alllikedblogs />}
                key="route-Alllikedblogs-screen"
              />

              <Route
                exact
                path="/techresults"
                element={<Techresults />}
                key="route-Techresults-screen"
              />

              <Route
                exact
                path="/editblog/:blogId"
                element={<Editblogform />}
                key="route-EditBlog-screen"
              />

              <Route
                exact
                path="/user/:authoruniqueid"
                element={<Publicprofile />}
                key="route-PublicProfile-screen"
              />

              <Route
                exact
                path="/forgot password"
                element={<Forgotpwd />}
                key="route-Forgot-password-screen"
              />

              <Route
                exact
                path="/tag/:word"
                element={<Tagspecificblog />}
                key="route-Tagspecificblog-screen"
              />

              <Route exact path="/logout" element={<Logout />} />

              <Route path="/blog" element={<BlogRedirect />} />

              <Route path="/blogs" element={<BlogRedirect />} />

              <Route path="/tags" element={<BlogRedirect />} />

              <Route path="/tag" element={<BlogRedirect />} />

              <Route path="/user" element={<UserRedirect />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Scrolling>
        <ScrollToTop />
      </Router>
      <ConnectionDropBanner />
      <ToastContainer />
    </>
  );
}

export default App;
