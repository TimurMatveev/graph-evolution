var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://Timur:timur0404@ds111461.mlab.com:11461/graph_evolution_machines", ["machines"]);

// Get All Machines
router.get("/machines", function (req, res, next) {
    db.machines.find(function (error, machines) {
        if (error) {
            res.send(error);
        } else {
            res.json(machines);
        }
    });
});

// Save Machine
router.post("/machine", function (req, res, next) {
    var machine = req.body;

    if (machine) {
        db.machines.save(machine, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.json(result);
            }
        });
    } else {
        res.status(400);
        res.json({
            "error": "InvalidData"
        })
    }
});

// Update Machine
router.put("/machine/:id", function (req, res, next) {
    var machine = req.body;

    if (machine) {
        db.machines.update({
            _id: mongojs.ObjectId(req.params.id)
        }, machine, {}, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.json(result);
            }
        });
    } else {
        res.status(400);
        res.json({
            "error": "InvalidData"
        })
    }
});

// Delete Machine
router.delete("/machine/:id", function (req, res, next) {
    db.machines.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, "", function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;