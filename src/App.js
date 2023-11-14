import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Walk from "./pages/Walk";
import Mypage from "./pages/Mypage";
import Community from "./pages/Community";
import Hospital from "./pages/Hospital";
import Navigation from "./pages/Navigation";

function App() {
  const [coord, setCoord] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
          }
        )
        .then((result) => {
          //법정동 기준으로 동단위의 값을 가져온다
          let location = result.data.documents[0];
          setCoord(location);
        });
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/registration"
            exact
            element={<Registration coord={coord} />}
          />
          <Route path="/walk" exact element={<Walk coord={coord} />} />
          <Route path="/mypage" exact element={<Mypage coord={coord} />} />
          <Route
            path="/community"
            exact
            element={<Community coord={coord} />}
          />
          <Route path="/hospital" exact element={<Hospital coord={coord} />} />
          <Route path="/navigation" exact element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
