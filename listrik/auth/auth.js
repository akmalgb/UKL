const express = require("express")
const auth = express()
const md5 = require("md5")

const modelAdmin = require("../../models/index").admin
const modelPelanggan = require("../../models/index").pelanggan

const jwt = require("jsonwebtoken")
const secretKeyAdmin = "admin123"
const secretKeyUser = "user123"

auth.use(express.urlencoded({extended:true}))

auth.post("/", async(req,res)=>{
    let data={
        username: req.body.username,
        password: md5(req.body.password)
    }

    let admin = await modelAdmin.findOne({where:data})
    let pelanggan = await modelPelanggan.findOne({where:data})

    if(admin){
        let payload = JSON.stringify(admin)

        return res.json({
            data: admin,
            token: jwt.sign(payload, secretKeyAdmin)
        })
    }else if(pelanggan){
        let payload=JSON.stringify(pelanggan)

        return res.json({
            data:pelanggan,
            token:jwt.sign(payload, secretKeyUser)
        })
    }else{
        return res.json({
            message:"invalid username or password"
        })
    }
})