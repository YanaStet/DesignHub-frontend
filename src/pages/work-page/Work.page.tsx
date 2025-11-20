import { WorkHooks } from "@/entities/works/hooks";
import { API_URL } from "@/shared/api";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useParams } from "react-router-dom";

export function WorkPage() {
  const { workId } = useParams();
  const { data } = WorkHooks.useGetWorkByIdQuery(Number(workId));

  return (
    <>
      <Typography variant="h2" className="text-white">
        {data?.title}
      </Typography>
      <img
        src={API_URL + data?.image_url}
        alt="Photo"
        className="object-cover w-full rounded-2xl"
      />
    </>
  );
}
