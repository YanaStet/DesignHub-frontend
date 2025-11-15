import { WorkHooks } from "@/entities/works/hooks";
import { Typography } from "@/shared/shadcn-ui/ui/typography";

export function HomePage() {
  const { data: works } = WorkHooks.useGetAllWorksQuery({
    limit: null,
    skip: null,
    categories: [],
    tags: ["Funny"],
  });
  return (
    <div className="flex">
      {works?.map((w, i) => {
        return (
          <div
            key={i}
            className="rounded border-gray-100 border-2 p-2 m-2 flex flex-col gap-2"
          >
            <Typography variant="h3">{w.title}</Typography>
            <Typography variant="body2">{w.description}</Typography>
            <div className="w-20">
              <img src={`http://127.0.0.1:8000${w.image_url}`} alt="" />
            </div>
            <div className="flex gap-2">
              {w.tags.map((tag, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-2 min-w-10 flex rounded border-2  m-2"
                  >
                    <Typography variant="body3">{tag.name}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
