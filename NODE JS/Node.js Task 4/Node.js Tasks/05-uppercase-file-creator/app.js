const fs=require('fs');
fs.readFile('message.txt','utf8',(err,data)=>{
    let uppercaseMessage=data.toUpperCase();
    fs.writeFile('uppercase.txt',uppercaseMessage,'utf8',(err)=>{
        console.log("File Converted Successfully");
    });
});