import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { Home } from "../pages/Dashboard/Home/Home";
import { User } from "../pages/user/user";
import { FooterApp } from "../components/FooterApp/FooterApp";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { PixarContext } from "../context/ContextProvider";
import { OneFilm } from "../pages/Dashboard/Film/OneFilm";

export const AppRoutes = () => {
  const {user} = useContext(PixarContext)

  return (
    <BrowserRouter>
      {user && 
      <NavbarApp />
      }
      <Routes>
        {!user && 
          <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </>
        }
        {user &&
          <>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<User />} />
          <Route path="/oneFilm/:id" element={<OneFilm />} />
          </>
        }
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      {user && <FooterApp />}
    </BrowserRouter>
  );
};
