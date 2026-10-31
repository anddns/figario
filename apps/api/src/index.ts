import { APP_NAME } from '@figario/shared';
import { Elysia } from 'elysia';
import { env } from './env';

const app = new Elysia().get('/', () => ({ name: APP_NAME })).listen(env.PORT);

console.log(`${APP_NAME} API running on http://${app.server?.hostname}:${app.server?.port}`,);
