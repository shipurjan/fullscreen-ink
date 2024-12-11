import React from 'react';
import meow from 'meow';
import {DemoApp} from './app.js';
import {withFullScreen} from './fullscreen-ink/withFullScreen.js';

const cli = meow(
	`
	Usage
	  $ fullscreen-ink

	Options
		--name  Your name

	Examples
	  $ fullscreen-ink --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

function waitOneSecond() {
	return new Promise(resolve => setTimeout(resolve, 1000));
}
const ink = withFullScreen(<DemoApp name={cli.flags.name} />);

console.log('Launching app in 1 second...');
await waitOneSecond();

await ink.start();

await ink.waitUntilExit();
console.log('Exited full screen app!');
