@isTest
public with sharing class CustomLookupCtrlTest {
    //private static final 
    @TestSetup
    static void makeData(){
        List<Account> accList = new List<Account>();
        for (Integer i = 1; i <= 5; i++) {
            accList.add(new Account(Name = 'Test' + i));
        }
        insert accList;
    }

    @isTest
    public static void searchTest(){
        String searchTerm = 'te';
        List<String> fields = new List<String>{'Id', 'Name', 'RecordTypeId'};
        String objName = 'Account';
        String filter = 'RecordType.Name = \'Operating Company\'';
        String limitStr = '5';
        Test.startTest();
            List<sObject> results = CustomLookupCtrl.search(searchTerm, fields, objName, filter, limitStr);
        Test.stopTest();
        System.assertEquals(5, results.size());
    }
}
