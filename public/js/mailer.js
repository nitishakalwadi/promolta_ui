$.ajaxSetup({ cache: false });

var app = window.app || {};
app.mailer = app.mailer || {};
app.data = app.data || {};

app.mailer.initialize = function(){
	$(function() {
		init();
	});

	function init(){
	    initData();
	    bindEvents();
	}
	
	function initData(){
	    initEmailData();
	}
	
	function bindEvents(){
	    bindEmailFwd();
	}
	
	function getPageSelectors(){
	    return {
	        inboxBtn:       $(".left-panel .btn-inbox"),
	        sentBtn:        $(".left-panel .btn-sent"),
	        draftsBtn:      $(".left-panel .btn-draft"),
	        trashBtn:       $(".left-panel .btn-trash"),
	        inboxContent:   $(".right-panel .tab-content #inbox"),
	        sentContent:    $(".right-panel .tab-content #sent"),
	        draftContent:   $(".right-panel .tab-content #draft"),
	        trashContent:   $(".right-panel .tab-content #trash")
	    };
	}
	
	function bindEmailFwd(){
		$(".fwd-email-modal").on("show.bs.modal", clearFwdModalFields);
		$(".app").on("click", ".btn-fwd", openFwdEmailModal);
		$(".fwd-email-modal .attachments-wrapper").on("click", ".remove-attachment", removeAttachment);
	    $(".fwd-email-modal .attachments-wrapper").on("click", ".added-attachment", downloadAttachment);
	    
	    var selectors = getPageSelectors();
	    $(".fwd-email-modal .btn-send").on("click", fwdEmail);
	    $(".fwd-email-modal .btn-save-draft").on("click", saveDraftEmail);
	    $(".fwd-email-modal .btn-attachment").on("click", addAttachmentMarkup);
	    $(".fwd-email-modal .attachments-wrapper").on("change", ".attachment", uploadAttachment);
	    $(".fwd-email-modal .attachments-wrapper").on("click", ".remove-attachment", removeAttachment);
	    $(".fwd-email-modal .attachments-wrapper").on("click", ".added-attachment", downloadAttachment);
	    
	    $(".reply-email-modal .btn-send").on("click", replyEmail);
	    $(".reply-email-modal .btn-save-draft").on("click", saveDraftEmail);
	    $(".reply-email-modal .btn-attachment").on("click", addReplyAttachmentMarkup);
	    $(".reply-email-modal .attachments-wrapper").on("change", ".attachment", uploadAttachment);
	    $(".reply-email-modal .attachments-wrapper").on("click", ".remove-attachment", removeAttachment);
	    $(".reply-email-modal .attachments-wrapper").on("click", ".added-attachment", downloadAttachment);
	    
	    $(".app").on("click", ".btn-reply", openReplyEmailModal);
	    $(".app").on("click", ".btn-email-trash", trashEmail);
	}
	
	function addAttachmentMarkup(){
		var markup = "";
		markup += "<div class='form-group'>";
		markup += "<div class='input-group'>";
        markup += "<input type='file' class='form-control attachment' name='attachment[]' aria-describedby='attachment'>";
        markup += "</div>";
        markup += "</div>";
		
		$(".fwd-email-modal .attachments-wrapper").append(markup);
	}
	
	function addReplyAttachmentMarkup(){
		var markup = "";
		markup += "<div class='form-group'>";
		markup += "<div class='input-group'>";
        markup += "<input type='file' class='form-control attachment' name='attachment[]' aria-describedby='attachment'>";
        markup += "</div>";
        markup += "</div>";
		
		$(".reply-email-modal .attachments-wrapper").append(markup);
	}
	
	function saveDraftEmail(){
		
	}
	
	function uploadAttachment(){
		// alert( $(this).attr("class") );
		var selectors = getPageSelectors();
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    
		var $elem = $(this);
		
		var formData = new FormData();
	    formData.append('attachment', this.files[0]);
	    
	    $.ajax({
			type: config.api.endpoints.uploadAttachment.method,
            url: config.api.endpoints.uploadAttachment.url,
            data: formData,
            headers: headers,
            contentType: false,
    		processData: false,
            dataType: 'json',
            beforeSend: function(){
                
            },
            success: function(resp){
            	if(resp.status == true){
            		var markup = "";
            		markup += "<div class='added-attachment' data-attachment-id='"+resp.data.attachment_id+"'>";
            		markup += "<span class='attachment-name'><a>"+resp.data.attachment_name+"</a></span>";
            		markup += "<span class='remove-attachment'>&nbsp;X</span>";
            		markup += "</div>";
            	    $elem.parents(".input-group").html(markup);
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg);
            	}
            },
            error: function(){

			},
			complete: function(){
                
			}
        });
	}
	
	function fwdEmail(){
	    var selectors = getPageSelectors();
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    
	    var attachmentIds = [];
	    $(".fwd-email-modal .added-attachment").each(function(index){
	    	var attachmentId = $(this).data("attachment-id");
	    	attachmentIds.push(attachmentId)
	    });
	    
	    var data = {
	        to: $(".fwd-email-modal .to-field").val(),
	        subject: $(".fwd-email-modal .subject-field").val(),
	        body: $(".fwd-email-modal .body-field").val(),
	        attachmentIds: attachmentIds,
	        threadId: $(".fwd-email-modal .thread-id").val()
	    };
	    
	    $.ajax({
			type: config.api.endpoints.fwdEmail.method,
            url: config.api.endpoints.fwdEmail.url,
            data: data,
            headers: headers,
            dataType: 'json',
            beforeSend: function(){
                
            },
            success: function(resp){
            	if(resp.status == true){
            	    toastr.success(config.messages.emailSendSuccess);
            		$(".fwd-email-modal").modal("hide");
            		initEmailData();
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg);
            	}
            },
            error: function(){

			},
			complete: function(){
                
			}
        });
	}
	
	function openReplyEmailModal(){
		var messageId = $(this).parents(".thread").find(".message:last").data("message-id");
		var $modal = $(".reply-email-modal");
		$modal.find(".message-id").val(messageId);
		$modal.modal("show");
	}
	
	function replyEmail(){
		var selectors = getPageSelectors();
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    
	    var attachmentIds = [];
	    $(".reply-email-modal .added-attachment").each(function(index){
	    	var attachmentId = $(this).data("attachment-id");
	    	attachmentIds.push(attachmentId)
	    });
	    
	    var data = {
	        body: $(".reply-email-modal .body-field").val(),
	        attachmentIds: attachmentIds,
	        messageId: $(".reply-email-modal .message-id").val()
	    };
	    
	    $.ajax({
			type: config.api.endpoints.replyEmail.method,
            url: config.api.endpoints.replyEmail.url,
            data: data,
            headers: headers,
            dataType: 'json',
            beforeSend: function(){
                
            },
            success: function(resp){
            	if(resp.status == true){
            	    toastr.success(config.messages.emailSendSuccess);
            		$(".reply-email-modal").modal("hide");
            		initEmailData();
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg);
            	}
            },
            error: function(){

			},
			complete: function(){
                
			}
        });
	}
	
	function trashEmail(){
		var threadId = $(this).parents(".thread").data("thread-id");
		var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    
	    var data = {
	    	threadId: threadId
	    };
	    
		$.ajax({
			type: config.api.endpoints.trash.method,
            url: config.api.endpoints.trash.url,
            headers: headers,
            data: data,
            dataType: 'json',
            beforeSend: function(){
                
            },
            success: function(resp){    //console.log(resp);
            	if(resp.status == true){
            		toastr.success(config.messages.trashSuccess);
            		initEmailData();
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
	}
	
	function downloadAttachment(){
		var attachmentId = $(this).data("attachment-id");
		var url = "http:" + config.api.endpoints.downloadAttachment.url + "?attachmentId="+attachmentId;
		window.open(url);
	}
	
	function removeAttachment(e){
		$(this).parents(".added-attachment").remove();
		e.stopPropagation();
	}
	
	function openFwdEmailModal(){
		var threadId = $(this).parents(".thread").data("thread-id");
		
		var $modal = $(".fwd-email-modal");
		$modal.modal("show");
		
		var messageId = $(this).parents(".message").data("message-id");
		
		$modal.find(".modal-body .thread-id").val(threadId);
		
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
            success: function(resp){    //console.log(resp);
            	if(resp.status == true){
            		$modal.find(".modal-body .subject-field").val(resp.data.subject);
            		$modal.find(".modal-body .body-field").val("Forwaded message \n\n" + resp.data.body);
            		$modal.find(".modal-body .attachments-wrapper").html(getAttachmentMarkup(resp.data.attachment));
            		$modal.find(".modal-body .message-id").val(resp.data.message_id);
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
	}
	
	function clearFwdModalFields(){
		var $modal = $(".fwd-email-modal");
		$modal.find(".modal-header .from").html("");
        $modal.find(".modal-header .subject-field").html("");
        $modal.find(".modal-body .body-field").html("");
        $modal.find(".modal-body .attachments-wrapper").html("");
	}
	
	function getAttachmentMarkup(attachments){
		var markup = "";
		for(i in attachments){
			var attachmentData = attachments[i];
			var attachment = getAttachment(attachmentData.attachment_id);
			markup += "<div class='added-attachment' data-attachment-id='"+attachment.attachment_id+"'>";
			markup += "<span class='attachment-name'><a>"+attachment.actual_file_name+"</a></span>";
			markup += "<span class='remove-attachment'>&nbsp;X</span>";
			markup += "</div>";
		}
		
		return markup;
	}
	
	function initEmailData(){
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    var data = {};
	    
	    $.ajax({
			type: config.api.endpoints.allEmail.method,
            url: config.api.endpoints.allEmail.url,
            headers: headers,
            data: data,
            dataType: 'json',
            beforeSend: function(){
                
            },
            success: function(resp){    //console.log(resp);
            	if(resp.status == true){
            		app.data = resp;
            		fillEmailPage(resp);
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
        
        $('.fwd-email-modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var modal = $(this)
            // modal.find('.modal-title').text('New message to ' + recipient)
            // modal.find('.modal-body input').val(recipient)
        });
	}
	
	function fillEmailPage(data){
	    var selectors = getPageSelectors();
	    var inboxListing = getListing("inbox");
	    var sentListing = getListing("sent");
	    var draftListing = getListing("draft");
	    var trashListing = getListing("trash");
	    
	    
		selectors.inboxContent.html(inboxListing);
		selectors.sentContent.html(sentListing);
		selectors.draftContent.html(draftListing);
		selectors.trashContent.html(trashListing);
	}
	
	function getListing(placeholderCode){
		// console.log(app.data);
		var markup = "";
		for(i in app.data.threads){
			var thread = app.data.threads[i];
			// console.log(thread);
			var placeholder = getPlaceholder(thread.placeholder_id);
			if(placeholder.code != placeholderCode){
				continue;
			}
			markup += "<div class='thread' data-thread-id='"+thread.thread_id+"'>";
			
			markup += "<div class='panel panel-default'>";
			markup += "<div class='panel-body'>";
			
			var first = "first";
			for(j in thread.thread_message_map){
				var thread_message_map = thread.thread_message_map[j];
				var message = getMessage(thread_message_map.message_id);
				console.log(message);
				
				markup += "<div class='message "+first+"' data-message-id='"+message.message_id+"'>";
				markup += "<div class='display-title'>";
				markup += "<span>" + message.author.email + "</span>";
				markup += "<span>" + message.subject + "</span>";
				markup += "<span class='btn-fwd pull-right'><a>fwd</a></span>";
				markup += "</div>";
				markup += "<div display-body>";
				markup += message.body;
				markup += "</div>";
				markup += "<div display-attachment>";
				for(k in message.attachment){
					var attachmentData = message.attachment[k];
					var attachment = getAttachment(attachmentData.attachment_id);
					markup += "<div class='display-single-attachment' data-attachment-id='"+attachment.attachment_id+"'>";
					markup += attachment.actual_file_name;
					markup += "</div>";
				}
				markup += "</div>";
				markup += "</div>";
				
				markup += "<hr>";
				
				first = "";
			}
			
			markup += "<div class='thread-btns'>";
			markup += "<span class='btn-reply'><a>reply</a></span>";
			markup += "<span class='btn-email-trash'><a>trash</a></span>";
			markup += "</div>";
			
			markup += "</div>";
			markup += "</div>";
			
			markup += "</div>";
		}
		
		return markup;
	}
	
	function getPlaceholder(placeholderId){
		for(i in app.data.placeholders){
			var placeholder = app.data.placeholders[i];
			if(placeholder.placeholder_id == placeholderId){
				return placeholder;
			}
		}
	}
	
	function getMessage(messageId){
		for(i in app.data.messages){
			var message = app.data.messages[i];
			if(message.message_id == messageId){
				return message;
			}
		}
	}
	
	function getAttachment(attachmentId){
		for(i in app.data.attachments){
			var attachment = app.data.attachments[i];
			if(attachment.attachment_id == attachmentId){
				return attachment;
			}
		}
	}
}