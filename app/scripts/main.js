$(document).ready(function(){
  'use strict';
  $('a').smoothScroll({
  	speed: 1000
  });
});

$(".progress").each(function(){
	var pourcentConnu = $(this).find(".progress-bar").attr("aria-valuenow");
	var pourcentRestant = $(this).find(".progress-bar").attr("aria-valuemax") - pourcentConnu;
	var couleur = $(this).find(".progress-bar").css('background-color');
	var couleurFonds = $(this).parent().css('background-color');
	var newElem = $('<canvas></canvas>');
	$(this).replaceWith(newElem);


	var data = {
    labels: [],
    datasets: [
        {
            data: [pourcentConnu, pourcentRestant],
            backgroundColor: [
                couleur,
                couleurFonds
            ],
            hoverBackgroundColor: [
                couleur,
                couleurFonds
            ]
        }]
	};

	var myChart = new Chart(newElem,{
	    type:"doughnut",
	    data: data,
	    animation:{
	        animateScale:true
	    },
	    options:{
	    	tooltips: false
	    }
	});
});