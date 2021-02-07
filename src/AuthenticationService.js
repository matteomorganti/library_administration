import axios from "axios";

var sha256 = require("js-sha256");

class AuthenticationService {
  userLogin = (utente, password) => {
    password = sha256(password);
    return axios
      .post("http://progettopawm.ns0.it:8090/api/authentication/adminLogin", {
        utente,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "token",
            response.data.data.jwt.substring(7, response.data.data.jwt.lenght)
          );
        }
        return response.data.data.jwt.substring(
          7,
          response.data.data.jwt.lenght
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  logOut() {
    axios.get(
      "https://warm-sierra-79194.herokuapp.com/http://progettopawm.ns0.it:8090/api/authentication/logout",
      {}
    );
    return localStorage.removeItem("token");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("token"));
  }
}

export default new AuthenticationService();
