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
        removeEl: '.todo-item-remove',
        doneEl: '.todo-item-toggle-done',
        clearEl: '.clear-done'
    });

    this.$app = $(this.options.todoAppEl);
    this.$input = $(this.options.inputEl);
    this.$list = $(this.options.listEl);
    this.items = [];

    this.bindEvents = function(){
        this.$app.on('keypress', this.options.inputEl, this, this.add);
        this.$app.on('click', this.options.removeEl, this, this.remove);
        this.$app.on('click', this.options.doneEl, this, this.toggleDone);
        this.$app.on('click', this.options.clearEl, this, this.clearDone);

        this.$app.on('changeData', '', this, this.save);
    };

    this.bindEvents();
    this.showSavedData();
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

        that.$app.trigger('changeData');
    }
};

Todo.prototype.remove = function(event){
    var that = event.data;
    
    event.preventDefault();
    $(this).closest('li').remove();
    that.$app.trigger('changeData');
};

Todo.prototype.toggleDone = function(event){
    var that = event.data;

    if($(this).is(':checked')){
        var $li = $(this).closest('li');

        $li.appendTo(that.$list);
        $li.attr('data-done', 'true');

    }else{
        $(this).closest('li').prependTo(that.$list);
    }

    that.$app.trigger('changeData');
};

Todo.prototype.clearDone = function(event){
    var that = event.data;
    that.$list.children('[data-done="true"]').remove();
    that.$app.trigger('changeData');
};

Todo.prototype.save = function(event){
    var that = event.data;
    var items = [];
    that.$list.children().each(function(key, item){
        var $item = $(item);

        items.push({
            description: $item.find('label').text(),
            done: $item.find('.todo-item-toggle-done').is(':checked')
        });
    });

    localStorage.items = JSON.stringify(items);
}

Todo.prototype.showSavedData = function(){
    var that = this;

    if(localStorage.items){
        var items = JSON.parse(localStorage.items);

        $.each(items, function(key, item){
            var checked = item.done ? 'checked' : '',
                todoItem = 
                '<li>' +
                    '<div class="todo-item">' +
                        '<input class="todo-item-toggle-done" type="checkbox" data-done="' + item.done + '" ' + checked + '>' +
                        '<label>' + item.description + '</label>' +
                        '<a href="#" class="todo-item-remove"></a>' +
                    '</div>' +
                '</li>';

            that.$list.append(todoItem);
        });
    }
}

