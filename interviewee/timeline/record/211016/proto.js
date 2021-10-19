// Object.create
function prototype(obj){
    function F(){

    }
    F.prototype = obj;
    F.prototype.constructor = F;
    return new F();
}
// 构造继承
(function (){

    function Parent(){

    }
    Parent.prototype.getName = function (){
        console.log(this.name);
    }

    function Child(){

    }
    Child.prototype = new Parent();
})();

// 组合是
(function (){
    function Parent(){

    }
    Parent.prototype.getName = function (){
        console.log(this.name);
    }
    function Child(name,age){
        Parent.call(this,name);
        this.age = age;
    }
    Child.prototype = new Parent();
})();

// 寄生式
(function (){
    function Child(){
        function F(){

        }
        F.prototype = new Parent();
        F.prototype.constructor = F;
        return new F();
    }
})();


// 组合寄生
(function (){

    function Parent(){

    }
    Parent.prototype.getName = function (){
        console.log(this.name);
    }
    function Child(name,age){
        Parent.call(this,name);
        this.age = age;
    }

    function F(){

    }
    F.prototype = Parent.prototype;
    F.prototype.constructor = F;
    Child.prototype = new F();

})();
