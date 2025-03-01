import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	...prefix(':lang', [index('routes/home.tsx'), route('/auth', 'routes/auth.tsx')]),
] satisfies RouteConfig;
