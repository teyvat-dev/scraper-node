import asyncPool from 'tiny-async-pool';
import { fetch } from '../../helpers/fetch';

const removeTitles = (
  original: { title: string; story: string }[],
  remove: string[]
) => {
  const temp = original;
  for (const removalString of remove) {
    const removeIndex = temp.findIndex(item =>
      item.title.includes(removalString)
    );
    if (removeIndex !== -1) {
      temp.splice(removeIndex, 1);
    }
  }
  return temp;
};

const story = async (
  links: string[]
): Promise<{ name: string; story: { [key: string]: string } }[]> =>
  asyncPool(10, links, async link => {
    const $ = await fetch(link);

    const content = $('#content');

    let stories = content
      .find('h3')
      .toArray()
      .map((element, i) => {
        var title = $(element).text();
        title.replace('.', '\\.');
        title.replace('-', '\\-');
        const story = content
          .find(`h3:nth-of-type(${i + 1})`)
          .nextUntil(':header')
          .text();
        return { title, story };
      });

    stories = removeTitles(stories, [
      'Story Quests',
      'Archon Quests',
      'Events',
      'Etymology',
    ]);

    return {
      name: link.split('/')[link.split('/').length - 2],
      story: stories.reduce(
        (obj: { [key: string]: string }, item) => (
          (obj[item.title] = item.story), obj
        ),
        {}
      ),
    };
  });

export default story;
