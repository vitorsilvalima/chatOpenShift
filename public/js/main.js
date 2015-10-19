 // var socket = io();
var socket = io.connect('http://chatbeta-vapp1.rhcloud.com/');
var name="";
$("#lbl_incorreto").hide();
$("#message_div").hide();
$("#btn_login").click(function()
{
    name=$("#txt_name").val();
    if(name!=null && name.length !=0)
    {
        socket.emit('login',name);
        $("#login").hide();
         $("#message_div").show();
    }
    else
    {
        $("#lbl_incorreto").show();
    }
});


$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
$('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
