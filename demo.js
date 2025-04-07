const demo = ()=>{
    return new Promise(async(resolve)=>{
        const res = await fetch("http://localhost:8080/products");
        const data = await res.json();
        resolve({data});
    })
}
demo().then((data)=>{
    console.log(data)
})