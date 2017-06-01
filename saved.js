$(function(){
  savedFoods = window.localStorage.getItem("savedFoods");
  if(savedFoods == null){
    savedFoods =[
        {name:"Cheeseburger",gram:"30",portion:"1"},
        {name:"Spaghetti",gram:"40",portion:"1"}
      ];
  }
  savedFoods = JSON.parse(savedFoods);
  var numFoods = 0;

  $.each(savedFoods, function(key, value){
    var name = value.name;
    var gram = value.gram
    var item =
          '<li class=" list-group-item lf'+numFoods+'"><span id="'+name+'" class=close-list aria-hidden="true">&times;</span><div class="food" id="food'+numFoods+'">'+name +'</div>'+
          '<div class="gram-container">' +
          '<p class="gram" id="gram'+numFoods + '">'+gram+'g</p></div>'+
          '</div></li>';
          numFoods +=1;
          $(".well ul").append(item);
  });

  $(".close-list").click(function(){
            var name = $(this).attr('id');
            $(this).parent().remove();
            savedFoods = savedFoods.filter(function(el) {
                  return el.name !== name;
              });
  });

});
var selected = 0;

$(document).on('click','#save',function(){
    window.location = "index.html";
    window.localStorage.setItem("savedFoods", JSON.stringify(savedFoods));
});
$(document).on('click','#history',function(){
    window.location = "history/Chart.html"
    window.localStorage.setItem("savedFoods", JSON.stringify(savedFoods));
});

    // $('#save').click(function(){
    //
    //
    //   });

$(document).on('click','.back',function(){
  window.history.back();
});
$(document).on('click','.food-item',function(){
  console.log('click');
  console.log($(this).css('background-color'));
  if($(this).hasClass('selected')){
    console.log('tru');
    $(this).removeClass('selected');
    selected -= 1;
  } else {
    console.log('fal');
    $(this).addClass('selected');
    selected += 1;
  }

});

var addNewFood = function(text){
  console.log(text);
}

$(document).on('click','.addFood',function(){
  console.log()
  if (selected > 0){
    window.location = "index.html?add=" + encodeURIComponent(1);
  }
});
