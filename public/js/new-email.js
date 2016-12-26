$.ajaxSetup({ cache: false });

var app = window.app || {};
app.newEmail = app.newEmail || {};
app.data = app.data || {};

app.newEmail.initialize = function(){
	$(function() {
		init();
	});

	function init(){
	    bindEvents();
	}
	
	function bindEvents(){
	    var selectors = getPageSelectors();
	    initToEmailValidity();
	    initEmailBtns();
	    initModalEvents();
	}
	
	function getPageSelectors(){
	    return {
	        toField: $(".compose-new-email-modal .to-field"),
	        subjectField: $(".compose-new-email-modal .subject-field"),
	        bodyField: $(".compose-new-email-modal .body-field"),
	        sendBtn: $(".compose-new-email-modal .btn-send"),
	        cancelBtn: $(".compose-new-email-modal .btn-cancel"),
	        saveDraftBtn: $(".compose-new-email-modal .btn-save-draft"),
	        addAttachment: $(".compose-new-email-modal .btn-attachment"),
	        modal: $(".compose-new-email-modal")
	    };
	}
	
	function initToEmailValidity(){
	    $('.to-field').on('beforeItemAdd', function(event) {
	        if(!utils.isValidEmail(event.item)){
	            event.cancel = true;
	            toastr.error(config.messages.invalidEmail);
	        }
            // event.item: contains the item
            // event.cancel: set to true to prevent the item getting added
        });
	}
	
	function initEmailBtns(){
	    var selectors = getPageSelectors();
	    selectors.sendBtn.on("click", sendEmail);
	    selectors.saveDraftBtn.on("click", saveDraftEmail);
	    selectors.addAttachment.on("click", addAttachmentMarkup);
	    $(".compose-new-email-modal .attachments-wrapper").on("change", ".attachment", uploadAttachment);
	    $(".compose-new-email-modal .attachments-wrapper").on("click", ".remove-attachment", removeAttachment);
	    $(".compose-new-email-modal .attachments-wrapper").on("click", ".added-attachment", downloadAttachment);
	    
	}
	
	function downloadAttachment(){
		var attachmentId = $(this).data("attachment-id");
		var url = "http:" + config.api.endpoints.downloadAttachment.url + "?attachmentId="+attachmentId;
		window.open(url);
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
	
	function removeAttachment(e){
		$(this).parents(".added-attachment").remove();
		e.stopPropagation();
	}
	
	function addAttachmentMarkup(){
		var markup = "";
		markup += "<div class='form-group'>";
		markup += "<div class='input-group'>";
        markup += "<input type='file' class='form-control attachment' name='attachment[]' aria-describedby='attachment'>";
        markup += "</div>";
        markup += "</div>";
		
		$(".compose-new-email-modal .attachments-wrapper").append(markup);
	}
	
	function initModalEvents(){
	    var selectors = getPageSelectors();
	    selectors.modal.on("show.bs.modal", clearModalFields);
	}
	
	function sendEmail(){
	    var selectors = getPageSelectors();
	    var headers = {};
	    headers[config.api.apiKey.name] = Cookies.get(config.api.apiKey.name);
	    
	 //   var formData = new FormData();
	 //   formData.append('to', selectors.toField.val());
	 //   formData.append('subject', selectors.subjectField.val());
	 //   formData.append('body', selectors.bodyField.val());
	    
	 //   $(".attachment").each(function(index){
	 //   	formData.append("attachment[]", this.files[0]);
	 //   });
	    
	 //   for (var pair of formData.entries()) {
  //  		console.log(pair[0]+ ', ' + pair[1]); 
		// }
		// return;
	    
	    var attachmentIds = [];
	    $(".compose-new-email-modal .added-attachment").each(function(index){
	    	var attachmentId = $(this).data("attachment-id");
	    	attachmentIds.push(attachmentId)
	    });
	    
	    var data = {
	        to: selectors.toField.val(),
	        subject: selectors.subjectField.val(),
	        body: selectors.bodyField.val(),
	        attachmentIds: attachmentIds
	    };
	    
	    $.ajax({
			type: config.api.endpoints.sendEmail.method,
            url: config.api.endpoints.sendEmail.url,
            data: data,
            headers: headers,
            dataType: 'json',
            beforeSend: function(){
                disableFormBtns();
            },
            success: function(resp){
            	if(resp.status == true){
            	    toastr.success(config.messages.emailSendSuccess);
            		selectors.modal.modal("hide");
            	}
            	else if(resp.status == false){
            		toastr.error(resp.msg);
            	}
            },
            error: function(){

			},
			complete: function(){
                enableFormBtns();
			}
        });
	}
	
	function saveDraftEmail(){
	    alert("draft");
	}
	
	function clearModalFields(){
	    var selectors = getPageSelectors();
	    var $modal = $(".compose-new-email-modal");
	    selectors.toField.tagsinput('removeAll');
	    selectors.subjectField.val("");
	    selectors.bodyField.val("");
	    $(".compose-new-email-modal .attachments-wrapper").html("");
	}
	
	function disableFormBtns(){
	    var selectors = getPageSelectors();
	    selectors.sendBtn.attr("disabled", true);
	    selectors.cancelBtn.attr("disabled", true);
	    selectors.saveDraftBtn.attr("disabled", true);
	}
	
	function enableFormBtns(){
	    var selectors = getPageSelectors();
	    selectors.sendBtn.removeAttr("disabled");
	    selectors.cancelBtn.removeAttr("disabled");
	    selectors.saveDraftBtn.removeAttr("disabled");
	}
	
	function getToEmail(){
	    return [];
	}
}