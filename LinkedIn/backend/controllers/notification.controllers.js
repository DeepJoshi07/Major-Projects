import Notification from '../models/notification.js'

export const getNotifications = async(req,res) => {
    try {
        const notifications = await Notification.find({
            reciever:req.userId
        }).populate("relatedUser","firstName lastName profileImage")
        .populate("relatedPost","image description")

        return res.status(200).json(notifications)
    } catch (error) {
        return res.status(500).json({message:`getNotification ${error}`})
    }
}


export const deleteNotification = async(req,res) => {
    try {
        const {id} = req.params
        await Notification.findOneAndDelete({
            _id:id,
            reciever:req.userId
        })
        return res.status(200).json({message:'notifications deleted'})
    } catch (error) {
        return res.status(500).json({message:`deleteNotification error ${error}`})
    }
}


export const deleteAllNotifications = async(req,res) => {
    try {
        const id = req.userId
        await Notification.deleteMany({reciever:id})

        return res.status(200).json({message:'All notifications deleted'})
    } catch (error) {
        return res.status(500).json({message:`deleteAllNotification error ${error}`})
    }
}

