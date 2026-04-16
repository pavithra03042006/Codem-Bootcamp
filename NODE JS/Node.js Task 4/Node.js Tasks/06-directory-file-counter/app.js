const fs=require('fs');
fs.readdir('documents',(err,files)=>{
    console.log(`Total files in documents folder: ${files.length}`);
});