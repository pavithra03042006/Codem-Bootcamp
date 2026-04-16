const fs=require('fs');
fs.readFile('numbers.txt','utf8',(err,data)=>{
     let nums = data.split("\n");
    let even = nums.filter(n => n % 2 == 0);

    fs.writeFile("evenNumbers.txt", even.join("\n"), () => {
        console.log("Even numbers saved");
    });

});
