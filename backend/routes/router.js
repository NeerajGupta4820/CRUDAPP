const express=require("express");
const router = express.Router();
const students=require("../models/studSchema");
var multer=require('multer')

// router.use(express.static(__dirname+"./public/"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '_' + file.originalname)
    }
})

var upload=multer({storage:storage}).single('myFile')

//send data post method
router.post("/addstud",upload,async(req,res)=>{
    const profile = (req.file)? req.file.filename:null;
    const {name,address,email,age}=req.body;

    if(!name || !address || !email || !age){
        res.status(422).json("Please fillup the Data")
    }

    try{
        const prestud=await students.findOne({email:email});

        if(prestud){
            res.status(422).json("This student already Present")

        }else{
            const addstudent =new students ({name,address,email,age,profile});
            await addstudent.save();
            res.status(201).json(addstudent)
        }
    }catch(err){
        res.status(422).json(err)
    }
});

//get student Data
router.get("/getstud", async(req,res)=>{
    try{
        const studdata= await students.find();
        res.status(201).json(studdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle student Data
router.get("/getstud/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singlestud=await students.findById({_id:id});
       res.status(201).json(singlestud);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete student Data
router.delete("/deletestud/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deltestud=await students.findByIdAndDelete({_id:id});
       res.status(201).json(deltestud);
    }catch(err){
        res.status(422).json(err);
    }
})

// update student data
router.patch("/updatestud/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatestud = await students.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updatestud);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports=router;