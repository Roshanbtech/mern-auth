import express from "express";

const test = (req, res) => {
    res.json({message: "API is working fine"})
    
}

export { test }