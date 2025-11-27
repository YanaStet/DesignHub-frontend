import type { Work } from "@/entities/works/model";
import { BASE_URL } from "@/shared/api";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { Link } from "react-router-dom";

export function WorkCard(work: Work) {
  return (
    <Link
      to={`/works/${work.id}`}
      className="flex p-3 gap-3 flex-col bg-primary-1 rounded-2xl hover:scale-103 transition-transform duration-400"
    >
      <div className="w-50 h-30 2xl:w-70 2xl:h-40 flex justify-center overflow-hidden">
        {work.image_url !== null ? (
          <img
            src={BASE_URL + work.image_url}
            alt="Photo"
            className="object-cover w-full rounded-2xl"
          />
        ) : (
          <div className="w-50 h-30 2xl:w-80 2xl:h-50 bg-gray-1 rounded-2xl flex items-center justify-center">
            <div className="w-15 h-15 rounded-full bg-gray-2" />
          </div>
        )}
      </div>
      <div className="flex gap-1 flex-row items-center">
        <Link
          to={`/users/${work.designer.id}`}
          onClick={(event) => event.stopPropagation()}
        >
          <Typography
            variant="body4"
            className="text-primary-3 hover:underline"
          >
            {work.designer.firstName} {work.designer.lastName}
          </Typography>
        </Link>
        <span className="h-1 w-1 rounded-full bg-primary-3" />
        <Typography variant="body4" className="text-primary-3">
          {new Date(work.upload_date).toISOString().split("T")[0]}
        </Typography>
      </div>
      <Typography variant="h4" className="text-white w-50 truncate">
        {work.title}
      </Typography>
      <Typography
        variant="body4"
        className="text-gray-4 w-50 break-words truncate"
      >
        {work.description}
      </Typography>
      {work.tags && (
        <div className="mt-2 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <div
              key={tag.id}
              className="text-gray-1 px-2 py-1 rounded-xl bg-gray-3 text-sm"
            >
              {tag.name}
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
