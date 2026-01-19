const Item = require("../models/item.model");
const Shop = require("../models/shop.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            return res.status(400).json({ message: "shop not found" })
        }

        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })
        shop.items.push(item._id)
        await shop.save()

        await shop.populate("items owner")

        return res.status(201).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `add item error ${error}` })
    }
}


const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, { new: true })

        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        return res.status(200).json(item)

    } catch (error) {
        return res.status(500).json({ message: `edt item error ${error}` })
    }
}


module.exports =
{
    addItem,
    editItem

}
