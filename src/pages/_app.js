import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((pageEl) => pageEl);

	return getLayout(<Component {...pageProps} />);
}
