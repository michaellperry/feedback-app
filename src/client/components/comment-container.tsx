import { Comment, CommentText } from '@shared/model/comment';
import { Mutable, prior } from 'jinaga-react';
import * as React from 'react';
import { j } from '../jinaga-config';
import { CommentData, CommentDialog } from './comment-dialog';
import { CommentBlock } from './comment-block';

export interface CommentContainerProps {
  self: boolean;
  authorName: string;
  comment: Comment;
  commentText: Mutable<CommentText, string>;
};

export const CommentContainer = ({ self, authorName, comment, commentText }: CommentContainerProps) => {
  const saveCommentText = async (value: CommentData) => {
    await j.fact(new CommentText(comment, value.commentText, prior(commentText)));
  };
  const dialogRef = React.useRef<CommentDialog>(null);

  const edit = () => {
    dialogRef.current.begin({
      commentText: commentText.value
    });
  };

  return (
    <>
      <CommentBlock
        self={self}
        authorName={authorName}
        commentText={commentText.value}
        edit={edit}
      />
      <CommentDialog
        ref={dialogRef}
        onSave={saveCommentText} />
    </>
  );
}

