import express from 'express'
import dbConnect from './database/index.js'

const app= express ()

const port = 3000
const host ="127.0.0.1"

app.get('/',(req,res)=>{
    res.send("Hi This Is E-learn Backend")
    
})
dbConnect()
.then((res)=>{
app.listen(port,()=>{
    console.log(`you are running on http://${host}:${port}`)
})})
.catch((err)=>{
    console.log("Error In Database Connection ",err)
})
