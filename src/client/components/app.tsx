import { Comment, CommentText } from "@shared/model/comment";
import { Content, Site } from "@shared/model/site";
import { User, UserName } from "@shared/model/user";
import * as React from 'react';
import { j } from "../jinaga-config";
import '../styles/app';
import { ContentContainer } from "./content-container";

const makeContent = async () => {
  const user = await j.fact(new User("An RSA public key goes here"));
  const site = await j.fact(new Site(user, "425b853b-8208-46b1-868a-275b35eaba7d"));
  const visitor = await j.fact(new User("A site visitor"));
  const visitorName = await j.fact(new UserName(visitor, "Gabriel Iglesias", []));
  const content = await j.fact(new Content(site, "/path/to/content"));
  const comment = await j.fact(new Comment("16f359cc-4125-4259-ab22-481a95dcc7f7", content, visitor));
  const commentContent = await j.fact(new CommentText(comment, "This is an awesome site", []));

  return content;
}

export const App = () => {
  const [ content, setContent ] = React.useState<Content>();
  React.useEffect(() => {
    makeContent().then(setContent);
  }, []);

  return (
    <>
      <ContentContainer fact={content} />
    </>
  );
};
