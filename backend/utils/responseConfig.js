class ResponseConfig {
    constructor(status, request, response, contentType, data) {
        this.status = status;
        this.request = request;
        this.response = response;
        this.contentType = contentType;
        this.data = data;
    }
}

module.exports = ResponseConfig;