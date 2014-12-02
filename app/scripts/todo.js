'use strict';

var config = {
    keys: {
        enter: 13
    }
};

var Todo = function(options){
    this.options = $.extend(options, {
        todoAppEl: '.todo-app',
        inputEl: '.todo-input',  
        listEl: '.todo-list'
    });

    this.$app = $(this.options.todoAppEl);
    this.$input = $(this.options.inputEl);
    this.$list = $(this.options.listEl);
    this.options.items = [];

    this.bindEvents = function(){
        this.$app.on('keypress', this.options.inputEl, this, this.add);
    };

    this.bindEvents();
};

Todo.prototype.add = function(event){
    var that = event.data;

    if (event.which === config.keys.enter) {

        var todoItem = 
                '<li>' +
                    '<div class="view">' +
                        '<input class="toggle" type="checkbox">' +
                        '<label data="">' + ' ' + that.$input.val() + '</label>' +
                        '<a class="destroy"></a>' +
                    '</div>' +
                '</li>';

        that.$list.append(todoItem);
        that.$input.val('');
    }
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