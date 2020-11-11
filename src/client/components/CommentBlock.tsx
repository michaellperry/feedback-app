import * as React from 'react';

import { UserAvatar } from './UserAvatar';

export interface CommentBlockProps {
  self: boolean;
  content: string;
  authorName: string;
};

export const CommentBlock = ({ self, content, authorName }: CommentBlockProps) => {
  const [ expanded, setExpanded ] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [ contentHeight, setContentHeight ] = React.useState(0);
  React.useEffect(() => {
    setContentHeight(contentRef.current?.scrollHeight ?? 0);
  }, [contentRef]);

  function edit() {}

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
          __html: content
        }
      )}>
        
      </div>
      <div className="jinaga-feedback-comment-block-controls">
        {
          self
            ? <button type="button" onClick={ () => edit() }>Edit</button>
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