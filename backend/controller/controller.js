const model = require('../models/model');

// post: https://localhost:8080/api/categories
async function createCategories(req,res){
    const Create = new model.Categories({
        type:"Investment",
        color:"#fcbe44",
    })

    await Create.save(function(err){
        if(!err)return res.json(Create);
        return res.status(400).json({message:"Error while creating categories"+err})
    })
}

// get: https://localhost:8080/api/categories
async function getCategories(req,res){
    let data = await model.Categories.find({})

    let filter = await data.map(v=> Object.assign({},{type:v.type,color:v.color}));
    return res.json(filter);
}

// post: https://localhost:8080/api/transaction
async function createTransaction (req,res){
    if(!req.body)return res.status(400).json("Post HTTP data not provided")
    let {name,type,amount} = req.body;

    const create = await new model.Transaction({
        name:name,
        type:type,
        amount:amount,
        date:new Date()
    })
    create.save(function(err){
        if(!err)return res.json(create);
        return res.status(400).json({message:"Erroe while creating transaction"+err})
    })
}

// get: https://localhost:8080/api/transaction
async function getTransaction(req,res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

// delete: https://localhost:8080/api/transaction
async function deleteTransaction(req,res){
    if(!req.body)res.status(400).json({message:"Request body not found"});

    await model.Transaction.deleteOne(req.body,function(err){
        if(!err)res.json("Date Deleted")
    }).clone().catch(function(err){res.json("Error while deleting the data "+err)})
}


// get: https://localhost:8080/api/labels
async function getLabels(req,res){
    model.Transaction.aggregate([
        {
        $lookup:{
            from:"categories",
            localField:"type",
            foreignField:"type",
            as:"categories_info"
        }
    },
    {
        $unwind:"$categories_info"
    }
]).then(result=>{
    let data = result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}))
    res.json(data);
}).catch(error=>{
    res.status(400).json("LookUp Collection Error")
})
}


module.exports = {
    createCategories,
    getCategories,
    createTransaction,
    getTransaction,
    deleteTransaction,
    getLabels
}