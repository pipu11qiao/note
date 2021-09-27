//
Function.prototype.myBind = function (context){
    const fun = this;
    const args = [].slice.apply([],arguments,1);
    return function (){
        fun.apply(context,[].slice.apply([],arguments).concat(args));
    }
}

function fun1(){
    console.log(this.name)
}
const obj = {
    name:'test'
}
var fun2 = fun1.myBind(obj);
fun2();
