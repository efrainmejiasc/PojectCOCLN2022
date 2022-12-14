export class Auth2Service{
  loggedIn = true;

  isAuthenticated(){

    const promise = new Promise(
      (resolve, reject) =>{
        setTimeout(()=>{
          resolve(this.loggedIn);
        }, 800);
      }
    );

    return promise;

  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false
  }
}
