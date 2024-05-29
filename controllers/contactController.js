const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById({user_id: req.user.id});
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        res.json({ error: "All fields are mandatory!" });
        return;
    }
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
    res.status(201).json(contact);
});

// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user's contacts");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = { getContacts, getContact, updateContact, createContact, deleteContact };
