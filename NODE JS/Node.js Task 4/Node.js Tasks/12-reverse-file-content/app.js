const fs=require('fs');
fs.readFile('sentence.txt','utf8',(err,data)=>{
    let reversed=data.split('').reverse().join('');
    fs.writeFile('reverse.txt',reversed,(err)=>{
        console.log('File reversed and saved as reverse.txt');
    });
});