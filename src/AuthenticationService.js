import axios from "axios";

var sha256 = require("js-sha256");

class AuthenticationService {
  userLogin = (utente, password) => {
    password = sha256(password);
    return axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/authentication/adminLogin",
        {
          utente,
          password,
        }
      )
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "token",
            response.data.data.jwt.substring(response.data.data.jwt.lenght)
          );
        }
        return response.data.data.jwt.substring(response.data.data.jwt.lenght);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  logOut() {
    let JWTToken = localStorage.getItem("token");
    axios.get(
      "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/authentication/logout",
      {
        headers: { Authorization: `${JWTToken}` },
      }
    );
    return localStorage.removeItem("token");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("token"));
  }
}

export default new AuthenticationService();
