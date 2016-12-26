var config = window.config || {};

var apiRoot = "//promolta-mail-restapi-nitishakalwadi.c9users.io";

config.api = {
    apiRoot: "//promolta-mail-restapi-nitishakalwadi.c9users.io",
    
    endpoints: {
        login: {
            url: apiRoot + "/auth/login",
            method: "POST"
        },
        logout: {
            url: apiRoot + "/auth/logout",
            method: "POST"
        },
        email: {
            url: apiRoot + "/email",
            method: "POST"
        },
        uploadAttachment: {
            url: apiRoot + "/email/attachment",
            method: "POST"
        },
        downloadAttachment: {
            url: apiRoot + "/attachment/get",
            method: "GET"
        },
        allEmail: {
            url: apiRoot + "/email/all",
            method: "GET"
        },
        sendEmail: {
            url: apiRoot + "/email/send",
            method: "POST"
        },
        fwdEmail: {
            url: apiRoot + "/email/fwd",
            method: "POST"
        },
        replyEmail: {
            url: apiRoot + "/email/reply",
            method: "POST"
        },
        trash: {
            url: apiRoot + "/email/trash",
            method: "POST"
        }
    },
    apiKey: {
        name: "X-API-KEY"
    }
};

config.messages = {
    loginSuccess: "Successfully logged in",
    logoutSuccess: "Successfully logged out",
    invalidEmail: "Invalid Email address",
    emailSendSuccess: "Email sent successfully",
    trashSuccess: "Email sent to trash"
};