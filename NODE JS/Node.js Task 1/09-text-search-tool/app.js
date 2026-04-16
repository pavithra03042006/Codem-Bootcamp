const fs=require('fs');
fs.readFile('article.txt','utf8',(err,data)=>{
    let count=data.split('Node.js').length-1;
      console.log('Word "Node.js" found', count, "times");
});