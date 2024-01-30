const cloudinary = require("cloudinary");

exports.uploadImage = async (image, folder, existingImage) => {
    if(existingImage) await cloudinary.v2.uploader.destroy(existingImage);

    const cloud = await cloudinary.v2.uploader.upload(image, {
        folder,
        width: 150,
        height: 150,
        crop: "scale",
        quality: 100

    });
    return cloud
}
exports.destroyImage = async (image) => { 
    await cloudinary.v2.uploader.destroy(image);
}
