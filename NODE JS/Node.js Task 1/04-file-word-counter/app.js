const fs=require('fs');
fs.readFile('paragraph.txt','utf8',(err,data)=>{
    let words=data.split(" ")
    console.log(`Total words: ${words.length}`);
});