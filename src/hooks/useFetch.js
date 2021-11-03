import { useCallback, useState } from 'react';

export default function useFetch(apiFunc, initialData = null) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(
		async (...args) => {
			try {
				setLoading(true);
				setData(await apiFunc(...args));
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[apiFunc]
	);

	return [request, data, loading, error];
}
