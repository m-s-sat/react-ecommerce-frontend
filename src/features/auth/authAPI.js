// A mock function to mimic making an async request for data
export function createUsers(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo){
  return new Promise (async (resolve,reject)=>{
    const response = await fetch("http://localhost:8080/auth/login");
    const data = await response.json();
    if(response.ok) resolve({data});
    else reject({message:"Email or password may be wrong"});
  })
}

export function signOut(){
  return new Promise(async(resolve)=>{
    resolve({data:'success'});
  })
}