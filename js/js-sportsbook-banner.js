/*01/31/2025 V1*/ 

$(function() {

    if ($("#loginform").length > 0) {

        $("#right").append("<div id='BetSlipImage' class='joinFromBetSlip'></div>");

        var img0 = "<a class='imgLink0' href='/join'><img class='effects' src='https://cdn-cms.betonline.ag/img/c_BOL_Sportsbook_Top_Rotator_Out_470x90_W01_98485_NBA_3d9a103b05.jpg' alt='#htmlcaption1' /></a>";
        
        var img1 = "<a class='imgLink2' href='/join'><img class='effects' src='https://ui.betonline.ag/images/2024/WK25/cBOL_Sportsbook_Top_Rotator_Out_470x90_WK4_99470_50kSB.jpg' alt='#htmlcaption1' /></a>";

        var img2 = "<a class='imgLink2' href='/join'><img class='effects' src='https://cdn-cms.betonline.ag/img/c_BOL_Sportsbook_Top_Rotator_Out_470x90_99833_SBLIX_RAF_44c3e4230d.jpg' alt='#htmlcaption1' /></a>";

        var img3 = "<a class='imgLink2' href='/join'><img class='effects' src='https://ui.betonline.ag/amber/img/2021/WK51/BOL_Sportsbook_TopRotator_Out_470x90_WK49_28324_CasinoS.jpg' alt='#htmlcaption1' /></a>";
        
        var res =  img0 + img1 + img2 + img3;

        $("#slider").html(res);

    } else {

        var img0 = "<a class='imgLink0' href='https://classic.betonline.ag/sportsbook/hockey/nhl'><img class='effects' src='https://cdn-cms.betonline.ag/img/c_BOL_Sportsbook_Top_Rotator_IN_600x90_W1_98145_NHL_711bedc5ac.jpg' alt='#htmlcaption1' /></a>";
        
        var img1 = "<a class='imgLink1' href='https://betonline.ag/vip-rewards#telegram'><img class='effects' src='https://cdn-cms.betonline.ag/img/c_BOL_Sportsbook_Top_Rotator_IN_600x90_W12_81041_VIPR_c5ab729e17.jpg' alt='#htmlcaption1' /></a>";
        
        var img2 = "<a class='imgLink2' href='/referafriend'><img class='effects' src='https://cdn-cms.betonline.ag/img/c_BOL_Sportsbook_Top_Rotator_IN_470x90_99833_SBLIX_RAF_510ebd7493.jpg' alt='#htmlcaption1' /></a>";

        var res =  img0 + img1 + img2;

        $("#sliderFrame").append('<!-- /Scripts/bol/js-sportsbook-banner.js start --><div id="slider">' + res + "</div>");

    }
    
}); // JavaScript Document 2.0.