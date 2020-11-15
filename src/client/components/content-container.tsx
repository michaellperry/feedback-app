import { Comment, CommentText } from "@shared/model/comment";
import { Content } from "@shared/model/site";
import { UserName } from "@shared/model/user";
import { collection, field, jinagaContainer, mapProps, mutable, property, specificationFor } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";
import { CommentContainer } from "./comment-container";

const commentSpecification = specificationFor(Comment, {
  comment: field(c => c),
  commentText: mutable(j.for(CommentText.forComment), candidates => candidates.length > 0 ? candidates[0].value : ""),
  author: field(c => c.author),
  authorName: property(j.for(Comment.author).then(UserName.forUser), n => n.value, "")
});

const commentMapping = mapProps(commentSpecification).to(({ comment, commentText, authorName }) => (
  <CommentContainer comment={comment} self={true} authorName={authorName} commentText={commentText} />
));

const contentSpecification = specificationFor(Content, {
  Comments: collection(j.for(Comment.forContent), commentMapping)
});

const contentMapping = mapProps(contentSpecification).to(({ Comments }) => (
  <div>
    <h3>Comments</h3>
    <Comments />
  </div>
));

export const ContentContainer = jinagaContainer(j, contentMapping);