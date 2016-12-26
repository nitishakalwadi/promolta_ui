$.ajaxSetup({ cache: false });

var app = window.app || {};
app.login = app.login || {};
app.data = app.data || {};

app.login.initialize = function(){
	$(function() {
		init();
	});

	function init(){
	    bindEvents();
	}
	
	function bindEvents(){
	    var selectors = getPageSelectors();
	    selectors.loginBtn.on("click", login);
	}
	
	function login(){
	    var selectors = getPageSelectors();
	    var data = {
	        "email":    selectors.emailField.val(),
	        "password": selectors.passwordField.val()
	    };
	    $.ajax({
			type: config.api.endpoints.login.method,
            url: config.api.endpoints.login.url,
            data: data,
            dataType: 'json',
            beforeSend: function(){
                selectors.loginBtn.attr("disabled", true);
            },
            success: function(resp){console.log(resp);
            	if(resp.status == true){
            		Cookies.set(config.api.apiKey.name, resp[config.api.apiKey.name], { expires: new Date( resp.valid_till * 1000 ) });
            		toastr.success(config.messages.loginSuccess);
            		window.location.href = '/mailer';
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg)
            	}
            },
            error: function(){

			},
			complete: function(){
                selectors.loginBtn.removeAttr("disabled");
			}
        });
	}
	
	function getPageSelectors(){
	    return {
	        loginBtn: $(".btn-login"),
	        emailField: $(".email-field"),
	        passwordField: $(".password-field")
	    };
	}
}