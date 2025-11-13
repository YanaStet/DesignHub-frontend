import { WorkHooks } from "@/entities/works/hooks";

export function HomePage() {
  const { data: works } = WorkHooks.useGetAllWorksQuery();
  console.log(works);
  return (
    <div>
      {works?.map((w, i) => {
        return (
          <div key={i}>
            <img src={`http://127.0.0.1:8000${w.image_url}`} alt="" />
          </div>
        );
      })}
    </div>
  );
}
