import { commentHooks } from "@/entities/comments/hooks";
import { WorkHooks } from "@/entities/works/hooks";
import { BASE_URL } from "@/shared/api";
import { Loader } from "@/shared/custom-ui/Loader";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { Link, useParams } from "react-router-dom";
import { CommentItem } from "./comment-item/Comment";
import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";

import { useMemo, useState } from "react";
import type { WorkQueryParams } from "@/entities/works/model";
import { AddCommentDialog } from "./add-comment-dialog/AddCommentDialog";
import { WorkCard } from "../../shared/custom-ui/WorkCard";
import { CustomSheet } from "@/shared/custom-ui/CustomSheet";

export function WorkPage() {
  const [open, setOpen] = useState(false);
  const [openCommentSheet, setOpenCommentSheet] = useState(false);
  const [openSimilarSheet, setOpenSimilarSheet] = useState(false);
  const { workId } = useParams();
  const { data, isLoading, isError } = WorkHooks.useGetWorkByIdQuery(
    Number(workId)
  );
  const { data: comments, isLoading: isCommentsLoading } =
    commentHooks.useCommentsByWorkIdQuery(Number(workId));
  const { data: profile } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    data?.designer_id || -1
  );

  const params: WorkQueryParams = useMemo(() => {
    const cat = data?.categories.map((c) => String(c.id));
    const t = data?.tags.map((t) => t.name);
    return {
      categories: cat || null,
      tags: t || null,
      q: null,
      limit: null,
      skip: null,
    };
  }, [data]);
  const { data: similarWorks } = WorkHooks.useGetAllWorksQuery(params);

  return (
    <div className="flex justify-around">
      <div className="px-15 py-10">
        {isLoading && !isError ? (
          <Loader className="h-[calc(100vh-64px-120px)]" />
        ) : (
          <>
            <div className="flex gap-10">
              <div className="w-130 h-70 2xl:w-165 2xl:h-90 overflow-hidden rounded-2xl">
                {data?.image_url ? (
                  <img
                    src={BASE_URL + data.image_url}
                    alt="Photo"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full 2xl:w-80 2xl:h-50 bg-gray-1 rounded-2xl flex items-center justify-center">
                    <div className="w-15 h-15 rounded-full bg-gray-2" />
                  </div>
                )}
              </div>
              <div>
                <Typography variant="h1" className="text-white">
                  {data?.title}
                </Typography>
                <div className="flex gap-1 flex-row items-center mt-5">
                  <Link
                    to={`/users/${data?.designer_id}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Typography
                      variant="body4"
                      className="text-primary-3 hover:underline"
                    >
                      {data?.designer.firstName} {data?.designer.lastName}
                    </Typography>
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-primary-3" />
                  <Typography variant="body4" className="text-primary-3">
                    {
                      new Date(data?.upload_date || "")
                        .toISOString()
                        .split("T")[0]
                    }
                  </Typography>
                </div>
                <Typography variant="h3" className="text-white my-5">
                  Tags:
                </Typography>
                {data?.tags && data.tags.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="text-gray-1 px-2 py-1 rounded-xl bg-gray-3 text-sm"
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant="body3" className="text-gray-3">
                    There is no tags yet.
                  </Typography>
                )}
                <Typography variant="h3" className="text-white my-5">
                  Categories:
                </Typography>
                {data?.categories && data.categories.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.categories.map((category) => (
                      <div
                        key={category.id}
                        className="text-gray-1 px-2 py-1 rounded-xl bg-gray-3 text-sm"
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant="body3" className="text-gray-3">
                    There is no categories yet.
                  </Typography>
                )}
              </div>
            </div>
            <div className="mt-5 w-270">
              <Typography variant="body2" className="text-gray-7 break-words">
                {data?.description}
              </Typography>
            </div>
          </>
        )}
      </div>
      <div className="w-15 flex flex-col gap-5 items-center">
        <Button
          className="w-10 h-10 mt-5"
          onClick={() => setOpenCommentSheet(true)}
        >
          <Icon name="Comment" />
        </Button>

        {/* other sheet */}
        <Button
          className="w-10 h-10 mt-5"
          onClick={() => setOpenSimilarSheet(true)}
        >
          <Icon name="Similar" />
        </Button>
      </div>
      <AddCommentDialog open={open} setOpen={setOpen} workId={Number(workId)} />

      <CustomSheet
        title="Comments"
        open={openCommentSheet}
        setOpen={setOpenCommentSheet}
      >
        <Button
          variant="default"
          className="w-full bg-primary-2"
          onClick={() => setOpen(true)}
        >
          Add comment
        </Button>
        <div className="max-h-[380px] overflow-auto custom-scrollbar-container flex flex-col items-center">
          {isCommentsLoading ? (
            <Loader />
          ) : (
            comments?.map((comment, i) => (
              <CommentItem
                comment={comment}
                key={i}
                designerAvatarUrl={profile?.avatar_url || null}
              />
            ))
          )}
          {(comments?.length || 0) < 1 && (
            <Typography variant="h4" className="text-gray-3 mt-30">
              There is no comments yet
            </Typography>
          )}
        </div>
      </CustomSheet>

      <CustomSheet
        title="Similar works"
        open={openSimilarSheet}
        setOpen={setOpenSimilarSheet}
        className="w-70"
      >
        <div className="max-h-[420px] overflow-y-auto flex flex-col items-center custom-scrollbar-container gap-3">
          {similarWorks?.map((w, i) =>
            Number(workId) !== w.id ? <WorkCard {...w} key={i} /> : null
          )}
        </div>
      </CustomSheet>
    </div>
  );
}
