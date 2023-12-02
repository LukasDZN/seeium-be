import { v2 as cloudinary } from 'cloudinary'
import { envVariables } from '../../../config/envVariables.js'

cloudinary.config({
  // eslint-disable-next-line
  cloud_name: envVariables.CLOUDINARY_CLOUD_NAME,
  // eslint-disable-next-line
  api_key: envVariables.CLOUDINARY_API_KEY,
  // eslint-disable-next-line
  api_secret: envVariables.CLOUDINARY_API_SECRET,
  secure: true,
})

/**
 * Uploads an image to Cloudinary.
 * If the imageId already exists, it will not overwrite it, but will return the existing image.
 */
export const uploadImageUrlToCloudinary = async ({
  imageId,
  imageUrl,
  folder,
  uploadPreset,
}: {
  imageId: string
  imageUrl: string
  folder: string
  uploadPreset: string
}) => {
  // https://cloudinary.com/documentation/image_upload_api_reference
  const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
    // eslint-disable-next-line
    public_id: imageId,

    // If use_filename is true, then public_id will be set from the file name
    // eslint-disable-next-line
    // use_filename: true, // Disable because we want to use our own imageId

    // eslint-disable-next-line
    // unique_filename: true,

    folder,

    // When set to false, a response is returned immediately if an asset with the same Public ID was found.
    overwrite: false, // when using unsigned upload, the default is false and cannot be changed to true

    // eslint-disable-next-line
    upload_preset: uploadPreset, // Necessary for unsigned uploads

    // eslint-disable-next-line
    resource_type: 'image',

    // notification_url: 'https://mysite.example.com/notify_endpoint',
  })

  return uploadedImage
}
