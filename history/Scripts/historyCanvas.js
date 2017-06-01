

var plot_graph = function(){

var breakfast_data = JSON.parse(localStorage.getItem('breakfast'));
var lunch_data = JSON.parse(localStorage.getItem('lunch'));
var dinner_data = JSON.parse(localStorage.getItem('dinner'));

var dataset = [];
var color_order = [];
if($('#breakfast-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Breakfast", data: breakfast_data });
  color_order.push("#e74c3c");
}
if($('#lunch-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Lunch", data: lunch_data });
  color_order.push("#3498db");
}
if($('#dinner-tog-button').hasClass('tog-active'))
{
  dataset.push({ label: "Dinner", data: dinner_data});
  color_order.push("#2ecc71");
}


var options = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 10
                },
                points: {
                    radius: 9,
                    fill: true,
                    show: true
                }
            },
            xaxis: {
                mode: "time",
                tickSize: [1, "day"],
                tickLength: 0,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
            },
            yaxis: {
            },
            legend: {
              show: false
            },
            grid: {
                hoverable: true,
                borderWidth:0
            },
            colors: color_order
        };

        $.plot($("#flot-placeholder"), dataset, options);
}


var clickedItems = [];

$(document).ready(function () {
    plot_graph();
});

$(document).on('click','.toggle-button',function(){
      if($(this).hasClass('tog-active')){
        $(this).removeClass('tog-active');
      } else {
        $(this).addClass('tog-active');
      }
      plot_graph();
  });

  $(document).on('click','#save',function(){
      window.location = "../index.html";

  });

  $(document).on('click','#add-item',function(){
      window.location = "../saved.html";

  });
    // $(document).on('click','#save',function(){
    //     window.location = "index.html";
    //
    // });

  $(document).bind("plotclick", function(event, pos, item) {

    if (item) {
        if (item.dataIndex < 2) { // if first or second point

            // add extra data to item
            item.alternateText = (item.dataIndex == 0) ?'hello':'bye';

            //cache clicked point's item object in array at correct index
            clickedItems[ item.dataIndex ] = item;

            //remove the current tooltip
            $("#tooltip").remove();
            //display new tooltip with the alternate text
            showTooltip(item.pageX, item.pageY, item.alternateText);
        }
      }
  });


  var showTooltip = function(x, y, contents) {

    if (x < $(document).width()/2){
          $('<div id="tooltip">' + contents + '</div>').css({
              position: 'absolute',
              display: 'none',
              top: y + 5,
              left: x + 5,
              border: '1px solid #fdd',
              padding: '2px',
              'background-color': 'black',
              color: '#fff',
              opacity: 0.80
          }).appendTo("body").fadeIn(200);
    }
    else{
      $('<div id="tooltip">' + contents + '</div>').css({
              position: 'absolute',
              display: 'none',
              top: y - 20,
              left: x - 200,
              border: '1px solid #fdd',
              padding: '2px',
              'background-color': 'black',
              color: '#fff',
              opacity: 0.80
          }).appendTo("body").fadeIn(200);
    }

  }

  var previousPoint = null;

  $(document).bind("plothover", function(event, pos, item) {
    $("#x").text(pos.x.toFixed(2));
    $("#y").text(pos.y.toFixed(2));

    if (item) {
      if (previousPoint != item.datapoint) {
        previousPoint = item.datapoint;

        $("#tooltip").remove();



        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2),
            //set default content for tooltip
            content = "Date: " + getDate(-x) + "\n" + "Blood Sugar: " +  y;

        // if there is a cached item object at this index use it instead
        if(clickedItems[item.dataIndex])
            content = clickedItems[item.dataIndex].alternateText;
        //now show tooltip
        showTooltip(item.pageX, item.pageY, content);
     }
    }
    else {
     $("#tooltip").remove();
     previousPoint = null;
  }

});

 var getDates = function(){
    var dates = [];
    for (var i = 0; i < 15; i++){
        dates[i] = getDate(i);
    }

    return dates;
};

var getDate = function(index){
    var today = new Date();
    today.setDate(today.getDate() - 7 - index);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

        today = mm+'/'+dd
    return today;
};
