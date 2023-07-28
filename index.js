$(document).ready(function(){
    // created todos stored in array. input taken from bootstarped form
    var createdTodos= [];
    $("#inputForm").submit(function(event){
        event.preventDefault();

        const newTodo = $("#inputtext").val();
        //push todos to array as and when they are created and displayed.
        createdTodos.push(newTodo);
        $("#inputtext").val("");
        updateDisplay();
    });

    //keep only the elements in array. helpful when deletions happen
    function updateDisplay() {
        $('#todoList').empty();
        createdTodos.forEach(addToList);
        // console.log(createdTodos);
    }

    //append to list items to ul that is there in html
    function addToList(item, index){
        $('#todoList').append('<li class="todoDone" id= "todoItem listitem'+index+'"'+
                              '<div class= "listContainer">'+
                                    '<div class= "listContainer firstListContainer form-check">'+
                                        '<input class="form-check-input" type="checkbox" name = "type" value="'+index+'" id="flexCheckDefault">'+
                                    '</div>'+

                                    '<div class= "listContainer secondListContainer">'+
                                        item+
                                    '</div>'+
                                    '<div class= "listContainer thirdListContainer">'+
                                        '<button type="button" class="btn btn-danger deleteButton" id = "todoItem delete'+index+'">Delete</button>'+
                                    '</div>'+
                              '</div>'+
                              '</li>');
    }
    
    //show delete on hover
    $(document).on('mouseenter', 'li', function () {
        $(this).find(".deleteButton").css("visibility", "visible");
    }).on('mouseleave','li',  function () {
        $(this).find(".deleteButton").css("visibility", "hidden");
    });


    //delete an item on click
    $('ul').on('click', '.deleteButton', function(){
        var deleteIndex = ((this.id)[15]);
        deleteAnItem(deleteIndex);
    });


    function deleteAnItem(index){
        createdTodos.splice(index, 1);
        updateDisplay();
    }

    //delete selected items only. along with confirmation to delete. 
    $('.deleteSelectedButton').on('click', function() {
        if(confirm("Are you sure you want to delete all selected ToDos?")){
            var selectedTodos = [];
            $("input:checkbox[name=type]:checked").each(function() {
                selectedTodos.push($(this).val());
            });
            deleteSelectedTodos(selectedTodos);
        }
        else{
            return false;
        }
    });

    //seperate function to delete items in array with index taken from buttons
    function deleteSelectedTodos(selectedArray){
        for (var i = selectedArray.length -1; i >= 0; i--){
            createdTodos.splice(selectedArray[i],1);
        };
        updateDisplay();
    }

    //delete all items. along with confirmation to delete
    $('.deleteAllButton').on('click', function() {
        if(confirm("Are you sure you want to delete ALL ToDos?")){
            deleteAllTodos();
        }
        else{
            return false;
        }
        
        
    });
    

    //seperate function to delete items all in array.
    function deleteAllTodos(){
        createdTodos = [];
        updateDisplay();
    }

    // make delete selected items, delete all visible only when list items are added.
    $(document).on('DOMSubtreeModified', '#todoList', function() {
        // Check if the ul element has li elements
        var hasLiItems = $(this).children('li').length > 0;
    
        // Now you can use the 'hasLiItems' variable as needed
        if (hasLiItems) {
        //   alert('The ul element has li elements.');
          $(".multidel").css("visibility", "visible");
        } else {
            $(".multidel").css("visibility", "hidden");
        }
      });

});

