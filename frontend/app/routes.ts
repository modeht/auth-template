import { type RouteConfig, index, layout, prefix } from '@react-router/dev/routes';

export default [...prefix(':lang', [index('routes/home.tsx')])] satisfies RouteConfig;
