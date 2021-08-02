const { Client } = require('pg')
const client = new Client({
    database: "birthdays", 
    user : "user1",
    password: "1"
})

client.connect()

function logResult(res){
    console.log("res.rowCount >>>", res.rowCount);
    console.log("res.fields >>>", res.fields);
    console.log("res.rows >>>", res.rows);
    console.log("res.command >>>", res.command);
    console.log("=================================");
}
function genEmpQueryRow(count){
    let names = ["Giles" ,"Lyndon" ,"Sohail" ,"Kaine" ,"Roman" ,"Anabella" ,"Barbara" ,"Dolly" ,"June" ,"Ellie-May"];
    let lastNames = ["Sweeney","Lewis","Cole","Rees","Stein","Chan","Hodson","Sellers","Mcintosh","Bell"];
    let tableName = "employees";
    let queryHead = `INSERT INTO ${tableName} (name, age) VALUES `; 
    let dates = [];
    for(let i=0; i<count; i++){
        
        queryHead += "(";
        queryHead += "'" + names[Math.floor(Math.random() * names.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)] + "' ";
        let tempBirthDate = randomDate();
        dates.push(tempBirthDate);
        queryHead += `, $${i+1}`;
        queryHead +=  ", " + (new Date().getFullYear() - tempBirthDate.getFullYear().toString());
        queryHead += ")";
        if(i!=count-1){queryHead += ","}
    
    }
    return [queryHead, dates];
}
function randomDate() {
    let date = new Date();
    date.setDate(Math.floor(Math.random() * (30 - 1 + 1)) + 1);
    date.setMonth(Math.floor(Math.random() * (12 - 1 + 1)) + 1);
    date.setFullYear(Math.floor(Math.random() * (2000 - 1985 + 1)) + 1985);
    return date;
}


client
    .query("DELETE FROM employees").then(res => logResult(res) )
    // .then( ()=>client.end() )

let temp = genEmpQueryRow(2);
console.log(temp[0], temp[1]);

const insert_query = {
    name: 'Insert newly generated emplyees.',
    text: temp[0],
    values: [temp[1]]
}

client
    .query(insert_query)
    .then(res => logResult(res) )
    .then( ()=>client.end() )



