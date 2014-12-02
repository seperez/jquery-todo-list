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
        listEl: '.todo-list',
        removeEl: '.todo-item-remove'
    });

    this.$app = $(this.options.todoAppEl);
    this.$input = $(this.options.inputEl);
    this.$list = $(this.options.listEl);
    this.options.items = [];

    this.bindEvents = function(){
        this.$app.on('keypress', this.options.inputEl, this, this.add);
        this.$app.on('click', this.options.removeEl, this, this.remove);
    };

    this.bindEvents();
};

Todo.prototype.add = function(event){
    var that = event.data;

    if (event.which === config.keys.enter) {

        var todoItem = 
                '<li>' +
                    '<div class="todo-item">' +
                        '<input class="todo-item-toggle-done" type="checkbox">' +
                        '<label>' + that.$input.val() + '</label>' +
                        '<a href="#" class="todo-item-remove"></a>' +
                    '</div>' +
                '</li>';

        that.$list.append(todoItem);
        that.$input.val('');
    }
};

Todo.prototype.remove = function(event){
    event.preventDefault();
    $(this).closest('li').remove();
};

Todo.prototype.done = function(){
    console.log('done');
};

Todo.prototype.clear = function(){
    console.log('clear');
};