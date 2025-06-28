const demo = ()=>{
    return new Promise(async(resolve)=>{
        const res = await fetch("/products");
        const data = await res.json();
        resolve({data});
    })
}
demo().then((data)=>{
    console.log(data)
})