import '@picocss/pico';
import './styles.css';
// the order of the CSS imports is IMPORTANT, DO NOT change it!!!
import { getRegions } from './getRegions';
import { checkGlyphs, getRegionNum, getSIV } from './glyphLogic';
import { globalElements } from './elementStore';
import { OutputObj } from './formActions';

export let galaxy: string;
const systemIndexLength = 3;

// hides the main element if no galaxy is given
hideMain();

// changes the "other pages" link if on subdomain
const COREHosts = ['coretag.nmscore.com', 'core-tag.nmscore.com', 'core-tag-generator.nmscore.com'];
if (COREHosts.includes(window.location.host)) (document.querySelector('a[href=".."]') as HTMLAnchorElement).href = 'https://NerdMachine0.github.io/';	// 'https://nmscore.com';

// hides the main element if no galaxy is given
export function hideMain() {
	const dropdownId = 'galaxyInput';
	const tocId = 'toc';
	const dropdownElement = globalElements.input![dropdownId] as HTMLSelectElement;
	const tocElement = globalElements.output![tocId] as HTMLUListElement;
	const mainElement = document.querySelector('main') as HTMLElement;
	galaxy = dropdownElement.value;
	([mainElement, tocElement]).forEach(element => element.style.display = galaxy ? '' : 'none');
}

// gets section of clicked element
export function getSectionId(element: HTMLElement) {
	return element.closest('section')!.id;
}

export function generateTag(): OutputObj {
	const glyphInputId = 'portalglyphsInput';
	const glyphInputElement = globalElements.input![glyphInputId] as HTMLInputElement;
	const glyphs = glyphInputElement.value;
	const { isValid, error = '' } = checkGlyphs(glyphInputElement, true);

	if (!glyphs) return { status: '', output: '' };

	if (!isValid) return { status: 'Error:', output: error };

	const regionNum = getRegionNum(glyphs);
	const SIV = getSIV(glyphs);
	const tag = `[CORE${regionNum}-${SIV}]`;
	return { status: 'Your CORE Tag:', output: tag };
}

export function decodeTag(): OutputObj {
	const tagInputId = 'tagInput';
	const tagInputElement = globalElements.input![tagInputId] as HTMLInputElement;
	const input = tagInputElement.value.replaceAll(/[\[\]]/g, '').replaceAll('68+1', '69').trim();	// NoSonar the escape character is necessary
	if (!input) return { status: '', output: '' };
	const regions = Array.from(getRegions());
	const [CORE, sysIndex] = input.split('-');
	const regionNum = CORE.replace('CORE', '');
	const regionIndex = parseInt(regionNum) - 1;
	const regionCode = regions[regionIndex];

	if (!sysIndex || !regionCode || !CORE.startsWith('CORE')) {
		let errorMessage = '';
		if (!sysIndex) {
			errorMessage = 'Invalid CORE tag format (missing "-")';
		} else if (!regionCode || !CORE.startsWith('CORE')) {
			errorMessage = 'Invalid CORE tag format (no "CORE" or wrong region ID)';
		}
		return { status: 'Error:', output: errorMessage };
	}

	const planetIndex = '0';
	const sysIndexStr = sysIndex.padStart(systemIndexLength, '0');
	const glyphStr = planetIndex + sysIndexStr + regionCode;

	return { status: 'Glyphs:', output: glyphStr };
}