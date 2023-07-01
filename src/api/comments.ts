import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CommentType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';

type CommentBody = {
  username?: string;
  password?: string;
  content?: string;
};

export const useGetComments = (questionId?: number) => {
  return useInfiniteQuery<{ comments: CommentType[]; isLast: boolean; lastId: number }, AxiosError>(
    ['question', questionId, 'comments'],
    async ({ pageParam }) => {
      const { data } = await axiosInstance.get(
        `/api/golrabas/${questionId}/comments${pageParam ? `?searchAfterId=${pageParam}` : ''}`,
      );
      const { last, size, nextId } = data.data.page;
      const lastId = size + nextId - 1;
      return { comments: data.data.comments, isLast: last, lastId };
    },
    {
      enabled: questionId !== undefined,
      getNextPageParam: ({ isLast, lastId }) => (isLast ? undefined : lastId),
    },
  );
};

export const usePostComment = (questionId?: number) => {
  return useMutation((body: CommentBody) => {
    return axiosInstance.post(`/api/golrabas/${questionId}/comments`, body);
  });
};

export const useDeleteComment = (questionId?: number, commentId?: number) => {
  return useMutation((body: { password?: string }) => {
    return axiosInstance.post(`/api/golrabas/${questionId}/comments/${commentId}`, body);
  });
};
