var CashierPage = {
    'Init': function (value) {
        CashierPage.RenderCashierForm(value);
    },
    'RenderCashierForm': function (value) {
        var url = "/sportsbook/Member/ValidIfShowQuickDeposit?section=" + value;
        $.getJSON(url, function (data) {
            if (data.showQuick) {
                showQuick(data);

            } else {
                if (data.isCountryBlocked) {
                    value = 'm';
                }
                switch (value) {
                    case 'd':
                        window.location.href = '/deposit/DepositCashier';
                        break;
                    case 'f':
                        window.location.href = '/deposit/DepositFunds';
                        break;
                    case 'm':
                        window.location.href = '/deposit/cashiermenu';
                        break;
                }
            }
        });
    }
}

function ModalForm() {
    ModalPopups.Custom("quickDepositCashierForm",
            "QUICK DEPOSIT",
            $('#quickdepositform').html(),
            {
                width: 425,
                height: 500,
                buttons: "cancel",
                //okButtonText: "Save",
                cancelButtonText: "Cancel",
                //onOk: "Join()",
                onCancel: "Cancel()"
            }
        );
}

function Cancel() {
    $('#quickdepositform').html("");
    ModalPopups.Cancel("quickDepositCashierForm");
}

function showQuick(data) {
    var h = $(document).height();
    var modalBackground = document.getElementById("quickDepositCashierForm_background");
    if (modalBackground == null) {
        $("body").append('<div id="quickDepositCashierForm_background" style="display: inline; position: absolute; z-index: 10003; left: 0px; top: 0px; width: 100%; opacity: 0.7; background-color: rgb(204, 204, 204);"></div>');
    }

    $("#quickDepositCashierForm_background").css("height", h);

    var modal = getModal();
    modal.addClass("simple-modal-dialogframe");

    var container = document.getElementById("modal");
    var form = document.createElement('form');
    form.setAttribute("id", "quickcashier-form");
    form.setAttribute("method", "post");
    form.setAttribute("action", data.Url);
    form.setAttribute("target", "quickcashierFrame");
    container.appendChild(form);

    //Added Iframe to modal-content 
    $('.modal-content').append('<iframe id="quickcashierFrame" name="quickcashierFrame" scrolling="no" frameborder="0" style="overflow: hidden; height: 100%; width: 100%; display:block;" height="100%" width="100%"></iframe>');

    var cashier_container = document.createElement('div');
    cashier_container.setAttribute("id", "cashier-form-container");
    cashier_container.setAttribute("name", "cashier-form-container");
    form.appendChild(cashier_container);

    var id = document.createElement('input');
    id.setAttribute("id", "ID");
    id.setAttribute("name", "ID");
    id.setAttribute("value", data.ID);
    id.setAttribute("type", "hidden");
    cashier_container.appendChild(id);

    var bp = document.createElement('input');
    bp.setAttribute("id", "bp");
    bp.setAttribute("name", "bp");
    bp.setAttribute("value", data.IsBanPay);
    bp.setAttribute("type", "hidden");
    cashier_container.appendChild(bp);

    var tid = document.createElement('input');
    tid.setAttribute("id", "tid");
    tid.setAttribute("name", "tid");
    tid.setAttribute("value", data.TID);
    tid.setAttribute("type", "hidden");
    cashier_container.appendChild(tid);

    var quickName = "QUICKDEPOSIT";
    var Actionid = document.createElement('input');
    Actionid.setAttribute("id", "Action");
    Actionid.setAttribute("name", "Action");
    Actionid.setAttribute("value", quickName);
    Actionid.setAttribute("type", "hidden");
    cashier_container.appendChild(Actionid);

    modal.modal("show");

    $("#quickcashier-form").submit();

    var modal_container = document.getElementById("simplemodal-container");
    modal_container.removeAttribute("style");
    modal_container.style["width"] = "425px";
    modal_container.style["height"] = "620px";
    modal_container.style["top"] = "125px";
    modal_container.style["left"] = "650px";
    modal_container.style["position"] = "fixed";
    modal_container.style["padding"] = "0px";
    modal_container.style["z-index"] = "10004";
    modal_container.style["border"] = "none";

    var modal_close = document.getElementById("simplemodal-container").children[0];
    modal_close.className = "simple-close-button-new";
    modal_close.onclick = function () { var modalBackground = document.getElementById("quickDepositCashierForm_background"); if (modalBackground != null) { modalBackground.remove(); }; var modal = $(".modal"); if (modal.length) { modal.find(".modal-content").empty(); } };

    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    $("#simplemodal-container").css("left", ($(document).width() / 2) - ($("#simplemodal-container").width() / 2) + "px");

    // Listen to message from child window  
    eventer(messageEvent, function (e) {
        if (e.origin.indexOf(GLOBAL_VARIABLES.CashierIframeUrl) > 0) {
            $('#simplemodal-container').css('height', "620px");
            $(".simple-close-button-new").show();
            if (e.data > 629) {
                $('#modal').css('height', e.data);
            } else if (typeof e.data.G2C === "boolean") {
                if (e.data.G2C === true) {
                    $("#chatliveimg .LPMcontainer").click();
                }
            }
            else if (typeof e.data.G2C === "boolean") {
                if (e.data.G2C === true) {
                    $("#chatliveimg .LPMcontainer").click();
                }
            }

            if (e.data.SetTop === true) {
                $('.simplemodal-wrap').scrollTop(0);
            }

            if (e.data.closeCashier === true) {
                $(".simple-close-button-new").click();
            }
        }

    }, false);

}

//Implementation for quick deposit new style

function getModal() {
    var modal = $(".modal");
    if (modal.length) {
        // reset contents
        modal.find(".modal-content").empty();
        return modal;
    }
    var modal = $(
        '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding: 0px;">\
			<div class="modal-dialog" role="document">\
				<div id="modal" class="modal-content" style="height: 620px;">\
				</div>\
			</div>\
		</div>'
    );

    modal.appendTo($("body"));

    return modal;
}