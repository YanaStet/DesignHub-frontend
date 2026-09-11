import { commentHooks } from "@/entities/comments/hooks";
import { WorkHooks } from "@/entities/works/hooks";
import { Loader } from "@/shared/custom-ui/Loader";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { Link, useParams } from "react-router-dom";
import { CommentItem } from "./comment-item/Comment";
import { Download } from "lucide-react";
import { getFileTypeLabel, formatFileSize } from "@/shared/utils/fileHelpers";

import { useEffect, useMemo, useState } from "react";
import { WORK_KEYS, type WorkQueryParams } from "@/entities/works/model";
import { WorkCard } from "../../shared/custom-ui/WorkCard";
import { CustomSheet } from "@/shared/custom-ui/CustomSheet";
import { handleApiError } from "@/shared/api/apiError";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Input } from "@/shared/shadcn-ui/ui/input";
import { COMMENT_KEYS } from "@/entities/comments/model";
import { LikeHooks } from "@/entities/likes/hooks";
import { LIKE_KEYS } from "@/entities/likes/model";
import { ReportDialog } from "@/shared/custom-ui/ReportDialog";
import { Spinner } from "@/shared/shadcn-ui/ui/spinner";

export function WorkPage() {
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const [openCommentReportDialog, setOpenCommentReportDialog] = useState(false)
  const [targetCommentId, setTargetCommentId] = useState<string>("")
  const [commentText, setCommentText] = useState("");
  const [openCommentSheet, setOpenCommentSheet] = useState(false);
  const [openSimilarSheet, setOpenSimilarSheet] = useState(false);
  const { workId } = useParams();
  const { me } = useMe();

  const { data, isLoading, isError } = WorkHooks.useGetWorkByIdQuery(
    workId || "",
  );
  const { data: comments, isLoading: isCommentsLoading } =
    commentHooks.useCommentsByWorkIdQuery(workId || "");
  const { data: likes, isLoading: isLikesLoading } = LikeHooks.useGetLikesQuery(
    workId || "",
  );
  const { mutate: view } = WorkHooks.useViewWorkMutation(workId || "");
  const { mutate: like, isPending: isLikePending } = LikeHooks.useToggleLikeMutation(workId || "");

  const queryClient = useQueryClient();

  const params: WorkQueryParams = useMemo(() => {
    const t = data?.tags.map((t) => t.name);
    return {
      tags: t || null,
      q: null,
      limit: null,
      page: null,
    };
  }, [data]);
  const { data: similarWorks } = WorkHooks.useGetAllWorksQuery(params);
  const { mutate: createComment, isPending: isCommentPending } = commentHooks.useCreateCommentMutation();

  const handlePostComment = () => {
    createComment(
      {
        content: commentText,
        designId: workId || "",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [COMMENT_KEYS.COMMENTS] });
          setCommentText("");
        },
        onError: (er) => handleApiError(er),
      },
    );
  };

  const handleToggleLike = async () => {
    like(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [LIKE_KEYS.LIKES] });
      },
      onError: (er) => handleApiError(er),
    });
  };

  useEffect(() => {
    view(undefined, {
      onError: (er) => handleApiError(er),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [WORK_KEYS.GET_WORK_BY_ID] });
      },
    });
  }, []);

  return (
    <div className="flex justify-around">
      <div className="px-15 py-10">
        {isLoading && !isError ? (
          <Loader className="h-[calc(100vh-64px-120px)]" />
        ) : (
          <>
            <div className="flex gap-10">
              <div className="w-130 h-70 2xl:w-165 2xl:h-90 overflow-hidden rounded-2xl">
                {(() => {
                  const fileType = data?.designFile?.fileType;
                  const fileUrl = data?.designFile?.url || data?.designUrl;

                  if (fileType === 'video') {
                    return (
                      <video
                        src={fileUrl}
                        controls
                        className="w-full h-full object-contain bg-black"
                      />
                    );
                  }

                  if (fileType === 'pdf') {
                    return (
                      <div className="w-full h-full flex flex-col">
                        <iframe
                          src={fileUrl}
                          title="PDF Preview"
                          className="w-full flex-1 border-0"
                        />
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex items-center justify-center gap-2 py-2 bg-primary-2 text-white text-sm rounded-b-2xl hover:opacity-90 transition"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      </div>
                    );
                  }

                  if (fileType === 'figma' && data?.designFile?.figmaUrl) {
                    return (
                      <iframe
                        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(data.designFile.figmaUrl)}`}
                        title="Figma Preview"
                        className="w-full h-full border-0"
                        allowFullScreen
                      />
                    );
                  }

                  if (fileType && !['image', 'video', 'pdf'].includes(fileType)) {
                    // Non-previewable files: PSD, AI, Sketch, Figma without URL, Other
                    return (
                      <div className="w-full h-full flex flex-col">
                        {data?.coverUrl ? (
                          <img
                            src={data.coverUrl}
                            alt={data?.title || 'Design'}
                            className="w-full flex-1 object-cover"
                          />
                        ) : (
                          <div className="flex-1 bg-gray-1 flex items-center justify-center">
                            <div className="w-15 h-15 rounded-full bg-gray-2" />
                          </div>
                        )}
                        <div className="flex items-center justify-between px-4 py-3 bg-primary-1 border-t border-gray-2">
                          <div className="flex flex-col gap-0.5">
                            <Typography variant="body3" className="text-gray-4 font-medium">
                              {data?.designFile?.originalName || `${getFileTypeLabel(fileType)} file`}
                            </Typography>
                            <Typography variant="body4" className="text-gray-3">
                              {getFileTypeLabel(fileType)}{data?.designFile?.fileSize ? ` · ${formatFileSize(data.designFile.fileSize)}` : ''}
                            </Typography>
                          </div>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="default" className="bg-primary-2 gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </Button>
                          </a>
                        </div>
                      </div>
                    );
                  }

                  // Default: image or fallback
                  if (fileUrl) {
                    return (
                      <img
                        src={fileUrl}
                        alt={data?.title || 'Photo'}
                        className="object-cover w-full h-full"
                      />
                    );
                  }

                  return (
                    <div className="w-full h-full 2xl:w-80 2xl:h-50 bg-gray-1 rounded-2xl flex items-center justify-center">
                      <div className="w-15 h-15 rounded-full bg-gray-2" />
                    </div>
                  );
                })()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Button
                    className="bg-transparent hover:bg-transparent hover:scale-120 transition-all cursor-pointer duration-300"
                    onClick={handleToggleLike}
                  >
                    {isLikesLoading || isLikePending ? (
                      <Loader />
                    ) : likes?.liked ? (
                      <Icon name="FullHeart" className="w-5" />
                    ) : (
                      <Icon className="w-5" name="HeartOutline" />
                    )}
                  </Button>
                  <Typography variant="h1" className="text-gray-4">
                    {data?.title}
                  </Typography>
                  <Button onClick={() => setOpenReportDialog(true)} className="bg-transparent hover:bg-transparent hover:scale-120 transition-all cursor-pointer duration-300">
                    <Icon name="Report" className="w-5 text-white" />
                  </Button>
                </div>
                <div className="flex gap-1 flex-row items-center mt-5">
                  <Link
                    to={
                      data?.author._id === me?._id
                        ? ROUTE_PATHS.PROFILE
                        : `/users/${data?.author._id}`
                    }
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Typography
                      variant="body4"
                      className="text-primary-3 hover:underline"
                    >
                      {data?.author.firstName} {data?.author.lastName}
                    </Typography>
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-primary-3" />
                  <Typography variant="body4" className="text-primary-3">
                    {new Date(data?.createdAt || "").toLocaleDateString()}
                  </Typography>
                </div>
                <Typography variant="h3" className="text-gray-4 my-3">
                  Tags:
                </Typography>
                {data?.tags && data.tags.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <div
                        key={tag._id}
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

                <Typography variant="h3" className="text-gray-4 my-3">
                  Views: {data?.views}
                </Typography>
              </div>
            </div>
            <div className="mt-5 w-270">
              <Typography variant="body2" className="text-gray-4 break-words">
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
          <Icon name="Comment" className="text-gray-4" />
        </Button>

        {/* other sheet */}
        <Button
          className="w-10 h-10 mt-5 text-gray-4"
          onClick={() => setOpenSimilarSheet(true)}
        >
          <Icon name="Similar" className="text-gray-4" />
        </Button>
      </div>


      <CustomSheet
        title="Comments"
        open={openCommentSheet}
        setOpen={setOpenCommentSheet}
      >
        <div className="flex gap-2">
          <Input
            placeholder="Write your thoughts"
            className="w-full"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            variant="default"
            className="w-10 h-10 bg-primary-2"
            onClick={handlePostComment}
          >
            {isCommentPending ? <Spinner /> : "Add"}
          </Button>
        </div>
        <div className="max-h-[380px] overflow-auto custom-scrollbar-container flex flex-col items-center">
          {isCommentsLoading ? (
            <Loader />
          ) : (
            comments &&
            comments?.map((comment, i) => (
              <CommentItem comment={comment} key={i} setOpenCommentReportDialog={setOpenCommentReportDialog} setTargetCommentId={setTargetCommentId} />
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
          {similarWorks?.data?.map((w, i) =>
            workId !== w._id ? <WorkCard work={w} key={i} /> : null,
          )}
        </div>
      </CustomSheet>

      <ReportDialog open={openReportDialog} setOpen={setOpenReportDialog} type={"Design"} targetId={workId || ""} />
      <ReportDialog open={openCommentReportDialog} setOpen={setOpenCommentReportDialog} type={"Comment"} targetId={targetCommentId || ""} />
    </div>
  );
}
