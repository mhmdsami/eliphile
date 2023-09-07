import { requireUserId } from "~/utils/session.server";
import { uploadImage } from "~/utils/utils.server";
import type { ActionFunction } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  if (!userId) {
    return json(
      { message: "You must be logged in to upload images" },
      { status: 401 },
    );
  }
  const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
    if (name !== "image") {
      return undefined;
    }
    const uploadedImage = await uploadImage(data);
    return uploadedImage.secure_url;
  }, createMemoryUploadHandler());

  return json(
    Object.fromEntries(await parseMultipartFormData(request, uploadHandler)),
  );
};
