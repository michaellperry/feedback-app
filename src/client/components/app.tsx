import * as React from 'react';
import '../styles/app';
import { CommentBlock } from "./CommentBlock";

export const App = () => {
  return (
    <>
      <CommentBlock self={false} content="<p>Content goes here</p>" />
    </>
  );
};
