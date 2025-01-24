import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';

export class StrictTSConfig extends Post {
	public name = 'A strict TSConfig';
	public slug = 'strict-tsconfig';
	public date = new Date('08 Sep 2022');
	public hidden = true;
	public excerpt = 'The strictest TypeScript configuration possible.';
	public keywords = ['strict', 'tsconfig', 'typescript'];

	public render() {
		return (
			<Highlighter>
				{stripIndent`
					{
						"compilerOptions": {
							"moduleResolution": "NodeNext",
							"module": "NodeNext",
							"target": "ESNext",
							"strict": true,
							"noEmit": true,
							"useUnknownInCatchVariables": true,
							"noImplicitOverride": true,
							"noFallthroughCasesInSwitch": true,
							"noUnusedLocals": true,
							"noUnusedParameters": true,
							"exactOptionalPropertyTypes": true,
							"noImplicitReturns": true,
							"noUncheckedIndexedAccess": true,
							"allowImportingTsExtensions": true,
							"verbatimModuleSyntax": true,
							"isolatedModules": true
						}
					}
                		`}
			</Highlighter>
		);
	}
}
