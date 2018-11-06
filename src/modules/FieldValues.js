class FieldValues {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} FieldValues
     */
    static SetFieldValues(FieldValues) {
      localStorage.setItem('FieldValues', FieldValues);
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isFieldValuesHave() {
      return localStorage.getItem('FieldValues') !== null;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deFieldValues() {
      localStorage.removeItem('FieldValues');
    }
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  
    static getFieldValues() {
      return localStorage.getItem('FieldValues');
    }

      
    // static initFieldValues() {
    //   var fieldValues = {
    //     ticketid :'',
    //     status : null,
    //     contactid : ContactID.getContactID(),
    //     accountid: null,
    //     accountname : null,
    //     category   : "ร้องเรียน",
    //     subcate1 : "3.สื่อและโทรคมนาคม",
    //     subcate2 : "3.2 การกระจายเสียงและโทรทัศน์",
    //     subcate3 : "3.2.3 สื่อสิ่งพิมพ์/ป้ายโฆษณา",
    //     channel : "9.Mobile App",
    //     productname : '',
    //     productprice : '',
    //     purchasedate : '',
    //     payment : '',
    //     purchase : '',
    //     website : '',
    //     store : '',
    //     problem : '',
    //     damage : '',
    //     desc : '',
    //     new_request : '',
    //     ownerid : null,
    //     state : null,
    //     name     : Username.getUsername(),
    //   }
    //   return fieldValues;
    // }


  }
  
  export default FieldValues;
  