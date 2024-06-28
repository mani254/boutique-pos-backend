
const Category = require('../models/categorySchema.js')


const categoryController = {
   addCategory: async (req, res) => {
      const { name, status } = req.body;

      try {
         const existedCategory = await Category.findOne({ name })

         console.log(existedCategory)

         if (existedCategory) {
            return res.status(401).json({ error: "Category already existed" });
         }

         const newCategory = new Category({ name, status });

         const savedCategory = await newCategory.save();
         res.status(201).json({ category: savedCategory, message: 'category added succesfully' });

      } catch (error) {
         console.log(error.message)
         res.status(400).json({ error: error.message });
      }
   },

   getCategories: async (req, res) => {
      try {
         const categories = await Category.find()
         res.status(201).json({ categories, message: 'categories fetched succesfullly' });

      } catch (error) {
         console.log(error.message)
         res.status(400).json({ error: error.message });
      }
   },

   deleteCategory: async (req, res) => {
      const { id } = req.params;

      try {
         const deletedCategory = await Category.findByIdAndDelete(id);
         if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
         }
         res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   }
}



module.exports = categoryController