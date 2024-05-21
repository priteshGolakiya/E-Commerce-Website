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
  deleteUser: {
    method: "DELETE",
    url: `${backendDomain}/admin/delete-user`,
  },

  /*------
    Admin Routes
    Category
    ------ */
  createCategory: {
    method: "POST",
    url: `${backendDomain}/admin/category`,
  },
  getAllCategory: {
    method: "GET",
    url: `${backendDomain}/admin/category`,
  },
  getAllCategoryById: {
    method: "GET",
    url: `${backendDomain}/admin/category`,
  },
  deleteCategory: {
    method: "DELETE",
    url: `${backendDomain}/admin/category`,
  },
  updateCategory: {
    method: "PUT",
    url: `${backendDomain}/admin/category`,
  },

  /*------
    Admin Routes
    Sub Category
    ------ */
  createSubcategory: {
    method: "POST",
    url: `${backendDomain}/admin/category/`,
  },
  getAllSubcategories: {
    method: "GET",
    url: `${backendDomain}/admin/subcategory`,
  },
  getSubcategoryById: {
    method: "GET",
    url: `${backendDomain}/admin/subcategory`,
  },
  deleteSubcategory: {
    method: "DELETE",
    url: `${backendDomain}/admin/subcategory`,
  },
  updateSubcategory: {
    method: "PUT",
    url: `${backendDomain}/admin/Subcategory`,
  },
};

export default summaryAPI;
