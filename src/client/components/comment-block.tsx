import Button from '@material-ui/core/Button';
import * as React from "react";
import { UserAvatar } from './user-avatar';

export interface CommentBlockProps {
  self: boolean;
  authorName: string;
  commentText: string;
  edit(): void;
};

export const CommentBlock = ({ self, authorName, commentText, edit }: CommentBlockProps) => {
  const [ expanded, setExpanded ] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [ contentHeight, setContentHeight ] = React.useState(0);
  React.useEffect(() => {
    setContentHeight(contentRef.current?.scrollHeight ?? 0);
  }, [contentRef]);

  return (
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
          __html: commentText
        }
      )}>
        
      </div>
      <div className="jinaga-feedback-comment-block-controls">
        {
          self
            ? <Button onClick={edit} variant="contained" color="primary">Edit</Button>
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
  );
}
