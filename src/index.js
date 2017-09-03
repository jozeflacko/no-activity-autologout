var timer = {};

$(document).ready(function() {
 
 	timer = (function(){  		

    	var messageLoc = '#message';
      var timeLoc = '#time';
      var loginLoc = '#login';
      var logoutLoc = '#logout';
    
    	var maxSecondToVaid = 10;
    	var ACTIVE_CLASS = 'active';
      var secondsToLogOut = null;
      var refreshIntervalId = null;
      var myEvent = "click.myClick";

      function _startCounter(){

				// stop old counter
        _stopCounter();
        
        // add new counter
        $(messageLoc).addClass(ACTIVE_CLASS); // show message
        $(loginLoc).hide();
        $(logoutLoc).show();
        secondsToLogOut = maxSecondToVaid;   
        _refreshMessage();
        refreshIntervalId = setInterval(_refreshMessage, 100);
        _installResetTimeOnActivity();
      }
      function _stopCounter(){
				
        if( refreshIntervalId != null ){
        	alert('YOU ARE LOGGED OUT!');
        	clearInterval(refreshIntervalId);          
        }   
        
        secondsToLogOut = null;
        $(messageLoc).removeClass(ACTIVE_CLASS);
        $(timeLoc).html('');
        refreshIntervalId = null;
        secondsToLogOut = null;
        _destroyResetTimeOnActivity();
        $(loginLoc).show();
        $(logoutLoc).hide();
           
        
           
      }
      
      function _resetTimer(){
      	secondsToLogOut = maxSecondToVaid;
        $(timeLoc).html(secondsToLogOut);  
      }
      
      function _installResetTimeOnActivity(){      
      	$('body').off(myEvent).on(myEvent, function(event){
        	var isLoginLogOutButton = $(event.target).hasClass('doNotIncludeIntoReset');
        	if( isLoginLogOutButton == false)
          	_resetTimer();
        });
      }
      
      function _destroyResetTimeOnActivity(){
      	$('body').off(myEvent);
      }
      
      function _refreshMessage(){
      
      	if(secondsToLogOut === null)
        	return;
        
        if(secondsToLogOut != null && secondsToLogOut < 0){
        	_stopCounter();
        } else {
        	$(timeLoc).html(secondsToLogOut);  
          secondsToLogOut = secondsToLogOut - 0.1;  
          secondsToLogOut = secondsToLogOut.toFixed(1); // rounding to 1 decimal
        }       
      }
      
      return {
      	startCounter : _startCounter,
        stopCounter : _stopCounter
      }
  })();
 
 	$('#login').click(function(){
    timer.startCounter();
  });
  
  $('#logout').click(function(){  
    timer.stopCounter();   
  });
 
 
 
 
 
 
});
