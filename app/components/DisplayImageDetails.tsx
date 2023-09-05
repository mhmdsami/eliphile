import { ClipboardCopy } from "lucide-react";
import type { Image as ImageType } from "~/types";
import toast from "~/utils/toast.client";

interface DisplayImageDetailsProps {
  images: ImageType[];
}

export default function DisplayImageDetails({
  images,
}: DisplayImageDetailsProps) {
  return (
    <div className="flex flex-col gap-3 w-2/5 mx-auto">
      <div className="text-xl font-bold">Your Images</div>
      <div className="p-3 rounded-lg grid grid-cols-7 gap-4 bg-black-too items-center place-items-center font-bold">
        <div className="col-span-2 truncate">title</div>
        <div className="col-span-3 truncate">description</div>
        <div className="col-span-1">views</div>
        <div className="col-span-1">copy</div>
      </div>
      {images.map(({ id, title, description, url, views }) => (
        <div
          key={id}
          className="p-3 rounded-lg grid grid-cols-7 gap-4 bg-black-too items-center place-items-center"
        >
          <div className="col-span-2 truncate">{title}</div>
          <div className="col-span-3 truncate">{description}</div>
          <div className="col-span-1">{views}</div>
          <div className="col-span-1">
            <ClipboardCopy
              className="hover:text-primary cursor-pointer"
              width={16}
              onClick={async () => {
                await navigator.clipboard.writeText(url);
                toast.show("Copied to clipboard!", "🚀");
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
