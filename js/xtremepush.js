var XtremePush = {
    'Init': function () {
     
	 if($("#visitorInfoLP-customerID").length > 0)
	 {		 
	    var customerID = $("#visitorInfoLP-customerID").html().toUpperCase().trim();
		var value = localStorage.getItem('xtremepush.sendflag')
		
		if(value == 0 || value == null)
		{
			XtremePush.SetCustomerID(customerID);
			localStorage.setItem('xtremepush.sendflag', "1");
		}		 
	 }
	 else 
	 {
		localStorage.setItem('xtremepush.sendflag', "0");			
	 }
    },
	
	'SetCustomerID': function(customerID){	
		try
		{ 		
			if(xtremepush)
			{				
			   xtremepush('set', 'user_id', customerID);	
			}		
		}
		catch(err)
		{
			setTimeout(function(){ 
			 if($("#visitorInfoLP-customerID").length > 0)
			 {		
				var customerID = $("#visitorInfoLP-customerID").html().toUpperCase().trim();
				xtremepush('set', 'user_id', customerID);
			 }			 
			}, 3000);
		}
	}
}
XtremePush.Init();