const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

// POST /api/contacts
// POST /api/contacts
// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ error: "All fields are mandatory!" });
        return; // Return early to avoid executing the next line
    }
    try {
        const contact = await Contact.create({ name, email, phone });
        res.status(201).json(contact); // Return the created contact
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Could not create contact" });
    }
});


// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = { getContacts, getContact, updateContact, createContact, deleteContact };
