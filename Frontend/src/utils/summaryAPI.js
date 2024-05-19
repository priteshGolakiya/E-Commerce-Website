const backendDomain = "http://localhost:5000/api";

const summaryAPI = {
  /*------Common Routes------*/

  signUP: {
    method: "POST",
    url: `${backendDomain}/signup`,
  },
  logIn: {
    method: "POST",
    url: `${backendDomain}/login`,
  },
  userDetails: {
    method: "GET",
    url: `${backendDomain}/user-details`,
  },
  logout: {
    method: "GET",
    url: `${backendDomain}/logout`,
  },

  /*------Admin Routes------ */

  getAllUser: {
    method: "GET",
    url: `${backendDomain}/admin/all-users`,
  },
  updateUser: {
    method: "PUT",
    url: `${backendDomain}/admin/update-user`,
  },
};

export default summaryAPI;
