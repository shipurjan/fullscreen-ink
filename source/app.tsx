import React, {useContext} from 'react';
import {Box, Text, useApp} from 'ink';
import {useEffect, createContext} from 'react';

interface IAppContext {
	name: string;
}
const AppContext = createContext<IAppContext | undefined>(undefined);
const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('Context provider not found');
	}
	return context;
};

interface IDemoAppProps extends Partial<IAppContext> {}

export const DemoApp = ({name = 'world'}: IDemoAppProps) => {
	const [state, setState] = React.useState<'hello' | 'goodbye'>('hello');
	useEffect(() => {
		setTimeout(() => setState('goodbye'), 1000);
	});
	return (
		<AppContext.Provider value={{name}}>
			{state === 'hello' ? <Hello /> : <GoodbyeWorld />}
		</AppContext.Provider>
	);
};

function Hello() {
	const {name} = useAppContext();
	return (
		<Box
			flexGrow={1}
			borderStyle="round"
			alignItems="center"
			justifyContent="center"
		>
			<Text>Hello, {name}!</Text>
		</Box>
	);
}

function GoodbyeWorld() {
	const {name} = useAppContext();
	const app = useApp();
	useEffect(() => {
		setTimeout(app.exit, 1000);
	}, [app.exit]);
	return (
		<Box
			flexGrow={1}
			borderStyle="round"
			alignItems="center"
			justifyContent="center"
		>
			<Text>Goodbye, {name}! Exiting in 1 second...</Text>
		</Box>
	);
}
