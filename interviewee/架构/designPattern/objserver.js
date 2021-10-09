/**
 *比较概念的解释是，目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法。
 */

//观察者列表
function ObserverList(){
    this.observerList = [];
}
ObserverList.prototype.add = function( obj ){
    return this.observerList.push( obj );
};
ObserverList.prototype.count = function(){
    return this.observerList.length;
};
ObserverList.prototype.get = function( index ){
    if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ];
    }
};
ObserverList.prototype.indexOf = function( obj, startIndex ){
    var i = startIndex;
    while( i < this.observerList.length ){
        if( this.observerList[i] === obj ){
            return i;
        }
        i++;
    }
    return -1;
};
ObserverList.prototype.removeAt = function( index ){
    this.observerList.splice( index, 1 );
};

//目标
function Subject(){
    this.observers = new ObserverList();
}
Subject.prototype.addObserver = function( observer ){
    this.observers.add( observer );
};
Subject.prototype.removeObserver = function( observer ){
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};
Subject.prototype.notify = function( context ){
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
        this.observers.get(i).update( context );
    }
};

//观察者
function Observer(){
    this.update = function(){
        // ...
    };
}
