const add = key => {
    const localObj = JSON.parse(get());
    if(localObj[key]) {
        localObj[key]=localObj[key] + 1;
        localStorage.setItem('product',JSON.stringify(localObj));
    }
    else {
        localObj[key]=1;
        localStorage.setItem('product',JSON.stringify(localObj));
    }
}
const get = ()=> {
    return localStorage.getItem('product') || "{}";
}
const setToDB = db=> {
    localStorage.setItem('product',JSON.stringify(db));
}
const addToDB = key=> {
    add(key);
}
const getLocalValue = products=> {
    const dbObj = JSON.parse(get());
    const keys = Object.keys(dbObj);
    let finalObj = [];
    keys.map(ky => {
        const searchData = products.find(pd => pd.key === ky);
        finalObj.push(
        {
            price:searchData.price * dbObj[ky],
            shipping:searchData.shipping * dbObj[ky]
        }
        );
    })
    return finalObj;
}
export {addToDB,getLocalValue,get,setToDB};