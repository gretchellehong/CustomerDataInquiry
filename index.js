/**
 * Created with CustomerDataInquiry.
 * User: gretchellehong
 * Date: 2014-03-25
 * Time: 07:27 AM
 * To change this template use Tools | Templates.
 */
head.js("bower_components/jquery/dist/jquery.min.js", //
    "bower_components/bootstrap/dist/js/bootstrap.min.js", //
    "bower_components/bootstrap/dist/css/bootstrap.css", //
    "bower_components/bootstrap/dist/css/bootstrap-theme.css", //
    "bower_components/rwm-phoenix/dist/phoenix.js"); //
var clearInput = function() {
    $("#InputUserID1").val("");
    $("#InputPassword1").val("");
}
var clearOutput = function() {
    $("#OutputUserName1").val("");
    $("#OutputPoints1").val("");
}
head.ready(function readyF() {
    $(".row").hide();
    $("#login").fadeIn();
    $("#submit").click(function() {
        if($("#InputUserID1").val().length === 0 && $("#InputUserID1").val().length != 10) {
            return;
        }
        if($("#InputPassword1").val().length === 0 && $("#InputPassword1").val().length != 6) {
            return;
        }
        var userid = $("#InputUserID1").val();
        var pin = $("#InputPassword1").val();
        phoenix.userId = 'debug'; //Do NOT store your API Key on a script.
        phoenix.apiKey = 'F7F7F40AAFE6A2C4C5E741E14983B386F1333F06';
        phoenix.send({
            cgrp: '$members',
            cmnd: 'login',
            prms: {
                'cid': userid,
                'pin': pin,
            }
        }, function callbackF(data) {
            //alert(data
            var d = JSON.parse(data);
            if(d.exitCode === 0) alert(JSON.stringify(d.response['error']));
            else {
                $("#OutputUserName1").val(d.response['cnm']);
                $("#OutputPoints1").val(d.response['VisBal']);
                $("#login").hide();
                $("#info").fadeIn();
            }
            //alert(JSON.stringify(d, undefined, 2));
            //alert(JSON.stringify(d.response['cid']));
            //alert(JSON.stringify(d.response['cti']));
            //alert(JSON.stringify(d.response['cnm']));
            //alert(JSON.stringify(d.response['ctc']));
            //alert(JSON.stringify(d.response['ctd']));
            //alert(JSON.stringify(d.response['VisBal']));
            //alert(JSON.stringify(d.response['HidBal']));
            //alert(JSON.stringify(d.response['LptBal']));
            //alert(JSON.stringify(d.response['NecBal']));
            //alert(JSON.stringify(d.response['CecBal']));
        });
    });
    $("#back").click(function() {
        clearInput();
        clearOutput();
        $("#info").hide();
        $("#login").fadeIn();
    })
});