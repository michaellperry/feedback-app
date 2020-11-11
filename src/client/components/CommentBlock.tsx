import * as React from 'react';

import { UserAvatar } from './UserAvatar';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { j } from '../jinaga-config';
import { Comment, CommentText } from '@shared/model/comment';
import { Mutable, prior } from 'jinaga-react';

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

  const [ editContent, setEditContent ] = React.useState("");
  const [ editing, setEditing ] = React.useState(false);

  const edit = () => {
    setEditContent(commentText.value);
    setEditing(true);
  }
  const close = () => {
    setEditing(false);
  }
  const save = () => {
    j.fact(new CommentText(comment, editContent, prior(commentText)))
    close();
  }

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
              ? <Button onClick={() => edit()} variant="contained" color="primary">Edit</Button>
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
      <Dialog open={editing} onClose={() => close()}>
          <DialogTitle>Edit Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>What did you mean to say?</DialogContentText>
            <TextField
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => save()} variant="contained" color="primary">Save</Button>
            <Button onClick={() => close()} color="default">Cancel</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}