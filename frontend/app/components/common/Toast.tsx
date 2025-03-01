import { useEffect } from 'react';
import { useMainStore } from '../../store/store';
import { Info } from 'lucide-react';

export function Toast() {
	const toast = useMainStore((state) => state.toast);
	const setToast = useMainStore((state) => state.setToast);

	const bgColor =
		toast.level === 'error' ? 'var(--red-9)' : toast.level === 'success' ? 'var(--cpurple-900)' : 'var(--cgray-700)';

	useEffect(() => {
		if (toast.open) {
			setTimeout(() => {
				setToast({ msg: undefined, html: undefined, timeout: 0, open: false });
			}, toast.timeout);
		}
	}, [toast.open]);

	return (
		<div
			className='max-w-[365px] w-full p-2 fixed md:top-[38px] top-[100px] left-1/2 -translate-x-1/2 z-30'
			style={{
				display: toast.open ? 'block' : 'none',
			}}
		>
			<div
				className='p-3 flex items-center justify-between rounded-[10px] w-full text-base gap-x-2'
				style={{
					background: bgColor,
					color: 'rgba(255, 255, 255, 0.80)',
				}}
			>
				{toast.msg ? <p dangerouslySetInnerHTML={{ __html: toast.msg }}></p> : null}
				{toast.html ? toast.html : null}
				<Info
					size={20}
					className='shrink-0'
				/>
			</div>
		</div>
	);
}
