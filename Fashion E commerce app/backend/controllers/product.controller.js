import { v2 as cloudinary } from "cloudinary";
import Product from "../model/productModel.js";

export const productAdd = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      price: Number(price),
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    

    const product = new Product(productData);
    await product.save();

    res.status(201).json("Product added!");
  } catch (error) {
    console.log(error.message);
  }
};

export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        
        res.status(200).json({message:'You got the list!',products,success:true})
    } catch (error) {
        console.log(error.message)
    }
};

export const productRemove = async (req, res) => {
     try {
        const remove = await Product.findByIdAndDelete(req.body.id)
        
        res.status(200).json({message:'Product removed!',remove,success:true})
    } catch (error) {
        console.log(error.message)
    }
};

export const productSingle = async (req, res) => {
     try {
        const {productId} = req.body
        const product = await Product.findById(productId)
        
        res.status(200).json({message:'Here is your Product!',product})
    } catch (error) {
        console.log(error.message)
    }
};
