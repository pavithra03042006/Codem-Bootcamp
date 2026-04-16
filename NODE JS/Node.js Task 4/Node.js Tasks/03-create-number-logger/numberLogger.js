const fs=require('fs');
function logNumber(number)
{
    fs.appendFileSync('numbers.txt',number+'\n','utf-8');
}
module.exports=logNumber;