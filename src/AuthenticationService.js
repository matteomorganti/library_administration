import axios from "axios";

class AuthenticationService {
   userLogin = (email, password) => {
      return axios.post("http://progettopawm.ns0.it:8090/api/authentication/userLogin", {email, password})
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }

  logOut() {
    //return axios.post("http://progettopawm.ns0.it:8090/api/authentication/logout", {}) da vedere
    localStorage.removeItem("user");
  }

  userRegister = async(nome, cognome, email, password) => {
    return axios.post("http://progettopawm.ns0.it:8090/api/authentication/addUser", {
      nome,
      cognome,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();