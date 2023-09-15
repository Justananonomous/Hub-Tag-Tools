export function getRegions(galaxy: string): Set<string> {
	const regionGlyphs = [
		'8191A403',
		'8191A404',
		'8191A405',
		'8191B403',
		'8191B404',
		'8191B405',
		'8191C402',
		'8191C403',
		'8191C404',
		'8191C405',
		'8191C406',
		'8191D403',
		'8191D404',
		'8191D405',
		'8291A403',
		'8291A404',
		'8291A405',
		'8291B403',
		'8291B404',
		'8291B405',
		'8291C403',
		'8291C404',
		'8291C405',
		'8291D404',
		'8391C404',
	];
	const EucCoreGlyphs = [
		'F3556C2D',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	];
	if (galaxy == 'Euclid')
		regionGlyphs.splice(-2, 2, ...EucCoreGlyphs);

return new Set(regionGlyphs);

}