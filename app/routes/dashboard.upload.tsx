import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, ImagePlus } from "lucide-react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { imageUploadSchema } from "~/utils/schema";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import type { ActionFunction } from "@remix-run/node";
import type { ImageUploadError } from "~/utils/schema";

type ActionData = {
  errors?: ImageUploadError;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formPayload = Object.fromEntries(await request.formData());

  const res = imageUploadSchema.safeParse(formPayload);
  if (!res.success) {
    return json({ errors: res.error.flatten() }, { status: 400 });
  }

  const { image, title, description } = res.data;
  const imageRes = await db.image.create({
    data: {
      url: image,
      title,
      description,
      userId,
    },
  });

  if (!imageRes) {
    return json(
      {
        errors: {
          fieldErrors: { image: [], title: [], description: [] },
          formErrors: ["Image upload failed"],
        },
      },
      { status: 400 },
    );
  }

  return json({ image });
};

export default function Upload() {
  const data = useActionData<ActionData | undefined>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState("");
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAcceptedFiles(acceptedFiles);
      setFileName(acceptedFiles[0]["name"]);

      const formData = new FormData();
      formData.append("image", acceptedFiles[0], acceptedFiles[0]["name"]);
      setIsUploading(true);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const { image } = await res.json();
      setImage(image);
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "submitting") {
      formRef.current?.reset();
      setImage("");
      setFileName("");
      setAcceptedFiles([]);
    }
  }, [navigation]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">Upload</div>
      <Form
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col xl:flex-row gap-2 mx-auto"
        ref={formRef}
      >
        <div {...getRootProps()} className="flex text-field w-72 md:w-96">
          <input
            {...getInputProps({
              accept: "image/*",
              multiple: false,
            })}
          />
          <div className="text-sm text-white/60 flex flex-col flex-grow gap-2 items-center justify-center text-center min-h-[128px]">
            {acceptedFiles.length > 0 ? (
              <>
                <Image />
                <p>{isUploading ? "Uploading" : `Uploaded: ${fileName}`}</p>
              </>
            ) : (
              <>
                <ImagePlus />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>
                    Drag &amp; drop some files here, or click to select files
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <input name="image" value={image} hidden readOnly />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-72 md:w-96">
            <input
              name="title"
              type="text"
              placeholder="title"
              className="text-field flex-grow"
            />
            <button type="submit" className="btn" disabled={isUploading}>
              Add
            </button>
          </div>
          <textarea
            name="description"
            placeholder="description"
            className="text-field h-32 resize-none"
          />
        </div>
        <p className="text-xs text-red-400">{data?.errors?.formErrors}</p>
      </Form>
    </div>
  );
}
