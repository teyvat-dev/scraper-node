## Teyvat Dev Scraper Node

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

Teyvat Dev Microservice scrapers written in node

### Why

With Genshin Impact updating consistency there is a need for automation, these scrapers help with that task, although not perfect they will assist with the upkeep of up to date information in the API

## How to contribute

### Requirements

- [Node](https://nodejs.org/en/) >= 12.x
- [Yarn](https://yarnpkg.com/) or [NPM]
- [direnv](https://formulae.brew.sh/formula/direnv) for easy env loading

### Resources

This project uses cheerio for parsing of website dom, and subsequently scraping. please visit the [Docs](https://cheerio.js.org/) for more information. If you know JQuery this should be a breeze.

### Setup

1. Fork the repo and clone it to your local machine
2. Copy or Move the `.envrc.example` to `.envrc` and then run `direnv allow` to initialize environment variables
3. Yarn or NPM your workspace (I prefer yarn and upload a yarn.lock, I will not merge `package.lock` in PRs) with `yarn install` or `npm install`
4. Test your installation by running `yarn dev` and navigating to `localhost:8080` by default this should return a list of all playable characters

### Changing the test function

You can change the function you are testing / working on by changing the `FUNCTION_TARGET` env variable in `.envrc`.

> Remember to reload your env with `direnv allow` after you have made any environment variable changes

## Progress

- [ ] Artifacts
- [ ] ArtifactSets
- [ ] Characters **Current Development**
- [ ] CharacterAscensions
- [ ] CharacterAscensionMaterials
- [ ] CharacterProfiles **Current Development**
- [ ] CommonAscensionMaterials
- [ ] CommonMaterials
- [ ] Consumeables
- [ ] ConsumeableRecipes
- [ ] CookingMaterials
- [ ] CraftingMaterials
- [ ] Domains
- [ ] Elements
- [ ] ForgeRecipes
- [ ] Regions
- [ ] Talents **Current Development**
- [ ] TalentLevelUpMaterials
- [ ] Weapons
- [ ] WeaponAscensions
- [ ] WeaponAscensionMaterials
- [ ] WeaponEnhancementMaterials
