import { fetch } from '../../helpers/fetch';
import { wikiBaseURI } from '../../constants';
import type { ElementTableData } from '../element/types';


const list = async (): Promise<ElementTableData[]> => {

    const $ = await fetch(`${wikiBaseURI}/wiki/Elements`);

    const elements: ElementTableData[] = [];

    const elementNames: string[] = [];

    const elementTable = $('table.wikitable')[0];

    // building up the reactions/descriptions if its the same element
    let formulas: string[] = [];
    let descriptions: string[] = [];


    $(elementTable).find('tbody tr')
    .slice(1)
    .each((i, row) => {
        const $row = $(row);

        // Create element object for every row
        const element: ElementTableData = {
            element: " ",
            statusEffect: " ",
            reactionFormulas: [],
            reactionDescriptions: []
        };

        $row.find('td')
        .each((j, elmData) => {
            const $elmData = $(elmData);
            const text = $elmData.text().trim();

            // Grabbing first non-nested row td which === element name
            // Even if the element has nested rows the first row for that element is NOT nested.
            // this also resets for new elements
            if(j === 0 && text !== "+" && !elementNames.includes(text)) {
                elementNames.push(text);
                element.element = text;
                element.statusEffect = $row.find('td:nth-child(2)').text().trim();
                formulas = [];
                descriptions = [];

            } else if($elmData.has('span').length) { // looping through reaction formulas
                $elmData.find('span a')
                    .each((k, aName) => {
                        const $aName = $(aName).attr('title')!;
                        formulas.push($aName);
                    });

            } else {
                if($elmData.has("b").length) { // reaction descriptions
                    descriptions.push(text);
                }
            } 

        });

        element.reactionFormulas = formulas;
        element.reactionDescriptions = descriptions;
        elements.push(element);
    });

    const filteredElements: ElementTableData[] = [];
    elements.filter( data => {
        if(data.element !== ' ') {
            filteredElements.push(data);
        }
    });
    

    return filteredElements;

};

export default list;