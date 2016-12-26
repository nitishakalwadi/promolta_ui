$.ajaxSetup({ cache: false });

var app = window.app || {};
app.logout = app.logout || {};
app.data = app.data || {};

app.logout.initialize = function(){
	$(function() {
		init();
	});

	function init(){
	    bindEvents();
	}
	
	function bindEvents(){
	    var selectors = getPageSelectors();
	    selectors.logoutBtn.on("click", logout);
	}
	
	function logout(){
	    var selectors = getPageSelectors();
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    var data = {};
	    $.ajax({
			type: config.api.endpoints.logout.method,
            url: config.api.endpoints.logout.url,
            data: data,
            headers: headers,
            dataType: 'json',
            beforeSend: function(){
                selectors.logoutBtn.attr("disabled", true);
            },
            success: function(resp){
            	if(resp.status == true){
            		Cookies.remove(config.api.apiKey.name);
            		toastr.success(config.messages.logoutSuccess)
            		window.location.href = '/';
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg);
            	}
            },
            error: function(){

			},
			complete: function(){
                selectors.logoutBtn.removeAttr("disabled");
			}
        });
	}
	
	function getPageSelectors(){
	    return {
	        logoutBtn: $(".btn-logout")
	    };
	}
}