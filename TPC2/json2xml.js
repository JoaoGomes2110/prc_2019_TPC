xml2js = require('xml2js'); 
var fs = require('fs')
var jsonfile = require("jsonfile")

var file = 'prize.json'
var resultFile = 'prize.xml'

var dados = fs.readFileSync(file)
var data = new Array()

jsonfile.readFile(file,async(erro,dados)=>{
   for(var i in dados){
        var d = dados[i]
        await data.push({prize:dados[i]})
   }
   var builder = new xml2js.Builder({
       rootName: 'prizes'
   });
   var xml = builder.buildObject(data);
    await fs.appendFile(resultFile,xml,(error)=>{
        if(!error){
            console.log('Saved')            
        }
        else{
            console.log('erro')
        }
    })
})

















