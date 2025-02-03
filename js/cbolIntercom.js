var cbolIntercom = {
    'CreateCookie': function () {
        var cookieName = "WEBSITES-intercom-switch";
        var expires;

        var date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();

        document.cookie = cookieName + "=" + "true" + expires + "; path=/;";
    },

    'ReadCookie': function (cookieName = "WEBSITES-intercom-switch") {
        var theCookie = " " + document.cookie;
        var ind = theCookie.indexOf(" " + cookieName + "=");
        if (ind == -1) ind = theCookie.indexOf(";" + cookieName + "=");
        if (ind == -1 || cookieName == "") return "";
        var ind1 = theCookie.indexOf(";", ind + 1);
        if (ind1 == -1) ind1 = theCookie.length;
        return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
    },

    'IsActive': function () {
        return true;
    },

    'Boot': async function (customerId = "", name = "", email = "") {
        if (typeof window.Intercom == "function" && cbolIntercom.IsActive()) {
            cbolIntercom.CreateCookie();
            var intercomConfig = {
                api_base: GLOBAL_VARIABLES.INTERCOM_API_BASE,
                app_id: GLOBAL_VARIABLES.INTERCOM_APP_ID,
                brand: "betonline",
            }
            if (customerId == "") {
                window.Intercom("boot", intercomConfig);
            } else {
                customerId = customerId.toUpperCase();
                intercomConfig = {
                    ...intercomConfig,
                    external_id: customerId,
                    user_id: customerId,
                    name: name,
                    email: email,
                }

                hmacKey = "intercom_" + customerId + "_hmac";
                let hmac = cbolIntercom.ReadCookie(hmacKey);
                if (hmac) {
                    intercomConfig = {
                        ...intercomConfig,
                        user_hash: hmac,
                    }
                }

                let vipSegment = "TIER 0";
                const bootIntercom = function (vipSegment) {
                    window.Intercom("boot", {
                        ...intercomConfig,
                        vipTier: vipSegment
                    });
                };

                $.ajax({
                    url: document.location.origin + '/Home/GetCustomerVIP?CustomerId=' + customerId,
                    type: 'GET',
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data?.segmentName) {
                            vipSegment = data?.segmentName;
                        };

                        bootIntercom(vipSegment);
                    },
                    error: function () {
                        bootIntercom(vipSegment);
                    }
                });
            }
        }
    },

    'Shutdown': function () {
        if (typeof window.Intercom == "function" && cbolIntercom.IsActive()) {
            window.Intercom('shutdown');
        }
    },
};