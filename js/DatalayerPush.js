var dataLayerCaller = {
    'Init': function () {
    
    if (window.CUSTOMERID) {
    var value = localStorage.getItem('dataLayer.sendflag');
    window.dataLayer = window.dataLayer || [];
    if (value == 0 || value == null) {
    window.dataLayer.push({ 'event': 'ga.event', 'userId': window.CUSTOMERID });
    localStorage.setItem('dataLayer.sendflag', "1");
    }
    }
    else { localStorage.setItem('dataLayer.sendflag', "0"); }
    }
    }
    dataLayerCaller.Init();