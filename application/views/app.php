<?php $this->load->view('partials/html_start'); ?>

<div class="app">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <!--<a class="navbar-brand" href="javascript:void(0)">Welcome, Test</a>-->
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="javascript:void(0)" class="btn-logout">Logout</a></li>
                <!--<li><button type="button" class="btn btn-default btn-logout">Send</button></li>-->
            </ul>
        </div>
    </nav>
    
    <div class="container compose-new-email-wrapper">
        <div class="pull-left">
            <?php $this->load->view('partials/compose_new_email_modal'); ?>
        </div>
    </div>
    
    <div class="left-panel pull-left">
        <!--<div class="placeholder inbox active"><a href="#"><span class="badge-name">Inbox</span> <span class="badge">42</span></a></div>-->
        <!--<div class="placeholder sent"><a href="#"><span class="badge-name">Sent</span> <span class="badge">42</span></a></div>-->
        <!--<div class="placeholder drafts"><a href="#"><span class="badge-name">Drafts</span> <span class="badge">42</span></a></div>-->
        <!--<div class="placeholder trash"><a href="#"><span class="badge-name">Trash</span> <span class="badge">42</span></a></div>-->
        
        <ul class="nav nav-tabs nav-stacked pull-left">
            <li class="btn-inbox active"><a data-toggle="tab" href="#inbox">Inbox</a></li>
            <li class="btn-sent"><a data-toggle="tab" href="#sent">Sent</a></li>
            <li class="btn-draft"><a data-toggle="tab" href="#draft">Drafts</a></li>
            <li class="btn-trash"><a data-toggle="tab" href="#trash">Trash</a></li>
        </ul>
    </div>
    
    <div class="right-panel pull-left">
        <div class="tab-content">
            <div id="inbox" class="tab-pane fade in active">
                Loading...
            </div>
            <div id="sent" class="tab-pane fade">
                Loading...
            </div>
            <div id="draft" class="tab-pane fade">
                Loading...
            </div>
            <div id="trash" class="tab-pane fade">
                Loading...
            </div>
        </div>
    </div>
    
    <?php $this->load->view('partials/view_inbox_email_modal'); ?>
    <?php $this->load->view('partials/fwd_email_modal'); ?>
    <?php $this->load->view('partials/reply_email_modal'); ?>
    
</div>

<script>
    app.logout.initialize();
    app.mailer.initialize();
    app.viewInboxEmail.initialize();
    app.newEmail.initialize();
</script>

<?php $this->load->view('partials/html_end'); ?>