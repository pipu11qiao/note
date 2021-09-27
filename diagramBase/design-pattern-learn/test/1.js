// fn = fn-1 + fn-2
// n=1 1 n=2 1
function    jump(n){
    if(n===1){
        return 1
    }
    if(n ===2){
        return 2
    }
    return  jump(n-1) + jump(n-2);

}
function jump1(n){
    if(n===1){
        return 1
    }
    if(n ===2){
        return 2
    }
    let first = 1;
    let second = 2;
    //3开始
    for(let i=3;i<=n;i++){
        second = first + (first=second);//n
    }
    return  second
}

console.log(jump(8))
console.log(jump1(8))


