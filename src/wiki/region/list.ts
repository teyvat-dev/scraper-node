import { fetch } from '../../helpers/fetch'
import { wikiBaseURI } from '../../constants';
import type { RegionTableData } from '../region/types';

const list = async (): Promise<RegionTableData[]> => {
    const $ = await fetch(`${wikiBaseURI}/wiki/Teyvat`);
    const regionTableData: RegionTableData[] = [];
    $('table.wikitable').find('tbody tr')
    .slice(1)
    .each((i, element) => {
        const $row = $(element);
        const regionData: string[] = [];
        $row.find('td').each((j, data) => {
            const $data = $(data).text().trim();
            if($data.charAt($data.length - 3) === '[') {
                const $dataSubStr = $data.substring(0, $data.length - 3);
                regionData.push($dataSubStr);
            } else {
                regionData.push($data)
            }
        });
        const region: RegionTableData = { 
            nation: regionData[0], 
            element: regionData[1], 
            archon: regionData[2], 
            ideal: regionData[3],
            governingBody: regionData[4] 
        }
        regionTableData.push(region);
        
    });
    return regionTableData;
};

export default list 
    