import { authorizeUser } from '@shared/model/user';
import { authorizeVisit } from '@shared/model/visit';
import { Express } from 'express';
import { AuthorizationRules, JinagaServer } from 'jinaga';

export function configureJinaga(app: Express) {
  const { handler } = JinagaServer.create({
    authorization: configureAuthorization
  });

  app.use('/jinaga', handler);
}

function configureAuthorization(a: AuthorizationRules) {
  return (a
    .with(authorizeVisit)
    .with(authorizeUser)
  );
}
