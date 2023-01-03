public with sharing class MockFactory {
    public MockFactory() {

    }

    public static String getMock(String mockName, List<String> bluePrintIdList, List<String> formIdList, List<String> processIdList){
        switch on mockName {
            when 'start_process_success'{
                return '{"id":"djE6czpHNVZUdHZuQXZ5","blueprint_id":"' + bluePrintIdList[0] + '","status":"running","form":{"id":"' + formIdList[0] + '","client_url":"https://dev.cellosign.com/t/G5VTtvnAvy","agent_url":"https://dev.cellosign.com/demo/rep?tok=G5VTtvnAvy&template=05e62626179d47cba911d97f680363d4"}}';
            }
            when 'start_process_failed'{
                return '{"detail":{"code":"wrong blueprint id","description":null}}';
            }
            when else{
                throw new CalloutServiceException(mockName + ' not found');
            }
        }
    }
}
