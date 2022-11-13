const express = require("express");
const { User, Post } = require("./db");
const server = express();
server.use(express.json());
server.use(morgan("dev"));

// POST A USER:

server.post("/users", async (req, res) => {
    try {
    const {name, last_name} = req.body;
    const newUser = await User.create({name, last_name});
    res.status(200).send(newUser);
    } catch (error){
        res.status(400).send(error.message);
    }
});

server.post("/users/bulk", async (req, res) => {
    try {
        const data = req.body;
        const newUsers = await User.bulkCreate(data);
        res.status(200).send(newUsers);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

server.post("/posts", async (req, res) => {
    try {
        const {title, contents, userId} = req.body; // userId no esta definido en el modelo de "Post";
        const newPost = await Post.create({title, contents});
        newPost.setUser(userId);
        res.status(200).send(newPost);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

server.delete("/users", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByPk(id);
        await user.destroy();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// GET ALL USERS:

server.get("/users", async (req, res) => {
    try {
        const { name } = req.query;
        if (!name){
            const users = await User.findAll({attributes: ["name", "last_name"]});
            // {attributes: {exclude: ["birth"]}};
            return res.status(200).send(users);
        } else {
            const users = await User.findAll({
                where: {
                    name,
                }
            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// GET ONE USER:

server.get("users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user.findByPk(id);
        res.status(200).send(user);
        if (!user) throw new Error ("User does not exist");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = server;

