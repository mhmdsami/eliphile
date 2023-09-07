import { ClipboardCopy, Eye } from "lucide-react";
import toast from "~/utils/toast.client";
import type { Image as ImageType } from "~/types";

interface DisplayImageProps extends ImageType {}

export default function DisplayImage({
  url,
  title,
  description,
  views,
}: DisplayImageProps) {
  return (
    <div className="flex flex-col items-center w-[90vw] md:w-[40vw] lg:w-[28vw]">
      <img
        src={url}
        alt={description}
        className="aspect-video object-cover rounded-lg"
        title={`${title}: ${description}`}
      />
      <div className="flex w-full justify-between mt-3">
        <div className="btn flex gap-2">
          <Eye />
          {views}
        </div>
        <div className="btn">
          <ClipboardCopy
            width={20}
            className="cursor-pointer"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              toast.show("Copied to clipboard!", "🚀");
            }}
          />
        </div>
      </div>
    </div>
  );
}
