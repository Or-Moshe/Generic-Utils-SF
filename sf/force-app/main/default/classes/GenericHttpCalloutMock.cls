/**
 * @Author		: 	Or Moshe
 * @class		: 	GenericHttpCalloutMock
 * @since		: 	14/07/2022
 * @Description : generic mock
 */
@isTest
global class GenericHttpCalloutMock implements HttpCalloutMock{
    private Integer statusCode;
    private String status;
    private String headerType;
    private String headerVal;
    private String body;
    
    public GenericHttpCalloutMock(Integer statusCode, String status, String headerType, String headerVal, String body){
        this.statusCode = statusCode;
        this.status = status;
        this.headerType = headerType;
        this.headerVal = headerVal;
        this.body = body;
    }
    global HTTPResponse respond(HTTPRequest req) {        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader(this.headerType, this.headerVal);
        res.setBody(this.body);
        res.setStatus(this.status);
        res.setStatusCode(this.statusCode);
        return res;
    }

    /*global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        for (String key : this.responseHeaders.keySet()) {
            res.setHeader(key, this.responseHeaders.get(key));
        }
        res.setBody(this.body);
        res.setStatusCode(this.code);
        res.setStatus(this.status);
        return res;
    }*/
}