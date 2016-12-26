$.ajaxSetup({ cache: false });

var app = window.app || {};
app.viewInboxEmail = app.viewInboxEmail || {};
app.data = app.data || {};

app.viewInboxEmail.initialize = function(){
	$(function() {
		init();
	});

	function init(){
	    bindEvents();
	}
	
	function bindEvents(){
	    var selectors = getPageSelectors();
	    showEmail();
	    initModalEvents();
	}
	
	function getPageSelectors(){
	    return {
	        inbox: $("#inbox"),
	        inboxEmail: $(".list-group-item"),
	        modal: $(".view-inbox-email-modal")
	    };
	}
	
	function showEmail(){
	    var selectors = getPageSelectors();
	   
	   selectors.inbox.on("click", ".list-group-item .subject", function(){
	       selectors.modal.modal("show");
	       
	       var messageId = $(this).parents(".list-group-item").data("message-id");
	       
	       var headers = {};
	        headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	        var data = {
	            "message_id": messageId
	        };
	        
	        $.ajax({
		    	type: config.api.endpoints.email.method,
                url: config.api.endpoints.email.url,
                headers: headers,
                data: data,
                dataType: 'json',
                beforeSend: function(){
                    
                },
                success: function(resp){    console.log(resp);
                	if(resp.status == true){
                		selectors.modal.find(".modal-header .from").html("From: " + resp.data.author.email);
                		selectors.modal.find(".modal-header .subject").html("Subject: " + resp.data.subject);
                		selectors.modal.find(".modal-body .body").html(resp.data.body);
                	}
                	else if(resp.status == false){
                		toastr.error(resp.msg)
                	}
                },
                error: function(){
    
		    	},
		    	complete: function(){
                    
		    	}
            });
	   });
	}
	
	function initModalEvents(){
	    var selectors = getPageSelectors();
	    selectors.modal.on("show.bs.modal", clearModalFields);
	}
	
	function clearModalFields(){
	    var selectors = getPageSelectors();
	    selectors.modal.find(".modal-header .from").html("");
        selectors.modal.find(".modal-header .subject").html("");
        selectors.modal.find(".modal-body .body").html("Loading...");
	}
}