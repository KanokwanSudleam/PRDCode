class ContactID {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} ContactID
     */
    static SetContactID(ContactID) {
      localStorage.setItem('ContactID', ContactID);
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isContactIDHave() {
      return localStorage.getItem('ContactID') !== null;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deContactID() {
      localStorage.removeItem('ContactID');
    }
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  
    static getContactID() {
      return localStorage.getItem('ContactID');
    }

  }
  
  export default ContactID;
  