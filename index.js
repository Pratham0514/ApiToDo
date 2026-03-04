import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const TODO_ITEMS = [
    {
        id: 1,
        todoItems: "Walk the dog",
        priority: "high",
        emoji: "🐶",
        isDone: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        todoItems: "Buy groceries",
        priority: "medium",
        emoji: "🛒",
        isDone: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        todoItems: "Clean the house",
        priority: "low",
        emoji: "🏡",
        isDone: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 4,
        todoItems: "Go for a run",
        priority: "high",
        emoji: "🏃",
        isDone: false,
        createdAt: new Date().toISOString(),
    }
];
// health api
app.get("/todos/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy",
    });
});


// Get all todos
app.get("/todos", (req, res) => {
    res.json({
        success: true,
        data: TODO_ITEMS,
        message: "Todo list fetched successfully",
    });
});
// create
app.post("/todos",(req, res) => {
//    console.log(`Request body`, req.body);

const { todoItems, priority, emoji} = req.body;
const todoobj = { 
    id : TODO_ITEMS.length + 1,
    todoItems: todoItems, 
    priority : priority, 
    emoji : emoji,
    isDone : false,
    createdAt: new Date().toISOString()
};

TODO_ITEMS.push(todoobj);

res.json({
        success: true,
        data: TODO_ITEMS,
        message: "Todo added successfully",
    });
});
// Search 
app.get("/todos/search", (req, res) => {
    // first extract these from req.query     item use k lay ahe tar    "" http://localhost:8080/todos/search?item=walk&priority=high"" asay run karay chay
    const { item, priority } = req.query;

    const filteredItems = TODO_ITEMS.filter((itemobj) => {
        // Your Logic: If the text AND priority match...
        if (itemobj.todoItems.toLowerCase().includes(item.toLowerCase()) && 
            itemobj.priority.toLowerCase() === priority.toLowerCase()) {
            return true; // ...keep the item
        } else {
            return false; // ...else, discard it
        }
    });
    // 2. Send the JSON response after the filtering is done
    res.json({
        success: true,
        data: filteredItems,
        message: "Filtered items fetched successfully",
    });
});
//  find 
app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoItem = TODO_ITEMS.find((Item) => Item.id == id);
    if(todoItem) {
      //  print in the console=>   console.log(todoItem);
       return  res.json({
            success: true,
            data: todoItem,
            message: "Todo fetched successfully",
        });
    }
    res.json({
        success: false,
        message: "Todo not fetched",
    });
});
// Delete 
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    
    const index = TODO_ITEMS.findIndex((item) => item.id == id);
    if (index !== -1) {
        console.log(index);
        TODO_ITEMS.splice(index, 1);
        return res.json({
            success: true,
            message: "Todo deleted successfully"
        });
    }
    res.json({
        success: false,
        message: "Todo not deleted",
    });
});
// update a specific part of it.
app.patch("/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = TODO_ITEMS.findIndex((item) => item.id == id);
    const {isDone} = req.body;
    if (index !== -1) {
        TODO_ITEMS[index].isDone = isDone;
        return res.json({
            success: true,
            message: "Todo updated successfully"
        });
    }
    res.json({
        success: false,
        message: "Todo not updated",
    });
});
// update
app.put ("/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = TODO_ITEMS.findIndex((item) => item.id == id);
    const { todoItems, priority, emoji } = req.body;
    if (index !== -1) {
        TODO_ITEMS[index].todoItems = todoItems;
        TODO_ITEMS[index].priority = priority;
        TODO_ITEMS[index].emoji = emoji;
        return res.json({
            success: true,
            message: "Todo updated successfully"
        });
    }
    res.json({
        success: false,
        message: "Todo not updated",
    });
});

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log("Server running on port 8080");
});