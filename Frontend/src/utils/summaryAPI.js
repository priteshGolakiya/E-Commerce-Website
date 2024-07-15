const backendDomain = "http://localhost:5000/api";

const summaryAPI = {
  /*------Common Routes------*/
  common: {
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
    getAllProducts: {
      method: "GET",
      url: `${backendDomain}/product`,
    },
    getProductById: {
      method: "GET",
      url: `${backendDomain}/product`,
    },
    searchProduct: {
      method: "GET",
      url: `${backendDomain}/product/search`,
    },
    getAllCategory: {
      method: "GET",
      url: `${backendDomain}/category`,
    },
    getAllCategoryById: {
      method: "GET",
      url: `${backendDomain}/category`,
    },
    getAllSubcategories: {
      method: "GET",
      url: `${backendDomain}/subcategory`,
    },
    getSubcategoryById: {
      method: "GET",
      url: `${backendDomain}/subcategory`,
    },
    getUserCart: {
      method: "GET",
      url: `${backendDomain}/cart`,
    },
    addToCart: {
      method: "POST",
      url: `${backendDomain}/cart/add`,
    },
    updateCartItem: {
      method: "PUT",
      url: `${backendDomain}/cart/update`,
    },
    removeFromCart: {
      method: "DELETE",
      url: `${backendDomain}/cart/remove`,
    },
    clearCart: {
      method: "DELETE",
      url: `${backendDomain}/cart/clear`,
    },
  },
  admin: {
    /*------Admin------ */

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

    /*------Admin Category------ */
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

    /*------Admin Sub Category------ */
    createSubcategory: {
      method: "POST",
      url: `${backendDomain}/admin/subcategory`,
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

    /*------Admin products------ */
    getAllProducts: {
      method: "GET",
      url: `${backendDomain}/admin/product`,
    },
    getProductById: {
      method: "GET",
      url: `${backendDomain}/admin/product`,
    },
    createProduct: {
      method: "POST",
      url: `${backendDomain}/admin/product`,
    },
    updateProduct: {
      method: "PUT",
      url: `${backendDomain}/admin/product`,
    },
    deleteProduct: {
      method: "DELETE",
      url: `${backendDomain}/admin/product`,
    },

    /*------Review Routes------ */
    createReview: {
      method: "POST",
      url: `${backendDomain}/admin/reviews`,
    },
    getAllReviews: {
      method: "GET",
      url: `${backendDomain}/admin/reviews`,
    },
    getReviewsforProduct: {
      method: "GET",
      url: `${backendDomain}/admin/reviews/:productId`,
    },
    updateReview: {
      method: "PUT",
      url: `${backendDomain}/admin/reviews/:reviewId`,
    },
    deleteReview: {
      method: "DELETE",
      url: `${backendDomain}/admin/reviews/:reviewId`,
    },
    /*------Cart Routes------ */
    getAllCarts: {
      method: "GET",
      url: `${backendDomain}/admin/cart`,
    },
    getCartById: {
      method: "GET",
      url: `${backendDomain}/admin/cart`,
    },
    updateCart: {
      method: "PUT",
      url: `${backendDomain}/admin/cart`,
    },
    deleteCart: {
      method: "DELETE",
      url: `${backendDomain}/admin/cart`,
    },
    getCartStats: {
      method: "GET",
      url: `${backendDomain}/admin/cart/stats`,
    },
  },
};

export default summaryAPI;
