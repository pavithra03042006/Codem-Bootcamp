const fs=require('fs');
fs.readFile('./users.txt','utf-8',function(err,data){
    if(err){
        console.error("Error reading file:",err);
        return;
    }
    const users=data.split('\n')
    console.log("Users List:");
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user}`);
    
    })});