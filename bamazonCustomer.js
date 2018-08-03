var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

});

function listAllProducts(stuff) {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\nITEMS FOR SALE\n=============================");

        var inventory = [];
        for (var i = 0; i<results.length;i++) {
            var arr = results[i];
            inventory.push(arr);
        }

        console.table(inventory);
        stuff(inventory);
        // not exactly sure about this
    });
}

function promptUser(inventory) {
    inquirer.prompt([
        {
            name: "buy",
            type: "input",
            message: "Please enter the ID of item you would like to buy. Enter (Q) to quit:  ",
            validate: function (value) {
                if (value === ("Q")){
                    console.log("\nYour Total will be displayed above");
                    connection.end();
                    // stops the function from running
                    process.exit();
                }
                console.log('value',value);
                console.log("find index", inventory.findIndex(function(x){
                    return x.item_id===value;
                }));
                
         //kept getting an index of -1 before I made it zerofill... why?

               if (inventory.findIndex(x=>x.item_id===value)){
                   //var id = inventory.findIndex(x=>x.item_id===value);
                   console.log('inventory.item_id',inventory);
                 return true;
                }
                else
                return false;
            }
            
        },
        
        {
            name: "qty",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (res) {
        // console.log("results",results);
 
        connection.query("SELECT * FROM products where item_id = ?", res.buy, function (err, results) {
            if (err) throw err;
            console.log("results",results);
            if (results[0].stock > res.qty) {
                var newInStock = parseInt(results[0].stock) - parseInt(res.qty);
               
                var totalCost = results[0].price * res.qty;
                console.log("\nYour total cost will be $" + totalCost.toFixed(2));
                connection.query("UPDATE products SET stock = ? where item_id = ?", [newInStock, res.buy], function (err, results) {
                    if (err) throw err;
                    listAllProducts(promptUser);
                });

            } else {
                console.log("\nUnfortunately we are currently out of stock.");
                console.log("You asked for: " +res.qty + " " + results[0].product_name + "(s). There are only : " +results[0].stock + " in stock");

                listAllProducts(promptUser);
            }
            

        });
    });

}

function start() {
   listAllProducts(promptUser);
 }

 start();
