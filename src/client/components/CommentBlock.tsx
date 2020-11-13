import Button from '@material-ui/core/Button';
import { Comment, CommentText } from '@shared/model/comment';
import { Mutable, prior } from 'jinaga-react';
import * as React from 'react';
import { j } from '../jinaga-config';
import { useEditor } from './comment-dialog';
import { UserAvatar } from './UserAvatar';

export interface CommentBlockProps {
  self: boolean;
  authorName: string;
  comment: Comment;
  commentText: Mutable<CommentText, string>;
};

export const CommentBlock = ({ self, authorName, comment, commentText }: CommentBlockProps) => {
  const [ expanded, setExpanded ] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [ contentHeight, setContentHeight ] = React.useState(0);
  React.useEffect(() => {
    setContentHeight(contentRef.current?.scrollHeight ?? 0);
  }, [contentRef]);

  const saveCommentText = async (value: string) => {
    await j.fact(new CommentText(comment, value, prior(commentText)));
  };
  const [ beginComentEditor, CommentEditor ] = useEditor(saveCommentText);

  return (
    <>
      <div className="jinaga-feedback-comment-block">
        <div className="jinaga-feedback-comment-block-info">
          <UserAvatar name={authorName} />
          <p>{ new Date().toLocaleTimeString() }</p>
          <p>{ new Date().toLocaleDateString() }</p>
        </div>
        <div
          ref={contentRef}
          className={
            "jinaga-feedback-comment-block-content" +
            (expanded
              ? " jinaga-feedback-comment-block-content-expanded"
              : " jinaga-feedback-comment-block-content-collapsed")
          }
          dangerouslySetInnerHTML={(
          {
            __html: commentText.value
          }
        )}>
          
        </div>
        <div className="jinaga-feedback-comment-block-controls">
          {
            self
              ? <Button onClick={() => beginComentEditor(commentText.value)} variant="contained" color="primary">Edit</Button>
              : <></>
          }
          {
            contentHeight > 200
              ? <button type="button" onClick={ () => setExpanded(!expanded) }>
                  Show { expanded ? "less" : "more" }
                </button>
              : <></>
          }
        </div>
      </div>
      <CommentEditor />
    </>
  );
}