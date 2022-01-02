import {useHello} from '../client/hooks/api/hello';

export default function Home() {
	const {data: {time} = {time: Date.now()}} = useHello();
	return <div>{time}</div>;
}
