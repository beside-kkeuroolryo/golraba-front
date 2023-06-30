import { useCallback } from 'react';
import { UseInputReturn } from '@/hooks/useInput';
import usePostCommentModal from '@/hooks/usePostCommentModal';
import { ReactComponent as Submit } from '@/assets/icons/submit.svg';

type CommentForm = {
  comment?: UseInputReturn;
  hasChosen?: boolean;
};

export default function CommentForm({ comment, hasChosen }: CommentForm) {
  const [renderPostCommentModal, handleOpenModal] = usePostCommentModal(comment);
  const isButtonDisabled = !hasChosen || comment?.value.length === 0;

  const handleOpenPostModal = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      handleOpenModal();
    },
    [handleOpenModal],
  );
  return (
    <>
      <form
        className="font-15 fixed bottom-0 flex items-center justify-between bg-white px-24 font-medium"
        onSubmit={handleOpenPostModal}
      >
        <input
          type="text"
          value={comment?.value}
          onChange={comment?.onChange}
          placeholder="답변 선택을 해야 입력할 수 있어요."
          className="my-8 w-[86%] rounded-20 bg-background px-16 py-10 placeholder:text-placeholder"
          disabled={!hasChosen}
        />
        <button className="text-dark disabled:text-tertiary" disabled={isButtonDisabled}>
          <Submit role="img" />
        </button>
      </form>
      {renderPostCommentModal()}
    </>
  );
}
