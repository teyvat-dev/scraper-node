import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError };
export { PrismaClientUnknownRequestError };
export { PrismaClientRustPanicError };
export { PrismaClientInitializationError };
export { PrismaClientValidationError };

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw };

/**
 * Prisma Client JS version: 2.7.0
 * Query Engine version: eaade828a21d8ee3f4940f0af7da3ae0922db4df
 */
export declare type PrismaVersion = {
  client: string;
};

export declare const prismaVersion: PrismaVersion;

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export declare type JsonObject = { [Key in string]?: JsonValue };

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = { [Key in string]?: JsonValue };

export declare interface InputJsonArray extends Array<JsonValue> {}

export declare type InputJsonValue =
  | undefined
  | string
  | number
  | boolean
  | null
  | InputJsonObject
  | InputJsonArray;

declare type SelectAndInclude = {
  select: any;
  include: any;
};

declare type HasSelect = {
  select: any;
};

declare type HasInclude = {
  include: any;
};

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S;

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<
  T extends PromiseLike<any>
> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<
  T extends (...args: any) => Promise<any>
> = PromiseType<ReturnType<T>>;

export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key;
}[keyof T];

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>;

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(
    prisma: PrismaClient<any, any>,
    debug?: boolean,
    hooks?: Hooks | undefined
  );
  request<T>(
    document: any,
    dataPath?: string[],
    rootField?: string,
    typeName?: string,
    isList?: boolean,
    callsite?: string
  ): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(
    document: any,
    data: any,
    path: string[],
    rootField?: string,
    isList?: boolean
  ): any;
}

/**
 * Client
 **/

export declare type Datasource = {
  url?: string;
};

export type Datasources = {
  db?: Datasource;
};

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources;

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat;

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   *
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>;
}

export type Hooks = {
  beforeRequest?: (options: {
    query: string;
    path: string[];
    rootField?: string;
    typeName?: string;
    document: any;
  }) => any;
};

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export type GetLogType<
  T extends LogLevel | LogDefinition
> = T extends LogDefinition
  ? T['emit'] extends 'event'
    ? T['level']
    : never
  : never;
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition>
  ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never;

export type QueryEvent = {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
};

export type LogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};
/* End Types for Logging */

export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate';

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string;
  action: PrismaAction;
  args: any;
  dataPath: string[];
  runInTransaction: boolean;
};

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>
) => Promise<T>;

// tested in getLogLevel.test.ts
export declare function getLogLevel(
  log: Array<LogLevel | LogDefinition>
): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Characters
 * const characters = await prisma.character.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<LogLevel | LogDefinition>
      ? GetEvents<T['log']>
      : never
    : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Characters
   * const characters = await prisma.character.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void
  ): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void
  ): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;

  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;

  /**
   * `prisma.character`: Exposes CRUD operations for the **Character** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Characters
   * const characters = await prisma.character.findMany()
   * ```
   */
  get character(): CharacterDelegate;

  /**
   * `prisma.characterAscension`: Exposes CRUD operations for the **CharacterAscension** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CharacterAscensions
   * const characterAscensions = await prisma.characterAscension.findMany()
   * ```
   */
  get characterAscension(): CharacterAscensionDelegate;

  /**
   * `prisma.characterProfile`: Exposes CRUD operations for the **CharacterProfile** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CharacterProfiles
   * const characterProfiles = await prisma.characterProfile.findMany()
   * ```
   */
  get characterProfile(): CharacterProfileDelegate;

  /**
   * `prisma.talent`: Exposes CRUD operations for the **Talent** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Talents
   * const talents = await prisma.talent.findMany()
   * ```
   */
  get talent(): TalentDelegate;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Elements
   * const elements = await prisma.element.findMany()
   * ```
   */
  get element(): ElementDelegate;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Regions
   * const regions = await prisma.region.findMany()
   * ```
   */
  get region(): RegionDelegate;

  /**
   * `prisma.weapon`: Exposes CRUD operations for the **Weapon** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Weapons
   * const weapons = await prisma.weapon.findMany()
   * ```
   */
  get weapon(): WeaponDelegate;

  /**
   * `prisma.weaponAscension`: Exposes CRUD operations for the **WeaponAscension** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WeaponAscensions
   * const weaponAscensions = await prisma.weaponAscension.findMany()
   * ```
   */
  get weaponAscension(): WeaponAscensionDelegate;

  /**
   * `prisma.commonAscensionMaterial`: Exposes CRUD operations for the **CommonAscensionMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CommonAscensionMaterials
   * const commonAscensionMaterials = await prisma.commonAscensionMaterial.findMany()
   * ```
   */
  get commonAscensionMaterial(): CommonAscensionMaterialDelegate;

  /**
   * `prisma.weaponAscensionMaterial`: Exposes CRUD operations for the **WeaponAscensionMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WeaponAscensionMaterials
   * const weaponAscensionMaterials = await prisma.weaponAscensionMaterial.findMany()
   * ```
   */
  get weaponAscensionMaterial(): WeaponAscensionMaterialDelegate;

  /**
   * `prisma.weaponEnhancementMaterial`: Exposes CRUD operations for the **WeaponEnhancementMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WeaponEnhancementMaterials
   * const weaponEnhancementMaterials = await prisma.weaponEnhancementMaterial.findMany()
   * ```
   */
  get weaponEnhancementMaterial(): WeaponEnhancementMaterialDelegate;

  /**
   * `prisma.characterAscensionMaterial`: Exposes CRUD operations for the **CharacterAscensionMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CharacterAscensionMaterials
   * const characterAscensionMaterials = await prisma.characterAscensionMaterial.findMany()
   * ```
   */
  get characterAscensionMaterial(): CharacterAscensionMaterialDelegate;

  /**
   * `prisma.talentLevelUpMaterial`: Exposes CRUD operations for the **TalentLevelUpMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more TalentLevelUpMaterials
   * const talentLevelUpMaterials = await prisma.talentLevelUpMaterial.findMany()
   * ```
   */
  get talentLevelUpMaterial(): TalentLevelUpMaterialDelegate;

  /**
   * `prisma.craftingMaterial`: Exposes CRUD operations for the **CraftingMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CraftingMaterials
   * const craftingMaterials = await prisma.craftingMaterial.findMany()
   * ```
   */
  get craftingMaterial(): CraftingMaterialDelegate;

  /**
   * `prisma.cookingMaterial`: Exposes CRUD operations for the **CookingMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CookingMaterials
   * const cookingMaterials = await prisma.cookingMaterial.findMany()
   * ```
   */
  get cookingMaterial(): CookingMaterialDelegate;

  /**
   * `prisma.commonMaterial`: Exposes CRUD operations for the **CommonMaterial** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CommonMaterials
   * const commonMaterials = await prisma.commonMaterial.findMany()
   * ```
   */
  get commonMaterial(): CommonMaterialDelegate;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Domains
   * const domains = await prisma.domain.findMany()
   * ```
   */
  get domain(): DomainDelegate;

  /**
   * `prisma.consumeable`: Exposes CRUD operations for the **Consumeable** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Consumeables
   * const consumeables = await prisma.consumeable.findMany()
   * ```
   */
  get consumeable(): ConsumeableDelegate;

  /**
   * `prisma.consumeableRecipe`: Exposes CRUD operations for the **ConsumeableRecipe** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ConsumeableRecipes
   * const consumeableRecipes = await prisma.consumeableRecipe.findMany()
   * ```
   */
  get consumeableRecipe(): ConsumeableRecipeDelegate;

  /**
   * `prisma.processRecipe`: Exposes CRUD operations for the **ProcessRecipe** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProcessRecipes
   * const processRecipes = await prisma.processRecipe.findMany()
   * ```
   */
  get processRecipe(): ProcessRecipeDelegate;

  /**
   * `prisma.forgeRecipe`: Exposes CRUD operations for the **ForgeRecipe** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ForgeRecipes
   * const forgeRecipes = await prisma.forgeRecipe.findMany()
   * ```
   */
  get forgeRecipe(): ForgeRecipeDelegate;

  /**
   * `prisma.artifactSet`: Exposes CRUD operations for the **ArtifactSet** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ArtifactSets
   * const artifactSets = await prisma.artifactSet.findMany()
   * ```
   */
  get artifactSet(): ArtifactSetDelegate;

  /**
   * `prisma.artifact`: Exposes CRUD operations for the **Artifact** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Artifacts
   * const artifacts = await prisma.artifact.findMany()
   * ```
   */
  get artifact(): ArtifactDelegate;
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const CharacterDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  constellations: 'constellations';
  overview: 'overview';
  rarity: 'rarity';
  stats: 'stats';
  weapon: 'weapon';
};

export declare type CharacterDistinctFieldEnum = typeof CharacterDistinctFieldEnum[keyof typeof CharacterDistinctFieldEnum];

export declare const CharacterAscensionDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  level: 'level';
  maxLevel: 'maxLevel';
  recipe: 'recipe';
  characterId: 'characterId';
  characterAscensionMaterialId: 'characterAscensionMaterialId';
};

export declare type CharacterAscensionDistinctFieldEnum = typeof CharacterAscensionDistinctFieldEnum[keyof typeof CharacterAscensionDistinctFieldEnum];

export declare const CharacterProfileDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  affiliation: 'affiliation';
  birthday: 'birthday';
  constellation: 'constellation';
  overview: 'overview';
  story: 'story';
  voiceActor: 'voiceActor';
  voiceLines: 'voiceLines';
  characterId: 'characterId';
  regionId: 'regionId';
  elementId: 'elementId';
};

export declare type CharacterProfileDistinctFieldEnum = typeof CharacterProfileDistinctFieldEnum[keyof typeof CharacterProfileDistinctFieldEnum];

export declare const TalentDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  description: 'description';
  details: 'details';
  name: 'name';
  type: 'type';
  characterId: 'characterId';
  talentLevelUpMaterialId: 'talentLevelUpMaterialId';
};

export declare type TalentDistinctFieldEnum = typeof TalentDistinctFieldEnum[keyof typeof TalentDistinctFieldEnum];

export declare const ElementDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  archon: 'archon';
  statusEffect: 'statusEffect';
  theme: 'theme';
  regionId: 'regionId';
};

export declare type ElementDistinctFieldEnum = typeof ElementDistinctFieldEnum[keyof typeof ElementDistinctFieldEnum];

export declare const RegionDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
};

export declare type RegionDistinctFieldEnum = typeof RegionDistinctFieldEnum[keyof typeof RegionDistinctFieldEnum];

export declare const WeaponDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  baseStats: 'baseStats';
  description: 'description';
  image: 'image';
  lore: 'lore';
  passive: 'passive';
  rarity: 'rarity';
  refinements: 'refinements';
  stats: 'stats';
  secondaryStatType: 'secondaryStatType';
  type: 'type';
};

export declare type WeaponDistinctFieldEnum = typeof WeaponDistinctFieldEnum[keyof typeof WeaponDistinctFieldEnum];

export declare const WeaponAscensionDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  level: 'level';
  maxLevel: 'maxLevel';
  recipe: 'recipe';
  weaponAscensionMaterialId: 'weaponAscensionMaterialId';
  weaponId: 'weaponId';
};

export declare type WeaponAscensionDistinctFieldEnum = typeof WeaponAscensionDistinctFieldEnum[keyof typeof WeaponAscensionDistinctFieldEnum];

export declare const CommonAscensionMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  group: 'group';
};

export declare type CommonAscensionMaterialDistinctFieldEnum = typeof CommonAscensionMaterialDistinctFieldEnum[keyof typeof CommonAscensionMaterialDistinctFieldEnum];

export declare const WeaponAscensionMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  availability: 'availability';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  group: 'group';
  domainId: 'domainId';
};

export declare type WeaponAscensionMaterialDistinctFieldEnum = typeof WeaponAscensionMaterialDistinctFieldEnum[keyof typeof WeaponAscensionMaterialDistinctFieldEnum];

export declare const WeaponEnhancementMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  source: 'source';
  recipeUseId: 'recipeUseId';
};

export declare type WeaponEnhancementMaterialDistinctFieldEnum = typeof WeaponEnhancementMaterialDistinctFieldEnum[keyof typeof WeaponEnhancementMaterialDistinctFieldEnum];

export declare const CharacterAscensionMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  source: 'source';
  group: 'group';
};

export declare type CharacterAscensionMaterialDistinctFieldEnum = typeof CharacterAscensionMaterialDistinctFieldEnum[keyof typeof CharacterAscensionMaterialDistinctFieldEnum];

export declare const TalentLevelUpMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  availability: 'availability';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  group: 'group';
  domainId: 'domainId';
};

export declare type TalentLevelUpMaterialDistinctFieldEnum = typeof TalentLevelUpMaterialDistinctFieldEnum[keyof typeof TalentLevelUpMaterialDistinctFieldEnum];

export declare const CraftingMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  source: 'source';
};

export declare type CraftingMaterialDistinctFieldEnum = typeof CraftingMaterialDistinctFieldEnum[keyof typeof CraftingMaterialDistinctFieldEnum];

export declare const CookingMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  source: 'source';
};

export declare type CookingMaterialDistinctFieldEnum = typeof CookingMaterialDistinctFieldEnum[keyof typeof CookingMaterialDistinctFieldEnum];

export declare const CommonMaterialDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  image: 'image';
  rarity: 'rarity';
  source: 'source';
};

export declare type CommonMaterialDistinctFieldEnum = typeof CommonMaterialDistinctFieldEnum[keyof typeof CommonMaterialDistinctFieldEnum];

export declare const DomainDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  levels: 'levels';
  type: 'type';
  regionId: 'regionId';
};

export declare type DomainDistinctFieldEnum = typeof DomainDistinctFieldEnum[keyof typeof DomainDistinctFieldEnum];

export declare const ConsumeableDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  description: 'description';
  effect: 'effect';
  image: 'image';
  rarity: 'rarity';
  consumeableType: 'consumeableType';
  foodType: 'foodType';
  characterProfileId: 'characterProfileId';
};

export declare type ConsumeableDistinctFieldEnum = typeof ConsumeableDistinctFieldEnum[keyof typeof ConsumeableDistinctFieldEnum];

export declare const ConsumeableRecipeDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  recipe: 'recipe';
  consumeableId: 'consumeableId';
};

export declare type ConsumeableRecipeDistinctFieldEnum = typeof ConsumeableRecipeDistinctFieldEnum[keyof typeof ConsumeableRecipeDistinctFieldEnum];

export declare const ProcessRecipeDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  processingTime: 'processingTime';
  recipe: 'recipe';
  materialId: 'materialId';
};

export declare type ProcessRecipeDistinctFieldEnum = typeof ProcessRecipeDistinctFieldEnum[keyof typeof ProcessRecipeDistinctFieldEnum];

export declare const ForgeRecipeDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  craftingTime: 'craftingTime';
  recipe: 'recipe';
  weaponEnhancementMaterialId: 'weaponEnhancementMaterialId';
  weaponId: 'weaponId';
};

export declare type ForgeRecipeDistinctFieldEnum = typeof ForgeRecipeDistinctFieldEnum[keyof typeof ForgeRecipeDistinctFieldEnum];

export declare const ArtifactSetDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  image: 'image';
  maxRarity: 'maxRarity';
  pieceBonusFour: 'pieceBonusFour';
  pieceBonusOne: 'pieceBonusOne';
  pieceBonusTwo: 'pieceBonusTwo';
};

export declare type ArtifactSetDistinctFieldEnum = typeof ArtifactSetDistinctFieldEnum[keyof typeof ArtifactSetDistinctFieldEnum];

export declare const ArtifactDistinctFieldEnum: {
  id: 'id';
  createdAt: 'createdAt';
  updatedAt: 'updatedAt';
  name: 'name';
  lore: 'lore';
  minRarity: 'minRarity';
  possibleMainStats: 'possibleMainStats';
  possibleSubStats: 'possibleSubStats';
  source: 'source';
  type: 'type';
  artifactSetId: 'artifactSetId';
  domainId: 'domainId';
};

export declare type ArtifactDistinctFieldEnum = typeof ArtifactDistinctFieldEnum[keyof typeof ArtifactDistinctFieldEnum];

export declare const SortOrder: {
  asc: 'asc';
  desc: 'desc';
};

export declare type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export declare const WeaponType: {
  Bow: 'Bow';
  Catalyst: 'Catalyst';
  Claymore: 'Claymore';
  Polearm: 'Polearm';
  Sword: 'Sword';
};

export declare type WeaponType = typeof WeaponType[keyof typeof WeaponType];

export declare const WeaponSecondaryStatType: {
  DEFPercent: 'DEFPercent';
  HPPercent: 'HPPercent';
  ATKPercent: 'ATKPercent';
  CritDMGPercent: 'CritDMGPercent';
  CritRatePercent: 'CritRatePercent';
  ElementalMastery: 'ElementalMastery';
  EnergyRechargePercent: 'EnergyRechargePercent';
  PhysicalDMGPercent: 'PhysicalDMGPercent';
};

export declare type WeaponSecondaryStatType = typeof WeaponSecondaryStatType[keyof typeof WeaponSecondaryStatType];

export declare const CommonAscensionMaterialGroup: {
  BoneShards: 'BoneShards';
  ChaosParts: 'ChaosParts';
  FatuiInsignias: 'FatuiInsignias';
  FatuiKnives: 'FatuiKnives';
  HilichurlArrowhead: 'HilichurlArrowhead';
  HilichurlHorns: 'HilichurlHorns';
  HilichurlMask: 'HilichurlMask';
  LeyLine: 'LeyLine';
  MistGrass: 'MistGrass';
  SamachurlScrolls: 'SamachurlScrolls';
  Slime: 'Slime';
  TreasureHoarderInsignia: 'TreasureHoarderInsignia';
  WhopperflowerNectar: 'WhopperflowerNectar';
};

export declare type CommonAscensionMaterialGroup = typeof CommonAscensionMaterialGroup[keyof typeof CommonAscensionMaterialGroup];

export declare const WeaponAscensionMaterialGroup: {
  Aerosiderite: 'Aerosiderite';
  BorealWolf: 'BorealWolf';
  DandelionGladiator: 'DandelionGladiator';
  Decarabian: 'Decarabian';
  Guyun: 'Guyun';
  MistVeiled: 'MistVeiled';
};

export declare type WeaponAscensionMaterialGroup = typeof WeaponAscensionMaterialGroup[keyof typeof WeaponAscensionMaterialGroup];

export declare const TalentLevelUpMaterialGroup: {
  Ballad: 'Ballad';
  Boreas: 'Boreas';
  Diligence: 'Diligence';
  Dvalin: 'Dvalin';
  Freedom: 'Freedom';
  Gold: 'Gold';
  Prosperity: 'Prosperity';
  Resistance: 'Resistance';
};

export declare type TalentLevelUpMaterialGroup = typeof TalentLevelUpMaterialGroup[keyof typeof TalentLevelUpMaterialGroup];

export declare const ConsumableType: {
  Food: 'Food';
  Potion: 'Potion';
};

export declare type ConsumableType = typeof ConsumableType[keyof typeof ConsumableType];

export declare const FoodType: {
  Adventurer: 'Adventurer';
  Guardian: 'Guardian';
  Sage: 'Sage';
  Warrior: 'Warrior';
};

export declare type FoodType = typeof FoodType[keyof typeof FoodType];

export declare const ArtifactType: {
  CircletOfLogos: 'CircletOfLogos';
  FlowerOfLife: 'FlowerOfLife';
  GobletOfEonothem: 'GobletOfEonothem';
  PlumeOfDeath: 'PlumeOfDeath';
  SandsOfEon: 'SandsOfEon';
};

export declare type ArtifactType = typeof ArtifactType[keyof typeof ArtifactType];

/**
 * Model Character
 */

export type Character = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  constellations: JsonValue | null;
  overview: string | null;
  rarity: number;
  stats: JsonValue | null;
  weapon: WeaponType | null;
};

export type AggregateCharacter = {
  count: number;
  avg: CharacterAvgAggregateOutputType | null;
  sum: CharacterSumAggregateOutputType | null;
  min: CharacterMinAggregateOutputType | null;
  max: CharacterMaxAggregateOutputType | null;
};

export type CharacterAvgAggregateOutputType = {
  rarity: number;
};

export type CharacterSumAggregateOutputType = {
  rarity: number;
};

export type CharacterMinAggregateOutputType = {
  rarity: number;
};

export type CharacterMaxAggregateOutputType = {
  rarity: number;
};

export type CharacterAvgAggregateInputType = {
  rarity?: true;
};

export type CharacterSumAggregateInputType = {
  rarity?: true;
};

export type CharacterMinAggregateInputType = {
  rarity?: true;
};

export type CharacterMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCharacterArgs = {
  where?: CharacterWhereInput;
  orderBy?: Enumerable<CharacterOrderByInput>;
  cursor?: CharacterWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CharacterDistinctFieldEnum>;
  count?: true;
  avg?: CharacterAvgAggregateInputType;
  sum?: CharacterSumAggregateInputType;
  min?: CharacterMinAggregateInputType;
  max?: CharacterMaxAggregateInputType;
};

export type GetCharacterAggregateType<T extends AggregateCharacterArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCharacterAggregateScalarType<T[P]>;
};

export type GetCharacterAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterAvgAggregateOutputType
    ? CharacterAvgAggregateOutputType[P]
    : never;
};

export type CharacterSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  constellations?: boolean;
  overview?: boolean;
  rarity?: boolean;
  stats?: boolean;
  ascensions?: boolean | FindManyCharacterAscensionArgs;
  elements?: boolean | FindManyElementArgs;
  profile?: boolean | CharacterProfileArgs;
  talents?: boolean | FindManyTalentArgs;
  weapon?: boolean;
};

export type CharacterInclude = {
  ascensions?: boolean | FindManyCharacterAscensionArgs;
  elements?: boolean | FindManyElementArgs;
  profile?: boolean | CharacterProfileArgs;
  talents?: boolean | FindManyTalentArgs;
};

export type CharacterGetPayload<
  S extends boolean | null | undefined | CharacterArgs,
  U = keyof S
> = S extends true
  ? Character
  : S extends undefined
  ? never
  : S extends CharacterArgs | FindManyCharacterArgs
  ? 'include' extends U
    ? Character &
        {
          [P in TrueKeys<S['include']>]: P extends 'ascensions'
            ? Array<CharacterAscensionGetPayload<S['include'][P]>>
            : P extends 'elements'
            ? Array<ElementGetPayload<S['include'][P]>>
            : P extends 'profile'
            ? CharacterProfileGetPayload<S['include'][P]> | null
            : P extends 'talents'
            ? Array<TalentGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Character
          ? Character[P]
          : P extends 'ascensions'
          ? Array<CharacterAscensionGetPayload<S['select'][P]>>
          : P extends 'elements'
          ? Array<ElementGetPayload<S['select'][P]>>
          : P extends 'profile'
          ? CharacterProfileGetPayload<S['select'][P]> | null
          : P extends 'talents'
          ? Array<TalentGetPayload<S['select'][P]>>
          : never;
      }
    : Character
  : Character;

export interface CharacterDelegate {
  /**
   * Find zero or one Character.
   * @param {FindOneCharacterArgs} args - Arguments to find a Character
   * @example
   * // Get one Character
   * const character = await prisma.character.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCharacterArgs>(
    args: Subset<T, FindOneCharacterArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character | null>,
    Prisma__CharacterClient<CharacterGetPayload<T> | null>
  >;
  /**
   * Find zero or more Characters.
   * @param {FindManyCharacterArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Characters
   * const characters = await prisma.character.findMany()
   *
   * // Get first 10 Characters
   * const characters = await prisma.character.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const characterWithIdOnly = await prisma.character.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCharacterArgs>(
    args?: Subset<T, FindManyCharacterArgs>
  ): CheckSelect<
    T,
    Promise<Array<Character>>,
    Promise<Array<CharacterGetPayload<T>>>
  >;
  /**
   * Create a Character.
   * @param {CharacterCreateArgs} args - Arguments to create a Character.
   * @example
   * // Create one Character
   * const Character = await prisma.character.create({
   *   data: {
   *     // ... data to create a Character
   *   }
   * })
   *
   **/
  create<T extends CharacterCreateArgs>(
    args: Subset<T, CharacterCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character>,
    Prisma__CharacterClient<CharacterGetPayload<T>>
  >;
  /**
   * Delete a Character.
   * @param {CharacterDeleteArgs} args - Arguments to delete one Character.
   * @example
   * // Delete one Character
   * const Character = await prisma.character.delete({
   *   where: {
   *     // ... filter to delete one Character
   *   }
   * })
   *
   **/
  delete<T extends CharacterDeleteArgs>(
    args: Subset<T, CharacterDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character>,
    Prisma__CharacterClient<CharacterGetPayload<T>>
  >;
  /**
   * Update one Character.
   * @param {CharacterUpdateArgs} args - Arguments to update one Character.
   * @example
   * // Update one Character
   * const character = await prisma.character.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CharacterUpdateArgs>(
    args: Subset<T, CharacterUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character>,
    Prisma__CharacterClient<CharacterGetPayload<T>>
  >;
  /**
   * Delete zero or more Characters.
   * @param {CharacterDeleteManyArgs} args - Arguments to filter Characters to delete.
   * @example
   * // Delete a few Characters
   * const { count } = await prisma.character.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CharacterDeleteManyArgs>(
    args: Subset<T, CharacterDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Characters.
   * @param {CharacterUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Characters
   * const character = await prisma.character.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CharacterUpdateManyArgs>(
    args: Subset<T, CharacterUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Character.
   * @param {CharacterUpsertArgs} args - Arguments to update or create a Character.
   * @example
   * // Update or create a Character
   * const character = await prisma.character.upsert({
   *   create: {
   *     // ... data to create a Character
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Character we want to update
   *   }
   * })
   **/
  upsert<T extends CharacterUpsertArgs>(
    args: Subset<T, CharacterUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character>,
    Prisma__CharacterClient<CharacterGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCharacterArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterArgs>(
    args: Subset<T, AggregateCharacterArgs>
  ): Promise<GetCharacterAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Character.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  ascensions<T extends FindManyCharacterAscensionArgs = {}>(
    args?: Subset<T, FindManyCharacterAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterAscension>>,
    Promise<Array<CharacterAscensionGetPayload<T>>>
  >;

  elements<T extends FindManyElementArgs = {}>(
    args?: Subset<T, FindManyElementArgs>
  ): CheckSelect<
    T,
    Promise<Array<Element>>,
    Promise<Array<ElementGetPayload<T>>>
  >;

  profile<T extends CharacterProfileArgs = {}>(
    args?: Subset<T, CharacterProfileArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile | null>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T> | null>
  >;

  talents<T extends FindManyTalentArgs = {}>(
    args?: Subset<T, FindManyTalentArgs>
  ): CheckSelect<
    T,
    Promise<Array<Talent>>,
    Promise<Array<TalentGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Character findOne
 */
export type FindOneCharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * Filter, which Character to fetch.
   **/
  where: CharacterWhereUniqueInput;
};

/**
 * Character findMany
 */
export type FindManyCharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * Filter, which Characters to fetch.
   **/
  where?: CharacterWhereInput;
  /**
   * Determine the order of the Characters to fetch.
   **/
  orderBy?: Enumerable<CharacterOrderByInput>;
  /**
   * Sets the position for listing Characters.
   **/
  cursor?: CharacterWhereUniqueInput;
  /**
   * The number of Characters to fetch. If negative number, it will take Characters before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Characters.
   **/
  skip?: number;
  distinct?: Enumerable<CharacterDistinctFieldEnum>;
};

/**
 * Character create
 */
export type CharacterCreateArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * The data needed to create a Character.
   **/
  data: CharacterCreateInput;
};

/**
 * Character update
 */
export type CharacterUpdateArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * The data needed to update a Character.
   **/
  data: CharacterUpdateInput;
  /**
   * Choose, which Character to update.
   **/
  where: CharacterWhereUniqueInput;
};

/**
 * Character updateMany
 */
export type CharacterUpdateManyArgs = {
  data: CharacterUpdateManyMutationInput;
  where?: CharacterWhereInput;
};

/**
 * Character upsert
 */
export type CharacterUpsertArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * The filter to search for the Character to update in case it exists.
   **/
  where: CharacterWhereUniqueInput;
  /**
   * In case the Character found by the `where` argument doesn't exist, create a new Character with this data.
   **/
  create: CharacterCreateInput;
  /**
   * In case the Character was found with the provided `where` argument, update it with this data.
   **/
  update: CharacterUpdateInput;
};

/**
 * Character delete
 */
export type CharacterDeleteArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
  /**
   * Filter which Character to delete.
   **/
  where: CharacterWhereUniqueInput;
};

/**
 * Character deleteMany
 */
export type CharacterDeleteManyArgs = {
  where?: CharacterWhereInput;
};

/**
 * Character without action
 */
export type CharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
   **/
  select?: CharacterSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterInclude | null;
};

/**
 * Model CharacterAscension
 */

export type CharacterAscension = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  maxLevel: number;
  recipe: JsonValue | null;
  characterId: string | null;
  characterAscensionMaterialId: string | null;
};

export type AggregateCharacterAscension = {
  count: number;
  avg: CharacterAscensionAvgAggregateOutputType | null;
  sum: CharacterAscensionSumAggregateOutputType | null;
  min: CharacterAscensionMinAggregateOutputType | null;
  max: CharacterAscensionMaxAggregateOutputType | null;
};

export type CharacterAscensionAvgAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type CharacterAscensionSumAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type CharacterAscensionMinAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type CharacterAscensionMaxAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type CharacterAscensionAvgAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type CharacterAscensionSumAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type CharacterAscensionMinAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type CharacterAscensionMaxAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type AggregateCharacterAscensionArgs = {
  where?: CharacterAscensionWhereInput;
  orderBy?: Enumerable<CharacterAscensionOrderByInput>;
  cursor?: CharacterAscensionWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CharacterAscensionDistinctFieldEnum>;
  count?: true;
  avg?: CharacterAscensionAvgAggregateInputType;
  sum?: CharacterAscensionSumAggregateInputType;
  min?: CharacterAscensionMinAggregateInputType;
  max?: CharacterAscensionMaxAggregateInputType;
};

export type GetCharacterAscensionAggregateType<
  T extends AggregateCharacterAscensionArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCharacterAscensionAggregateScalarType<T[P]>;
};

export type GetCharacterAscensionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterAscensionAvgAggregateOutputType
    ? CharacterAscensionAvgAggregateOutputType[P]
    : never;
};

export type CharacterAscensionSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  level?: boolean;
  maxLevel?: boolean;
  recipe?: boolean;
  character?: boolean | CharacterArgs;
  characterId?: boolean;
  characterAscensionMaterial?: boolean | CharacterAscensionMaterialArgs;
  characterAscensionMaterialId?: boolean;
  commonAscensionMaterials?: boolean | FindManyCommonAscensionMaterialArgs;
};

export type CharacterAscensionInclude = {
  character?: boolean | CharacterArgs;
  characterAscensionMaterial?: boolean | CharacterAscensionMaterialArgs;
  commonAscensionMaterials?: boolean | FindManyCommonAscensionMaterialArgs;
};

export type CharacterAscensionGetPayload<
  S extends boolean | null | undefined | CharacterAscensionArgs,
  U = keyof S
> = S extends true
  ? CharacterAscension
  : S extends undefined
  ? never
  : S extends CharacterAscensionArgs | FindManyCharacterAscensionArgs
  ? 'include' extends U
    ? CharacterAscension &
        {
          [P in TrueKeys<S['include']>]: P extends 'character'
            ? CharacterGetPayload<S['include'][P]> | null
            : P extends 'characterAscensionMaterial'
            ? CharacterAscensionMaterialGetPayload<S['include'][P]> | null
            : P extends 'commonAscensionMaterials'
            ? Array<CommonAscensionMaterialGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CharacterAscension
          ? CharacterAscension[P]
          : P extends 'character'
          ? CharacterGetPayload<S['select'][P]> | null
          : P extends 'characterAscensionMaterial'
          ? CharacterAscensionMaterialGetPayload<S['select'][P]> | null
          : P extends 'commonAscensionMaterials'
          ? Array<CommonAscensionMaterialGetPayload<S['select'][P]>>
          : never;
      }
    : CharacterAscension
  : CharacterAscension;

export interface CharacterAscensionDelegate {
  /**
   * Find zero or one CharacterAscension.
   * @param {FindOneCharacterAscensionArgs} args - Arguments to find a CharacterAscension
   * @example
   * // Get one CharacterAscension
   * const characterAscension = await prisma.characterAscension.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCharacterAscensionArgs>(
    args: Subset<T, FindOneCharacterAscensionArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionClient<CharacterAscension | null>,
    Prisma__CharacterAscensionClient<CharacterAscensionGetPayload<T> | null>
  >;
  /**
   * Find zero or more CharacterAscensions.
   * @param {FindManyCharacterAscensionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterAscensions
   * const characterAscensions = await prisma.characterAscension.findMany()
   *
   * // Get first 10 CharacterAscensions
   * const characterAscensions = await prisma.characterAscension.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const characterAscensionWithIdOnly = await prisma.characterAscension.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCharacterAscensionArgs>(
    args?: Subset<T, FindManyCharacterAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterAscension>>,
    Promise<Array<CharacterAscensionGetPayload<T>>>
  >;
  /**
   * Create a CharacterAscension.
   * @param {CharacterAscensionCreateArgs} args - Arguments to create a CharacterAscension.
   * @example
   * // Create one CharacterAscension
   * const CharacterAscension = await prisma.characterAscension.create({
   *   data: {
   *     // ... data to create a CharacterAscension
   *   }
   * })
   *
   **/
  create<T extends CharacterAscensionCreateArgs>(
    args: Subset<T, CharacterAscensionCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionClient<CharacterAscension>,
    Prisma__CharacterAscensionClient<CharacterAscensionGetPayload<T>>
  >;
  /**
   * Delete a CharacterAscension.
   * @param {CharacterAscensionDeleteArgs} args - Arguments to delete one CharacterAscension.
   * @example
   * // Delete one CharacterAscension
   * const CharacterAscension = await prisma.characterAscension.delete({
   *   where: {
   *     // ... filter to delete one CharacterAscension
   *   }
   * })
   *
   **/
  delete<T extends CharacterAscensionDeleteArgs>(
    args: Subset<T, CharacterAscensionDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionClient<CharacterAscension>,
    Prisma__CharacterAscensionClient<CharacterAscensionGetPayload<T>>
  >;
  /**
   * Update one CharacterAscension.
   * @param {CharacterAscensionUpdateArgs} args - Arguments to update one CharacterAscension.
   * @example
   * // Update one CharacterAscension
   * const characterAscension = await prisma.characterAscension.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CharacterAscensionUpdateArgs>(
    args: Subset<T, CharacterAscensionUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionClient<CharacterAscension>,
    Prisma__CharacterAscensionClient<CharacterAscensionGetPayload<T>>
  >;
  /**
   * Delete zero or more CharacterAscensions.
   * @param {CharacterAscensionDeleteManyArgs} args - Arguments to filter CharacterAscensions to delete.
   * @example
   * // Delete a few CharacterAscensions
   * const { count } = await prisma.characterAscension.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CharacterAscensionDeleteManyArgs>(
    args: Subset<T, CharacterAscensionDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CharacterAscensions.
   * @param {CharacterAscensionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterAscensions
   * const characterAscension = await prisma.characterAscension.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CharacterAscensionUpdateManyArgs>(
    args: Subset<T, CharacterAscensionUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CharacterAscension.
   * @param {CharacterAscensionUpsertArgs} args - Arguments to update or create a CharacterAscension.
   * @example
   * // Update or create a CharacterAscension
   * const characterAscension = await prisma.characterAscension.upsert({
   *   create: {
   *     // ... data to create a CharacterAscension
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterAscension we want to update
   *   }
   * })
   **/
  upsert<T extends CharacterAscensionUpsertArgs>(
    args: Subset<T, CharacterAscensionUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionClient<CharacterAscension>,
    Prisma__CharacterAscensionClient<CharacterAscensionGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCharacterAscensionArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterAscensionArgs>(
    args: Subset<T, AggregateCharacterAscensionArgs>
  ): Promise<GetCharacterAscensionAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterAscension.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterAscensionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(
    args?: Subset<T, CharacterArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character | null>,
    Prisma__CharacterClient<CharacterGetPayload<T> | null>
  >;

  characterAscensionMaterial<T extends CharacterAscensionMaterialArgs = {}>(
    args?: Subset<T, CharacterAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial | null>,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterialGetPayload<T> | null>
  >;

  commonAscensionMaterials<T extends FindManyCommonAscensionMaterialArgs = {}>(
    args?: Subset<T, FindManyCommonAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CommonAscensionMaterial>>,
    Promise<Array<CommonAscensionMaterialGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterAscension findOne
 */
export type FindOneCharacterAscensionArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * Filter, which CharacterAscension to fetch.
   **/
  where: CharacterAscensionWhereUniqueInput;
};

/**
 * CharacterAscension findMany
 */
export type FindManyCharacterAscensionArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * Filter, which CharacterAscensions to fetch.
   **/
  where?: CharacterAscensionWhereInput;
  /**
   * Determine the order of the CharacterAscensions to fetch.
   **/
  orderBy?: Enumerable<CharacterAscensionOrderByInput>;
  /**
   * Sets the position for listing CharacterAscensions.
   **/
  cursor?: CharacterAscensionWhereUniqueInput;
  /**
   * The number of CharacterAscensions to fetch. If negative number, it will take CharacterAscensions before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CharacterAscensions.
   **/
  skip?: number;
  distinct?: Enumerable<CharacterAscensionDistinctFieldEnum>;
};

/**
 * CharacterAscension create
 */
export type CharacterAscensionCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * The data needed to create a CharacterAscension.
   **/
  data: CharacterAscensionCreateInput;
};

/**
 * CharacterAscension update
 */
export type CharacterAscensionUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * The data needed to update a CharacterAscension.
   **/
  data: CharacterAscensionUpdateInput;
  /**
   * Choose, which CharacterAscension to update.
   **/
  where: CharacterAscensionWhereUniqueInput;
};

/**
 * CharacterAscension updateMany
 */
export type CharacterAscensionUpdateManyArgs = {
  data: CharacterAscensionUpdateManyMutationInput;
  where?: CharacterAscensionWhereInput;
};

/**
 * CharacterAscension upsert
 */
export type CharacterAscensionUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * The filter to search for the CharacterAscension to update in case it exists.
   **/
  where: CharacterAscensionWhereUniqueInput;
  /**
   * In case the CharacterAscension found by the `where` argument doesn't exist, create a new CharacterAscension with this data.
   **/
  create: CharacterAscensionCreateInput;
  /**
   * In case the CharacterAscension was found with the provided `where` argument, update it with this data.
   **/
  update: CharacterAscensionUpdateInput;
};

/**
 * CharacterAscension delete
 */
export type CharacterAscensionDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
  /**
   * Filter which CharacterAscension to delete.
   **/
  where: CharacterAscensionWhereUniqueInput;
};

/**
 * CharacterAscension deleteMany
 */
export type CharacterAscensionDeleteManyArgs = {
  where?: CharacterAscensionWhereInput;
};

/**
 * CharacterAscension without action
 */
export type CharacterAscensionArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscension
   **/
  select?: CharacterAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionInclude | null;
};

/**
 * Model CharacterProfile
 */

export type CharacterProfile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  affiliation: string | null;
  birthday: string | null;
  constellation: string | null;
  overview: string | null;
  story: JsonValue | null;
  voiceActor: JsonValue | null;
  voiceLines: JsonValue | null;
  characterId: string;
  regionId: string | null;
  elementId: string | null;
};

export type AggregateCharacterProfile = {
  count: number;
};

export type AggregateCharacterProfileArgs = {
  where?: CharacterProfileWhereInput;
  orderBy?: Enumerable<CharacterProfileOrderByInput>;
  cursor?: CharacterProfileWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CharacterProfileDistinctFieldEnum>;
  count?: true;
};

export type GetCharacterProfileAggregateType<
  T extends AggregateCharacterProfileArgs
> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type CharacterProfileSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  affiliation?: boolean;
  birthday?: boolean;
  constellation?: boolean;
  overview?: boolean;
  story?: boolean;
  voiceActor?: boolean;
  voiceLines?: boolean;
  character?: boolean | CharacterArgs;
  characterId?: boolean;
  region?: boolean | RegionArgs;
  regionId?: boolean;
  specialtyDish?: boolean | ConsumeableArgs;
  vision?: boolean | ElementArgs;
  elementId?: boolean;
};

export type CharacterProfileInclude = {
  character?: boolean | CharacterArgs;
  region?: boolean | RegionArgs;
  specialtyDish?: boolean | ConsumeableArgs;
  vision?: boolean | ElementArgs;
};

export type CharacterProfileGetPayload<
  S extends boolean | null | undefined | CharacterProfileArgs,
  U = keyof S
> = S extends true
  ? CharacterProfile
  : S extends undefined
  ? never
  : S extends CharacterProfileArgs | FindManyCharacterProfileArgs
  ? 'include' extends U
    ? CharacterProfile &
        {
          [P in TrueKeys<S['include']>]: P extends 'character'
            ? CharacterGetPayload<S['include'][P]>
            : P extends 'region'
            ? RegionGetPayload<S['include'][P]> | null
            : P extends 'specialtyDish'
            ? ConsumeableGetPayload<S['include'][P]> | null
            : P extends 'vision'
            ? ElementGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CharacterProfile
          ? CharacterProfile[P]
          : P extends 'character'
          ? CharacterGetPayload<S['select'][P]>
          : P extends 'region'
          ? RegionGetPayload<S['select'][P]> | null
          : P extends 'specialtyDish'
          ? ConsumeableGetPayload<S['select'][P]> | null
          : P extends 'vision'
          ? ElementGetPayload<S['select'][P]> | null
          : never;
      }
    : CharacterProfile
  : CharacterProfile;

export interface CharacterProfileDelegate {
  /**
   * Find zero or one CharacterProfile.
   * @param {FindOneCharacterProfileArgs} args - Arguments to find a CharacterProfile
   * @example
   * // Get one CharacterProfile
   * const characterProfile = await prisma.characterProfile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCharacterProfileArgs>(
    args: Subset<T, FindOneCharacterProfileArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile | null>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T> | null>
  >;
  /**
   * Find zero or more CharacterProfiles.
   * @param {FindManyCharacterProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterProfiles
   * const characterProfiles = await prisma.characterProfile.findMany()
   *
   * // Get first 10 CharacterProfiles
   * const characterProfiles = await prisma.characterProfile.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const characterProfileWithIdOnly = await prisma.characterProfile.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCharacterProfileArgs>(
    args?: Subset<T, FindManyCharacterProfileArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterProfile>>,
    Promise<Array<CharacterProfileGetPayload<T>>>
  >;
  /**
   * Create a CharacterProfile.
   * @param {CharacterProfileCreateArgs} args - Arguments to create a CharacterProfile.
   * @example
   * // Create one CharacterProfile
   * const CharacterProfile = await prisma.characterProfile.create({
   *   data: {
   *     // ... data to create a CharacterProfile
   *   }
   * })
   *
   **/
  create<T extends CharacterProfileCreateArgs>(
    args: Subset<T, CharacterProfileCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T>>
  >;
  /**
   * Delete a CharacterProfile.
   * @param {CharacterProfileDeleteArgs} args - Arguments to delete one CharacterProfile.
   * @example
   * // Delete one CharacterProfile
   * const CharacterProfile = await prisma.characterProfile.delete({
   *   where: {
   *     // ... filter to delete one CharacterProfile
   *   }
   * })
   *
   **/
  delete<T extends CharacterProfileDeleteArgs>(
    args: Subset<T, CharacterProfileDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T>>
  >;
  /**
   * Update one CharacterProfile.
   * @param {CharacterProfileUpdateArgs} args - Arguments to update one CharacterProfile.
   * @example
   * // Update one CharacterProfile
   * const characterProfile = await prisma.characterProfile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CharacterProfileUpdateArgs>(
    args: Subset<T, CharacterProfileUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T>>
  >;
  /**
   * Delete zero or more CharacterProfiles.
   * @param {CharacterProfileDeleteManyArgs} args - Arguments to filter CharacterProfiles to delete.
   * @example
   * // Delete a few CharacterProfiles
   * const { count } = await prisma.characterProfile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CharacterProfileDeleteManyArgs>(
    args: Subset<T, CharacterProfileDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CharacterProfiles.
   * @param {CharacterProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterProfiles
   * const characterProfile = await prisma.characterProfile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CharacterProfileUpdateManyArgs>(
    args: Subset<T, CharacterProfileUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CharacterProfile.
   * @param {CharacterProfileUpsertArgs} args - Arguments to update or create a CharacterProfile.
   * @example
   * // Update or create a CharacterProfile
   * const characterProfile = await prisma.characterProfile.upsert({
   *   create: {
   *     // ... data to create a CharacterProfile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterProfile we want to update
   *   }
   * })
   **/
  upsert<T extends CharacterProfileUpsertArgs>(
    args: Subset<T, CharacterProfileUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCharacterProfileArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterProfileArgs>(
    args: Subset<T, AggregateCharacterProfileArgs>
  ): Promise<GetCharacterProfileAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterProfile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(
    args?: Subset<T, CharacterArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character | null>,
    Prisma__CharacterClient<CharacterGetPayload<T> | null>
  >;

  region<T extends RegionArgs = {}>(
    args?: Subset<T, RegionArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region | null>,
    Prisma__RegionClient<RegionGetPayload<T> | null>
  >;

  specialtyDish<T extends ConsumeableArgs = {}>(
    args?: Subset<T, ConsumeableArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable | null>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T> | null>
  >;

  vision<T extends ElementArgs = {}>(
    args?: Subset<T, ElementArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element | null>,
    Prisma__ElementClient<ElementGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterProfile findOne
 */
export type FindOneCharacterProfileArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * Filter, which CharacterProfile to fetch.
   **/
  where: CharacterProfileWhereUniqueInput;
};

/**
 * CharacterProfile findMany
 */
export type FindManyCharacterProfileArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * Filter, which CharacterProfiles to fetch.
   **/
  where?: CharacterProfileWhereInput;
  /**
   * Determine the order of the CharacterProfiles to fetch.
   **/
  orderBy?: Enumerable<CharacterProfileOrderByInput>;
  /**
   * Sets the position for listing CharacterProfiles.
   **/
  cursor?: CharacterProfileWhereUniqueInput;
  /**
   * The number of CharacterProfiles to fetch. If negative number, it will take CharacterProfiles before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CharacterProfiles.
   **/
  skip?: number;
  distinct?: Enumerable<CharacterProfileDistinctFieldEnum>;
};

/**
 * CharacterProfile create
 */
export type CharacterProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * The data needed to create a CharacterProfile.
   **/
  data: CharacterProfileCreateInput;
};

/**
 * CharacterProfile update
 */
export type CharacterProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * The data needed to update a CharacterProfile.
   **/
  data: CharacterProfileUpdateInput;
  /**
   * Choose, which CharacterProfile to update.
   **/
  where: CharacterProfileWhereUniqueInput;
};

/**
 * CharacterProfile updateMany
 */
export type CharacterProfileUpdateManyArgs = {
  data: CharacterProfileUpdateManyMutationInput;
  where?: CharacterProfileWhereInput;
};

/**
 * CharacterProfile upsert
 */
export type CharacterProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * The filter to search for the CharacterProfile to update in case it exists.
   **/
  where: CharacterProfileWhereUniqueInput;
  /**
   * In case the CharacterProfile found by the `where` argument doesn't exist, create a new CharacterProfile with this data.
   **/
  create: CharacterProfileCreateInput;
  /**
   * In case the CharacterProfile was found with the provided `where` argument, update it with this data.
   **/
  update: CharacterProfileUpdateInput;
};

/**
 * CharacterProfile delete
 */
export type CharacterProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
  /**
   * Filter which CharacterProfile to delete.
   **/
  where: CharacterProfileWhereUniqueInput;
};

/**
 * CharacterProfile deleteMany
 */
export type CharacterProfileDeleteManyArgs = {
  where?: CharacterProfileWhereInput;
};

/**
 * CharacterProfile without action
 */
export type CharacterProfileArgs = {
  /**
   * Select specific fields to fetch from the CharacterProfile
   **/
  select?: CharacterProfileSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterProfileInclude | null;
};

/**
 * Model Talent
 */

export type Talent = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: JsonValue | null;
  details: JsonValue | null;
  name: string | null;
  type: string | null;
  characterId: string;
  talentLevelUpMaterialId: string | null;
};

export type AggregateTalent = {
  count: number;
};

export type AggregateTalentArgs = {
  where?: TalentWhereInput;
  orderBy?: Enumerable<TalentOrderByInput>;
  cursor?: TalentWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<TalentDistinctFieldEnum>;
  count?: true;
};

export type GetTalentAggregateType<T extends AggregateTalentArgs> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type TalentSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  description?: boolean;
  details?: boolean;
  name?: boolean;
  type?: boolean;
  character?: boolean | CharacterArgs;
  characterId?: boolean;
  talentLevelUpMaterial?: boolean | TalentLevelUpMaterialArgs;
  talentLevelUpMaterialId?: boolean;
};

export type TalentInclude = {
  character?: boolean | CharacterArgs;
  talentLevelUpMaterial?: boolean | TalentLevelUpMaterialArgs;
};

export type TalentGetPayload<
  S extends boolean | null | undefined | TalentArgs,
  U = keyof S
> = S extends true
  ? Talent
  : S extends undefined
  ? never
  : S extends TalentArgs | FindManyTalentArgs
  ? 'include' extends U
    ? Talent &
        {
          [P in TrueKeys<S['include']>]: P extends 'character'
            ? CharacterGetPayload<S['include'][P]>
            : P extends 'talentLevelUpMaterial'
            ? TalentLevelUpMaterialGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Talent
          ? Talent[P]
          : P extends 'character'
          ? CharacterGetPayload<S['select'][P]>
          : P extends 'talentLevelUpMaterial'
          ? TalentLevelUpMaterialGetPayload<S['select'][P]> | null
          : never;
      }
    : Talent
  : Talent;

export interface TalentDelegate {
  /**
   * Find zero or one Talent.
   * @param {FindOneTalentArgs} args - Arguments to find a Talent
   * @example
   * // Get one Talent
   * const talent = await prisma.talent.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneTalentArgs>(
    args: Subset<T, FindOneTalentArgs>
  ): CheckSelect<
    T,
    Prisma__TalentClient<Talent | null>,
    Prisma__TalentClient<TalentGetPayload<T> | null>
  >;
  /**
   * Find zero or more Talents.
   * @param {FindManyTalentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Talents
   * const talents = await prisma.talent.findMany()
   *
   * // Get first 10 Talents
   * const talents = await prisma.talent.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const talentWithIdOnly = await prisma.talent.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyTalentArgs>(
    args?: Subset<T, FindManyTalentArgs>
  ): CheckSelect<
    T,
    Promise<Array<Talent>>,
    Promise<Array<TalentGetPayload<T>>>
  >;
  /**
   * Create a Talent.
   * @param {TalentCreateArgs} args - Arguments to create a Talent.
   * @example
   * // Create one Talent
   * const Talent = await prisma.talent.create({
   *   data: {
   *     // ... data to create a Talent
   *   }
   * })
   *
   **/
  create<T extends TalentCreateArgs>(
    args: Subset<T, TalentCreateArgs>
  ): CheckSelect<
    T,
    Prisma__TalentClient<Talent>,
    Prisma__TalentClient<TalentGetPayload<T>>
  >;
  /**
   * Delete a Talent.
   * @param {TalentDeleteArgs} args - Arguments to delete one Talent.
   * @example
   * // Delete one Talent
   * const Talent = await prisma.talent.delete({
   *   where: {
   *     // ... filter to delete one Talent
   *   }
   * })
   *
   **/
  delete<T extends TalentDeleteArgs>(
    args: Subset<T, TalentDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__TalentClient<Talent>,
    Prisma__TalentClient<TalentGetPayload<T>>
  >;
  /**
   * Update one Talent.
   * @param {TalentUpdateArgs} args - Arguments to update one Talent.
   * @example
   * // Update one Talent
   * const talent = await prisma.talent.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends TalentUpdateArgs>(
    args: Subset<T, TalentUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__TalentClient<Talent>,
    Prisma__TalentClient<TalentGetPayload<T>>
  >;
  /**
   * Delete zero or more Talents.
   * @param {TalentDeleteManyArgs} args - Arguments to filter Talents to delete.
   * @example
   * // Delete a few Talents
   * const { count } = await prisma.talent.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends TalentDeleteManyArgs>(
    args: Subset<T, TalentDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Talents.
   * @param {TalentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Talents
   * const talent = await prisma.talent.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends TalentUpdateManyArgs>(
    args: Subset<T, TalentUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Talent.
   * @param {TalentUpsertArgs} args - Arguments to update or create a Talent.
   * @example
   * // Update or create a Talent
   * const talent = await prisma.talent.upsert({
   *   create: {
   *     // ... data to create a Talent
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Talent we want to update
   *   }
   * })
   **/
  upsert<T extends TalentUpsertArgs>(
    args: Subset<T, TalentUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__TalentClient<Talent>,
    Prisma__TalentClient<TalentGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyTalentArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTalentArgs>(
    args: Subset<T, AggregateTalentArgs>
  ): Promise<GetTalentAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Talent.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TalentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(
    args?: Subset<T, CharacterArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterClient<Character | null>,
    Prisma__CharacterClient<CharacterGetPayload<T> | null>
  >;

  talentLevelUpMaterial<T extends TalentLevelUpMaterialArgs = {}>(
    args?: Subset<T, TalentLevelUpMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial | null>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Talent findOne
 */
export type FindOneTalentArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * Filter, which Talent to fetch.
   **/
  where: TalentWhereUniqueInput;
};

/**
 * Talent findMany
 */
export type FindManyTalentArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * Filter, which Talents to fetch.
   **/
  where?: TalentWhereInput;
  /**
   * Determine the order of the Talents to fetch.
   **/
  orderBy?: Enumerable<TalentOrderByInput>;
  /**
   * Sets the position for listing Talents.
   **/
  cursor?: TalentWhereUniqueInput;
  /**
   * The number of Talents to fetch. If negative number, it will take Talents before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Talents.
   **/
  skip?: number;
  distinct?: Enumerable<TalentDistinctFieldEnum>;
};

/**
 * Talent create
 */
export type TalentCreateArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * The data needed to create a Talent.
   **/
  data: TalentCreateInput;
};

/**
 * Talent update
 */
export type TalentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * The data needed to update a Talent.
   **/
  data: TalentUpdateInput;
  /**
   * Choose, which Talent to update.
   **/
  where: TalentWhereUniqueInput;
};

/**
 * Talent updateMany
 */
export type TalentUpdateManyArgs = {
  data: TalentUpdateManyMutationInput;
  where?: TalentWhereInput;
};

/**
 * Talent upsert
 */
export type TalentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * The filter to search for the Talent to update in case it exists.
   **/
  where: TalentWhereUniqueInput;
  /**
   * In case the Talent found by the `where` argument doesn't exist, create a new Talent with this data.
   **/
  create: TalentCreateInput;
  /**
   * In case the Talent was found with the provided `where` argument, update it with this data.
   **/
  update: TalentUpdateInput;
};

/**
 * Talent delete
 */
export type TalentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
  /**
   * Filter which Talent to delete.
   **/
  where: TalentWhereUniqueInput;
};

/**
 * Talent deleteMany
 */
export type TalentDeleteManyArgs = {
  where?: TalentWhereInput;
};

/**
 * Talent without action
 */
export type TalentArgs = {
  /**
   * Select specific fields to fetch from the Talent
   **/
  select?: TalentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentInclude | null;
};

/**
 * Model Element
 */

export type Element = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  archon: string | null;
  statusEffect: string | null;
  theme: string | null;
  regionId: string | null;
};

export type AggregateElement = {
  count: number;
};

export type AggregateElementArgs = {
  where?: ElementWhereInput;
  orderBy?: Enumerable<ElementOrderByInput>;
  cursor?: ElementWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ElementDistinctFieldEnum>;
  count?: true;
};

export type GetElementAggregateType<T extends AggregateElementArgs> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type ElementSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  archon?: boolean;
  statusEffect?: boolean;
  theme?: boolean;
  characters?: boolean | FindManyCharacterArgs;
  characterProfiles?: boolean | FindManyCharacterProfileArgs;
  region?: boolean | RegionArgs;
  regionId?: boolean;
};

export type ElementInclude = {
  characters?: boolean | FindManyCharacterArgs;
  characterProfiles?: boolean | FindManyCharacterProfileArgs;
  region?: boolean | RegionArgs;
};

export type ElementGetPayload<
  S extends boolean | null | undefined | ElementArgs,
  U = keyof S
> = S extends true
  ? Element
  : S extends undefined
  ? never
  : S extends ElementArgs | FindManyElementArgs
  ? 'include' extends U
    ? Element &
        {
          [P in TrueKeys<S['include']>]: P extends 'characters'
            ? Array<CharacterGetPayload<S['include'][P]>>
            : P extends 'characterProfiles'
            ? Array<CharacterProfileGetPayload<S['include'][P]>>
            : P extends 'region'
            ? RegionGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Element
          ? Element[P]
          : P extends 'characters'
          ? Array<CharacterGetPayload<S['select'][P]>>
          : P extends 'characterProfiles'
          ? Array<CharacterProfileGetPayload<S['select'][P]>>
          : P extends 'region'
          ? RegionGetPayload<S['select'][P]> | null
          : never;
      }
    : Element
  : Element;

export interface ElementDelegate {
  /**
   * Find zero or one Element.
   * @param {FindOneElementArgs} args - Arguments to find a Element
   * @example
   * // Get one Element
   * const element = await prisma.element.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneElementArgs>(
    args: Subset<T, FindOneElementArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element | null>,
    Prisma__ElementClient<ElementGetPayload<T> | null>
  >;
  /**
   * Find zero or more Elements.
   * @param {FindManyElementArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Elements
   * const elements = await prisma.element.findMany()
   *
   * // Get first 10 Elements
   * const elements = await prisma.element.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyElementArgs>(
    args?: Subset<T, FindManyElementArgs>
  ): CheckSelect<
    T,
    Promise<Array<Element>>,
    Promise<Array<ElementGetPayload<T>>>
  >;
  /**
   * Create a Element.
   * @param {ElementCreateArgs} args - Arguments to create a Element.
   * @example
   * // Create one Element
   * const Element = await prisma.element.create({
   *   data: {
   *     // ... data to create a Element
   *   }
   * })
   *
   **/
  create<T extends ElementCreateArgs>(
    args: Subset<T, ElementCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element>,
    Prisma__ElementClient<ElementGetPayload<T>>
  >;
  /**
   * Delete a Element.
   * @param {ElementDeleteArgs} args - Arguments to delete one Element.
   * @example
   * // Delete one Element
   * const Element = await prisma.element.delete({
   *   where: {
   *     // ... filter to delete one Element
   *   }
   * })
   *
   **/
  delete<T extends ElementDeleteArgs>(
    args: Subset<T, ElementDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element>,
    Prisma__ElementClient<ElementGetPayload<T>>
  >;
  /**
   * Update one Element.
   * @param {ElementUpdateArgs} args - Arguments to update one Element.
   * @example
   * // Update one Element
   * const element = await prisma.element.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ElementUpdateArgs>(
    args: Subset<T, ElementUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element>,
    Prisma__ElementClient<ElementGetPayload<T>>
  >;
  /**
   * Delete zero or more Elements.
   * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
   * @example
   * // Delete a few Elements
   * const { count } = await prisma.element.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ElementDeleteManyArgs>(
    args: Subset<T, ElementDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Elements.
   * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Elements
   * const element = await prisma.element.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ElementUpdateManyArgs>(
    args: Subset<T, ElementUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Element.
   * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
   * @example
   * // Update or create a Element
   * const element = await prisma.element.upsert({
   *   create: {
   *     // ... data to create a Element
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Element we want to update
   *   }
   * })
   **/
  upsert<T extends ElementUpsertArgs>(
    args: Subset<T, ElementUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element>,
    Prisma__ElementClient<ElementGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyElementArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateElementArgs>(
    args: Subset<T, AggregateElementArgs>
  ): Promise<GetElementAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Element.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ElementClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  characters<T extends FindManyCharacterArgs = {}>(
    args?: Subset<T, FindManyCharacterArgs>
  ): CheckSelect<
    T,
    Promise<Array<Character>>,
    Promise<Array<CharacterGetPayload<T>>>
  >;

  characterProfiles<T extends FindManyCharacterProfileArgs = {}>(
    args?: Subset<T, FindManyCharacterProfileArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterProfile>>,
    Promise<Array<CharacterProfileGetPayload<T>>>
  >;

  region<T extends RegionArgs = {}>(
    args?: Subset<T, RegionArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region | null>,
    Prisma__RegionClient<RegionGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Element findOne
 */
export type FindOneElementArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * Filter, which Element to fetch.
   **/
  where: ElementWhereUniqueInput;
};

/**
 * Element findMany
 */
export type FindManyElementArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * Filter, which Elements to fetch.
   **/
  where?: ElementWhereInput;
  /**
   * Determine the order of the Elements to fetch.
   **/
  orderBy?: Enumerable<ElementOrderByInput>;
  /**
   * Sets the position for listing Elements.
   **/
  cursor?: ElementWhereUniqueInput;
  /**
   * The number of Elements to fetch. If negative number, it will take Elements before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Elements.
   **/
  skip?: number;
  distinct?: Enumerable<ElementDistinctFieldEnum>;
};

/**
 * Element create
 */
export type ElementCreateArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * The data needed to create a Element.
   **/
  data: ElementCreateInput;
};

/**
 * Element update
 */
export type ElementUpdateArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * The data needed to update a Element.
   **/
  data: ElementUpdateInput;
  /**
   * Choose, which Element to update.
   **/
  where: ElementWhereUniqueInput;
};

/**
 * Element updateMany
 */
export type ElementUpdateManyArgs = {
  data: ElementUpdateManyMutationInput;
  where?: ElementWhereInput;
};

/**
 * Element upsert
 */
export type ElementUpsertArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * The filter to search for the Element to update in case it exists.
   **/
  where: ElementWhereUniqueInput;
  /**
   * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
   **/
  create: ElementCreateInput;
  /**
   * In case the Element was found with the provided `where` argument, update it with this data.
   **/
  update: ElementUpdateInput;
};

/**
 * Element delete
 */
export type ElementDeleteArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
  /**
   * Filter which Element to delete.
   **/
  where: ElementWhereUniqueInput;
};

/**
 * Element deleteMany
 */
export type ElementDeleteManyArgs = {
  where?: ElementWhereInput;
};

/**
 * Element without action
 */
export type ElementArgs = {
  /**
   * Select specific fields to fetch from the Element
   **/
  select?: ElementSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ElementInclude | null;
};

/**
 * Model Region
 */

export type Region = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};

export type AggregateRegion = {
  count: number;
};

export type AggregateRegionArgs = {
  where?: RegionWhereInput;
  orderBy?: Enumerable<RegionOrderByInput>;
  cursor?: RegionWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<RegionDistinctFieldEnum>;
  count?: true;
};

export type GetRegionAggregateType<T extends AggregateRegionArgs> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type RegionSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  characterProfile?: boolean | FindManyCharacterProfileArgs;
  domains?: boolean | FindManyDomainArgs;
  element?: boolean | ElementArgs;
};

export type RegionInclude = {
  characterProfile?: boolean | FindManyCharacterProfileArgs;
  domains?: boolean | FindManyDomainArgs;
  element?: boolean | ElementArgs;
};

export type RegionGetPayload<
  S extends boolean | null | undefined | RegionArgs,
  U = keyof S
> = S extends true
  ? Region
  : S extends undefined
  ? never
  : S extends RegionArgs | FindManyRegionArgs
  ? 'include' extends U
    ? Region &
        {
          [P in TrueKeys<S['include']>]: P extends 'characterProfile'
            ? Array<CharacterProfileGetPayload<S['include'][P]>>
            : P extends 'domains'
            ? Array<DomainGetPayload<S['include'][P]>>
            : P extends 'element'
            ? ElementGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Region
          ? Region[P]
          : P extends 'characterProfile'
          ? Array<CharacterProfileGetPayload<S['select'][P]>>
          : P extends 'domains'
          ? Array<DomainGetPayload<S['select'][P]>>
          : P extends 'element'
          ? ElementGetPayload<S['select'][P]> | null
          : never;
      }
    : Region
  : Region;

export interface RegionDelegate {
  /**
   * Find zero or one Region.
   * @param {FindOneRegionArgs} args - Arguments to find a Region
   * @example
   * // Get one Region
   * const region = await prisma.region.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneRegionArgs>(
    args: Subset<T, FindOneRegionArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region | null>,
    Prisma__RegionClient<RegionGetPayload<T> | null>
  >;
  /**
   * Find zero or more Regions.
   * @param {FindManyRegionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Regions
   * const regions = await prisma.region.findMany()
   *
   * // Get first 10 Regions
   * const regions = await prisma.region.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyRegionArgs>(
    args?: Subset<T, FindManyRegionArgs>
  ): CheckSelect<
    T,
    Promise<Array<Region>>,
    Promise<Array<RegionGetPayload<T>>>
  >;
  /**
   * Create a Region.
   * @param {RegionCreateArgs} args - Arguments to create a Region.
   * @example
   * // Create one Region
   * const Region = await prisma.region.create({
   *   data: {
   *     // ... data to create a Region
   *   }
   * })
   *
   **/
  create<T extends RegionCreateArgs>(
    args: Subset<T, RegionCreateArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region>,
    Prisma__RegionClient<RegionGetPayload<T>>
  >;
  /**
   * Delete a Region.
   * @param {RegionDeleteArgs} args - Arguments to delete one Region.
   * @example
   * // Delete one Region
   * const Region = await prisma.region.delete({
   *   where: {
   *     // ... filter to delete one Region
   *   }
   * })
   *
   **/
  delete<T extends RegionDeleteArgs>(
    args: Subset<T, RegionDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region>,
    Prisma__RegionClient<RegionGetPayload<T>>
  >;
  /**
   * Update one Region.
   * @param {RegionUpdateArgs} args - Arguments to update one Region.
   * @example
   * // Update one Region
   * const region = await prisma.region.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends RegionUpdateArgs>(
    args: Subset<T, RegionUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region>,
    Prisma__RegionClient<RegionGetPayload<T>>
  >;
  /**
   * Delete zero or more Regions.
   * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
   * @example
   * // Delete a few Regions
   * const { count } = await prisma.region.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends RegionDeleteManyArgs>(
    args: Subset<T, RegionDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Regions.
   * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Regions
   * const region = await prisma.region.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends RegionUpdateManyArgs>(
    args: Subset<T, RegionUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Region.
   * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
   * @example
   * // Update or create a Region
   * const region = await prisma.region.upsert({
   *   create: {
   *     // ... data to create a Region
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Region we want to update
   *   }
   * })
   **/
  upsert<T extends RegionUpsertArgs>(
    args: Subset<T, RegionUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region>,
    Prisma__RegionClient<RegionGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyRegionArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRegionArgs>(
    args: Subset<T, AggregateRegionArgs>
  ): Promise<GetRegionAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Region.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RegionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  characterProfile<T extends FindManyCharacterProfileArgs = {}>(
    args?: Subset<T, FindManyCharacterProfileArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterProfile>>,
    Promise<Array<CharacterProfileGetPayload<T>>>
  >;

  domains<T extends FindManyDomainArgs = {}>(
    args?: Subset<T, FindManyDomainArgs>
  ): CheckSelect<
    T,
    Promise<Array<Domain>>,
    Promise<Array<DomainGetPayload<T>>>
  >;

  element<T extends ElementArgs = {}>(
    args?: Subset<T, ElementArgs>
  ): CheckSelect<
    T,
    Prisma__ElementClient<Element | null>,
    Prisma__ElementClient<ElementGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Region findOne
 */
export type FindOneRegionArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * Filter, which Region to fetch.
   **/
  where: RegionWhereUniqueInput;
};

/**
 * Region findMany
 */
export type FindManyRegionArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * Filter, which Regions to fetch.
   **/
  where?: RegionWhereInput;
  /**
   * Determine the order of the Regions to fetch.
   **/
  orderBy?: Enumerable<RegionOrderByInput>;
  /**
   * Sets the position for listing Regions.
   **/
  cursor?: RegionWhereUniqueInput;
  /**
   * The number of Regions to fetch. If negative number, it will take Regions before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Regions.
   **/
  skip?: number;
  distinct?: Enumerable<RegionDistinctFieldEnum>;
};

/**
 * Region create
 */
export type RegionCreateArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * The data needed to create a Region.
   **/
  data: RegionCreateInput;
};

/**
 * Region update
 */
export type RegionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * The data needed to update a Region.
   **/
  data: RegionUpdateInput;
  /**
   * Choose, which Region to update.
   **/
  where: RegionWhereUniqueInput;
};

/**
 * Region updateMany
 */
export type RegionUpdateManyArgs = {
  data: RegionUpdateManyMutationInput;
  where?: RegionWhereInput;
};

/**
 * Region upsert
 */
export type RegionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * The filter to search for the Region to update in case it exists.
   **/
  where: RegionWhereUniqueInput;
  /**
   * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
   **/
  create: RegionCreateInput;
  /**
   * In case the Region was found with the provided `where` argument, update it with this data.
   **/
  update: RegionUpdateInput;
};

/**
 * Region delete
 */
export type RegionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
  /**
   * Filter which Region to delete.
   **/
  where: RegionWhereUniqueInput;
};

/**
 * Region deleteMany
 */
export type RegionDeleteManyArgs = {
  where?: RegionWhereInput;
};

/**
 * Region without action
 */
export type RegionArgs = {
  /**
   * Select specific fields to fetch from the Region
   **/
  select?: RegionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: RegionInclude | null;
};

/**
 * Model Weapon
 */

export type Weapon = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  baseStats: JsonValue | null;
  description: string | null;
  image: string | null;
  lore: string | null;
  passive: JsonValue | null;
  rarity: number | null;
  refinements: JsonValue | null;
  stats: JsonValue | null;
  secondaryStatType: WeaponSecondaryStatType | null;
  type: WeaponType;
};

export type AggregateWeapon = {
  count: number;
  avg: WeaponAvgAggregateOutputType | null;
  sum: WeaponSumAggregateOutputType | null;
  min: WeaponMinAggregateOutputType | null;
  max: WeaponMaxAggregateOutputType | null;
};

export type WeaponAvgAggregateOutputType = {
  rarity: number;
};

export type WeaponSumAggregateOutputType = {
  rarity: number | null;
};

export type WeaponMinAggregateOutputType = {
  rarity: number | null;
};

export type WeaponMaxAggregateOutputType = {
  rarity: number | null;
};

export type WeaponAvgAggregateInputType = {
  rarity?: true;
};

export type WeaponSumAggregateInputType = {
  rarity?: true;
};

export type WeaponMinAggregateInputType = {
  rarity?: true;
};

export type WeaponMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateWeaponArgs = {
  where?: WeaponWhereInput;
  orderBy?: Enumerable<WeaponOrderByInput>;
  cursor?: WeaponWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<WeaponDistinctFieldEnum>;
  count?: true;
  avg?: WeaponAvgAggregateInputType;
  sum?: WeaponSumAggregateInputType;
  min?: WeaponMinAggregateInputType;
  max?: WeaponMaxAggregateInputType;
};

export type GetWeaponAggregateType<T extends AggregateWeaponArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetWeaponAggregateScalarType<T[P]>;
};

export type GetWeaponAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WeaponAvgAggregateOutputType
    ? WeaponAvgAggregateOutputType[P]
    : never;
};

export type WeaponSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  baseStats?: boolean;
  description?: boolean;
  image?: boolean;
  lore?: boolean;
  passive?: boolean;
  rarity?: boolean;
  refinements?: boolean;
  stats?: boolean;
  secondaryStatType?: boolean;
  type?: boolean;
  ascensions?: boolean | FindManyWeaponAscensionArgs;
  forgeRecipe?: boolean | ForgeRecipeArgs;
};

export type WeaponInclude = {
  ascensions?: boolean | FindManyWeaponAscensionArgs;
  forgeRecipe?: boolean | ForgeRecipeArgs;
};

export type WeaponGetPayload<
  S extends boolean | null | undefined | WeaponArgs,
  U = keyof S
> = S extends true
  ? Weapon
  : S extends undefined
  ? never
  : S extends WeaponArgs | FindManyWeaponArgs
  ? 'include' extends U
    ? Weapon &
        {
          [P in TrueKeys<S['include']>]: P extends 'ascensions'
            ? Array<WeaponAscensionGetPayload<S['include'][P]>>
            : P extends 'forgeRecipe'
            ? ForgeRecipeGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Weapon
          ? Weapon[P]
          : P extends 'ascensions'
          ? Array<WeaponAscensionGetPayload<S['select'][P]>>
          : P extends 'forgeRecipe'
          ? ForgeRecipeGetPayload<S['select'][P]> | null
          : never;
      }
    : Weapon
  : Weapon;

export interface WeaponDelegate {
  /**
   * Find zero or one Weapon.
   * @param {FindOneWeaponArgs} args - Arguments to find a Weapon
   * @example
   * // Get one Weapon
   * const weapon = await prisma.weapon.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneWeaponArgs>(
    args: Subset<T, FindOneWeaponArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon | null>,
    Prisma__WeaponClient<WeaponGetPayload<T> | null>
  >;
  /**
   * Find zero or more Weapons.
   * @param {FindManyWeaponArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Weapons
   * const weapons = await prisma.weapon.findMany()
   *
   * // Get first 10 Weapons
   * const weapons = await prisma.weapon.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const weaponWithIdOnly = await prisma.weapon.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyWeaponArgs>(
    args?: Subset<T, FindManyWeaponArgs>
  ): CheckSelect<
    T,
    Promise<Array<Weapon>>,
    Promise<Array<WeaponGetPayload<T>>>
  >;
  /**
   * Create a Weapon.
   * @param {WeaponCreateArgs} args - Arguments to create a Weapon.
   * @example
   * // Create one Weapon
   * const Weapon = await prisma.weapon.create({
   *   data: {
   *     // ... data to create a Weapon
   *   }
   * })
   *
   **/
  create<T extends WeaponCreateArgs>(
    args: Subset<T, WeaponCreateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon>,
    Prisma__WeaponClient<WeaponGetPayload<T>>
  >;
  /**
   * Delete a Weapon.
   * @param {WeaponDeleteArgs} args - Arguments to delete one Weapon.
   * @example
   * // Delete one Weapon
   * const Weapon = await prisma.weapon.delete({
   *   where: {
   *     // ... filter to delete one Weapon
   *   }
   * })
   *
   **/
  delete<T extends WeaponDeleteArgs>(
    args: Subset<T, WeaponDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon>,
    Prisma__WeaponClient<WeaponGetPayload<T>>
  >;
  /**
   * Update one Weapon.
   * @param {WeaponUpdateArgs} args - Arguments to update one Weapon.
   * @example
   * // Update one Weapon
   * const weapon = await prisma.weapon.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends WeaponUpdateArgs>(
    args: Subset<T, WeaponUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon>,
    Prisma__WeaponClient<WeaponGetPayload<T>>
  >;
  /**
   * Delete zero or more Weapons.
   * @param {WeaponDeleteManyArgs} args - Arguments to filter Weapons to delete.
   * @example
   * // Delete a few Weapons
   * const { count } = await prisma.weapon.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends WeaponDeleteManyArgs>(
    args: Subset<T, WeaponDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Weapons.
   * @param {WeaponUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Weapons
   * const weapon = await prisma.weapon.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends WeaponUpdateManyArgs>(
    args: Subset<T, WeaponUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Weapon.
   * @param {WeaponUpsertArgs} args - Arguments to update or create a Weapon.
   * @example
   * // Update or create a Weapon
   * const weapon = await prisma.weapon.upsert({
   *   create: {
   *     // ... data to create a Weapon
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Weapon we want to update
   *   }
   * })
   **/
  upsert<T extends WeaponUpsertArgs>(
    args: Subset<T, WeaponUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon>,
    Prisma__WeaponClient<WeaponGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyWeaponArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWeaponArgs>(
    args: Subset<T, AggregateWeaponArgs>
  ): Promise<GetWeaponAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Weapon.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WeaponClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  ascensions<T extends FindManyWeaponAscensionArgs = {}>(
    args?: Subset<T, FindManyWeaponAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscension>>,
    Promise<Array<WeaponAscensionGetPayload<T>>>
  >;

  forgeRecipe<T extends ForgeRecipeArgs = {}>(
    args?: Subset<T, ForgeRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe | null>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Weapon findOne
 */
export type FindOneWeaponArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * Filter, which Weapon to fetch.
   **/
  where: WeaponWhereUniqueInput;
};

/**
 * Weapon findMany
 */
export type FindManyWeaponArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * Filter, which Weapons to fetch.
   **/
  where?: WeaponWhereInput;
  /**
   * Determine the order of the Weapons to fetch.
   **/
  orderBy?: Enumerable<WeaponOrderByInput>;
  /**
   * Sets the position for listing Weapons.
   **/
  cursor?: WeaponWhereUniqueInput;
  /**
   * The number of Weapons to fetch. If negative number, it will take Weapons before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Weapons.
   **/
  skip?: number;
  distinct?: Enumerable<WeaponDistinctFieldEnum>;
};

/**
 * Weapon create
 */
export type WeaponCreateArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * The data needed to create a Weapon.
   **/
  data: WeaponCreateInput;
};

/**
 * Weapon update
 */
export type WeaponUpdateArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * The data needed to update a Weapon.
   **/
  data: WeaponUpdateInput;
  /**
   * Choose, which Weapon to update.
   **/
  where: WeaponWhereUniqueInput;
};

/**
 * Weapon updateMany
 */
export type WeaponUpdateManyArgs = {
  data: WeaponUpdateManyMutationInput;
  where?: WeaponWhereInput;
};

/**
 * Weapon upsert
 */
export type WeaponUpsertArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * The filter to search for the Weapon to update in case it exists.
   **/
  where: WeaponWhereUniqueInput;
  /**
   * In case the Weapon found by the `where` argument doesn't exist, create a new Weapon with this data.
   **/
  create: WeaponCreateInput;
  /**
   * In case the Weapon was found with the provided `where` argument, update it with this data.
   **/
  update: WeaponUpdateInput;
};

/**
 * Weapon delete
 */
export type WeaponDeleteArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
  /**
   * Filter which Weapon to delete.
   **/
  where: WeaponWhereUniqueInput;
};

/**
 * Weapon deleteMany
 */
export type WeaponDeleteManyArgs = {
  where?: WeaponWhereInput;
};

/**
 * Weapon without action
 */
export type WeaponArgs = {
  /**
   * Select specific fields to fetch from the Weapon
   **/
  select?: WeaponSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponInclude | null;
};

/**
 * Model WeaponAscension
 */

export type WeaponAscension = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  maxLevel: number;
  recipe: JsonValue | null;
  weaponAscensionMaterialId: string | null;
  weaponId: string | null;
};

export type AggregateWeaponAscension = {
  count: number;
  avg: WeaponAscensionAvgAggregateOutputType | null;
  sum: WeaponAscensionSumAggregateOutputType | null;
  min: WeaponAscensionMinAggregateOutputType | null;
  max: WeaponAscensionMaxAggregateOutputType | null;
};

export type WeaponAscensionAvgAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type WeaponAscensionSumAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type WeaponAscensionMinAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type WeaponAscensionMaxAggregateOutputType = {
  level: number;
  maxLevel: number;
};

export type WeaponAscensionAvgAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type WeaponAscensionSumAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type WeaponAscensionMinAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type WeaponAscensionMaxAggregateInputType = {
  level?: true;
  maxLevel?: true;
};

export type AggregateWeaponAscensionArgs = {
  where?: WeaponAscensionWhereInput;
  orderBy?: Enumerable<WeaponAscensionOrderByInput>;
  cursor?: WeaponAscensionWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<WeaponAscensionDistinctFieldEnum>;
  count?: true;
  avg?: WeaponAscensionAvgAggregateInputType;
  sum?: WeaponAscensionSumAggregateInputType;
  min?: WeaponAscensionMinAggregateInputType;
  max?: WeaponAscensionMaxAggregateInputType;
};

export type GetWeaponAscensionAggregateType<
  T extends AggregateWeaponAscensionArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetWeaponAscensionAggregateScalarType<T[P]>;
};

export type GetWeaponAscensionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WeaponAscensionAvgAggregateOutputType
    ? WeaponAscensionAvgAggregateOutputType[P]
    : never;
};

export type WeaponAscensionSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  level?: boolean;
  maxLevel?: boolean;
  recipe?: boolean;
  commonAscensionMaterials?: boolean | FindManyCommonAscensionMaterialArgs;
  weaponAscensionMaterial?: boolean | WeaponAscensionMaterialArgs;
  weaponAscensionMaterialId?: boolean;
  weapon?: boolean | WeaponArgs;
  weaponId?: boolean;
};

export type WeaponAscensionInclude = {
  commonAscensionMaterials?: boolean | FindManyCommonAscensionMaterialArgs;
  weaponAscensionMaterial?: boolean | WeaponAscensionMaterialArgs;
  weapon?: boolean | WeaponArgs;
};

export type WeaponAscensionGetPayload<
  S extends boolean | null | undefined | WeaponAscensionArgs,
  U = keyof S
> = S extends true
  ? WeaponAscension
  : S extends undefined
  ? never
  : S extends WeaponAscensionArgs | FindManyWeaponAscensionArgs
  ? 'include' extends U
    ? WeaponAscension &
        {
          [P in TrueKeys<S['include']>]: P extends 'commonAscensionMaterials'
            ? Array<CommonAscensionMaterialGetPayload<S['include'][P]>>
            : P extends 'weaponAscensionMaterial'
            ? WeaponAscensionMaterialGetPayload<S['include'][P]> | null
            : P extends 'weapon'
            ? WeaponGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof WeaponAscension
          ? WeaponAscension[P]
          : P extends 'commonAscensionMaterials'
          ? Array<CommonAscensionMaterialGetPayload<S['select'][P]>>
          : P extends 'weaponAscensionMaterial'
          ? WeaponAscensionMaterialGetPayload<S['select'][P]> | null
          : P extends 'weapon'
          ? WeaponGetPayload<S['select'][P]> | null
          : never;
      }
    : WeaponAscension
  : WeaponAscension;

export interface WeaponAscensionDelegate {
  /**
   * Find zero or one WeaponAscension.
   * @param {FindOneWeaponAscensionArgs} args - Arguments to find a WeaponAscension
   * @example
   * // Get one WeaponAscension
   * const weaponAscension = await prisma.weaponAscension.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneWeaponAscensionArgs>(
    args: Subset<T, FindOneWeaponAscensionArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionClient<WeaponAscension | null>,
    Prisma__WeaponAscensionClient<WeaponAscensionGetPayload<T> | null>
  >;
  /**
   * Find zero or more WeaponAscensions.
   * @param {FindManyWeaponAscensionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all WeaponAscensions
   * const weaponAscensions = await prisma.weaponAscension.findMany()
   *
   * // Get first 10 WeaponAscensions
   * const weaponAscensions = await prisma.weaponAscension.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const weaponAscensionWithIdOnly = await prisma.weaponAscension.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyWeaponAscensionArgs>(
    args?: Subset<T, FindManyWeaponAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscension>>,
    Promise<Array<WeaponAscensionGetPayload<T>>>
  >;
  /**
   * Create a WeaponAscension.
   * @param {WeaponAscensionCreateArgs} args - Arguments to create a WeaponAscension.
   * @example
   * // Create one WeaponAscension
   * const WeaponAscension = await prisma.weaponAscension.create({
   *   data: {
   *     // ... data to create a WeaponAscension
   *   }
   * })
   *
   **/
  create<T extends WeaponAscensionCreateArgs>(
    args: Subset<T, WeaponAscensionCreateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionClient<WeaponAscension>,
    Prisma__WeaponAscensionClient<WeaponAscensionGetPayload<T>>
  >;
  /**
   * Delete a WeaponAscension.
   * @param {WeaponAscensionDeleteArgs} args - Arguments to delete one WeaponAscension.
   * @example
   * // Delete one WeaponAscension
   * const WeaponAscension = await prisma.weaponAscension.delete({
   *   where: {
   *     // ... filter to delete one WeaponAscension
   *   }
   * })
   *
   **/
  delete<T extends WeaponAscensionDeleteArgs>(
    args: Subset<T, WeaponAscensionDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionClient<WeaponAscension>,
    Prisma__WeaponAscensionClient<WeaponAscensionGetPayload<T>>
  >;
  /**
   * Update one WeaponAscension.
   * @param {WeaponAscensionUpdateArgs} args - Arguments to update one WeaponAscension.
   * @example
   * // Update one WeaponAscension
   * const weaponAscension = await prisma.weaponAscension.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends WeaponAscensionUpdateArgs>(
    args: Subset<T, WeaponAscensionUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionClient<WeaponAscension>,
    Prisma__WeaponAscensionClient<WeaponAscensionGetPayload<T>>
  >;
  /**
   * Delete zero or more WeaponAscensions.
   * @param {WeaponAscensionDeleteManyArgs} args - Arguments to filter WeaponAscensions to delete.
   * @example
   * // Delete a few WeaponAscensions
   * const { count } = await prisma.weaponAscension.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends WeaponAscensionDeleteManyArgs>(
    args: Subset<T, WeaponAscensionDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more WeaponAscensions.
   * @param {WeaponAscensionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many WeaponAscensions
   * const weaponAscension = await prisma.weaponAscension.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends WeaponAscensionUpdateManyArgs>(
    args: Subset<T, WeaponAscensionUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one WeaponAscension.
   * @param {WeaponAscensionUpsertArgs} args - Arguments to update or create a WeaponAscension.
   * @example
   * // Update or create a WeaponAscension
   * const weaponAscension = await prisma.weaponAscension.upsert({
   *   create: {
   *     // ... data to create a WeaponAscension
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the WeaponAscension we want to update
   *   }
   * })
   **/
  upsert<T extends WeaponAscensionUpsertArgs>(
    args: Subset<T, WeaponAscensionUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionClient<WeaponAscension>,
    Prisma__WeaponAscensionClient<WeaponAscensionGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyWeaponAscensionArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWeaponAscensionArgs>(
    args: Subset<T, AggregateWeaponAscensionArgs>
  ): Promise<GetWeaponAscensionAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for WeaponAscension.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WeaponAscensionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  commonAscensionMaterials<T extends FindManyCommonAscensionMaterialArgs = {}>(
    args?: Subset<T, FindManyCommonAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CommonAscensionMaterial>>,
    Promise<Array<CommonAscensionMaterialGetPayload<T>>>
  >;

  weaponAscensionMaterial<T extends WeaponAscensionMaterialArgs = {}>(
    args?: Subset<T, WeaponAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial | null>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T> | null>
  >;

  weapon<T extends WeaponArgs = {}>(
    args?: Subset<T, WeaponArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon | null>,
    Prisma__WeaponClient<WeaponGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * WeaponAscension findOne
 */
export type FindOneWeaponAscensionArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * Filter, which WeaponAscension to fetch.
   **/
  where: WeaponAscensionWhereUniqueInput;
};

/**
 * WeaponAscension findMany
 */
export type FindManyWeaponAscensionArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * Filter, which WeaponAscensions to fetch.
   **/
  where?: WeaponAscensionWhereInput;
  /**
   * Determine the order of the WeaponAscensions to fetch.
   **/
  orderBy?: Enumerable<WeaponAscensionOrderByInput>;
  /**
   * Sets the position for listing WeaponAscensions.
   **/
  cursor?: WeaponAscensionWhereUniqueInput;
  /**
   * The number of WeaponAscensions to fetch. If negative number, it will take WeaponAscensions before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` WeaponAscensions.
   **/
  skip?: number;
  distinct?: Enumerable<WeaponAscensionDistinctFieldEnum>;
};

/**
 * WeaponAscension create
 */
export type WeaponAscensionCreateArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * The data needed to create a WeaponAscension.
   **/
  data: WeaponAscensionCreateInput;
};

/**
 * WeaponAscension update
 */
export type WeaponAscensionUpdateArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * The data needed to update a WeaponAscension.
   **/
  data: WeaponAscensionUpdateInput;
  /**
   * Choose, which WeaponAscension to update.
   **/
  where: WeaponAscensionWhereUniqueInput;
};

/**
 * WeaponAscension updateMany
 */
export type WeaponAscensionUpdateManyArgs = {
  data: WeaponAscensionUpdateManyMutationInput;
  where?: WeaponAscensionWhereInput;
};

/**
 * WeaponAscension upsert
 */
export type WeaponAscensionUpsertArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * The filter to search for the WeaponAscension to update in case it exists.
   **/
  where: WeaponAscensionWhereUniqueInput;
  /**
   * In case the WeaponAscension found by the `where` argument doesn't exist, create a new WeaponAscension with this data.
   **/
  create: WeaponAscensionCreateInput;
  /**
   * In case the WeaponAscension was found with the provided `where` argument, update it with this data.
   **/
  update: WeaponAscensionUpdateInput;
};

/**
 * WeaponAscension delete
 */
export type WeaponAscensionDeleteArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
  /**
   * Filter which WeaponAscension to delete.
   **/
  where: WeaponAscensionWhereUniqueInput;
};

/**
 * WeaponAscension deleteMany
 */
export type WeaponAscensionDeleteManyArgs = {
  where?: WeaponAscensionWhereInput;
};

/**
 * WeaponAscension without action
 */
export type WeaponAscensionArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscension
   **/
  select?: WeaponAscensionSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionInclude | null;
};

/**
 * Model CommonAscensionMaterial
 */

export type CommonAscensionMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  group: CommonAscensionMaterialGroup;
};

export type AggregateCommonAscensionMaterial = {
  count: number;
  avg: CommonAscensionMaterialAvgAggregateOutputType | null;
  sum: CommonAscensionMaterialSumAggregateOutputType | null;
  min: CommonAscensionMaterialMinAggregateOutputType | null;
  max: CommonAscensionMaterialMaxAggregateOutputType | null;
};

export type CommonAscensionMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type CommonAscensionMaterialSumAggregateOutputType = {
  rarity: number;
};

export type CommonAscensionMaterialMinAggregateOutputType = {
  rarity: number;
};

export type CommonAscensionMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type CommonAscensionMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type CommonAscensionMaterialSumAggregateInputType = {
  rarity?: true;
};

export type CommonAscensionMaterialMinAggregateInputType = {
  rarity?: true;
};

export type CommonAscensionMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCommonAscensionMaterialArgs = {
  where?: CommonAscensionMaterialWhereInput;
  orderBy?: Enumerable<CommonAscensionMaterialOrderByInput>;
  cursor?: CommonAscensionMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CommonAscensionMaterialDistinctFieldEnum>;
  count?: true;
  avg?: CommonAscensionMaterialAvgAggregateInputType;
  sum?: CommonAscensionMaterialSumAggregateInputType;
  min?: CommonAscensionMaterialMinAggregateInputType;
  max?: CommonAscensionMaterialMaxAggregateInputType;
};

export type GetCommonAscensionMaterialAggregateType<
  T extends AggregateCommonAscensionMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCommonAscensionMaterialAggregateScalarType<T[P]>;
};

export type GetCommonAscensionMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CommonAscensionMaterialAvgAggregateOutputType
    ? CommonAscensionMaterialAvgAggregateOutputType[P]
    : never;
};

export type CommonAscensionMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  group?: boolean;
  characterAscensions?: boolean | FindManyCharacterAscensionArgs;
  weaponAscensions?: boolean | FindManyWeaponAscensionArgs;
};

export type CommonAscensionMaterialInclude = {
  characterAscensions?: boolean | FindManyCharacterAscensionArgs;
  weaponAscensions?: boolean | FindManyWeaponAscensionArgs;
};

export type CommonAscensionMaterialGetPayload<
  S extends boolean | null | undefined | CommonAscensionMaterialArgs,
  U = keyof S
> = S extends true
  ? CommonAscensionMaterial
  : S extends undefined
  ? never
  : S extends CommonAscensionMaterialArgs | FindManyCommonAscensionMaterialArgs
  ? 'include' extends U
    ? CommonAscensionMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'characterAscensions'
            ? Array<CharacterAscensionGetPayload<S['include'][P]>>
            : P extends 'weaponAscensions'
            ? Array<WeaponAscensionGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CommonAscensionMaterial
          ? CommonAscensionMaterial[P]
          : P extends 'characterAscensions'
          ? Array<CharacterAscensionGetPayload<S['select'][P]>>
          : P extends 'weaponAscensions'
          ? Array<WeaponAscensionGetPayload<S['select'][P]>>
          : never;
      }
    : CommonAscensionMaterial
  : CommonAscensionMaterial;

export interface CommonAscensionMaterialDelegate {
  /**
   * Find zero or one CommonAscensionMaterial.
   * @param {FindOneCommonAscensionMaterialArgs} args - Arguments to find a CommonAscensionMaterial
   * @example
   * // Get one CommonAscensionMaterial
   * const commonAscensionMaterial = await prisma.commonAscensionMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCommonAscensionMaterialArgs>(
    args: Subset<T, FindOneCommonAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterial | null>,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more CommonAscensionMaterials.
   * @param {FindManyCommonAscensionMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CommonAscensionMaterials
   * const commonAscensionMaterials = await prisma.commonAscensionMaterial.findMany()
   *
   * // Get first 10 CommonAscensionMaterials
   * const commonAscensionMaterials = await prisma.commonAscensionMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const commonAscensionMaterialWithIdOnly = await prisma.commonAscensionMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCommonAscensionMaterialArgs>(
    args?: Subset<T, FindManyCommonAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CommonAscensionMaterial>>,
    Promise<Array<CommonAscensionMaterialGetPayload<T>>>
  >;
  /**
   * Create a CommonAscensionMaterial.
   * @param {CommonAscensionMaterialCreateArgs} args - Arguments to create a CommonAscensionMaterial.
   * @example
   * // Create one CommonAscensionMaterial
   * const CommonAscensionMaterial = await prisma.commonAscensionMaterial.create({
   *   data: {
   *     // ... data to create a CommonAscensionMaterial
   *   }
   * })
   *
   **/
  create<T extends CommonAscensionMaterialCreateArgs>(
    args: Subset<T, CommonAscensionMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterial>,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterialGetPayload<T>>
  >;
  /**
   * Delete a CommonAscensionMaterial.
   * @param {CommonAscensionMaterialDeleteArgs} args - Arguments to delete one CommonAscensionMaterial.
   * @example
   * // Delete one CommonAscensionMaterial
   * const CommonAscensionMaterial = await prisma.commonAscensionMaterial.delete({
   *   where: {
   *     // ... filter to delete one CommonAscensionMaterial
   *   }
   * })
   *
   **/
  delete<T extends CommonAscensionMaterialDeleteArgs>(
    args: Subset<T, CommonAscensionMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterial>,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterialGetPayload<T>>
  >;
  /**
   * Update one CommonAscensionMaterial.
   * @param {CommonAscensionMaterialUpdateArgs} args - Arguments to update one CommonAscensionMaterial.
   * @example
   * // Update one CommonAscensionMaterial
   * const commonAscensionMaterial = await prisma.commonAscensionMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CommonAscensionMaterialUpdateArgs>(
    args: Subset<T, CommonAscensionMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterial>,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more CommonAscensionMaterials.
   * @param {CommonAscensionMaterialDeleteManyArgs} args - Arguments to filter CommonAscensionMaterials to delete.
   * @example
   * // Delete a few CommonAscensionMaterials
   * const { count } = await prisma.commonAscensionMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CommonAscensionMaterialDeleteManyArgs>(
    args: Subset<T, CommonAscensionMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CommonAscensionMaterials.
   * @param {CommonAscensionMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CommonAscensionMaterials
   * const commonAscensionMaterial = await prisma.commonAscensionMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CommonAscensionMaterialUpdateManyArgs>(
    args: Subset<T, CommonAscensionMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CommonAscensionMaterial.
   * @param {CommonAscensionMaterialUpsertArgs} args - Arguments to update or create a CommonAscensionMaterial.
   * @example
   * // Update or create a CommonAscensionMaterial
   * const commonAscensionMaterial = await prisma.commonAscensionMaterial.upsert({
   *   create: {
   *     // ... data to create a CommonAscensionMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CommonAscensionMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends CommonAscensionMaterialUpsertArgs>(
    args: Subset<T, CommonAscensionMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterial>,
    Prisma__CommonAscensionMaterialClient<CommonAscensionMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCommonAscensionMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCommonAscensionMaterialArgs>(
    args: Subset<T, AggregateCommonAscensionMaterialArgs>
  ): Promise<GetCommonAscensionMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CommonAscensionMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CommonAscensionMaterialClient<T>
  implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  characterAscensions<T extends FindManyCharacterAscensionArgs = {}>(
    args?: Subset<T, FindManyCharacterAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterAscension>>,
    Promise<Array<CharacterAscensionGetPayload<T>>>
  >;

  weaponAscensions<T extends FindManyWeaponAscensionArgs = {}>(
    args?: Subset<T, FindManyWeaponAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscension>>,
    Promise<Array<WeaponAscensionGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CommonAscensionMaterial findOne
 */
export type FindOneCommonAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * Filter, which CommonAscensionMaterial to fetch.
   **/
  where: CommonAscensionMaterialWhereUniqueInput;
};

/**
 * CommonAscensionMaterial findMany
 */
export type FindManyCommonAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * Filter, which CommonAscensionMaterials to fetch.
   **/
  where?: CommonAscensionMaterialWhereInput;
  /**
   * Determine the order of the CommonAscensionMaterials to fetch.
   **/
  orderBy?: Enumerable<CommonAscensionMaterialOrderByInput>;
  /**
   * Sets the position for listing CommonAscensionMaterials.
   **/
  cursor?: CommonAscensionMaterialWhereUniqueInput;
  /**
   * The number of CommonAscensionMaterials to fetch. If negative number, it will take CommonAscensionMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CommonAscensionMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<CommonAscensionMaterialDistinctFieldEnum>;
};

/**
 * CommonAscensionMaterial create
 */
export type CommonAscensionMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * The data needed to create a CommonAscensionMaterial.
   **/
  data: CommonAscensionMaterialCreateInput;
};

/**
 * CommonAscensionMaterial update
 */
export type CommonAscensionMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * The data needed to update a CommonAscensionMaterial.
   **/
  data: CommonAscensionMaterialUpdateInput;
  /**
   * Choose, which CommonAscensionMaterial to update.
   **/
  where: CommonAscensionMaterialWhereUniqueInput;
};

/**
 * CommonAscensionMaterial updateMany
 */
export type CommonAscensionMaterialUpdateManyArgs = {
  data: CommonAscensionMaterialUpdateManyMutationInput;
  where?: CommonAscensionMaterialWhereInput;
};

/**
 * CommonAscensionMaterial upsert
 */
export type CommonAscensionMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * The filter to search for the CommonAscensionMaterial to update in case it exists.
   **/
  where: CommonAscensionMaterialWhereUniqueInput;
  /**
   * In case the CommonAscensionMaterial found by the `where` argument doesn't exist, create a new CommonAscensionMaterial with this data.
   **/
  create: CommonAscensionMaterialCreateInput;
  /**
   * In case the CommonAscensionMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: CommonAscensionMaterialUpdateInput;
};

/**
 * CommonAscensionMaterial delete
 */
export type CommonAscensionMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
  /**
   * Filter which CommonAscensionMaterial to delete.
   **/
  where: CommonAscensionMaterialWhereUniqueInput;
};

/**
 * CommonAscensionMaterial deleteMany
 */
export type CommonAscensionMaterialDeleteManyArgs = {
  where?: CommonAscensionMaterialWhereInput;
};

/**
 * CommonAscensionMaterial without action
 */
export type CommonAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonAscensionMaterial
   **/
  select?: CommonAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CommonAscensionMaterialInclude | null;
};

/**
 * Model WeaponAscensionMaterial
 */

export type WeaponAscensionMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  availability: JsonValue | null;
  description: string | null;
  image: string | null;
  rarity: number;
  group: WeaponAscensionMaterialGroup;
  domainId: string | null;
};

export type AggregateWeaponAscensionMaterial = {
  count: number;
  avg: WeaponAscensionMaterialAvgAggregateOutputType | null;
  sum: WeaponAscensionMaterialSumAggregateOutputType | null;
  min: WeaponAscensionMaterialMinAggregateOutputType | null;
  max: WeaponAscensionMaterialMaxAggregateOutputType | null;
};

export type WeaponAscensionMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type WeaponAscensionMaterialSumAggregateOutputType = {
  rarity: number;
};

export type WeaponAscensionMaterialMinAggregateOutputType = {
  rarity: number;
};

export type WeaponAscensionMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type WeaponAscensionMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type WeaponAscensionMaterialSumAggregateInputType = {
  rarity?: true;
};

export type WeaponAscensionMaterialMinAggregateInputType = {
  rarity?: true;
};

export type WeaponAscensionMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateWeaponAscensionMaterialArgs = {
  where?: WeaponAscensionMaterialWhereInput;
  orderBy?: Enumerable<WeaponAscensionMaterialOrderByInput>;
  cursor?: WeaponAscensionMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<WeaponAscensionMaterialDistinctFieldEnum>;
  count?: true;
  avg?: WeaponAscensionMaterialAvgAggregateInputType;
  sum?: WeaponAscensionMaterialSumAggregateInputType;
  min?: WeaponAscensionMaterialMinAggregateInputType;
  max?: WeaponAscensionMaterialMaxAggregateInputType;
};

export type GetWeaponAscensionMaterialAggregateType<
  T extends AggregateWeaponAscensionMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetWeaponAscensionMaterialAggregateScalarType<T[P]>;
};

export type GetWeaponAscensionMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WeaponAscensionMaterialAvgAggregateOutputType
    ? WeaponAscensionMaterialAvgAggregateOutputType[P]
    : never;
};

export type WeaponAscensionMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  availability?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  group?: boolean;
  domain?: boolean | DomainArgs;
  domainId?: boolean;
  weaponAscensions?: boolean | FindManyWeaponAscensionArgs;
};

export type WeaponAscensionMaterialInclude = {
  domain?: boolean | DomainArgs;
  weaponAscensions?: boolean | FindManyWeaponAscensionArgs;
};

export type WeaponAscensionMaterialGetPayload<
  S extends boolean | null | undefined | WeaponAscensionMaterialArgs,
  U = keyof S
> = S extends true
  ? WeaponAscensionMaterial
  : S extends undefined
  ? never
  : S extends WeaponAscensionMaterialArgs | FindManyWeaponAscensionMaterialArgs
  ? 'include' extends U
    ? WeaponAscensionMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'domain'
            ? DomainGetPayload<S['include'][P]> | null
            : P extends 'weaponAscensions'
            ? Array<WeaponAscensionGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof WeaponAscensionMaterial
          ? WeaponAscensionMaterial[P]
          : P extends 'domain'
          ? DomainGetPayload<S['select'][P]> | null
          : P extends 'weaponAscensions'
          ? Array<WeaponAscensionGetPayload<S['select'][P]>>
          : never;
      }
    : WeaponAscensionMaterial
  : WeaponAscensionMaterial;

export interface WeaponAscensionMaterialDelegate {
  /**
   * Find zero or one WeaponAscensionMaterial.
   * @param {FindOneWeaponAscensionMaterialArgs} args - Arguments to find a WeaponAscensionMaterial
   * @example
   * // Get one WeaponAscensionMaterial
   * const weaponAscensionMaterial = await prisma.weaponAscensionMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneWeaponAscensionMaterialArgs>(
    args: Subset<T, FindOneWeaponAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial | null>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more WeaponAscensionMaterials.
   * @param {FindManyWeaponAscensionMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all WeaponAscensionMaterials
   * const weaponAscensionMaterials = await prisma.weaponAscensionMaterial.findMany()
   *
   * // Get first 10 WeaponAscensionMaterials
   * const weaponAscensionMaterials = await prisma.weaponAscensionMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const weaponAscensionMaterialWithIdOnly = await prisma.weaponAscensionMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyWeaponAscensionMaterialArgs>(
    args?: Subset<T, FindManyWeaponAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscensionMaterial>>,
    Promise<Array<WeaponAscensionMaterialGetPayload<T>>>
  >;
  /**
   * Create a WeaponAscensionMaterial.
   * @param {WeaponAscensionMaterialCreateArgs} args - Arguments to create a WeaponAscensionMaterial.
   * @example
   * // Create one WeaponAscensionMaterial
   * const WeaponAscensionMaterial = await prisma.weaponAscensionMaterial.create({
   *   data: {
   *     // ... data to create a WeaponAscensionMaterial
   *   }
   * })
   *
   **/
  create<T extends WeaponAscensionMaterialCreateArgs>(
    args: Subset<T, WeaponAscensionMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T>>
  >;
  /**
   * Delete a WeaponAscensionMaterial.
   * @param {WeaponAscensionMaterialDeleteArgs} args - Arguments to delete one WeaponAscensionMaterial.
   * @example
   * // Delete one WeaponAscensionMaterial
   * const WeaponAscensionMaterial = await prisma.weaponAscensionMaterial.delete({
   *   where: {
   *     // ... filter to delete one WeaponAscensionMaterial
   *   }
   * })
   *
   **/
  delete<T extends WeaponAscensionMaterialDeleteArgs>(
    args: Subset<T, WeaponAscensionMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T>>
  >;
  /**
   * Update one WeaponAscensionMaterial.
   * @param {WeaponAscensionMaterialUpdateArgs} args - Arguments to update one WeaponAscensionMaterial.
   * @example
   * // Update one WeaponAscensionMaterial
   * const weaponAscensionMaterial = await prisma.weaponAscensionMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends WeaponAscensionMaterialUpdateArgs>(
    args: Subset<T, WeaponAscensionMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more WeaponAscensionMaterials.
   * @param {WeaponAscensionMaterialDeleteManyArgs} args - Arguments to filter WeaponAscensionMaterials to delete.
   * @example
   * // Delete a few WeaponAscensionMaterials
   * const { count } = await prisma.weaponAscensionMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends WeaponAscensionMaterialDeleteManyArgs>(
    args: Subset<T, WeaponAscensionMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more WeaponAscensionMaterials.
   * @param {WeaponAscensionMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many WeaponAscensionMaterials
   * const weaponAscensionMaterial = await prisma.weaponAscensionMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends WeaponAscensionMaterialUpdateManyArgs>(
    args: Subset<T, WeaponAscensionMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one WeaponAscensionMaterial.
   * @param {WeaponAscensionMaterialUpsertArgs} args - Arguments to update or create a WeaponAscensionMaterial.
   * @example
   * // Update or create a WeaponAscensionMaterial
   * const weaponAscensionMaterial = await prisma.weaponAscensionMaterial.upsert({
   *   create: {
   *     // ... data to create a WeaponAscensionMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the WeaponAscensionMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends WeaponAscensionMaterialUpsertArgs>(
    args: Subset<T, WeaponAscensionMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterial>,
    Prisma__WeaponAscensionMaterialClient<WeaponAscensionMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyWeaponAscensionMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWeaponAscensionMaterialArgs>(
    args: Subset<T, AggregateWeaponAscensionMaterialArgs>
  ): Promise<GetWeaponAscensionMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for WeaponAscensionMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WeaponAscensionMaterialClient<T>
  implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  domain<T extends DomainArgs = {}>(
    args?: Subset<T, DomainArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain | null>,
    Prisma__DomainClient<DomainGetPayload<T> | null>
  >;

  weaponAscensions<T extends FindManyWeaponAscensionArgs = {}>(
    args?: Subset<T, FindManyWeaponAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscension>>,
    Promise<Array<WeaponAscensionGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * WeaponAscensionMaterial findOne
 */
export type FindOneWeaponAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * Filter, which WeaponAscensionMaterial to fetch.
   **/
  where: WeaponAscensionMaterialWhereUniqueInput;
};

/**
 * WeaponAscensionMaterial findMany
 */
export type FindManyWeaponAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * Filter, which WeaponAscensionMaterials to fetch.
   **/
  where?: WeaponAscensionMaterialWhereInput;
  /**
   * Determine the order of the WeaponAscensionMaterials to fetch.
   **/
  orderBy?: Enumerable<WeaponAscensionMaterialOrderByInput>;
  /**
   * Sets the position for listing WeaponAscensionMaterials.
   **/
  cursor?: WeaponAscensionMaterialWhereUniqueInput;
  /**
   * The number of WeaponAscensionMaterials to fetch. If negative number, it will take WeaponAscensionMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` WeaponAscensionMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<WeaponAscensionMaterialDistinctFieldEnum>;
};

/**
 * WeaponAscensionMaterial create
 */
export type WeaponAscensionMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * The data needed to create a WeaponAscensionMaterial.
   **/
  data: WeaponAscensionMaterialCreateInput;
};

/**
 * WeaponAscensionMaterial update
 */
export type WeaponAscensionMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * The data needed to update a WeaponAscensionMaterial.
   **/
  data: WeaponAscensionMaterialUpdateInput;
  /**
   * Choose, which WeaponAscensionMaterial to update.
   **/
  where: WeaponAscensionMaterialWhereUniqueInput;
};

/**
 * WeaponAscensionMaterial updateMany
 */
export type WeaponAscensionMaterialUpdateManyArgs = {
  data: WeaponAscensionMaterialUpdateManyMutationInput;
  where?: WeaponAscensionMaterialWhereInput;
};

/**
 * WeaponAscensionMaterial upsert
 */
export type WeaponAscensionMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * The filter to search for the WeaponAscensionMaterial to update in case it exists.
   **/
  where: WeaponAscensionMaterialWhereUniqueInput;
  /**
   * In case the WeaponAscensionMaterial found by the `where` argument doesn't exist, create a new WeaponAscensionMaterial with this data.
   **/
  create: WeaponAscensionMaterialCreateInput;
  /**
   * In case the WeaponAscensionMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: WeaponAscensionMaterialUpdateInput;
};

/**
 * WeaponAscensionMaterial delete
 */
export type WeaponAscensionMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
  /**
   * Filter which WeaponAscensionMaterial to delete.
   **/
  where: WeaponAscensionMaterialWhereUniqueInput;
};

/**
 * WeaponAscensionMaterial deleteMany
 */
export type WeaponAscensionMaterialDeleteManyArgs = {
  where?: WeaponAscensionMaterialWhereInput;
};

/**
 * WeaponAscensionMaterial without action
 */
export type WeaponAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponAscensionMaterial
   **/
  select?: WeaponAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponAscensionMaterialInclude | null;
};

/**
 * Model WeaponEnhancementMaterial
 */

export type WeaponEnhancementMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  source: JsonValue | null;
  recipeUseId: string | null;
};

export type AggregateWeaponEnhancementMaterial = {
  count: number;
  avg: WeaponEnhancementMaterialAvgAggregateOutputType | null;
  sum: WeaponEnhancementMaterialSumAggregateOutputType | null;
  min: WeaponEnhancementMaterialMinAggregateOutputType | null;
  max: WeaponEnhancementMaterialMaxAggregateOutputType | null;
};

export type WeaponEnhancementMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type WeaponEnhancementMaterialSumAggregateOutputType = {
  rarity: number;
};

export type WeaponEnhancementMaterialMinAggregateOutputType = {
  rarity: number;
};

export type WeaponEnhancementMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type WeaponEnhancementMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type WeaponEnhancementMaterialSumAggregateInputType = {
  rarity?: true;
};

export type WeaponEnhancementMaterialMinAggregateInputType = {
  rarity?: true;
};

export type WeaponEnhancementMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateWeaponEnhancementMaterialArgs = {
  where?: WeaponEnhancementMaterialWhereInput;
  orderBy?: Enumerable<WeaponEnhancementMaterialOrderByInput>;
  cursor?: WeaponEnhancementMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<WeaponEnhancementMaterialDistinctFieldEnum>;
  count?: true;
  avg?: WeaponEnhancementMaterialAvgAggregateInputType;
  sum?: WeaponEnhancementMaterialSumAggregateInputType;
  min?: WeaponEnhancementMaterialMinAggregateInputType;
  max?: WeaponEnhancementMaterialMaxAggregateInputType;
};

export type GetWeaponEnhancementMaterialAggregateType<
  T extends AggregateWeaponEnhancementMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetWeaponEnhancementMaterialAggregateScalarType<T[P]>;
};

export type GetWeaponEnhancementMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WeaponEnhancementMaterialAvgAggregateOutputType
    ? WeaponEnhancementMaterialAvgAggregateOutputType[P]
    : never;
};

export type WeaponEnhancementMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  source?: boolean;
  recipeCreate?: boolean | ForgeRecipeArgs;
  recipeUse?: boolean | ForgeRecipeArgs;
  recipeUseId?: boolean;
};

export type WeaponEnhancementMaterialInclude = {
  recipeCreate?: boolean | ForgeRecipeArgs;
  recipeUse?: boolean | ForgeRecipeArgs;
};

export type WeaponEnhancementMaterialGetPayload<
  S extends boolean | null | undefined | WeaponEnhancementMaterialArgs,
  U = keyof S
> = S extends true
  ? WeaponEnhancementMaterial
  : S extends undefined
  ? never
  : S extends
      | WeaponEnhancementMaterialArgs
      | FindManyWeaponEnhancementMaterialArgs
  ? 'include' extends U
    ? WeaponEnhancementMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'recipeCreate'
            ? ForgeRecipeGetPayload<S['include'][P]> | null
            : P extends 'recipeUse'
            ? ForgeRecipeGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof WeaponEnhancementMaterial
          ? WeaponEnhancementMaterial[P]
          : P extends 'recipeCreate'
          ? ForgeRecipeGetPayload<S['select'][P]> | null
          : P extends 'recipeUse'
          ? ForgeRecipeGetPayload<S['select'][P]> | null
          : never;
      }
    : WeaponEnhancementMaterial
  : WeaponEnhancementMaterial;

export interface WeaponEnhancementMaterialDelegate {
  /**
   * Find zero or one WeaponEnhancementMaterial.
   * @param {FindOneWeaponEnhancementMaterialArgs} args - Arguments to find a WeaponEnhancementMaterial
   * @example
   * // Get one WeaponEnhancementMaterial
   * const weaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneWeaponEnhancementMaterialArgs>(
    args: Subset<T, FindOneWeaponEnhancementMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial | null>,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more WeaponEnhancementMaterials.
   * @param {FindManyWeaponEnhancementMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all WeaponEnhancementMaterials
   * const weaponEnhancementMaterials = await prisma.weaponEnhancementMaterial.findMany()
   *
   * // Get first 10 WeaponEnhancementMaterials
   * const weaponEnhancementMaterials = await prisma.weaponEnhancementMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const weaponEnhancementMaterialWithIdOnly = await prisma.weaponEnhancementMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyWeaponEnhancementMaterialArgs>(
    args?: Subset<T, FindManyWeaponEnhancementMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponEnhancementMaterial>>,
    Promise<Array<WeaponEnhancementMaterialGetPayload<T>>>
  >;
  /**
   * Create a WeaponEnhancementMaterial.
   * @param {WeaponEnhancementMaterialCreateArgs} args - Arguments to create a WeaponEnhancementMaterial.
   * @example
   * // Create one WeaponEnhancementMaterial
   * const WeaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.create({
   *   data: {
   *     // ... data to create a WeaponEnhancementMaterial
   *   }
   * })
   *
   **/
  create<T extends WeaponEnhancementMaterialCreateArgs>(
    args: Subset<T, WeaponEnhancementMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial>,
    Prisma__WeaponEnhancementMaterialClient<
      WeaponEnhancementMaterialGetPayload<T>
    >
  >;
  /**
   * Delete a WeaponEnhancementMaterial.
   * @param {WeaponEnhancementMaterialDeleteArgs} args - Arguments to delete one WeaponEnhancementMaterial.
   * @example
   * // Delete one WeaponEnhancementMaterial
   * const WeaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.delete({
   *   where: {
   *     // ... filter to delete one WeaponEnhancementMaterial
   *   }
   * })
   *
   **/
  delete<T extends WeaponEnhancementMaterialDeleteArgs>(
    args: Subset<T, WeaponEnhancementMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial>,
    Prisma__WeaponEnhancementMaterialClient<
      WeaponEnhancementMaterialGetPayload<T>
    >
  >;
  /**
   * Update one WeaponEnhancementMaterial.
   * @param {WeaponEnhancementMaterialUpdateArgs} args - Arguments to update one WeaponEnhancementMaterial.
   * @example
   * // Update one WeaponEnhancementMaterial
   * const weaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends WeaponEnhancementMaterialUpdateArgs>(
    args: Subset<T, WeaponEnhancementMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial>,
    Prisma__WeaponEnhancementMaterialClient<
      WeaponEnhancementMaterialGetPayload<T>
    >
  >;
  /**
   * Delete zero or more WeaponEnhancementMaterials.
   * @param {WeaponEnhancementMaterialDeleteManyArgs} args - Arguments to filter WeaponEnhancementMaterials to delete.
   * @example
   * // Delete a few WeaponEnhancementMaterials
   * const { count } = await prisma.weaponEnhancementMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends WeaponEnhancementMaterialDeleteManyArgs>(
    args: Subset<T, WeaponEnhancementMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more WeaponEnhancementMaterials.
   * @param {WeaponEnhancementMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many WeaponEnhancementMaterials
   * const weaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends WeaponEnhancementMaterialUpdateManyArgs>(
    args: Subset<T, WeaponEnhancementMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one WeaponEnhancementMaterial.
   * @param {WeaponEnhancementMaterialUpsertArgs} args - Arguments to update or create a WeaponEnhancementMaterial.
   * @example
   * // Update or create a WeaponEnhancementMaterial
   * const weaponEnhancementMaterial = await prisma.weaponEnhancementMaterial.upsert({
   *   create: {
   *     // ... data to create a WeaponEnhancementMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the WeaponEnhancementMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends WeaponEnhancementMaterialUpsertArgs>(
    args: Subset<T, WeaponEnhancementMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial>,
    Prisma__WeaponEnhancementMaterialClient<
      WeaponEnhancementMaterialGetPayload<T>
    >
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyWeaponEnhancementMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWeaponEnhancementMaterialArgs>(
    args: Subset<T, AggregateWeaponEnhancementMaterialArgs>
  ): Promise<GetWeaponEnhancementMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for WeaponEnhancementMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WeaponEnhancementMaterialClient<T>
  implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  recipeCreate<T extends ForgeRecipeArgs = {}>(
    args?: Subset<T, ForgeRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe | null>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T> | null>
  >;

  recipeUse<T extends ForgeRecipeArgs = {}>(
    args?: Subset<T, ForgeRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe | null>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * WeaponEnhancementMaterial findOne
 */
export type FindOneWeaponEnhancementMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * Filter, which WeaponEnhancementMaterial to fetch.
   **/
  where: WeaponEnhancementMaterialWhereUniqueInput;
};

/**
 * WeaponEnhancementMaterial findMany
 */
export type FindManyWeaponEnhancementMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * Filter, which WeaponEnhancementMaterials to fetch.
   **/
  where?: WeaponEnhancementMaterialWhereInput;
  /**
   * Determine the order of the WeaponEnhancementMaterials to fetch.
   **/
  orderBy?: Enumerable<WeaponEnhancementMaterialOrderByInput>;
  /**
   * Sets the position for listing WeaponEnhancementMaterials.
   **/
  cursor?: WeaponEnhancementMaterialWhereUniqueInput;
  /**
   * The number of WeaponEnhancementMaterials to fetch. If negative number, it will take WeaponEnhancementMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` WeaponEnhancementMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<WeaponEnhancementMaterialDistinctFieldEnum>;
};

/**
 * WeaponEnhancementMaterial create
 */
export type WeaponEnhancementMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * The data needed to create a WeaponEnhancementMaterial.
   **/
  data: WeaponEnhancementMaterialCreateInput;
};

/**
 * WeaponEnhancementMaterial update
 */
export type WeaponEnhancementMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * The data needed to update a WeaponEnhancementMaterial.
   **/
  data: WeaponEnhancementMaterialUpdateInput;
  /**
   * Choose, which WeaponEnhancementMaterial to update.
   **/
  where: WeaponEnhancementMaterialWhereUniqueInput;
};

/**
 * WeaponEnhancementMaterial updateMany
 */
export type WeaponEnhancementMaterialUpdateManyArgs = {
  data: WeaponEnhancementMaterialUpdateManyMutationInput;
  where?: WeaponEnhancementMaterialWhereInput;
};

/**
 * WeaponEnhancementMaterial upsert
 */
export type WeaponEnhancementMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * The filter to search for the WeaponEnhancementMaterial to update in case it exists.
   **/
  where: WeaponEnhancementMaterialWhereUniqueInput;
  /**
   * In case the WeaponEnhancementMaterial found by the `where` argument doesn't exist, create a new WeaponEnhancementMaterial with this data.
   **/
  create: WeaponEnhancementMaterialCreateInput;
  /**
   * In case the WeaponEnhancementMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: WeaponEnhancementMaterialUpdateInput;
};

/**
 * WeaponEnhancementMaterial delete
 */
export type WeaponEnhancementMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
  /**
   * Filter which WeaponEnhancementMaterial to delete.
   **/
  where: WeaponEnhancementMaterialWhereUniqueInput;
};

/**
 * WeaponEnhancementMaterial deleteMany
 */
export type WeaponEnhancementMaterialDeleteManyArgs = {
  where?: WeaponEnhancementMaterialWhereInput;
};

/**
 * WeaponEnhancementMaterial without action
 */
export type WeaponEnhancementMaterialArgs = {
  /**
   * Select specific fields to fetch from the WeaponEnhancementMaterial
   **/
  select?: WeaponEnhancementMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: WeaponEnhancementMaterialInclude | null;
};

/**
 * Model CharacterAscensionMaterial
 */

export type CharacterAscensionMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  source: JsonValue | null;
  group: WeaponAscensionMaterialGroup;
};

export type AggregateCharacterAscensionMaterial = {
  count: number;
  avg: CharacterAscensionMaterialAvgAggregateOutputType | null;
  sum: CharacterAscensionMaterialSumAggregateOutputType | null;
  min: CharacterAscensionMaterialMinAggregateOutputType | null;
  max: CharacterAscensionMaterialMaxAggregateOutputType | null;
};

export type CharacterAscensionMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type CharacterAscensionMaterialSumAggregateOutputType = {
  rarity: number;
};

export type CharacterAscensionMaterialMinAggregateOutputType = {
  rarity: number;
};

export type CharacterAscensionMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type CharacterAscensionMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type CharacterAscensionMaterialSumAggregateInputType = {
  rarity?: true;
};

export type CharacterAscensionMaterialMinAggregateInputType = {
  rarity?: true;
};

export type CharacterAscensionMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCharacterAscensionMaterialArgs = {
  where?: CharacterAscensionMaterialWhereInput;
  orderBy?: Enumerable<CharacterAscensionMaterialOrderByInput>;
  cursor?: CharacterAscensionMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CharacterAscensionMaterialDistinctFieldEnum>;
  count?: true;
  avg?: CharacterAscensionMaterialAvgAggregateInputType;
  sum?: CharacterAscensionMaterialSumAggregateInputType;
  min?: CharacterAscensionMaterialMinAggregateInputType;
  max?: CharacterAscensionMaterialMaxAggregateInputType;
};

export type GetCharacterAscensionMaterialAggregateType<
  T extends AggregateCharacterAscensionMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCharacterAscensionMaterialAggregateScalarType<T[P]>;
};

export type GetCharacterAscensionMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterAscensionMaterialAvgAggregateOutputType
    ? CharacterAscensionMaterialAvgAggregateOutputType[P]
    : never;
};

export type CharacterAscensionMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  source?: boolean;
  group?: boolean;
  characterAscensions?: boolean | FindManyCharacterAscensionArgs;
};

export type CharacterAscensionMaterialInclude = {
  characterAscensions?: boolean | FindManyCharacterAscensionArgs;
};

export type CharacterAscensionMaterialGetPayload<
  S extends boolean | null | undefined | CharacterAscensionMaterialArgs,
  U = keyof S
> = S extends true
  ? CharacterAscensionMaterial
  : S extends undefined
  ? never
  : S extends
      | CharacterAscensionMaterialArgs
      | FindManyCharacterAscensionMaterialArgs
  ? 'include' extends U
    ? CharacterAscensionMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'characterAscensions'
            ? Array<CharacterAscensionGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CharacterAscensionMaterial
          ? CharacterAscensionMaterial[P]
          : P extends 'characterAscensions'
          ? Array<CharacterAscensionGetPayload<S['select'][P]>>
          : never;
      }
    : CharacterAscensionMaterial
  : CharacterAscensionMaterial;

export interface CharacterAscensionMaterialDelegate {
  /**
   * Find zero or one CharacterAscensionMaterial.
   * @param {FindOneCharacterAscensionMaterialArgs} args - Arguments to find a CharacterAscensionMaterial
   * @example
   * // Get one CharacterAscensionMaterial
   * const characterAscensionMaterial = await prisma.characterAscensionMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCharacterAscensionMaterialArgs>(
    args: Subset<T, FindOneCharacterAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial | null>,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more CharacterAscensionMaterials.
   * @param {FindManyCharacterAscensionMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterAscensionMaterials
   * const characterAscensionMaterials = await prisma.characterAscensionMaterial.findMany()
   *
   * // Get first 10 CharacterAscensionMaterials
   * const characterAscensionMaterials = await prisma.characterAscensionMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const characterAscensionMaterialWithIdOnly = await prisma.characterAscensionMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCharacterAscensionMaterialArgs>(
    args?: Subset<T, FindManyCharacterAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterAscensionMaterial>>,
    Promise<Array<CharacterAscensionMaterialGetPayload<T>>>
  >;
  /**
   * Create a CharacterAscensionMaterial.
   * @param {CharacterAscensionMaterialCreateArgs} args - Arguments to create a CharacterAscensionMaterial.
   * @example
   * // Create one CharacterAscensionMaterial
   * const CharacterAscensionMaterial = await prisma.characterAscensionMaterial.create({
   *   data: {
   *     // ... data to create a CharacterAscensionMaterial
   *   }
   * })
   *
   **/
  create<T extends CharacterAscensionMaterialCreateArgs>(
    args: Subset<T, CharacterAscensionMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial>,
    Prisma__CharacterAscensionMaterialClient<
      CharacterAscensionMaterialGetPayload<T>
    >
  >;
  /**
   * Delete a CharacterAscensionMaterial.
   * @param {CharacterAscensionMaterialDeleteArgs} args - Arguments to delete one CharacterAscensionMaterial.
   * @example
   * // Delete one CharacterAscensionMaterial
   * const CharacterAscensionMaterial = await prisma.characterAscensionMaterial.delete({
   *   where: {
   *     // ... filter to delete one CharacterAscensionMaterial
   *   }
   * })
   *
   **/
  delete<T extends CharacterAscensionMaterialDeleteArgs>(
    args: Subset<T, CharacterAscensionMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial>,
    Prisma__CharacterAscensionMaterialClient<
      CharacterAscensionMaterialGetPayload<T>
    >
  >;
  /**
   * Update one CharacterAscensionMaterial.
   * @param {CharacterAscensionMaterialUpdateArgs} args - Arguments to update one CharacterAscensionMaterial.
   * @example
   * // Update one CharacterAscensionMaterial
   * const characterAscensionMaterial = await prisma.characterAscensionMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CharacterAscensionMaterialUpdateArgs>(
    args: Subset<T, CharacterAscensionMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial>,
    Prisma__CharacterAscensionMaterialClient<
      CharacterAscensionMaterialGetPayload<T>
    >
  >;
  /**
   * Delete zero or more CharacterAscensionMaterials.
   * @param {CharacterAscensionMaterialDeleteManyArgs} args - Arguments to filter CharacterAscensionMaterials to delete.
   * @example
   * // Delete a few CharacterAscensionMaterials
   * const { count } = await prisma.characterAscensionMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CharacterAscensionMaterialDeleteManyArgs>(
    args: Subset<T, CharacterAscensionMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CharacterAscensionMaterials.
   * @param {CharacterAscensionMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterAscensionMaterials
   * const characterAscensionMaterial = await prisma.characterAscensionMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CharacterAscensionMaterialUpdateManyArgs>(
    args: Subset<T, CharacterAscensionMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CharacterAscensionMaterial.
   * @param {CharacterAscensionMaterialUpsertArgs} args - Arguments to update or create a CharacterAscensionMaterial.
   * @example
   * // Update or create a CharacterAscensionMaterial
   * const characterAscensionMaterial = await prisma.characterAscensionMaterial.upsert({
   *   create: {
   *     // ... data to create a CharacterAscensionMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterAscensionMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends CharacterAscensionMaterialUpsertArgs>(
    args: Subset<T, CharacterAscensionMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterAscensionMaterialClient<CharacterAscensionMaterial>,
    Prisma__CharacterAscensionMaterialClient<
      CharacterAscensionMaterialGetPayload<T>
    >
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCharacterAscensionMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterAscensionMaterialArgs>(
    args: Subset<T, AggregateCharacterAscensionMaterialArgs>
  ): Promise<GetCharacterAscensionMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterAscensionMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterAscensionMaterialClient<T>
  implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  characterAscensions<T extends FindManyCharacterAscensionArgs = {}>(
    args?: Subset<T, FindManyCharacterAscensionArgs>
  ): CheckSelect<
    T,
    Promise<Array<CharacterAscension>>,
    Promise<Array<CharacterAscensionGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterAscensionMaterial findOne
 */
export type FindOneCharacterAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * Filter, which CharacterAscensionMaterial to fetch.
   **/
  where: CharacterAscensionMaterialWhereUniqueInput;
};

/**
 * CharacterAscensionMaterial findMany
 */
export type FindManyCharacterAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * Filter, which CharacterAscensionMaterials to fetch.
   **/
  where?: CharacterAscensionMaterialWhereInput;
  /**
   * Determine the order of the CharacterAscensionMaterials to fetch.
   **/
  orderBy?: Enumerable<CharacterAscensionMaterialOrderByInput>;
  /**
   * Sets the position for listing CharacterAscensionMaterials.
   **/
  cursor?: CharacterAscensionMaterialWhereUniqueInput;
  /**
   * The number of CharacterAscensionMaterials to fetch. If negative number, it will take CharacterAscensionMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CharacterAscensionMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<CharacterAscensionMaterialDistinctFieldEnum>;
};

/**
 * CharacterAscensionMaterial create
 */
export type CharacterAscensionMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * The data needed to create a CharacterAscensionMaterial.
   **/
  data: CharacterAscensionMaterialCreateInput;
};

/**
 * CharacterAscensionMaterial update
 */
export type CharacterAscensionMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * The data needed to update a CharacterAscensionMaterial.
   **/
  data: CharacterAscensionMaterialUpdateInput;
  /**
   * Choose, which CharacterAscensionMaterial to update.
   **/
  where: CharacterAscensionMaterialWhereUniqueInput;
};

/**
 * CharacterAscensionMaterial updateMany
 */
export type CharacterAscensionMaterialUpdateManyArgs = {
  data: CharacterAscensionMaterialUpdateManyMutationInput;
  where?: CharacterAscensionMaterialWhereInput;
};

/**
 * CharacterAscensionMaterial upsert
 */
export type CharacterAscensionMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * The filter to search for the CharacterAscensionMaterial to update in case it exists.
   **/
  where: CharacterAscensionMaterialWhereUniqueInput;
  /**
   * In case the CharacterAscensionMaterial found by the `where` argument doesn't exist, create a new CharacterAscensionMaterial with this data.
   **/
  create: CharacterAscensionMaterialCreateInput;
  /**
   * In case the CharacterAscensionMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: CharacterAscensionMaterialUpdateInput;
};

/**
 * CharacterAscensionMaterial delete
 */
export type CharacterAscensionMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
  /**
   * Filter which CharacterAscensionMaterial to delete.
   **/
  where: CharacterAscensionMaterialWhereUniqueInput;
};

/**
 * CharacterAscensionMaterial deleteMany
 */
export type CharacterAscensionMaterialDeleteManyArgs = {
  where?: CharacterAscensionMaterialWhereInput;
};

/**
 * CharacterAscensionMaterial without action
 */
export type CharacterAscensionMaterialArgs = {
  /**
   * Select specific fields to fetch from the CharacterAscensionMaterial
   **/
  select?: CharacterAscensionMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CharacterAscensionMaterialInclude | null;
};

/**
 * Model TalentLevelUpMaterial
 */

export type TalentLevelUpMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  availability: JsonValue | null;
  description: string | null;
  image: string | null;
  rarity: number;
  group: TalentLevelUpMaterialGroup;
  domainId: string | null;
};

export type AggregateTalentLevelUpMaterial = {
  count: number;
  avg: TalentLevelUpMaterialAvgAggregateOutputType | null;
  sum: TalentLevelUpMaterialSumAggregateOutputType | null;
  min: TalentLevelUpMaterialMinAggregateOutputType | null;
  max: TalentLevelUpMaterialMaxAggregateOutputType | null;
};

export type TalentLevelUpMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type TalentLevelUpMaterialSumAggregateOutputType = {
  rarity: number;
};

export type TalentLevelUpMaterialMinAggregateOutputType = {
  rarity: number;
};

export type TalentLevelUpMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type TalentLevelUpMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type TalentLevelUpMaterialSumAggregateInputType = {
  rarity?: true;
};

export type TalentLevelUpMaterialMinAggregateInputType = {
  rarity?: true;
};

export type TalentLevelUpMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateTalentLevelUpMaterialArgs = {
  where?: TalentLevelUpMaterialWhereInput;
  orderBy?: Enumerable<TalentLevelUpMaterialOrderByInput>;
  cursor?: TalentLevelUpMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<TalentLevelUpMaterialDistinctFieldEnum>;
  count?: true;
  avg?: TalentLevelUpMaterialAvgAggregateInputType;
  sum?: TalentLevelUpMaterialSumAggregateInputType;
  min?: TalentLevelUpMaterialMinAggregateInputType;
  max?: TalentLevelUpMaterialMaxAggregateInputType;
};

export type GetTalentLevelUpMaterialAggregateType<
  T extends AggregateTalentLevelUpMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetTalentLevelUpMaterialAggregateScalarType<T[P]>;
};

export type GetTalentLevelUpMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TalentLevelUpMaterialAvgAggregateOutputType
    ? TalentLevelUpMaterialAvgAggregateOutputType[P]
    : never;
};

export type TalentLevelUpMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  availability?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  group?: boolean;
  domain?: boolean | DomainArgs;
  domainId?: boolean;
  talents?: boolean | FindManyTalentArgs;
};

export type TalentLevelUpMaterialInclude = {
  domain?: boolean | DomainArgs;
  talents?: boolean | FindManyTalentArgs;
};

export type TalentLevelUpMaterialGetPayload<
  S extends boolean | null | undefined | TalentLevelUpMaterialArgs,
  U = keyof S
> = S extends true
  ? TalentLevelUpMaterial
  : S extends undefined
  ? never
  : S extends TalentLevelUpMaterialArgs | FindManyTalentLevelUpMaterialArgs
  ? 'include' extends U
    ? TalentLevelUpMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'domain'
            ? DomainGetPayload<S['include'][P]> | null
            : P extends 'talents'
            ? Array<TalentGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof TalentLevelUpMaterial
          ? TalentLevelUpMaterial[P]
          : P extends 'domain'
          ? DomainGetPayload<S['select'][P]> | null
          : P extends 'talents'
          ? Array<TalentGetPayload<S['select'][P]>>
          : never;
      }
    : TalentLevelUpMaterial
  : TalentLevelUpMaterial;

export interface TalentLevelUpMaterialDelegate {
  /**
   * Find zero or one TalentLevelUpMaterial.
   * @param {FindOneTalentLevelUpMaterialArgs} args - Arguments to find a TalentLevelUpMaterial
   * @example
   * // Get one TalentLevelUpMaterial
   * const talentLevelUpMaterial = await prisma.talentLevelUpMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneTalentLevelUpMaterialArgs>(
    args: Subset<T, FindOneTalentLevelUpMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial | null>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more TalentLevelUpMaterials.
   * @param {FindManyTalentLevelUpMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all TalentLevelUpMaterials
   * const talentLevelUpMaterials = await prisma.talentLevelUpMaterial.findMany()
   *
   * // Get first 10 TalentLevelUpMaterials
   * const talentLevelUpMaterials = await prisma.talentLevelUpMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const talentLevelUpMaterialWithIdOnly = await prisma.talentLevelUpMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyTalentLevelUpMaterialArgs>(
    args?: Subset<T, FindManyTalentLevelUpMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<TalentLevelUpMaterial>>,
    Promise<Array<TalentLevelUpMaterialGetPayload<T>>>
  >;
  /**
   * Create a TalentLevelUpMaterial.
   * @param {TalentLevelUpMaterialCreateArgs} args - Arguments to create a TalentLevelUpMaterial.
   * @example
   * // Create one TalentLevelUpMaterial
   * const TalentLevelUpMaterial = await prisma.talentLevelUpMaterial.create({
   *   data: {
   *     // ... data to create a TalentLevelUpMaterial
   *   }
   * })
   *
   **/
  create<T extends TalentLevelUpMaterialCreateArgs>(
    args: Subset<T, TalentLevelUpMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T>>
  >;
  /**
   * Delete a TalentLevelUpMaterial.
   * @param {TalentLevelUpMaterialDeleteArgs} args - Arguments to delete one TalentLevelUpMaterial.
   * @example
   * // Delete one TalentLevelUpMaterial
   * const TalentLevelUpMaterial = await prisma.talentLevelUpMaterial.delete({
   *   where: {
   *     // ... filter to delete one TalentLevelUpMaterial
   *   }
   * })
   *
   **/
  delete<T extends TalentLevelUpMaterialDeleteArgs>(
    args: Subset<T, TalentLevelUpMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T>>
  >;
  /**
   * Update one TalentLevelUpMaterial.
   * @param {TalentLevelUpMaterialUpdateArgs} args - Arguments to update one TalentLevelUpMaterial.
   * @example
   * // Update one TalentLevelUpMaterial
   * const talentLevelUpMaterial = await prisma.talentLevelUpMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends TalentLevelUpMaterialUpdateArgs>(
    args: Subset<T, TalentLevelUpMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more TalentLevelUpMaterials.
   * @param {TalentLevelUpMaterialDeleteManyArgs} args - Arguments to filter TalentLevelUpMaterials to delete.
   * @example
   * // Delete a few TalentLevelUpMaterials
   * const { count } = await prisma.talentLevelUpMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends TalentLevelUpMaterialDeleteManyArgs>(
    args: Subset<T, TalentLevelUpMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more TalentLevelUpMaterials.
   * @param {TalentLevelUpMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many TalentLevelUpMaterials
   * const talentLevelUpMaterial = await prisma.talentLevelUpMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends TalentLevelUpMaterialUpdateManyArgs>(
    args: Subset<T, TalentLevelUpMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one TalentLevelUpMaterial.
   * @param {TalentLevelUpMaterialUpsertArgs} args - Arguments to update or create a TalentLevelUpMaterial.
   * @example
   * // Update or create a TalentLevelUpMaterial
   * const talentLevelUpMaterial = await prisma.talentLevelUpMaterial.upsert({
   *   create: {
   *     // ... data to create a TalentLevelUpMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the TalentLevelUpMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends TalentLevelUpMaterialUpsertArgs>(
    args: Subset<T, TalentLevelUpMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterial>,
    Prisma__TalentLevelUpMaterialClient<TalentLevelUpMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyTalentLevelUpMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTalentLevelUpMaterialArgs>(
    args: Subset<T, AggregateTalentLevelUpMaterialArgs>
  ): Promise<GetTalentLevelUpMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for TalentLevelUpMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TalentLevelUpMaterialClient<T>
  implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  domain<T extends DomainArgs = {}>(
    args?: Subset<T, DomainArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain | null>,
    Prisma__DomainClient<DomainGetPayload<T> | null>
  >;

  talents<T extends FindManyTalentArgs = {}>(
    args?: Subset<T, FindManyTalentArgs>
  ): CheckSelect<
    T,
    Promise<Array<Talent>>,
    Promise<Array<TalentGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * TalentLevelUpMaterial findOne
 */
export type FindOneTalentLevelUpMaterialArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * Filter, which TalentLevelUpMaterial to fetch.
   **/
  where: TalentLevelUpMaterialWhereUniqueInput;
};

/**
 * TalentLevelUpMaterial findMany
 */
export type FindManyTalentLevelUpMaterialArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * Filter, which TalentLevelUpMaterials to fetch.
   **/
  where?: TalentLevelUpMaterialWhereInput;
  /**
   * Determine the order of the TalentLevelUpMaterials to fetch.
   **/
  orderBy?: Enumerable<TalentLevelUpMaterialOrderByInput>;
  /**
   * Sets the position for listing TalentLevelUpMaterials.
   **/
  cursor?: TalentLevelUpMaterialWhereUniqueInput;
  /**
   * The number of TalentLevelUpMaterials to fetch. If negative number, it will take TalentLevelUpMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` TalentLevelUpMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<TalentLevelUpMaterialDistinctFieldEnum>;
};

/**
 * TalentLevelUpMaterial create
 */
export type TalentLevelUpMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * The data needed to create a TalentLevelUpMaterial.
   **/
  data: TalentLevelUpMaterialCreateInput;
};

/**
 * TalentLevelUpMaterial update
 */
export type TalentLevelUpMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * The data needed to update a TalentLevelUpMaterial.
   **/
  data: TalentLevelUpMaterialUpdateInput;
  /**
   * Choose, which TalentLevelUpMaterial to update.
   **/
  where: TalentLevelUpMaterialWhereUniqueInput;
};

/**
 * TalentLevelUpMaterial updateMany
 */
export type TalentLevelUpMaterialUpdateManyArgs = {
  data: TalentLevelUpMaterialUpdateManyMutationInput;
  where?: TalentLevelUpMaterialWhereInput;
};

/**
 * TalentLevelUpMaterial upsert
 */
export type TalentLevelUpMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * The filter to search for the TalentLevelUpMaterial to update in case it exists.
   **/
  where: TalentLevelUpMaterialWhereUniqueInput;
  /**
   * In case the TalentLevelUpMaterial found by the `where` argument doesn't exist, create a new TalentLevelUpMaterial with this data.
   **/
  create: TalentLevelUpMaterialCreateInput;
  /**
   * In case the TalentLevelUpMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: TalentLevelUpMaterialUpdateInput;
};

/**
 * TalentLevelUpMaterial delete
 */
export type TalentLevelUpMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
  /**
   * Filter which TalentLevelUpMaterial to delete.
   **/
  where: TalentLevelUpMaterialWhereUniqueInput;
};

/**
 * TalentLevelUpMaterial deleteMany
 */
export type TalentLevelUpMaterialDeleteManyArgs = {
  where?: TalentLevelUpMaterialWhereInput;
};

/**
 * TalentLevelUpMaterial without action
 */
export type TalentLevelUpMaterialArgs = {
  /**
   * Select specific fields to fetch from the TalentLevelUpMaterial
   **/
  select?: TalentLevelUpMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: TalentLevelUpMaterialInclude | null;
};

/**
 * Model CraftingMaterial
 */

export type CraftingMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  source: JsonValue | null;
};

export type AggregateCraftingMaterial = {
  count: number;
  avg: CraftingMaterialAvgAggregateOutputType | null;
  sum: CraftingMaterialSumAggregateOutputType | null;
  min: CraftingMaterialMinAggregateOutputType | null;
  max: CraftingMaterialMaxAggregateOutputType | null;
};

export type CraftingMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type CraftingMaterialSumAggregateOutputType = {
  rarity: number;
};

export type CraftingMaterialMinAggregateOutputType = {
  rarity: number;
};

export type CraftingMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type CraftingMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type CraftingMaterialSumAggregateInputType = {
  rarity?: true;
};

export type CraftingMaterialMinAggregateInputType = {
  rarity?: true;
};

export type CraftingMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCraftingMaterialArgs = {
  where?: CraftingMaterialWhereInput;
  orderBy?: Enumerable<CraftingMaterialOrderByInput>;
  cursor?: CraftingMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CraftingMaterialDistinctFieldEnum>;
  count?: true;
  avg?: CraftingMaterialAvgAggregateInputType;
  sum?: CraftingMaterialSumAggregateInputType;
  min?: CraftingMaterialMinAggregateInputType;
  max?: CraftingMaterialMaxAggregateInputType;
};

export type GetCraftingMaterialAggregateType<
  T extends AggregateCraftingMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCraftingMaterialAggregateScalarType<T[P]>;
};

export type GetCraftingMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CraftingMaterialAvgAggregateOutputType
    ? CraftingMaterialAvgAggregateOutputType[P]
    : never;
};

export type CraftingMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  source?: boolean;
  recipes?: boolean | FindManyConsumeableRecipeArgs;
};

export type CraftingMaterialInclude = {
  recipes?: boolean | FindManyConsumeableRecipeArgs;
};

export type CraftingMaterialGetPayload<
  S extends boolean | null | undefined | CraftingMaterialArgs,
  U = keyof S
> = S extends true
  ? CraftingMaterial
  : S extends undefined
  ? never
  : S extends CraftingMaterialArgs | FindManyCraftingMaterialArgs
  ? 'include' extends U
    ? CraftingMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'recipes'
            ? Array<ConsumeableRecipeGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CraftingMaterial
          ? CraftingMaterial[P]
          : P extends 'recipes'
          ? Array<ConsumeableRecipeGetPayload<S['select'][P]>>
          : never;
      }
    : CraftingMaterial
  : CraftingMaterial;

export interface CraftingMaterialDelegate {
  /**
   * Find zero or one CraftingMaterial.
   * @param {FindOneCraftingMaterialArgs} args - Arguments to find a CraftingMaterial
   * @example
   * // Get one CraftingMaterial
   * const craftingMaterial = await prisma.craftingMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCraftingMaterialArgs>(
    args: Subset<T, FindOneCraftingMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CraftingMaterialClient<CraftingMaterial | null>,
    Prisma__CraftingMaterialClient<CraftingMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more CraftingMaterials.
   * @param {FindManyCraftingMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CraftingMaterials
   * const craftingMaterials = await prisma.craftingMaterial.findMany()
   *
   * // Get first 10 CraftingMaterials
   * const craftingMaterials = await prisma.craftingMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const craftingMaterialWithIdOnly = await prisma.craftingMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCraftingMaterialArgs>(
    args?: Subset<T, FindManyCraftingMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CraftingMaterial>>,
    Promise<Array<CraftingMaterialGetPayload<T>>>
  >;
  /**
   * Create a CraftingMaterial.
   * @param {CraftingMaterialCreateArgs} args - Arguments to create a CraftingMaterial.
   * @example
   * // Create one CraftingMaterial
   * const CraftingMaterial = await prisma.craftingMaterial.create({
   *   data: {
   *     // ... data to create a CraftingMaterial
   *   }
   * })
   *
   **/
  create<T extends CraftingMaterialCreateArgs>(
    args: Subset<T, CraftingMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CraftingMaterialClient<CraftingMaterial>,
    Prisma__CraftingMaterialClient<CraftingMaterialGetPayload<T>>
  >;
  /**
   * Delete a CraftingMaterial.
   * @param {CraftingMaterialDeleteArgs} args - Arguments to delete one CraftingMaterial.
   * @example
   * // Delete one CraftingMaterial
   * const CraftingMaterial = await prisma.craftingMaterial.delete({
   *   where: {
   *     // ... filter to delete one CraftingMaterial
   *   }
   * })
   *
   **/
  delete<T extends CraftingMaterialDeleteArgs>(
    args: Subset<T, CraftingMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CraftingMaterialClient<CraftingMaterial>,
    Prisma__CraftingMaterialClient<CraftingMaterialGetPayload<T>>
  >;
  /**
   * Update one CraftingMaterial.
   * @param {CraftingMaterialUpdateArgs} args - Arguments to update one CraftingMaterial.
   * @example
   * // Update one CraftingMaterial
   * const craftingMaterial = await prisma.craftingMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CraftingMaterialUpdateArgs>(
    args: Subset<T, CraftingMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CraftingMaterialClient<CraftingMaterial>,
    Prisma__CraftingMaterialClient<CraftingMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more CraftingMaterials.
   * @param {CraftingMaterialDeleteManyArgs} args - Arguments to filter CraftingMaterials to delete.
   * @example
   * // Delete a few CraftingMaterials
   * const { count } = await prisma.craftingMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CraftingMaterialDeleteManyArgs>(
    args: Subset<T, CraftingMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CraftingMaterials.
   * @param {CraftingMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CraftingMaterials
   * const craftingMaterial = await prisma.craftingMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CraftingMaterialUpdateManyArgs>(
    args: Subset<T, CraftingMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CraftingMaterial.
   * @param {CraftingMaterialUpsertArgs} args - Arguments to update or create a CraftingMaterial.
   * @example
   * // Update or create a CraftingMaterial
   * const craftingMaterial = await prisma.craftingMaterial.upsert({
   *   create: {
   *     // ... data to create a CraftingMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CraftingMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends CraftingMaterialUpsertArgs>(
    args: Subset<T, CraftingMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CraftingMaterialClient<CraftingMaterial>,
    Prisma__CraftingMaterialClient<CraftingMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCraftingMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCraftingMaterialArgs>(
    args: Subset<T, AggregateCraftingMaterialArgs>
  ): Promise<GetCraftingMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CraftingMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CraftingMaterialClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  recipes<T extends FindManyConsumeableRecipeArgs = {}>(
    args?: Subset<T, FindManyConsumeableRecipeArgs>
  ): CheckSelect<
    T,
    Promise<Array<ConsumeableRecipe>>,
    Promise<Array<ConsumeableRecipeGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CraftingMaterial findOne
 */
export type FindOneCraftingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * Filter, which CraftingMaterial to fetch.
   **/
  where: CraftingMaterialWhereUniqueInput;
};

/**
 * CraftingMaterial findMany
 */
export type FindManyCraftingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * Filter, which CraftingMaterials to fetch.
   **/
  where?: CraftingMaterialWhereInput;
  /**
   * Determine the order of the CraftingMaterials to fetch.
   **/
  orderBy?: Enumerable<CraftingMaterialOrderByInput>;
  /**
   * Sets the position for listing CraftingMaterials.
   **/
  cursor?: CraftingMaterialWhereUniqueInput;
  /**
   * The number of CraftingMaterials to fetch. If negative number, it will take CraftingMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CraftingMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<CraftingMaterialDistinctFieldEnum>;
};

/**
 * CraftingMaterial create
 */
export type CraftingMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * The data needed to create a CraftingMaterial.
   **/
  data: CraftingMaterialCreateInput;
};

/**
 * CraftingMaterial update
 */
export type CraftingMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * The data needed to update a CraftingMaterial.
   **/
  data: CraftingMaterialUpdateInput;
  /**
   * Choose, which CraftingMaterial to update.
   **/
  where: CraftingMaterialWhereUniqueInput;
};

/**
 * CraftingMaterial updateMany
 */
export type CraftingMaterialUpdateManyArgs = {
  data: CraftingMaterialUpdateManyMutationInput;
  where?: CraftingMaterialWhereInput;
};

/**
 * CraftingMaterial upsert
 */
export type CraftingMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * The filter to search for the CraftingMaterial to update in case it exists.
   **/
  where: CraftingMaterialWhereUniqueInput;
  /**
   * In case the CraftingMaterial found by the `where` argument doesn't exist, create a new CraftingMaterial with this data.
   **/
  create: CraftingMaterialCreateInput;
  /**
   * In case the CraftingMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: CraftingMaterialUpdateInput;
};

/**
 * CraftingMaterial delete
 */
export type CraftingMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
  /**
   * Filter which CraftingMaterial to delete.
   **/
  where: CraftingMaterialWhereUniqueInput;
};

/**
 * CraftingMaterial deleteMany
 */
export type CraftingMaterialDeleteManyArgs = {
  where?: CraftingMaterialWhereInput;
};

/**
 * CraftingMaterial without action
 */
export type CraftingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CraftingMaterial
   **/
  select?: CraftingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CraftingMaterialInclude | null;
};

/**
 * Model CookingMaterial
 */

export type CookingMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  source: JsonValue | null;
};

export type AggregateCookingMaterial = {
  count: number;
  avg: CookingMaterialAvgAggregateOutputType | null;
  sum: CookingMaterialSumAggregateOutputType | null;
  min: CookingMaterialMinAggregateOutputType | null;
  max: CookingMaterialMaxAggregateOutputType | null;
};

export type CookingMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type CookingMaterialSumAggregateOutputType = {
  rarity: number;
};

export type CookingMaterialMinAggregateOutputType = {
  rarity: number;
};

export type CookingMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type CookingMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type CookingMaterialSumAggregateInputType = {
  rarity?: true;
};

export type CookingMaterialMinAggregateInputType = {
  rarity?: true;
};

export type CookingMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCookingMaterialArgs = {
  where?: CookingMaterialWhereInput;
  orderBy?: Enumerable<CookingMaterialOrderByInput>;
  cursor?: CookingMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CookingMaterialDistinctFieldEnum>;
  count?: true;
  avg?: CookingMaterialAvgAggregateInputType;
  sum?: CookingMaterialSumAggregateInputType;
  min?: CookingMaterialMinAggregateInputType;
  max?: CookingMaterialMaxAggregateInputType;
};

export type GetCookingMaterialAggregateType<
  T extends AggregateCookingMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCookingMaterialAggregateScalarType<T[P]>;
};

export type GetCookingMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CookingMaterialAvgAggregateOutputType
    ? CookingMaterialAvgAggregateOutputType[P]
    : never;
};

export type CookingMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  source?: boolean;
  processingRecipe?: boolean | ProcessRecipeArgs;
  recipes?: boolean | FindManyConsumeableRecipeArgs;
};

export type CookingMaterialInclude = {
  processingRecipe?: boolean | ProcessRecipeArgs;
  recipes?: boolean | FindManyConsumeableRecipeArgs;
};

export type CookingMaterialGetPayload<
  S extends boolean | null | undefined | CookingMaterialArgs,
  U = keyof S
> = S extends true
  ? CookingMaterial
  : S extends undefined
  ? never
  : S extends CookingMaterialArgs | FindManyCookingMaterialArgs
  ? 'include' extends U
    ? CookingMaterial &
        {
          [P in TrueKeys<S['include']>]: P extends 'processingRecipe'
            ? ProcessRecipeGetPayload<S['include'][P]> | null
            : P extends 'recipes'
            ? Array<ConsumeableRecipeGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CookingMaterial
          ? CookingMaterial[P]
          : P extends 'processingRecipe'
          ? ProcessRecipeGetPayload<S['select'][P]> | null
          : P extends 'recipes'
          ? Array<ConsumeableRecipeGetPayload<S['select'][P]>>
          : never;
      }
    : CookingMaterial
  : CookingMaterial;

export interface CookingMaterialDelegate {
  /**
   * Find zero or one CookingMaterial.
   * @param {FindOneCookingMaterialArgs} args - Arguments to find a CookingMaterial
   * @example
   * // Get one CookingMaterial
   * const cookingMaterial = await prisma.cookingMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCookingMaterialArgs>(
    args: Subset<T, FindOneCookingMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial | null>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more CookingMaterials.
   * @param {FindManyCookingMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CookingMaterials
   * const cookingMaterials = await prisma.cookingMaterial.findMany()
   *
   * // Get first 10 CookingMaterials
   * const cookingMaterials = await prisma.cookingMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const cookingMaterialWithIdOnly = await prisma.cookingMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCookingMaterialArgs>(
    args?: Subset<T, FindManyCookingMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CookingMaterial>>,
    Promise<Array<CookingMaterialGetPayload<T>>>
  >;
  /**
   * Create a CookingMaterial.
   * @param {CookingMaterialCreateArgs} args - Arguments to create a CookingMaterial.
   * @example
   * // Create one CookingMaterial
   * const CookingMaterial = await prisma.cookingMaterial.create({
   *   data: {
   *     // ... data to create a CookingMaterial
   *   }
   * })
   *
   **/
  create<T extends CookingMaterialCreateArgs>(
    args: Subset<T, CookingMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T>>
  >;
  /**
   * Delete a CookingMaterial.
   * @param {CookingMaterialDeleteArgs} args - Arguments to delete one CookingMaterial.
   * @example
   * // Delete one CookingMaterial
   * const CookingMaterial = await prisma.cookingMaterial.delete({
   *   where: {
   *     // ... filter to delete one CookingMaterial
   *   }
   * })
   *
   **/
  delete<T extends CookingMaterialDeleteArgs>(
    args: Subset<T, CookingMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T>>
  >;
  /**
   * Update one CookingMaterial.
   * @param {CookingMaterialUpdateArgs} args - Arguments to update one CookingMaterial.
   * @example
   * // Update one CookingMaterial
   * const cookingMaterial = await prisma.cookingMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CookingMaterialUpdateArgs>(
    args: Subset<T, CookingMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more CookingMaterials.
   * @param {CookingMaterialDeleteManyArgs} args - Arguments to filter CookingMaterials to delete.
   * @example
   * // Delete a few CookingMaterials
   * const { count } = await prisma.cookingMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CookingMaterialDeleteManyArgs>(
    args: Subset<T, CookingMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CookingMaterials.
   * @param {CookingMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CookingMaterials
   * const cookingMaterial = await prisma.cookingMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CookingMaterialUpdateManyArgs>(
    args: Subset<T, CookingMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CookingMaterial.
   * @param {CookingMaterialUpsertArgs} args - Arguments to update or create a CookingMaterial.
   * @example
   * // Update or create a CookingMaterial
   * const cookingMaterial = await prisma.cookingMaterial.upsert({
   *   create: {
   *     // ... data to create a CookingMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CookingMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends CookingMaterialUpsertArgs>(
    args: Subset<T, CookingMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCookingMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCookingMaterialArgs>(
    args: Subset<T, AggregateCookingMaterialArgs>
  ): Promise<GetCookingMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CookingMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CookingMaterialClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  processingRecipe<T extends ProcessRecipeArgs = {}>(
    args?: Subset<T, ProcessRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe | null>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T> | null>
  >;

  recipes<T extends FindManyConsumeableRecipeArgs = {}>(
    args?: Subset<T, FindManyConsumeableRecipeArgs>
  ): CheckSelect<
    T,
    Promise<Array<ConsumeableRecipe>>,
    Promise<Array<ConsumeableRecipeGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CookingMaterial findOne
 */
export type FindOneCookingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * Filter, which CookingMaterial to fetch.
   **/
  where: CookingMaterialWhereUniqueInput;
};

/**
 * CookingMaterial findMany
 */
export type FindManyCookingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * Filter, which CookingMaterials to fetch.
   **/
  where?: CookingMaterialWhereInput;
  /**
   * Determine the order of the CookingMaterials to fetch.
   **/
  orderBy?: Enumerable<CookingMaterialOrderByInput>;
  /**
   * Sets the position for listing CookingMaterials.
   **/
  cursor?: CookingMaterialWhereUniqueInput;
  /**
   * The number of CookingMaterials to fetch. If negative number, it will take CookingMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CookingMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<CookingMaterialDistinctFieldEnum>;
};

/**
 * CookingMaterial create
 */
export type CookingMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * The data needed to create a CookingMaterial.
   **/
  data: CookingMaterialCreateInput;
};

/**
 * CookingMaterial update
 */
export type CookingMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * The data needed to update a CookingMaterial.
   **/
  data: CookingMaterialUpdateInput;
  /**
   * Choose, which CookingMaterial to update.
   **/
  where: CookingMaterialWhereUniqueInput;
};

/**
 * CookingMaterial updateMany
 */
export type CookingMaterialUpdateManyArgs = {
  data: CookingMaterialUpdateManyMutationInput;
  where?: CookingMaterialWhereInput;
};

/**
 * CookingMaterial upsert
 */
export type CookingMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * The filter to search for the CookingMaterial to update in case it exists.
   **/
  where: CookingMaterialWhereUniqueInput;
  /**
   * In case the CookingMaterial found by the `where` argument doesn't exist, create a new CookingMaterial with this data.
   **/
  create: CookingMaterialCreateInput;
  /**
   * In case the CookingMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: CookingMaterialUpdateInput;
};

/**
 * CookingMaterial delete
 */
export type CookingMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
  /**
   * Filter which CookingMaterial to delete.
   **/
  where: CookingMaterialWhereUniqueInput;
};

/**
 * CookingMaterial deleteMany
 */
export type CookingMaterialDeleteManyArgs = {
  where?: CookingMaterialWhereInput;
};

/**
 * CookingMaterial without action
 */
export type CookingMaterialArgs = {
  /**
   * Select specific fields to fetch from the CookingMaterial
   **/
  select?: CookingMaterialSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: CookingMaterialInclude | null;
};

/**
 * Model CommonMaterial
 */

export type CommonMaterial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  image: string | null;
  rarity: number;
  source: JsonValue | null;
};

export type AggregateCommonMaterial = {
  count: number;
  avg: CommonMaterialAvgAggregateOutputType | null;
  sum: CommonMaterialSumAggregateOutputType | null;
  min: CommonMaterialMinAggregateOutputType | null;
  max: CommonMaterialMaxAggregateOutputType | null;
};

export type CommonMaterialAvgAggregateOutputType = {
  rarity: number;
};

export type CommonMaterialSumAggregateOutputType = {
  rarity: number;
};

export type CommonMaterialMinAggregateOutputType = {
  rarity: number;
};

export type CommonMaterialMaxAggregateOutputType = {
  rarity: number;
};

export type CommonMaterialAvgAggregateInputType = {
  rarity?: true;
};

export type CommonMaterialSumAggregateInputType = {
  rarity?: true;
};

export type CommonMaterialMinAggregateInputType = {
  rarity?: true;
};

export type CommonMaterialMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateCommonMaterialArgs = {
  where?: CommonMaterialWhereInput;
  orderBy?: Enumerable<CommonMaterialOrderByInput>;
  cursor?: CommonMaterialWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<CommonMaterialDistinctFieldEnum>;
  count?: true;
  avg?: CommonMaterialAvgAggregateInputType;
  sum?: CommonMaterialSumAggregateInputType;
  min?: CommonMaterialMinAggregateInputType;
  max?: CommonMaterialMaxAggregateInputType;
};

export type GetCommonMaterialAggregateType<
  T extends AggregateCommonMaterialArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetCommonMaterialAggregateScalarType<T[P]>;
};

export type GetCommonMaterialAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CommonMaterialAvgAggregateOutputType
    ? CommonMaterialAvgAggregateOutputType[P]
    : never;
};

export type CommonMaterialSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  rarity?: boolean;
  source?: boolean;
};

export type CommonMaterialGetPayload<
  S extends boolean | null | undefined | CommonMaterialArgs,
  U = keyof S
> = S extends true
  ? CommonMaterial
  : S extends undefined
  ? never
  : S extends CommonMaterialArgs | FindManyCommonMaterialArgs
  ? 'include' extends U
    ? CommonMaterial
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof CommonMaterial
          ? CommonMaterial[P]
          : never;
      }
    : CommonMaterial
  : CommonMaterial;

export interface CommonMaterialDelegate {
  /**
   * Find zero or one CommonMaterial.
   * @param {FindOneCommonMaterialArgs} args - Arguments to find a CommonMaterial
   * @example
   * // Get one CommonMaterial
   * const commonMaterial = await prisma.commonMaterial.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneCommonMaterialArgs>(
    args: Subset<T, FindOneCommonMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CommonMaterialClient<CommonMaterial | null>,
    Prisma__CommonMaterialClient<CommonMaterialGetPayload<T> | null>
  >;
  /**
   * Find zero or more CommonMaterials.
   * @param {FindManyCommonMaterialArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CommonMaterials
   * const commonMaterials = await prisma.commonMaterial.findMany()
   *
   * // Get first 10 CommonMaterials
   * const commonMaterials = await prisma.commonMaterial.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const commonMaterialWithIdOnly = await prisma.commonMaterial.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyCommonMaterialArgs>(
    args?: Subset<T, FindManyCommonMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CommonMaterial>>,
    Promise<Array<CommonMaterialGetPayload<T>>>
  >;
  /**
   * Create a CommonMaterial.
   * @param {CommonMaterialCreateArgs} args - Arguments to create a CommonMaterial.
   * @example
   * // Create one CommonMaterial
   * const CommonMaterial = await prisma.commonMaterial.create({
   *   data: {
   *     // ... data to create a CommonMaterial
   *   }
   * })
   *
   **/
  create<T extends CommonMaterialCreateArgs>(
    args: Subset<T, CommonMaterialCreateArgs>
  ): CheckSelect<
    T,
    Prisma__CommonMaterialClient<CommonMaterial>,
    Prisma__CommonMaterialClient<CommonMaterialGetPayload<T>>
  >;
  /**
   * Delete a CommonMaterial.
   * @param {CommonMaterialDeleteArgs} args - Arguments to delete one CommonMaterial.
   * @example
   * // Delete one CommonMaterial
   * const CommonMaterial = await prisma.commonMaterial.delete({
   *   where: {
   *     // ... filter to delete one CommonMaterial
   *   }
   * })
   *
   **/
  delete<T extends CommonMaterialDeleteArgs>(
    args: Subset<T, CommonMaterialDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__CommonMaterialClient<CommonMaterial>,
    Prisma__CommonMaterialClient<CommonMaterialGetPayload<T>>
  >;
  /**
   * Update one CommonMaterial.
   * @param {CommonMaterialUpdateArgs} args - Arguments to update one CommonMaterial.
   * @example
   * // Update one CommonMaterial
   * const commonMaterial = await prisma.commonMaterial.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends CommonMaterialUpdateArgs>(
    args: Subset<T, CommonMaterialUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__CommonMaterialClient<CommonMaterial>,
    Prisma__CommonMaterialClient<CommonMaterialGetPayload<T>>
  >;
  /**
   * Delete zero or more CommonMaterials.
   * @param {CommonMaterialDeleteManyArgs} args - Arguments to filter CommonMaterials to delete.
   * @example
   * // Delete a few CommonMaterials
   * const { count } = await prisma.commonMaterial.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends CommonMaterialDeleteManyArgs>(
    args: Subset<T, CommonMaterialDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more CommonMaterials.
   * @param {CommonMaterialUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CommonMaterials
   * const commonMaterial = await prisma.commonMaterial.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends CommonMaterialUpdateManyArgs>(
    args: Subset<T, CommonMaterialUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one CommonMaterial.
   * @param {CommonMaterialUpsertArgs} args - Arguments to update or create a CommonMaterial.
   * @example
   * // Update or create a CommonMaterial
   * const commonMaterial = await prisma.commonMaterial.upsert({
   *   create: {
   *     // ... data to create a CommonMaterial
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CommonMaterial we want to update
   *   }
   * })
   **/
  upsert<T extends CommonMaterialUpsertArgs>(
    args: Subset<T, CommonMaterialUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__CommonMaterialClient<CommonMaterial>,
    Prisma__CommonMaterialClient<CommonMaterialGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyCommonMaterialArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCommonMaterialArgs>(
    args: Subset<T, AggregateCommonMaterialArgs>
  ): Promise<GetCommonMaterialAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for CommonMaterial.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CommonMaterialClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CommonMaterial findOne
 */
export type FindOneCommonMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * Filter, which CommonMaterial to fetch.
   **/
  where: CommonMaterialWhereUniqueInput;
};

/**
 * CommonMaterial findMany
 */
export type FindManyCommonMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * Filter, which CommonMaterials to fetch.
   **/
  where?: CommonMaterialWhereInput;
  /**
   * Determine the order of the CommonMaterials to fetch.
   **/
  orderBy?: Enumerable<CommonMaterialOrderByInput>;
  /**
   * Sets the position for listing CommonMaterials.
   **/
  cursor?: CommonMaterialWhereUniqueInput;
  /**
   * The number of CommonMaterials to fetch. If negative number, it will take CommonMaterials before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` CommonMaterials.
   **/
  skip?: number;
  distinct?: Enumerable<CommonMaterialDistinctFieldEnum>;
};

/**
 * CommonMaterial create
 */
export type CommonMaterialCreateArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * The data needed to create a CommonMaterial.
   **/
  data: CommonMaterialCreateInput;
};

/**
 * CommonMaterial update
 */
export type CommonMaterialUpdateArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * The data needed to update a CommonMaterial.
   **/
  data: CommonMaterialUpdateInput;
  /**
   * Choose, which CommonMaterial to update.
   **/
  where: CommonMaterialWhereUniqueInput;
};

/**
 * CommonMaterial updateMany
 */
export type CommonMaterialUpdateManyArgs = {
  data: CommonMaterialUpdateManyMutationInput;
  where?: CommonMaterialWhereInput;
};

/**
 * CommonMaterial upsert
 */
export type CommonMaterialUpsertArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * The filter to search for the CommonMaterial to update in case it exists.
   **/
  where: CommonMaterialWhereUniqueInput;
  /**
   * In case the CommonMaterial found by the `where` argument doesn't exist, create a new CommonMaterial with this data.
   **/
  create: CommonMaterialCreateInput;
  /**
   * In case the CommonMaterial was found with the provided `where` argument, update it with this data.
   **/
  update: CommonMaterialUpdateInput;
};

/**
 * CommonMaterial delete
 */
export type CommonMaterialDeleteArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
  /**
   * Filter which CommonMaterial to delete.
   **/
  where: CommonMaterialWhereUniqueInput;
};

/**
 * CommonMaterial deleteMany
 */
export type CommonMaterialDeleteManyArgs = {
  where?: CommonMaterialWhereInput;
};

/**
 * CommonMaterial without action
 */
export type CommonMaterialArgs = {
  /**
   * Select specific fields to fetch from the CommonMaterial
   **/
  select?: CommonMaterialSelect | null;
};

/**
 * Model Domain
 */

export type Domain = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  levels: JsonValue | null;
  type: string | null;
  regionId: string | null;
};

export type AggregateDomain = {
  count: number;
};

export type AggregateDomainArgs = {
  where?: DomainWhereInput;
  orderBy?: Enumerable<DomainOrderByInput>;
  cursor?: DomainWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<DomainDistinctFieldEnum>;
  count?: true;
};

export type GetDomainAggregateType<T extends AggregateDomainArgs> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type DomainSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  levels?: boolean;
  type?: boolean;
  artifacts?: boolean | FindManyArtifactArgs;
  region?: boolean | RegionArgs;
  regionId?: boolean;
  talentLevelUpMaterials?: boolean | FindManyTalentLevelUpMaterialArgs;
  weaponAscensionMaterials?: boolean | FindManyWeaponAscensionMaterialArgs;
};

export type DomainInclude = {
  artifacts?: boolean | FindManyArtifactArgs;
  region?: boolean | RegionArgs;
  talentLevelUpMaterials?: boolean | FindManyTalentLevelUpMaterialArgs;
  weaponAscensionMaterials?: boolean | FindManyWeaponAscensionMaterialArgs;
};

export type DomainGetPayload<
  S extends boolean | null | undefined | DomainArgs,
  U = keyof S
> = S extends true
  ? Domain
  : S extends undefined
  ? never
  : S extends DomainArgs | FindManyDomainArgs
  ? 'include' extends U
    ? Domain &
        {
          [P in TrueKeys<S['include']>]: P extends 'artifacts'
            ? Array<ArtifactGetPayload<S['include'][P]>>
            : P extends 'region'
            ? RegionGetPayload<S['include'][P]> | null
            : P extends 'talentLevelUpMaterials'
            ? Array<TalentLevelUpMaterialGetPayload<S['include'][P]>>
            : P extends 'weaponAscensionMaterials'
            ? Array<WeaponAscensionMaterialGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Domain
          ? Domain[P]
          : P extends 'artifacts'
          ? Array<ArtifactGetPayload<S['select'][P]>>
          : P extends 'region'
          ? RegionGetPayload<S['select'][P]> | null
          : P extends 'talentLevelUpMaterials'
          ? Array<TalentLevelUpMaterialGetPayload<S['select'][P]>>
          : P extends 'weaponAscensionMaterials'
          ? Array<WeaponAscensionMaterialGetPayload<S['select'][P]>>
          : never;
      }
    : Domain
  : Domain;

export interface DomainDelegate {
  /**
   * Find zero or one Domain.
   * @param {FindOneDomainArgs} args - Arguments to find a Domain
   * @example
   * // Get one Domain
   * const domain = await prisma.domain.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneDomainArgs>(
    args: Subset<T, FindOneDomainArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain | null>,
    Prisma__DomainClient<DomainGetPayload<T> | null>
  >;
  /**
   * Find zero or more Domains.
   * @param {FindManyDomainArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Domains
   * const domains = await prisma.domain.findMany()
   *
   * // Get first 10 Domains
   * const domains = await prisma.domain.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyDomainArgs>(
    args?: Subset<T, FindManyDomainArgs>
  ): CheckSelect<
    T,
    Promise<Array<Domain>>,
    Promise<Array<DomainGetPayload<T>>>
  >;
  /**
   * Create a Domain.
   * @param {DomainCreateArgs} args - Arguments to create a Domain.
   * @example
   * // Create one Domain
   * const Domain = await prisma.domain.create({
   *   data: {
   *     // ... data to create a Domain
   *   }
   * })
   *
   **/
  create<T extends DomainCreateArgs>(
    args: Subset<T, DomainCreateArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain>,
    Prisma__DomainClient<DomainGetPayload<T>>
  >;
  /**
   * Delete a Domain.
   * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
   * @example
   * // Delete one Domain
   * const Domain = await prisma.domain.delete({
   *   where: {
   *     // ... filter to delete one Domain
   *   }
   * })
   *
   **/
  delete<T extends DomainDeleteArgs>(
    args: Subset<T, DomainDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain>,
    Prisma__DomainClient<DomainGetPayload<T>>
  >;
  /**
   * Update one Domain.
   * @param {DomainUpdateArgs} args - Arguments to update one Domain.
   * @example
   * // Update one Domain
   * const domain = await prisma.domain.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends DomainUpdateArgs>(
    args: Subset<T, DomainUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain>,
    Prisma__DomainClient<DomainGetPayload<T>>
  >;
  /**
   * Delete zero or more Domains.
   * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
   * @example
   * // Delete a few Domains
   * const { count } = await prisma.domain.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends DomainDeleteManyArgs>(
    args: Subset<T, DomainDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Domains.
   * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Domains
   * const domain = await prisma.domain.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends DomainUpdateManyArgs>(
    args: Subset<T, DomainUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Domain.
   * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
   * @example
   * // Update or create a Domain
   * const domain = await prisma.domain.upsert({
   *   create: {
   *     // ... data to create a Domain
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Domain we want to update
   *   }
   * })
   **/
  upsert<T extends DomainUpsertArgs>(
    args: Subset<T, DomainUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain>,
    Prisma__DomainClient<DomainGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyDomainArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateDomainArgs>(
    args: Subset<T, AggregateDomainArgs>
  ): Promise<GetDomainAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Domain.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__DomainClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  artifacts<T extends FindManyArtifactArgs = {}>(
    args?: Subset<T, FindManyArtifactArgs>
  ): CheckSelect<
    T,
    Promise<Array<Artifact>>,
    Promise<Array<ArtifactGetPayload<T>>>
  >;

  region<T extends RegionArgs = {}>(
    args?: Subset<T, RegionArgs>
  ): CheckSelect<
    T,
    Prisma__RegionClient<Region | null>,
    Prisma__RegionClient<RegionGetPayload<T> | null>
  >;

  talentLevelUpMaterials<T extends FindManyTalentLevelUpMaterialArgs = {}>(
    args?: Subset<T, FindManyTalentLevelUpMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<TalentLevelUpMaterial>>,
    Promise<Array<TalentLevelUpMaterialGetPayload<T>>>
  >;

  weaponAscensionMaterials<T extends FindManyWeaponAscensionMaterialArgs = {}>(
    args?: Subset<T, FindManyWeaponAscensionMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponAscensionMaterial>>,
    Promise<Array<WeaponAscensionMaterialGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Domain findOne
 */
export type FindOneDomainArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * Filter, which Domain to fetch.
   **/
  where: DomainWhereUniqueInput;
};

/**
 * Domain findMany
 */
export type FindManyDomainArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * Filter, which Domains to fetch.
   **/
  where?: DomainWhereInput;
  /**
   * Determine the order of the Domains to fetch.
   **/
  orderBy?: Enumerable<DomainOrderByInput>;
  /**
   * Sets the position for listing Domains.
   **/
  cursor?: DomainWhereUniqueInput;
  /**
   * The number of Domains to fetch. If negative number, it will take Domains before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Domains.
   **/
  skip?: number;
  distinct?: Enumerable<DomainDistinctFieldEnum>;
};

/**
 * Domain create
 */
export type DomainCreateArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * The data needed to create a Domain.
   **/
  data: DomainCreateInput;
};

/**
 * Domain update
 */
export type DomainUpdateArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * The data needed to update a Domain.
   **/
  data: DomainUpdateInput;
  /**
   * Choose, which Domain to update.
   **/
  where: DomainWhereUniqueInput;
};

/**
 * Domain updateMany
 */
export type DomainUpdateManyArgs = {
  data: DomainUpdateManyMutationInput;
  where?: DomainWhereInput;
};

/**
 * Domain upsert
 */
export type DomainUpsertArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * The filter to search for the Domain to update in case it exists.
   **/
  where: DomainWhereUniqueInput;
  /**
   * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
   **/
  create: DomainCreateInput;
  /**
   * In case the Domain was found with the provided `where` argument, update it with this data.
   **/
  update: DomainUpdateInput;
};

/**
 * Domain delete
 */
export type DomainDeleteArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
  /**
   * Filter which Domain to delete.
   **/
  where: DomainWhereUniqueInput;
};

/**
 * Domain deleteMany
 */
export type DomainDeleteManyArgs = {
  where?: DomainWhereInput;
};

/**
 * Domain without action
 */
export type DomainArgs = {
  /**
   * Select specific fields to fetch from the Domain
   **/
  select?: DomainSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: DomainInclude | null;
};

/**
 * Model Consumeable
 */

export type Consumeable = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  effect: string | null;
  image: string | null;
  rarity: number;
  consumeableType: ConsumableType;
  foodType: FoodType;
  characterProfileId: string | null;
};

export type AggregateConsumeable = {
  count: number;
  avg: ConsumeableAvgAggregateOutputType | null;
  sum: ConsumeableSumAggregateOutputType | null;
  min: ConsumeableMinAggregateOutputType | null;
  max: ConsumeableMaxAggregateOutputType | null;
};

export type ConsumeableAvgAggregateOutputType = {
  rarity: number;
};

export type ConsumeableSumAggregateOutputType = {
  rarity: number;
};

export type ConsumeableMinAggregateOutputType = {
  rarity: number;
};

export type ConsumeableMaxAggregateOutputType = {
  rarity: number;
};

export type ConsumeableAvgAggregateInputType = {
  rarity?: true;
};

export type ConsumeableSumAggregateInputType = {
  rarity?: true;
};

export type ConsumeableMinAggregateInputType = {
  rarity?: true;
};

export type ConsumeableMaxAggregateInputType = {
  rarity?: true;
};

export type AggregateConsumeableArgs = {
  where?: ConsumeableWhereInput;
  orderBy?: Enumerable<ConsumeableOrderByInput>;
  cursor?: ConsumeableWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ConsumeableDistinctFieldEnum>;
  count?: true;
  avg?: ConsumeableAvgAggregateInputType;
  sum?: ConsumeableSumAggregateInputType;
  min?: ConsumeableMinAggregateInputType;
  max?: ConsumeableMaxAggregateInputType;
};

export type GetConsumeableAggregateType<T extends AggregateConsumeableArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetConsumeableAggregateScalarType<T[P]>;
};

export type GetConsumeableAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ConsumeableAvgAggregateOutputType
    ? ConsumeableAvgAggregateOutputType[P]
    : never;
};

export type ConsumeableSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  description?: boolean;
  effect?: boolean;
  image?: boolean;
  rarity?: boolean;
  consumeableType?: boolean;
  foodType?: boolean;
  characterSpecialty?: boolean | CharacterProfileArgs;
  characterProfileId?: boolean;
  recipe?: boolean | ConsumeableRecipeArgs;
};

export type ConsumeableInclude = {
  characterSpecialty?: boolean | CharacterProfileArgs;
  recipe?: boolean | ConsumeableRecipeArgs;
};

export type ConsumeableGetPayload<
  S extends boolean | null | undefined | ConsumeableArgs,
  U = keyof S
> = S extends true
  ? Consumeable
  : S extends undefined
  ? never
  : S extends ConsumeableArgs | FindManyConsumeableArgs
  ? 'include' extends U
    ? Consumeable &
        {
          [P in TrueKeys<S['include']>]: P extends 'characterSpecialty'
            ? CharacterProfileGetPayload<S['include'][P]> | null
            : P extends 'recipe'
            ? ConsumeableRecipeGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Consumeable
          ? Consumeable[P]
          : P extends 'characterSpecialty'
          ? CharacterProfileGetPayload<S['select'][P]> | null
          : P extends 'recipe'
          ? ConsumeableRecipeGetPayload<S['select'][P]> | null
          : never;
      }
    : Consumeable
  : Consumeable;

export interface ConsumeableDelegate {
  /**
   * Find zero or one Consumeable.
   * @param {FindOneConsumeableArgs} args - Arguments to find a Consumeable
   * @example
   * // Get one Consumeable
   * const consumeable = await prisma.consumeable.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneConsumeableArgs>(
    args: Subset<T, FindOneConsumeableArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable | null>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T> | null>
  >;
  /**
   * Find zero or more Consumeables.
   * @param {FindManyConsumeableArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Consumeables
   * const consumeables = await prisma.consumeable.findMany()
   *
   * // Get first 10 Consumeables
   * const consumeables = await prisma.consumeable.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const consumeableWithIdOnly = await prisma.consumeable.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyConsumeableArgs>(
    args?: Subset<T, FindManyConsumeableArgs>
  ): CheckSelect<
    T,
    Promise<Array<Consumeable>>,
    Promise<Array<ConsumeableGetPayload<T>>>
  >;
  /**
   * Create a Consumeable.
   * @param {ConsumeableCreateArgs} args - Arguments to create a Consumeable.
   * @example
   * // Create one Consumeable
   * const Consumeable = await prisma.consumeable.create({
   *   data: {
   *     // ... data to create a Consumeable
   *   }
   * })
   *
   **/
  create<T extends ConsumeableCreateArgs>(
    args: Subset<T, ConsumeableCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T>>
  >;
  /**
   * Delete a Consumeable.
   * @param {ConsumeableDeleteArgs} args - Arguments to delete one Consumeable.
   * @example
   * // Delete one Consumeable
   * const Consumeable = await prisma.consumeable.delete({
   *   where: {
   *     // ... filter to delete one Consumeable
   *   }
   * })
   *
   **/
  delete<T extends ConsumeableDeleteArgs>(
    args: Subset<T, ConsumeableDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T>>
  >;
  /**
   * Update one Consumeable.
   * @param {ConsumeableUpdateArgs} args - Arguments to update one Consumeable.
   * @example
   * // Update one Consumeable
   * const consumeable = await prisma.consumeable.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ConsumeableUpdateArgs>(
    args: Subset<T, ConsumeableUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T>>
  >;
  /**
   * Delete zero or more Consumeables.
   * @param {ConsumeableDeleteManyArgs} args - Arguments to filter Consumeables to delete.
   * @example
   * // Delete a few Consumeables
   * const { count } = await prisma.consumeable.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ConsumeableDeleteManyArgs>(
    args: Subset<T, ConsumeableDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Consumeables.
   * @param {ConsumeableUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Consumeables
   * const consumeable = await prisma.consumeable.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ConsumeableUpdateManyArgs>(
    args: Subset<T, ConsumeableUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Consumeable.
   * @param {ConsumeableUpsertArgs} args - Arguments to update or create a Consumeable.
   * @example
   * // Update or create a Consumeable
   * const consumeable = await prisma.consumeable.upsert({
   *   create: {
   *     // ... data to create a Consumeable
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Consumeable we want to update
   *   }
   * })
   **/
  upsert<T extends ConsumeableUpsertArgs>(
    args: Subset<T, ConsumeableUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyConsumeableArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateConsumeableArgs>(
    args: Subset<T, AggregateConsumeableArgs>
  ): Promise<GetConsumeableAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Consumeable.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ConsumeableClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  characterSpecialty<T extends CharacterProfileArgs = {}>(
    args?: Subset<T, CharacterProfileArgs>
  ): CheckSelect<
    T,
    Prisma__CharacterProfileClient<CharacterProfile | null>,
    Prisma__CharacterProfileClient<CharacterProfileGetPayload<T> | null>
  >;

  recipe<T extends ConsumeableRecipeArgs = {}>(
    args?: Subset<T, ConsumeableRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe | null>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Consumeable findOne
 */
export type FindOneConsumeableArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * Filter, which Consumeable to fetch.
   **/
  where: ConsumeableWhereUniqueInput;
};

/**
 * Consumeable findMany
 */
export type FindManyConsumeableArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * Filter, which Consumeables to fetch.
   **/
  where?: ConsumeableWhereInput;
  /**
   * Determine the order of the Consumeables to fetch.
   **/
  orderBy?: Enumerable<ConsumeableOrderByInput>;
  /**
   * Sets the position for listing Consumeables.
   **/
  cursor?: ConsumeableWhereUniqueInput;
  /**
   * The number of Consumeables to fetch. If negative number, it will take Consumeables before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Consumeables.
   **/
  skip?: number;
  distinct?: Enumerable<ConsumeableDistinctFieldEnum>;
};

/**
 * Consumeable create
 */
export type ConsumeableCreateArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * The data needed to create a Consumeable.
   **/
  data: ConsumeableCreateInput;
};

/**
 * Consumeable update
 */
export type ConsumeableUpdateArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * The data needed to update a Consumeable.
   **/
  data: ConsumeableUpdateInput;
  /**
   * Choose, which Consumeable to update.
   **/
  where: ConsumeableWhereUniqueInput;
};

/**
 * Consumeable updateMany
 */
export type ConsumeableUpdateManyArgs = {
  data: ConsumeableUpdateManyMutationInput;
  where?: ConsumeableWhereInput;
};

/**
 * Consumeable upsert
 */
export type ConsumeableUpsertArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * The filter to search for the Consumeable to update in case it exists.
   **/
  where: ConsumeableWhereUniqueInput;
  /**
   * In case the Consumeable found by the `where` argument doesn't exist, create a new Consumeable with this data.
   **/
  create: ConsumeableCreateInput;
  /**
   * In case the Consumeable was found with the provided `where` argument, update it with this data.
   **/
  update: ConsumeableUpdateInput;
};

/**
 * Consumeable delete
 */
export type ConsumeableDeleteArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
  /**
   * Filter which Consumeable to delete.
   **/
  where: ConsumeableWhereUniqueInput;
};

/**
 * Consumeable deleteMany
 */
export type ConsumeableDeleteManyArgs = {
  where?: ConsumeableWhereInput;
};

/**
 * Consumeable without action
 */
export type ConsumeableArgs = {
  /**
   * Select specific fields to fetch from the Consumeable
   **/
  select?: ConsumeableSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableInclude | null;
};

/**
 * Model ConsumeableRecipe
 */

export type ConsumeableRecipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  recipe: JsonValue | null;
  consumeableId: string | null;
};

export type AggregateConsumeableRecipe = {
  count: number;
};

export type AggregateConsumeableRecipeArgs = {
  where?: ConsumeableRecipeWhereInput;
  orderBy?: Enumerable<ConsumeableRecipeOrderByInput>;
  cursor?: ConsumeableRecipeWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ConsumeableRecipeDistinctFieldEnum>;
  count?: true;
};

export type GetConsumeableRecipeAggregateType<
  T extends AggregateConsumeableRecipeArgs
> = {
  [P in keyof T]: P extends 'count' ? number : never;
};

export type ConsumeableRecipeSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  recipe?: boolean;
  consumeable?: boolean | ConsumeableArgs;
  consumeableId?: boolean;
  craftingMaterials?: boolean | FindManyCraftingMaterialArgs;
  cookingMaterials?: boolean | FindManyCookingMaterialArgs;
};

export type ConsumeableRecipeInclude = {
  consumeable?: boolean | ConsumeableArgs;
  craftingMaterials?: boolean | FindManyCraftingMaterialArgs;
  cookingMaterials?: boolean | FindManyCookingMaterialArgs;
};

export type ConsumeableRecipeGetPayload<
  S extends boolean | null | undefined | ConsumeableRecipeArgs,
  U = keyof S
> = S extends true
  ? ConsumeableRecipe
  : S extends undefined
  ? never
  : S extends ConsumeableRecipeArgs | FindManyConsumeableRecipeArgs
  ? 'include' extends U
    ? ConsumeableRecipe &
        {
          [P in TrueKeys<S['include']>]: P extends 'consumeable'
            ? ConsumeableGetPayload<S['include'][P]> | null
            : P extends 'craftingMaterials'
            ? Array<CraftingMaterialGetPayload<S['include'][P]>>
            : P extends 'cookingMaterials'
            ? Array<CookingMaterialGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof ConsumeableRecipe
          ? ConsumeableRecipe[P]
          : P extends 'consumeable'
          ? ConsumeableGetPayload<S['select'][P]> | null
          : P extends 'craftingMaterials'
          ? Array<CraftingMaterialGetPayload<S['select'][P]>>
          : P extends 'cookingMaterials'
          ? Array<CookingMaterialGetPayload<S['select'][P]>>
          : never;
      }
    : ConsumeableRecipe
  : ConsumeableRecipe;

export interface ConsumeableRecipeDelegate {
  /**
   * Find zero or one ConsumeableRecipe.
   * @param {FindOneConsumeableRecipeArgs} args - Arguments to find a ConsumeableRecipe
   * @example
   * // Get one ConsumeableRecipe
   * const consumeableRecipe = await prisma.consumeableRecipe.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneConsumeableRecipeArgs>(
    args: Subset<T, FindOneConsumeableRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe | null>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T> | null>
  >;
  /**
   * Find zero or more ConsumeableRecipes.
   * @param {FindManyConsumeableRecipeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ConsumeableRecipes
   * const consumeableRecipes = await prisma.consumeableRecipe.findMany()
   *
   * // Get first 10 ConsumeableRecipes
   * const consumeableRecipes = await prisma.consumeableRecipe.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const consumeableRecipeWithIdOnly = await prisma.consumeableRecipe.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyConsumeableRecipeArgs>(
    args?: Subset<T, FindManyConsumeableRecipeArgs>
  ): CheckSelect<
    T,
    Promise<Array<ConsumeableRecipe>>,
    Promise<Array<ConsumeableRecipeGetPayload<T>>>
  >;
  /**
   * Create a ConsumeableRecipe.
   * @param {ConsumeableRecipeCreateArgs} args - Arguments to create a ConsumeableRecipe.
   * @example
   * // Create one ConsumeableRecipe
   * const ConsumeableRecipe = await prisma.consumeableRecipe.create({
   *   data: {
   *     // ... data to create a ConsumeableRecipe
   *   }
   * })
   *
   **/
  create<T extends ConsumeableRecipeCreateArgs>(
    args: Subset<T, ConsumeableRecipeCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T>>
  >;
  /**
   * Delete a ConsumeableRecipe.
   * @param {ConsumeableRecipeDeleteArgs} args - Arguments to delete one ConsumeableRecipe.
   * @example
   * // Delete one ConsumeableRecipe
   * const ConsumeableRecipe = await prisma.consumeableRecipe.delete({
   *   where: {
   *     // ... filter to delete one ConsumeableRecipe
   *   }
   * })
   *
   **/
  delete<T extends ConsumeableRecipeDeleteArgs>(
    args: Subset<T, ConsumeableRecipeDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T>>
  >;
  /**
   * Update one ConsumeableRecipe.
   * @param {ConsumeableRecipeUpdateArgs} args - Arguments to update one ConsumeableRecipe.
   * @example
   * // Update one ConsumeableRecipe
   * const consumeableRecipe = await prisma.consumeableRecipe.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ConsumeableRecipeUpdateArgs>(
    args: Subset<T, ConsumeableRecipeUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T>>
  >;
  /**
   * Delete zero or more ConsumeableRecipes.
   * @param {ConsumeableRecipeDeleteManyArgs} args - Arguments to filter ConsumeableRecipes to delete.
   * @example
   * // Delete a few ConsumeableRecipes
   * const { count } = await prisma.consumeableRecipe.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ConsumeableRecipeDeleteManyArgs>(
    args: Subset<T, ConsumeableRecipeDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more ConsumeableRecipes.
   * @param {ConsumeableRecipeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ConsumeableRecipes
   * const consumeableRecipe = await prisma.consumeableRecipe.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ConsumeableRecipeUpdateManyArgs>(
    args: Subset<T, ConsumeableRecipeUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one ConsumeableRecipe.
   * @param {ConsumeableRecipeUpsertArgs} args - Arguments to update or create a ConsumeableRecipe.
   * @example
   * // Update or create a ConsumeableRecipe
   * const consumeableRecipe = await prisma.consumeableRecipe.upsert({
   *   create: {
   *     // ... data to create a ConsumeableRecipe
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ConsumeableRecipe we want to update
   *   }
   * })
   **/
  upsert<T extends ConsumeableRecipeUpsertArgs>(
    args: Subset<T, ConsumeableRecipeUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipe>,
    Prisma__ConsumeableRecipeClient<ConsumeableRecipeGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyConsumeableRecipeArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateConsumeableRecipeArgs>(
    args: Subset<T, AggregateConsumeableRecipeArgs>
  ): Promise<GetConsumeableRecipeAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for ConsumeableRecipe.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ConsumeableRecipeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  consumeable<T extends ConsumeableArgs = {}>(
    args?: Subset<T, ConsumeableArgs>
  ): CheckSelect<
    T,
    Prisma__ConsumeableClient<Consumeable | null>,
    Prisma__ConsumeableClient<ConsumeableGetPayload<T> | null>
  >;

  craftingMaterials<T extends FindManyCraftingMaterialArgs = {}>(
    args?: Subset<T, FindManyCraftingMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CraftingMaterial>>,
    Promise<Array<CraftingMaterialGetPayload<T>>>
  >;

  cookingMaterials<T extends FindManyCookingMaterialArgs = {}>(
    args?: Subset<T, FindManyCookingMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<CookingMaterial>>,
    Promise<Array<CookingMaterialGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ConsumeableRecipe findOne
 */
export type FindOneConsumeableRecipeArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * Filter, which ConsumeableRecipe to fetch.
   **/
  where: ConsumeableRecipeWhereUniqueInput;
};

/**
 * ConsumeableRecipe findMany
 */
export type FindManyConsumeableRecipeArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * Filter, which ConsumeableRecipes to fetch.
   **/
  where?: ConsumeableRecipeWhereInput;
  /**
   * Determine the order of the ConsumeableRecipes to fetch.
   **/
  orderBy?: Enumerable<ConsumeableRecipeOrderByInput>;
  /**
   * Sets the position for listing ConsumeableRecipes.
   **/
  cursor?: ConsumeableRecipeWhereUniqueInput;
  /**
   * The number of ConsumeableRecipes to fetch. If negative number, it will take ConsumeableRecipes before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` ConsumeableRecipes.
   **/
  skip?: number;
  distinct?: Enumerable<ConsumeableRecipeDistinctFieldEnum>;
};

/**
 * ConsumeableRecipe create
 */
export type ConsumeableRecipeCreateArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * The data needed to create a ConsumeableRecipe.
   **/
  data: ConsumeableRecipeCreateInput;
};

/**
 * ConsumeableRecipe update
 */
export type ConsumeableRecipeUpdateArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * The data needed to update a ConsumeableRecipe.
   **/
  data: ConsumeableRecipeUpdateInput;
  /**
   * Choose, which ConsumeableRecipe to update.
   **/
  where: ConsumeableRecipeWhereUniqueInput;
};

/**
 * ConsumeableRecipe updateMany
 */
export type ConsumeableRecipeUpdateManyArgs = {
  data: ConsumeableRecipeUpdateManyMutationInput;
  where?: ConsumeableRecipeWhereInput;
};

/**
 * ConsumeableRecipe upsert
 */
export type ConsumeableRecipeUpsertArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * The filter to search for the ConsumeableRecipe to update in case it exists.
   **/
  where: ConsumeableRecipeWhereUniqueInput;
  /**
   * In case the ConsumeableRecipe found by the `where` argument doesn't exist, create a new ConsumeableRecipe with this data.
   **/
  create: ConsumeableRecipeCreateInput;
  /**
   * In case the ConsumeableRecipe was found with the provided `where` argument, update it with this data.
   **/
  update: ConsumeableRecipeUpdateInput;
};

/**
 * ConsumeableRecipe delete
 */
export type ConsumeableRecipeDeleteArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
  /**
   * Filter which ConsumeableRecipe to delete.
   **/
  where: ConsumeableRecipeWhereUniqueInput;
};

/**
 * ConsumeableRecipe deleteMany
 */
export type ConsumeableRecipeDeleteManyArgs = {
  where?: ConsumeableRecipeWhereInput;
};

/**
 * ConsumeableRecipe without action
 */
export type ConsumeableRecipeArgs = {
  /**
   * Select specific fields to fetch from the ConsumeableRecipe
   **/
  select?: ConsumeableRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ConsumeableRecipeInclude | null;
};

/**
 * Model ProcessRecipe
 */

export type ProcessRecipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  processingTime: number | null;
  recipe: JsonValue | null;
  materialId: string | null;
};

export type AggregateProcessRecipe = {
  count: number;
  avg: ProcessRecipeAvgAggregateOutputType | null;
  sum: ProcessRecipeSumAggregateOutputType | null;
  min: ProcessRecipeMinAggregateOutputType | null;
  max: ProcessRecipeMaxAggregateOutputType | null;
};

export type ProcessRecipeAvgAggregateOutputType = {
  processingTime: number;
};

export type ProcessRecipeSumAggregateOutputType = {
  processingTime: number | null;
};

export type ProcessRecipeMinAggregateOutputType = {
  processingTime: number | null;
};

export type ProcessRecipeMaxAggregateOutputType = {
  processingTime: number | null;
};

export type ProcessRecipeAvgAggregateInputType = {
  processingTime?: true;
};

export type ProcessRecipeSumAggregateInputType = {
  processingTime?: true;
};

export type ProcessRecipeMinAggregateInputType = {
  processingTime?: true;
};

export type ProcessRecipeMaxAggregateInputType = {
  processingTime?: true;
};

export type AggregateProcessRecipeArgs = {
  where?: ProcessRecipeWhereInput;
  orderBy?: Enumerable<ProcessRecipeOrderByInput>;
  cursor?: ProcessRecipeWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ProcessRecipeDistinctFieldEnum>;
  count?: true;
  avg?: ProcessRecipeAvgAggregateInputType;
  sum?: ProcessRecipeSumAggregateInputType;
  min?: ProcessRecipeMinAggregateInputType;
  max?: ProcessRecipeMaxAggregateInputType;
};

export type GetProcessRecipeAggregateType<
  T extends AggregateProcessRecipeArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetProcessRecipeAggregateScalarType<T[P]>;
};

export type GetProcessRecipeAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProcessRecipeAvgAggregateOutputType
    ? ProcessRecipeAvgAggregateOutputType[P]
    : never;
};

export type ProcessRecipeSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  processingTime?: boolean;
  recipe?: boolean;
  material?: boolean | CookingMaterialArgs;
  materialId?: boolean;
};

export type ProcessRecipeInclude = {
  material?: boolean | CookingMaterialArgs;
};

export type ProcessRecipeGetPayload<
  S extends boolean | null | undefined | ProcessRecipeArgs,
  U = keyof S
> = S extends true
  ? ProcessRecipe
  : S extends undefined
  ? never
  : S extends ProcessRecipeArgs | FindManyProcessRecipeArgs
  ? 'include' extends U
    ? ProcessRecipe &
        {
          [P in TrueKeys<S['include']>]: P extends 'material'
            ? CookingMaterialGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof ProcessRecipe
          ? ProcessRecipe[P]
          : P extends 'material'
          ? CookingMaterialGetPayload<S['select'][P]> | null
          : never;
      }
    : ProcessRecipe
  : ProcessRecipe;

export interface ProcessRecipeDelegate {
  /**
   * Find zero or one ProcessRecipe.
   * @param {FindOneProcessRecipeArgs} args - Arguments to find a ProcessRecipe
   * @example
   * // Get one ProcessRecipe
   * const processRecipe = await prisma.processRecipe.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneProcessRecipeArgs>(
    args: Subset<T, FindOneProcessRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe | null>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T> | null>
  >;
  /**
   * Find zero or more ProcessRecipes.
   * @param {FindManyProcessRecipeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ProcessRecipes
   * const processRecipes = await prisma.processRecipe.findMany()
   *
   * // Get first 10 ProcessRecipes
   * const processRecipes = await prisma.processRecipe.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const processRecipeWithIdOnly = await prisma.processRecipe.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyProcessRecipeArgs>(
    args?: Subset<T, FindManyProcessRecipeArgs>
  ): CheckSelect<
    T,
    Promise<Array<ProcessRecipe>>,
    Promise<Array<ProcessRecipeGetPayload<T>>>
  >;
  /**
   * Create a ProcessRecipe.
   * @param {ProcessRecipeCreateArgs} args - Arguments to create a ProcessRecipe.
   * @example
   * // Create one ProcessRecipe
   * const ProcessRecipe = await prisma.processRecipe.create({
   *   data: {
   *     // ... data to create a ProcessRecipe
   *   }
   * })
   *
   **/
  create<T extends ProcessRecipeCreateArgs>(
    args: Subset<T, ProcessRecipeCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T>>
  >;
  /**
   * Delete a ProcessRecipe.
   * @param {ProcessRecipeDeleteArgs} args - Arguments to delete one ProcessRecipe.
   * @example
   * // Delete one ProcessRecipe
   * const ProcessRecipe = await prisma.processRecipe.delete({
   *   where: {
   *     // ... filter to delete one ProcessRecipe
   *   }
   * })
   *
   **/
  delete<T extends ProcessRecipeDeleteArgs>(
    args: Subset<T, ProcessRecipeDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T>>
  >;
  /**
   * Update one ProcessRecipe.
   * @param {ProcessRecipeUpdateArgs} args - Arguments to update one ProcessRecipe.
   * @example
   * // Update one ProcessRecipe
   * const processRecipe = await prisma.processRecipe.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ProcessRecipeUpdateArgs>(
    args: Subset<T, ProcessRecipeUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T>>
  >;
  /**
   * Delete zero or more ProcessRecipes.
   * @param {ProcessRecipeDeleteManyArgs} args - Arguments to filter ProcessRecipes to delete.
   * @example
   * // Delete a few ProcessRecipes
   * const { count } = await prisma.processRecipe.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ProcessRecipeDeleteManyArgs>(
    args: Subset<T, ProcessRecipeDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more ProcessRecipes.
   * @param {ProcessRecipeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ProcessRecipes
   * const processRecipe = await prisma.processRecipe.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ProcessRecipeUpdateManyArgs>(
    args: Subset<T, ProcessRecipeUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one ProcessRecipe.
   * @param {ProcessRecipeUpsertArgs} args - Arguments to update or create a ProcessRecipe.
   * @example
   * // Update or create a ProcessRecipe
   * const processRecipe = await prisma.processRecipe.upsert({
   *   create: {
   *     // ... data to create a ProcessRecipe
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ProcessRecipe we want to update
   *   }
   * })
   **/
  upsert<T extends ProcessRecipeUpsertArgs>(
    args: Subset<T, ProcessRecipeUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ProcessRecipeClient<ProcessRecipe>,
    Prisma__ProcessRecipeClient<ProcessRecipeGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyProcessRecipeArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProcessRecipeArgs>(
    args: Subset<T, AggregateProcessRecipeArgs>
  ): Promise<GetProcessRecipeAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for ProcessRecipe.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProcessRecipeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  material<T extends CookingMaterialArgs = {}>(
    args?: Subset<T, CookingMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__CookingMaterialClient<CookingMaterial | null>,
    Prisma__CookingMaterialClient<CookingMaterialGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ProcessRecipe findOne
 */
export type FindOneProcessRecipeArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * Filter, which ProcessRecipe to fetch.
   **/
  where: ProcessRecipeWhereUniqueInput;
};

/**
 * ProcessRecipe findMany
 */
export type FindManyProcessRecipeArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * Filter, which ProcessRecipes to fetch.
   **/
  where?: ProcessRecipeWhereInput;
  /**
   * Determine the order of the ProcessRecipes to fetch.
   **/
  orderBy?: Enumerable<ProcessRecipeOrderByInput>;
  /**
   * Sets the position for listing ProcessRecipes.
   **/
  cursor?: ProcessRecipeWhereUniqueInput;
  /**
   * The number of ProcessRecipes to fetch. If negative number, it will take ProcessRecipes before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` ProcessRecipes.
   **/
  skip?: number;
  distinct?: Enumerable<ProcessRecipeDistinctFieldEnum>;
};

/**
 * ProcessRecipe create
 */
export type ProcessRecipeCreateArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * The data needed to create a ProcessRecipe.
   **/
  data: ProcessRecipeCreateInput;
};

/**
 * ProcessRecipe update
 */
export type ProcessRecipeUpdateArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * The data needed to update a ProcessRecipe.
   **/
  data: ProcessRecipeUpdateInput;
  /**
   * Choose, which ProcessRecipe to update.
   **/
  where: ProcessRecipeWhereUniqueInput;
};

/**
 * ProcessRecipe updateMany
 */
export type ProcessRecipeUpdateManyArgs = {
  data: ProcessRecipeUpdateManyMutationInput;
  where?: ProcessRecipeWhereInput;
};

/**
 * ProcessRecipe upsert
 */
export type ProcessRecipeUpsertArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * The filter to search for the ProcessRecipe to update in case it exists.
   **/
  where: ProcessRecipeWhereUniqueInput;
  /**
   * In case the ProcessRecipe found by the `where` argument doesn't exist, create a new ProcessRecipe with this data.
   **/
  create: ProcessRecipeCreateInput;
  /**
   * In case the ProcessRecipe was found with the provided `where` argument, update it with this data.
   **/
  update: ProcessRecipeUpdateInput;
};

/**
 * ProcessRecipe delete
 */
export type ProcessRecipeDeleteArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
  /**
   * Filter which ProcessRecipe to delete.
   **/
  where: ProcessRecipeWhereUniqueInput;
};

/**
 * ProcessRecipe deleteMany
 */
export type ProcessRecipeDeleteManyArgs = {
  where?: ProcessRecipeWhereInput;
};

/**
 * ProcessRecipe without action
 */
export type ProcessRecipeArgs = {
  /**
   * Select specific fields to fetch from the ProcessRecipe
   **/
  select?: ProcessRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ProcessRecipeInclude | null;
};

/**
 * Model ForgeRecipe
 */

export type ForgeRecipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  craftingTime: number | null;
  recipe: JsonValue | null;
  weaponEnhancementMaterialId: string | null;
  weaponId: string | null;
};

export type AggregateForgeRecipe = {
  count: number;
  avg: ForgeRecipeAvgAggregateOutputType | null;
  sum: ForgeRecipeSumAggregateOutputType | null;
  min: ForgeRecipeMinAggregateOutputType | null;
  max: ForgeRecipeMaxAggregateOutputType | null;
};

export type ForgeRecipeAvgAggregateOutputType = {
  craftingTime: number;
};

export type ForgeRecipeSumAggregateOutputType = {
  craftingTime: number | null;
};

export type ForgeRecipeMinAggregateOutputType = {
  craftingTime: number | null;
};

export type ForgeRecipeMaxAggregateOutputType = {
  craftingTime: number | null;
};

export type ForgeRecipeAvgAggregateInputType = {
  craftingTime?: true;
};

export type ForgeRecipeSumAggregateInputType = {
  craftingTime?: true;
};

export type ForgeRecipeMinAggregateInputType = {
  craftingTime?: true;
};

export type ForgeRecipeMaxAggregateInputType = {
  craftingTime?: true;
};

export type AggregateForgeRecipeArgs = {
  where?: ForgeRecipeWhereInput;
  orderBy?: Enumerable<ForgeRecipeOrderByInput>;
  cursor?: ForgeRecipeWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ForgeRecipeDistinctFieldEnum>;
  count?: true;
  avg?: ForgeRecipeAvgAggregateInputType;
  sum?: ForgeRecipeSumAggregateInputType;
  min?: ForgeRecipeMinAggregateInputType;
  max?: ForgeRecipeMaxAggregateInputType;
};

export type GetForgeRecipeAggregateType<T extends AggregateForgeRecipeArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetForgeRecipeAggregateScalarType<T[P]>;
};

export type GetForgeRecipeAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ForgeRecipeAvgAggregateOutputType
    ? ForgeRecipeAvgAggregateOutputType[P]
    : never;
};

export type ForgeRecipeSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  craftingTime?: boolean;
  recipe?: boolean;
  weaponEnhancementMaterials?: boolean | FindManyWeaponEnhancementMaterialArgs;
  weaponEnhancementMaterial?: boolean | WeaponEnhancementMaterialArgs;
  weaponEnhancementMaterialId?: boolean;
  weapon?: boolean | WeaponArgs;
  weaponId?: boolean;
};

export type ForgeRecipeInclude = {
  weaponEnhancementMaterials?: boolean | FindManyWeaponEnhancementMaterialArgs;
  weaponEnhancementMaterial?: boolean | WeaponEnhancementMaterialArgs;
  weapon?: boolean | WeaponArgs;
};

export type ForgeRecipeGetPayload<
  S extends boolean | null | undefined | ForgeRecipeArgs,
  U = keyof S
> = S extends true
  ? ForgeRecipe
  : S extends undefined
  ? never
  : S extends ForgeRecipeArgs | FindManyForgeRecipeArgs
  ? 'include' extends U
    ? ForgeRecipe &
        {
          [P in TrueKeys<S['include']>]: P extends 'weaponEnhancementMaterials'
            ? Array<WeaponEnhancementMaterialGetPayload<S['include'][P]>>
            : P extends 'weaponEnhancementMaterial'
            ? WeaponEnhancementMaterialGetPayload<S['include'][P]> | null
            : P extends 'weapon'
            ? WeaponGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof ForgeRecipe
          ? ForgeRecipe[P]
          : P extends 'weaponEnhancementMaterials'
          ? Array<WeaponEnhancementMaterialGetPayload<S['select'][P]>>
          : P extends 'weaponEnhancementMaterial'
          ? WeaponEnhancementMaterialGetPayload<S['select'][P]> | null
          : P extends 'weapon'
          ? WeaponGetPayload<S['select'][P]> | null
          : never;
      }
    : ForgeRecipe
  : ForgeRecipe;

export interface ForgeRecipeDelegate {
  /**
   * Find zero or one ForgeRecipe.
   * @param {FindOneForgeRecipeArgs} args - Arguments to find a ForgeRecipe
   * @example
   * // Get one ForgeRecipe
   * const forgeRecipe = await prisma.forgeRecipe.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneForgeRecipeArgs>(
    args: Subset<T, FindOneForgeRecipeArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe | null>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T> | null>
  >;
  /**
   * Find zero or more ForgeRecipes.
   * @param {FindManyForgeRecipeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ForgeRecipes
   * const forgeRecipes = await prisma.forgeRecipe.findMany()
   *
   * // Get first 10 ForgeRecipes
   * const forgeRecipes = await prisma.forgeRecipe.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const forgeRecipeWithIdOnly = await prisma.forgeRecipe.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyForgeRecipeArgs>(
    args?: Subset<T, FindManyForgeRecipeArgs>
  ): CheckSelect<
    T,
    Promise<Array<ForgeRecipe>>,
    Promise<Array<ForgeRecipeGetPayload<T>>>
  >;
  /**
   * Create a ForgeRecipe.
   * @param {ForgeRecipeCreateArgs} args - Arguments to create a ForgeRecipe.
   * @example
   * // Create one ForgeRecipe
   * const ForgeRecipe = await prisma.forgeRecipe.create({
   *   data: {
   *     // ... data to create a ForgeRecipe
   *   }
   * })
   *
   **/
  create<T extends ForgeRecipeCreateArgs>(
    args: Subset<T, ForgeRecipeCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T>>
  >;
  /**
   * Delete a ForgeRecipe.
   * @param {ForgeRecipeDeleteArgs} args - Arguments to delete one ForgeRecipe.
   * @example
   * // Delete one ForgeRecipe
   * const ForgeRecipe = await prisma.forgeRecipe.delete({
   *   where: {
   *     // ... filter to delete one ForgeRecipe
   *   }
   * })
   *
   **/
  delete<T extends ForgeRecipeDeleteArgs>(
    args: Subset<T, ForgeRecipeDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T>>
  >;
  /**
   * Update one ForgeRecipe.
   * @param {ForgeRecipeUpdateArgs} args - Arguments to update one ForgeRecipe.
   * @example
   * // Update one ForgeRecipe
   * const forgeRecipe = await prisma.forgeRecipe.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ForgeRecipeUpdateArgs>(
    args: Subset<T, ForgeRecipeUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T>>
  >;
  /**
   * Delete zero or more ForgeRecipes.
   * @param {ForgeRecipeDeleteManyArgs} args - Arguments to filter ForgeRecipes to delete.
   * @example
   * // Delete a few ForgeRecipes
   * const { count } = await prisma.forgeRecipe.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ForgeRecipeDeleteManyArgs>(
    args: Subset<T, ForgeRecipeDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more ForgeRecipes.
   * @param {ForgeRecipeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ForgeRecipes
   * const forgeRecipe = await prisma.forgeRecipe.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ForgeRecipeUpdateManyArgs>(
    args: Subset<T, ForgeRecipeUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one ForgeRecipe.
   * @param {ForgeRecipeUpsertArgs} args - Arguments to update or create a ForgeRecipe.
   * @example
   * // Update or create a ForgeRecipe
   * const forgeRecipe = await prisma.forgeRecipe.upsert({
   *   create: {
   *     // ... data to create a ForgeRecipe
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ForgeRecipe we want to update
   *   }
   * })
   **/
  upsert<T extends ForgeRecipeUpsertArgs>(
    args: Subset<T, ForgeRecipeUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ForgeRecipeClient<ForgeRecipe>,
    Prisma__ForgeRecipeClient<ForgeRecipeGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyForgeRecipeArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateForgeRecipeArgs>(
    args: Subset<T, AggregateForgeRecipeArgs>
  ): Promise<GetForgeRecipeAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for ForgeRecipe.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ForgeRecipeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  weaponEnhancementMaterials<
    T extends FindManyWeaponEnhancementMaterialArgs = {}
  >(
    args?: Subset<T, FindManyWeaponEnhancementMaterialArgs>
  ): CheckSelect<
    T,
    Promise<Array<WeaponEnhancementMaterial>>,
    Promise<Array<WeaponEnhancementMaterialGetPayload<T>>>
  >;

  weaponEnhancementMaterial<T extends WeaponEnhancementMaterialArgs = {}>(
    args?: Subset<T, WeaponEnhancementMaterialArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterial | null>,
    Prisma__WeaponEnhancementMaterialClient<WeaponEnhancementMaterialGetPayload<T> | null>
  >;

  weapon<T extends WeaponArgs = {}>(
    args?: Subset<T, WeaponArgs>
  ): CheckSelect<
    T,
    Prisma__WeaponClient<Weapon | null>,
    Prisma__WeaponClient<WeaponGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ForgeRecipe findOne
 */
export type FindOneForgeRecipeArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * Filter, which ForgeRecipe to fetch.
   **/
  where: ForgeRecipeWhereUniqueInput;
};

/**
 * ForgeRecipe findMany
 */
export type FindManyForgeRecipeArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * Filter, which ForgeRecipes to fetch.
   **/
  where?: ForgeRecipeWhereInput;
  /**
   * Determine the order of the ForgeRecipes to fetch.
   **/
  orderBy?: Enumerable<ForgeRecipeOrderByInput>;
  /**
   * Sets the position for listing ForgeRecipes.
   **/
  cursor?: ForgeRecipeWhereUniqueInput;
  /**
   * The number of ForgeRecipes to fetch. If negative number, it will take ForgeRecipes before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` ForgeRecipes.
   **/
  skip?: number;
  distinct?: Enumerable<ForgeRecipeDistinctFieldEnum>;
};

/**
 * ForgeRecipe create
 */
export type ForgeRecipeCreateArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * The data needed to create a ForgeRecipe.
   **/
  data: ForgeRecipeCreateInput;
};

/**
 * ForgeRecipe update
 */
export type ForgeRecipeUpdateArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * The data needed to update a ForgeRecipe.
   **/
  data: ForgeRecipeUpdateInput;
  /**
   * Choose, which ForgeRecipe to update.
   **/
  where: ForgeRecipeWhereUniqueInput;
};

/**
 * ForgeRecipe updateMany
 */
export type ForgeRecipeUpdateManyArgs = {
  data: ForgeRecipeUpdateManyMutationInput;
  where?: ForgeRecipeWhereInput;
};

/**
 * ForgeRecipe upsert
 */
export type ForgeRecipeUpsertArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * The filter to search for the ForgeRecipe to update in case it exists.
   **/
  where: ForgeRecipeWhereUniqueInput;
  /**
   * In case the ForgeRecipe found by the `where` argument doesn't exist, create a new ForgeRecipe with this data.
   **/
  create: ForgeRecipeCreateInput;
  /**
   * In case the ForgeRecipe was found with the provided `where` argument, update it with this data.
   **/
  update: ForgeRecipeUpdateInput;
};

/**
 * ForgeRecipe delete
 */
export type ForgeRecipeDeleteArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
  /**
   * Filter which ForgeRecipe to delete.
   **/
  where: ForgeRecipeWhereUniqueInput;
};

/**
 * ForgeRecipe deleteMany
 */
export type ForgeRecipeDeleteManyArgs = {
  where?: ForgeRecipeWhereInput;
};

/**
 * ForgeRecipe without action
 */
export type ForgeRecipeArgs = {
  /**
   * Select specific fields to fetch from the ForgeRecipe
   **/
  select?: ForgeRecipeSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ForgeRecipeInclude | null;
};

/**
 * Model ArtifactSet
 */

export type ArtifactSet = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string | null;
  maxRarity: number | null;
  pieceBonusFour: string | null;
  pieceBonusOne: string | null;
  pieceBonusTwo: string | null;
};

export type AggregateArtifactSet = {
  count: number;
  avg: ArtifactSetAvgAggregateOutputType | null;
  sum: ArtifactSetSumAggregateOutputType | null;
  min: ArtifactSetMinAggregateOutputType | null;
  max: ArtifactSetMaxAggregateOutputType | null;
};

export type ArtifactSetAvgAggregateOutputType = {
  maxRarity: number;
};

export type ArtifactSetSumAggregateOutputType = {
  maxRarity: number | null;
};

export type ArtifactSetMinAggregateOutputType = {
  maxRarity: number | null;
};

export type ArtifactSetMaxAggregateOutputType = {
  maxRarity: number | null;
};

export type ArtifactSetAvgAggregateInputType = {
  maxRarity?: true;
};

export type ArtifactSetSumAggregateInputType = {
  maxRarity?: true;
};

export type ArtifactSetMinAggregateInputType = {
  maxRarity?: true;
};

export type ArtifactSetMaxAggregateInputType = {
  maxRarity?: true;
};

export type AggregateArtifactSetArgs = {
  where?: ArtifactSetWhereInput;
  orderBy?: Enumerable<ArtifactSetOrderByInput>;
  cursor?: ArtifactSetWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ArtifactSetDistinctFieldEnum>;
  count?: true;
  avg?: ArtifactSetAvgAggregateInputType;
  sum?: ArtifactSetSumAggregateInputType;
  min?: ArtifactSetMinAggregateInputType;
  max?: ArtifactSetMaxAggregateInputType;
};

export type GetArtifactSetAggregateType<T extends AggregateArtifactSetArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetArtifactSetAggregateScalarType<T[P]>;
};

export type GetArtifactSetAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ArtifactSetAvgAggregateOutputType
    ? ArtifactSetAvgAggregateOutputType[P]
    : never;
};

export type ArtifactSetSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  image?: boolean;
  maxRarity?: boolean;
  pieceBonusFour?: boolean;
  pieceBonusOne?: boolean;
  pieceBonusTwo?: boolean;
  artifacts?: boolean | FindManyArtifactArgs;
};

export type ArtifactSetInclude = {
  artifacts?: boolean | FindManyArtifactArgs;
};

export type ArtifactSetGetPayload<
  S extends boolean | null | undefined | ArtifactSetArgs,
  U = keyof S
> = S extends true
  ? ArtifactSet
  : S extends undefined
  ? never
  : S extends ArtifactSetArgs | FindManyArtifactSetArgs
  ? 'include' extends U
    ? ArtifactSet &
        {
          [P in TrueKeys<S['include']>]: P extends 'artifacts'
            ? Array<ArtifactGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof ArtifactSet
          ? ArtifactSet[P]
          : P extends 'artifacts'
          ? Array<ArtifactGetPayload<S['select'][P]>>
          : never;
      }
    : ArtifactSet
  : ArtifactSet;

export interface ArtifactSetDelegate {
  /**
   * Find zero or one ArtifactSet.
   * @param {FindOneArtifactSetArgs} args - Arguments to find a ArtifactSet
   * @example
   * // Get one ArtifactSet
   * const artifactSet = await prisma.artifactSet.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneArtifactSetArgs>(
    args: Subset<T, FindOneArtifactSetArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet | null>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T> | null>
  >;
  /**
   * Find zero or more ArtifactSets.
   * @param {FindManyArtifactSetArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ArtifactSets
   * const artifactSets = await prisma.artifactSet.findMany()
   *
   * // Get first 10 ArtifactSets
   * const artifactSets = await prisma.artifactSet.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const artifactSetWithIdOnly = await prisma.artifactSet.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyArtifactSetArgs>(
    args?: Subset<T, FindManyArtifactSetArgs>
  ): CheckSelect<
    T,
    Promise<Array<ArtifactSet>>,
    Promise<Array<ArtifactSetGetPayload<T>>>
  >;
  /**
   * Create a ArtifactSet.
   * @param {ArtifactSetCreateArgs} args - Arguments to create a ArtifactSet.
   * @example
   * // Create one ArtifactSet
   * const ArtifactSet = await prisma.artifactSet.create({
   *   data: {
   *     // ... data to create a ArtifactSet
   *   }
   * })
   *
   **/
  create<T extends ArtifactSetCreateArgs>(
    args: Subset<T, ArtifactSetCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T>>
  >;
  /**
   * Delete a ArtifactSet.
   * @param {ArtifactSetDeleteArgs} args - Arguments to delete one ArtifactSet.
   * @example
   * // Delete one ArtifactSet
   * const ArtifactSet = await prisma.artifactSet.delete({
   *   where: {
   *     // ... filter to delete one ArtifactSet
   *   }
   * })
   *
   **/
  delete<T extends ArtifactSetDeleteArgs>(
    args: Subset<T, ArtifactSetDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T>>
  >;
  /**
   * Update one ArtifactSet.
   * @param {ArtifactSetUpdateArgs} args - Arguments to update one ArtifactSet.
   * @example
   * // Update one ArtifactSet
   * const artifactSet = await prisma.artifactSet.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ArtifactSetUpdateArgs>(
    args: Subset<T, ArtifactSetUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T>>
  >;
  /**
   * Delete zero or more ArtifactSets.
   * @param {ArtifactSetDeleteManyArgs} args - Arguments to filter ArtifactSets to delete.
   * @example
   * // Delete a few ArtifactSets
   * const { count } = await prisma.artifactSet.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ArtifactSetDeleteManyArgs>(
    args: Subset<T, ArtifactSetDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more ArtifactSets.
   * @param {ArtifactSetUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ArtifactSets
   * const artifactSet = await prisma.artifactSet.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ArtifactSetUpdateManyArgs>(
    args: Subset<T, ArtifactSetUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one ArtifactSet.
   * @param {ArtifactSetUpsertArgs} args - Arguments to update or create a ArtifactSet.
   * @example
   * // Update or create a ArtifactSet
   * const artifactSet = await prisma.artifactSet.upsert({
   *   create: {
   *     // ... data to create a ArtifactSet
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ArtifactSet we want to update
   *   }
   * })
   **/
  upsert<T extends ArtifactSetUpsertArgs>(
    args: Subset<T, ArtifactSetUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyArtifactSetArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateArtifactSetArgs>(
    args: Subset<T, AggregateArtifactSetArgs>
  ): Promise<GetArtifactSetAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for ArtifactSet.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ArtifactSetClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  artifacts<T extends FindManyArtifactArgs = {}>(
    args?: Subset<T, FindManyArtifactArgs>
  ): CheckSelect<
    T,
    Promise<Array<Artifact>>,
    Promise<Array<ArtifactGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ArtifactSet findOne
 */
export type FindOneArtifactSetArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * Filter, which ArtifactSet to fetch.
   **/
  where: ArtifactSetWhereUniqueInput;
};

/**
 * ArtifactSet findMany
 */
export type FindManyArtifactSetArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * Filter, which ArtifactSets to fetch.
   **/
  where?: ArtifactSetWhereInput;
  /**
   * Determine the order of the ArtifactSets to fetch.
   **/
  orderBy?: Enumerable<ArtifactSetOrderByInput>;
  /**
   * Sets the position for listing ArtifactSets.
   **/
  cursor?: ArtifactSetWhereUniqueInput;
  /**
   * The number of ArtifactSets to fetch. If negative number, it will take ArtifactSets before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` ArtifactSets.
   **/
  skip?: number;
  distinct?: Enumerable<ArtifactSetDistinctFieldEnum>;
};

/**
 * ArtifactSet create
 */
export type ArtifactSetCreateArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * The data needed to create a ArtifactSet.
   **/
  data: ArtifactSetCreateInput;
};

/**
 * ArtifactSet update
 */
export type ArtifactSetUpdateArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * The data needed to update a ArtifactSet.
   **/
  data: ArtifactSetUpdateInput;
  /**
   * Choose, which ArtifactSet to update.
   **/
  where: ArtifactSetWhereUniqueInput;
};

/**
 * ArtifactSet updateMany
 */
export type ArtifactSetUpdateManyArgs = {
  data: ArtifactSetUpdateManyMutationInput;
  where?: ArtifactSetWhereInput;
};

/**
 * ArtifactSet upsert
 */
export type ArtifactSetUpsertArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * The filter to search for the ArtifactSet to update in case it exists.
   **/
  where: ArtifactSetWhereUniqueInput;
  /**
   * In case the ArtifactSet found by the `where` argument doesn't exist, create a new ArtifactSet with this data.
   **/
  create: ArtifactSetCreateInput;
  /**
   * In case the ArtifactSet was found with the provided `where` argument, update it with this data.
   **/
  update: ArtifactSetUpdateInput;
};

/**
 * ArtifactSet delete
 */
export type ArtifactSetDeleteArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
  /**
   * Filter which ArtifactSet to delete.
   **/
  where: ArtifactSetWhereUniqueInput;
};

/**
 * ArtifactSet deleteMany
 */
export type ArtifactSetDeleteManyArgs = {
  where?: ArtifactSetWhereInput;
};

/**
 * ArtifactSet without action
 */
export type ArtifactSetArgs = {
  /**
   * Select specific fields to fetch from the ArtifactSet
   **/
  select?: ArtifactSetSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactSetInclude | null;
};

/**
 * Model Artifact
 */

export type Artifact = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  lore: string | null;
  minRarity: number;
  possibleMainStats: JsonValue | null;
  possibleSubStats: JsonValue | null;
  source: JsonValue | null;
  type: ArtifactType;
  artifactSetId: string | null;
  domainId: string | null;
};

export type AggregateArtifact = {
  count: number;
  avg: ArtifactAvgAggregateOutputType | null;
  sum: ArtifactSumAggregateOutputType | null;
  min: ArtifactMinAggregateOutputType | null;
  max: ArtifactMaxAggregateOutputType | null;
};

export type ArtifactAvgAggregateOutputType = {
  minRarity: number;
};

export type ArtifactSumAggregateOutputType = {
  minRarity: number;
};

export type ArtifactMinAggregateOutputType = {
  minRarity: number;
};

export type ArtifactMaxAggregateOutputType = {
  minRarity: number;
};

export type ArtifactAvgAggregateInputType = {
  minRarity?: true;
};

export type ArtifactSumAggregateInputType = {
  minRarity?: true;
};

export type ArtifactMinAggregateInputType = {
  minRarity?: true;
};

export type ArtifactMaxAggregateInputType = {
  minRarity?: true;
};

export type AggregateArtifactArgs = {
  where?: ArtifactWhereInput;
  orderBy?: Enumerable<ArtifactOrderByInput>;
  cursor?: ArtifactWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<ArtifactDistinctFieldEnum>;
  count?: true;
  avg?: ArtifactAvgAggregateInputType;
  sum?: ArtifactSumAggregateInputType;
  min?: ArtifactMinAggregateInputType;
  max?: ArtifactMaxAggregateInputType;
};

export type GetArtifactAggregateType<T extends AggregateArtifactArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetArtifactAggregateScalarType<T[P]>;
};

export type GetArtifactAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ArtifactAvgAggregateOutputType
    ? ArtifactAvgAggregateOutputType[P]
    : never;
};

export type ArtifactSelect = {
  id?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  name?: boolean;
  lore?: boolean;
  minRarity?: boolean;
  possibleMainStats?: boolean;
  possibleSubStats?: boolean;
  source?: boolean;
  type?: boolean;
  set?: boolean | ArtifactSetArgs;
  artifactSetId?: boolean;
  domain?: boolean | DomainArgs;
  domainId?: boolean;
};

export type ArtifactInclude = {
  set?: boolean | ArtifactSetArgs;
  domain?: boolean | DomainArgs;
};

export type ArtifactGetPayload<
  S extends boolean | null | undefined | ArtifactArgs,
  U = keyof S
> = S extends true
  ? Artifact
  : S extends undefined
  ? never
  : S extends ArtifactArgs | FindManyArtifactArgs
  ? 'include' extends U
    ? Artifact &
        {
          [P in TrueKeys<S['include']>]: P extends 'set'
            ? ArtifactSetGetPayload<S['include'][P]> | null
            : P extends 'domain'
            ? DomainGetPayload<S['include'][P]> | null
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Artifact
          ? Artifact[P]
          : P extends 'set'
          ? ArtifactSetGetPayload<S['select'][P]> | null
          : P extends 'domain'
          ? DomainGetPayload<S['select'][P]> | null
          : never;
      }
    : Artifact
  : Artifact;

export interface ArtifactDelegate {
  /**
   * Find zero or one Artifact.
   * @param {FindOneArtifactArgs} args - Arguments to find a Artifact
   * @example
   * // Get one Artifact
   * const artifact = await prisma.artifact.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneArtifactArgs>(
    args: Subset<T, FindOneArtifactArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactClient<Artifact | null>,
    Prisma__ArtifactClient<ArtifactGetPayload<T> | null>
  >;
  /**
   * Find zero or more Artifacts.
   * @param {FindManyArtifactArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Artifacts
   * const artifacts = await prisma.artifact.findMany()
   *
   * // Get first 10 Artifacts
   * const artifacts = await prisma.artifact.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const artifactWithIdOnly = await prisma.artifact.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyArtifactArgs>(
    args?: Subset<T, FindManyArtifactArgs>
  ): CheckSelect<
    T,
    Promise<Array<Artifact>>,
    Promise<Array<ArtifactGetPayload<T>>>
  >;
  /**
   * Create a Artifact.
   * @param {ArtifactCreateArgs} args - Arguments to create a Artifact.
   * @example
   * // Create one Artifact
   * const Artifact = await prisma.artifact.create({
   *   data: {
   *     // ... data to create a Artifact
   *   }
   * })
   *
   **/
  create<T extends ArtifactCreateArgs>(
    args: Subset<T, ArtifactCreateArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactClient<Artifact>,
    Prisma__ArtifactClient<ArtifactGetPayload<T>>
  >;
  /**
   * Delete a Artifact.
   * @param {ArtifactDeleteArgs} args - Arguments to delete one Artifact.
   * @example
   * // Delete one Artifact
   * const Artifact = await prisma.artifact.delete({
   *   where: {
   *     // ... filter to delete one Artifact
   *   }
   * })
   *
   **/
  delete<T extends ArtifactDeleteArgs>(
    args: Subset<T, ArtifactDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactClient<Artifact>,
    Prisma__ArtifactClient<ArtifactGetPayload<T>>
  >;
  /**
   * Update one Artifact.
   * @param {ArtifactUpdateArgs} args - Arguments to update one Artifact.
   * @example
   * // Update one Artifact
   * const artifact = await prisma.artifact.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends ArtifactUpdateArgs>(
    args: Subset<T, ArtifactUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactClient<Artifact>,
    Prisma__ArtifactClient<ArtifactGetPayload<T>>
  >;
  /**
   * Delete zero or more Artifacts.
   * @param {ArtifactDeleteManyArgs} args - Arguments to filter Artifacts to delete.
   * @example
   * // Delete a few Artifacts
   * const { count } = await prisma.artifact.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends ArtifactDeleteManyArgs>(
    args: Subset<T, ArtifactDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Artifacts.
   * @param {ArtifactUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Artifacts
   * const artifact = await prisma.artifact.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends ArtifactUpdateManyArgs>(
    args: Subset<T, ArtifactUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Artifact.
   * @param {ArtifactUpsertArgs} args - Arguments to update or create a Artifact.
   * @example
   * // Update or create a Artifact
   * const artifact = await prisma.artifact.upsert({
   *   create: {
   *     // ... data to create a Artifact
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Artifact we want to update
   *   }
   * })
   **/
  upsert<T extends ArtifactUpsertArgs>(
    args: Subset<T, ArtifactUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactClient<Artifact>,
    Prisma__ArtifactClient<ArtifactGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyArtifactArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateArtifactArgs>(
    args: Subset<T, AggregateArtifactArgs>
  ): Promise<GetArtifactAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Artifact.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ArtifactClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  set<T extends ArtifactSetArgs = {}>(
    args?: Subset<T, ArtifactSetArgs>
  ): CheckSelect<
    T,
    Prisma__ArtifactSetClient<ArtifactSet | null>,
    Prisma__ArtifactSetClient<ArtifactSetGetPayload<T> | null>
  >;

  domain<T extends DomainArgs = {}>(
    args?: Subset<T, DomainArgs>
  ): CheckSelect<
    T,
    Prisma__DomainClient<Domain | null>,
    Prisma__DomainClient<DomainGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Artifact findOne
 */
export type FindOneArtifactArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * Filter, which Artifact to fetch.
   **/
  where: ArtifactWhereUniqueInput;
};

/**
 * Artifact findMany
 */
export type FindManyArtifactArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * Filter, which Artifacts to fetch.
   **/
  where?: ArtifactWhereInput;
  /**
   * Determine the order of the Artifacts to fetch.
   **/
  orderBy?: Enumerable<ArtifactOrderByInput>;
  /**
   * Sets the position for listing Artifacts.
   **/
  cursor?: ArtifactWhereUniqueInput;
  /**
   * The number of Artifacts to fetch. If negative number, it will take Artifacts before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Artifacts.
   **/
  skip?: number;
  distinct?: Enumerable<ArtifactDistinctFieldEnum>;
};

/**
 * Artifact create
 */
export type ArtifactCreateArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * The data needed to create a Artifact.
   **/
  data: ArtifactCreateInput;
};

/**
 * Artifact update
 */
export type ArtifactUpdateArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * The data needed to update a Artifact.
   **/
  data: ArtifactUpdateInput;
  /**
   * Choose, which Artifact to update.
   **/
  where: ArtifactWhereUniqueInput;
};

/**
 * Artifact updateMany
 */
export type ArtifactUpdateManyArgs = {
  data: ArtifactUpdateManyMutationInput;
  where?: ArtifactWhereInput;
};

/**
 * Artifact upsert
 */
export type ArtifactUpsertArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * The filter to search for the Artifact to update in case it exists.
   **/
  where: ArtifactWhereUniqueInput;
  /**
   * In case the Artifact found by the `where` argument doesn't exist, create a new Artifact with this data.
   **/
  create: ArtifactCreateInput;
  /**
   * In case the Artifact was found with the provided `where` argument, update it with this data.
   **/
  update: ArtifactUpdateInput;
};

/**
 * Artifact delete
 */
export type ArtifactDeleteArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
  /**
   * Filter which Artifact to delete.
   **/
  where: ArtifactWhereUniqueInput;
};

/**
 * Artifact deleteMany
 */
export type ArtifactDeleteManyArgs = {
  where?: ArtifactWhereInput;
};

/**
 * Artifact without action
 */
export type ArtifactArgs = {
  /**
   * Select specific fields to fetch from the Artifact
   **/
  select?: ArtifactSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: ArtifactInclude | null;
};

/**
 * Deep Input Types
 */

export type CharacterWhereInput = {
  AND?: Enumerable<CharacterWhereInput>;
  OR?: Array<CharacterWhereInput>;
  NOT?: Enumerable<CharacterWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  constellations?: JsonNullableFilter | null;
  overview?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  stats?: JsonNullableFilter | null;
  ascensions?: CharacterAscensionListRelationFilter;
  elements?: ElementListRelationFilter;
  profile?: CharacterProfileWhereInput | null;
  talents?: TalentListRelationFilter;
  weapon?: WeaponType | EnumWeaponTypeNullableFilter | null;
};

export type CharacterOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  constellations?: SortOrder;
  overview?: SortOrder;
  rarity?: SortOrder;
  stats?: SortOrder;
  weapon?: SortOrder;
};

export type CharacterWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CharacterAscensionWhereInput = {
  AND?: Enumerable<CharacterAscensionWhereInput>;
  OR?: Array<CharacterAscensionWhereInput>;
  NOT?: Enumerable<CharacterAscensionWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  level?: number | IntFilter;
  maxLevel?: number | IntFilter;
  recipe?: JsonNullableFilter | null;
  character?: CharacterWhereInput | null;
  characterId?: string | StringNullableFilter | null;
  characterAscensionMaterial?: CharacterAscensionMaterialWhereInput | null;
  characterAscensionMaterialId?: string | StringNullableFilter | null;
  commonAscensionMaterials?: CommonAscensionMaterialListRelationFilter;
};

export type CharacterAscensionOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  level?: SortOrder;
  maxLevel?: SortOrder;
  recipe?: SortOrder;
  characterId?: SortOrder;
  characterAscensionMaterialId?: SortOrder;
};

export type CharacterAscensionWhereUniqueInput = {
  id?: string;
};

export type CharacterProfileWhereInput = {
  AND?: Enumerable<CharacterProfileWhereInput>;
  OR?: Array<CharacterProfileWhereInput>;
  NOT?: Enumerable<CharacterProfileWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  affiliation?: string | StringNullableFilter | null;
  birthday?: string | StringNullableFilter | null;
  constellation?: string | StringNullableFilter | null;
  overview?: string | StringNullableFilter | null;
  story?: JsonNullableFilter | null;
  voiceActor?: JsonNullableFilter | null;
  voiceLines?: JsonNullableFilter | null;
  character?: CharacterWhereInput | null;
  characterId?: string | StringFilter;
  region?: RegionWhereInput | null;
  regionId?: string | StringNullableFilter | null;
  specialtyDish?: ConsumeableWhereInput | null;
  vision?: ElementWhereInput | null;
  elementId?: string | StringNullableFilter | null;
};

export type CharacterProfileOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  affiliation?: SortOrder;
  birthday?: SortOrder;
  constellation?: SortOrder;
  overview?: SortOrder;
  story?: SortOrder;
  voiceActor?: SortOrder;
  voiceLines?: SortOrder;
  characterId?: SortOrder;
  regionId?: SortOrder;
  elementId?: SortOrder;
};

export type CharacterProfileWhereUniqueInput = {
  id?: string;
};

export type TalentWhereInput = {
  AND?: Enumerable<TalentWhereInput>;
  OR?: Array<TalentWhereInput>;
  NOT?: Enumerable<TalentWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  description?: JsonNullableFilter | null;
  details?: JsonNullableFilter | null;
  name?: string | StringNullableFilter | null;
  type?: string | StringNullableFilter | null;
  character?: CharacterWhereInput | null;
  characterId?: string | StringFilter;
  talentLevelUpMaterial?: TalentLevelUpMaterialWhereInput | null;
  talentLevelUpMaterialId?: string | StringNullableFilter | null;
};

export type TalentOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  description?: SortOrder;
  details?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  characterId?: SortOrder;
  talentLevelUpMaterialId?: SortOrder;
};

export type TalentWhereUniqueInput = {
  id?: string;
};

export type ElementWhereInput = {
  AND?: Enumerable<ElementWhereInput>;
  OR?: Array<ElementWhereInput>;
  NOT?: Enumerable<ElementWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  archon?: string | StringNullableFilter | null;
  statusEffect?: string | StringNullableFilter | null;
  theme?: string | StringNullableFilter | null;
  characters?: CharacterListRelationFilter;
  characterProfiles?: CharacterProfileListRelationFilter;
  region?: RegionWhereInput | null;
  regionId?: string | StringNullableFilter | null;
};

export type ElementOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  archon?: SortOrder;
  statusEffect?: SortOrder;
  theme?: SortOrder;
  regionId?: SortOrder;
};

export type ElementWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type RegionWhereInput = {
  AND?: Enumerable<RegionWhereInput>;
  OR?: Array<RegionWhereInput>;
  NOT?: Enumerable<RegionWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  characterProfile?: CharacterProfileListRelationFilter;
  domains?: DomainListRelationFilter;
  element?: ElementWhereInput | null;
};

export type RegionOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
};

export type RegionWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type WeaponWhereInput = {
  AND?: Enumerable<WeaponWhereInput>;
  OR?: Array<WeaponWhereInput>;
  NOT?: Enumerable<WeaponWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  baseStats?: JsonNullableFilter | null;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  lore?: string | StringNullableFilter | null;
  passive?: JsonNullableFilter | null;
  rarity?: number | IntNullableFilter | null;
  refinements?: JsonNullableFilter | null;
  stats?: JsonNullableFilter | null;
  secondaryStatType?:
    | WeaponSecondaryStatType
    | EnumWeaponSecondaryStatTypeNullableFilter
    | null;
  type?: WeaponType | EnumWeaponTypeFilter;
  ascensions?: WeaponAscensionListRelationFilter;
  forgeRecipe?: ForgeRecipeWhereInput | null;
};

export type WeaponOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  baseStats?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  lore?: SortOrder;
  passive?: SortOrder;
  rarity?: SortOrder;
  refinements?: SortOrder;
  stats?: SortOrder;
  secondaryStatType?: SortOrder;
  type?: SortOrder;
};

export type WeaponWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type WeaponAscensionWhereInput = {
  AND?: Enumerable<WeaponAscensionWhereInput>;
  OR?: Array<WeaponAscensionWhereInput>;
  NOT?: Enumerable<WeaponAscensionWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  level?: number | IntFilter;
  maxLevel?: number | IntFilter;
  recipe?: JsonNullableFilter | null;
  commonAscensionMaterials?: CommonAscensionMaterialListRelationFilter;
  weaponAscensionMaterial?: WeaponAscensionMaterialWhereInput | null;
  weaponAscensionMaterialId?: string | StringNullableFilter | null;
  weapon?: WeaponWhereInput | null;
  weaponId?: string | StringNullableFilter | null;
};

export type WeaponAscensionOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  level?: SortOrder;
  maxLevel?: SortOrder;
  recipe?: SortOrder;
  weaponAscensionMaterialId?: SortOrder;
  weaponId?: SortOrder;
};

export type WeaponAscensionWhereUniqueInput = {
  id?: string;
};

export type CommonAscensionMaterialWhereInput = {
  AND?: Enumerable<CommonAscensionMaterialWhereInput>;
  OR?: Array<CommonAscensionMaterialWhereInput>;
  NOT?: Enumerable<CommonAscensionMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: CommonAscensionMaterialGroup | EnumCommonAscensionMaterialGroupFilter;
  characterAscensions?: CharacterAscensionListRelationFilter;
  weaponAscensions?: WeaponAscensionListRelationFilter;
};

export type CommonAscensionMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  group?: SortOrder;
};

export type CommonAscensionMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type WeaponAscensionMaterialWhereInput = {
  AND?: Enumerable<WeaponAscensionMaterialWhereInput>;
  OR?: Array<WeaponAscensionMaterialWhereInput>;
  NOT?: Enumerable<WeaponAscensionMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  availability?: JsonNullableFilter | null;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: WeaponAscensionMaterialGroup | EnumWeaponAscensionMaterialGroupFilter;
  domain?: DomainWhereInput | null;
  domainId?: string | StringNullableFilter | null;
  weaponAscensions?: WeaponAscensionListRelationFilter;
};

export type WeaponAscensionMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  availability?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  group?: SortOrder;
  domainId?: SortOrder;
};

export type WeaponAscensionMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type WeaponEnhancementMaterialWhereInput = {
  AND?: Enumerable<WeaponEnhancementMaterialWhereInput>;
  OR?: Array<WeaponEnhancementMaterialWhereInput>;
  NOT?: Enumerable<WeaponEnhancementMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
  recipeCreate?: ForgeRecipeWhereInput | null;
  recipeUse?: ForgeRecipeWhereInput | null;
  recipeUseId?: string | StringNullableFilter | null;
};

export type WeaponEnhancementMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  source?: SortOrder;
  recipeUseId?: SortOrder;
};

export type WeaponEnhancementMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CharacterAscensionMaterialWhereInput = {
  AND?: Enumerable<CharacterAscensionMaterialWhereInput>;
  OR?: Array<CharacterAscensionMaterialWhereInput>;
  NOT?: Enumerable<CharacterAscensionMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
  group?: WeaponAscensionMaterialGroup | EnumWeaponAscensionMaterialGroupFilter;
  characterAscensions?: CharacterAscensionListRelationFilter;
};

export type CharacterAscensionMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  source?: SortOrder;
  group?: SortOrder;
};

export type CharacterAscensionMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type TalentLevelUpMaterialWhereInput = {
  AND?: Enumerable<TalentLevelUpMaterialWhereInput>;
  OR?: Array<TalentLevelUpMaterialWhereInput>;
  NOT?: Enumerable<TalentLevelUpMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  availability?: JsonNullableFilter | null;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: TalentLevelUpMaterialGroup | EnumTalentLevelUpMaterialGroupFilter;
  domain?: DomainWhereInput | null;
  domainId?: string | StringNullableFilter | null;
  talents?: TalentListRelationFilter;
};

export type TalentLevelUpMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  availability?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  group?: SortOrder;
  domainId?: SortOrder;
};

export type TalentLevelUpMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CraftingMaterialWhereInput = {
  AND?: Enumerable<CraftingMaterialWhereInput>;
  OR?: Array<CraftingMaterialWhereInput>;
  NOT?: Enumerable<CraftingMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
  recipes?: ConsumeableRecipeListRelationFilter;
};

export type CraftingMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  source?: SortOrder;
};

export type CraftingMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CookingMaterialWhereInput = {
  AND?: Enumerable<CookingMaterialWhereInput>;
  OR?: Array<CookingMaterialWhereInput>;
  NOT?: Enumerable<CookingMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
  processingRecipe?: ProcessRecipeWhereInput | null;
  recipes?: ConsumeableRecipeListRelationFilter;
};

export type CookingMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  source?: SortOrder;
};

export type CookingMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CommonMaterialWhereInput = {
  AND?: Enumerable<CommonMaterialWhereInput>;
  OR?: Array<CommonMaterialWhereInput>;
  NOT?: Enumerable<CommonMaterialWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
};

export type CommonMaterialOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  source?: SortOrder;
};

export type CommonMaterialWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type DomainWhereInput = {
  AND?: Enumerable<DomainWhereInput>;
  OR?: Array<DomainWhereInput>;
  NOT?: Enumerable<DomainWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  levels?: JsonNullableFilter | null;
  type?: string | StringNullableFilter | null;
  artifacts?: ArtifactListRelationFilter;
  region?: RegionWhereInput | null;
  regionId?: string | StringNullableFilter | null;
  talentLevelUpMaterials?: TalentLevelUpMaterialListRelationFilter;
  weaponAscensionMaterials?: WeaponAscensionMaterialListRelationFilter;
};

export type DomainOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  levels?: SortOrder;
  type?: SortOrder;
  regionId?: SortOrder;
};

export type DomainWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type ConsumeableWhereInput = {
  AND?: Enumerable<ConsumeableWhereInput>;
  OR?: Array<ConsumeableWhereInput>;
  NOT?: Enumerable<ConsumeableWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  effect?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  consumeableType?: ConsumableType | EnumConsumableTypeFilter;
  foodType?: FoodType | EnumFoodTypeFilter;
  characterSpecialty?: CharacterProfileWhereInput | null;
  characterProfileId?: string | StringNullableFilter | null;
  recipe?: ConsumeableRecipeWhereInput | null;
};

export type ConsumeableOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  effect?: SortOrder;
  image?: SortOrder;
  rarity?: SortOrder;
  consumeableType?: SortOrder;
  foodType?: SortOrder;
  characterProfileId?: SortOrder;
};

export type ConsumeableWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type ConsumeableRecipeWhereInput = {
  AND?: Enumerable<ConsumeableRecipeWhereInput>;
  OR?: Array<ConsumeableRecipeWhereInput>;
  NOT?: Enumerable<ConsumeableRecipeWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  recipe?: JsonNullableFilter | null;
  consumeable?: ConsumeableWhereInput | null;
  consumeableId?: string | StringNullableFilter | null;
  craftingMaterials?: CraftingMaterialListRelationFilter;
  cookingMaterials?: CookingMaterialListRelationFilter;
};

export type ConsumeableRecipeOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  recipe?: SortOrder;
  consumeableId?: SortOrder;
};

export type ConsumeableRecipeWhereUniqueInput = {
  id?: string;
};

export type ProcessRecipeWhereInput = {
  AND?: Enumerable<ProcessRecipeWhereInput>;
  OR?: Array<ProcessRecipeWhereInput>;
  NOT?: Enumerable<ProcessRecipeWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  processingTime?: number | IntNullableFilter | null;
  recipe?: JsonNullableFilter | null;
  material?: CookingMaterialWhereInput | null;
  materialId?: string | StringNullableFilter | null;
};

export type ProcessRecipeOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  processingTime?: SortOrder;
  recipe?: SortOrder;
  materialId?: SortOrder;
};

export type ProcessRecipeWhereUniqueInput = {
  id?: string;
};

export type ForgeRecipeWhereInput = {
  AND?: Enumerable<ForgeRecipeWhereInput>;
  OR?: Array<ForgeRecipeWhereInput>;
  NOT?: Enumerable<ForgeRecipeWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  craftingTime?: number | IntNullableFilter | null;
  recipe?: JsonNullableFilter | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialListRelationFilter;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialWhereInput | null;
  weaponEnhancementMaterialId?: string | StringNullableFilter | null;
  weapon?: WeaponWhereInput | null;
  weaponId?: string | StringNullableFilter | null;
};

export type ForgeRecipeOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  craftingTime?: SortOrder;
  recipe?: SortOrder;
  weaponEnhancementMaterialId?: SortOrder;
  weaponId?: SortOrder;
};

export type ForgeRecipeWhereUniqueInput = {
  id?: string;
};

export type ArtifactSetWhereInput = {
  AND?: Enumerable<ArtifactSetWhereInput>;
  OR?: Array<ArtifactSetWhereInput>;
  NOT?: Enumerable<ArtifactSetWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  image?: string | StringNullableFilter | null;
  maxRarity?: number | IntNullableFilter | null;
  pieceBonusFour?: string | StringNullableFilter | null;
  pieceBonusOne?: string | StringNullableFilter | null;
  pieceBonusTwo?: string | StringNullableFilter | null;
  artifacts?: ArtifactListRelationFilter;
};

export type ArtifactSetOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  image?: SortOrder;
  maxRarity?: SortOrder;
  pieceBonusFour?: SortOrder;
  pieceBonusOne?: SortOrder;
  pieceBonusTwo?: SortOrder;
};

export type ArtifactSetWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type ArtifactWhereInput = {
  AND?: Enumerable<ArtifactWhereInput>;
  OR?: Array<ArtifactWhereInput>;
  NOT?: Enumerable<ArtifactWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  lore?: string | StringNullableFilter | null;
  minRarity?: number | IntFilter;
  possibleMainStats?: JsonNullableFilter | null;
  possibleSubStats?: JsonNullableFilter | null;
  source?: JsonNullableFilter | null;
  type?: ArtifactType | EnumArtifactTypeFilter;
  set?: ArtifactSetWhereInput | null;
  artifactSetId?: string | StringNullableFilter | null;
  domain?: DomainWhereInput | null;
  domainId?: string | StringNullableFilter | null;
};

export type ArtifactOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
  lore?: SortOrder;
  minRarity?: SortOrder;
  possibleMainStats?: SortOrder;
  possibleSubStats?: SortOrder;
  source?: SortOrder;
  type?: SortOrder;
  artifactSetId?: SortOrder;
  domainId?: SortOrder;
};

export type ArtifactWhereUniqueInput = {
  id?: string;
  name?: string;
};

export type CharacterCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  constellations?: InputJsonValue | null;
  overview?: string | null;
  rarity: number;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | null;
  ascensions?: CharacterAscensionCreateManyWithoutCharacterInput;
  elements?: ElementCreateManyWithoutCharactersInput;
  profile?: CharacterProfileCreateOneWithoutCharacterInput;
  talents?: TalentCreateManyWithoutCharacterInput;
};

export type CharacterUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
  ascensions?: CharacterAscensionUpdateManyWithoutCharacterInput;
  elements?: ElementUpdateManyWithoutCharactersInput;
  profile?: CharacterProfileUpdateOneWithoutCharacterInput;
  talents?: TalentUpdateManyWithoutCharacterInput;
};

export type CharacterUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
};

export type CharacterAscensionCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  character?: CharacterCreateOneWithoutAscensionsInput;
  characterAscensionMaterial?: CharacterAscensionMaterialCreateOneWithoutCharacterAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutCharacterAscensionsInput;
};

export type CharacterAscensionUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  character?: CharacterUpdateOneWithoutAscensionsInput;
  characterAscensionMaterial?: CharacterAscensionMaterialUpdateOneWithoutCharacterAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutCharacterAscensionsInput;
};

export type CharacterAscensionUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type CharacterProfileCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  affiliation?: string | null;
  birthday?: string | null;
  constellation?: string | null;
  overview?: string | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character: CharacterCreateOneWithoutProfileInput;
  region?: RegionCreateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableCreateOneWithoutCharacterSpecialtyInput;
  vision?: ElementCreateOneWithoutCharacterProfilesInput;
};

export type CharacterProfileUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character?: CharacterUpdateOneRequiredWithoutProfileInput;
  region?: RegionUpdateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableUpdateOneWithoutCharacterSpecialtyInput;
  vision?: ElementUpdateOneWithoutCharacterProfilesInput;
};

export type CharacterProfileUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
};

export type TalentCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | null;
  type?: string | null;
  character: CharacterCreateOneWithoutTalentsInput;
  talentLevelUpMaterial?: TalentLevelUpMaterialCreateOneWithoutTalentsInput;
};

export type TalentUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | NullableStringFieldUpdateOperationsInput | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  character?: CharacterUpdateOneRequiredWithoutTalentsInput;
  talentLevelUpMaterial?: TalentLevelUpMaterialUpdateOneWithoutTalentsInput;
};

export type TalentUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | NullableStringFieldUpdateOperationsInput | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type ElementCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  archon?: string | null;
  statusEffect?: string | null;
  theme?: string | null;
  characters?: CharacterCreateManyWithoutElementsInput;
  characterProfiles?: CharacterProfileCreateManyWithoutVisionInput;
  region?: RegionCreateOneWithoutElementInput;
};

export type ElementUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
  characters?: CharacterUpdateManyWithoutElementsInput;
  characterProfiles?: CharacterProfileUpdateManyWithoutVisionInput;
  region?: RegionUpdateOneWithoutElementInput;
};

export type ElementUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type RegionCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  characterProfile?: CharacterProfileCreateManyWithoutRegionInput;
  domains?: DomainCreateManyWithoutRegionInput;
  element?: ElementCreateOneWithoutRegionInput;
};

export type RegionUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  characterProfile?: CharacterProfileUpdateManyWithoutRegionInput;
  domains?: DomainUpdateManyWithoutRegionInput;
  element?: ElementUpdateOneWithoutRegionInput;
};

export type RegionUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
};

export type WeaponCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  baseStats?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  lore?: string | null;
  passive?: InputJsonValue | null;
  rarity?: number | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?: WeaponSecondaryStatType | null;
  type: WeaponType;
  ascensions?: WeaponAscensionCreateManyWithoutWeaponInput;
  forgeRecipe?: ForgeRecipeCreateOneWithoutWeaponInput;
};

export type WeaponUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  baseStats?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  passive?: InputJsonValue | null;
  rarity?: number | NullableIntFieldUpdateOperationsInput | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?:
    | WeaponSecondaryStatType
    | NullableEnumWeaponSecondaryStatTypeFieldUpdateOperationsInput
    | null;
  type?: WeaponType | EnumWeaponTypeFieldUpdateOperationsInput;
  ascensions?: WeaponAscensionUpdateManyWithoutWeaponInput;
  forgeRecipe?: ForgeRecipeUpdateOneWithoutWeaponInput;
};

export type WeaponUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  baseStats?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  passive?: InputJsonValue | null;
  rarity?: number | NullableIntFieldUpdateOperationsInput | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?:
    | WeaponSecondaryStatType
    | NullableEnumWeaponSecondaryStatTypeFieldUpdateOperationsInput
    | null;
  type?: WeaponType | EnumWeaponTypeFieldUpdateOperationsInput;
};

export type WeaponAscensionCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutWeaponAscensionsInput;
  weaponAscensionMaterial?: WeaponAscensionMaterialCreateOneWithoutWeaponAscensionsInput;
  weapon?: WeaponCreateOneWithoutAscensionsInput;
};

export type WeaponAscensionUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutWeaponAscensionsInput;
  weaponAscensionMaterial?: WeaponAscensionMaterialUpdateOneWithoutWeaponAscensionsInput;
  weapon?: WeaponUpdateOneWithoutAscensionsInput;
};

export type WeaponAscensionUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type CommonAscensionMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: CommonAscensionMaterialGroup;
  characterAscensions?: CharacterAscensionCreateManyWithoutCommonAscensionMaterialsInput;
  weaponAscensions?: WeaponAscensionCreateManyWithoutCommonAscensionMaterialsInput;
};

export type CommonAscensionMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | CommonAscensionMaterialGroup
    | EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput;
  characterAscensions?: CharacterAscensionUpdateManyWithoutCommonAscensionMaterialsInput;
  weaponAscensions?: WeaponAscensionUpdateManyWithoutCommonAscensionMaterialsInput;
};

export type CommonAscensionMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | CommonAscensionMaterialGroup
    | EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type WeaponAscensionMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: WeaponAscensionMaterialGroup;
  domain?: DomainCreateOneWithoutWeaponAscensionMaterialsInput;
  weaponAscensions?: WeaponAscensionCreateManyWithoutWeaponAscensionMaterialInput;
};

export type WeaponAscensionMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
  domain?: DomainUpdateOneWithoutWeaponAscensionMaterialsInput;
  weaponAscensions?: WeaponAscensionUpdateManyWithoutWeaponAscensionMaterialInput;
};

export type WeaponAscensionMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type WeaponEnhancementMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  recipeCreate?: ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialInput;
  recipeUse?: ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialsInput;
};

export type WeaponEnhancementMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  recipeCreate?: ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialInput;
  recipeUse?: ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialsInput;
};

export type WeaponEnhancementMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CharacterAscensionMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  group: WeaponAscensionMaterialGroup;
  characterAscensions?: CharacterAscensionCreateManyWithoutCharacterAscensionMaterialInput;
};

export type CharacterAscensionMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
  characterAscensions?: CharacterAscensionUpdateManyWithoutCharacterAscensionMaterialInput;
};

export type CharacterAscensionMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type TalentLevelUpMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: TalentLevelUpMaterialGroup;
  domain?: DomainCreateOneWithoutTalentLevelUpMaterialsInput;
  talents?: TalentCreateManyWithoutTalentLevelUpMaterialInput;
};

export type TalentLevelUpMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | TalentLevelUpMaterialGroup
    | EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput;
  domain?: DomainUpdateOneWithoutTalentLevelUpMaterialsInput;
  talents?: TalentUpdateManyWithoutTalentLevelUpMaterialInput;
};

export type TalentLevelUpMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | TalentLevelUpMaterialGroup
    | EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput;
};

export type CraftingMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  recipes?: ConsumeableRecipeCreateManyWithoutCraftingMaterialsInput;
};

export type CraftingMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  recipes?: ConsumeableRecipeUpdateManyWithoutCraftingMaterialsInput;
};

export type CraftingMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CookingMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  processingRecipe?: ProcessRecipeCreateOneWithoutMaterialInput;
  recipes?: ConsumeableRecipeCreateManyWithoutCookingMaterialsInput;
};

export type CookingMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  processingRecipe?: ProcessRecipeUpdateOneWithoutMaterialInput;
  recipes?: ConsumeableRecipeUpdateManyWithoutCookingMaterialsInput;
};

export type CookingMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CommonMaterialCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
};

export type CommonMaterialUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CommonMaterialUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type DomainCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  levels?: InputJsonValue | null;
  type?: string | null;
  artifacts?: ArtifactCreateManyWithoutDomainInput;
  region?: RegionCreateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialCreateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialCreateManyWithoutDomainInput;
};

export type DomainUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  artifacts?: ArtifactUpdateManyWithoutDomainInput;
  region?: RegionUpdateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialUpdateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialUpdateManyWithoutDomainInput;
};

export type DomainUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type ConsumeableCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  effect?: string | null;
  image?: string | null;
  rarity: number;
  consumeableType: ConsumableType;
  foodType: FoodType;
  characterSpecialty?: CharacterProfileCreateOneWithoutSpecialtyDishInput;
  recipe?: ConsumeableRecipeCreateOneWithoutConsumeableInput;
};

export type ConsumeableUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  effect?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  consumeableType?:
    | ConsumableType
    | EnumConsumableTypeFieldUpdateOperationsInput;
  foodType?: FoodType | EnumFoodTypeFieldUpdateOperationsInput;
  characterSpecialty?: CharacterProfileUpdateOneWithoutSpecialtyDishInput;
  recipe?: ConsumeableRecipeUpdateOneWithoutConsumeableInput;
};

export type ConsumeableUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  effect?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  consumeableType?:
    | ConsumableType
    | EnumConsumableTypeFieldUpdateOperationsInput;
  foodType?: FoodType | EnumFoodTypeFieldUpdateOperationsInput;
};

export type ConsumeableRecipeCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableCreateOneWithoutRecipeInput;
  craftingMaterials?: CraftingMaterialCreateManyWithoutRecipesInput;
  cookingMaterials?: CookingMaterialCreateManyWithoutRecipesInput;
};

export type ConsumeableRecipeUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableUpdateOneWithoutRecipeInput;
  craftingMaterials?: CraftingMaterialUpdateManyWithoutRecipesInput;
  cookingMaterials?: CookingMaterialUpdateManyWithoutRecipesInput;
};

export type ConsumeableRecipeUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type ProcessRecipeCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  processingTime?: number | null;
  recipe?: InputJsonValue | null;
  material?: CookingMaterialCreateOneWithoutProcessingRecipeInput;
};

export type ProcessRecipeUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  processingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
  material?: CookingMaterialUpdateOneWithoutProcessingRecipeInput;
};

export type ProcessRecipeUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  processingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
};

export type ForgeRecipeCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  craftingTime?: number | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialCreateManyWithoutRecipeUseInput;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialCreateOneWithoutRecipeCreateInput;
  weapon?: WeaponCreateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  craftingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialUpdateManyWithoutRecipeUseInput;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialUpdateOneWithoutRecipeCreateInput;
  weapon?: WeaponUpdateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  craftingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
};

export type ArtifactSetCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  image?: string | null;
  maxRarity?: number | null;
  pieceBonusFour?: string | null;
  pieceBonusOne?: string | null;
  pieceBonusTwo?: string | null;
  artifacts?: ArtifactCreateManyWithoutSetInput;
};

export type ArtifactSetUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  maxRarity?: number | NullableIntFieldUpdateOperationsInput | null;
  pieceBonusFour?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusOne?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusTwo?: string | NullableStringFieldUpdateOperationsInput | null;
  artifacts?: ArtifactUpdateManyWithoutSetInput;
};

export type ArtifactSetUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  maxRarity?: number | NullableIntFieldUpdateOperationsInput | null;
  pieceBonusFour?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusOne?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusTwo?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type ArtifactCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  lore?: string | null;
  minRarity: number;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type: ArtifactType;
  set?: ArtifactSetCreateOneWithoutArtifactsInput;
  domain?: DomainCreateOneWithoutArtifactsInput;
};

export type ArtifactUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  minRarity?: number | IntFieldUpdateOperationsInput;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type?: ArtifactType | EnumArtifactTypeFieldUpdateOperationsInput;
  set?: ArtifactSetUpdateOneWithoutArtifactsInput;
  domain?: DomainUpdateOneWithoutArtifactsInput;
};

export type ArtifactUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  minRarity?: number | IntFieldUpdateOperationsInput;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type?: ArtifactType | EnumArtifactTypeFieldUpdateOperationsInput;
};

export type StringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: string | NestedStringFilter;
};

export type DateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date | string>;
  notIn?: Enumerable<Date | string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: Date | string | NestedDateTimeFilter;
};

export type JsonNullableFilter = {
  equals?: InputJsonValue | null;
  not?: InputJsonValue | null;
};

export type StringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: string | NestedStringNullableFilter | null;
};

export type IntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number | NestedIntFilter;
};

export type CharacterAscensionListRelationFilter = {
  every?: CharacterAscensionWhereInput;
  some?: CharacterAscensionWhereInput;
  none?: CharacterAscensionWhereInput;
};

export type ElementListRelationFilter = {
  every?: ElementWhereInput;
  some?: ElementWhereInput;
  none?: ElementWhereInput;
};

export type CharacterProfileRelationFilter = {
  is?: CharacterProfileWhereInput | null;
  isNot?: CharacterProfileWhereInput | null;
};

export type TalentListRelationFilter = {
  every?: TalentWhereInput;
  some?: TalentWhereInput;
  none?: TalentWhereInput;
};

export type EnumWeaponTypeNullableFilter = {
  equals?: WeaponType | null;
  in?: Enumerable<WeaponType> | null;
  notIn?: Enumerable<WeaponType> | null;
  not?: WeaponType | NestedEnumWeaponTypeNullableFilter | null;
};

export type CharacterRelationFilter = {
  is?: CharacterWhereInput | null;
  isNot?: CharacterWhereInput | null;
};

export type CharacterAscensionMaterialRelationFilter = {
  is?: CharacterAscensionMaterialWhereInput | null;
  isNot?: CharacterAscensionMaterialWhereInput | null;
};

export type CommonAscensionMaterialListRelationFilter = {
  every?: CommonAscensionMaterialWhereInput;
  some?: CommonAscensionMaterialWhereInput;
  none?: CommonAscensionMaterialWhereInput;
};

export type RegionRelationFilter = {
  is?: RegionWhereInput | null;
  isNot?: RegionWhereInput | null;
};

export type ConsumeableRelationFilter = {
  is?: ConsumeableWhereInput | null;
  isNot?: ConsumeableWhereInput | null;
};

export type ElementRelationFilter = {
  is?: ElementWhereInput | null;
  isNot?: ElementWhereInput | null;
};

export type TalentLevelUpMaterialRelationFilter = {
  is?: TalentLevelUpMaterialWhereInput | null;
  isNot?: TalentLevelUpMaterialWhereInput | null;
};

export type CharacterListRelationFilter = {
  every?: CharacterWhereInput;
  some?: CharacterWhereInput;
  none?: CharacterWhereInput;
};

export type CharacterProfileListRelationFilter = {
  every?: CharacterProfileWhereInput;
  some?: CharacterProfileWhereInput;
  none?: CharacterProfileWhereInput;
};

export type DomainListRelationFilter = {
  every?: DomainWhereInput;
  some?: DomainWhereInput;
  none?: DomainWhereInput;
};

export type IntNullableFilter = {
  equals?: number | null;
  in?: Enumerable<number> | null;
  notIn?: Enumerable<number> | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: number | NestedIntNullableFilter | null;
};

export type EnumWeaponSecondaryStatTypeNullableFilter = {
  equals?: WeaponSecondaryStatType | null;
  in?: Enumerable<WeaponSecondaryStatType> | null;
  notIn?: Enumerable<WeaponSecondaryStatType> | null;
  not?:
    | WeaponSecondaryStatType
    | NestedEnumWeaponSecondaryStatTypeNullableFilter
    | null;
};

export type EnumWeaponTypeFilter = {
  equals?: WeaponType;
  in?: Enumerable<WeaponType>;
  notIn?: Enumerable<WeaponType>;
  not?: WeaponType | NestedEnumWeaponTypeFilter;
};

export type WeaponAscensionListRelationFilter = {
  every?: WeaponAscensionWhereInput;
  some?: WeaponAscensionWhereInput;
  none?: WeaponAscensionWhereInput;
};

export type ForgeRecipeRelationFilter = {
  is?: ForgeRecipeWhereInput | null;
  isNot?: ForgeRecipeWhereInput | null;
};

export type WeaponAscensionMaterialRelationFilter = {
  is?: WeaponAscensionMaterialWhereInput | null;
  isNot?: WeaponAscensionMaterialWhereInput | null;
};

export type WeaponRelationFilter = {
  is?: WeaponWhereInput | null;
  isNot?: WeaponWhereInput | null;
};

export type EnumCommonAscensionMaterialGroupFilter = {
  equals?: CommonAscensionMaterialGroup;
  in?: Enumerable<CommonAscensionMaterialGroup>;
  notIn?: Enumerable<CommonAscensionMaterialGroup>;
  not?:
    | CommonAscensionMaterialGroup
    | NestedEnumCommonAscensionMaterialGroupFilter;
};

export type EnumWeaponAscensionMaterialGroupFilter = {
  equals?: WeaponAscensionMaterialGroup;
  in?: Enumerable<WeaponAscensionMaterialGroup>;
  notIn?: Enumerable<WeaponAscensionMaterialGroup>;
  not?:
    | WeaponAscensionMaterialGroup
    | NestedEnumWeaponAscensionMaterialGroupFilter;
};

export type DomainRelationFilter = {
  is?: DomainWhereInput | null;
  isNot?: DomainWhereInput | null;
};

export type EnumTalentLevelUpMaterialGroupFilter = {
  equals?: TalentLevelUpMaterialGroup;
  in?: Enumerable<TalentLevelUpMaterialGroup>;
  notIn?: Enumerable<TalentLevelUpMaterialGroup>;
  not?: TalentLevelUpMaterialGroup | NestedEnumTalentLevelUpMaterialGroupFilter;
};

export type ConsumeableRecipeListRelationFilter = {
  every?: ConsumeableRecipeWhereInput;
  some?: ConsumeableRecipeWhereInput;
  none?: ConsumeableRecipeWhereInput;
};

export type ProcessRecipeRelationFilter = {
  is?: ProcessRecipeWhereInput | null;
  isNot?: ProcessRecipeWhereInput | null;
};

export type ArtifactListRelationFilter = {
  every?: ArtifactWhereInput;
  some?: ArtifactWhereInput;
  none?: ArtifactWhereInput;
};

export type TalentLevelUpMaterialListRelationFilter = {
  every?: TalentLevelUpMaterialWhereInput;
  some?: TalentLevelUpMaterialWhereInput;
  none?: TalentLevelUpMaterialWhereInput;
};

export type WeaponAscensionMaterialListRelationFilter = {
  every?: WeaponAscensionMaterialWhereInput;
  some?: WeaponAscensionMaterialWhereInput;
  none?: WeaponAscensionMaterialWhereInput;
};

export type EnumConsumableTypeFilter = {
  equals?: ConsumableType;
  in?: Enumerable<ConsumableType>;
  notIn?: Enumerable<ConsumableType>;
  not?: ConsumableType | NestedEnumConsumableTypeFilter;
};

export type EnumFoodTypeFilter = {
  equals?: FoodType;
  in?: Enumerable<FoodType>;
  notIn?: Enumerable<FoodType>;
  not?: FoodType | NestedEnumFoodTypeFilter;
};

export type ConsumeableRecipeRelationFilter = {
  is?: ConsumeableRecipeWhereInput | null;
  isNot?: ConsumeableRecipeWhereInput | null;
};

export type CraftingMaterialListRelationFilter = {
  every?: CraftingMaterialWhereInput;
  some?: CraftingMaterialWhereInput;
  none?: CraftingMaterialWhereInput;
};

export type CookingMaterialListRelationFilter = {
  every?: CookingMaterialWhereInput;
  some?: CookingMaterialWhereInput;
  none?: CookingMaterialWhereInput;
};

export type CookingMaterialRelationFilter = {
  is?: CookingMaterialWhereInput | null;
  isNot?: CookingMaterialWhereInput | null;
};

export type WeaponEnhancementMaterialListRelationFilter = {
  every?: WeaponEnhancementMaterialWhereInput;
  some?: WeaponEnhancementMaterialWhereInput;
  none?: WeaponEnhancementMaterialWhereInput;
};

export type WeaponEnhancementMaterialRelationFilter = {
  is?: WeaponEnhancementMaterialWhereInput | null;
  isNot?: WeaponEnhancementMaterialWhereInput | null;
};

export type EnumArtifactTypeFilter = {
  equals?: ArtifactType;
  in?: Enumerable<ArtifactType>;
  notIn?: Enumerable<ArtifactType>;
  not?: ArtifactType | NestedEnumArtifactTypeFilter;
};

export type ArtifactSetRelationFilter = {
  is?: ArtifactSetWhereInput | null;
  isNot?: ArtifactSetWhereInput | null;
};

export type CharacterAscensionCreateManyWithoutCharacterInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCharacterInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
};

export type ElementCreateManyWithoutCharactersInput = {
  create?: Enumerable<ElementCreateWithoutCharactersInput>;
  connect?: Enumerable<ElementWhereUniqueInput>;
};

export type CharacterProfileCreateOneWithoutCharacterInput = {
  create?: CharacterProfileCreateWithoutCharacterInput;
  connect?: CharacterProfileWhereUniqueInput;
};

export type TalentCreateManyWithoutCharacterInput = {
  create?: Enumerable<TalentCreateWithoutCharacterInput>;
  connect?: Enumerable<TalentWhereUniqueInput>;
};

export type StringFieldUpdateOperationsInput = {
  set?: string;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string;
};

export type NullableJsonFieldUpdateOperationsInput = {
  set?: InputJsonValue | null;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null;
};

export type IntFieldUpdateOperationsInput = {
  set?: number;
};

export type NullableEnumWeaponTypeFieldUpdateOperationsInput = {
  set?: WeaponType | null;
};

export type CharacterAscensionUpdateManyWithoutCharacterInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCharacterInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  set?: Enumerable<CharacterAscensionWhereUniqueInput>;
  disconnect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  delete?: Enumerable<CharacterAscensionWhereUniqueInput>;
  update?: Enumerable<CharacterAscensionUpdateWithWhereUniqueWithoutCharacterInput>;
  updateMany?: Enumerable<CharacterAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterAscensionScalarWhereInput>;
  upsert?: Enumerable<CharacterAscensionUpsertWithWhereUniqueWithoutCharacterInput>;
};

export type ElementUpdateManyWithoutCharactersInput = {
  create?: Enumerable<ElementCreateWithoutCharactersInput>;
  connect?: Enumerable<ElementWhereUniqueInput>;
  set?: Enumerable<ElementWhereUniqueInput>;
  disconnect?: Enumerable<ElementWhereUniqueInput>;
  delete?: Enumerable<ElementWhereUniqueInput>;
  update?: Enumerable<ElementUpdateWithWhereUniqueWithoutCharactersInput>;
  updateMany?: Enumerable<ElementUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<ElementScalarWhereInput>;
  upsert?: Enumerable<ElementUpsertWithWhereUniqueWithoutCharactersInput>;
};

export type CharacterProfileUpdateOneWithoutCharacterInput = {
  create?: CharacterProfileCreateWithoutCharacterInput;
  connect?: CharacterProfileWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: CharacterProfileUpdateWithoutCharacterDataInput;
  upsert?: CharacterProfileUpsertWithoutCharacterInput;
};

export type TalentUpdateManyWithoutCharacterInput = {
  create?: Enumerable<TalentCreateWithoutCharacterInput>;
  connect?: Enumerable<TalentWhereUniqueInput>;
  set?: Enumerable<TalentWhereUniqueInput>;
  disconnect?: Enumerable<TalentWhereUniqueInput>;
  delete?: Enumerable<TalentWhereUniqueInput>;
  update?: Enumerable<TalentUpdateWithWhereUniqueWithoutCharacterInput>;
  updateMany?: Enumerable<TalentUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<TalentScalarWhereInput>;
  upsert?: Enumerable<TalentUpsertWithWhereUniqueWithoutCharacterInput>;
};

export type CharacterCreateOneWithoutAscensionsInput = {
  create?: CharacterCreateWithoutAscensionsInput;
  connect?: CharacterWhereUniqueInput;
};

export type CharacterAscensionMaterialCreateOneWithoutCharacterAscensionsInput = {
  create?: CharacterAscensionMaterialCreateWithoutCharacterAscensionsInput;
  connect?: CharacterAscensionMaterialWhereUniqueInput;
};

export type CommonAscensionMaterialCreateManyWithoutCharacterAscensionsInput = {
  create?: Enumerable<CommonAscensionMaterialCreateWithoutCharacterAscensionsInput>;
  connect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
};

export type CharacterUpdateOneWithoutAscensionsInput = {
  create?: CharacterCreateWithoutAscensionsInput;
  connect?: CharacterWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: CharacterUpdateWithoutAscensionsDataInput;
  upsert?: CharacterUpsertWithoutAscensionsInput;
};

export type CharacterAscensionMaterialUpdateOneWithoutCharacterAscensionsInput = {
  create?: CharacterAscensionMaterialCreateWithoutCharacterAscensionsInput;
  connect?: CharacterAscensionMaterialWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: CharacterAscensionMaterialUpdateWithoutCharacterAscensionsDataInput;
  upsert?: CharacterAscensionMaterialUpsertWithoutCharacterAscensionsInput;
};

export type CommonAscensionMaterialUpdateManyWithoutCharacterAscensionsInput = {
  create?: Enumerable<CommonAscensionMaterialCreateWithoutCharacterAscensionsInput>;
  connect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  set?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  disconnect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  delete?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  update?: Enumerable<CommonAscensionMaterialUpdateWithWhereUniqueWithoutCharacterAscensionsInput>;
  updateMany?: Enumerable<CommonAscensionMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CommonAscensionMaterialScalarWhereInput>;
  upsert?: Enumerable<CommonAscensionMaterialUpsertWithWhereUniqueWithoutCharacterAscensionsInput>;
};

export type CharacterCreateOneWithoutProfileInput = {
  create?: CharacterCreateWithoutProfileInput;
  connect?: CharacterWhereUniqueInput;
};

export type RegionCreateOneWithoutCharacterProfileInput = {
  create?: RegionCreateWithoutCharacterProfileInput;
  connect?: RegionWhereUniqueInput;
};

export type ConsumeableCreateOneWithoutCharacterSpecialtyInput = {
  create?: ConsumeableCreateWithoutCharacterSpecialtyInput;
  connect?: ConsumeableWhereUniqueInput;
};

export type ElementCreateOneWithoutCharacterProfilesInput = {
  create?: ElementCreateWithoutCharacterProfilesInput;
  connect?: ElementWhereUniqueInput;
};

export type CharacterUpdateOneRequiredWithoutProfileInput = {
  create?: CharacterCreateWithoutProfileInput;
  connect?: CharacterWhereUniqueInput;
  update?: CharacterUpdateWithoutProfileDataInput;
  upsert?: CharacterUpsertWithoutProfileInput;
};

export type RegionUpdateOneWithoutCharacterProfileInput = {
  create?: RegionCreateWithoutCharacterProfileInput;
  connect?: RegionWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: RegionUpdateWithoutCharacterProfileDataInput;
  upsert?: RegionUpsertWithoutCharacterProfileInput;
};

export type ConsumeableUpdateOneWithoutCharacterSpecialtyInput = {
  create?: ConsumeableCreateWithoutCharacterSpecialtyInput;
  connect?: ConsumeableWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ConsumeableUpdateWithoutCharacterSpecialtyDataInput;
  upsert?: ConsumeableUpsertWithoutCharacterSpecialtyInput;
};

export type ElementUpdateOneWithoutCharacterProfilesInput = {
  create?: ElementCreateWithoutCharacterProfilesInput;
  connect?: ElementWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ElementUpdateWithoutCharacterProfilesDataInput;
  upsert?: ElementUpsertWithoutCharacterProfilesInput;
};

export type CharacterCreateOneWithoutTalentsInput = {
  create?: CharacterCreateWithoutTalentsInput;
  connect?: CharacterWhereUniqueInput;
};

export type TalentLevelUpMaterialCreateOneWithoutTalentsInput = {
  create?: TalentLevelUpMaterialCreateWithoutTalentsInput;
  connect?: TalentLevelUpMaterialWhereUniqueInput;
};

export type CharacterUpdateOneRequiredWithoutTalentsInput = {
  create?: CharacterCreateWithoutTalentsInput;
  connect?: CharacterWhereUniqueInput;
  update?: CharacterUpdateWithoutTalentsDataInput;
  upsert?: CharacterUpsertWithoutTalentsInput;
};

export type TalentLevelUpMaterialUpdateOneWithoutTalentsInput = {
  create?: TalentLevelUpMaterialCreateWithoutTalentsInput;
  connect?: TalentLevelUpMaterialWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: TalentLevelUpMaterialUpdateWithoutTalentsDataInput;
  upsert?: TalentLevelUpMaterialUpsertWithoutTalentsInput;
};

export type CharacterCreateManyWithoutElementsInput = {
  create?: Enumerable<CharacterCreateWithoutElementsInput>;
  connect?: Enumerable<CharacterWhereUniqueInput>;
};

export type CharacterProfileCreateManyWithoutVisionInput = {
  create?: Enumerable<CharacterProfileCreateWithoutVisionInput>;
  connect?: Enumerable<CharacterProfileWhereUniqueInput>;
};

export type RegionCreateOneWithoutElementInput = {
  create?: RegionCreateWithoutElementInput;
  connect?: RegionWhereUniqueInput;
};

export type CharacterUpdateManyWithoutElementsInput = {
  create?: Enumerable<CharacterCreateWithoutElementsInput>;
  connect?: Enumerable<CharacterWhereUniqueInput>;
  set?: Enumerable<CharacterWhereUniqueInput>;
  disconnect?: Enumerable<CharacterWhereUniqueInput>;
  delete?: Enumerable<CharacterWhereUniqueInput>;
  update?: Enumerable<CharacterUpdateWithWhereUniqueWithoutElementsInput>;
  updateMany?: Enumerable<CharacterUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterScalarWhereInput>;
  upsert?: Enumerable<CharacterUpsertWithWhereUniqueWithoutElementsInput>;
};

export type CharacterProfileUpdateManyWithoutVisionInput = {
  create?: Enumerable<CharacterProfileCreateWithoutVisionInput>;
  connect?: Enumerable<CharacterProfileWhereUniqueInput>;
  set?: Enumerable<CharacterProfileWhereUniqueInput>;
  disconnect?: Enumerable<CharacterProfileWhereUniqueInput>;
  delete?: Enumerable<CharacterProfileWhereUniqueInput>;
  update?: Enumerable<CharacterProfileUpdateWithWhereUniqueWithoutVisionInput>;
  updateMany?: Enumerable<CharacterProfileUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterProfileScalarWhereInput>;
  upsert?: Enumerable<CharacterProfileUpsertWithWhereUniqueWithoutVisionInput>;
};

export type RegionUpdateOneWithoutElementInput = {
  create?: RegionCreateWithoutElementInput;
  connect?: RegionWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: RegionUpdateWithoutElementDataInput;
  upsert?: RegionUpsertWithoutElementInput;
};

export type CharacterProfileCreateManyWithoutRegionInput = {
  create?: Enumerable<CharacterProfileCreateWithoutRegionInput>;
  connect?: Enumerable<CharacterProfileWhereUniqueInput>;
};

export type DomainCreateManyWithoutRegionInput = {
  create?: Enumerable<DomainCreateWithoutRegionInput>;
  connect?: Enumerable<DomainWhereUniqueInput>;
};

export type ElementCreateOneWithoutRegionInput = {
  create?: ElementCreateWithoutRegionInput;
  connect?: ElementWhereUniqueInput;
};

export type CharacterProfileUpdateManyWithoutRegionInput = {
  create?: Enumerable<CharacterProfileCreateWithoutRegionInput>;
  connect?: Enumerable<CharacterProfileWhereUniqueInput>;
  set?: Enumerable<CharacterProfileWhereUniqueInput>;
  disconnect?: Enumerable<CharacterProfileWhereUniqueInput>;
  delete?: Enumerable<CharacterProfileWhereUniqueInput>;
  update?: Enumerable<CharacterProfileUpdateWithWhereUniqueWithoutRegionInput>;
  updateMany?: Enumerable<CharacterProfileUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterProfileScalarWhereInput>;
  upsert?: Enumerable<CharacterProfileUpsertWithWhereUniqueWithoutRegionInput>;
};

export type DomainUpdateManyWithoutRegionInput = {
  create?: Enumerable<DomainCreateWithoutRegionInput>;
  connect?: Enumerable<DomainWhereUniqueInput>;
  set?: Enumerable<DomainWhereUniqueInput>;
  disconnect?: Enumerable<DomainWhereUniqueInput>;
  delete?: Enumerable<DomainWhereUniqueInput>;
  update?: Enumerable<DomainUpdateWithWhereUniqueWithoutRegionInput>;
  updateMany?: Enumerable<DomainUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<DomainScalarWhereInput>;
  upsert?: Enumerable<DomainUpsertWithWhereUniqueWithoutRegionInput>;
};

export type ElementUpdateOneWithoutRegionInput = {
  create?: ElementCreateWithoutRegionInput;
  connect?: ElementWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ElementUpdateWithoutRegionDataInput;
  upsert?: ElementUpsertWithoutRegionInput;
};

export type WeaponAscensionCreateManyWithoutWeaponInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutWeaponInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
};

export type ForgeRecipeCreateOneWithoutWeaponInput = {
  create?: ForgeRecipeCreateWithoutWeaponInput;
  connect?: ForgeRecipeWhereUniqueInput;
};

export type NullableIntFieldUpdateOperationsInput = {
  set?: number | null;
};

export type NullableEnumWeaponSecondaryStatTypeFieldUpdateOperationsInput = {
  set?: WeaponSecondaryStatType | null;
};

export type EnumWeaponTypeFieldUpdateOperationsInput = {
  set?: WeaponType;
};

export type WeaponAscensionUpdateManyWithoutWeaponInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutWeaponInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  set?: Enumerable<WeaponAscensionWhereUniqueInput>;
  disconnect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  delete?: Enumerable<WeaponAscensionWhereUniqueInput>;
  update?: Enumerable<WeaponAscensionUpdateWithWhereUniqueWithoutWeaponInput>;
  updateMany?: Enumerable<WeaponAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<WeaponAscensionScalarWhereInput>;
  upsert?: Enumerable<WeaponAscensionUpsertWithWhereUniqueWithoutWeaponInput>;
};

export type ForgeRecipeUpdateOneWithoutWeaponInput = {
  create?: ForgeRecipeCreateWithoutWeaponInput;
  connect?: ForgeRecipeWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ForgeRecipeUpdateWithoutWeaponDataInput;
  upsert?: ForgeRecipeUpsertWithoutWeaponInput;
};

export type CommonAscensionMaterialCreateManyWithoutWeaponAscensionsInput = {
  create?: Enumerable<CommonAscensionMaterialCreateWithoutWeaponAscensionsInput>;
  connect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
};

export type WeaponAscensionMaterialCreateOneWithoutWeaponAscensionsInput = {
  create?: WeaponAscensionMaterialCreateWithoutWeaponAscensionsInput;
  connect?: WeaponAscensionMaterialWhereUniqueInput;
};

export type WeaponCreateOneWithoutAscensionsInput = {
  create?: WeaponCreateWithoutAscensionsInput;
  connect?: WeaponWhereUniqueInput;
};

export type CommonAscensionMaterialUpdateManyWithoutWeaponAscensionsInput = {
  create?: Enumerable<CommonAscensionMaterialCreateWithoutWeaponAscensionsInput>;
  connect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  set?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  disconnect?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  delete?: Enumerable<CommonAscensionMaterialWhereUniqueInput>;
  update?: Enumerable<CommonAscensionMaterialUpdateWithWhereUniqueWithoutWeaponAscensionsInput>;
  updateMany?: Enumerable<CommonAscensionMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CommonAscensionMaterialScalarWhereInput>;
  upsert?: Enumerable<CommonAscensionMaterialUpsertWithWhereUniqueWithoutWeaponAscensionsInput>;
};

export type WeaponAscensionMaterialUpdateOneWithoutWeaponAscensionsInput = {
  create?: WeaponAscensionMaterialCreateWithoutWeaponAscensionsInput;
  connect?: WeaponAscensionMaterialWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: WeaponAscensionMaterialUpdateWithoutWeaponAscensionsDataInput;
  upsert?: WeaponAscensionMaterialUpsertWithoutWeaponAscensionsInput;
};

export type WeaponUpdateOneWithoutAscensionsInput = {
  create?: WeaponCreateWithoutAscensionsInput;
  connect?: WeaponWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: WeaponUpdateWithoutAscensionsDataInput;
  upsert?: WeaponUpsertWithoutAscensionsInput;
};

export type CharacterAscensionCreateManyWithoutCommonAscensionMaterialsInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCommonAscensionMaterialsInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
};

export type WeaponAscensionCreateManyWithoutCommonAscensionMaterialsInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutCommonAscensionMaterialsInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
};

export type EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput = {
  set?: CommonAscensionMaterialGroup;
};

export type CharacterAscensionUpdateManyWithoutCommonAscensionMaterialsInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCommonAscensionMaterialsInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  set?: Enumerable<CharacterAscensionWhereUniqueInput>;
  disconnect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  delete?: Enumerable<CharacterAscensionWhereUniqueInput>;
  update?: Enumerable<CharacterAscensionUpdateWithWhereUniqueWithoutCommonAscensionMaterialsInput>;
  updateMany?: Enumerable<CharacterAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterAscensionScalarWhereInput>;
  upsert?: Enumerable<CharacterAscensionUpsertWithWhereUniqueWithoutCommonAscensionMaterialsInput>;
};

export type WeaponAscensionUpdateManyWithoutCommonAscensionMaterialsInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutCommonAscensionMaterialsInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  set?: Enumerable<WeaponAscensionWhereUniqueInput>;
  disconnect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  delete?: Enumerable<WeaponAscensionWhereUniqueInput>;
  update?: Enumerable<WeaponAscensionUpdateWithWhereUniqueWithoutCommonAscensionMaterialsInput>;
  updateMany?: Enumerable<WeaponAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<WeaponAscensionScalarWhereInput>;
  upsert?: Enumerable<WeaponAscensionUpsertWithWhereUniqueWithoutCommonAscensionMaterialsInput>;
};

export type DomainCreateOneWithoutWeaponAscensionMaterialsInput = {
  create?: DomainCreateWithoutWeaponAscensionMaterialsInput;
  connect?: DomainWhereUniqueInput;
};

export type WeaponAscensionCreateManyWithoutWeaponAscensionMaterialInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutWeaponAscensionMaterialInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
};

export type EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput = {
  set?: WeaponAscensionMaterialGroup;
};

export type DomainUpdateOneWithoutWeaponAscensionMaterialsInput = {
  create?: DomainCreateWithoutWeaponAscensionMaterialsInput;
  connect?: DomainWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: DomainUpdateWithoutWeaponAscensionMaterialsDataInput;
  upsert?: DomainUpsertWithoutWeaponAscensionMaterialsInput;
};

export type WeaponAscensionUpdateManyWithoutWeaponAscensionMaterialInput = {
  create?: Enumerable<WeaponAscensionCreateWithoutWeaponAscensionMaterialInput>;
  connect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  set?: Enumerable<WeaponAscensionWhereUniqueInput>;
  disconnect?: Enumerable<WeaponAscensionWhereUniqueInput>;
  delete?: Enumerable<WeaponAscensionWhereUniqueInput>;
  update?: Enumerable<WeaponAscensionUpdateWithWhereUniqueWithoutWeaponAscensionMaterialInput>;
  updateMany?: Enumerable<WeaponAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<WeaponAscensionScalarWhereInput>;
  upsert?: Enumerable<WeaponAscensionUpsertWithWhereUniqueWithoutWeaponAscensionMaterialInput>;
};

export type ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialInput = {
  create?: ForgeRecipeCreateWithoutWeaponEnhancementMaterialInput;
  connect?: ForgeRecipeWhereUniqueInput;
};

export type ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialsInput = {
  create?: ForgeRecipeCreateWithoutWeaponEnhancementMaterialsInput;
  connect?: ForgeRecipeWhereUniqueInput;
};

export type ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialInput = {
  create?: ForgeRecipeCreateWithoutWeaponEnhancementMaterialInput;
  connect?: ForgeRecipeWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ForgeRecipeUpdateWithoutWeaponEnhancementMaterialDataInput;
  upsert?: ForgeRecipeUpsertWithoutWeaponEnhancementMaterialInput;
};

export type ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialsInput = {
  create?: ForgeRecipeCreateWithoutWeaponEnhancementMaterialsInput;
  connect?: ForgeRecipeWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ForgeRecipeUpdateWithoutWeaponEnhancementMaterialsDataInput;
  upsert?: ForgeRecipeUpsertWithoutWeaponEnhancementMaterialsInput;
};

export type CharacterAscensionCreateManyWithoutCharacterAscensionMaterialInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCharacterAscensionMaterialInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
};

export type CharacterAscensionUpdateManyWithoutCharacterAscensionMaterialInput = {
  create?: Enumerable<CharacterAscensionCreateWithoutCharacterAscensionMaterialInput>;
  connect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  set?: Enumerable<CharacterAscensionWhereUniqueInput>;
  disconnect?: Enumerable<CharacterAscensionWhereUniqueInput>;
  delete?: Enumerable<CharacterAscensionWhereUniqueInput>;
  update?: Enumerable<CharacterAscensionUpdateWithWhereUniqueWithoutCharacterAscensionMaterialInput>;
  updateMany?: Enumerable<CharacterAscensionUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CharacterAscensionScalarWhereInput>;
  upsert?: Enumerable<CharacterAscensionUpsertWithWhereUniqueWithoutCharacterAscensionMaterialInput>;
};

export type DomainCreateOneWithoutTalentLevelUpMaterialsInput = {
  create?: DomainCreateWithoutTalentLevelUpMaterialsInput;
  connect?: DomainWhereUniqueInput;
};

export type TalentCreateManyWithoutTalentLevelUpMaterialInput = {
  create?: Enumerable<TalentCreateWithoutTalentLevelUpMaterialInput>;
  connect?: Enumerable<TalentWhereUniqueInput>;
};

export type EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput = {
  set?: TalentLevelUpMaterialGroup;
};

export type DomainUpdateOneWithoutTalentLevelUpMaterialsInput = {
  create?: DomainCreateWithoutTalentLevelUpMaterialsInput;
  connect?: DomainWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: DomainUpdateWithoutTalentLevelUpMaterialsDataInput;
  upsert?: DomainUpsertWithoutTalentLevelUpMaterialsInput;
};

export type TalentUpdateManyWithoutTalentLevelUpMaterialInput = {
  create?: Enumerable<TalentCreateWithoutTalentLevelUpMaterialInput>;
  connect?: Enumerable<TalentWhereUniqueInput>;
  set?: Enumerable<TalentWhereUniqueInput>;
  disconnect?: Enumerable<TalentWhereUniqueInput>;
  delete?: Enumerable<TalentWhereUniqueInput>;
  update?: Enumerable<TalentUpdateWithWhereUniqueWithoutTalentLevelUpMaterialInput>;
  updateMany?: Enumerable<TalentUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<TalentScalarWhereInput>;
  upsert?: Enumerable<TalentUpsertWithWhereUniqueWithoutTalentLevelUpMaterialInput>;
};

export type ConsumeableRecipeCreateManyWithoutCraftingMaterialsInput = {
  create?: Enumerable<ConsumeableRecipeCreateWithoutCraftingMaterialsInput>;
  connect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
};

export type ConsumeableRecipeUpdateManyWithoutCraftingMaterialsInput = {
  create?: Enumerable<ConsumeableRecipeCreateWithoutCraftingMaterialsInput>;
  connect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  set?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  disconnect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  delete?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  update?: Enumerable<ConsumeableRecipeUpdateWithWhereUniqueWithoutCraftingMaterialsInput>;
  updateMany?: Enumerable<ConsumeableRecipeUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<ConsumeableRecipeScalarWhereInput>;
  upsert?: Enumerable<ConsumeableRecipeUpsertWithWhereUniqueWithoutCraftingMaterialsInput>;
};

export type ProcessRecipeCreateOneWithoutMaterialInput = {
  create?: ProcessRecipeCreateWithoutMaterialInput;
  connect?: ProcessRecipeWhereUniqueInput;
};

export type ConsumeableRecipeCreateManyWithoutCookingMaterialsInput = {
  create?: Enumerable<ConsumeableRecipeCreateWithoutCookingMaterialsInput>;
  connect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
};

export type ProcessRecipeUpdateOneWithoutMaterialInput = {
  create?: ProcessRecipeCreateWithoutMaterialInput;
  connect?: ProcessRecipeWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ProcessRecipeUpdateWithoutMaterialDataInput;
  upsert?: ProcessRecipeUpsertWithoutMaterialInput;
};

export type ConsumeableRecipeUpdateManyWithoutCookingMaterialsInput = {
  create?: Enumerable<ConsumeableRecipeCreateWithoutCookingMaterialsInput>;
  connect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  set?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  disconnect?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  delete?: Enumerable<ConsumeableRecipeWhereUniqueInput>;
  update?: Enumerable<ConsumeableRecipeUpdateWithWhereUniqueWithoutCookingMaterialsInput>;
  updateMany?: Enumerable<ConsumeableRecipeUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<ConsumeableRecipeScalarWhereInput>;
  upsert?: Enumerable<ConsumeableRecipeUpsertWithWhereUniqueWithoutCookingMaterialsInput>;
};

export type ArtifactCreateManyWithoutDomainInput = {
  create?: Enumerable<ArtifactCreateWithoutDomainInput>;
  connect?: Enumerable<ArtifactWhereUniqueInput>;
};

export type RegionCreateOneWithoutDomainsInput = {
  create?: RegionCreateWithoutDomainsInput;
  connect?: RegionWhereUniqueInput;
};

export type TalentLevelUpMaterialCreateManyWithoutDomainInput = {
  create?: Enumerable<TalentLevelUpMaterialCreateWithoutDomainInput>;
  connect?: Enumerable<TalentLevelUpMaterialWhereUniqueInput>;
};

export type WeaponAscensionMaterialCreateManyWithoutDomainInput = {
  create?: Enumerable<WeaponAscensionMaterialCreateWithoutDomainInput>;
  connect?: Enumerable<WeaponAscensionMaterialWhereUniqueInput>;
};

export type ArtifactUpdateManyWithoutDomainInput = {
  create?: Enumerable<ArtifactCreateWithoutDomainInput>;
  connect?: Enumerable<ArtifactWhereUniqueInput>;
  set?: Enumerable<ArtifactWhereUniqueInput>;
  disconnect?: Enumerable<ArtifactWhereUniqueInput>;
  delete?: Enumerable<ArtifactWhereUniqueInput>;
  update?: Enumerable<ArtifactUpdateWithWhereUniqueWithoutDomainInput>;
  updateMany?: Enumerable<ArtifactUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<ArtifactScalarWhereInput>;
  upsert?: Enumerable<ArtifactUpsertWithWhereUniqueWithoutDomainInput>;
};

export type RegionUpdateOneWithoutDomainsInput = {
  create?: RegionCreateWithoutDomainsInput;
  connect?: RegionWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: RegionUpdateWithoutDomainsDataInput;
  upsert?: RegionUpsertWithoutDomainsInput;
};

export type TalentLevelUpMaterialUpdateManyWithoutDomainInput = {
  create?: Enumerable<TalentLevelUpMaterialCreateWithoutDomainInput>;
  connect?: Enumerable<TalentLevelUpMaterialWhereUniqueInput>;
  set?: Enumerable<TalentLevelUpMaterialWhereUniqueInput>;
  disconnect?: Enumerable<TalentLevelUpMaterialWhereUniqueInput>;
  delete?: Enumerable<TalentLevelUpMaterialWhereUniqueInput>;
  update?: Enumerable<TalentLevelUpMaterialUpdateWithWhereUniqueWithoutDomainInput>;
  updateMany?: Enumerable<TalentLevelUpMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<TalentLevelUpMaterialScalarWhereInput>;
  upsert?: Enumerable<TalentLevelUpMaterialUpsertWithWhereUniqueWithoutDomainInput>;
};

export type WeaponAscensionMaterialUpdateManyWithoutDomainInput = {
  create?: Enumerable<WeaponAscensionMaterialCreateWithoutDomainInput>;
  connect?: Enumerable<WeaponAscensionMaterialWhereUniqueInput>;
  set?: Enumerable<WeaponAscensionMaterialWhereUniqueInput>;
  disconnect?: Enumerable<WeaponAscensionMaterialWhereUniqueInput>;
  delete?: Enumerable<WeaponAscensionMaterialWhereUniqueInput>;
  update?: Enumerable<WeaponAscensionMaterialUpdateWithWhereUniqueWithoutDomainInput>;
  updateMany?: Enumerable<WeaponAscensionMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<WeaponAscensionMaterialScalarWhereInput>;
  upsert?: Enumerable<WeaponAscensionMaterialUpsertWithWhereUniqueWithoutDomainInput>;
};

export type CharacterProfileCreateOneWithoutSpecialtyDishInput = {
  create?: CharacterProfileCreateWithoutSpecialtyDishInput;
  connect?: CharacterProfileWhereUniqueInput;
};

export type ConsumeableRecipeCreateOneWithoutConsumeableInput = {
  create?: ConsumeableRecipeCreateWithoutConsumeableInput;
  connect?: ConsumeableRecipeWhereUniqueInput;
};

export type EnumConsumableTypeFieldUpdateOperationsInput = {
  set?: ConsumableType;
};

export type EnumFoodTypeFieldUpdateOperationsInput = {
  set?: FoodType;
};

export type CharacterProfileUpdateOneWithoutSpecialtyDishInput = {
  create?: CharacterProfileCreateWithoutSpecialtyDishInput;
  connect?: CharacterProfileWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: CharacterProfileUpdateWithoutSpecialtyDishDataInput;
  upsert?: CharacterProfileUpsertWithoutSpecialtyDishInput;
};

export type ConsumeableRecipeUpdateOneWithoutConsumeableInput = {
  create?: ConsumeableRecipeCreateWithoutConsumeableInput;
  connect?: ConsumeableRecipeWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ConsumeableRecipeUpdateWithoutConsumeableDataInput;
  upsert?: ConsumeableRecipeUpsertWithoutConsumeableInput;
};

export type ConsumeableCreateOneWithoutRecipeInput = {
  create?: ConsumeableCreateWithoutRecipeInput;
  connect?: ConsumeableWhereUniqueInput;
};

export type CraftingMaterialCreateManyWithoutRecipesInput = {
  create?: Enumerable<CraftingMaterialCreateWithoutRecipesInput>;
  connect?: Enumerable<CraftingMaterialWhereUniqueInput>;
};

export type CookingMaterialCreateManyWithoutRecipesInput = {
  create?: Enumerable<CookingMaterialCreateWithoutRecipesInput>;
  connect?: Enumerable<CookingMaterialWhereUniqueInput>;
};

export type ConsumeableUpdateOneWithoutRecipeInput = {
  create?: ConsumeableCreateWithoutRecipeInput;
  connect?: ConsumeableWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ConsumeableUpdateWithoutRecipeDataInput;
  upsert?: ConsumeableUpsertWithoutRecipeInput;
};

export type CraftingMaterialUpdateManyWithoutRecipesInput = {
  create?: Enumerable<CraftingMaterialCreateWithoutRecipesInput>;
  connect?: Enumerable<CraftingMaterialWhereUniqueInput>;
  set?: Enumerable<CraftingMaterialWhereUniqueInput>;
  disconnect?: Enumerable<CraftingMaterialWhereUniqueInput>;
  delete?: Enumerable<CraftingMaterialWhereUniqueInput>;
  update?: Enumerable<CraftingMaterialUpdateWithWhereUniqueWithoutRecipesInput>;
  updateMany?: Enumerable<CraftingMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CraftingMaterialScalarWhereInput>;
  upsert?: Enumerable<CraftingMaterialUpsertWithWhereUniqueWithoutRecipesInput>;
};

export type CookingMaterialUpdateManyWithoutRecipesInput = {
  create?: Enumerable<CookingMaterialCreateWithoutRecipesInput>;
  connect?: Enumerable<CookingMaterialWhereUniqueInput>;
  set?: Enumerable<CookingMaterialWhereUniqueInput>;
  disconnect?: Enumerable<CookingMaterialWhereUniqueInput>;
  delete?: Enumerable<CookingMaterialWhereUniqueInput>;
  update?: Enumerable<CookingMaterialUpdateWithWhereUniqueWithoutRecipesInput>;
  updateMany?: Enumerable<CookingMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<CookingMaterialScalarWhereInput>;
  upsert?: Enumerable<CookingMaterialUpsertWithWhereUniqueWithoutRecipesInput>;
};

export type CookingMaterialCreateOneWithoutProcessingRecipeInput = {
  create?: CookingMaterialCreateWithoutProcessingRecipeInput;
  connect?: CookingMaterialWhereUniqueInput;
};

export type CookingMaterialUpdateOneWithoutProcessingRecipeInput = {
  create?: CookingMaterialCreateWithoutProcessingRecipeInput;
  connect?: CookingMaterialWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: CookingMaterialUpdateWithoutProcessingRecipeDataInput;
  upsert?: CookingMaterialUpsertWithoutProcessingRecipeInput;
};

export type WeaponEnhancementMaterialCreateManyWithoutRecipeUseInput = {
  create?: Enumerable<WeaponEnhancementMaterialCreateWithoutRecipeUseInput>;
  connect?: Enumerable<WeaponEnhancementMaterialWhereUniqueInput>;
};

export type WeaponEnhancementMaterialCreateOneWithoutRecipeCreateInput = {
  create?: WeaponEnhancementMaterialCreateWithoutRecipeCreateInput;
  connect?: WeaponEnhancementMaterialWhereUniqueInput;
};

export type WeaponCreateOneWithoutForgeRecipeInput = {
  create?: WeaponCreateWithoutForgeRecipeInput;
  connect?: WeaponWhereUniqueInput;
};

export type WeaponEnhancementMaterialUpdateManyWithoutRecipeUseInput = {
  create?: Enumerable<WeaponEnhancementMaterialCreateWithoutRecipeUseInput>;
  connect?: Enumerable<WeaponEnhancementMaterialWhereUniqueInput>;
  set?: Enumerable<WeaponEnhancementMaterialWhereUniqueInput>;
  disconnect?: Enumerable<WeaponEnhancementMaterialWhereUniqueInput>;
  delete?: Enumerable<WeaponEnhancementMaterialWhereUniqueInput>;
  update?: Enumerable<WeaponEnhancementMaterialUpdateWithWhereUniqueWithoutRecipeUseInput>;
  updateMany?: Enumerable<WeaponEnhancementMaterialUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<WeaponEnhancementMaterialScalarWhereInput>;
  upsert?: Enumerable<WeaponEnhancementMaterialUpsertWithWhereUniqueWithoutRecipeUseInput>;
};

export type WeaponEnhancementMaterialUpdateOneWithoutRecipeCreateInput = {
  create?: WeaponEnhancementMaterialCreateWithoutRecipeCreateInput;
  connect?: WeaponEnhancementMaterialWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: WeaponEnhancementMaterialUpdateWithoutRecipeCreateDataInput;
  upsert?: WeaponEnhancementMaterialUpsertWithoutRecipeCreateInput;
};

export type WeaponUpdateOneWithoutForgeRecipeInput = {
  create?: WeaponCreateWithoutForgeRecipeInput;
  connect?: WeaponWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: WeaponUpdateWithoutForgeRecipeDataInput;
  upsert?: WeaponUpsertWithoutForgeRecipeInput;
};

export type ArtifactCreateManyWithoutSetInput = {
  create?: Enumerable<ArtifactCreateWithoutSetInput>;
  connect?: Enumerable<ArtifactWhereUniqueInput>;
};

export type ArtifactUpdateManyWithoutSetInput = {
  create?: Enumerable<ArtifactCreateWithoutSetInput>;
  connect?: Enumerable<ArtifactWhereUniqueInput>;
  set?: Enumerable<ArtifactWhereUniqueInput>;
  disconnect?: Enumerable<ArtifactWhereUniqueInput>;
  delete?: Enumerable<ArtifactWhereUniqueInput>;
  update?: Enumerable<ArtifactUpdateWithWhereUniqueWithoutSetInput>;
  updateMany?: Enumerable<ArtifactUpdateManyWithWhereNestedInput> | null;
  deleteMany?: Enumerable<ArtifactScalarWhereInput>;
  upsert?: Enumerable<ArtifactUpsertWithWhereUniqueWithoutSetInput>;
};

export type ArtifactSetCreateOneWithoutArtifactsInput = {
  create?: ArtifactSetCreateWithoutArtifactsInput;
  connect?: ArtifactSetWhereUniqueInput;
};

export type DomainCreateOneWithoutArtifactsInput = {
  create?: DomainCreateWithoutArtifactsInput;
  connect?: DomainWhereUniqueInput;
};

export type EnumArtifactTypeFieldUpdateOperationsInput = {
  set?: ArtifactType;
};

export type ArtifactSetUpdateOneWithoutArtifactsInput = {
  create?: ArtifactSetCreateWithoutArtifactsInput;
  connect?: ArtifactSetWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: ArtifactSetUpdateWithoutArtifactsDataInput;
  upsert?: ArtifactSetUpsertWithoutArtifactsInput;
};

export type DomainUpdateOneWithoutArtifactsInput = {
  create?: DomainCreateWithoutArtifactsInput;
  connect?: DomainWhereUniqueInput;
  disconnect?: boolean;
  delete?: boolean;
  update?: DomainUpdateWithoutArtifactsDataInput;
  upsert?: DomainUpsertWithoutArtifactsInput;
};

export type NestedStringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter | null;
};

export type NestedDateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date | string>;
  notIn?: Enumerable<Date | string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: NestedDateTimeFilter | null;
};

export type NestedJsonNullableFilter = {
  equals?: InputJsonValue | null;
  not?: NestedJsonNullableFilter | null;
};

export type NestedStringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: NestedStringNullableFilter | null;
};

export type NestedIntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | null;
};

export type NestedEnumWeaponTypeNullableFilter = {
  equals?: WeaponType | null;
  in?: Enumerable<WeaponType> | null;
  notIn?: Enumerable<WeaponType> | null;
  not?: NestedEnumWeaponTypeNullableFilter | null;
};

export type NestedIntNullableFilter = {
  equals?: number | null;
  in?: Enumerable<number> | null;
  notIn?: Enumerable<number> | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: NestedIntNullableFilter | null;
};

export type NestedEnumWeaponSecondaryStatTypeNullableFilter = {
  equals?: WeaponSecondaryStatType | null;
  in?: Enumerable<WeaponSecondaryStatType> | null;
  notIn?: Enumerable<WeaponSecondaryStatType> | null;
  not?: NestedEnumWeaponSecondaryStatTypeNullableFilter | null;
};

export type NestedEnumWeaponTypeFilter = {
  equals?: WeaponType;
  in?: Enumerable<WeaponType>;
  notIn?: Enumerable<WeaponType>;
  not?: NestedEnumWeaponTypeFilter | null;
};

export type NestedEnumCommonAscensionMaterialGroupFilter = {
  equals?: CommonAscensionMaterialGroup;
  in?: Enumerable<CommonAscensionMaterialGroup>;
  notIn?: Enumerable<CommonAscensionMaterialGroup>;
  not?: NestedEnumCommonAscensionMaterialGroupFilter | null;
};

export type NestedEnumWeaponAscensionMaterialGroupFilter = {
  equals?: WeaponAscensionMaterialGroup;
  in?: Enumerable<WeaponAscensionMaterialGroup>;
  notIn?: Enumerable<WeaponAscensionMaterialGroup>;
  not?: NestedEnumWeaponAscensionMaterialGroupFilter | null;
};

export type NestedEnumTalentLevelUpMaterialGroupFilter = {
  equals?: TalentLevelUpMaterialGroup;
  in?: Enumerable<TalentLevelUpMaterialGroup>;
  notIn?: Enumerable<TalentLevelUpMaterialGroup>;
  not?: NestedEnumTalentLevelUpMaterialGroupFilter | null;
};

export type NestedEnumConsumableTypeFilter = {
  equals?: ConsumableType;
  in?: Enumerable<ConsumableType>;
  notIn?: Enumerable<ConsumableType>;
  not?: NestedEnumConsumableTypeFilter | null;
};

export type NestedEnumFoodTypeFilter = {
  equals?: FoodType;
  in?: Enumerable<FoodType>;
  notIn?: Enumerable<FoodType>;
  not?: NestedEnumFoodTypeFilter | null;
};

export type NestedEnumArtifactTypeFilter = {
  equals?: ArtifactType;
  in?: Enumerable<ArtifactType>;
  notIn?: Enumerable<ArtifactType>;
  not?: NestedEnumArtifactTypeFilter | null;
};

export type CharacterAscensionCreateWithoutCharacterInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  characterAscensionMaterial?: CharacterAscensionMaterialCreateOneWithoutCharacterAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutCharacterAscensionsInput;
};

export type ElementCreateWithoutCharactersInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  archon?: string | null;
  statusEffect?: string | null;
  theme?: string | null;
  characterProfiles?: CharacterProfileCreateManyWithoutVisionInput;
  region?: RegionCreateOneWithoutElementInput;
};

export type CharacterProfileCreateWithoutCharacterInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  affiliation?: string | null;
  birthday?: string | null;
  constellation?: string | null;
  overview?: string | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  region?: RegionCreateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableCreateOneWithoutCharacterSpecialtyInput;
  vision?: ElementCreateOneWithoutCharacterProfilesInput;
};

export type TalentCreateWithoutCharacterInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | null;
  type?: string | null;
  talentLevelUpMaterial?: TalentLevelUpMaterialCreateOneWithoutTalentsInput;
};

export type CharacterAscensionUpdateWithWhereUniqueWithoutCharacterInput = {
  where: CharacterAscensionWhereUniqueInput;
  data: CharacterAscensionUpdateWithoutCharacterDataInput;
};

export type CharacterAscensionUpdateManyWithWhereNestedInput = {
  where: CharacterAscensionScalarWhereInput;
  data: CharacterAscensionUpdateManyDataInput;
};

export type CharacterAscensionScalarWhereInput = {
  AND?: Enumerable<CharacterAscensionScalarWhereInput>;
  OR?: Array<CharacterAscensionScalarWhereInput>;
  NOT?: Enumerable<CharacterAscensionScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  level?: number | IntFilter;
  maxLevel?: number | IntFilter;
  recipe?: JsonNullableFilter | null;
  characterId?: string | StringNullableFilter | null;
  characterAscensionMaterialId?: string | StringNullableFilter | null;
};

export type CharacterAscensionUpsertWithWhereUniqueWithoutCharacterInput = {
  where: CharacterAscensionWhereUniqueInput;
  update: CharacterAscensionUpdateWithoutCharacterDataInput;
  create: CharacterAscensionCreateWithoutCharacterInput;
};

export type ElementUpdateWithWhereUniqueWithoutCharactersInput = {
  where: ElementWhereUniqueInput;
  data: ElementUpdateWithoutCharactersDataInput;
};

export type ElementUpdateManyWithWhereNestedInput = {
  where: ElementScalarWhereInput;
  data: ElementUpdateManyDataInput;
};

export type ElementScalarWhereInput = {
  AND?: Enumerable<ElementScalarWhereInput>;
  OR?: Array<ElementScalarWhereInput>;
  NOT?: Enumerable<ElementScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  archon?: string | StringNullableFilter | null;
  statusEffect?: string | StringNullableFilter | null;
  theme?: string | StringNullableFilter | null;
  regionId?: string | StringNullableFilter | null;
};

export type ElementUpsertWithWhereUniqueWithoutCharactersInput = {
  where: ElementWhereUniqueInput;
  update: ElementUpdateWithoutCharactersDataInput;
  create: ElementCreateWithoutCharactersInput;
};

export type CharacterProfileUpdateWithoutCharacterDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  region?: RegionUpdateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableUpdateOneWithoutCharacterSpecialtyInput;
  vision?: ElementUpdateOneWithoutCharacterProfilesInput;
};

export type CharacterProfileUpsertWithoutCharacterInput = {
  update: CharacterProfileUpdateWithoutCharacterDataInput;
  create: CharacterProfileCreateWithoutCharacterInput;
};

export type TalentUpdateWithWhereUniqueWithoutCharacterInput = {
  where: TalentWhereUniqueInput;
  data: TalentUpdateWithoutCharacterDataInput;
};

export type TalentUpdateManyWithWhereNestedInput = {
  where: TalentScalarWhereInput;
  data: TalentUpdateManyDataInput;
};

export type TalentScalarWhereInput = {
  AND?: Enumerable<TalentScalarWhereInput>;
  OR?: Array<TalentScalarWhereInput>;
  NOT?: Enumerable<TalentScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  description?: JsonNullableFilter | null;
  details?: JsonNullableFilter | null;
  name?: string | StringNullableFilter | null;
  type?: string | StringNullableFilter | null;
  characterId?: string | StringFilter;
  talentLevelUpMaterialId?: string | StringNullableFilter | null;
};

export type TalentUpsertWithWhereUniqueWithoutCharacterInput = {
  where: TalentWhereUniqueInput;
  update: TalentUpdateWithoutCharacterDataInput;
  create: TalentCreateWithoutCharacterInput;
};

export type CharacterCreateWithoutAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  constellations?: InputJsonValue | null;
  overview?: string | null;
  rarity: number;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | null;
  elements?: ElementCreateManyWithoutCharactersInput;
  profile?: CharacterProfileCreateOneWithoutCharacterInput;
  talents?: TalentCreateManyWithoutCharacterInput;
};

export type CharacterAscensionMaterialCreateWithoutCharacterAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  group: WeaponAscensionMaterialGroup;
};

export type CommonAscensionMaterialCreateWithoutCharacterAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: CommonAscensionMaterialGroup;
  weaponAscensions?: WeaponAscensionCreateManyWithoutCommonAscensionMaterialsInput;
};

export type CharacterUpdateWithoutAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
  elements?: ElementUpdateManyWithoutCharactersInput;
  profile?: CharacterProfileUpdateOneWithoutCharacterInput;
  talents?: TalentUpdateManyWithoutCharacterInput;
};

export type CharacterUpsertWithoutAscensionsInput = {
  update: CharacterUpdateWithoutAscensionsDataInput;
  create: CharacterCreateWithoutAscensionsInput;
};

export type CharacterAscensionMaterialUpdateWithoutCharacterAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type CharacterAscensionMaterialUpsertWithoutCharacterAscensionsInput = {
  update: CharacterAscensionMaterialUpdateWithoutCharacterAscensionsDataInput;
  create: CharacterAscensionMaterialCreateWithoutCharacterAscensionsInput;
};

export type CommonAscensionMaterialUpdateWithWhereUniqueWithoutCharacterAscensionsInput = {
  where: CommonAscensionMaterialWhereUniqueInput;
  data: CommonAscensionMaterialUpdateWithoutCharacterAscensionsDataInput;
};

export type CommonAscensionMaterialUpdateManyWithWhereNestedInput = {
  where: CommonAscensionMaterialScalarWhereInput;
  data: CommonAscensionMaterialUpdateManyDataInput;
};

export type CommonAscensionMaterialScalarWhereInput = {
  AND?: Enumerable<CommonAscensionMaterialScalarWhereInput>;
  OR?: Array<CommonAscensionMaterialScalarWhereInput>;
  NOT?: Enumerable<CommonAscensionMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: CommonAscensionMaterialGroup | EnumCommonAscensionMaterialGroupFilter;
};

export type CommonAscensionMaterialUpsertWithWhereUniqueWithoutCharacterAscensionsInput = {
  where: CommonAscensionMaterialWhereUniqueInput;
  update: CommonAscensionMaterialUpdateWithoutCharacterAscensionsDataInput;
  create: CommonAscensionMaterialCreateWithoutCharacterAscensionsInput;
};

export type CharacterCreateWithoutProfileInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  constellations?: InputJsonValue | null;
  overview?: string | null;
  rarity: number;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | null;
  ascensions?: CharacterAscensionCreateManyWithoutCharacterInput;
  elements?: ElementCreateManyWithoutCharactersInput;
  talents?: TalentCreateManyWithoutCharacterInput;
};

export type RegionCreateWithoutCharacterProfileInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  domains?: DomainCreateManyWithoutRegionInput;
  element?: ElementCreateOneWithoutRegionInput;
};

export type ConsumeableCreateWithoutCharacterSpecialtyInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  effect?: string | null;
  image?: string | null;
  rarity: number;
  consumeableType: ConsumableType;
  foodType: FoodType;
  recipe?: ConsumeableRecipeCreateOneWithoutConsumeableInput;
};

export type ElementCreateWithoutCharacterProfilesInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  archon?: string | null;
  statusEffect?: string | null;
  theme?: string | null;
  characters?: CharacterCreateManyWithoutElementsInput;
  region?: RegionCreateOneWithoutElementInput;
};

export type CharacterUpdateWithoutProfileDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
  ascensions?: CharacterAscensionUpdateManyWithoutCharacterInput;
  elements?: ElementUpdateManyWithoutCharactersInput;
  talents?: TalentUpdateManyWithoutCharacterInput;
};

export type CharacterUpsertWithoutProfileInput = {
  update: CharacterUpdateWithoutProfileDataInput;
  create: CharacterCreateWithoutProfileInput;
};

export type RegionUpdateWithoutCharacterProfileDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  domains?: DomainUpdateManyWithoutRegionInput;
  element?: ElementUpdateOneWithoutRegionInput;
};

export type RegionUpsertWithoutCharacterProfileInput = {
  update: RegionUpdateWithoutCharacterProfileDataInput;
  create: RegionCreateWithoutCharacterProfileInput;
};

export type ConsumeableUpdateWithoutCharacterSpecialtyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  effect?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  consumeableType?:
    | ConsumableType
    | EnumConsumableTypeFieldUpdateOperationsInput;
  foodType?: FoodType | EnumFoodTypeFieldUpdateOperationsInput;
  recipe?: ConsumeableRecipeUpdateOneWithoutConsumeableInput;
};

export type ConsumeableUpsertWithoutCharacterSpecialtyInput = {
  update: ConsumeableUpdateWithoutCharacterSpecialtyDataInput;
  create: ConsumeableCreateWithoutCharacterSpecialtyInput;
};

export type ElementUpdateWithoutCharacterProfilesDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
  characters?: CharacterUpdateManyWithoutElementsInput;
  region?: RegionUpdateOneWithoutElementInput;
};

export type ElementUpsertWithoutCharacterProfilesInput = {
  update: ElementUpdateWithoutCharacterProfilesDataInput;
  create: ElementCreateWithoutCharacterProfilesInput;
};

export type CharacterCreateWithoutTalentsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  constellations?: InputJsonValue | null;
  overview?: string | null;
  rarity: number;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | null;
  ascensions?: CharacterAscensionCreateManyWithoutCharacterInput;
  elements?: ElementCreateManyWithoutCharactersInput;
  profile?: CharacterProfileCreateOneWithoutCharacterInput;
};

export type TalentLevelUpMaterialCreateWithoutTalentsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: TalentLevelUpMaterialGroup;
  domain?: DomainCreateOneWithoutTalentLevelUpMaterialsInput;
};

export type CharacterUpdateWithoutTalentsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
  ascensions?: CharacterAscensionUpdateManyWithoutCharacterInput;
  elements?: ElementUpdateManyWithoutCharactersInput;
  profile?: CharacterProfileUpdateOneWithoutCharacterInput;
};

export type CharacterUpsertWithoutTalentsInput = {
  update: CharacterUpdateWithoutTalentsDataInput;
  create: CharacterCreateWithoutTalentsInput;
};

export type TalentLevelUpMaterialUpdateWithoutTalentsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | TalentLevelUpMaterialGroup
    | EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput;
  domain?: DomainUpdateOneWithoutTalentLevelUpMaterialsInput;
};

export type TalentLevelUpMaterialUpsertWithoutTalentsInput = {
  update: TalentLevelUpMaterialUpdateWithoutTalentsDataInput;
  create: TalentLevelUpMaterialCreateWithoutTalentsInput;
};

export type CharacterCreateWithoutElementsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  constellations?: InputJsonValue | null;
  overview?: string | null;
  rarity: number;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | null;
  ascensions?: CharacterAscensionCreateManyWithoutCharacterInput;
  profile?: CharacterProfileCreateOneWithoutCharacterInput;
  talents?: TalentCreateManyWithoutCharacterInput;
};

export type CharacterProfileCreateWithoutVisionInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  affiliation?: string | null;
  birthday?: string | null;
  constellation?: string | null;
  overview?: string | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character: CharacterCreateOneWithoutProfileInput;
  region?: RegionCreateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableCreateOneWithoutCharacterSpecialtyInput;
};

export type RegionCreateWithoutElementInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  characterProfile?: CharacterProfileCreateManyWithoutRegionInput;
  domains?: DomainCreateManyWithoutRegionInput;
};

export type CharacterUpdateWithWhereUniqueWithoutElementsInput = {
  where: CharacterWhereUniqueInput;
  data: CharacterUpdateWithoutElementsDataInput;
};

export type CharacterUpdateManyWithWhereNestedInput = {
  where: CharacterScalarWhereInput;
  data: CharacterUpdateManyDataInput;
};

export type CharacterScalarWhereInput = {
  AND?: Enumerable<CharacterScalarWhereInput>;
  OR?: Array<CharacterScalarWhereInput>;
  NOT?: Enumerable<CharacterScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  constellations?: JsonNullableFilter | null;
  overview?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  stats?: JsonNullableFilter | null;
  weapon?: WeaponType | EnumWeaponTypeNullableFilter | null;
};

export type CharacterUpsertWithWhereUniqueWithoutElementsInput = {
  where: CharacterWhereUniqueInput;
  update: CharacterUpdateWithoutElementsDataInput;
  create: CharacterCreateWithoutElementsInput;
};

export type CharacterProfileUpdateWithWhereUniqueWithoutVisionInput = {
  where: CharacterProfileWhereUniqueInput;
  data: CharacterProfileUpdateWithoutVisionDataInput;
};

export type CharacterProfileUpdateManyWithWhereNestedInput = {
  where: CharacterProfileScalarWhereInput;
  data: CharacterProfileUpdateManyDataInput;
};

export type CharacterProfileScalarWhereInput = {
  AND?: Enumerable<CharacterProfileScalarWhereInput>;
  OR?: Array<CharacterProfileScalarWhereInput>;
  NOT?: Enumerable<CharacterProfileScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  affiliation?: string | StringNullableFilter | null;
  birthday?: string | StringNullableFilter | null;
  constellation?: string | StringNullableFilter | null;
  overview?: string | StringNullableFilter | null;
  story?: JsonNullableFilter | null;
  voiceActor?: JsonNullableFilter | null;
  voiceLines?: JsonNullableFilter | null;
  characterId?: string | StringFilter;
  regionId?: string | StringNullableFilter | null;
  elementId?: string | StringNullableFilter | null;
};

export type CharacterProfileUpsertWithWhereUniqueWithoutVisionInput = {
  where: CharacterProfileWhereUniqueInput;
  update: CharacterProfileUpdateWithoutVisionDataInput;
  create: CharacterProfileCreateWithoutVisionInput;
};

export type RegionUpdateWithoutElementDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  characterProfile?: CharacterProfileUpdateManyWithoutRegionInput;
  domains?: DomainUpdateManyWithoutRegionInput;
};

export type RegionUpsertWithoutElementInput = {
  update: RegionUpdateWithoutElementDataInput;
  create: RegionCreateWithoutElementInput;
};

export type CharacterProfileCreateWithoutRegionInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  affiliation?: string | null;
  birthday?: string | null;
  constellation?: string | null;
  overview?: string | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character: CharacterCreateOneWithoutProfileInput;
  specialtyDish?: ConsumeableCreateOneWithoutCharacterSpecialtyInput;
  vision?: ElementCreateOneWithoutCharacterProfilesInput;
};

export type DomainCreateWithoutRegionInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  levels?: InputJsonValue | null;
  type?: string | null;
  artifacts?: ArtifactCreateManyWithoutDomainInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialCreateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialCreateManyWithoutDomainInput;
};

export type ElementCreateWithoutRegionInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  archon?: string | null;
  statusEffect?: string | null;
  theme?: string | null;
  characters?: CharacterCreateManyWithoutElementsInput;
  characterProfiles?: CharacterProfileCreateManyWithoutVisionInput;
};

export type CharacterProfileUpdateWithWhereUniqueWithoutRegionInput = {
  where: CharacterProfileWhereUniqueInput;
  data: CharacterProfileUpdateWithoutRegionDataInput;
};

export type CharacterProfileUpsertWithWhereUniqueWithoutRegionInput = {
  where: CharacterProfileWhereUniqueInput;
  update: CharacterProfileUpdateWithoutRegionDataInput;
  create: CharacterProfileCreateWithoutRegionInput;
};

export type DomainUpdateWithWhereUniqueWithoutRegionInput = {
  where: DomainWhereUniqueInput;
  data: DomainUpdateWithoutRegionDataInput;
};

export type DomainUpdateManyWithWhereNestedInput = {
  where: DomainScalarWhereInput;
  data: DomainUpdateManyDataInput;
};

export type DomainScalarWhereInput = {
  AND?: Enumerable<DomainScalarWhereInput>;
  OR?: Array<DomainScalarWhereInput>;
  NOT?: Enumerable<DomainScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  levels?: JsonNullableFilter | null;
  type?: string | StringNullableFilter | null;
  regionId?: string | StringNullableFilter | null;
};

export type DomainUpsertWithWhereUniqueWithoutRegionInput = {
  where: DomainWhereUniqueInput;
  update: DomainUpdateWithoutRegionDataInput;
  create: DomainCreateWithoutRegionInput;
};

export type ElementUpdateWithoutRegionDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
  characters?: CharacterUpdateManyWithoutElementsInput;
  characterProfiles?: CharacterProfileUpdateManyWithoutVisionInput;
};

export type ElementUpsertWithoutRegionInput = {
  update: ElementUpdateWithoutRegionDataInput;
  create: ElementCreateWithoutRegionInput;
};

export type WeaponAscensionCreateWithoutWeaponInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutWeaponAscensionsInput;
  weaponAscensionMaterial?: WeaponAscensionMaterialCreateOneWithoutWeaponAscensionsInput;
};

export type ForgeRecipeCreateWithoutWeaponInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  craftingTime?: number | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialCreateManyWithoutRecipeUseInput;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialCreateOneWithoutRecipeCreateInput;
};

export type WeaponAscensionUpdateWithWhereUniqueWithoutWeaponInput = {
  where: WeaponAscensionWhereUniqueInput;
  data: WeaponAscensionUpdateWithoutWeaponDataInput;
};

export type WeaponAscensionUpdateManyWithWhereNestedInput = {
  where: WeaponAscensionScalarWhereInput;
  data: WeaponAscensionUpdateManyDataInput;
};

export type WeaponAscensionScalarWhereInput = {
  AND?: Enumerable<WeaponAscensionScalarWhereInput>;
  OR?: Array<WeaponAscensionScalarWhereInput>;
  NOT?: Enumerable<WeaponAscensionScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  level?: number | IntFilter;
  maxLevel?: number | IntFilter;
  recipe?: JsonNullableFilter | null;
  weaponAscensionMaterialId?: string | StringNullableFilter | null;
  weaponId?: string | StringNullableFilter | null;
};

export type WeaponAscensionUpsertWithWhereUniqueWithoutWeaponInput = {
  where: WeaponAscensionWhereUniqueInput;
  update: WeaponAscensionUpdateWithoutWeaponDataInput;
  create: WeaponAscensionCreateWithoutWeaponInput;
};

export type ForgeRecipeUpdateWithoutWeaponDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  craftingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialUpdateManyWithoutRecipeUseInput;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialUpdateOneWithoutRecipeCreateInput;
};

export type ForgeRecipeUpsertWithoutWeaponInput = {
  update: ForgeRecipeUpdateWithoutWeaponDataInput;
  create: ForgeRecipeCreateWithoutWeaponInput;
};

export type CommonAscensionMaterialCreateWithoutWeaponAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: CommonAscensionMaterialGroup;
  characterAscensions?: CharacterAscensionCreateManyWithoutCommonAscensionMaterialsInput;
};

export type WeaponAscensionMaterialCreateWithoutWeaponAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: WeaponAscensionMaterialGroup;
  domain?: DomainCreateOneWithoutWeaponAscensionMaterialsInput;
};

export type WeaponCreateWithoutAscensionsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  baseStats?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  lore?: string | null;
  passive?: InputJsonValue | null;
  rarity?: number | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?: WeaponSecondaryStatType | null;
  type: WeaponType;
  forgeRecipe?: ForgeRecipeCreateOneWithoutWeaponInput;
};

export type CommonAscensionMaterialUpdateWithWhereUniqueWithoutWeaponAscensionsInput = {
  where: CommonAscensionMaterialWhereUniqueInput;
  data: CommonAscensionMaterialUpdateWithoutWeaponAscensionsDataInput;
};

export type CommonAscensionMaterialUpsertWithWhereUniqueWithoutWeaponAscensionsInput = {
  where: CommonAscensionMaterialWhereUniqueInput;
  update: CommonAscensionMaterialUpdateWithoutWeaponAscensionsDataInput;
  create: CommonAscensionMaterialCreateWithoutWeaponAscensionsInput;
};

export type WeaponAscensionMaterialUpdateWithoutWeaponAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
  domain?: DomainUpdateOneWithoutWeaponAscensionMaterialsInput;
};

export type WeaponAscensionMaterialUpsertWithoutWeaponAscensionsInput = {
  update: WeaponAscensionMaterialUpdateWithoutWeaponAscensionsDataInput;
  create: WeaponAscensionMaterialCreateWithoutWeaponAscensionsInput;
};

export type WeaponUpdateWithoutAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  baseStats?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  passive?: InputJsonValue | null;
  rarity?: number | NullableIntFieldUpdateOperationsInput | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?:
    | WeaponSecondaryStatType
    | NullableEnumWeaponSecondaryStatTypeFieldUpdateOperationsInput
    | null;
  type?: WeaponType | EnumWeaponTypeFieldUpdateOperationsInput;
  forgeRecipe?: ForgeRecipeUpdateOneWithoutWeaponInput;
};

export type WeaponUpsertWithoutAscensionsInput = {
  update: WeaponUpdateWithoutAscensionsDataInput;
  create: WeaponCreateWithoutAscensionsInput;
};

export type CharacterAscensionCreateWithoutCommonAscensionMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  character?: CharacterCreateOneWithoutAscensionsInput;
  characterAscensionMaterial?: CharacterAscensionMaterialCreateOneWithoutCharacterAscensionsInput;
};

export type WeaponAscensionCreateWithoutCommonAscensionMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  weaponAscensionMaterial?: WeaponAscensionMaterialCreateOneWithoutWeaponAscensionsInput;
  weapon?: WeaponCreateOneWithoutAscensionsInput;
};

export type CharacterAscensionUpdateWithWhereUniqueWithoutCommonAscensionMaterialsInput = {
  where: CharacterAscensionWhereUniqueInput;
  data: CharacterAscensionUpdateWithoutCommonAscensionMaterialsDataInput;
};

export type CharacterAscensionUpsertWithWhereUniqueWithoutCommonAscensionMaterialsInput = {
  where: CharacterAscensionWhereUniqueInput;
  update: CharacterAscensionUpdateWithoutCommonAscensionMaterialsDataInput;
  create: CharacterAscensionCreateWithoutCommonAscensionMaterialsInput;
};

export type WeaponAscensionUpdateWithWhereUniqueWithoutCommonAscensionMaterialsInput = {
  where: WeaponAscensionWhereUniqueInput;
  data: WeaponAscensionUpdateWithoutCommonAscensionMaterialsDataInput;
};

export type WeaponAscensionUpsertWithWhereUniqueWithoutCommonAscensionMaterialsInput = {
  where: WeaponAscensionWhereUniqueInput;
  update: WeaponAscensionUpdateWithoutCommonAscensionMaterialsDataInput;
  create: WeaponAscensionCreateWithoutCommonAscensionMaterialsInput;
};

export type DomainCreateWithoutWeaponAscensionMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  levels?: InputJsonValue | null;
  type?: string | null;
  artifacts?: ArtifactCreateManyWithoutDomainInput;
  region?: RegionCreateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialCreateManyWithoutDomainInput;
};

export type WeaponAscensionCreateWithoutWeaponAscensionMaterialInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutWeaponAscensionsInput;
  weapon?: WeaponCreateOneWithoutAscensionsInput;
};

export type DomainUpdateWithoutWeaponAscensionMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  artifacts?: ArtifactUpdateManyWithoutDomainInput;
  region?: RegionUpdateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialUpdateManyWithoutDomainInput;
};

export type DomainUpsertWithoutWeaponAscensionMaterialsInput = {
  update: DomainUpdateWithoutWeaponAscensionMaterialsDataInput;
  create: DomainCreateWithoutWeaponAscensionMaterialsInput;
};

export type WeaponAscensionUpdateWithWhereUniqueWithoutWeaponAscensionMaterialInput = {
  where: WeaponAscensionWhereUniqueInput;
  data: WeaponAscensionUpdateWithoutWeaponAscensionMaterialDataInput;
};

export type WeaponAscensionUpsertWithWhereUniqueWithoutWeaponAscensionMaterialInput = {
  where: WeaponAscensionWhereUniqueInput;
  update: WeaponAscensionUpdateWithoutWeaponAscensionMaterialDataInput;
  create: WeaponAscensionCreateWithoutWeaponAscensionMaterialInput;
};

export type ForgeRecipeCreateWithoutWeaponEnhancementMaterialInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  craftingTime?: number | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialCreateManyWithoutRecipeUseInput;
  weapon?: WeaponCreateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeCreateWithoutWeaponEnhancementMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  craftingTime?: number | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialCreateOneWithoutRecipeCreateInput;
  weapon?: WeaponCreateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeUpdateWithoutWeaponEnhancementMaterialDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  craftingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterials?: WeaponEnhancementMaterialUpdateManyWithoutRecipeUseInput;
  weapon?: WeaponUpdateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeUpsertWithoutWeaponEnhancementMaterialInput = {
  update: ForgeRecipeUpdateWithoutWeaponEnhancementMaterialDataInput;
  create: ForgeRecipeCreateWithoutWeaponEnhancementMaterialInput;
};

export type ForgeRecipeUpdateWithoutWeaponEnhancementMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  craftingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
  weaponEnhancementMaterial?: WeaponEnhancementMaterialUpdateOneWithoutRecipeCreateInput;
  weapon?: WeaponUpdateOneWithoutForgeRecipeInput;
};

export type ForgeRecipeUpsertWithoutWeaponEnhancementMaterialsInput = {
  update: ForgeRecipeUpdateWithoutWeaponEnhancementMaterialsDataInput;
  create: ForgeRecipeCreateWithoutWeaponEnhancementMaterialsInput;
};

export type CharacterAscensionCreateWithoutCharacterAscensionMaterialInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  level: number;
  maxLevel: number;
  recipe?: InputJsonValue | null;
  character?: CharacterCreateOneWithoutAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialCreateManyWithoutCharacterAscensionsInput;
};

export type CharacterAscensionUpdateWithWhereUniqueWithoutCharacterAscensionMaterialInput = {
  where: CharacterAscensionWhereUniqueInput;
  data: CharacterAscensionUpdateWithoutCharacterAscensionMaterialDataInput;
};

export type CharacterAscensionUpsertWithWhereUniqueWithoutCharacterAscensionMaterialInput = {
  where: CharacterAscensionWhereUniqueInput;
  update: CharacterAscensionUpdateWithoutCharacterAscensionMaterialDataInput;
  create: CharacterAscensionCreateWithoutCharacterAscensionMaterialInput;
};

export type DomainCreateWithoutTalentLevelUpMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  levels?: InputJsonValue | null;
  type?: string | null;
  artifacts?: ArtifactCreateManyWithoutDomainInput;
  region?: RegionCreateOneWithoutDomainsInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialCreateManyWithoutDomainInput;
};

export type TalentCreateWithoutTalentLevelUpMaterialInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | null;
  type?: string | null;
  character: CharacterCreateOneWithoutTalentsInput;
};

export type DomainUpdateWithoutTalentLevelUpMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  artifacts?: ArtifactUpdateManyWithoutDomainInput;
  region?: RegionUpdateOneWithoutDomainsInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialUpdateManyWithoutDomainInput;
};

export type DomainUpsertWithoutTalentLevelUpMaterialsInput = {
  update: DomainUpdateWithoutTalentLevelUpMaterialsDataInput;
  create: DomainCreateWithoutTalentLevelUpMaterialsInput;
};

export type TalentUpdateWithWhereUniqueWithoutTalentLevelUpMaterialInput = {
  where: TalentWhereUniqueInput;
  data: TalentUpdateWithoutTalentLevelUpMaterialDataInput;
};

export type TalentUpsertWithWhereUniqueWithoutTalentLevelUpMaterialInput = {
  where: TalentWhereUniqueInput;
  update: TalentUpdateWithoutTalentLevelUpMaterialDataInput;
  create: TalentCreateWithoutTalentLevelUpMaterialInput;
};

export type ConsumeableRecipeCreateWithoutCraftingMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableCreateOneWithoutRecipeInput;
  cookingMaterials?: CookingMaterialCreateManyWithoutRecipesInput;
};

export type ConsumeableRecipeUpdateWithWhereUniqueWithoutCraftingMaterialsInput = {
  where: ConsumeableRecipeWhereUniqueInput;
  data: ConsumeableRecipeUpdateWithoutCraftingMaterialsDataInput;
};

export type ConsumeableRecipeUpdateManyWithWhereNestedInput = {
  where: ConsumeableRecipeScalarWhereInput;
  data: ConsumeableRecipeUpdateManyDataInput;
};

export type ConsumeableRecipeScalarWhereInput = {
  AND?: Enumerable<ConsumeableRecipeScalarWhereInput>;
  OR?: Array<ConsumeableRecipeScalarWhereInput>;
  NOT?: Enumerable<ConsumeableRecipeScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  recipe?: JsonNullableFilter | null;
  consumeableId?: string | StringNullableFilter | null;
};

export type ConsumeableRecipeUpsertWithWhereUniqueWithoutCraftingMaterialsInput = {
  where: ConsumeableRecipeWhereUniqueInput;
  update: ConsumeableRecipeUpdateWithoutCraftingMaterialsDataInput;
  create: ConsumeableRecipeCreateWithoutCraftingMaterialsInput;
};

export type ProcessRecipeCreateWithoutMaterialInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  processingTime?: number | null;
  recipe?: InputJsonValue | null;
};

export type ConsumeableRecipeCreateWithoutCookingMaterialsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableCreateOneWithoutRecipeInput;
  craftingMaterials?: CraftingMaterialCreateManyWithoutRecipesInput;
};

export type ProcessRecipeUpdateWithoutMaterialDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  processingTime?: number | NullableIntFieldUpdateOperationsInput | null;
  recipe?: InputJsonValue | null;
};

export type ProcessRecipeUpsertWithoutMaterialInput = {
  update: ProcessRecipeUpdateWithoutMaterialDataInput;
  create: ProcessRecipeCreateWithoutMaterialInput;
};

export type ConsumeableRecipeUpdateWithWhereUniqueWithoutCookingMaterialsInput = {
  where: ConsumeableRecipeWhereUniqueInput;
  data: ConsumeableRecipeUpdateWithoutCookingMaterialsDataInput;
};

export type ConsumeableRecipeUpsertWithWhereUniqueWithoutCookingMaterialsInput = {
  where: ConsumeableRecipeWhereUniqueInput;
  update: ConsumeableRecipeUpdateWithoutCookingMaterialsDataInput;
  create: ConsumeableRecipeCreateWithoutCookingMaterialsInput;
};

export type ArtifactCreateWithoutDomainInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  lore?: string | null;
  minRarity: number;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type: ArtifactType;
  set?: ArtifactSetCreateOneWithoutArtifactsInput;
};

export type RegionCreateWithoutDomainsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  characterProfile?: CharacterProfileCreateManyWithoutRegionInput;
  element?: ElementCreateOneWithoutRegionInput;
};

export type TalentLevelUpMaterialCreateWithoutDomainInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: TalentLevelUpMaterialGroup;
  talents?: TalentCreateManyWithoutTalentLevelUpMaterialInput;
};

export type WeaponAscensionMaterialCreateWithoutDomainInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  availability?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  rarity: number;
  group: WeaponAscensionMaterialGroup;
  weaponAscensions?: WeaponAscensionCreateManyWithoutWeaponAscensionMaterialInput;
};

export type ArtifactUpdateWithWhereUniqueWithoutDomainInput = {
  where: ArtifactWhereUniqueInput;
  data: ArtifactUpdateWithoutDomainDataInput;
};

export type ArtifactUpdateManyWithWhereNestedInput = {
  where: ArtifactScalarWhereInput;
  data: ArtifactUpdateManyDataInput;
};

export type ArtifactScalarWhereInput = {
  AND?: Enumerable<ArtifactScalarWhereInput>;
  OR?: Array<ArtifactScalarWhereInput>;
  NOT?: Enumerable<ArtifactScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  lore?: string | StringNullableFilter | null;
  minRarity?: number | IntFilter;
  possibleMainStats?: JsonNullableFilter | null;
  possibleSubStats?: JsonNullableFilter | null;
  source?: JsonNullableFilter | null;
  type?: ArtifactType | EnumArtifactTypeFilter;
  artifactSetId?: string | StringNullableFilter | null;
  domainId?: string | StringNullableFilter | null;
};

export type ArtifactUpsertWithWhereUniqueWithoutDomainInput = {
  where: ArtifactWhereUniqueInput;
  update: ArtifactUpdateWithoutDomainDataInput;
  create: ArtifactCreateWithoutDomainInput;
};

export type RegionUpdateWithoutDomainsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  characterProfile?: CharacterProfileUpdateManyWithoutRegionInput;
  element?: ElementUpdateOneWithoutRegionInput;
};

export type RegionUpsertWithoutDomainsInput = {
  update: RegionUpdateWithoutDomainsDataInput;
  create: RegionCreateWithoutDomainsInput;
};

export type TalentLevelUpMaterialUpdateWithWhereUniqueWithoutDomainInput = {
  where: TalentLevelUpMaterialWhereUniqueInput;
  data: TalentLevelUpMaterialUpdateWithoutDomainDataInput;
};

export type TalentLevelUpMaterialUpdateManyWithWhereNestedInput = {
  where: TalentLevelUpMaterialScalarWhereInput;
  data: TalentLevelUpMaterialUpdateManyDataInput;
};

export type TalentLevelUpMaterialScalarWhereInput = {
  AND?: Enumerable<TalentLevelUpMaterialScalarWhereInput>;
  OR?: Array<TalentLevelUpMaterialScalarWhereInput>;
  NOT?: Enumerable<TalentLevelUpMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  availability?: JsonNullableFilter | null;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: TalentLevelUpMaterialGroup | EnumTalentLevelUpMaterialGroupFilter;
  domainId?: string | StringNullableFilter | null;
};

export type TalentLevelUpMaterialUpsertWithWhereUniqueWithoutDomainInput = {
  where: TalentLevelUpMaterialWhereUniqueInput;
  update: TalentLevelUpMaterialUpdateWithoutDomainDataInput;
  create: TalentLevelUpMaterialCreateWithoutDomainInput;
};

export type WeaponAscensionMaterialUpdateWithWhereUniqueWithoutDomainInput = {
  where: WeaponAscensionMaterialWhereUniqueInput;
  data: WeaponAscensionMaterialUpdateWithoutDomainDataInput;
};

export type WeaponAscensionMaterialUpdateManyWithWhereNestedInput = {
  where: WeaponAscensionMaterialScalarWhereInput;
  data: WeaponAscensionMaterialUpdateManyDataInput;
};

export type WeaponAscensionMaterialScalarWhereInput = {
  AND?: Enumerable<WeaponAscensionMaterialScalarWhereInput>;
  OR?: Array<WeaponAscensionMaterialScalarWhereInput>;
  NOT?: Enumerable<WeaponAscensionMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  availability?: JsonNullableFilter | null;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  group?: WeaponAscensionMaterialGroup | EnumWeaponAscensionMaterialGroupFilter;
  domainId?: string | StringNullableFilter | null;
};

export type WeaponAscensionMaterialUpsertWithWhereUniqueWithoutDomainInput = {
  where: WeaponAscensionMaterialWhereUniqueInput;
  update: WeaponAscensionMaterialUpdateWithoutDomainDataInput;
  create: WeaponAscensionMaterialCreateWithoutDomainInput;
};

export type CharacterProfileCreateWithoutSpecialtyDishInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  affiliation?: string | null;
  birthday?: string | null;
  constellation?: string | null;
  overview?: string | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character: CharacterCreateOneWithoutProfileInput;
  region?: RegionCreateOneWithoutCharacterProfileInput;
  vision?: ElementCreateOneWithoutCharacterProfilesInput;
};

export type ConsumeableRecipeCreateWithoutConsumeableInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  recipe?: InputJsonValue | null;
  craftingMaterials?: CraftingMaterialCreateManyWithoutRecipesInput;
  cookingMaterials?: CookingMaterialCreateManyWithoutRecipesInput;
};

export type CharacterProfileUpdateWithoutSpecialtyDishDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character?: CharacterUpdateOneRequiredWithoutProfileInput;
  region?: RegionUpdateOneWithoutCharacterProfileInput;
  vision?: ElementUpdateOneWithoutCharacterProfilesInput;
};

export type CharacterProfileUpsertWithoutSpecialtyDishInput = {
  update: CharacterProfileUpdateWithoutSpecialtyDishDataInput;
  create: CharacterProfileCreateWithoutSpecialtyDishInput;
};

export type ConsumeableRecipeUpdateWithoutConsumeableDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  craftingMaterials?: CraftingMaterialUpdateManyWithoutRecipesInput;
  cookingMaterials?: CookingMaterialUpdateManyWithoutRecipesInput;
};

export type ConsumeableRecipeUpsertWithoutConsumeableInput = {
  update: ConsumeableRecipeUpdateWithoutConsumeableDataInput;
  create: ConsumeableRecipeCreateWithoutConsumeableInput;
};

export type ConsumeableCreateWithoutRecipeInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  effect?: string | null;
  image?: string | null;
  rarity: number;
  consumeableType: ConsumableType;
  foodType: FoodType;
  characterSpecialty?: CharacterProfileCreateOneWithoutSpecialtyDishInput;
};

export type CraftingMaterialCreateWithoutRecipesInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
};

export type CookingMaterialCreateWithoutRecipesInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  processingRecipe?: ProcessRecipeCreateOneWithoutMaterialInput;
};

export type ConsumeableUpdateWithoutRecipeDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  effect?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  consumeableType?:
    | ConsumableType
    | EnumConsumableTypeFieldUpdateOperationsInput;
  foodType?: FoodType | EnumFoodTypeFieldUpdateOperationsInput;
  characterSpecialty?: CharacterProfileUpdateOneWithoutSpecialtyDishInput;
};

export type ConsumeableUpsertWithoutRecipeInput = {
  update: ConsumeableUpdateWithoutRecipeDataInput;
  create: ConsumeableCreateWithoutRecipeInput;
};

export type CraftingMaterialUpdateWithWhereUniqueWithoutRecipesInput = {
  where: CraftingMaterialWhereUniqueInput;
  data: CraftingMaterialUpdateWithoutRecipesDataInput;
};

export type CraftingMaterialUpdateManyWithWhereNestedInput = {
  where: CraftingMaterialScalarWhereInput;
  data: CraftingMaterialUpdateManyDataInput;
};

export type CraftingMaterialScalarWhereInput = {
  AND?: Enumerable<CraftingMaterialScalarWhereInput>;
  OR?: Array<CraftingMaterialScalarWhereInput>;
  NOT?: Enumerable<CraftingMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
};

export type CraftingMaterialUpsertWithWhereUniqueWithoutRecipesInput = {
  where: CraftingMaterialWhereUniqueInput;
  update: CraftingMaterialUpdateWithoutRecipesDataInput;
  create: CraftingMaterialCreateWithoutRecipesInput;
};

export type CookingMaterialUpdateWithWhereUniqueWithoutRecipesInput = {
  where: CookingMaterialWhereUniqueInput;
  data: CookingMaterialUpdateWithoutRecipesDataInput;
};

export type CookingMaterialUpdateManyWithWhereNestedInput = {
  where: CookingMaterialScalarWhereInput;
  data: CookingMaterialUpdateManyDataInput;
};

export type CookingMaterialScalarWhereInput = {
  AND?: Enumerable<CookingMaterialScalarWhereInput>;
  OR?: Array<CookingMaterialScalarWhereInput>;
  NOT?: Enumerable<CookingMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
};

export type CookingMaterialUpsertWithWhereUniqueWithoutRecipesInput = {
  where: CookingMaterialWhereUniqueInput;
  update: CookingMaterialUpdateWithoutRecipesDataInput;
  create: CookingMaterialCreateWithoutRecipesInput;
};

export type CookingMaterialCreateWithoutProcessingRecipeInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  recipes?: ConsumeableRecipeCreateManyWithoutCookingMaterialsInput;
};

export type CookingMaterialUpdateWithoutProcessingRecipeDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  recipes?: ConsumeableRecipeUpdateManyWithoutCookingMaterialsInput;
};

export type CookingMaterialUpsertWithoutProcessingRecipeInput = {
  update: CookingMaterialUpdateWithoutProcessingRecipeDataInput;
  create: CookingMaterialCreateWithoutProcessingRecipeInput;
};

export type WeaponEnhancementMaterialCreateWithoutRecipeUseInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  recipeCreate?: ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialInput;
};

export type WeaponEnhancementMaterialCreateWithoutRecipeCreateInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  image?: string | null;
  rarity: number;
  source?: InputJsonValue | null;
  recipeUse?: ForgeRecipeCreateOneWithoutWeaponEnhancementMaterialsInput;
};

export type WeaponCreateWithoutForgeRecipeInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  baseStats?: InputJsonValue | null;
  description?: string | null;
  image?: string | null;
  lore?: string | null;
  passive?: InputJsonValue | null;
  rarity?: number | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?: WeaponSecondaryStatType | null;
  type: WeaponType;
  ascensions?: WeaponAscensionCreateManyWithoutWeaponInput;
};

export type WeaponEnhancementMaterialUpdateWithWhereUniqueWithoutRecipeUseInput = {
  where: WeaponEnhancementMaterialWhereUniqueInput;
  data: WeaponEnhancementMaterialUpdateWithoutRecipeUseDataInput;
};

export type WeaponEnhancementMaterialUpdateManyWithWhereNestedInput = {
  where: WeaponEnhancementMaterialScalarWhereInput;
  data: WeaponEnhancementMaterialUpdateManyDataInput;
};

export type WeaponEnhancementMaterialScalarWhereInput = {
  AND?: Enumerable<WeaponEnhancementMaterialScalarWhereInput>;
  OR?: Array<WeaponEnhancementMaterialScalarWhereInput>;
  NOT?: Enumerable<WeaponEnhancementMaterialScalarWhereInput>;
  id?: string | StringFilter;
  createdAt?: Date | string | DateTimeFilter;
  updatedAt?: Date | string | DateTimeFilter;
  name?: string | StringFilter;
  description?: string | StringNullableFilter | null;
  image?: string | StringNullableFilter | null;
  rarity?: number | IntFilter;
  source?: JsonNullableFilter | null;
  recipeUseId?: string | StringNullableFilter | null;
};

export type WeaponEnhancementMaterialUpsertWithWhereUniqueWithoutRecipeUseInput = {
  where: WeaponEnhancementMaterialWhereUniqueInput;
  update: WeaponEnhancementMaterialUpdateWithoutRecipeUseDataInput;
  create: WeaponEnhancementMaterialCreateWithoutRecipeUseInput;
};

export type WeaponEnhancementMaterialUpdateWithoutRecipeCreateDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  recipeUse?: ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialsInput;
};

export type WeaponEnhancementMaterialUpsertWithoutRecipeCreateInput = {
  update: WeaponEnhancementMaterialUpdateWithoutRecipeCreateDataInput;
  create: WeaponEnhancementMaterialCreateWithoutRecipeCreateInput;
};

export type WeaponUpdateWithoutForgeRecipeDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  baseStats?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  passive?: InputJsonValue | null;
  rarity?: number | NullableIntFieldUpdateOperationsInput | null;
  refinements?: InputJsonValue | null;
  stats?: InputJsonValue | null;
  secondaryStatType?:
    | WeaponSecondaryStatType
    | NullableEnumWeaponSecondaryStatTypeFieldUpdateOperationsInput
    | null;
  type?: WeaponType | EnumWeaponTypeFieldUpdateOperationsInput;
  ascensions?: WeaponAscensionUpdateManyWithoutWeaponInput;
};

export type WeaponUpsertWithoutForgeRecipeInput = {
  update: WeaponUpdateWithoutForgeRecipeDataInput;
  create: WeaponCreateWithoutForgeRecipeInput;
};

export type ArtifactCreateWithoutSetInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  lore?: string | null;
  minRarity: number;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type: ArtifactType;
  domain?: DomainCreateOneWithoutArtifactsInput;
};

export type ArtifactUpdateWithWhereUniqueWithoutSetInput = {
  where: ArtifactWhereUniqueInput;
  data: ArtifactUpdateWithoutSetDataInput;
};

export type ArtifactUpsertWithWhereUniqueWithoutSetInput = {
  where: ArtifactWhereUniqueInput;
  update: ArtifactUpdateWithoutSetDataInput;
  create: ArtifactCreateWithoutSetInput;
};

export type ArtifactSetCreateWithoutArtifactsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  image?: string | null;
  maxRarity?: number | null;
  pieceBonusFour?: string | null;
  pieceBonusOne?: string | null;
  pieceBonusTwo?: string | null;
};

export type DomainCreateWithoutArtifactsInput = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description?: string | null;
  levels?: InputJsonValue | null;
  type?: string | null;
  region?: RegionCreateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialCreateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialCreateManyWithoutDomainInput;
};

export type ArtifactSetUpdateWithoutArtifactsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  maxRarity?: number | NullableIntFieldUpdateOperationsInput | null;
  pieceBonusFour?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusOne?: string | NullableStringFieldUpdateOperationsInput | null;
  pieceBonusTwo?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type ArtifactSetUpsertWithoutArtifactsInput = {
  update: ArtifactSetUpdateWithoutArtifactsDataInput;
  create: ArtifactSetCreateWithoutArtifactsInput;
};

export type DomainUpdateWithoutArtifactsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  region?: RegionUpdateOneWithoutDomainsInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialUpdateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialUpdateManyWithoutDomainInput;
};

export type DomainUpsertWithoutArtifactsInput = {
  update: DomainUpdateWithoutArtifactsDataInput;
  create: DomainCreateWithoutArtifactsInput;
};

export type CharacterAscensionUpdateWithoutCharacterDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  characterAscensionMaterial?: CharacterAscensionMaterialUpdateOneWithoutCharacterAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutCharacterAscensionsInput;
};

export type CharacterAscensionUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type ElementUpdateWithoutCharactersDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
  characterProfiles?: CharacterProfileUpdateManyWithoutVisionInput;
  region?: RegionUpdateOneWithoutElementInput;
};

export type ElementUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  archon?: string | NullableStringFieldUpdateOperationsInput | null;
  statusEffect?: string | NullableStringFieldUpdateOperationsInput | null;
  theme?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type TalentUpdateWithoutCharacterDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | NullableStringFieldUpdateOperationsInput | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  talentLevelUpMaterial?: TalentLevelUpMaterialUpdateOneWithoutTalentsInput;
};

export type TalentUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | NullableStringFieldUpdateOperationsInput | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type CommonAscensionMaterialUpdateWithoutCharacterAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | CommonAscensionMaterialGroup
    | EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput;
  weaponAscensions?: WeaponAscensionUpdateManyWithoutCommonAscensionMaterialsInput;
};

export type CommonAscensionMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | CommonAscensionMaterialGroup
    | EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type CharacterUpdateWithoutElementsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
  ascensions?: CharacterAscensionUpdateManyWithoutCharacterInput;
  profile?: CharacterProfileUpdateOneWithoutCharacterInput;
  talents?: TalentUpdateManyWithoutCharacterInput;
};

export type CharacterUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  constellations?: InputJsonValue | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  stats?: InputJsonValue | null;
  weapon?: WeaponType | NullableEnumWeaponTypeFieldUpdateOperationsInput | null;
};

export type CharacterProfileUpdateWithoutVisionDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character?: CharacterUpdateOneRequiredWithoutProfileInput;
  region?: RegionUpdateOneWithoutCharacterProfileInput;
  specialtyDish?: ConsumeableUpdateOneWithoutCharacterSpecialtyInput;
};

export type CharacterProfileUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
};

export type CharacterProfileUpdateWithoutRegionDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  affiliation?: string | NullableStringFieldUpdateOperationsInput | null;
  birthday?: string | NullableStringFieldUpdateOperationsInput | null;
  constellation?: string | NullableStringFieldUpdateOperationsInput | null;
  overview?: string | NullableStringFieldUpdateOperationsInput | null;
  story?: InputJsonValue | null;
  voiceActor?: InputJsonValue | null;
  voiceLines?: InputJsonValue | null;
  character?: CharacterUpdateOneRequiredWithoutProfileInput;
  specialtyDish?: ConsumeableUpdateOneWithoutCharacterSpecialtyInput;
  vision?: ElementUpdateOneWithoutCharacterProfilesInput;
};

export type DomainUpdateWithoutRegionDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  artifacts?: ArtifactUpdateManyWithoutDomainInput;
  talentLevelUpMaterials?: TalentLevelUpMaterialUpdateManyWithoutDomainInput;
  weaponAscensionMaterials?: WeaponAscensionMaterialUpdateManyWithoutDomainInput;
};

export type DomainUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  levels?: InputJsonValue | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type WeaponAscensionUpdateWithoutWeaponDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutWeaponAscensionsInput;
  weaponAscensionMaterial?: WeaponAscensionMaterialUpdateOneWithoutWeaponAscensionsInput;
};

export type WeaponAscensionUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type CommonAscensionMaterialUpdateWithoutWeaponAscensionsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | CommonAscensionMaterialGroup
    | EnumCommonAscensionMaterialGroupFieldUpdateOperationsInput;
  characterAscensions?: CharacterAscensionUpdateManyWithoutCommonAscensionMaterialsInput;
};

export type CharacterAscensionUpdateWithoutCommonAscensionMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  character?: CharacterUpdateOneWithoutAscensionsInput;
  characterAscensionMaterial?: CharacterAscensionMaterialUpdateOneWithoutCharacterAscensionsInput;
};

export type WeaponAscensionUpdateWithoutCommonAscensionMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  weaponAscensionMaterial?: WeaponAscensionMaterialUpdateOneWithoutWeaponAscensionsInput;
  weapon?: WeaponUpdateOneWithoutAscensionsInput;
};

export type WeaponAscensionUpdateWithoutWeaponAscensionMaterialDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutWeaponAscensionsInput;
  weapon?: WeaponUpdateOneWithoutAscensionsInput;
};

export type CharacterAscensionUpdateWithoutCharacterAscensionMaterialDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  level?: number | IntFieldUpdateOperationsInput;
  maxLevel?: number | IntFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  character?: CharacterUpdateOneWithoutAscensionsInput;
  commonAscensionMaterials?: CommonAscensionMaterialUpdateManyWithoutCharacterAscensionsInput;
};

export type TalentUpdateWithoutTalentLevelUpMaterialDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  description?: InputJsonValue | null;
  details?: InputJsonValue | null;
  name?: string | NullableStringFieldUpdateOperationsInput | null;
  type?: string | NullableStringFieldUpdateOperationsInput | null;
  character?: CharacterUpdateOneRequiredWithoutTalentsInput;
};

export type ConsumeableRecipeUpdateWithoutCraftingMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableUpdateOneWithoutRecipeInput;
  cookingMaterials?: CookingMaterialUpdateManyWithoutRecipesInput;
};

export type ConsumeableRecipeUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
};

export type ConsumeableRecipeUpdateWithoutCookingMaterialsDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  recipe?: InputJsonValue | null;
  consumeable?: ConsumeableUpdateOneWithoutRecipeInput;
  craftingMaterials?: CraftingMaterialUpdateManyWithoutRecipesInput;
};

export type ArtifactUpdateWithoutDomainDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  minRarity?: number | IntFieldUpdateOperationsInput;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type?: ArtifactType | EnumArtifactTypeFieldUpdateOperationsInput;
  set?: ArtifactSetUpdateOneWithoutArtifactsInput;
};

export type ArtifactUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  minRarity?: number | IntFieldUpdateOperationsInput;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type?: ArtifactType | EnumArtifactTypeFieldUpdateOperationsInput;
};

export type TalentLevelUpMaterialUpdateWithoutDomainDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | TalentLevelUpMaterialGroup
    | EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput;
  talents?: TalentUpdateManyWithoutTalentLevelUpMaterialInput;
};

export type TalentLevelUpMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | TalentLevelUpMaterialGroup
    | EnumTalentLevelUpMaterialGroupFieldUpdateOperationsInput;
};

export type WeaponAscensionMaterialUpdateWithoutDomainDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
  weaponAscensions?: WeaponAscensionUpdateManyWithoutWeaponAscensionMaterialInput;
};

export type WeaponAscensionMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  availability?: InputJsonValue | null;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  group?:
    | WeaponAscensionMaterialGroup
    | EnumWeaponAscensionMaterialGroupFieldUpdateOperationsInput;
};

export type CraftingMaterialUpdateWithoutRecipesDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CraftingMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type CookingMaterialUpdateWithoutRecipesDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  processingRecipe?: ProcessRecipeUpdateOneWithoutMaterialInput;
};

export type CookingMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type WeaponEnhancementMaterialUpdateWithoutRecipeUseDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
  recipeCreate?: ForgeRecipeUpdateOneWithoutWeaponEnhancementMaterialInput;
};

export type WeaponEnhancementMaterialUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | NullableStringFieldUpdateOperationsInput | null;
  image?: string | NullableStringFieldUpdateOperationsInput | null;
  rarity?: number | IntFieldUpdateOperationsInput;
  source?: InputJsonValue | null;
};

export type ArtifactUpdateWithoutSetDataInput = {
  id?: string | StringFieldUpdateOperationsInput;
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput;
  name?: string | StringFieldUpdateOperationsInput;
  lore?: string | NullableStringFieldUpdateOperationsInput | null;
  minRarity?: number | IntFieldUpdateOperationsInput;
  possibleMainStats?: InputJsonValue | null;
  possibleSubStats?: InputJsonValue | null;
  source?: InputJsonValue | null;
  type?: ArtifactType | EnumArtifactTypeFieldUpdateOperationsInput;
  domain?: DomainUpdateOneWithoutArtifactsInput;
};

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number;
};

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
