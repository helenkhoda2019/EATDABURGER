var connection = require ('./connection.js');
var orm = {
    all: function (tableInput, cb){
        connection.query('SELECT * FROM '+ tableInput+';', function (err,result){
            if (err) throw err;
            cb(result)
        })
    },
    update: function (table, colValues, condition, cb) {
        var query = "UPDATE  " +table;
        query += " SET ";
        query += objToSql(colValues);
        query += " WHERE ";
        query += condition;
        console.log("update query: " +query)
        connection.query(query, function(err, result){
            cb(result);
        })
    },
    create: function (table, columns, values, cb) {
        var query = "INSERT INTO " + table;
        query += " (";
        query += columns.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(values.length);
        query += ") ";
        console.log("create query: " +query);
        connection.query(query, values, function(err, results){
            if(err){
                throw err;
            }
            cb(results);
        })
    }
}
// Insert into burgers(burger_name) values (?)
//Helper function to convert object key/value pairs to SQL syntax
 function objToSql(ob) {
   var arr = [];
   // loop through the keys and push the key/value as a string int arr
   for (var key in ob) {
     var value = ob[key];
     // check to skip hidden properties
     if (Object.hasOwnProperty.call(ob, key)) {
       // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
       if (typeof value === "string" && value.indexOf(" ") >= 0) {
         value = "'" + value + "'";
       }
       // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
       // e.g. {sleepy: true} => ["sleepy=true"]
       arr.push(key + "=" + value);
     }
   }
   // translate array of strings to a single comma-separated string
   return arr.toString();
 }

 function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
module.exports = orm;