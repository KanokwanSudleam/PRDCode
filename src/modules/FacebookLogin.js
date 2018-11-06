class Facebook {
    static AddEvent(){
        document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    }
    
    static RemoveEvent(){
        document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    static initializeFacebookLogin(){
        this.FB = window.FB;
      }
    
  }
  
  export default  Facebook;
  