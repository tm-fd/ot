
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Purchase
 * 
 */
export type Purchase = $Result.DefaultSelection<Prisma.$PurchasePayload>
/**
 * Model PurchaseActivation
 * 
 */
export type PurchaseActivation = $Result.DefaultSelection<Prisma.$PurchaseActivationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Purchases
 * const purchases = await prisma.purchase.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Purchases
   * const purchases = await prisma.purchase.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.PurchaseDelegate<ExtArgs>;

  /**
   * `prisma.purchaseActivation`: Exposes CRUD operations for the **PurchaseActivation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseActivations
    * const purchaseActivations = await prisma.purchaseActivation.findMany()
    * ```
    */
  get purchaseActivation(): Prisma.PurchaseActivationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.20.0
   * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Purchase: 'Purchase',
    PurchaseActivation: 'PurchaseActivation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "purchase" | "purchaseActivation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Purchase: {
        payload: Prisma.$PurchasePayload<ExtArgs>
        fields: Prisma.PurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findFirst: {
            args: Prisma.PurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findMany: {
            args: Prisma.PurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          create: {
            args: Prisma.PurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          createMany: {
            args: Prisma.PurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          update: {
            args: Prisma.PurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          deleteMany: {
            args: Prisma.PurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          aggregate: {
            args: Prisma.PurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchase>
          }
          groupBy: {
            args: Prisma.PurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseCountAggregateOutputType> | number
          }
        }
      }
      PurchaseActivation: {
        payload: Prisma.$PurchaseActivationPayload<ExtArgs>
        fields: Prisma.PurchaseActivationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseActivationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseActivationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          findFirst: {
            args: Prisma.PurchaseActivationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseActivationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          findMany: {
            args: Prisma.PurchaseActivationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>[]
          }
          create: {
            args: Prisma.PurchaseActivationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          createMany: {
            args: Prisma.PurchaseActivationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PurchaseActivationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          update: {
            args: Prisma.PurchaseActivationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseActivationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseActivationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseActivationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseActivationPayload>
          }
          aggregate: {
            args: Prisma.PurchaseActivationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseActivation>
          }
          groupBy: {
            args: Prisma.PurchaseActivationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseActivationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseActivationCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseActivationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PurchaseCountOutputType
   */

  export type PurchaseCountOutputType = {
    activations: number
  }

  export type PurchaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activations?: boolean | PurchaseCountOutputTypeCountActivationsArgs
  }

  // Custom InputTypes
  /**
   * PurchaseCountOutputType without action
   */
  export type PurchaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseCountOutputType
     */
    select?: PurchaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PurchaseCountOutputType without action
   */
  export type PurchaseCountOutputTypeCountActivationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseActivationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Purchase
   */

  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    id: number | null
    number_of_vr_glasses: number | null
    number_of_licenses: number | null
    duration: number | null
  }

  export type PurchaseSumAggregateOutputType = {
    id: number | null
    number_of_vr_glasses: number | null
    number_of_licenses: number | null
    duration: number | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: number | null
    email: string | null
    first_name: string | null
    last_name: string | null
    code: string | null
    number_of_vr_glasses: number | null
    number_of_licenses: number | null
    created_at: Date | null
    updated_at: Date | null
    is_subscription: boolean | null
    duration: number | null
    order_number: string | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: number | null
    email: string | null
    first_name: string | null
    last_name: string | null
    code: string | null
    number_of_vr_glasses: number | null
    number_of_licenses: number | null
    created_at: Date | null
    updated_at: Date | null
    is_subscription: boolean | null
    duration: number | null
    order_number: string | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    email: number
    first_name: number
    last_name: number
    code: number
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at: number
    updated_at: number
    is_subscription: number
    duration: number
    order_number: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    id?: true
    number_of_vr_glasses?: true
    number_of_licenses?: true
    duration?: true
  }

  export type PurchaseSumAggregateInputType = {
    id?: true
    number_of_vr_glasses?: true
    number_of_licenses?: true
    duration?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    code?: true
    number_of_vr_glasses?: true
    number_of_licenses?: true
    created_at?: true
    updated_at?: true
    is_subscription?: true
    duration?: true
    order_number?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    code?: true
    number_of_vr_glasses?: true
    number_of_licenses?: true
    created_at?: true
    updated_at?: true
    is_subscription?: true
    duration?: true
    order_number?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    code?: true
    number_of_vr_glasses?: true
    number_of_licenses?: true
    created_at?: true
    updated_at?: true
    is_subscription?: true
    duration?: true
    order_number?: true
    _all?: true
  }

  export type PurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchase to aggregate.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }




  export type PurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithAggregationInput | PurchaseOrderByWithAggregationInput[]
    by: PurchaseScalarFieldEnum[] | PurchaseScalarFieldEnum
    having?: PurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }

  export type PurchaseGroupByOutputType = {
    id: number
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at: Date
    updated_at: Date
    is_subscription: boolean
    duration: number
    order_number: string
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends PurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    code?: boolean
    number_of_vr_glasses?: boolean
    number_of_licenses?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_subscription?: boolean
    duration?: boolean
    order_number?: boolean
    activations?: boolean | Purchase$activationsArgs<ExtArgs>
    _count?: boolean | PurchaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>


  export type PurchaseSelectScalar = {
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    code?: boolean
    number_of_vr_glasses?: boolean
    number_of_licenses?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_subscription?: boolean
    duration?: boolean
    order_number?: boolean
  }

  export type PurchaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activations?: boolean | Purchase$activationsArgs<ExtArgs>
    _count?: boolean | PurchaseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Purchase"
    objects: {
      activations: Prisma.$PurchaseActivationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      first_name: string
      last_name: string
      code: string
      number_of_vr_glasses: number
      number_of_licenses: number
      created_at: Date
      updated_at: Date
      is_subscription: boolean
      duration: number
      order_number: string
    }, ExtArgs["result"]["purchase"]>
    composites: {}
  }

  type PurchaseGetPayload<S extends boolean | null | undefined | PurchaseDefaultArgs> = $Result.GetResult<Prisma.$PurchasePayload, S>

  type PurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseCountAggregateInputType | true
    }

  export interface PurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Purchase'], meta: { name: 'Purchase' } }
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {PurchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseFindUniqueArgs>(args: SelectSubset<T, PurchaseFindUniqueArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Purchase that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseFindUniqueOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseFindFirstArgs>(args?: SelectSubset<T, PurchaseFindFirstArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Purchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseFindManyArgs>(args?: SelectSubset<T, PurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Purchase.
     * @param {PurchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
     */
    create<T extends PurchaseCreateArgs>(args: SelectSubset<T, PurchaseCreateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Purchases.
     * @param {PurchaseCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseCreateManyArgs>(args?: SelectSubset<T, PurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Purchase.
     * @param {PurchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
     */
    delete<T extends PurchaseDeleteArgs>(args: SelectSubset<T, PurchaseDeleteArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Purchase.
     * @param {PurchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseUpdateArgs>(args: SelectSubset<T, PurchaseUpdateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Purchases.
     * @param {PurchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseDeleteManyArgs>(args?: SelectSubset<T, PurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseUpdateManyArgs>(args: SelectSubset<T, PurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Purchase.
     * @param {PurchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseUpsertArgs>(args: SelectSubset<T, PurchaseUpsertArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends PurchaseCountArgs>(
      args?: Subset<T, PurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): Prisma.PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Purchase model
   */
  readonly fields: PurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activations<T extends Purchase$activationsArgs<ExtArgs> = {}>(args?: Subset<T, Purchase$activationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Purchase model
   */ 
  interface PurchaseFieldRefs {
    readonly id: FieldRef<"Purchase", 'Int'>
    readonly email: FieldRef<"Purchase", 'String'>
    readonly first_name: FieldRef<"Purchase", 'String'>
    readonly last_name: FieldRef<"Purchase", 'String'>
    readonly code: FieldRef<"Purchase", 'String'>
    readonly number_of_vr_glasses: FieldRef<"Purchase", 'Int'>
    readonly number_of_licenses: FieldRef<"Purchase", 'Int'>
    readonly created_at: FieldRef<"Purchase", 'DateTime'>
    readonly updated_at: FieldRef<"Purchase", 'DateTime'>
    readonly is_subscription: FieldRef<"Purchase", 'Boolean'>
    readonly duration: FieldRef<"Purchase", 'Int'>
    readonly order_number: FieldRef<"Purchase", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Purchase findUnique
   */
  export type PurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findUniqueOrThrow
   */
  export type PurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findFirst
   */
  export type PurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findFirstOrThrow
   */
  export type PurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findMany
   */
  export type PurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchases to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase create
   */
  export type PurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Purchase.
     */
    data: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
  }

  /**
   * Purchase createMany
   */
  export type PurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Purchase update
   */
  export type PurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Purchase.
     */
    data: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
    /**
     * Choose, which Purchase to update.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase updateMany
   */
  export type PurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
  }

  /**
   * Purchase upsert
   */
  export type PurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Purchase to update in case it exists.
     */
    where: PurchaseWhereUniqueInput
    /**
     * In case the Purchase found by the `where` argument doesn't exist, create a new Purchase with this data.
     */
    create: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
    /**
     * In case the Purchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
  }

  /**
   * Purchase delete
   */
  export type PurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter which Purchase to delete.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase deleteMany
   */
  export type PurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchases to delete
     */
    where?: PurchaseWhereInput
  }

  /**
   * Purchase.activations
   */
  export type Purchase$activationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    where?: PurchaseActivationWhereInput
    orderBy?: PurchaseActivationOrderByWithRelationInput | PurchaseActivationOrderByWithRelationInput[]
    cursor?: PurchaseActivationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseActivationScalarFieldEnum | PurchaseActivationScalarFieldEnum[]
  }

  /**
   * Purchase without action
   */
  export type PurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseActivation
   */

  export type AggregatePurchaseActivation = {
    _count: PurchaseActivationCountAggregateOutputType | null
    _avg: PurchaseActivationAvgAggregateOutputType | null
    _sum: PurchaseActivationSumAggregateOutputType | null
    _min: PurchaseActivationMinAggregateOutputType | null
    _max: PurchaseActivationMaxAggregateOutputType | null
  }

  export type PurchaseActivationAvgAggregateOutputType = {
    id: number | null
    purchase_id: number | null
  }

  export type PurchaseActivationSumAggregateOutputType = {
    id: number | null
    purchase_id: number | null
  }

  export type PurchaseActivationMinAggregateOutputType = {
    id: number | null
    purchase_id: number | null
    activation_date: Date | null
    updated_at: Date | null
  }

  export type PurchaseActivationMaxAggregateOutputType = {
    id: number | null
    purchase_id: number | null
    activation_date: Date | null
    updated_at: Date | null
  }

  export type PurchaseActivationCountAggregateOutputType = {
    id: number
    purchase_id: number
    activation_date: number
    updated_at: number
    _all: number
  }


  export type PurchaseActivationAvgAggregateInputType = {
    id?: true
    purchase_id?: true
  }

  export type PurchaseActivationSumAggregateInputType = {
    id?: true
    purchase_id?: true
  }

  export type PurchaseActivationMinAggregateInputType = {
    id?: true
    purchase_id?: true
    activation_date?: true
    updated_at?: true
  }

  export type PurchaseActivationMaxAggregateInputType = {
    id?: true
    purchase_id?: true
    activation_date?: true
    updated_at?: true
  }

  export type PurchaseActivationCountAggregateInputType = {
    id?: true
    purchase_id?: true
    activation_date?: true
    updated_at?: true
    _all?: true
  }

  export type PurchaseActivationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseActivation to aggregate.
     */
    where?: PurchaseActivationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseActivations to fetch.
     */
    orderBy?: PurchaseActivationOrderByWithRelationInput | PurchaseActivationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseActivationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseActivations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseActivations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseActivations
    **/
    _count?: true | PurchaseActivationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseActivationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseActivationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseActivationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseActivationMaxAggregateInputType
  }

  export type GetPurchaseActivationAggregateType<T extends PurchaseActivationAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseActivation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseActivation[P]>
      : GetScalarType<T[P], AggregatePurchaseActivation[P]>
  }




  export type PurchaseActivationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseActivationWhereInput
    orderBy?: PurchaseActivationOrderByWithAggregationInput | PurchaseActivationOrderByWithAggregationInput[]
    by: PurchaseActivationScalarFieldEnum[] | PurchaseActivationScalarFieldEnum
    having?: PurchaseActivationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseActivationCountAggregateInputType | true
    _avg?: PurchaseActivationAvgAggregateInputType
    _sum?: PurchaseActivationSumAggregateInputType
    _min?: PurchaseActivationMinAggregateInputType
    _max?: PurchaseActivationMaxAggregateInputType
  }

  export type PurchaseActivationGroupByOutputType = {
    id: number
    purchase_id: number
    activation_date: Date
    updated_at: Date
    _count: PurchaseActivationCountAggregateOutputType | null
    _avg: PurchaseActivationAvgAggregateOutputType | null
    _sum: PurchaseActivationSumAggregateOutputType | null
    _min: PurchaseActivationMinAggregateOutputType | null
    _max: PurchaseActivationMaxAggregateOutputType | null
  }

  type GetPurchaseActivationGroupByPayload<T extends PurchaseActivationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseActivationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseActivationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseActivationGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseActivationGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseActivationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchase_id?: boolean
    activation_date?: boolean
    updated_at?: boolean
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseActivation"]>


  export type PurchaseActivationSelectScalar = {
    id?: boolean
    purchase_id?: boolean
    activation_date?: boolean
    updated_at?: boolean
  }

  export type PurchaseActivationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }

  export type $PurchaseActivationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseActivation"
    objects: {
      purchase: Prisma.$PurchasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      purchase_id: number
      activation_date: Date
      updated_at: Date
    }, ExtArgs["result"]["purchaseActivation"]>
    composites: {}
  }

  type PurchaseActivationGetPayload<S extends boolean | null | undefined | PurchaseActivationDefaultArgs> = $Result.GetResult<Prisma.$PurchaseActivationPayload, S>

  type PurchaseActivationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseActivationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseActivationCountAggregateInputType | true
    }

  export interface PurchaseActivationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseActivation'], meta: { name: 'PurchaseActivation' } }
    /**
     * Find zero or one PurchaseActivation that matches the filter.
     * @param {PurchaseActivationFindUniqueArgs} args - Arguments to find a PurchaseActivation
     * @example
     * // Get one PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseActivationFindUniqueArgs>(args: SelectSubset<T, PurchaseActivationFindUniqueArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PurchaseActivation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseActivationFindUniqueOrThrowArgs} args - Arguments to find a PurchaseActivation
     * @example
     * // Get one PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseActivationFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseActivationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PurchaseActivation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationFindFirstArgs} args - Arguments to find a PurchaseActivation
     * @example
     * // Get one PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseActivationFindFirstArgs>(args?: SelectSubset<T, PurchaseActivationFindFirstArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PurchaseActivation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationFindFirstOrThrowArgs} args - Arguments to find a PurchaseActivation
     * @example
     * // Get one PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseActivationFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseActivationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PurchaseActivations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseActivations
     * const purchaseActivations = await prisma.purchaseActivation.findMany()
     * 
     * // Get first 10 PurchaseActivations
     * const purchaseActivations = await prisma.purchaseActivation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseActivationWithIdOnly = await prisma.purchaseActivation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseActivationFindManyArgs>(args?: SelectSubset<T, PurchaseActivationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PurchaseActivation.
     * @param {PurchaseActivationCreateArgs} args - Arguments to create a PurchaseActivation.
     * @example
     * // Create one PurchaseActivation
     * const PurchaseActivation = await prisma.purchaseActivation.create({
     *   data: {
     *     // ... data to create a PurchaseActivation
     *   }
     * })
     * 
     */
    create<T extends PurchaseActivationCreateArgs>(args: SelectSubset<T, PurchaseActivationCreateArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PurchaseActivations.
     * @param {PurchaseActivationCreateManyArgs} args - Arguments to create many PurchaseActivations.
     * @example
     * // Create many PurchaseActivations
     * const purchaseActivation = await prisma.purchaseActivation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseActivationCreateManyArgs>(args?: SelectSubset<T, PurchaseActivationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PurchaseActivation.
     * @param {PurchaseActivationDeleteArgs} args - Arguments to delete one PurchaseActivation.
     * @example
     * // Delete one PurchaseActivation
     * const PurchaseActivation = await prisma.purchaseActivation.delete({
     *   where: {
     *     // ... filter to delete one PurchaseActivation
     *   }
     * })
     * 
     */
    delete<T extends PurchaseActivationDeleteArgs>(args: SelectSubset<T, PurchaseActivationDeleteArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PurchaseActivation.
     * @param {PurchaseActivationUpdateArgs} args - Arguments to update one PurchaseActivation.
     * @example
     * // Update one PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseActivationUpdateArgs>(args: SelectSubset<T, PurchaseActivationUpdateArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PurchaseActivations.
     * @param {PurchaseActivationDeleteManyArgs} args - Arguments to filter PurchaseActivations to delete.
     * @example
     * // Delete a few PurchaseActivations
     * const { count } = await prisma.purchaseActivation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseActivationDeleteManyArgs>(args?: SelectSubset<T, PurchaseActivationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseActivations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseActivations
     * const purchaseActivation = await prisma.purchaseActivation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseActivationUpdateManyArgs>(args: SelectSubset<T, PurchaseActivationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PurchaseActivation.
     * @param {PurchaseActivationUpsertArgs} args - Arguments to update or create a PurchaseActivation.
     * @example
     * // Update or create a PurchaseActivation
     * const purchaseActivation = await prisma.purchaseActivation.upsert({
     *   create: {
     *     // ... data to create a PurchaseActivation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseActivation we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseActivationUpsertArgs>(args: SelectSubset<T, PurchaseActivationUpsertArgs<ExtArgs>>): Prisma__PurchaseActivationClient<$Result.GetResult<Prisma.$PurchaseActivationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PurchaseActivations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationCountArgs} args - Arguments to filter PurchaseActivations to count.
     * @example
     * // Count the number of PurchaseActivations
     * const count = await prisma.purchaseActivation.count({
     *   where: {
     *     // ... the filter for the PurchaseActivations we want to count
     *   }
     * })
    **/
    count<T extends PurchaseActivationCountArgs>(
      args?: Subset<T, PurchaseActivationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseActivationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseActivation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseActivationAggregateArgs>(args: Subset<T, PurchaseActivationAggregateArgs>): Prisma.PrismaPromise<GetPurchaseActivationAggregateType<T>>

    /**
     * Group by PurchaseActivation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseActivationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseActivationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseActivationGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseActivationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseActivationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseActivationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseActivation model
   */
  readonly fields: PurchaseActivationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseActivation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseActivationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchase<T extends PurchaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseDefaultArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PurchaseActivation model
   */ 
  interface PurchaseActivationFieldRefs {
    readonly id: FieldRef<"PurchaseActivation", 'Int'>
    readonly purchase_id: FieldRef<"PurchaseActivation", 'Int'>
    readonly activation_date: FieldRef<"PurchaseActivation", 'DateTime'>
    readonly updated_at: FieldRef<"PurchaseActivation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseActivation findUnique
   */
  export type PurchaseActivationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseActivation to fetch.
     */
    where: PurchaseActivationWhereUniqueInput
  }

  /**
   * PurchaseActivation findUniqueOrThrow
   */
  export type PurchaseActivationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseActivation to fetch.
     */
    where: PurchaseActivationWhereUniqueInput
  }

  /**
   * PurchaseActivation findFirst
   */
  export type PurchaseActivationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseActivation to fetch.
     */
    where?: PurchaseActivationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseActivations to fetch.
     */
    orderBy?: PurchaseActivationOrderByWithRelationInput | PurchaseActivationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseActivations.
     */
    cursor?: PurchaseActivationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseActivations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseActivations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseActivations.
     */
    distinct?: PurchaseActivationScalarFieldEnum | PurchaseActivationScalarFieldEnum[]
  }

  /**
   * PurchaseActivation findFirstOrThrow
   */
  export type PurchaseActivationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseActivation to fetch.
     */
    where?: PurchaseActivationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseActivations to fetch.
     */
    orderBy?: PurchaseActivationOrderByWithRelationInput | PurchaseActivationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseActivations.
     */
    cursor?: PurchaseActivationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseActivations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseActivations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseActivations.
     */
    distinct?: PurchaseActivationScalarFieldEnum | PurchaseActivationScalarFieldEnum[]
  }

  /**
   * PurchaseActivation findMany
   */
  export type PurchaseActivationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseActivations to fetch.
     */
    where?: PurchaseActivationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseActivations to fetch.
     */
    orderBy?: PurchaseActivationOrderByWithRelationInput | PurchaseActivationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseActivations.
     */
    cursor?: PurchaseActivationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseActivations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseActivations.
     */
    skip?: number
    distinct?: PurchaseActivationScalarFieldEnum | PurchaseActivationScalarFieldEnum[]
  }

  /**
   * PurchaseActivation create
   */
  export type PurchaseActivationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseActivation.
     */
    data: XOR<PurchaseActivationCreateInput, PurchaseActivationUncheckedCreateInput>
  }

  /**
   * PurchaseActivation createMany
   */
  export type PurchaseActivationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseActivations.
     */
    data: PurchaseActivationCreateManyInput | PurchaseActivationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PurchaseActivation update
   */
  export type PurchaseActivationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseActivation.
     */
    data: XOR<PurchaseActivationUpdateInput, PurchaseActivationUncheckedUpdateInput>
    /**
     * Choose, which PurchaseActivation to update.
     */
    where: PurchaseActivationWhereUniqueInput
  }

  /**
   * PurchaseActivation updateMany
   */
  export type PurchaseActivationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseActivations.
     */
    data: XOR<PurchaseActivationUpdateManyMutationInput, PurchaseActivationUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseActivations to update
     */
    where?: PurchaseActivationWhereInput
  }

  /**
   * PurchaseActivation upsert
   */
  export type PurchaseActivationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseActivation to update in case it exists.
     */
    where: PurchaseActivationWhereUniqueInput
    /**
     * In case the PurchaseActivation found by the `where` argument doesn't exist, create a new PurchaseActivation with this data.
     */
    create: XOR<PurchaseActivationCreateInput, PurchaseActivationUncheckedCreateInput>
    /**
     * In case the PurchaseActivation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseActivationUpdateInput, PurchaseActivationUncheckedUpdateInput>
  }

  /**
   * PurchaseActivation delete
   */
  export type PurchaseActivationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
    /**
     * Filter which PurchaseActivation to delete.
     */
    where: PurchaseActivationWhereUniqueInput
  }

  /**
   * PurchaseActivation deleteMany
   */
  export type PurchaseActivationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseActivations to delete
     */
    where?: PurchaseActivationWhereInput
  }

  /**
   * PurchaseActivation without action
   */
  export type PurchaseActivationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseActivation
     */
    select?: PurchaseActivationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseActivationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PurchaseScalarFieldEnum: {
    id: 'id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    code: 'code',
    number_of_vr_glasses: 'number_of_vr_glasses',
    number_of_licenses: 'number_of_licenses',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_subscription: 'is_subscription',
    duration: 'duration',
    order_number: 'order_number'
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const PurchaseActivationScalarFieldEnum: {
    id: 'id',
    purchase_id: 'purchase_id',
    activation_date: 'activation_date',
    updated_at: 'updated_at'
  };

  export type PurchaseActivationScalarFieldEnum = (typeof PurchaseActivationScalarFieldEnum)[keyof typeof PurchaseActivationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PurchaseWhereInput = {
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    id?: IntFilter<"Purchase"> | number
    email?: StringFilter<"Purchase"> | string
    first_name?: StringFilter<"Purchase"> | string
    last_name?: StringFilter<"Purchase"> | string
    code?: StringFilter<"Purchase"> | string
    number_of_vr_glasses?: IntFilter<"Purchase"> | number
    number_of_licenses?: IntFilter<"Purchase"> | number
    created_at?: DateTimeFilter<"Purchase"> | Date | string
    updated_at?: DateTimeFilter<"Purchase"> | Date | string
    is_subscription?: BoolFilter<"Purchase"> | boolean
    duration?: IntFilter<"Purchase"> | number
    order_number?: StringFilter<"Purchase"> | string
    activations?: PurchaseActivationListRelationFilter
  }

  export type PurchaseOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    code?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_subscription?: SortOrder
    duration?: SortOrder
    order_number?: SortOrder
    activations?: PurchaseActivationOrderByRelationAggregateInput
  }

  export type PurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    email?: StringFilter<"Purchase"> | string
    first_name?: StringFilter<"Purchase"> | string
    last_name?: StringFilter<"Purchase"> | string
    number_of_vr_glasses?: IntFilter<"Purchase"> | number
    number_of_licenses?: IntFilter<"Purchase"> | number
    created_at?: DateTimeFilter<"Purchase"> | Date | string
    updated_at?: DateTimeFilter<"Purchase"> | Date | string
    is_subscription?: BoolFilter<"Purchase"> | boolean
    duration?: IntFilter<"Purchase"> | number
    order_number?: StringFilter<"Purchase"> | string
    activations?: PurchaseActivationListRelationFilter
  }, "id" | "code">

  export type PurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    code?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_subscription?: SortOrder
    duration?: SortOrder
    order_number?: SortOrder
    _count?: PurchaseCountOrderByAggregateInput
    _avg?: PurchaseAvgOrderByAggregateInput
    _max?: PurchaseMaxOrderByAggregateInput
    _min?: PurchaseMinOrderByAggregateInput
    _sum?: PurchaseSumOrderByAggregateInput
  }

  export type PurchaseScalarWhereWithAggregatesInput = {
    AND?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    OR?: PurchaseScalarWhereWithAggregatesInput[]
    NOT?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Purchase"> | number
    email?: StringWithAggregatesFilter<"Purchase"> | string
    first_name?: StringWithAggregatesFilter<"Purchase"> | string
    last_name?: StringWithAggregatesFilter<"Purchase"> | string
    code?: StringWithAggregatesFilter<"Purchase"> | string
    number_of_vr_glasses?: IntWithAggregatesFilter<"Purchase"> | number
    number_of_licenses?: IntWithAggregatesFilter<"Purchase"> | number
    created_at?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
    is_subscription?: BoolWithAggregatesFilter<"Purchase"> | boolean
    duration?: IntWithAggregatesFilter<"Purchase"> | number
    order_number?: StringWithAggregatesFilter<"Purchase"> | string
  }

  export type PurchaseActivationWhereInput = {
    AND?: PurchaseActivationWhereInput | PurchaseActivationWhereInput[]
    OR?: PurchaseActivationWhereInput[]
    NOT?: PurchaseActivationWhereInput | PurchaseActivationWhereInput[]
    id?: IntFilter<"PurchaseActivation"> | number
    purchase_id?: IntFilter<"PurchaseActivation"> | number
    activation_date?: DateTimeFilter<"PurchaseActivation"> | Date | string
    updated_at?: DateTimeFilter<"PurchaseActivation"> | Date | string
    purchase?: XOR<PurchaseRelationFilter, PurchaseWhereInput>
  }

  export type PurchaseActivationOrderByWithRelationInput = {
    id?: SortOrder
    purchase_id?: SortOrder
    activation_date?: SortOrder
    updated_at?: SortOrder
    purchase?: PurchaseOrderByWithRelationInput
  }

  export type PurchaseActivationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PurchaseActivationWhereInput | PurchaseActivationWhereInput[]
    OR?: PurchaseActivationWhereInput[]
    NOT?: PurchaseActivationWhereInput | PurchaseActivationWhereInput[]
    purchase_id?: IntFilter<"PurchaseActivation"> | number
    activation_date?: DateTimeFilter<"PurchaseActivation"> | Date | string
    updated_at?: DateTimeFilter<"PurchaseActivation"> | Date | string
    purchase?: XOR<PurchaseRelationFilter, PurchaseWhereInput>
  }, "id">

  export type PurchaseActivationOrderByWithAggregationInput = {
    id?: SortOrder
    purchase_id?: SortOrder
    activation_date?: SortOrder
    updated_at?: SortOrder
    _count?: PurchaseActivationCountOrderByAggregateInput
    _avg?: PurchaseActivationAvgOrderByAggregateInput
    _max?: PurchaseActivationMaxOrderByAggregateInput
    _min?: PurchaseActivationMinOrderByAggregateInput
    _sum?: PurchaseActivationSumOrderByAggregateInput
  }

  export type PurchaseActivationScalarWhereWithAggregatesInput = {
    AND?: PurchaseActivationScalarWhereWithAggregatesInput | PurchaseActivationScalarWhereWithAggregatesInput[]
    OR?: PurchaseActivationScalarWhereWithAggregatesInput[]
    NOT?: PurchaseActivationScalarWhereWithAggregatesInput | PurchaseActivationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PurchaseActivation"> | number
    purchase_id?: IntWithAggregatesFilter<"PurchaseActivation"> | number
    activation_date?: DateTimeWithAggregatesFilter<"PurchaseActivation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PurchaseActivation"> | Date | string
  }

  export type PurchaseCreateInput = {
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at?: Date | string
    updated_at?: Date | string
    is_subscription?: boolean
    duration: number
    order_number: string
    activations?: PurchaseActivationCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateInput = {
    id?: number
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at?: Date | string
    updated_at?: Date | string
    is_subscription?: boolean
    duration: number
    order_number: string
    activations?: PurchaseActivationUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
    activations?: PurchaseActivationUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
    activations?: PurchaseActivationUncheckedUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseCreateManyInput = {
    id?: number
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at?: Date | string
    updated_at?: Date | string
    is_subscription?: boolean
    duration: number
    order_number: string
  }

  export type PurchaseUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseActivationCreateInput = {
    activation_date?: Date | string
    updated_at?: Date | string
    purchase: PurchaseCreateNestedOneWithoutActivationsInput
  }

  export type PurchaseActivationUncheckedCreateInput = {
    id?: number
    purchase_id: number
    activation_date?: Date | string
    updated_at?: Date | string
  }

  export type PurchaseActivationUpdateInput = {
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    purchase?: PurchaseUpdateOneRequiredWithoutActivationsNestedInput
  }

  export type PurchaseActivationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchase_id?: IntFieldUpdateOperationsInput | number
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseActivationCreateManyInput = {
    id?: number
    purchase_id: number
    activation_date?: Date | string
    updated_at?: Date | string
  }

  export type PurchaseActivationUpdateManyMutationInput = {
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseActivationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchase_id?: IntFieldUpdateOperationsInput | number
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PurchaseActivationListRelationFilter = {
    every?: PurchaseActivationWhereInput
    some?: PurchaseActivationWhereInput
    none?: PurchaseActivationWhereInput
  }

  export type PurchaseActivationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    code?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_subscription?: SortOrder
    duration?: SortOrder
    order_number?: SortOrder
  }

  export type PurchaseAvgOrderByAggregateInput = {
    id?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    duration?: SortOrder
  }

  export type PurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    code?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_subscription?: SortOrder
    duration?: SortOrder
    order_number?: SortOrder
  }

  export type PurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    code?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_subscription?: SortOrder
    duration?: SortOrder
    order_number?: SortOrder
  }

  export type PurchaseSumOrderByAggregateInput = {
    id?: SortOrder
    number_of_vr_glasses?: SortOrder
    number_of_licenses?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PurchaseRelationFilter = {
    is?: PurchaseWhereInput
    isNot?: PurchaseWhereInput
  }

  export type PurchaseActivationCountOrderByAggregateInput = {
    id?: SortOrder
    purchase_id?: SortOrder
    activation_date?: SortOrder
    updated_at?: SortOrder
  }

  export type PurchaseActivationAvgOrderByAggregateInput = {
    id?: SortOrder
    purchase_id?: SortOrder
  }

  export type PurchaseActivationMaxOrderByAggregateInput = {
    id?: SortOrder
    purchase_id?: SortOrder
    activation_date?: SortOrder
    updated_at?: SortOrder
  }

  export type PurchaseActivationMinOrderByAggregateInput = {
    id?: SortOrder
    purchase_id?: SortOrder
    activation_date?: SortOrder
    updated_at?: SortOrder
  }

  export type PurchaseActivationSumOrderByAggregateInput = {
    id?: SortOrder
    purchase_id?: SortOrder
  }

  export type PurchaseActivationCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput> | PurchaseActivationCreateWithoutPurchaseInput[] | PurchaseActivationUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseActivationCreateOrConnectWithoutPurchaseInput | PurchaseActivationCreateOrConnectWithoutPurchaseInput[]
    createMany?: PurchaseActivationCreateManyPurchaseInputEnvelope
    connect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
  }

  export type PurchaseActivationUncheckedCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput> | PurchaseActivationCreateWithoutPurchaseInput[] | PurchaseActivationUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseActivationCreateOrConnectWithoutPurchaseInput | PurchaseActivationCreateOrConnectWithoutPurchaseInput[]
    createMany?: PurchaseActivationCreateManyPurchaseInputEnvelope
    connect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PurchaseActivationUpdateManyWithoutPurchaseNestedInput = {
    create?: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput> | PurchaseActivationCreateWithoutPurchaseInput[] | PurchaseActivationUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseActivationCreateOrConnectWithoutPurchaseInput | PurchaseActivationCreateOrConnectWithoutPurchaseInput[]
    upsert?: PurchaseActivationUpsertWithWhereUniqueWithoutPurchaseInput | PurchaseActivationUpsertWithWhereUniqueWithoutPurchaseInput[]
    createMany?: PurchaseActivationCreateManyPurchaseInputEnvelope
    set?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    disconnect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    delete?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    connect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    update?: PurchaseActivationUpdateWithWhereUniqueWithoutPurchaseInput | PurchaseActivationUpdateWithWhereUniqueWithoutPurchaseInput[]
    updateMany?: PurchaseActivationUpdateManyWithWhereWithoutPurchaseInput | PurchaseActivationUpdateManyWithWhereWithoutPurchaseInput[]
    deleteMany?: PurchaseActivationScalarWhereInput | PurchaseActivationScalarWhereInput[]
  }

  export type PurchaseActivationUncheckedUpdateManyWithoutPurchaseNestedInput = {
    create?: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput> | PurchaseActivationCreateWithoutPurchaseInput[] | PurchaseActivationUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseActivationCreateOrConnectWithoutPurchaseInput | PurchaseActivationCreateOrConnectWithoutPurchaseInput[]
    upsert?: PurchaseActivationUpsertWithWhereUniqueWithoutPurchaseInput | PurchaseActivationUpsertWithWhereUniqueWithoutPurchaseInput[]
    createMany?: PurchaseActivationCreateManyPurchaseInputEnvelope
    set?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    disconnect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    delete?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    connect?: PurchaseActivationWhereUniqueInput | PurchaseActivationWhereUniqueInput[]
    update?: PurchaseActivationUpdateWithWhereUniqueWithoutPurchaseInput | PurchaseActivationUpdateWithWhereUniqueWithoutPurchaseInput[]
    updateMany?: PurchaseActivationUpdateManyWithWhereWithoutPurchaseInput | PurchaseActivationUpdateManyWithWhereWithoutPurchaseInput[]
    deleteMany?: PurchaseActivationScalarWhereInput | PurchaseActivationScalarWhereInput[]
  }

  export type PurchaseCreateNestedOneWithoutActivationsInput = {
    create?: XOR<PurchaseCreateWithoutActivationsInput, PurchaseUncheckedCreateWithoutActivationsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutActivationsInput
    connect?: PurchaseWhereUniqueInput
  }

  export type PurchaseUpdateOneRequiredWithoutActivationsNestedInput = {
    create?: XOR<PurchaseCreateWithoutActivationsInput, PurchaseUncheckedCreateWithoutActivationsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutActivationsInput
    upsert?: PurchaseUpsertWithoutActivationsInput
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutActivationsInput, PurchaseUpdateWithoutActivationsInput>, PurchaseUncheckedUpdateWithoutActivationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PurchaseActivationCreateWithoutPurchaseInput = {
    activation_date?: Date | string
    updated_at?: Date | string
  }

  export type PurchaseActivationUncheckedCreateWithoutPurchaseInput = {
    id?: number
    activation_date?: Date | string
    updated_at?: Date | string
  }

  export type PurchaseActivationCreateOrConnectWithoutPurchaseInput = {
    where: PurchaseActivationWhereUniqueInput
    create: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput>
  }

  export type PurchaseActivationCreateManyPurchaseInputEnvelope = {
    data: PurchaseActivationCreateManyPurchaseInput | PurchaseActivationCreateManyPurchaseInput[]
    skipDuplicates?: boolean
  }

  export type PurchaseActivationUpsertWithWhereUniqueWithoutPurchaseInput = {
    where: PurchaseActivationWhereUniqueInput
    update: XOR<PurchaseActivationUpdateWithoutPurchaseInput, PurchaseActivationUncheckedUpdateWithoutPurchaseInput>
    create: XOR<PurchaseActivationCreateWithoutPurchaseInput, PurchaseActivationUncheckedCreateWithoutPurchaseInput>
  }

  export type PurchaseActivationUpdateWithWhereUniqueWithoutPurchaseInput = {
    where: PurchaseActivationWhereUniqueInput
    data: XOR<PurchaseActivationUpdateWithoutPurchaseInput, PurchaseActivationUncheckedUpdateWithoutPurchaseInput>
  }

  export type PurchaseActivationUpdateManyWithWhereWithoutPurchaseInput = {
    where: PurchaseActivationScalarWhereInput
    data: XOR<PurchaseActivationUpdateManyMutationInput, PurchaseActivationUncheckedUpdateManyWithoutPurchaseInput>
  }

  export type PurchaseActivationScalarWhereInput = {
    AND?: PurchaseActivationScalarWhereInput | PurchaseActivationScalarWhereInput[]
    OR?: PurchaseActivationScalarWhereInput[]
    NOT?: PurchaseActivationScalarWhereInput | PurchaseActivationScalarWhereInput[]
    id?: IntFilter<"PurchaseActivation"> | number
    purchase_id?: IntFilter<"PurchaseActivation"> | number
    activation_date?: DateTimeFilter<"PurchaseActivation"> | Date | string
    updated_at?: DateTimeFilter<"PurchaseActivation"> | Date | string
  }

  export type PurchaseCreateWithoutActivationsInput = {
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at?: Date | string
    updated_at?: Date | string
    is_subscription?: boolean
    duration: number
    order_number: string
  }

  export type PurchaseUncheckedCreateWithoutActivationsInput = {
    id?: number
    email: string
    first_name: string
    last_name: string
    code: string
    number_of_vr_glasses: number
    number_of_licenses: number
    created_at?: Date | string
    updated_at?: Date | string
    is_subscription?: boolean
    duration: number
    order_number: string
  }

  export type PurchaseCreateOrConnectWithoutActivationsInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutActivationsInput, PurchaseUncheckedCreateWithoutActivationsInput>
  }

  export type PurchaseUpsertWithoutActivationsInput = {
    update: XOR<PurchaseUpdateWithoutActivationsInput, PurchaseUncheckedUpdateWithoutActivationsInput>
    create: XOR<PurchaseCreateWithoutActivationsInput, PurchaseUncheckedCreateWithoutActivationsInput>
    where?: PurchaseWhereInput
  }

  export type PurchaseUpdateToOneWithWhereWithoutActivationsInput = {
    where?: PurchaseWhereInput
    data: XOR<PurchaseUpdateWithoutActivationsInput, PurchaseUncheckedUpdateWithoutActivationsInput>
  }

  export type PurchaseUpdateWithoutActivationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseUncheckedUpdateWithoutActivationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    number_of_vr_glasses?: IntFieldUpdateOperationsInput | number
    number_of_licenses?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_subscription?: BoolFieldUpdateOperationsInput | boolean
    duration?: IntFieldUpdateOperationsInput | number
    order_number?: StringFieldUpdateOperationsInput | string
  }

  export type PurchaseActivationCreateManyPurchaseInput = {
    id?: number
    activation_date?: Date | string
    updated_at?: Date | string
  }

  export type PurchaseActivationUpdateWithoutPurchaseInput = {
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseActivationUncheckedUpdateWithoutPurchaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseActivationUncheckedUpdateManyWithoutPurchaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    activation_date?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PurchaseCountOutputTypeDefaultArgs instead
     */
    export type PurchaseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseDefaultArgs instead
     */
    export type PurchaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseActivationDefaultArgs instead
     */
    export type PurchaseActivationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseActivationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}