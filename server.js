var connection = require('./config/connection');
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 4200;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname +'/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//karen commented out next 2 lines
var routes = require ('./controller/burger_controller.js')
app.use (routes);

//karen added next 3 lines
// app.get("/",function(req,res){
//   res.send("working");
// })

app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM burgers where id = ?", [req.params.id], function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    console.log(data);
    res.render("index", data[0]);
  });
});

app.post("/burgers", function(req, res) {
  connection.query("INSERT INTO burgers VALUES (?, ?)", [req.body.burger, req.body.burger], function(
    err,
    result
  ) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }

    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});


app.put("/burgers/:id", function(req, res) {
  connection.query(
    "UPDATE burgers SET burger_name = ?, devoured = ? WHERE id = ?",
    [req.body.burger_name, req.body.devoured, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
