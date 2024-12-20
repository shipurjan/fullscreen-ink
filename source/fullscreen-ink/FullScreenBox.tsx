import React, {type ComponentPropsWithoutRef, forwardRef} from 'react';
import {Box, type DOMElement, useInput} from 'ink';

import {useScreenSize} from './useScreenSize.js';

export type BoxProps = ComponentPropsWithoutRef<typeof Box>;

export const FullScreenBox = forwardRef<DOMElement, BoxProps>((props, ref) => {
	useInput(() => {}); // prevent input from rendering and shifting the layout
	const {height, width} = useScreenSize();
	return <Box ref={ref} height={height} width={width} {...props} />;
});
