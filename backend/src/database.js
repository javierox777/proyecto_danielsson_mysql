import mysql from 'mysql'

const schema = {
    host:"localhost",
    user:"root",
    password:"12345",
    port:3306,
    database:"database_app"
}



export const myConn = mysql.createConnection(schema)


myConn.connect((error)=>{
    if(error){
      return  console.log(error)
    }

    console.log("db mys sql is connect", schema.database)
})



