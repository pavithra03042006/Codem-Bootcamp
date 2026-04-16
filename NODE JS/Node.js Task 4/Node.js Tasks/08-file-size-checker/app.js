const fs= require('fs');
let file='file.txt';
fs.stat(file,(err,stats)=>{
    if(err){
        console.log(`${file} Not found`);
    } else {
        console.log(`File: ${file} , Size: ${stats.size} bytes`);
    }
});