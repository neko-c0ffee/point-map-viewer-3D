import { useState, useEffect, useRef } from 'react';
import './scss/Navbar.scss'
import CsvURLInput from './CsvURLInput';

function Navbar({ onFetch, savedUrl }: { onFetch: (url: string) => void; savedUrl: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	return (
		<div ref={navbarRef}>
			<nav className='navbar'>
				<div className='nav-left'>
					<h1 className='title'>座標マップビュアー</h1>
				</div>
				<div className='nav-right'>
					<button className='secondary' onClick={() => setIsOpen(!isOpen)}>データ元設定</button>
					{isOpen && <CsvURLInput onFetch={onFetch} initialUrl={savedUrl} />}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;