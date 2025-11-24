import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { BASE_URL } from "@/shared/api";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useParams } from "react-router-dom";

export function DesignerProfilePage() {
  const { userId } = useParams();
  const { data } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    Number(userId)
  );

  return (
    <>
      <Typography variant="h2" className="text-white">
        {data?.bio}
      </Typography>
      <img
        src={BASE_URL + data?.header_image_url}
        alt="Photo"
        className="object-cover w-full rounded-2xl"
      />
    </>
  );
}
