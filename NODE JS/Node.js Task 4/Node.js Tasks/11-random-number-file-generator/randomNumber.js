const fs=require('fs');
function generateNumber()
{
    return Math.floor(Math.random() * 100) + 1;
}
module.exports=generateNumber;