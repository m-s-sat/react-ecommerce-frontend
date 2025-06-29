
// A mock function to mimic making an async request for data
export function createUsers(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo){
  return new Promise (async (resolve,reject)=>{
    try{
      const response = await fetch("/auth/login",{
      method:"POST",
      body:JSON.stringify(loginInfo),
      headers:{"content-type":"application/json"},
      });
      if(response.ok){
        const data = await response.json();
        resolve({data});
      }
      else{
        const err = await response.text();
        reject(err);
      }
    }
    catch(err){
      reject(err);
    }
  })
}

export function checkAuth(){
  return new Promise(async(resolve,reject)=>{
    try{
      const response = await fetch('/auth/check');
      if(response.ok){
        const data = await response.json();
        resolve({data});
      }
      else{
        const error = await response.text();
        reject(error);
      }
    }
    catch(err){
      reject(err);
    }
  })
}

export function signOut(userId){
  return new Promise(async(resolve)=>{
    resolve({data:'success'});
  })
}

export function resetPasswordRequest(email){
  return new Promise(async(resolve,reject)=>{
    try{
      const response = await fetch('/auth/reset-password-request',{
        method: "POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email})
      });
      if(response.ok){
        const data = await response.json();
        resolve({data});
      }
      else{
        const error = await response.text();
        reject(error);
      }
    }
    catch(err){
      reject(err);
    }
  })
}

export function resetPassword(data){
  return new Promise(async(resolve,reject)=>{
    try{
      const response = await fetch('/auth/reset-password',{
        method: "POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data)
      });
      if(response.ok){
        const data = await response.json();
        resolve({data});
      }
      else{
        const error = await response.text();
        reject(error);
      }
    }
    catch(err){
      reject(err);
    }
  })
}