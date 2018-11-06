class UserName {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} Username
     */
    static SetUser(Username) {
      localStorage.setItem('Username', Username);
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserHave() {
      return localStorage.getItem('Username') !== null;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deUsername() {
      localStorage.removeItem('Username');
    }
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  
    static getUsername() {
      return localStorage.getItem('Username');
    }

  }
  
  export default UserName;
  