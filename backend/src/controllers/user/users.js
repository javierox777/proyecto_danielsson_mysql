import {myConn} from '../../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import util from 'util'
const query = util.promisify(myConn.query).bind(myConn)



export const signup =async (req, res) => {
    const {email, password} = req.body
   

    const sql = `select * from users where email = ${myConn.escape(email)}`
  
    const respuesta =await query(sql)

     const existEmail = respuesta[0] ? respuesta[0]  : {email:"a"}
    if(existEmail.email === email){
        return(
            res.json({message:"error", body:"email is already"})
        )
    }
    const cryptPass = await bcrypt.hash(password, 10)
    const sql1 = `insert into users (email, password) values((${myConn.escape(email)}), ${myConn.escape(cryptPass)})`
    const rows =await query(sql1)
    res.json(rows)
}


export const signin = async (req, res) => {
    const {email, password}= req.body
    const sql = `select * from users where email = ${myConn.escape(email)}`
    const resultado = await query(sql)
    const existEmail = resultado[0] ? resultado[0] : {email:"algo"}
    if(existEmail.email === "algo"){ 
        return(
            res.json({message:"email o password invalido"})
        )
    }

    const match = await bcrypt.compare(password, existEmail.password )

    if(match){
        const token = jwt.sign({id:existEmail.id}, "secreta")
      return (
        res.json({message:"ok",...existEmail, token}))
    }

    res.json({message:"email o password invalidos"})


}


