import { ClipboardCopy, Eye } from "lucide-react";
import type { Image as ImageType } from "~/types";

interface DisplayImageProps extends ImageType {}

export default function DisplayImage({ url, title, description, views }: DisplayImageProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={url}
        alt={description}
        className="w-[40vw] h-[45vh] object-cover"
        title={`${title}: ${description}`}
      />
      <div className="flex justify-between w-[40vw] mt-5">
        <div className="btn">
          <ClipboardCopy
            width={20}
            className="cursor-pointer"
            onClick={async () => await navigator.clipboard.writeText(url)}
          />
        </div>
        <div className="btn flex gap-2">
          <Eye />{views}
        </div>
      </div>
    </div>
  );
}
