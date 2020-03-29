const mysql = require('mysql');

class Query {
   constructor() {
       this.connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Ss656724378",
        database: "employees_DB"
      });
   } ;

   select(column,table,cb){
     return this.connection.query(`SELECT ${column} FROM ${table}`, (err,data) => {
         if(err) throw err;
         cb(data);
     })
   };

   insert(table, args, cb) {
       return this.connection.query(`INSERT INTO ${table} SET ?`, args, (err) => {
           if(err) throw err;
           cb("\n CREATED SUCCESSFULLY \n");     
       })
   };
   
   update(table, args, cb) {
       return this.connection.query(`UPDATE ${table} SET ? WHERE ?`, args, 
           err => {
               if(err) throw err;
               cb("\n UPDATED SUCCESSFULLY \n")
           }
       )
   };

   delete(table, args, cb) {
       return this.connection.query(`DELETE FROM ${table} WHERE ?`, args,
           err => {
               if(err) throw err;
               cb("\n DELETED SUCCESSFULLY \n")
       })
   };

   deleteAll(table,cb) {
       return this.connection.query(`DELETE FROM ${table}`, err => {
           if(err) throw err;
           cb("\n DELETED SUCCESSFULLY \n")
       })
   }

   custom(q,args,cb) {
       return this.connection.query(q,args,
          (err,data) => {
              if(err) throw err;
              cb(data)
          } 
        )
   }

}

module.exports = Query;