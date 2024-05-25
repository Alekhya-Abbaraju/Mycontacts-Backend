const asyncHandler=require("express-async-handler");

//GET /api/contacts/:id
const getContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});

});
// PUT /api/contacts
const updateContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`});
});
// POST /api/contacts
const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body);
    const{name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    res.status(200).json({message:`Create contact`});
});
const getContacts=async(req,res)=>{
    res.status(200).json({message:`Get all contacts`});
};
// DELETE /api/contacts
const deleteContact=asyncHandler(async(req,res)=>{
    res.status(201).json({message:`Delete contact for ${req.params.id}`});
});
module.exports={getContacts,createContact,getContact,updateContact,deleteContact};