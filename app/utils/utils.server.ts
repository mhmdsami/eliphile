import { v2 as cloudinary } from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadImage(
  data: AsyncIterable<Uint8Array>,
): Promise<UploadApiResponse> {
  return new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "eliphile" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result as UploadApiResponse);
      },
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });
}

export { uploadImage };
