<button type="button" class="btn btn-primary btn compose-new-email-btn" data-toggle="modal" data-target=".compose-new-email-modal">
    Compose
</button>
<div class="modal fade compose-new-email-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon" id="to">To</span>
                        <select multiple class="form-control to-field" name="to-field" data-role="tagsinput" aria-describedby="to"></select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon" id="subject">Subject</span>
                        <input type="text" class="form-control subject-field" name="subject-field" aria-describedby="subject">
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="form-control body-field" name="body-field" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-attachment btn-xs">Add attachments</button>
                </div>
                <div class="form-group attachments-wrapper">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-warning btn-save-draft">Save as draft</button>
                <button type="button" class="btn btn-primary btn-send">Send</button>
            </div>
        </div>
    </div>
</div>