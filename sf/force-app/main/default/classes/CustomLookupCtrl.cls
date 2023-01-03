/**
 * Author       :   Or Moshe   
 * Since        :   22/12/22
 * description  :   use this controller in order to search sobject from customLookup    
 */
public with sharing class CustomLookupCtrl {

    private static final String OBJECT_NAME_EMPTY = 'DEV, please send object name'; 

    /**
     * String searchTerm    :   search value from input
     * List<String> fields  :   list of fields to return    
     * objName             :   the object name to query from   
     * filter               :   
     * limitStr             :   limit => LIMIT 5 for example
     */
    @AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm, List<String> fields, String objName, String filter,/* String whereClouseJson,*/ String limitStr) {
        System.debug('searchTerm ' + searchTerm);
        System.debug('fields ' + fields);
        System.debug('objName ' + objName);
        System.debug('filter ' + filter);
        System.debug('limitStr ' + limitStr);
        
        String myQuery = buildFeildsQuery(fields, objName);
        //myQuery = buildWhereClouseBySearchTerm(myQuery, searchTerm, whereClouseJson);
        myQuery = buildWhereClouseBySearchTerm(myQuery, searchTerm, filter);
        myQuery = buildWhereClouseByFilter(myQuery, filter);
        myQuery = buildLimit(myQuery, limitStr);
        System.debug('myQuery ' + myQuery);
        List<sObject> lookUpList = database.query(myQuery);
        System.debug('lookUpList ' + lookUpList);
        return lookUpList;
    }

    private static String buildFeildsQuery(List<String> fields, String objName){
        if(String.isBlank(objName)){
            throw new AuraHandledException(OBJECT_NAME_EMPTY);
        }
        String myQuery = 'SELECT';
        if(fields != null || !fields.isEmpty()){
            Integer i;
            for (i = 0; i < fields.size()-1; i++) {
                myQuery += ' ' + fields[i] + ', ';
            }
            myQuery += ' ' + fields[i] + ' ';
        }
        myQuery += ' FROM '+ objName;
        return myQuery;
    }

    private static String buildWhereClouseBySearchTerm(String myQuery, String searchTerm, String whereClouseJson){
        myQuery += ' WHERE ';
        /*{
            [{name = 'test', RecordTypeId = 'ttt'},{}]
        }
        List<AndWhereClouseObj> OrWhereClouseList = (List<AndWhereClouseObj>)JSON.deserialize(whereClouseJson, List<AndWhereClouseObj>.class);
        
        /*for (String field : fieldToSearchValMap.keySet()) {
            myQuery += fieldToSearchValMap Like \'%' + searchTerm + '%\';
        }*/
        myQuery += ' Name Like  \'%' + searchTerm + '%\' ';
        return myQuery;
    }

    private static String buildWhereClouseByFilter(String myQuery, String filter){
        if(String.isNotBlank(filter)){
            myQuery += ' AND ' + filter;
        }
        return myQuery;
    }

    private static String buildLimit(String myQuery, String limitStr){
        if(String.isNotBlank(limitStr)){
            limitStr = limitStr.toUppercase();
            if(!limitStr.contains('LIMIT')){
                limitStr = ' LIMIT ' + limitStr;
            }
            myQuery += ' ' +limitStr;
        }
        return myQuery;
    }

    public class AndWhereClouseObj{
        public Map<String, String> andWhereClouseMap;
    }
}
