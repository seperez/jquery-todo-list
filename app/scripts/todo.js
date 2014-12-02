'use strict';

var config = {
    keys: {
        enter: 13
    }
};

var Todo = function(options){
    console.log('new todo');
};

Todo.prototype.add = function(event){
    console.log('add');
};

Todo.prototype.remove = function(){
    console.log('remove');  
};

Todo.prototype.done = function(){
    console.log('done');
};

Todo.prototype.clear = function(){
    console.log('clear');
};