import { useState, useEffect } from 'react';

export const useBelow1280 = () => {
	const [below1280, setBelow1280] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setBelow1280(window.innerWidth <= 1280);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return below1280;
};
