import { Comment, CommentText } from "@shared/model/comment";
import { Content } from "@shared/model/site";
import { UserName } from "@shared/model/user";
import { collection, field, jinagaContainer, mapProps, property, specificationFor } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";
import { CommentBlock } from "./CommentBlock";

const commentSpecification = specificationFor(Comment, {
  text: property(j.for(CommentText.forComment), ct => ct.value, ""),
  authorName: property(j.for(Comment.author).then(UserName.forUser), n => n.value, ""),
  self: field(c => j.hash(c.author) === j.hash(c.content.site.createdBy))
});

const commentMapping = mapProps(commentSpecification).to(({ text, authorName, self }) => (
  <CommentBlock content={text} self={self} authorName={authorName} />
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