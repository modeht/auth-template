import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Easygen' }, { name: 'description', content: 'Easygen Auth' }];
}

export default function Home() {
	return <Welcome />;
}
