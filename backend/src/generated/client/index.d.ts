
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Proyecto
 * 
 */
export type Proyecto = $Result.DefaultSelection<Prisma.$ProyectoPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Troncal
 * 
 */
export type Troncal = $Result.DefaultSelection<Prisma.$TroncalPayload>
/**
 * Model Mufa
 * 
 */
export type Mufa = $Result.DefaultSelection<Prisma.$MufaPayload>
/**
 * Model Caja
 * 
 */
export type Caja = $Result.DefaultSelection<Prisma.$CajaPayload>
/**
 * Model Poste
 * 
 */
export type Poste = $Result.DefaultSelection<Prisma.$PostePayload>
/**
 * Model TramoCable
 * 
 */
export type TramoCable = $Result.DefaultSelection<Prisma.$TramoCablePayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Averia
 * 
 */
export type Averia = $Result.DefaultSelection<Prisma.$AveriaPayload>
/**
 * Model Pago
 * 
 */
export type Pago = $Result.DefaultSelection<Prisma.$PagoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Rol: {
  ADMIN: 'ADMIN',
  TECNICO: 'TECNICO'
};

export type Rol = (typeof Rol)[keyof typeof Rol]

}

export type Rol = $Enums.Rol

export const Rol: typeof $Enums.Rol

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Proyectos
 * const proyectos = await prisma.proyecto.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Proyectos
   * const proyectos = await prisma.proyecto.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.proyecto`: Exposes CRUD operations for the **Proyecto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proyectos
    * const proyectos = await prisma.proyecto.findMany()
    * ```
    */
  get proyecto(): Prisma.ProyectoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.troncal`: Exposes CRUD operations for the **Troncal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Troncals
    * const troncals = await prisma.troncal.findMany()
    * ```
    */
  get troncal(): Prisma.TroncalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mufa`: Exposes CRUD operations for the **Mufa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mufas
    * const mufas = await prisma.mufa.findMany()
    * ```
    */
  get mufa(): Prisma.MufaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caja`: Exposes CRUD operations for the **Caja** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cajas
    * const cajas = await prisma.caja.findMany()
    * ```
    */
  get caja(): Prisma.CajaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poste`: Exposes CRUD operations for the **Poste** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Postes
    * const postes = await prisma.poste.findMany()
    * ```
    */
  get poste(): Prisma.PosteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tramoCable`: Exposes CRUD operations for the **TramoCable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TramoCables
    * const tramoCables = await prisma.tramoCable.findMany()
    * ```
    */
  get tramoCable(): Prisma.TramoCableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.averia`: Exposes CRUD operations for the **Averia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Averias
    * const averias = await prisma.averia.findMany()
    * ```
    */
  get averia(): Prisma.AveriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pago`: Exposes CRUD operations for the **Pago** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pago.findMany()
    * ```
    */
  get pago(): Prisma.PagoDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Proyecto: 'Proyecto',
    Usuario: 'Usuario',
    Troncal: 'Troncal',
    Mufa: 'Mufa',
    Caja: 'Caja',
    Poste: 'Poste',
    TramoCable: 'TramoCable',
    Cliente: 'Cliente',
    Averia: 'Averia',
    Pago: 'Pago'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "proyecto" | "usuario" | "troncal" | "mufa" | "caja" | "poste" | "tramoCable" | "cliente" | "averia" | "pago"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Proyecto: {
        payload: Prisma.$ProyectoPayload<ExtArgs>
        fields: Prisma.ProyectoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProyectoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProyectoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          findFirst: {
            args: Prisma.ProyectoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProyectoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          findMany: {
            args: Prisma.ProyectoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>[]
          }
          create: {
            args: Prisma.ProyectoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          createMany: {
            args: Prisma.ProyectoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProyectoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          update: {
            args: Prisma.ProyectoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          deleteMany: {
            args: Prisma.ProyectoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProyectoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProyectoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          aggregate: {
            args: Prisma.ProyectoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProyecto>
          }
          groupBy: {
            args: Prisma.ProyectoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProyectoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProyectoCountArgs<ExtArgs>
            result: $Utils.Optional<ProyectoCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Troncal: {
        payload: Prisma.$TroncalPayload<ExtArgs>
        fields: Prisma.TroncalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TroncalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TroncalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          findFirst: {
            args: Prisma.TroncalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TroncalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          findMany: {
            args: Prisma.TroncalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>[]
          }
          create: {
            args: Prisma.TroncalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          createMany: {
            args: Prisma.TroncalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TroncalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          update: {
            args: Prisma.TroncalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          deleteMany: {
            args: Prisma.TroncalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TroncalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TroncalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TroncalPayload>
          }
          aggregate: {
            args: Prisma.TroncalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTroncal>
          }
          groupBy: {
            args: Prisma.TroncalGroupByArgs<ExtArgs>
            result: $Utils.Optional<TroncalGroupByOutputType>[]
          }
          count: {
            args: Prisma.TroncalCountArgs<ExtArgs>
            result: $Utils.Optional<TroncalCountAggregateOutputType> | number
          }
        }
      }
      Mufa: {
        payload: Prisma.$MufaPayload<ExtArgs>
        fields: Prisma.MufaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MufaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MufaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          findFirst: {
            args: Prisma.MufaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MufaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          findMany: {
            args: Prisma.MufaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>[]
          }
          create: {
            args: Prisma.MufaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          createMany: {
            args: Prisma.MufaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MufaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          update: {
            args: Prisma.MufaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          deleteMany: {
            args: Prisma.MufaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MufaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MufaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MufaPayload>
          }
          aggregate: {
            args: Prisma.MufaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMufa>
          }
          groupBy: {
            args: Prisma.MufaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MufaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MufaCountArgs<ExtArgs>
            result: $Utils.Optional<MufaCountAggregateOutputType> | number
          }
        }
      }
      Caja: {
        payload: Prisma.$CajaPayload<ExtArgs>
        fields: Prisma.CajaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CajaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CajaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          findFirst: {
            args: Prisma.CajaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CajaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          findMany: {
            args: Prisma.CajaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>[]
          }
          create: {
            args: Prisma.CajaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          createMany: {
            args: Prisma.CajaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CajaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          update: {
            args: Prisma.CajaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          deleteMany: {
            args: Prisma.CajaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CajaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CajaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CajaPayload>
          }
          aggregate: {
            args: Prisma.CajaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaja>
          }
          groupBy: {
            args: Prisma.CajaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CajaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CajaCountArgs<ExtArgs>
            result: $Utils.Optional<CajaCountAggregateOutputType> | number
          }
        }
      }
      Poste: {
        payload: Prisma.$PostePayload<ExtArgs>
        fields: Prisma.PosteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PosteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PosteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          findFirst: {
            args: Prisma.PosteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PosteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          findMany: {
            args: Prisma.PosteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>[]
          }
          create: {
            args: Prisma.PosteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          createMany: {
            args: Prisma.PosteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PosteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          update: {
            args: Prisma.PosteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          deleteMany: {
            args: Prisma.PosteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PosteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PosteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostePayload>
          }
          aggregate: {
            args: Prisma.PosteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoste>
          }
          groupBy: {
            args: Prisma.PosteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PosteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PosteCountArgs<ExtArgs>
            result: $Utils.Optional<PosteCountAggregateOutputType> | number
          }
        }
      }
      TramoCable: {
        payload: Prisma.$TramoCablePayload<ExtArgs>
        fields: Prisma.TramoCableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TramoCableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TramoCableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          findFirst: {
            args: Prisma.TramoCableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TramoCableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          findMany: {
            args: Prisma.TramoCableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>[]
          }
          create: {
            args: Prisma.TramoCableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          createMany: {
            args: Prisma.TramoCableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TramoCableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          update: {
            args: Prisma.TramoCableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          deleteMany: {
            args: Prisma.TramoCableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TramoCableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TramoCableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TramoCablePayload>
          }
          aggregate: {
            args: Prisma.TramoCableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTramoCable>
          }
          groupBy: {
            args: Prisma.TramoCableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TramoCableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TramoCableCountArgs<ExtArgs>
            result: $Utils.Optional<TramoCableCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Averia: {
        payload: Prisma.$AveriaPayload<ExtArgs>
        fields: Prisma.AveriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AveriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AveriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          findFirst: {
            args: Prisma.AveriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AveriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          findMany: {
            args: Prisma.AveriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>[]
          }
          create: {
            args: Prisma.AveriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          createMany: {
            args: Prisma.AveriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AveriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          update: {
            args: Prisma.AveriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          deleteMany: {
            args: Prisma.AveriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AveriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AveriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AveriaPayload>
          }
          aggregate: {
            args: Prisma.AveriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAveria>
          }
          groupBy: {
            args: Prisma.AveriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AveriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AveriaCountArgs<ExtArgs>
            result: $Utils.Optional<AveriaCountAggregateOutputType> | number
          }
        }
      }
      Pago: {
        payload: Prisma.$PagoPayload<ExtArgs>
        fields: Prisma.PagoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findFirst: {
            args: Prisma.PagoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findMany: {
            args: Prisma.PagoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          create: {
            args: Prisma.PagoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          createMany: {
            args: Prisma.PagoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PagoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          update: {
            args: Prisma.PagoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          deleteMany: {
            args: Prisma.PagoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PagoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          aggregate: {
            args: Prisma.PagoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePago>
          }
          groupBy: {
            args: Prisma.PagoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    proyecto?: ProyectoOmit
    usuario?: UsuarioOmit
    troncal?: TroncalOmit
    mufa?: MufaOmit
    caja?: CajaOmit
    poste?: PosteOmit
    tramoCable?: TramoCableOmit
    cliente?: ClienteOmit
    averia?: AveriaOmit
    pago?: PagoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type ProyectoCountOutputType
   */

  export type ProyectoCountOutputType = {
    tramos: number
    troncales: number
  }

  export type ProyectoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tramos?: boolean | ProyectoCountOutputTypeCountTramosArgs
    troncales?: boolean | ProyectoCountOutputTypeCountTroncalesArgs
  }

  // Custom InputTypes
  /**
   * ProyectoCountOutputType without action
   */
  export type ProyectoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProyectoCountOutputType
     */
    select?: ProyectoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProyectoCountOutputType without action
   */
  export type ProyectoCountOutputTypeCountTramosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
  }

  /**
   * ProyectoCountOutputType without action
   */
  export type ProyectoCountOutputTypeCountTroncalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TroncalWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    averiasAsignadas: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    averiasAsignadas?: boolean | UsuarioCountOutputTypeCountAveriasAsignadasArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAveriasAsignadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AveriaWhereInput
  }


  /**
   * Count Type TroncalCountOutputType
   */

  export type TroncalCountOutputType = {
    mufas: number
  }

  export type TroncalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mufas?: boolean | TroncalCountOutputTypeCountMufasArgs
  }

  // Custom InputTypes
  /**
   * TroncalCountOutputType without action
   */
  export type TroncalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TroncalCountOutputType
     */
    select?: TroncalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TroncalCountOutputType without action
   */
  export type TroncalCountOutputTypeCountMufasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MufaWhereInput
  }


  /**
   * Count Type MufaCountOutputType
   */

  export type MufaCountOutputType = {
    cajas: number
    tramosOrigen: number
  }

  export type MufaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cajas?: boolean | MufaCountOutputTypeCountCajasArgs
    tramosOrigen?: boolean | MufaCountOutputTypeCountTramosOrigenArgs
  }

  // Custom InputTypes
  /**
   * MufaCountOutputType without action
   */
  export type MufaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MufaCountOutputType
     */
    select?: MufaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MufaCountOutputType without action
   */
  export type MufaCountOutputTypeCountCajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CajaWhereInput
  }

  /**
   * MufaCountOutputType without action
   */
  export type MufaCountOutputTypeCountTramosOrigenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
  }


  /**
   * Count Type CajaCountOutputType
   */

  export type CajaCountOutputType = {
    clientes: number
    tramosDestino: number
  }

  export type CajaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clientes?: boolean | CajaCountOutputTypeCountClientesArgs
    tramosDestino?: boolean | CajaCountOutputTypeCountTramosDestinoArgs
  }

  // Custom InputTypes
  /**
   * CajaCountOutputType without action
   */
  export type CajaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CajaCountOutputType
     */
    select?: CajaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CajaCountOutputType without action
   */
  export type CajaCountOutputTypeCountClientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
  }

  /**
   * CajaCountOutputType without action
   */
  export type CajaCountOutputTypeCountTramosDestinoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
  }


  /**
   * Count Type PosteCountOutputType
   */

  export type PosteCountOutputType = {
    cajas: number
    mufas: number
    tramosFin: number
    tramosInicio: number
  }

  export type PosteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cajas?: boolean | PosteCountOutputTypeCountCajasArgs
    mufas?: boolean | PosteCountOutputTypeCountMufasArgs
    tramosFin?: boolean | PosteCountOutputTypeCountTramosFinArgs
    tramosInicio?: boolean | PosteCountOutputTypeCountTramosInicioArgs
  }

  // Custom InputTypes
  /**
   * PosteCountOutputType without action
   */
  export type PosteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosteCountOutputType
     */
    select?: PosteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PosteCountOutputType without action
   */
  export type PosteCountOutputTypeCountCajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CajaWhereInput
  }

  /**
   * PosteCountOutputType without action
   */
  export type PosteCountOutputTypeCountMufasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MufaWhereInput
  }

  /**
   * PosteCountOutputType without action
   */
  export type PosteCountOutputTypeCountTramosFinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
  }

  /**
   * PosteCountOutputType without action
   */
  export type PosteCountOutputTypeCountTramosInicioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
  }


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    averias: number
    pagos: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    averias?: boolean | ClienteCountOutputTypeCountAveriasArgs
    pagos?: boolean | ClienteCountOutputTypeCountPagosArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountAveriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AveriaWhereInput
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Proyecto
   */

  export type AggregateProyecto = {
    _count: ProyectoCountAggregateOutputType | null
    _min: ProyectoMinAggregateOutputType | null
    _max: ProyectoMaxAggregateOutputType | null
  }

  export type ProyectoMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    estado: string | null
    creadoEn: Date | null
  }

  export type ProyectoMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    descripcion: string | null
    estado: string | null
    creadoEn: Date | null
  }

  export type ProyectoCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    estado: number
    creadoEn: number
    _all: number
  }


  export type ProyectoMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    estado?: true
    creadoEn?: true
  }

  export type ProyectoMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    estado?: true
    creadoEn?: true
  }

  export type ProyectoCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    estado?: true
    creadoEn?: true
    _all?: true
  }

  export type ProyectoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyecto to aggregate.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proyectos
    **/
    _count?: true | ProyectoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProyectoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProyectoMaxAggregateInputType
  }

  export type GetProyectoAggregateType<T extends ProyectoAggregateArgs> = {
        [P in keyof T & keyof AggregateProyecto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProyecto[P]>
      : GetScalarType<T[P], AggregateProyecto[P]>
  }




  export type ProyectoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProyectoWhereInput
    orderBy?: ProyectoOrderByWithAggregationInput | ProyectoOrderByWithAggregationInput[]
    by: ProyectoScalarFieldEnum[] | ProyectoScalarFieldEnum
    having?: ProyectoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProyectoCountAggregateInputType | true
    _min?: ProyectoMinAggregateInputType
    _max?: ProyectoMaxAggregateInputType
  }

  export type ProyectoGroupByOutputType = {
    id: string
    nombre: string
    descripcion: string | null
    estado: string
    creadoEn: Date
    _count: ProyectoCountAggregateOutputType | null
    _min: ProyectoMinAggregateOutputType | null
    _max: ProyectoMaxAggregateOutputType | null
  }

  type GetProyectoGroupByPayload<T extends ProyectoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProyectoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProyectoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProyectoGroupByOutputType[P]>
            : GetScalarType<T[P], ProyectoGroupByOutputType[P]>
        }
      >
    >


  export type ProyectoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    estado?: boolean
    creadoEn?: boolean
    tramos?: boolean | Proyecto$tramosArgs<ExtArgs>
    troncales?: boolean | Proyecto$troncalesArgs<ExtArgs>
    _count?: boolean | ProyectoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyecto"]>



  export type ProyectoSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    estado?: boolean
    creadoEn?: boolean
  }

  export type ProyectoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "descripcion" | "estado" | "creadoEn", ExtArgs["result"]["proyecto"]>
  export type ProyectoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tramos?: boolean | Proyecto$tramosArgs<ExtArgs>
    troncales?: boolean | Proyecto$troncalesArgs<ExtArgs>
    _count?: boolean | ProyectoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProyectoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proyecto"
    objects: {
      tramos: Prisma.$TramoCablePayload<ExtArgs>[]
      troncales: Prisma.$TroncalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      descripcion: string | null
      estado: string
      creadoEn: Date
    }, ExtArgs["result"]["proyecto"]>
    composites: {}
  }

  type ProyectoGetPayload<S extends boolean | null | undefined | ProyectoDefaultArgs> = $Result.GetResult<Prisma.$ProyectoPayload, S>

  type ProyectoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProyectoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProyectoCountAggregateInputType | true
    }

  export interface ProyectoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proyecto'], meta: { name: 'Proyecto' } }
    /**
     * Find zero or one Proyecto that matches the filter.
     * @param {ProyectoFindUniqueArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProyectoFindUniqueArgs>(args: SelectSubset<T, ProyectoFindUniqueArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proyecto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProyectoFindUniqueOrThrowArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProyectoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProyectoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyecto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindFirstArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProyectoFindFirstArgs>(args?: SelectSubset<T, ProyectoFindFirstArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyecto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindFirstOrThrowArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProyectoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProyectoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proyectos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proyectos
     * const proyectos = await prisma.proyecto.findMany()
     * 
     * // Get first 10 Proyectos
     * const proyectos = await prisma.proyecto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proyectoWithIdOnly = await prisma.proyecto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProyectoFindManyArgs>(args?: SelectSubset<T, ProyectoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proyecto.
     * @param {ProyectoCreateArgs} args - Arguments to create a Proyecto.
     * @example
     * // Create one Proyecto
     * const Proyecto = await prisma.proyecto.create({
     *   data: {
     *     // ... data to create a Proyecto
     *   }
     * })
     * 
     */
    create<T extends ProyectoCreateArgs>(args: SelectSubset<T, ProyectoCreateArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proyectos.
     * @param {ProyectoCreateManyArgs} args - Arguments to create many Proyectos.
     * @example
     * // Create many Proyectos
     * const proyecto = await prisma.proyecto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProyectoCreateManyArgs>(args?: SelectSubset<T, ProyectoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Proyecto.
     * @param {ProyectoDeleteArgs} args - Arguments to delete one Proyecto.
     * @example
     * // Delete one Proyecto
     * const Proyecto = await prisma.proyecto.delete({
     *   where: {
     *     // ... filter to delete one Proyecto
     *   }
     * })
     * 
     */
    delete<T extends ProyectoDeleteArgs>(args: SelectSubset<T, ProyectoDeleteArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proyecto.
     * @param {ProyectoUpdateArgs} args - Arguments to update one Proyecto.
     * @example
     * // Update one Proyecto
     * const proyecto = await prisma.proyecto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProyectoUpdateArgs>(args: SelectSubset<T, ProyectoUpdateArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proyectos.
     * @param {ProyectoDeleteManyArgs} args - Arguments to filter Proyectos to delete.
     * @example
     * // Delete a few Proyectos
     * const { count } = await prisma.proyecto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProyectoDeleteManyArgs>(args?: SelectSubset<T, ProyectoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proyectos
     * const proyecto = await prisma.proyecto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProyectoUpdateManyArgs>(args: SelectSubset<T, ProyectoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proyecto.
     * @param {ProyectoUpsertArgs} args - Arguments to update or create a Proyecto.
     * @example
     * // Update or create a Proyecto
     * const proyecto = await prisma.proyecto.upsert({
     *   create: {
     *     // ... data to create a Proyecto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proyecto we want to update
     *   }
     * })
     */
    upsert<T extends ProyectoUpsertArgs>(args: SelectSubset<T, ProyectoUpsertArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoCountArgs} args - Arguments to filter Proyectos to count.
     * @example
     * // Count the number of Proyectos
     * const count = await prisma.proyecto.count({
     *   where: {
     *     // ... the filter for the Proyectos we want to count
     *   }
     * })
    **/
    count<T extends ProyectoCountArgs>(
      args?: Subset<T, ProyectoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProyectoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proyecto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProyectoAggregateArgs>(args: Subset<T, ProyectoAggregateArgs>): Prisma.PrismaPromise<GetProyectoAggregateType<T>>

    /**
     * Group by Proyecto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoGroupByArgs} args - Group by arguments.
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
      T extends ProyectoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProyectoGroupByArgs['orderBy'] }
        : { orderBy?: ProyectoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProyectoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProyectoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proyecto model
   */
  readonly fields: ProyectoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proyecto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProyectoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tramos<T extends Proyecto$tramosArgs<ExtArgs> = {}>(args?: Subset<T, Proyecto$tramosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    troncales<T extends Proyecto$troncalesArgs<ExtArgs> = {}>(args?: Subset<T, Proyecto$troncalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Proyecto model
   */
  interface ProyectoFieldRefs {
    readonly id: FieldRef<"Proyecto", 'String'>
    readonly nombre: FieldRef<"Proyecto", 'String'>
    readonly descripcion: FieldRef<"Proyecto", 'String'>
    readonly estado: FieldRef<"Proyecto", 'String'>
    readonly creadoEn: FieldRef<"Proyecto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Proyecto findUnique
   */
  export type ProyectoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto findUniqueOrThrow
   */
  export type ProyectoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto findFirst
   */
  export type ProyectoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto findFirstOrThrow
   */
  export type ProyectoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto findMany
   */
  export type ProyectoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto create
   */
  export type ProyectoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The data needed to create a Proyecto.
     */
    data: XOR<ProyectoCreateInput, ProyectoUncheckedCreateInput>
  }

  /**
   * Proyecto createMany
   */
  export type ProyectoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proyectos.
     */
    data: ProyectoCreateManyInput | ProyectoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proyecto update
   */
  export type ProyectoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The data needed to update a Proyecto.
     */
    data: XOR<ProyectoUpdateInput, ProyectoUncheckedUpdateInput>
    /**
     * Choose, which Proyecto to update.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto updateMany
   */
  export type ProyectoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proyectos.
     */
    data: XOR<ProyectoUpdateManyMutationInput, ProyectoUncheckedUpdateManyInput>
    /**
     * Filter which Proyectos to update
     */
    where?: ProyectoWhereInput
    /**
     * Limit how many Proyectos to update.
     */
    limit?: number
  }

  /**
   * Proyecto upsert
   */
  export type ProyectoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The filter to search for the Proyecto to update in case it exists.
     */
    where: ProyectoWhereUniqueInput
    /**
     * In case the Proyecto found by the `where` argument doesn't exist, create a new Proyecto with this data.
     */
    create: XOR<ProyectoCreateInput, ProyectoUncheckedCreateInput>
    /**
     * In case the Proyecto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProyectoUpdateInput, ProyectoUncheckedUpdateInput>
  }

  /**
   * Proyecto delete
   */
  export type ProyectoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter which Proyecto to delete.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto deleteMany
   */
  export type ProyectoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyectos to delete
     */
    where?: ProyectoWhereInput
    /**
     * Limit how many Proyectos to delete.
     */
    limit?: number
  }

  /**
   * Proyecto.tramos
   */
  export type Proyecto$tramosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    cursor?: TramoCableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * Proyecto.troncales
   */
  export type Proyecto$troncalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    where?: TroncalWhereInput
    orderBy?: TroncalOrderByWithRelationInput | TroncalOrderByWithRelationInput[]
    cursor?: TroncalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TroncalScalarFieldEnum | TroncalScalarFieldEnum[]
  }

  /**
   * Proyecto without action
   */
  export type ProyectoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    rol: $Enums.Rol | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    rol: $Enums.Rol | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    password: number
    rol: number
    activo: number
    creadoEn: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    activo?: true
    creadoEn?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    activo?: true
    creadoEn?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    activo?: true
    creadoEn?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nombre: string
    email: string
    password: string
    rol: $Enums.Rol
    activo: boolean
    creadoEn: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    activo?: boolean
    creadoEn?: boolean
    averiasAsignadas?: boolean | Usuario$averiasAsignadasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    activo?: boolean
    creadoEn?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "password" | "rol" | "activo" | "creadoEn", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    averiasAsignadas?: boolean | Usuario$averiasAsignadasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      averiasAsignadas: Prisma.$AveriaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string
      password: string
      rol: $Enums.Rol
      activo: boolean
      creadoEn: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    averiasAsignadas<T extends Usuario$averiasAsignadasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$averiasAsignadasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'Rol'>
    readonly activo: FieldRef<"Usuario", 'Boolean'>
    readonly creadoEn: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.averiasAsignadas
   */
  export type Usuario$averiasAsignadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    where?: AveriaWhereInput
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    cursor?: AveriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AveriaScalarFieldEnum | AveriaScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Troncal
   */

  export type AggregateTroncal = {
    _count: TroncalCountAggregateOutputType | null
    _avg: TroncalAvgAggregateOutputType | null
    _sum: TroncalSumAggregateOutputType | null
    _min: TroncalMinAggregateOutputType | null
    _max: TroncalMaxAggregateOutputType | null
  }

  export type TroncalAvgAggregateOutputType = {
    cantHilos: number | null
    hilosLibres: number | null
  }

  export type TroncalSumAggregateOutputType = {
    cantHilos: number | null
    hilosLibres: number | null
  }

  export type TroncalMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    bufferColor: string | null
    cantHilos: number | null
    hilosLibres: number | null
    descripcion: string | null
    ruta: string | null
    proyectoId: string | null
    creadoEn: Date | null
  }

  export type TroncalMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    bufferColor: string | null
    cantHilos: number | null
    hilosLibres: number | null
    descripcion: string | null
    ruta: string | null
    proyectoId: string | null
    creadoEn: Date | null
  }

  export type TroncalCountAggregateOutputType = {
    id: number
    nombre: number
    bufferColor: number
    cantHilos: number
    hilosLibres: number
    descripcion: number
    ruta: number
    proyectoId: number
    creadoEn: number
    _all: number
  }


  export type TroncalAvgAggregateInputType = {
    cantHilos?: true
    hilosLibres?: true
  }

  export type TroncalSumAggregateInputType = {
    cantHilos?: true
    hilosLibres?: true
  }

  export type TroncalMinAggregateInputType = {
    id?: true
    nombre?: true
    bufferColor?: true
    cantHilos?: true
    hilosLibres?: true
    descripcion?: true
    ruta?: true
    proyectoId?: true
    creadoEn?: true
  }

  export type TroncalMaxAggregateInputType = {
    id?: true
    nombre?: true
    bufferColor?: true
    cantHilos?: true
    hilosLibres?: true
    descripcion?: true
    ruta?: true
    proyectoId?: true
    creadoEn?: true
  }

  export type TroncalCountAggregateInputType = {
    id?: true
    nombre?: true
    bufferColor?: true
    cantHilos?: true
    hilosLibres?: true
    descripcion?: true
    ruta?: true
    proyectoId?: true
    creadoEn?: true
    _all?: true
  }

  export type TroncalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Troncal to aggregate.
     */
    where?: TroncalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Troncals to fetch.
     */
    orderBy?: TroncalOrderByWithRelationInput | TroncalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TroncalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Troncals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Troncals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Troncals
    **/
    _count?: true | TroncalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TroncalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TroncalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TroncalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TroncalMaxAggregateInputType
  }

  export type GetTroncalAggregateType<T extends TroncalAggregateArgs> = {
        [P in keyof T & keyof AggregateTroncal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTroncal[P]>
      : GetScalarType<T[P], AggregateTroncal[P]>
  }




  export type TroncalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TroncalWhereInput
    orderBy?: TroncalOrderByWithAggregationInput | TroncalOrderByWithAggregationInput[]
    by: TroncalScalarFieldEnum[] | TroncalScalarFieldEnum
    having?: TroncalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TroncalCountAggregateInputType | true
    _avg?: TroncalAvgAggregateInputType
    _sum?: TroncalSumAggregateInputType
    _min?: TroncalMinAggregateInputType
    _max?: TroncalMaxAggregateInputType
  }

  export type TroncalGroupByOutputType = {
    id: string
    nombre: string
    bufferColor: string
    cantHilos: number
    hilosLibres: number
    descripcion: string | null
    ruta: string | null
    proyectoId: string
    creadoEn: Date
    _count: TroncalCountAggregateOutputType | null
    _avg: TroncalAvgAggregateOutputType | null
    _sum: TroncalSumAggregateOutputType | null
    _min: TroncalMinAggregateOutputType | null
    _max: TroncalMaxAggregateOutputType | null
  }

  type GetTroncalGroupByPayload<T extends TroncalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TroncalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TroncalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TroncalGroupByOutputType[P]>
            : GetScalarType<T[P], TroncalGroupByOutputType[P]>
        }
      >
    >


  export type TroncalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    bufferColor?: boolean
    cantHilos?: boolean
    hilosLibres?: boolean
    descripcion?: boolean
    ruta?: boolean
    proyectoId?: boolean
    creadoEn?: boolean
    mufas?: boolean | Troncal$mufasArgs<ExtArgs>
    proyecto?: boolean | ProyectoDefaultArgs<ExtArgs>
    _count?: boolean | TroncalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["troncal"]>



  export type TroncalSelectScalar = {
    id?: boolean
    nombre?: boolean
    bufferColor?: boolean
    cantHilos?: boolean
    hilosLibres?: boolean
    descripcion?: boolean
    ruta?: boolean
    proyectoId?: boolean
    creadoEn?: boolean
  }

  export type TroncalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "bufferColor" | "cantHilos" | "hilosLibres" | "descripcion" | "ruta" | "proyectoId" | "creadoEn", ExtArgs["result"]["troncal"]>
  export type TroncalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mufas?: boolean | Troncal$mufasArgs<ExtArgs>
    proyecto?: boolean | ProyectoDefaultArgs<ExtArgs>
    _count?: boolean | TroncalCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TroncalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Troncal"
    objects: {
      mufas: Prisma.$MufaPayload<ExtArgs>[]
      proyecto: Prisma.$ProyectoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      bufferColor: string
      cantHilos: number
      hilosLibres: number
      descripcion: string | null
      ruta: string | null
      proyectoId: string
      creadoEn: Date
    }, ExtArgs["result"]["troncal"]>
    composites: {}
  }

  type TroncalGetPayload<S extends boolean | null | undefined | TroncalDefaultArgs> = $Result.GetResult<Prisma.$TroncalPayload, S>

  type TroncalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TroncalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TroncalCountAggregateInputType | true
    }

  export interface TroncalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Troncal'], meta: { name: 'Troncal' } }
    /**
     * Find zero or one Troncal that matches the filter.
     * @param {TroncalFindUniqueArgs} args - Arguments to find a Troncal
     * @example
     * // Get one Troncal
     * const troncal = await prisma.troncal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TroncalFindUniqueArgs>(args: SelectSubset<T, TroncalFindUniqueArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Troncal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TroncalFindUniqueOrThrowArgs} args - Arguments to find a Troncal
     * @example
     * // Get one Troncal
     * const troncal = await prisma.troncal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TroncalFindUniqueOrThrowArgs>(args: SelectSubset<T, TroncalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Troncal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalFindFirstArgs} args - Arguments to find a Troncal
     * @example
     * // Get one Troncal
     * const troncal = await prisma.troncal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TroncalFindFirstArgs>(args?: SelectSubset<T, TroncalFindFirstArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Troncal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalFindFirstOrThrowArgs} args - Arguments to find a Troncal
     * @example
     * // Get one Troncal
     * const troncal = await prisma.troncal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TroncalFindFirstOrThrowArgs>(args?: SelectSubset<T, TroncalFindFirstOrThrowArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Troncals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Troncals
     * const troncals = await prisma.troncal.findMany()
     * 
     * // Get first 10 Troncals
     * const troncals = await prisma.troncal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const troncalWithIdOnly = await prisma.troncal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TroncalFindManyArgs>(args?: SelectSubset<T, TroncalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Troncal.
     * @param {TroncalCreateArgs} args - Arguments to create a Troncal.
     * @example
     * // Create one Troncal
     * const Troncal = await prisma.troncal.create({
     *   data: {
     *     // ... data to create a Troncal
     *   }
     * })
     * 
     */
    create<T extends TroncalCreateArgs>(args: SelectSubset<T, TroncalCreateArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Troncals.
     * @param {TroncalCreateManyArgs} args - Arguments to create many Troncals.
     * @example
     * // Create many Troncals
     * const troncal = await prisma.troncal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TroncalCreateManyArgs>(args?: SelectSubset<T, TroncalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Troncal.
     * @param {TroncalDeleteArgs} args - Arguments to delete one Troncal.
     * @example
     * // Delete one Troncal
     * const Troncal = await prisma.troncal.delete({
     *   where: {
     *     // ... filter to delete one Troncal
     *   }
     * })
     * 
     */
    delete<T extends TroncalDeleteArgs>(args: SelectSubset<T, TroncalDeleteArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Troncal.
     * @param {TroncalUpdateArgs} args - Arguments to update one Troncal.
     * @example
     * // Update one Troncal
     * const troncal = await prisma.troncal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TroncalUpdateArgs>(args: SelectSubset<T, TroncalUpdateArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Troncals.
     * @param {TroncalDeleteManyArgs} args - Arguments to filter Troncals to delete.
     * @example
     * // Delete a few Troncals
     * const { count } = await prisma.troncal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TroncalDeleteManyArgs>(args?: SelectSubset<T, TroncalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Troncals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Troncals
     * const troncal = await prisma.troncal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TroncalUpdateManyArgs>(args: SelectSubset<T, TroncalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Troncal.
     * @param {TroncalUpsertArgs} args - Arguments to update or create a Troncal.
     * @example
     * // Update or create a Troncal
     * const troncal = await prisma.troncal.upsert({
     *   create: {
     *     // ... data to create a Troncal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Troncal we want to update
     *   }
     * })
     */
    upsert<T extends TroncalUpsertArgs>(args: SelectSubset<T, TroncalUpsertArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Troncals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalCountArgs} args - Arguments to filter Troncals to count.
     * @example
     * // Count the number of Troncals
     * const count = await prisma.troncal.count({
     *   where: {
     *     // ... the filter for the Troncals we want to count
     *   }
     * })
    **/
    count<T extends TroncalCountArgs>(
      args?: Subset<T, TroncalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TroncalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Troncal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TroncalAggregateArgs>(args: Subset<T, TroncalAggregateArgs>): Prisma.PrismaPromise<GetTroncalAggregateType<T>>

    /**
     * Group by Troncal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TroncalGroupByArgs} args - Group by arguments.
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
      T extends TroncalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TroncalGroupByArgs['orderBy'] }
        : { orderBy?: TroncalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TroncalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTroncalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Troncal model
   */
  readonly fields: TroncalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Troncal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TroncalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mufas<T extends Troncal$mufasArgs<ExtArgs> = {}>(args?: Subset<T, Troncal$mufasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proyecto<T extends ProyectoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProyectoDefaultArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Troncal model
   */
  interface TroncalFieldRefs {
    readonly id: FieldRef<"Troncal", 'String'>
    readonly nombre: FieldRef<"Troncal", 'String'>
    readonly bufferColor: FieldRef<"Troncal", 'String'>
    readonly cantHilos: FieldRef<"Troncal", 'Int'>
    readonly hilosLibres: FieldRef<"Troncal", 'Int'>
    readonly descripcion: FieldRef<"Troncal", 'String'>
    readonly ruta: FieldRef<"Troncal", 'String'>
    readonly proyectoId: FieldRef<"Troncal", 'String'>
    readonly creadoEn: FieldRef<"Troncal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Troncal findUnique
   */
  export type TroncalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter, which Troncal to fetch.
     */
    where: TroncalWhereUniqueInput
  }

  /**
   * Troncal findUniqueOrThrow
   */
  export type TroncalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter, which Troncal to fetch.
     */
    where: TroncalWhereUniqueInput
  }

  /**
   * Troncal findFirst
   */
  export type TroncalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter, which Troncal to fetch.
     */
    where?: TroncalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Troncals to fetch.
     */
    orderBy?: TroncalOrderByWithRelationInput | TroncalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Troncals.
     */
    cursor?: TroncalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Troncals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Troncals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Troncals.
     */
    distinct?: TroncalScalarFieldEnum | TroncalScalarFieldEnum[]
  }

  /**
   * Troncal findFirstOrThrow
   */
  export type TroncalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter, which Troncal to fetch.
     */
    where?: TroncalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Troncals to fetch.
     */
    orderBy?: TroncalOrderByWithRelationInput | TroncalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Troncals.
     */
    cursor?: TroncalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Troncals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Troncals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Troncals.
     */
    distinct?: TroncalScalarFieldEnum | TroncalScalarFieldEnum[]
  }

  /**
   * Troncal findMany
   */
  export type TroncalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter, which Troncals to fetch.
     */
    where?: TroncalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Troncals to fetch.
     */
    orderBy?: TroncalOrderByWithRelationInput | TroncalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Troncals.
     */
    cursor?: TroncalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Troncals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Troncals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Troncals.
     */
    distinct?: TroncalScalarFieldEnum | TroncalScalarFieldEnum[]
  }

  /**
   * Troncal create
   */
  export type TroncalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * The data needed to create a Troncal.
     */
    data: XOR<TroncalCreateInput, TroncalUncheckedCreateInput>
  }

  /**
   * Troncal createMany
   */
  export type TroncalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Troncals.
     */
    data: TroncalCreateManyInput | TroncalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Troncal update
   */
  export type TroncalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * The data needed to update a Troncal.
     */
    data: XOR<TroncalUpdateInput, TroncalUncheckedUpdateInput>
    /**
     * Choose, which Troncal to update.
     */
    where: TroncalWhereUniqueInput
  }

  /**
   * Troncal updateMany
   */
  export type TroncalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Troncals.
     */
    data: XOR<TroncalUpdateManyMutationInput, TroncalUncheckedUpdateManyInput>
    /**
     * Filter which Troncals to update
     */
    where?: TroncalWhereInput
    /**
     * Limit how many Troncals to update.
     */
    limit?: number
  }

  /**
   * Troncal upsert
   */
  export type TroncalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * The filter to search for the Troncal to update in case it exists.
     */
    where: TroncalWhereUniqueInput
    /**
     * In case the Troncal found by the `where` argument doesn't exist, create a new Troncal with this data.
     */
    create: XOR<TroncalCreateInput, TroncalUncheckedCreateInput>
    /**
     * In case the Troncal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TroncalUpdateInput, TroncalUncheckedUpdateInput>
  }

  /**
   * Troncal delete
   */
  export type TroncalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
    /**
     * Filter which Troncal to delete.
     */
    where: TroncalWhereUniqueInput
  }

  /**
   * Troncal deleteMany
   */
  export type TroncalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Troncals to delete
     */
    where?: TroncalWhereInput
    /**
     * Limit how many Troncals to delete.
     */
    limit?: number
  }

  /**
   * Troncal.mufas
   */
  export type Troncal$mufasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    where?: MufaWhereInput
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    cursor?: MufaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MufaScalarFieldEnum | MufaScalarFieldEnum[]
  }

  /**
   * Troncal without action
   */
  export type TroncalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Troncal
     */
    select?: TroncalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Troncal
     */
    omit?: TroncalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TroncalInclude<ExtArgs> | null
  }


  /**
   * Model Mufa
   */

  export type AggregateMufa = {
    _count: MufaCountAggregateOutputType | null
    _avg: MufaAvgAggregateOutputType | null
    _sum: MufaSumAggregateOutputType | null
    _min: MufaMinAggregateOutputType | null
    _max: MufaMaxAggregateOutputType | null
  }

  export type MufaAvgAggregateOutputType = {
    latitud: number | null
    longitud: number | null
    hiloEntrada: number | null
    hilosDisponibles: number | null
  }

  export type MufaSumAggregateOutputType = {
    latitud: number | null
    longitud: number | null
    hiloEntrada: number | null
    hilosDisponibles: number | null
  }

  export type MufaMinAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    bufferEntrada: string | null
    hiloEntrada: number | null
    ratioSplitteo: string | null
    hilosDisponibles: number | null
    troncalId: string | null
    posteId: string | null
    creadoEn: Date | null
  }

  export type MufaMaxAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    bufferEntrada: string | null
    hiloEntrada: number | null
    ratioSplitteo: string | null
    hilosDisponibles: number | null
    troncalId: string | null
    posteId: string | null
    creadoEn: Date | null
  }

  export type MufaCountAggregateOutputType = {
    id: number
    codigo: number
    latitud: number
    longitud: number
    bufferEntrada: number
    hiloEntrada: number
    ratioSplitteo: number
    hilosDisponibles: number
    troncalId: number
    posteId: number
    creadoEn: number
    _all: number
  }


  export type MufaAvgAggregateInputType = {
    latitud?: true
    longitud?: true
    hiloEntrada?: true
    hilosDisponibles?: true
  }

  export type MufaSumAggregateInputType = {
    latitud?: true
    longitud?: true
    hiloEntrada?: true
    hilosDisponibles?: true
  }

  export type MufaMinAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    bufferEntrada?: true
    hiloEntrada?: true
    ratioSplitteo?: true
    hilosDisponibles?: true
    troncalId?: true
    posteId?: true
    creadoEn?: true
  }

  export type MufaMaxAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    bufferEntrada?: true
    hiloEntrada?: true
    ratioSplitteo?: true
    hilosDisponibles?: true
    troncalId?: true
    posteId?: true
    creadoEn?: true
  }

  export type MufaCountAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    bufferEntrada?: true
    hiloEntrada?: true
    ratioSplitteo?: true
    hilosDisponibles?: true
    troncalId?: true
    posteId?: true
    creadoEn?: true
    _all?: true
  }

  export type MufaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mufa to aggregate.
     */
    where?: MufaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mufas to fetch.
     */
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MufaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mufas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mufas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mufas
    **/
    _count?: true | MufaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MufaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MufaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MufaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MufaMaxAggregateInputType
  }

  export type GetMufaAggregateType<T extends MufaAggregateArgs> = {
        [P in keyof T & keyof AggregateMufa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMufa[P]>
      : GetScalarType<T[P], AggregateMufa[P]>
  }




  export type MufaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MufaWhereInput
    orderBy?: MufaOrderByWithAggregationInput | MufaOrderByWithAggregationInput[]
    by: MufaScalarFieldEnum[] | MufaScalarFieldEnum
    having?: MufaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MufaCountAggregateInputType | true
    _avg?: MufaAvgAggregateInputType
    _sum?: MufaSumAggregateInputType
    _min?: MufaMinAggregateInputType
    _max?: MufaMaxAggregateInputType
  }

  export type MufaGroupByOutputType = {
    id: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo: string
    hilosDisponibles: number
    troncalId: string
    posteId: string
    creadoEn: Date
    _count: MufaCountAggregateOutputType | null
    _avg: MufaAvgAggregateOutputType | null
    _sum: MufaSumAggregateOutputType | null
    _min: MufaMinAggregateOutputType | null
    _max: MufaMaxAggregateOutputType | null
  }

  type GetMufaGroupByPayload<T extends MufaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MufaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MufaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MufaGroupByOutputType[P]>
            : GetScalarType<T[P], MufaGroupByOutputType[P]>
        }
      >
    >


  export type MufaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    bufferEntrada?: boolean
    hiloEntrada?: boolean
    ratioSplitteo?: boolean
    hilosDisponibles?: boolean
    troncalId?: boolean
    posteId?: boolean
    creadoEn?: boolean
    cajas?: boolean | Mufa$cajasArgs<ExtArgs>
    poste?: boolean | PosteDefaultArgs<ExtArgs>
    troncal?: boolean | TroncalDefaultArgs<ExtArgs>
    tramosOrigen?: boolean | Mufa$tramosOrigenArgs<ExtArgs>
    _count?: boolean | MufaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mufa"]>



  export type MufaSelectScalar = {
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    bufferEntrada?: boolean
    hiloEntrada?: boolean
    ratioSplitteo?: boolean
    hilosDisponibles?: boolean
    troncalId?: boolean
    posteId?: boolean
    creadoEn?: boolean
  }

  export type MufaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "latitud" | "longitud" | "bufferEntrada" | "hiloEntrada" | "ratioSplitteo" | "hilosDisponibles" | "troncalId" | "posteId" | "creadoEn", ExtArgs["result"]["mufa"]>
  export type MufaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cajas?: boolean | Mufa$cajasArgs<ExtArgs>
    poste?: boolean | PosteDefaultArgs<ExtArgs>
    troncal?: boolean | TroncalDefaultArgs<ExtArgs>
    tramosOrigen?: boolean | Mufa$tramosOrigenArgs<ExtArgs>
    _count?: boolean | MufaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MufaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mufa"
    objects: {
      cajas: Prisma.$CajaPayload<ExtArgs>[]
      poste: Prisma.$PostePayload<ExtArgs>
      troncal: Prisma.$TroncalPayload<ExtArgs>
      tramosOrigen: Prisma.$TramoCablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigo: string
      latitud: number
      longitud: number
      bufferEntrada: string
      hiloEntrada: number
      ratioSplitteo: string
      hilosDisponibles: number
      troncalId: string
      posteId: string
      creadoEn: Date
    }, ExtArgs["result"]["mufa"]>
    composites: {}
  }

  type MufaGetPayload<S extends boolean | null | undefined | MufaDefaultArgs> = $Result.GetResult<Prisma.$MufaPayload, S>

  type MufaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MufaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MufaCountAggregateInputType | true
    }

  export interface MufaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mufa'], meta: { name: 'Mufa' } }
    /**
     * Find zero or one Mufa that matches the filter.
     * @param {MufaFindUniqueArgs} args - Arguments to find a Mufa
     * @example
     * // Get one Mufa
     * const mufa = await prisma.mufa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MufaFindUniqueArgs>(args: SelectSubset<T, MufaFindUniqueArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mufa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MufaFindUniqueOrThrowArgs} args - Arguments to find a Mufa
     * @example
     * // Get one Mufa
     * const mufa = await prisma.mufa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MufaFindUniqueOrThrowArgs>(args: SelectSubset<T, MufaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mufa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaFindFirstArgs} args - Arguments to find a Mufa
     * @example
     * // Get one Mufa
     * const mufa = await prisma.mufa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MufaFindFirstArgs>(args?: SelectSubset<T, MufaFindFirstArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mufa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaFindFirstOrThrowArgs} args - Arguments to find a Mufa
     * @example
     * // Get one Mufa
     * const mufa = await prisma.mufa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MufaFindFirstOrThrowArgs>(args?: SelectSubset<T, MufaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mufas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mufas
     * const mufas = await prisma.mufa.findMany()
     * 
     * // Get first 10 Mufas
     * const mufas = await prisma.mufa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mufaWithIdOnly = await prisma.mufa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MufaFindManyArgs>(args?: SelectSubset<T, MufaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mufa.
     * @param {MufaCreateArgs} args - Arguments to create a Mufa.
     * @example
     * // Create one Mufa
     * const Mufa = await prisma.mufa.create({
     *   data: {
     *     // ... data to create a Mufa
     *   }
     * })
     * 
     */
    create<T extends MufaCreateArgs>(args: SelectSubset<T, MufaCreateArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mufas.
     * @param {MufaCreateManyArgs} args - Arguments to create many Mufas.
     * @example
     * // Create many Mufas
     * const mufa = await prisma.mufa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MufaCreateManyArgs>(args?: SelectSubset<T, MufaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mufa.
     * @param {MufaDeleteArgs} args - Arguments to delete one Mufa.
     * @example
     * // Delete one Mufa
     * const Mufa = await prisma.mufa.delete({
     *   where: {
     *     // ... filter to delete one Mufa
     *   }
     * })
     * 
     */
    delete<T extends MufaDeleteArgs>(args: SelectSubset<T, MufaDeleteArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mufa.
     * @param {MufaUpdateArgs} args - Arguments to update one Mufa.
     * @example
     * // Update one Mufa
     * const mufa = await prisma.mufa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MufaUpdateArgs>(args: SelectSubset<T, MufaUpdateArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mufas.
     * @param {MufaDeleteManyArgs} args - Arguments to filter Mufas to delete.
     * @example
     * // Delete a few Mufas
     * const { count } = await prisma.mufa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MufaDeleteManyArgs>(args?: SelectSubset<T, MufaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mufas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mufas
     * const mufa = await prisma.mufa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MufaUpdateManyArgs>(args: SelectSubset<T, MufaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mufa.
     * @param {MufaUpsertArgs} args - Arguments to update or create a Mufa.
     * @example
     * // Update or create a Mufa
     * const mufa = await prisma.mufa.upsert({
     *   create: {
     *     // ... data to create a Mufa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mufa we want to update
     *   }
     * })
     */
    upsert<T extends MufaUpsertArgs>(args: SelectSubset<T, MufaUpsertArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mufas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaCountArgs} args - Arguments to filter Mufas to count.
     * @example
     * // Count the number of Mufas
     * const count = await prisma.mufa.count({
     *   where: {
     *     // ... the filter for the Mufas we want to count
     *   }
     * })
    **/
    count<T extends MufaCountArgs>(
      args?: Subset<T, MufaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MufaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mufa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MufaAggregateArgs>(args: Subset<T, MufaAggregateArgs>): Prisma.PrismaPromise<GetMufaAggregateType<T>>

    /**
     * Group by Mufa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MufaGroupByArgs} args - Group by arguments.
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
      T extends MufaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MufaGroupByArgs['orderBy'] }
        : { orderBy?: MufaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MufaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMufaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mufa model
   */
  readonly fields: MufaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mufa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MufaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cajas<T extends Mufa$cajasArgs<ExtArgs> = {}>(args?: Subset<T, Mufa$cajasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    poste<T extends PosteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosteDefaultArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    troncal<T extends TroncalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TroncalDefaultArgs<ExtArgs>>): Prisma__TroncalClient<$Result.GetResult<Prisma.$TroncalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tramosOrigen<T extends Mufa$tramosOrigenArgs<ExtArgs> = {}>(args?: Subset<T, Mufa$tramosOrigenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mufa model
   */
  interface MufaFieldRefs {
    readonly id: FieldRef<"Mufa", 'String'>
    readonly codigo: FieldRef<"Mufa", 'String'>
    readonly latitud: FieldRef<"Mufa", 'Float'>
    readonly longitud: FieldRef<"Mufa", 'Float'>
    readonly bufferEntrada: FieldRef<"Mufa", 'String'>
    readonly hiloEntrada: FieldRef<"Mufa", 'Int'>
    readonly ratioSplitteo: FieldRef<"Mufa", 'String'>
    readonly hilosDisponibles: FieldRef<"Mufa", 'Int'>
    readonly troncalId: FieldRef<"Mufa", 'String'>
    readonly posteId: FieldRef<"Mufa", 'String'>
    readonly creadoEn: FieldRef<"Mufa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mufa findUnique
   */
  export type MufaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter, which Mufa to fetch.
     */
    where: MufaWhereUniqueInput
  }

  /**
   * Mufa findUniqueOrThrow
   */
  export type MufaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter, which Mufa to fetch.
     */
    where: MufaWhereUniqueInput
  }

  /**
   * Mufa findFirst
   */
  export type MufaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter, which Mufa to fetch.
     */
    where?: MufaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mufas to fetch.
     */
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mufas.
     */
    cursor?: MufaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mufas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mufas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mufas.
     */
    distinct?: MufaScalarFieldEnum | MufaScalarFieldEnum[]
  }

  /**
   * Mufa findFirstOrThrow
   */
  export type MufaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter, which Mufa to fetch.
     */
    where?: MufaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mufas to fetch.
     */
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mufas.
     */
    cursor?: MufaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mufas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mufas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mufas.
     */
    distinct?: MufaScalarFieldEnum | MufaScalarFieldEnum[]
  }

  /**
   * Mufa findMany
   */
  export type MufaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter, which Mufas to fetch.
     */
    where?: MufaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mufas to fetch.
     */
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mufas.
     */
    cursor?: MufaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mufas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mufas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mufas.
     */
    distinct?: MufaScalarFieldEnum | MufaScalarFieldEnum[]
  }

  /**
   * Mufa create
   */
  export type MufaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * The data needed to create a Mufa.
     */
    data: XOR<MufaCreateInput, MufaUncheckedCreateInput>
  }

  /**
   * Mufa createMany
   */
  export type MufaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mufas.
     */
    data: MufaCreateManyInput | MufaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mufa update
   */
  export type MufaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * The data needed to update a Mufa.
     */
    data: XOR<MufaUpdateInput, MufaUncheckedUpdateInput>
    /**
     * Choose, which Mufa to update.
     */
    where: MufaWhereUniqueInput
  }

  /**
   * Mufa updateMany
   */
  export type MufaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mufas.
     */
    data: XOR<MufaUpdateManyMutationInput, MufaUncheckedUpdateManyInput>
    /**
     * Filter which Mufas to update
     */
    where?: MufaWhereInput
    /**
     * Limit how many Mufas to update.
     */
    limit?: number
  }

  /**
   * Mufa upsert
   */
  export type MufaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * The filter to search for the Mufa to update in case it exists.
     */
    where: MufaWhereUniqueInput
    /**
     * In case the Mufa found by the `where` argument doesn't exist, create a new Mufa with this data.
     */
    create: XOR<MufaCreateInput, MufaUncheckedCreateInput>
    /**
     * In case the Mufa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MufaUpdateInput, MufaUncheckedUpdateInput>
  }

  /**
   * Mufa delete
   */
  export type MufaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    /**
     * Filter which Mufa to delete.
     */
    where: MufaWhereUniqueInput
  }

  /**
   * Mufa deleteMany
   */
  export type MufaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mufas to delete
     */
    where?: MufaWhereInput
    /**
     * Limit how many Mufas to delete.
     */
    limit?: number
  }

  /**
   * Mufa.cajas
   */
  export type Mufa$cajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    where?: CajaWhereInput
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    cursor?: CajaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CajaScalarFieldEnum | CajaScalarFieldEnum[]
  }

  /**
   * Mufa.tramosOrigen
   */
  export type Mufa$tramosOrigenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    cursor?: TramoCableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * Mufa without action
   */
  export type MufaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
  }


  /**
   * Model Caja
   */

  export type AggregateCaja = {
    _count: CajaCountAggregateOutputType | null
    _avg: CajaAvgAggregateOutputType | null
    _sum: CajaSumAggregateOutputType | null
    _min: CajaMinAggregateOutputType | null
    _max: CajaMaxAggregateOutputType | null
  }

  export type CajaAvgAggregateOutputType = {
    latitud: number | null
    longitud: number | null
    puertosLibres: number | null
  }

  export type CajaSumAggregateOutputType = {
    latitud: number | null
    longitud: number | null
    puertosLibres: number | null
  }

  export type CajaMinAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    colorHiloCaja: string | null
    puertosLibres: number | null
    mufaId: string | null
    posteId: string | null
    creadoEn: Date | null
  }

  export type CajaMaxAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    colorHiloCaja: string | null
    puertosLibres: number | null
    mufaId: string | null
    posteId: string | null
    creadoEn: Date | null
  }

  export type CajaCountAggregateOutputType = {
    id: number
    codigo: number
    latitud: number
    longitud: number
    colorHiloCaja: number
    puertosLibres: number
    mufaId: number
    posteId: number
    creadoEn: number
    _all: number
  }


  export type CajaAvgAggregateInputType = {
    latitud?: true
    longitud?: true
    puertosLibres?: true
  }

  export type CajaSumAggregateInputType = {
    latitud?: true
    longitud?: true
    puertosLibres?: true
  }

  export type CajaMinAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    colorHiloCaja?: true
    puertosLibres?: true
    mufaId?: true
    posteId?: true
    creadoEn?: true
  }

  export type CajaMaxAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    colorHiloCaja?: true
    puertosLibres?: true
    mufaId?: true
    posteId?: true
    creadoEn?: true
  }

  export type CajaCountAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    colorHiloCaja?: true
    puertosLibres?: true
    mufaId?: true
    posteId?: true
    creadoEn?: true
    _all?: true
  }

  export type CajaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Caja to aggregate.
     */
    where?: CajaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cajas to fetch.
     */
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CajaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cajas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cajas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cajas
    **/
    _count?: true | CajaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CajaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CajaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CajaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CajaMaxAggregateInputType
  }

  export type GetCajaAggregateType<T extends CajaAggregateArgs> = {
        [P in keyof T & keyof AggregateCaja]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaja[P]>
      : GetScalarType<T[P], AggregateCaja[P]>
  }




  export type CajaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CajaWhereInput
    orderBy?: CajaOrderByWithAggregationInput | CajaOrderByWithAggregationInput[]
    by: CajaScalarFieldEnum[] | CajaScalarFieldEnum
    having?: CajaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CajaCountAggregateInputType | true
    _avg?: CajaAvgAggregateInputType
    _sum?: CajaSumAggregateInputType
    _min?: CajaMinAggregateInputType
    _max?: CajaMaxAggregateInputType
  }

  export type CajaGroupByOutputType = {
    id: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja: string | null
    puertosLibres: number
    mufaId: string
    posteId: string
    creadoEn: Date
    _count: CajaCountAggregateOutputType | null
    _avg: CajaAvgAggregateOutputType | null
    _sum: CajaSumAggregateOutputType | null
    _min: CajaMinAggregateOutputType | null
    _max: CajaMaxAggregateOutputType | null
  }

  type GetCajaGroupByPayload<T extends CajaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CajaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CajaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CajaGroupByOutputType[P]>
            : GetScalarType<T[P], CajaGroupByOutputType[P]>
        }
      >
    >


  export type CajaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    colorHiloCaja?: boolean
    puertosLibres?: boolean
    mufaId?: boolean
    posteId?: boolean
    creadoEn?: boolean
    mufa?: boolean | MufaDefaultArgs<ExtArgs>
    poste?: boolean | PosteDefaultArgs<ExtArgs>
    clientes?: boolean | Caja$clientesArgs<ExtArgs>
    tramosDestino?: boolean | Caja$tramosDestinoArgs<ExtArgs>
    _count?: boolean | CajaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caja"]>



  export type CajaSelectScalar = {
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    colorHiloCaja?: boolean
    puertosLibres?: boolean
    mufaId?: boolean
    posteId?: boolean
    creadoEn?: boolean
  }

  export type CajaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "latitud" | "longitud" | "colorHiloCaja" | "puertosLibres" | "mufaId" | "posteId" | "creadoEn", ExtArgs["result"]["caja"]>
  export type CajaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mufa?: boolean | MufaDefaultArgs<ExtArgs>
    poste?: boolean | PosteDefaultArgs<ExtArgs>
    clientes?: boolean | Caja$clientesArgs<ExtArgs>
    tramosDestino?: boolean | Caja$tramosDestinoArgs<ExtArgs>
    _count?: boolean | CajaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CajaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Caja"
    objects: {
      mufa: Prisma.$MufaPayload<ExtArgs>
      poste: Prisma.$PostePayload<ExtArgs>
      clientes: Prisma.$ClientePayload<ExtArgs>[]
      tramosDestino: Prisma.$TramoCablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigo: string
      latitud: number
      longitud: number
      colorHiloCaja: string | null
      puertosLibres: number
      mufaId: string
      posteId: string
      creadoEn: Date
    }, ExtArgs["result"]["caja"]>
    composites: {}
  }

  type CajaGetPayload<S extends boolean | null | undefined | CajaDefaultArgs> = $Result.GetResult<Prisma.$CajaPayload, S>

  type CajaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CajaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CajaCountAggregateInputType | true
    }

  export interface CajaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Caja'], meta: { name: 'Caja' } }
    /**
     * Find zero or one Caja that matches the filter.
     * @param {CajaFindUniqueArgs} args - Arguments to find a Caja
     * @example
     * // Get one Caja
     * const caja = await prisma.caja.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CajaFindUniqueArgs>(args: SelectSubset<T, CajaFindUniqueArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Caja that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CajaFindUniqueOrThrowArgs} args - Arguments to find a Caja
     * @example
     * // Get one Caja
     * const caja = await prisma.caja.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CajaFindUniqueOrThrowArgs>(args: SelectSubset<T, CajaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Caja that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaFindFirstArgs} args - Arguments to find a Caja
     * @example
     * // Get one Caja
     * const caja = await prisma.caja.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CajaFindFirstArgs>(args?: SelectSubset<T, CajaFindFirstArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Caja that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaFindFirstOrThrowArgs} args - Arguments to find a Caja
     * @example
     * // Get one Caja
     * const caja = await prisma.caja.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CajaFindFirstOrThrowArgs>(args?: SelectSubset<T, CajaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cajas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cajas
     * const cajas = await prisma.caja.findMany()
     * 
     * // Get first 10 Cajas
     * const cajas = await prisma.caja.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cajaWithIdOnly = await prisma.caja.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CajaFindManyArgs>(args?: SelectSubset<T, CajaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Caja.
     * @param {CajaCreateArgs} args - Arguments to create a Caja.
     * @example
     * // Create one Caja
     * const Caja = await prisma.caja.create({
     *   data: {
     *     // ... data to create a Caja
     *   }
     * })
     * 
     */
    create<T extends CajaCreateArgs>(args: SelectSubset<T, CajaCreateArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cajas.
     * @param {CajaCreateManyArgs} args - Arguments to create many Cajas.
     * @example
     * // Create many Cajas
     * const caja = await prisma.caja.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CajaCreateManyArgs>(args?: SelectSubset<T, CajaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Caja.
     * @param {CajaDeleteArgs} args - Arguments to delete one Caja.
     * @example
     * // Delete one Caja
     * const Caja = await prisma.caja.delete({
     *   where: {
     *     // ... filter to delete one Caja
     *   }
     * })
     * 
     */
    delete<T extends CajaDeleteArgs>(args: SelectSubset<T, CajaDeleteArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Caja.
     * @param {CajaUpdateArgs} args - Arguments to update one Caja.
     * @example
     * // Update one Caja
     * const caja = await prisma.caja.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CajaUpdateArgs>(args: SelectSubset<T, CajaUpdateArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cajas.
     * @param {CajaDeleteManyArgs} args - Arguments to filter Cajas to delete.
     * @example
     * // Delete a few Cajas
     * const { count } = await prisma.caja.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CajaDeleteManyArgs>(args?: SelectSubset<T, CajaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cajas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cajas
     * const caja = await prisma.caja.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CajaUpdateManyArgs>(args: SelectSubset<T, CajaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Caja.
     * @param {CajaUpsertArgs} args - Arguments to update or create a Caja.
     * @example
     * // Update or create a Caja
     * const caja = await prisma.caja.upsert({
     *   create: {
     *     // ... data to create a Caja
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Caja we want to update
     *   }
     * })
     */
    upsert<T extends CajaUpsertArgs>(args: SelectSubset<T, CajaUpsertArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cajas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaCountArgs} args - Arguments to filter Cajas to count.
     * @example
     * // Count the number of Cajas
     * const count = await prisma.caja.count({
     *   where: {
     *     // ... the filter for the Cajas we want to count
     *   }
     * })
    **/
    count<T extends CajaCountArgs>(
      args?: Subset<T, CajaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CajaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Caja.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CajaAggregateArgs>(args: Subset<T, CajaAggregateArgs>): Prisma.PrismaPromise<GetCajaAggregateType<T>>

    /**
     * Group by Caja.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CajaGroupByArgs} args - Group by arguments.
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
      T extends CajaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CajaGroupByArgs['orderBy'] }
        : { orderBy?: CajaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CajaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCajaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Caja model
   */
  readonly fields: CajaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Caja.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CajaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mufa<T extends MufaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MufaDefaultArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    poste<T extends PosteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosteDefaultArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clientes<T extends Caja$clientesArgs<ExtArgs> = {}>(args?: Subset<T, Caja$clientesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tramosDestino<T extends Caja$tramosDestinoArgs<ExtArgs> = {}>(args?: Subset<T, Caja$tramosDestinoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Caja model
   */
  interface CajaFieldRefs {
    readonly id: FieldRef<"Caja", 'String'>
    readonly codigo: FieldRef<"Caja", 'String'>
    readonly latitud: FieldRef<"Caja", 'Float'>
    readonly longitud: FieldRef<"Caja", 'Float'>
    readonly colorHiloCaja: FieldRef<"Caja", 'String'>
    readonly puertosLibres: FieldRef<"Caja", 'Int'>
    readonly mufaId: FieldRef<"Caja", 'String'>
    readonly posteId: FieldRef<"Caja", 'String'>
    readonly creadoEn: FieldRef<"Caja", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Caja findUnique
   */
  export type CajaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter, which Caja to fetch.
     */
    where: CajaWhereUniqueInput
  }

  /**
   * Caja findUniqueOrThrow
   */
  export type CajaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter, which Caja to fetch.
     */
    where: CajaWhereUniqueInput
  }

  /**
   * Caja findFirst
   */
  export type CajaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter, which Caja to fetch.
     */
    where?: CajaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cajas to fetch.
     */
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cajas.
     */
    cursor?: CajaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cajas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cajas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cajas.
     */
    distinct?: CajaScalarFieldEnum | CajaScalarFieldEnum[]
  }

  /**
   * Caja findFirstOrThrow
   */
  export type CajaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter, which Caja to fetch.
     */
    where?: CajaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cajas to fetch.
     */
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cajas.
     */
    cursor?: CajaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cajas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cajas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cajas.
     */
    distinct?: CajaScalarFieldEnum | CajaScalarFieldEnum[]
  }

  /**
   * Caja findMany
   */
  export type CajaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter, which Cajas to fetch.
     */
    where?: CajaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cajas to fetch.
     */
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cajas.
     */
    cursor?: CajaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cajas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cajas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cajas.
     */
    distinct?: CajaScalarFieldEnum | CajaScalarFieldEnum[]
  }

  /**
   * Caja create
   */
  export type CajaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * The data needed to create a Caja.
     */
    data: XOR<CajaCreateInput, CajaUncheckedCreateInput>
  }

  /**
   * Caja createMany
   */
  export type CajaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cajas.
     */
    data: CajaCreateManyInput | CajaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Caja update
   */
  export type CajaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * The data needed to update a Caja.
     */
    data: XOR<CajaUpdateInput, CajaUncheckedUpdateInput>
    /**
     * Choose, which Caja to update.
     */
    where: CajaWhereUniqueInput
  }

  /**
   * Caja updateMany
   */
  export type CajaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cajas.
     */
    data: XOR<CajaUpdateManyMutationInput, CajaUncheckedUpdateManyInput>
    /**
     * Filter which Cajas to update
     */
    where?: CajaWhereInput
    /**
     * Limit how many Cajas to update.
     */
    limit?: number
  }

  /**
   * Caja upsert
   */
  export type CajaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * The filter to search for the Caja to update in case it exists.
     */
    where: CajaWhereUniqueInput
    /**
     * In case the Caja found by the `where` argument doesn't exist, create a new Caja with this data.
     */
    create: XOR<CajaCreateInput, CajaUncheckedCreateInput>
    /**
     * In case the Caja was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CajaUpdateInput, CajaUncheckedUpdateInput>
  }

  /**
   * Caja delete
   */
  export type CajaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    /**
     * Filter which Caja to delete.
     */
    where: CajaWhereUniqueInput
  }

  /**
   * Caja deleteMany
   */
  export type CajaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cajas to delete
     */
    where?: CajaWhereInput
    /**
     * Limit how many Cajas to delete.
     */
    limit?: number
  }

  /**
   * Caja.clientes
   */
  export type Caja$clientesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    cursor?: ClienteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Caja.tramosDestino
   */
  export type Caja$tramosDestinoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    cursor?: TramoCableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * Caja without action
   */
  export type CajaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
  }


  /**
   * Model Poste
   */

  export type AggregatePoste = {
    _count: PosteCountAggregateOutputType | null
    _avg: PosteAvgAggregateOutputType | null
    _sum: PosteSumAggregateOutputType | null
    _min: PosteMinAggregateOutputType | null
    _max: PosteMaxAggregateOutputType | null
  }

  export type PosteAvgAggregateOutputType = {
    latitud: number | null
    longitud: number | null
  }

  export type PosteSumAggregateOutputType = {
    latitud: number | null
    longitud: number | null
  }

  export type PosteMinAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    tipo: string | null
    altura: string | null
    creadoEn: Date | null
  }

  export type PosteMaxAggregateOutputType = {
    id: string | null
    codigo: string | null
    latitud: number | null
    longitud: number | null
    tipo: string | null
    altura: string | null
    creadoEn: Date | null
  }

  export type PosteCountAggregateOutputType = {
    id: number
    codigo: number
    latitud: number
    longitud: number
    tipo: number
    altura: number
    creadoEn: number
    _all: number
  }


  export type PosteAvgAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type PosteSumAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type PosteMinAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    tipo?: true
    altura?: true
    creadoEn?: true
  }

  export type PosteMaxAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    tipo?: true
    altura?: true
    creadoEn?: true
  }

  export type PosteCountAggregateInputType = {
    id?: true
    codigo?: true
    latitud?: true
    longitud?: true
    tipo?: true
    altura?: true
    creadoEn?: true
    _all?: true
  }

  export type PosteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poste to aggregate.
     */
    where?: PosteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Postes to fetch.
     */
    orderBy?: PosteOrderByWithRelationInput | PosteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PosteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Postes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Postes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Postes
    **/
    _count?: true | PosteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PosteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PosteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PosteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PosteMaxAggregateInputType
  }

  export type GetPosteAggregateType<T extends PosteAggregateArgs> = {
        [P in keyof T & keyof AggregatePoste]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoste[P]>
      : GetScalarType<T[P], AggregatePoste[P]>
  }




  export type PosteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosteWhereInput
    orderBy?: PosteOrderByWithAggregationInput | PosteOrderByWithAggregationInput[]
    by: PosteScalarFieldEnum[] | PosteScalarFieldEnum
    having?: PosteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PosteCountAggregateInputType | true
    _avg?: PosteAvgAggregateInputType
    _sum?: PosteSumAggregateInputType
    _min?: PosteMinAggregateInputType
    _max?: PosteMaxAggregateInputType
  }

  export type PosteGroupByOutputType = {
    id: string
    codigo: string
    latitud: number
    longitud: number
    tipo: string
    altura: string | null
    creadoEn: Date
    _count: PosteCountAggregateOutputType | null
    _avg: PosteAvgAggregateOutputType | null
    _sum: PosteSumAggregateOutputType | null
    _min: PosteMinAggregateOutputType | null
    _max: PosteMaxAggregateOutputType | null
  }

  type GetPosteGroupByPayload<T extends PosteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PosteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PosteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PosteGroupByOutputType[P]>
            : GetScalarType<T[P], PosteGroupByOutputType[P]>
        }
      >
    >


  export type PosteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    tipo?: boolean
    altura?: boolean
    creadoEn?: boolean
    cajas?: boolean | Poste$cajasArgs<ExtArgs>
    mufas?: boolean | Poste$mufasArgs<ExtArgs>
    tramosFin?: boolean | Poste$tramosFinArgs<ExtArgs>
    tramosInicio?: boolean | Poste$tramosInicioArgs<ExtArgs>
    _count?: boolean | PosteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poste"]>



  export type PosteSelectScalar = {
    id?: boolean
    codigo?: boolean
    latitud?: boolean
    longitud?: boolean
    tipo?: boolean
    altura?: boolean
    creadoEn?: boolean
  }

  export type PosteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "latitud" | "longitud" | "tipo" | "altura" | "creadoEn", ExtArgs["result"]["poste"]>
  export type PosteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cajas?: boolean | Poste$cajasArgs<ExtArgs>
    mufas?: boolean | Poste$mufasArgs<ExtArgs>
    tramosFin?: boolean | Poste$tramosFinArgs<ExtArgs>
    tramosInicio?: boolean | Poste$tramosInicioArgs<ExtArgs>
    _count?: boolean | PosteCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poste"
    objects: {
      cajas: Prisma.$CajaPayload<ExtArgs>[]
      mufas: Prisma.$MufaPayload<ExtArgs>[]
      tramosFin: Prisma.$TramoCablePayload<ExtArgs>[]
      tramosInicio: Prisma.$TramoCablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigo: string
      latitud: number
      longitud: number
      tipo: string
      altura: string | null
      creadoEn: Date
    }, ExtArgs["result"]["poste"]>
    composites: {}
  }

  type PosteGetPayload<S extends boolean | null | undefined | PosteDefaultArgs> = $Result.GetResult<Prisma.$PostePayload, S>

  type PosteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PosteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PosteCountAggregateInputType | true
    }

  export interface PosteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poste'], meta: { name: 'Poste' } }
    /**
     * Find zero or one Poste that matches the filter.
     * @param {PosteFindUniqueArgs} args - Arguments to find a Poste
     * @example
     * // Get one Poste
     * const poste = await prisma.poste.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PosteFindUniqueArgs>(args: SelectSubset<T, PosteFindUniqueArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poste that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PosteFindUniqueOrThrowArgs} args - Arguments to find a Poste
     * @example
     * // Get one Poste
     * const poste = await prisma.poste.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PosteFindUniqueOrThrowArgs>(args: SelectSubset<T, PosteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poste that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteFindFirstArgs} args - Arguments to find a Poste
     * @example
     * // Get one Poste
     * const poste = await prisma.poste.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PosteFindFirstArgs>(args?: SelectSubset<T, PosteFindFirstArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poste that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteFindFirstOrThrowArgs} args - Arguments to find a Poste
     * @example
     * // Get one Poste
     * const poste = await prisma.poste.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PosteFindFirstOrThrowArgs>(args?: SelectSubset<T, PosteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Postes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Postes
     * const postes = await prisma.poste.findMany()
     * 
     * // Get first 10 Postes
     * const postes = await prisma.poste.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const posteWithIdOnly = await prisma.poste.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PosteFindManyArgs>(args?: SelectSubset<T, PosteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poste.
     * @param {PosteCreateArgs} args - Arguments to create a Poste.
     * @example
     * // Create one Poste
     * const Poste = await prisma.poste.create({
     *   data: {
     *     // ... data to create a Poste
     *   }
     * })
     * 
     */
    create<T extends PosteCreateArgs>(args: SelectSubset<T, PosteCreateArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Postes.
     * @param {PosteCreateManyArgs} args - Arguments to create many Postes.
     * @example
     * // Create many Postes
     * const poste = await prisma.poste.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PosteCreateManyArgs>(args?: SelectSubset<T, PosteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Poste.
     * @param {PosteDeleteArgs} args - Arguments to delete one Poste.
     * @example
     * // Delete one Poste
     * const Poste = await prisma.poste.delete({
     *   where: {
     *     // ... filter to delete one Poste
     *   }
     * })
     * 
     */
    delete<T extends PosteDeleteArgs>(args: SelectSubset<T, PosteDeleteArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poste.
     * @param {PosteUpdateArgs} args - Arguments to update one Poste.
     * @example
     * // Update one Poste
     * const poste = await prisma.poste.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PosteUpdateArgs>(args: SelectSubset<T, PosteUpdateArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Postes.
     * @param {PosteDeleteManyArgs} args - Arguments to filter Postes to delete.
     * @example
     * // Delete a few Postes
     * const { count } = await prisma.poste.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PosteDeleteManyArgs>(args?: SelectSubset<T, PosteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Postes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Postes
     * const poste = await prisma.poste.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PosteUpdateManyArgs>(args: SelectSubset<T, PosteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Poste.
     * @param {PosteUpsertArgs} args - Arguments to update or create a Poste.
     * @example
     * // Update or create a Poste
     * const poste = await prisma.poste.upsert({
     *   create: {
     *     // ... data to create a Poste
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poste we want to update
     *   }
     * })
     */
    upsert<T extends PosteUpsertArgs>(args: SelectSubset<T, PosteUpsertArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Postes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteCountArgs} args - Arguments to filter Postes to count.
     * @example
     * // Count the number of Postes
     * const count = await prisma.poste.count({
     *   where: {
     *     // ... the filter for the Postes we want to count
     *   }
     * })
    **/
    count<T extends PosteCountArgs>(
      args?: Subset<T, PosteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PosteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poste.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PosteAggregateArgs>(args: Subset<T, PosteAggregateArgs>): Prisma.PrismaPromise<GetPosteAggregateType<T>>

    /**
     * Group by Poste.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosteGroupByArgs} args - Group by arguments.
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
      T extends PosteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PosteGroupByArgs['orderBy'] }
        : { orderBy?: PosteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PosteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPosteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poste model
   */
  readonly fields: PosteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poste.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PosteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cajas<T extends Poste$cajasArgs<ExtArgs> = {}>(args?: Subset<T, Poste$cajasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mufas<T extends Poste$mufasArgs<ExtArgs> = {}>(args?: Subset<T, Poste$mufasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tramosFin<T extends Poste$tramosFinArgs<ExtArgs> = {}>(args?: Subset<T, Poste$tramosFinArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tramosInicio<T extends Poste$tramosInicioArgs<ExtArgs> = {}>(args?: Subset<T, Poste$tramosInicioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Poste model
   */
  interface PosteFieldRefs {
    readonly id: FieldRef<"Poste", 'String'>
    readonly codigo: FieldRef<"Poste", 'String'>
    readonly latitud: FieldRef<"Poste", 'Float'>
    readonly longitud: FieldRef<"Poste", 'Float'>
    readonly tipo: FieldRef<"Poste", 'String'>
    readonly altura: FieldRef<"Poste", 'String'>
    readonly creadoEn: FieldRef<"Poste", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Poste findUnique
   */
  export type PosteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter, which Poste to fetch.
     */
    where: PosteWhereUniqueInput
  }

  /**
   * Poste findUniqueOrThrow
   */
  export type PosteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter, which Poste to fetch.
     */
    where: PosteWhereUniqueInput
  }

  /**
   * Poste findFirst
   */
  export type PosteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter, which Poste to fetch.
     */
    where?: PosteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Postes to fetch.
     */
    orderBy?: PosteOrderByWithRelationInput | PosteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Postes.
     */
    cursor?: PosteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Postes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Postes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Postes.
     */
    distinct?: PosteScalarFieldEnum | PosteScalarFieldEnum[]
  }

  /**
   * Poste findFirstOrThrow
   */
  export type PosteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter, which Poste to fetch.
     */
    where?: PosteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Postes to fetch.
     */
    orderBy?: PosteOrderByWithRelationInput | PosteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Postes.
     */
    cursor?: PosteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Postes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Postes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Postes.
     */
    distinct?: PosteScalarFieldEnum | PosteScalarFieldEnum[]
  }

  /**
   * Poste findMany
   */
  export type PosteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter, which Postes to fetch.
     */
    where?: PosteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Postes to fetch.
     */
    orderBy?: PosteOrderByWithRelationInput | PosteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Postes.
     */
    cursor?: PosteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Postes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Postes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Postes.
     */
    distinct?: PosteScalarFieldEnum | PosteScalarFieldEnum[]
  }

  /**
   * Poste create
   */
  export type PosteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * The data needed to create a Poste.
     */
    data: XOR<PosteCreateInput, PosteUncheckedCreateInput>
  }

  /**
   * Poste createMany
   */
  export type PosteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Postes.
     */
    data: PosteCreateManyInput | PosteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poste update
   */
  export type PosteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * The data needed to update a Poste.
     */
    data: XOR<PosteUpdateInput, PosteUncheckedUpdateInput>
    /**
     * Choose, which Poste to update.
     */
    where: PosteWhereUniqueInput
  }

  /**
   * Poste updateMany
   */
  export type PosteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Postes.
     */
    data: XOR<PosteUpdateManyMutationInput, PosteUncheckedUpdateManyInput>
    /**
     * Filter which Postes to update
     */
    where?: PosteWhereInput
    /**
     * Limit how many Postes to update.
     */
    limit?: number
  }

  /**
   * Poste upsert
   */
  export type PosteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * The filter to search for the Poste to update in case it exists.
     */
    where: PosteWhereUniqueInput
    /**
     * In case the Poste found by the `where` argument doesn't exist, create a new Poste with this data.
     */
    create: XOR<PosteCreateInput, PosteUncheckedCreateInput>
    /**
     * In case the Poste was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PosteUpdateInput, PosteUncheckedUpdateInput>
  }

  /**
   * Poste delete
   */
  export type PosteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
    /**
     * Filter which Poste to delete.
     */
    where: PosteWhereUniqueInput
  }

  /**
   * Poste deleteMany
   */
  export type PosteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Postes to delete
     */
    where?: PosteWhereInput
    /**
     * Limit how many Postes to delete.
     */
    limit?: number
  }

  /**
   * Poste.cajas
   */
  export type Poste$cajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    where?: CajaWhereInput
    orderBy?: CajaOrderByWithRelationInput | CajaOrderByWithRelationInput[]
    cursor?: CajaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CajaScalarFieldEnum | CajaScalarFieldEnum[]
  }

  /**
   * Poste.mufas
   */
  export type Poste$mufasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    where?: MufaWhereInput
    orderBy?: MufaOrderByWithRelationInput | MufaOrderByWithRelationInput[]
    cursor?: MufaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MufaScalarFieldEnum | MufaScalarFieldEnum[]
  }

  /**
   * Poste.tramosFin
   */
  export type Poste$tramosFinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    cursor?: TramoCableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * Poste.tramosInicio
   */
  export type Poste$tramosInicioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    cursor?: TramoCableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * Poste without action
   */
  export type PosteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poste
     */
    select?: PosteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poste
     */
    omit?: PosteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosteInclude<ExtArgs> | null
  }


  /**
   * Model TramoCable
   */

  export type AggregateTramoCable = {
    _count: TramoCableCountAggregateOutputType | null
    _min: TramoCableMinAggregateOutputType | null
    _max: TramoCableMaxAggregateOutputType | null
  }

  export type TramoCableMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    tipoCable: string | null
    path: string | null
    colorVisual: string | null
    proyectoId: string | null
    posteInicioId: string | null
    posteFinId: string | null
    mufaOrigenId: string | null
    cajaDestinoId: string | null
  }

  export type TramoCableMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    tipoCable: string | null
    path: string | null
    colorVisual: string | null
    proyectoId: string | null
    posteInicioId: string | null
    posteFinId: string | null
    mufaOrigenId: string | null
    cajaDestinoId: string | null
  }

  export type TramoCableCountAggregateOutputType = {
    id: number
    nombre: number
    tipoCable: number
    path: number
    colorVisual: number
    proyectoId: number
    posteInicioId: number
    posteFinId: number
    mufaOrigenId: number
    cajaDestinoId: number
    _all: number
  }


  export type TramoCableMinAggregateInputType = {
    id?: true
    nombre?: true
    tipoCable?: true
    path?: true
    colorVisual?: true
    proyectoId?: true
    posteInicioId?: true
    posteFinId?: true
    mufaOrigenId?: true
    cajaDestinoId?: true
  }

  export type TramoCableMaxAggregateInputType = {
    id?: true
    nombre?: true
    tipoCable?: true
    path?: true
    colorVisual?: true
    proyectoId?: true
    posteInicioId?: true
    posteFinId?: true
    mufaOrigenId?: true
    cajaDestinoId?: true
  }

  export type TramoCableCountAggregateInputType = {
    id?: true
    nombre?: true
    tipoCable?: true
    path?: true
    colorVisual?: true
    proyectoId?: true
    posteInicioId?: true
    posteFinId?: true
    mufaOrigenId?: true
    cajaDestinoId?: true
    _all?: true
  }

  export type TramoCableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TramoCable to aggregate.
     */
    where?: TramoCableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TramoCables to fetch.
     */
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TramoCableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TramoCables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TramoCables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TramoCables
    **/
    _count?: true | TramoCableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TramoCableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TramoCableMaxAggregateInputType
  }

  export type GetTramoCableAggregateType<T extends TramoCableAggregateArgs> = {
        [P in keyof T & keyof AggregateTramoCable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTramoCable[P]>
      : GetScalarType<T[P], AggregateTramoCable[P]>
  }




  export type TramoCableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TramoCableWhereInput
    orderBy?: TramoCableOrderByWithAggregationInput | TramoCableOrderByWithAggregationInput[]
    by: TramoCableScalarFieldEnum[] | TramoCableScalarFieldEnum
    having?: TramoCableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TramoCableCountAggregateInputType | true
    _min?: TramoCableMinAggregateInputType
    _max?: TramoCableMaxAggregateInputType
  }

  export type TramoCableGroupByOutputType = {
    id: string
    nombre: string | null
    tipoCable: string
    path: string
    colorVisual: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId: string | null
    cajaDestinoId: string | null
    _count: TramoCableCountAggregateOutputType | null
    _min: TramoCableMinAggregateOutputType | null
    _max: TramoCableMaxAggregateOutputType | null
  }

  type GetTramoCableGroupByPayload<T extends TramoCableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TramoCableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TramoCableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TramoCableGroupByOutputType[P]>
            : GetScalarType<T[P], TramoCableGroupByOutputType[P]>
        }
      >
    >


  export type TramoCableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipoCable?: boolean
    path?: boolean
    colorVisual?: boolean
    proyectoId?: boolean
    posteInicioId?: boolean
    posteFinId?: boolean
    mufaOrigenId?: boolean
    cajaDestinoId?: boolean
    cajaDestino?: boolean | TramoCable$cajaDestinoArgs<ExtArgs>
    mufaOrigen?: boolean | TramoCable$mufaOrigenArgs<ExtArgs>
    posteFin?: boolean | PosteDefaultArgs<ExtArgs>
    posteInicio?: boolean | PosteDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tramoCable"]>



  export type TramoCableSelectScalar = {
    id?: boolean
    nombre?: boolean
    tipoCable?: boolean
    path?: boolean
    colorVisual?: boolean
    proyectoId?: boolean
    posteInicioId?: boolean
    posteFinId?: boolean
    mufaOrigenId?: boolean
    cajaDestinoId?: boolean
  }

  export type TramoCableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "tipoCable" | "path" | "colorVisual" | "proyectoId" | "posteInicioId" | "posteFinId" | "mufaOrigenId" | "cajaDestinoId", ExtArgs["result"]["tramoCable"]>
  export type TramoCableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cajaDestino?: boolean | TramoCable$cajaDestinoArgs<ExtArgs>
    mufaOrigen?: boolean | TramoCable$mufaOrigenArgs<ExtArgs>
    posteFin?: boolean | PosteDefaultArgs<ExtArgs>
    posteInicio?: boolean | PosteDefaultArgs<ExtArgs>
    proyecto?: boolean | ProyectoDefaultArgs<ExtArgs>
  }

  export type $TramoCablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TramoCable"
    objects: {
      cajaDestino: Prisma.$CajaPayload<ExtArgs> | null
      mufaOrigen: Prisma.$MufaPayload<ExtArgs> | null
      posteFin: Prisma.$PostePayload<ExtArgs>
      posteInicio: Prisma.$PostePayload<ExtArgs>
      proyecto: Prisma.$ProyectoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string | null
      tipoCable: string
      path: string
      colorVisual: string
      proyectoId: string
      posteInicioId: string
      posteFinId: string
      mufaOrigenId: string | null
      cajaDestinoId: string | null
    }, ExtArgs["result"]["tramoCable"]>
    composites: {}
  }

  type TramoCableGetPayload<S extends boolean | null | undefined | TramoCableDefaultArgs> = $Result.GetResult<Prisma.$TramoCablePayload, S>

  type TramoCableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TramoCableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TramoCableCountAggregateInputType | true
    }

  export interface TramoCableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TramoCable'], meta: { name: 'TramoCable' } }
    /**
     * Find zero or one TramoCable that matches the filter.
     * @param {TramoCableFindUniqueArgs} args - Arguments to find a TramoCable
     * @example
     * // Get one TramoCable
     * const tramoCable = await prisma.tramoCable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TramoCableFindUniqueArgs>(args: SelectSubset<T, TramoCableFindUniqueArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TramoCable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TramoCableFindUniqueOrThrowArgs} args - Arguments to find a TramoCable
     * @example
     * // Get one TramoCable
     * const tramoCable = await prisma.tramoCable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TramoCableFindUniqueOrThrowArgs>(args: SelectSubset<T, TramoCableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TramoCable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableFindFirstArgs} args - Arguments to find a TramoCable
     * @example
     * // Get one TramoCable
     * const tramoCable = await prisma.tramoCable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TramoCableFindFirstArgs>(args?: SelectSubset<T, TramoCableFindFirstArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TramoCable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableFindFirstOrThrowArgs} args - Arguments to find a TramoCable
     * @example
     * // Get one TramoCable
     * const tramoCable = await prisma.tramoCable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TramoCableFindFirstOrThrowArgs>(args?: SelectSubset<T, TramoCableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TramoCables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TramoCables
     * const tramoCables = await prisma.tramoCable.findMany()
     * 
     * // Get first 10 TramoCables
     * const tramoCables = await prisma.tramoCable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tramoCableWithIdOnly = await prisma.tramoCable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TramoCableFindManyArgs>(args?: SelectSubset<T, TramoCableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TramoCable.
     * @param {TramoCableCreateArgs} args - Arguments to create a TramoCable.
     * @example
     * // Create one TramoCable
     * const TramoCable = await prisma.tramoCable.create({
     *   data: {
     *     // ... data to create a TramoCable
     *   }
     * })
     * 
     */
    create<T extends TramoCableCreateArgs>(args: SelectSubset<T, TramoCableCreateArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TramoCables.
     * @param {TramoCableCreateManyArgs} args - Arguments to create many TramoCables.
     * @example
     * // Create many TramoCables
     * const tramoCable = await prisma.tramoCable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TramoCableCreateManyArgs>(args?: SelectSubset<T, TramoCableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TramoCable.
     * @param {TramoCableDeleteArgs} args - Arguments to delete one TramoCable.
     * @example
     * // Delete one TramoCable
     * const TramoCable = await prisma.tramoCable.delete({
     *   where: {
     *     // ... filter to delete one TramoCable
     *   }
     * })
     * 
     */
    delete<T extends TramoCableDeleteArgs>(args: SelectSubset<T, TramoCableDeleteArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TramoCable.
     * @param {TramoCableUpdateArgs} args - Arguments to update one TramoCable.
     * @example
     * // Update one TramoCable
     * const tramoCable = await prisma.tramoCable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TramoCableUpdateArgs>(args: SelectSubset<T, TramoCableUpdateArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TramoCables.
     * @param {TramoCableDeleteManyArgs} args - Arguments to filter TramoCables to delete.
     * @example
     * // Delete a few TramoCables
     * const { count } = await prisma.tramoCable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TramoCableDeleteManyArgs>(args?: SelectSubset<T, TramoCableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TramoCables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TramoCables
     * const tramoCable = await prisma.tramoCable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TramoCableUpdateManyArgs>(args: SelectSubset<T, TramoCableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TramoCable.
     * @param {TramoCableUpsertArgs} args - Arguments to update or create a TramoCable.
     * @example
     * // Update or create a TramoCable
     * const tramoCable = await prisma.tramoCable.upsert({
     *   create: {
     *     // ... data to create a TramoCable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TramoCable we want to update
     *   }
     * })
     */
    upsert<T extends TramoCableUpsertArgs>(args: SelectSubset<T, TramoCableUpsertArgs<ExtArgs>>): Prisma__TramoCableClient<$Result.GetResult<Prisma.$TramoCablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TramoCables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableCountArgs} args - Arguments to filter TramoCables to count.
     * @example
     * // Count the number of TramoCables
     * const count = await prisma.tramoCable.count({
     *   where: {
     *     // ... the filter for the TramoCables we want to count
     *   }
     * })
    **/
    count<T extends TramoCableCountArgs>(
      args?: Subset<T, TramoCableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TramoCableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TramoCable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TramoCableAggregateArgs>(args: Subset<T, TramoCableAggregateArgs>): Prisma.PrismaPromise<GetTramoCableAggregateType<T>>

    /**
     * Group by TramoCable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TramoCableGroupByArgs} args - Group by arguments.
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
      T extends TramoCableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TramoCableGroupByArgs['orderBy'] }
        : { orderBy?: TramoCableGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TramoCableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTramoCableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TramoCable model
   */
  readonly fields: TramoCableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TramoCable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TramoCableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cajaDestino<T extends TramoCable$cajaDestinoArgs<ExtArgs> = {}>(args?: Subset<T, TramoCable$cajaDestinoArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mufaOrigen<T extends TramoCable$mufaOrigenArgs<ExtArgs> = {}>(args?: Subset<T, TramoCable$mufaOrigenArgs<ExtArgs>>): Prisma__MufaClient<$Result.GetResult<Prisma.$MufaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    posteFin<T extends PosteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosteDefaultArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posteInicio<T extends PosteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosteDefaultArgs<ExtArgs>>): Prisma__PosteClient<$Result.GetResult<Prisma.$PostePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proyecto<T extends ProyectoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProyectoDefaultArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TramoCable model
   */
  interface TramoCableFieldRefs {
    readonly id: FieldRef<"TramoCable", 'String'>
    readonly nombre: FieldRef<"TramoCable", 'String'>
    readonly tipoCable: FieldRef<"TramoCable", 'String'>
    readonly path: FieldRef<"TramoCable", 'String'>
    readonly colorVisual: FieldRef<"TramoCable", 'String'>
    readonly proyectoId: FieldRef<"TramoCable", 'String'>
    readonly posteInicioId: FieldRef<"TramoCable", 'String'>
    readonly posteFinId: FieldRef<"TramoCable", 'String'>
    readonly mufaOrigenId: FieldRef<"TramoCable", 'String'>
    readonly cajaDestinoId: FieldRef<"TramoCable", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TramoCable findUnique
   */
  export type TramoCableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter, which TramoCable to fetch.
     */
    where: TramoCableWhereUniqueInput
  }

  /**
   * TramoCable findUniqueOrThrow
   */
  export type TramoCableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter, which TramoCable to fetch.
     */
    where: TramoCableWhereUniqueInput
  }

  /**
   * TramoCable findFirst
   */
  export type TramoCableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter, which TramoCable to fetch.
     */
    where?: TramoCableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TramoCables to fetch.
     */
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TramoCables.
     */
    cursor?: TramoCableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TramoCables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TramoCables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TramoCables.
     */
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * TramoCable findFirstOrThrow
   */
  export type TramoCableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter, which TramoCable to fetch.
     */
    where?: TramoCableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TramoCables to fetch.
     */
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TramoCables.
     */
    cursor?: TramoCableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TramoCables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TramoCables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TramoCables.
     */
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * TramoCable findMany
   */
  export type TramoCableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter, which TramoCables to fetch.
     */
    where?: TramoCableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TramoCables to fetch.
     */
    orderBy?: TramoCableOrderByWithRelationInput | TramoCableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TramoCables.
     */
    cursor?: TramoCableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TramoCables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TramoCables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TramoCables.
     */
    distinct?: TramoCableScalarFieldEnum | TramoCableScalarFieldEnum[]
  }

  /**
   * TramoCable create
   */
  export type TramoCableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * The data needed to create a TramoCable.
     */
    data: XOR<TramoCableCreateInput, TramoCableUncheckedCreateInput>
  }

  /**
   * TramoCable createMany
   */
  export type TramoCableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TramoCables.
     */
    data: TramoCableCreateManyInput | TramoCableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TramoCable update
   */
  export type TramoCableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * The data needed to update a TramoCable.
     */
    data: XOR<TramoCableUpdateInput, TramoCableUncheckedUpdateInput>
    /**
     * Choose, which TramoCable to update.
     */
    where: TramoCableWhereUniqueInput
  }

  /**
   * TramoCable updateMany
   */
  export type TramoCableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TramoCables.
     */
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyInput>
    /**
     * Filter which TramoCables to update
     */
    where?: TramoCableWhereInput
    /**
     * Limit how many TramoCables to update.
     */
    limit?: number
  }

  /**
   * TramoCable upsert
   */
  export type TramoCableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * The filter to search for the TramoCable to update in case it exists.
     */
    where: TramoCableWhereUniqueInput
    /**
     * In case the TramoCable found by the `where` argument doesn't exist, create a new TramoCable with this data.
     */
    create: XOR<TramoCableCreateInput, TramoCableUncheckedCreateInput>
    /**
     * In case the TramoCable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TramoCableUpdateInput, TramoCableUncheckedUpdateInput>
  }

  /**
   * TramoCable delete
   */
  export type TramoCableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
    /**
     * Filter which TramoCable to delete.
     */
    where: TramoCableWhereUniqueInput
  }

  /**
   * TramoCable deleteMany
   */
  export type TramoCableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TramoCables to delete
     */
    where?: TramoCableWhereInput
    /**
     * Limit how many TramoCables to delete.
     */
    limit?: number
  }

  /**
   * TramoCable.cajaDestino
   */
  export type TramoCable$cajaDestinoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Caja
     */
    select?: CajaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Caja
     */
    omit?: CajaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CajaInclude<ExtArgs> | null
    where?: CajaWhereInput
  }

  /**
   * TramoCable.mufaOrigen
   */
  export type TramoCable$mufaOrigenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mufa
     */
    select?: MufaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mufa
     */
    omit?: MufaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MufaInclude<ExtArgs> | null
    where?: MufaWhereInput
  }

  /**
   * TramoCable without action
   */
  export type TramoCableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TramoCable
     */
    select?: TramoCableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TramoCable
     */
    omit?: TramoCableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TramoCableInclude<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteAvgAggregateOutputType = {
    latitud: number | null
    longitud: number | null
  }

  export type ClienteSumAggregateOutputType = {
    latitud: number | null
    longitud: number | null
  }

  export type ClienteMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    dni: string | null
    telefono: string | null
    direccion: string | null
    snMac: string | null
    latitud: number | null
    longitud: number | null
    estadoServicio: string | null
    cajaId: string | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    dni: string | null
    telefono: string | null
    direccion: string | null
    snMac: string | null
    latitud: number | null
    longitud: number | null
    estadoServicio: string | null
    cajaId: string | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nombre: number
    dni: number
    telefono: number
    direccion: number
    snMac: number
    latitud: number
    longitud: number
    estadoServicio: number
    cajaId: number
    _all: number
  }


  export type ClienteAvgAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type ClienteSumAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type ClienteMinAggregateInputType = {
    id?: true
    nombre?: true
    dni?: true
    telefono?: true
    direccion?: true
    snMac?: true
    latitud?: true
    longitud?: true
    estadoServicio?: true
    cajaId?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nombre?: true
    dni?: true
    telefono?: true
    direccion?: true
    snMac?: true
    latitud?: true
    longitud?: true
    estadoServicio?: true
    cajaId?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nombre?: true
    dni?: true
    telefono?: true
    direccion?: true
    snMac?: true
    latitud?: true
    longitud?: true
    estadoServicio?: true
    cajaId?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _avg?: ClienteAvgAggregateInputType
    _sum?: ClienteSumAggregateInputType
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: string
    nombre: string
    dni: string
    telefono: string | null
    direccion: string | null
    snMac: string | null
    latitud: number | null
    longitud: number | null
    estadoServicio: string
    cajaId: string
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    dni?: boolean
    telefono?: boolean
    direccion?: boolean
    snMac?: boolean
    latitud?: boolean
    longitud?: boolean
    estadoServicio?: boolean
    cajaId?: boolean
    caja?: boolean | CajaDefaultArgs<ExtArgs>
    averias?: boolean | Cliente$averiasArgs<ExtArgs>
    pagos?: boolean | Cliente$pagosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>



  export type ClienteSelectScalar = {
    id?: boolean
    nombre?: boolean
    dni?: boolean
    telefono?: boolean
    direccion?: boolean
    snMac?: boolean
    latitud?: boolean
    longitud?: boolean
    estadoServicio?: boolean
    cajaId?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "dni" | "telefono" | "direccion" | "snMac" | "latitud" | "longitud" | "estadoServicio" | "cajaId", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caja?: boolean | CajaDefaultArgs<ExtArgs>
    averias?: boolean | Cliente$averiasArgs<ExtArgs>
    pagos?: boolean | Cliente$pagosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      caja: Prisma.$CajaPayload<ExtArgs>
      averias: Prisma.$AveriaPayload<ExtArgs>[]
      pagos: Prisma.$PagoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      dni: string
      telefono: string | null
      direccion: string | null
      snMac: string | null
      latitud: number | null
      longitud: number | null
      estadoServicio: string
      cajaId: string
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
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
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    caja<T extends CajaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CajaDefaultArgs<ExtArgs>>): Prisma__CajaClient<$Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    averias<T extends Cliente$averiasArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$averiasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagos<T extends Cliente$pagosArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'String'>
    readonly nombre: FieldRef<"Cliente", 'String'>
    readonly dni: FieldRef<"Cliente", 'String'>
    readonly telefono: FieldRef<"Cliente", 'String'>
    readonly direccion: FieldRef<"Cliente", 'String'>
    readonly snMac: FieldRef<"Cliente", 'String'>
    readonly latitud: FieldRef<"Cliente", 'Float'>
    readonly longitud: FieldRef<"Cliente", 'Float'>
    readonly estadoServicio: FieldRef<"Cliente", 'String'>
    readonly cajaId: FieldRef<"Cliente", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.averias
   */
  export type Cliente$averiasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    where?: AveriaWhereInput
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    cursor?: AveriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AveriaScalarFieldEnum | AveriaScalarFieldEnum[]
  }

  /**
   * Cliente.pagos
   */
  export type Cliente$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    cursor?: PagoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Averia
   */

  export type AggregateAveria = {
    _count: AveriaCountAggregateOutputType | null
    _min: AveriaMinAggregateOutputType | null
    _max: AveriaMaxAggregateOutputType | null
  }

  export type AveriaMinAggregateOutputType = {
    id: string | null
    clienteId: string | null
    tecnicoId: string | null
  }

  export type AveriaMaxAggregateOutputType = {
    id: string | null
    clienteId: string | null
    tecnicoId: string | null
  }

  export type AveriaCountAggregateOutputType = {
    id: number
    clienteId: number
    tecnicoId: number
    _all: number
  }


  export type AveriaMinAggregateInputType = {
    id?: true
    clienteId?: true
    tecnicoId?: true
  }

  export type AveriaMaxAggregateInputType = {
    id?: true
    clienteId?: true
    tecnicoId?: true
  }

  export type AveriaCountAggregateInputType = {
    id?: true
    clienteId?: true
    tecnicoId?: true
    _all?: true
  }

  export type AveriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Averia to aggregate.
     */
    where?: AveriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Averias to fetch.
     */
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AveriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Averias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Averias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Averias
    **/
    _count?: true | AveriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AveriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AveriaMaxAggregateInputType
  }

  export type GetAveriaAggregateType<T extends AveriaAggregateArgs> = {
        [P in keyof T & keyof AggregateAveria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAveria[P]>
      : GetScalarType<T[P], AggregateAveria[P]>
  }




  export type AveriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AveriaWhereInput
    orderBy?: AveriaOrderByWithAggregationInput | AveriaOrderByWithAggregationInput[]
    by: AveriaScalarFieldEnum[] | AveriaScalarFieldEnum
    having?: AveriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AveriaCountAggregateInputType | true
    _min?: AveriaMinAggregateInputType
    _max?: AveriaMaxAggregateInputType
  }

  export type AveriaGroupByOutputType = {
    id: string
    clienteId: string
    tecnicoId: string | null
    _count: AveriaCountAggregateOutputType | null
    _min: AveriaMinAggregateOutputType | null
    _max: AveriaMaxAggregateOutputType | null
  }

  type GetAveriaGroupByPayload<T extends AveriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AveriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AveriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AveriaGroupByOutputType[P]>
            : GetScalarType<T[P], AveriaGroupByOutputType[P]>
        }
      >
    >


  export type AveriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    tecnicoId?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    tecnico?: boolean | Averia$tecnicoArgs<ExtArgs>
  }, ExtArgs["result"]["averia"]>



  export type AveriaSelectScalar = {
    id?: boolean
    clienteId?: boolean
    tecnicoId?: boolean
  }

  export type AveriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clienteId" | "tecnicoId", ExtArgs["result"]["averia"]>
  export type AveriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    tecnico?: boolean | Averia$tecnicoArgs<ExtArgs>
  }

  export type $AveriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Averia"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      tecnico: Prisma.$UsuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clienteId: string
      tecnicoId: string | null
    }, ExtArgs["result"]["averia"]>
    composites: {}
  }

  type AveriaGetPayload<S extends boolean | null | undefined | AveriaDefaultArgs> = $Result.GetResult<Prisma.$AveriaPayload, S>

  type AveriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AveriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AveriaCountAggregateInputType | true
    }

  export interface AveriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Averia'], meta: { name: 'Averia' } }
    /**
     * Find zero or one Averia that matches the filter.
     * @param {AveriaFindUniqueArgs} args - Arguments to find a Averia
     * @example
     * // Get one Averia
     * const averia = await prisma.averia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AveriaFindUniqueArgs>(args: SelectSubset<T, AveriaFindUniqueArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Averia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AveriaFindUniqueOrThrowArgs} args - Arguments to find a Averia
     * @example
     * // Get one Averia
     * const averia = await prisma.averia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AveriaFindUniqueOrThrowArgs>(args: SelectSubset<T, AveriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Averia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaFindFirstArgs} args - Arguments to find a Averia
     * @example
     * // Get one Averia
     * const averia = await prisma.averia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AveriaFindFirstArgs>(args?: SelectSubset<T, AveriaFindFirstArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Averia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaFindFirstOrThrowArgs} args - Arguments to find a Averia
     * @example
     * // Get one Averia
     * const averia = await prisma.averia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AveriaFindFirstOrThrowArgs>(args?: SelectSubset<T, AveriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Averias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Averias
     * const averias = await prisma.averia.findMany()
     * 
     * // Get first 10 Averias
     * const averias = await prisma.averia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const averiaWithIdOnly = await prisma.averia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AveriaFindManyArgs>(args?: SelectSubset<T, AveriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Averia.
     * @param {AveriaCreateArgs} args - Arguments to create a Averia.
     * @example
     * // Create one Averia
     * const Averia = await prisma.averia.create({
     *   data: {
     *     // ... data to create a Averia
     *   }
     * })
     * 
     */
    create<T extends AveriaCreateArgs>(args: SelectSubset<T, AveriaCreateArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Averias.
     * @param {AveriaCreateManyArgs} args - Arguments to create many Averias.
     * @example
     * // Create many Averias
     * const averia = await prisma.averia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AveriaCreateManyArgs>(args?: SelectSubset<T, AveriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Averia.
     * @param {AveriaDeleteArgs} args - Arguments to delete one Averia.
     * @example
     * // Delete one Averia
     * const Averia = await prisma.averia.delete({
     *   where: {
     *     // ... filter to delete one Averia
     *   }
     * })
     * 
     */
    delete<T extends AveriaDeleteArgs>(args: SelectSubset<T, AveriaDeleteArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Averia.
     * @param {AveriaUpdateArgs} args - Arguments to update one Averia.
     * @example
     * // Update one Averia
     * const averia = await prisma.averia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AveriaUpdateArgs>(args: SelectSubset<T, AveriaUpdateArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Averias.
     * @param {AveriaDeleteManyArgs} args - Arguments to filter Averias to delete.
     * @example
     * // Delete a few Averias
     * const { count } = await prisma.averia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AveriaDeleteManyArgs>(args?: SelectSubset<T, AveriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Averias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Averias
     * const averia = await prisma.averia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AveriaUpdateManyArgs>(args: SelectSubset<T, AveriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Averia.
     * @param {AveriaUpsertArgs} args - Arguments to update or create a Averia.
     * @example
     * // Update or create a Averia
     * const averia = await prisma.averia.upsert({
     *   create: {
     *     // ... data to create a Averia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Averia we want to update
     *   }
     * })
     */
    upsert<T extends AveriaUpsertArgs>(args: SelectSubset<T, AveriaUpsertArgs<ExtArgs>>): Prisma__AveriaClient<$Result.GetResult<Prisma.$AveriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Averias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaCountArgs} args - Arguments to filter Averias to count.
     * @example
     * // Count the number of Averias
     * const count = await prisma.averia.count({
     *   where: {
     *     // ... the filter for the Averias we want to count
     *   }
     * })
    **/
    count<T extends AveriaCountArgs>(
      args?: Subset<T, AveriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AveriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Averia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AveriaAggregateArgs>(args: Subset<T, AveriaAggregateArgs>): Prisma.PrismaPromise<GetAveriaAggregateType<T>>

    /**
     * Group by Averia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AveriaGroupByArgs} args - Group by arguments.
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
      T extends AveriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AveriaGroupByArgs['orderBy'] }
        : { orderBy?: AveriaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AveriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAveriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Averia model
   */
  readonly fields: AveriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Averia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AveriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tecnico<T extends Averia$tecnicoArgs<ExtArgs> = {}>(args?: Subset<T, Averia$tecnicoArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Averia model
   */
  interface AveriaFieldRefs {
    readonly id: FieldRef<"Averia", 'String'>
    readonly clienteId: FieldRef<"Averia", 'String'>
    readonly tecnicoId: FieldRef<"Averia", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Averia findUnique
   */
  export type AveriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter, which Averia to fetch.
     */
    where: AveriaWhereUniqueInput
  }

  /**
   * Averia findUniqueOrThrow
   */
  export type AveriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter, which Averia to fetch.
     */
    where: AveriaWhereUniqueInput
  }

  /**
   * Averia findFirst
   */
  export type AveriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter, which Averia to fetch.
     */
    where?: AveriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Averias to fetch.
     */
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Averias.
     */
    cursor?: AveriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Averias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Averias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Averias.
     */
    distinct?: AveriaScalarFieldEnum | AveriaScalarFieldEnum[]
  }

  /**
   * Averia findFirstOrThrow
   */
  export type AveriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter, which Averia to fetch.
     */
    where?: AveriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Averias to fetch.
     */
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Averias.
     */
    cursor?: AveriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Averias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Averias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Averias.
     */
    distinct?: AveriaScalarFieldEnum | AveriaScalarFieldEnum[]
  }

  /**
   * Averia findMany
   */
  export type AveriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter, which Averias to fetch.
     */
    where?: AveriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Averias to fetch.
     */
    orderBy?: AveriaOrderByWithRelationInput | AveriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Averias.
     */
    cursor?: AveriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Averias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Averias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Averias.
     */
    distinct?: AveriaScalarFieldEnum | AveriaScalarFieldEnum[]
  }

  /**
   * Averia create
   */
  export type AveriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Averia.
     */
    data: XOR<AveriaCreateInput, AveriaUncheckedCreateInput>
  }

  /**
   * Averia createMany
   */
  export type AveriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Averias.
     */
    data: AveriaCreateManyInput | AveriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Averia update
   */
  export type AveriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Averia.
     */
    data: XOR<AveriaUpdateInput, AveriaUncheckedUpdateInput>
    /**
     * Choose, which Averia to update.
     */
    where: AveriaWhereUniqueInput
  }

  /**
   * Averia updateMany
   */
  export type AveriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Averias.
     */
    data: XOR<AveriaUpdateManyMutationInput, AveriaUncheckedUpdateManyInput>
    /**
     * Filter which Averias to update
     */
    where?: AveriaWhereInput
    /**
     * Limit how many Averias to update.
     */
    limit?: number
  }

  /**
   * Averia upsert
   */
  export type AveriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Averia to update in case it exists.
     */
    where: AveriaWhereUniqueInput
    /**
     * In case the Averia found by the `where` argument doesn't exist, create a new Averia with this data.
     */
    create: XOR<AveriaCreateInput, AveriaUncheckedCreateInput>
    /**
     * In case the Averia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AveriaUpdateInput, AveriaUncheckedUpdateInput>
  }

  /**
   * Averia delete
   */
  export type AveriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
    /**
     * Filter which Averia to delete.
     */
    where: AveriaWhereUniqueInput
  }

  /**
   * Averia deleteMany
   */
  export type AveriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Averias to delete
     */
    where?: AveriaWhereInput
    /**
     * Limit how many Averias to delete.
     */
    limit?: number
  }

  /**
   * Averia.tecnico
   */
  export type Averia$tecnicoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Averia without action
   */
  export type AveriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Averia
     */
    select?: AveriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Averia
     */
    omit?: AveriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AveriaInclude<ExtArgs> | null
  }


  /**
   * Model Pago
   */

  export type AggregatePago = {
    _count: PagoCountAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  export type PagoMinAggregateOutputType = {
    id: string | null
    clienteId: string | null
  }

  export type PagoMaxAggregateOutputType = {
    id: string | null
    clienteId: string | null
  }

  export type PagoCountAggregateOutputType = {
    id: number
    clienteId: number
    _all: number
  }


  export type PagoMinAggregateInputType = {
    id?: true
    clienteId?: true
  }

  export type PagoMaxAggregateInputType = {
    id?: true
    clienteId?: true
  }

  export type PagoCountAggregateInputType = {
    id?: true
    clienteId?: true
    _all?: true
  }

  export type PagoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pago to aggregate.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagos
    **/
    _count?: true | PagoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoMaxAggregateInputType
  }

  export type GetPagoAggregateType<T extends PagoAggregateArgs> = {
        [P in keyof T & keyof AggregatePago]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePago[P]>
      : GetScalarType<T[P], AggregatePago[P]>
  }




  export type PagoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithAggregationInput | PagoOrderByWithAggregationInput[]
    by: PagoScalarFieldEnum[] | PagoScalarFieldEnum
    having?: PagoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoCountAggregateInputType | true
    _min?: PagoMinAggregateInputType
    _max?: PagoMaxAggregateInputType
  }

  export type PagoGroupByOutputType = {
    id: string
    clienteId: string
    _count: PagoCountAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  type GetPagoGroupByPayload<T extends PagoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoGroupByOutputType[P]>
        }
      >
    >


  export type PagoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>



  export type PagoSelectScalar = {
    id?: boolean
    clienteId?: boolean
  }

  export type PagoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clienteId", ExtArgs["result"]["pago"]>
  export type PagoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }

  export type $PagoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pago"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clienteId: string
    }, ExtArgs["result"]["pago"]>
    composites: {}
  }

  type PagoGetPayload<S extends boolean | null | undefined | PagoDefaultArgs> = $Result.GetResult<Prisma.$PagoPayload, S>

  type PagoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagoCountAggregateInputType | true
    }

  export interface PagoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pago'], meta: { name: 'Pago' } }
    /**
     * Find zero or one Pago that matches the filter.
     * @param {PagoFindUniqueArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoFindUniqueArgs>(args: SelectSubset<T, PagoFindUniqueArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pago that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagoFindUniqueOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoFindFirstArgs>(args?: SelectSubset<T, PagoFindFirstArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pago.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pago.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagoWithIdOnly = await prisma.pago.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagoFindManyArgs>(args?: SelectSubset<T, PagoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pago.
     * @param {PagoCreateArgs} args - Arguments to create a Pago.
     * @example
     * // Create one Pago
     * const Pago = await prisma.pago.create({
     *   data: {
     *     // ... data to create a Pago
     *   }
     * })
     * 
     */
    create<T extends PagoCreateArgs>(args: SelectSubset<T, PagoCreateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {PagoCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoCreateManyArgs>(args?: SelectSubset<T, PagoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pago.
     * @param {PagoDeleteArgs} args - Arguments to delete one Pago.
     * @example
     * // Delete one Pago
     * const Pago = await prisma.pago.delete({
     *   where: {
     *     // ... filter to delete one Pago
     *   }
     * })
     * 
     */
    delete<T extends PagoDeleteArgs>(args: SelectSubset<T, PagoDeleteArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pago.
     * @param {PagoUpdateArgs} args - Arguments to update one Pago.
     * @example
     * // Update one Pago
     * const pago = await prisma.pago.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoUpdateArgs>(args: SelectSubset<T, PagoUpdateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {PagoDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pago.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoDeleteManyArgs>(args?: SelectSubset<T, PagoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoUpdateManyArgs>(args: SelectSubset<T, PagoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pago.
     * @param {PagoUpsertArgs} args - Arguments to update or create a Pago.
     * @example
     * // Update or create a Pago
     * const pago = await prisma.pago.upsert({
     *   create: {
     *     // ... data to create a Pago
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pago we want to update
     *   }
     * })
     */
    upsert<T extends PagoUpsertArgs>(args: SelectSubset<T, PagoUpsertArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pago.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends PagoCountArgs>(
      args?: Subset<T, PagoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PagoAggregateArgs>(args: Subset<T, PagoAggregateArgs>): Prisma.PrismaPromise<GetPagoAggregateType<T>>

    /**
     * Group by Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoGroupByArgs} args - Group by arguments.
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
      T extends PagoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoGroupByArgs['orderBy'] }
        : { orderBy?: PagoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PagoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pago model
   */
  readonly fields: PagoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pago.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Pago model
   */
  interface PagoFieldRefs {
    readonly id: FieldRef<"Pago", 'String'>
    readonly clienteId: FieldRef<"Pago", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pago findUnique
   */
  export type PagoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findUniqueOrThrow
   */
  export type PagoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findFirst
   */
  export type PagoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findFirstOrThrow
   */
  export type PagoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findMany
   */
  export type PagoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pagos to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago create
   */
  export type PagoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pago.
     */
    data: XOR<PagoCreateInput, PagoUncheckedCreateInput>
  }

  /**
   * Pago createMany
   */
  export type PagoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pago update
   */
  export type PagoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pago.
     */
    data: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
    /**
     * Choose, which Pago to update.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago updateMany
   */
  export type PagoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
  }

  /**
   * Pago upsert
   */
  export type PagoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pago to update in case it exists.
     */
    where: PagoWhereUniqueInput
    /**
     * In case the Pago found by the `where` argument doesn't exist, create a new Pago with this data.
     */
    create: XOR<PagoCreateInput, PagoUncheckedCreateInput>
    /**
     * In case the Pago was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
  }

  /**
   * Pago delete
   */
  export type PagoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter which Pago to delete.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago deleteMany
   */
  export type PagoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagos to delete
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to delete.
     */
    limit?: number
  }

  /**
   * Pago without action
   */
  export type PagoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
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


  export const ProyectoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    estado: 'estado',
    creadoEn: 'creadoEn'
  };

  export type ProyectoScalarFieldEnum = (typeof ProyectoScalarFieldEnum)[keyof typeof ProyectoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    rol: 'rol',
    activo: 'activo',
    creadoEn: 'creadoEn'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const TroncalScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    bufferColor: 'bufferColor',
    cantHilos: 'cantHilos',
    hilosLibres: 'hilosLibres',
    descripcion: 'descripcion',
    ruta: 'ruta',
    proyectoId: 'proyectoId',
    creadoEn: 'creadoEn'
  };

  export type TroncalScalarFieldEnum = (typeof TroncalScalarFieldEnum)[keyof typeof TroncalScalarFieldEnum]


  export const MufaScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    latitud: 'latitud',
    longitud: 'longitud',
    bufferEntrada: 'bufferEntrada',
    hiloEntrada: 'hiloEntrada',
    ratioSplitteo: 'ratioSplitteo',
    hilosDisponibles: 'hilosDisponibles',
    troncalId: 'troncalId',
    posteId: 'posteId',
    creadoEn: 'creadoEn'
  };

  export type MufaScalarFieldEnum = (typeof MufaScalarFieldEnum)[keyof typeof MufaScalarFieldEnum]


  export const CajaScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    latitud: 'latitud',
    longitud: 'longitud',
    colorHiloCaja: 'colorHiloCaja',
    puertosLibres: 'puertosLibres',
    mufaId: 'mufaId',
    posteId: 'posteId',
    creadoEn: 'creadoEn'
  };

  export type CajaScalarFieldEnum = (typeof CajaScalarFieldEnum)[keyof typeof CajaScalarFieldEnum]


  export const PosteScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    latitud: 'latitud',
    longitud: 'longitud',
    tipo: 'tipo',
    altura: 'altura',
    creadoEn: 'creadoEn'
  };

  export type PosteScalarFieldEnum = (typeof PosteScalarFieldEnum)[keyof typeof PosteScalarFieldEnum]


  export const TramoCableScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    tipoCable: 'tipoCable',
    path: 'path',
    colorVisual: 'colorVisual',
    proyectoId: 'proyectoId',
    posteInicioId: 'posteInicioId',
    posteFinId: 'posteFinId',
    mufaOrigenId: 'mufaOrigenId',
    cajaDestinoId: 'cajaDestinoId'
  };

  export type TramoCableScalarFieldEnum = (typeof TramoCableScalarFieldEnum)[keyof typeof TramoCableScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    dni: 'dni',
    telefono: 'telefono',
    direccion: 'direccion',
    snMac: 'snMac',
    latitud: 'latitud',
    longitud: 'longitud',
    estadoServicio: 'estadoServicio',
    cajaId: 'cajaId'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const AveriaScalarFieldEnum: {
    id: 'id',
    clienteId: 'clienteId',
    tecnicoId: 'tecnicoId'
  };

  export type AveriaScalarFieldEnum = (typeof AveriaScalarFieldEnum)[keyof typeof AveriaScalarFieldEnum]


  export const PagoScalarFieldEnum: {
    id: 'id',
    clienteId: 'clienteId'
  };

  export type PagoScalarFieldEnum = (typeof PagoScalarFieldEnum)[keyof typeof PagoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ProyectoOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    estado: 'estado'
  };

  export type ProyectoOrderByRelevanceFieldEnum = (typeof ProyectoOrderByRelevanceFieldEnum)[keyof typeof ProyectoOrderByRelevanceFieldEnum]


  export const UsuarioOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password'
  };

  export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum]


  export const TroncalOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    bufferColor: 'bufferColor',
    descripcion: 'descripcion',
    ruta: 'ruta',
    proyectoId: 'proyectoId'
  };

  export type TroncalOrderByRelevanceFieldEnum = (typeof TroncalOrderByRelevanceFieldEnum)[keyof typeof TroncalOrderByRelevanceFieldEnum]


  export const MufaOrderByRelevanceFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    bufferEntrada: 'bufferEntrada',
    ratioSplitteo: 'ratioSplitteo',
    troncalId: 'troncalId',
    posteId: 'posteId'
  };

  export type MufaOrderByRelevanceFieldEnum = (typeof MufaOrderByRelevanceFieldEnum)[keyof typeof MufaOrderByRelevanceFieldEnum]


  export const CajaOrderByRelevanceFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    colorHiloCaja: 'colorHiloCaja',
    mufaId: 'mufaId',
    posteId: 'posteId'
  };

  export type CajaOrderByRelevanceFieldEnum = (typeof CajaOrderByRelevanceFieldEnum)[keyof typeof CajaOrderByRelevanceFieldEnum]


  export const PosteOrderByRelevanceFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    tipo: 'tipo',
    altura: 'altura'
  };

  export type PosteOrderByRelevanceFieldEnum = (typeof PosteOrderByRelevanceFieldEnum)[keyof typeof PosteOrderByRelevanceFieldEnum]


  export const TramoCableOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    tipoCable: 'tipoCable',
    path: 'path',
    colorVisual: 'colorVisual',
    proyectoId: 'proyectoId',
    posteInicioId: 'posteInicioId',
    posteFinId: 'posteFinId',
    mufaOrigenId: 'mufaOrigenId',
    cajaDestinoId: 'cajaDestinoId'
  };

  export type TramoCableOrderByRelevanceFieldEnum = (typeof TramoCableOrderByRelevanceFieldEnum)[keyof typeof TramoCableOrderByRelevanceFieldEnum]


  export const ClienteOrderByRelevanceFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    dni: 'dni',
    telefono: 'telefono',
    direccion: 'direccion',
    snMac: 'snMac',
    estadoServicio: 'estadoServicio',
    cajaId: 'cajaId'
  };

  export type ClienteOrderByRelevanceFieldEnum = (typeof ClienteOrderByRelevanceFieldEnum)[keyof typeof ClienteOrderByRelevanceFieldEnum]


  export const AveriaOrderByRelevanceFieldEnum: {
    id: 'id',
    clienteId: 'clienteId',
    tecnicoId: 'tecnicoId'
  };

  export type AveriaOrderByRelevanceFieldEnum = (typeof AveriaOrderByRelevanceFieldEnum)[keyof typeof AveriaOrderByRelevanceFieldEnum]


  export const PagoOrderByRelevanceFieldEnum: {
    id: 'id',
    clienteId: 'clienteId'
  };

  export type PagoOrderByRelevanceFieldEnum = (typeof PagoOrderByRelevanceFieldEnum)[keyof typeof PagoOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Rol'
   */
  export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProyectoWhereInput = {
    AND?: ProyectoWhereInput | ProyectoWhereInput[]
    OR?: ProyectoWhereInput[]
    NOT?: ProyectoWhereInput | ProyectoWhereInput[]
    id?: StringFilter<"Proyecto"> | string
    nombre?: StringFilter<"Proyecto"> | string
    descripcion?: StringNullableFilter<"Proyecto"> | string | null
    estado?: StringFilter<"Proyecto"> | string
    creadoEn?: DateTimeFilter<"Proyecto"> | Date | string
    tramos?: TramoCableListRelationFilter
    troncales?: TroncalListRelationFilter
  }

  export type ProyectoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    tramos?: TramoCableOrderByRelationAggregateInput
    troncales?: TroncalOrderByRelationAggregateInput
    _relevance?: ProyectoOrderByRelevanceInput
  }

  export type ProyectoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProyectoWhereInput | ProyectoWhereInput[]
    OR?: ProyectoWhereInput[]
    NOT?: ProyectoWhereInput | ProyectoWhereInput[]
    nombre?: StringFilter<"Proyecto"> | string
    descripcion?: StringNullableFilter<"Proyecto"> | string | null
    estado?: StringFilter<"Proyecto"> | string
    creadoEn?: DateTimeFilter<"Proyecto"> | Date | string
    tramos?: TramoCableListRelationFilter
    troncales?: TroncalListRelationFilter
  }, "id">

  export type ProyectoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    _count?: ProyectoCountOrderByAggregateInput
    _max?: ProyectoMaxOrderByAggregateInput
    _min?: ProyectoMinOrderByAggregateInput
  }

  export type ProyectoScalarWhereWithAggregatesInput = {
    AND?: ProyectoScalarWhereWithAggregatesInput | ProyectoScalarWhereWithAggregatesInput[]
    OR?: ProyectoScalarWhereWithAggregatesInput[]
    NOT?: ProyectoScalarWhereWithAggregatesInput | ProyectoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proyecto"> | string
    nombre?: StringWithAggregatesFilter<"Proyecto"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Proyecto"> | string | null
    estado?: StringWithAggregatesFilter<"Proyecto"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Proyecto"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    activo?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    averiasAsignadas?: AveriaListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    averiasAsignadas?: AveriaOrderByRelationAggregateInput
    _relevance?: UsuarioOrderByRelevanceInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    activo?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    averiasAsignadas?: AveriaListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: EnumRolWithAggregatesFilter<"Usuario"> | $Enums.Rol
    activo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    creadoEn?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type TroncalWhereInput = {
    AND?: TroncalWhereInput | TroncalWhereInput[]
    OR?: TroncalWhereInput[]
    NOT?: TroncalWhereInput | TroncalWhereInput[]
    id?: StringFilter<"Troncal"> | string
    nombre?: StringFilter<"Troncal"> | string
    bufferColor?: StringFilter<"Troncal"> | string
    cantHilos?: IntFilter<"Troncal"> | number
    hilosLibres?: IntFilter<"Troncal"> | number
    descripcion?: StringNullableFilter<"Troncal"> | string | null
    ruta?: StringNullableFilter<"Troncal"> | string | null
    proyectoId?: StringFilter<"Troncal"> | string
    creadoEn?: DateTimeFilter<"Troncal"> | Date | string
    mufas?: MufaListRelationFilter
    proyecto?: XOR<ProyectoScalarRelationFilter, ProyectoWhereInput>
  }

  export type TroncalOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    bufferColor?: SortOrder
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    ruta?: SortOrderInput | SortOrder
    proyectoId?: SortOrder
    creadoEn?: SortOrder
    mufas?: MufaOrderByRelationAggregateInput
    proyecto?: ProyectoOrderByWithRelationInput
    _relevance?: TroncalOrderByRelevanceInput
  }

  export type TroncalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: TroncalWhereInput | TroncalWhereInput[]
    OR?: TroncalWhereInput[]
    NOT?: TroncalWhereInput | TroncalWhereInput[]
    bufferColor?: StringFilter<"Troncal"> | string
    cantHilos?: IntFilter<"Troncal"> | number
    hilosLibres?: IntFilter<"Troncal"> | number
    descripcion?: StringNullableFilter<"Troncal"> | string | null
    ruta?: StringNullableFilter<"Troncal"> | string | null
    proyectoId?: StringFilter<"Troncal"> | string
    creadoEn?: DateTimeFilter<"Troncal"> | Date | string
    mufas?: MufaListRelationFilter
    proyecto?: XOR<ProyectoScalarRelationFilter, ProyectoWhereInput>
  }, "id" | "nombre">

  export type TroncalOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    bufferColor?: SortOrder
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    ruta?: SortOrderInput | SortOrder
    proyectoId?: SortOrder
    creadoEn?: SortOrder
    _count?: TroncalCountOrderByAggregateInput
    _avg?: TroncalAvgOrderByAggregateInput
    _max?: TroncalMaxOrderByAggregateInput
    _min?: TroncalMinOrderByAggregateInput
    _sum?: TroncalSumOrderByAggregateInput
  }

  export type TroncalScalarWhereWithAggregatesInput = {
    AND?: TroncalScalarWhereWithAggregatesInput | TroncalScalarWhereWithAggregatesInput[]
    OR?: TroncalScalarWhereWithAggregatesInput[]
    NOT?: TroncalScalarWhereWithAggregatesInput | TroncalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Troncal"> | string
    nombre?: StringWithAggregatesFilter<"Troncal"> | string
    bufferColor?: StringWithAggregatesFilter<"Troncal"> | string
    cantHilos?: IntWithAggregatesFilter<"Troncal"> | number
    hilosLibres?: IntWithAggregatesFilter<"Troncal"> | number
    descripcion?: StringNullableWithAggregatesFilter<"Troncal"> | string | null
    ruta?: StringNullableWithAggregatesFilter<"Troncal"> | string | null
    proyectoId?: StringWithAggregatesFilter<"Troncal"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Troncal"> | Date | string
  }

  export type MufaWhereInput = {
    AND?: MufaWhereInput | MufaWhereInput[]
    OR?: MufaWhereInput[]
    NOT?: MufaWhereInput | MufaWhereInput[]
    id?: StringFilter<"Mufa"> | string
    codigo?: StringFilter<"Mufa"> | string
    latitud?: FloatFilter<"Mufa"> | number
    longitud?: FloatFilter<"Mufa"> | number
    bufferEntrada?: StringFilter<"Mufa"> | string
    hiloEntrada?: IntFilter<"Mufa"> | number
    ratioSplitteo?: StringFilter<"Mufa"> | string
    hilosDisponibles?: IntFilter<"Mufa"> | number
    troncalId?: StringFilter<"Mufa"> | string
    posteId?: StringFilter<"Mufa"> | string
    creadoEn?: DateTimeFilter<"Mufa"> | Date | string
    cajas?: CajaListRelationFilter
    poste?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    troncal?: XOR<TroncalScalarRelationFilter, TroncalWhereInput>
    tramosOrigen?: TramoCableListRelationFilter
  }

  export type MufaOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    bufferEntrada?: SortOrder
    hiloEntrada?: SortOrder
    ratioSplitteo?: SortOrder
    hilosDisponibles?: SortOrder
    troncalId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
    cajas?: CajaOrderByRelationAggregateInput
    poste?: PosteOrderByWithRelationInput
    troncal?: TroncalOrderByWithRelationInput
    tramosOrigen?: TramoCableOrderByRelationAggregateInput
    _relevance?: MufaOrderByRelevanceInput
  }

  export type MufaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codigo?: string
    AND?: MufaWhereInput | MufaWhereInput[]
    OR?: MufaWhereInput[]
    NOT?: MufaWhereInput | MufaWhereInput[]
    latitud?: FloatFilter<"Mufa"> | number
    longitud?: FloatFilter<"Mufa"> | number
    bufferEntrada?: StringFilter<"Mufa"> | string
    hiloEntrada?: IntFilter<"Mufa"> | number
    ratioSplitteo?: StringFilter<"Mufa"> | string
    hilosDisponibles?: IntFilter<"Mufa"> | number
    troncalId?: StringFilter<"Mufa"> | string
    posteId?: StringFilter<"Mufa"> | string
    creadoEn?: DateTimeFilter<"Mufa"> | Date | string
    cajas?: CajaListRelationFilter
    poste?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    troncal?: XOR<TroncalScalarRelationFilter, TroncalWhereInput>
    tramosOrigen?: TramoCableListRelationFilter
  }, "id" | "codigo">

  export type MufaOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    bufferEntrada?: SortOrder
    hiloEntrada?: SortOrder
    ratioSplitteo?: SortOrder
    hilosDisponibles?: SortOrder
    troncalId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
    _count?: MufaCountOrderByAggregateInput
    _avg?: MufaAvgOrderByAggregateInput
    _max?: MufaMaxOrderByAggregateInput
    _min?: MufaMinOrderByAggregateInput
    _sum?: MufaSumOrderByAggregateInput
  }

  export type MufaScalarWhereWithAggregatesInput = {
    AND?: MufaScalarWhereWithAggregatesInput | MufaScalarWhereWithAggregatesInput[]
    OR?: MufaScalarWhereWithAggregatesInput[]
    NOT?: MufaScalarWhereWithAggregatesInput | MufaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mufa"> | string
    codigo?: StringWithAggregatesFilter<"Mufa"> | string
    latitud?: FloatWithAggregatesFilter<"Mufa"> | number
    longitud?: FloatWithAggregatesFilter<"Mufa"> | number
    bufferEntrada?: StringWithAggregatesFilter<"Mufa"> | string
    hiloEntrada?: IntWithAggregatesFilter<"Mufa"> | number
    ratioSplitteo?: StringWithAggregatesFilter<"Mufa"> | string
    hilosDisponibles?: IntWithAggregatesFilter<"Mufa"> | number
    troncalId?: StringWithAggregatesFilter<"Mufa"> | string
    posteId?: StringWithAggregatesFilter<"Mufa"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Mufa"> | Date | string
  }

  export type CajaWhereInput = {
    AND?: CajaWhereInput | CajaWhereInput[]
    OR?: CajaWhereInput[]
    NOT?: CajaWhereInput | CajaWhereInput[]
    id?: StringFilter<"Caja"> | string
    codigo?: StringFilter<"Caja"> | string
    latitud?: FloatFilter<"Caja"> | number
    longitud?: FloatFilter<"Caja"> | number
    colorHiloCaja?: StringNullableFilter<"Caja"> | string | null
    puertosLibres?: IntFilter<"Caja"> | number
    mufaId?: StringFilter<"Caja"> | string
    posteId?: StringFilter<"Caja"> | string
    creadoEn?: DateTimeFilter<"Caja"> | Date | string
    mufa?: XOR<MufaScalarRelationFilter, MufaWhereInput>
    poste?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    clientes?: ClienteListRelationFilter
    tramosDestino?: TramoCableListRelationFilter
  }

  export type CajaOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    colorHiloCaja?: SortOrderInput | SortOrder
    puertosLibres?: SortOrder
    mufaId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
    mufa?: MufaOrderByWithRelationInput
    poste?: PosteOrderByWithRelationInput
    clientes?: ClienteOrderByRelationAggregateInput
    tramosDestino?: TramoCableOrderByRelationAggregateInput
    _relevance?: CajaOrderByRelevanceInput
  }

  export type CajaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codigo?: string
    AND?: CajaWhereInput | CajaWhereInput[]
    OR?: CajaWhereInput[]
    NOT?: CajaWhereInput | CajaWhereInput[]
    latitud?: FloatFilter<"Caja"> | number
    longitud?: FloatFilter<"Caja"> | number
    colorHiloCaja?: StringNullableFilter<"Caja"> | string | null
    puertosLibres?: IntFilter<"Caja"> | number
    mufaId?: StringFilter<"Caja"> | string
    posteId?: StringFilter<"Caja"> | string
    creadoEn?: DateTimeFilter<"Caja"> | Date | string
    mufa?: XOR<MufaScalarRelationFilter, MufaWhereInput>
    poste?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    clientes?: ClienteListRelationFilter
    tramosDestino?: TramoCableListRelationFilter
  }, "id" | "codigo">

  export type CajaOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    colorHiloCaja?: SortOrderInput | SortOrder
    puertosLibres?: SortOrder
    mufaId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
    _count?: CajaCountOrderByAggregateInput
    _avg?: CajaAvgOrderByAggregateInput
    _max?: CajaMaxOrderByAggregateInput
    _min?: CajaMinOrderByAggregateInput
    _sum?: CajaSumOrderByAggregateInput
  }

  export type CajaScalarWhereWithAggregatesInput = {
    AND?: CajaScalarWhereWithAggregatesInput | CajaScalarWhereWithAggregatesInput[]
    OR?: CajaScalarWhereWithAggregatesInput[]
    NOT?: CajaScalarWhereWithAggregatesInput | CajaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Caja"> | string
    codigo?: StringWithAggregatesFilter<"Caja"> | string
    latitud?: FloatWithAggregatesFilter<"Caja"> | number
    longitud?: FloatWithAggregatesFilter<"Caja"> | number
    colorHiloCaja?: StringNullableWithAggregatesFilter<"Caja"> | string | null
    puertosLibres?: IntWithAggregatesFilter<"Caja"> | number
    mufaId?: StringWithAggregatesFilter<"Caja"> | string
    posteId?: StringWithAggregatesFilter<"Caja"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Caja"> | Date | string
  }

  export type PosteWhereInput = {
    AND?: PosteWhereInput | PosteWhereInput[]
    OR?: PosteWhereInput[]
    NOT?: PosteWhereInput | PosteWhereInput[]
    id?: StringFilter<"Poste"> | string
    codigo?: StringFilter<"Poste"> | string
    latitud?: FloatFilter<"Poste"> | number
    longitud?: FloatFilter<"Poste"> | number
    tipo?: StringFilter<"Poste"> | string
    altura?: StringNullableFilter<"Poste"> | string | null
    creadoEn?: DateTimeFilter<"Poste"> | Date | string
    cajas?: CajaListRelationFilter
    mufas?: MufaListRelationFilter
    tramosFin?: TramoCableListRelationFilter
    tramosInicio?: TramoCableListRelationFilter
  }

  export type PosteOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    tipo?: SortOrder
    altura?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    cajas?: CajaOrderByRelationAggregateInput
    mufas?: MufaOrderByRelationAggregateInput
    tramosFin?: TramoCableOrderByRelationAggregateInput
    tramosInicio?: TramoCableOrderByRelationAggregateInput
    _relevance?: PosteOrderByRelevanceInput
  }

  export type PosteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codigo?: string
    AND?: PosteWhereInput | PosteWhereInput[]
    OR?: PosteWhereInput[]
    NOT?: PosteWhereInput | PosteWhereInput[]
    latitud?: FloatFilter<"Poste"> | number
    longitud?: FloatFilter<"Poste"> | number
    tipo?: StringFilter<"Poste"> | string
    altura?: StringNullableFilter<"Poste"> | string | null
    creadoEn?: DateTimeFilter<"Poste"> | Date | string
    cajas?: CajaListRelationFilter
    mufas?: MufaListRelationFilter
    tramosFin?: TramoCableListRelationFilter
    tramosInicio?: TramoCableListRelationFilter
  }, "id" | "codigo">

  export type PosteOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    tipo?: SortOrder
    altura?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    _count?: PosteCountOrderByAggregateInput
    _avg?: PosteAvgOrderByAggregateInput
    _max?: PosteMaxOrderByAggregateInput
    _min?: PosteMinOrderByAggregateInput
    _sum?: PosteSumOrderByAggregateInput
  }

  export type PosteScalarWhereWithAggregatesInput = {
    AND?: PosteScalarWhereWithAggregatesInput | PosteScalarWhereWithAggregatesInput[]
    OR?: PosteScalarWhereWithAggregatesInput[]
    NOT?: PosteScalarWhereWithAggregatesInput | PosteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Poste"> | string
    codigo?: StringWithAggregatesFilter<"Poste"> | string
    latitud?: FloatWithAggregatesFilter<"Poste"> | number
    longitud?: FloatWithAggregatesFilter<"Poste"> | number
    tipo?: StringWithAggregatesFilter<"Poste"> | string
    altura?: StringNullableWithAggregatesFilter<"Poste"> | string | null
    creadoEn?: DateTimeWithAggregatesFilter<"Poste"> | Date | string
  }

  export type TramoCableWhereInput = {
    AND?: TramoCableWhereInput | TramoCableWhereInput[]
    OR?: TramoCableWhereInput[]
    NOT?: TramoCableWhereInput | TramoCableWhereInput[]
    id?: StringFilter<"TramoCable"> | string
    nombre?: StringNullableFilter<"TramoCable"> | string | null
    tipoCable?: StringFilter<"TramoCable"> | string
    path?: StringFilter<"TramoCable"> | string
    colorVisual?: StringFilter<"TramoCable"> | string
    proyectoId?: StringFilter<"TramoCable"> | string
    posteInicioId?: StringFilter<"TramoCable"> | string
    posteFinId?: StringFilter<"TramoCable"> | string
    mufaOrigenId?: StringNullableFilter<"TramoCable"> | string | null
    cajaDestinoId?: StringNullableFilter<"TramoCable"> | string | null
    cajaDestino?: XOR<CajaNullableScalarRelationFilter, CajaWhereInput> | null
    mufaOrigen?: XOR<MufaNullableScalarRelationFilter, MufaWhereInput> | null
    posteFin?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    posteInicio?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    proyecto?: XOR<ProyectoScalarRelationFilter, ProyectoWhereInput>
  }

  export type TramoCableOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    tipoCable?: SortOrder
    path?: SortOrder
    colorVisual?: SortOrder
    proyectoId?: SortOrder
    posteInicioId?: SortOrder
    posteFinId?: SortOrder
    mufaOrigenId?: SortOrderInput | SortOrder
    cajaDestinoId?: SortOrderInput | SortOrder
    cajaDestino?: CajaOrderByWithRelationInput
    mufaOrigen?: MufaOrderByWithRelationInput
    posteFin?: PosteOrderByWithRelationInput
    posteInicio?: PosteOrderByWithRelationInput
    proyecto?: ProyectoOrderByWithRelationInput
    _relevance?: TramoCableOrderByRelevanceInput
  }

  export type TramoCableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TramoCableWhereInput | TramoCableWhereInput[]
    OR?: TramoCableWhereInput[]
    NOT?: TramoCableWhereInput | TramoCableWhereInput[]
    nombre?: StringNullableFilter<"TramoCable"> | string | null
    tipoCable?: StringFilter<"TramoCable"> | string
    path?: StringFilter<"TramoCable"> | string
    colorVisual?: StringFilter<"TramoCable"> | string
    proyectoId?: StringFilter<"TramoCable"> | string
    posteInicioId?: StringFilter<"TramoCable"> | string
    posteFinId?: StringFilter<"TramoCable"> | string
    mufaOrigenId?: StringNullableFilter<"TramoCable"> | string | null
    cajaDestinoId?: StringNullableFilter<"TramoCable"> | string | null
    cajaDestino?: XOR<CajaNullableScalarRelationFilter, CajaWhereInput> | null
    mufaOrigen?: XOR<MufaNullableScalarRelationFilter, MufaWhereInput> | null
    posteFin?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    posteInicio?: XOR<PosteScalarRelationFilter, PosteWhereInput>
    proyecto?: XOR<ProyectoScalarRelationFilter, ProyectoWhereInput>
  }, "id">

  export type TramoCableOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    tipoCable?: SortOrder
    path?: SortOrder
    colorVisual?: SortOrder
    proyectoId?: SortOrder
    posteInicioId?: SortOrder
    posteFinId?: SortOrder
    mufaOrigenId?: SortOrderInput | SortOrder
    cajaDestinoId?: SortOrderInput | SortOrder
    _count?: TramoCableCountOrderByAggregateInput
    _max?: TramoCableMaxOrderByAggregateInput
    _min?: TramoCableMinOrderByAggregateInput
  }

  export type TramoCableScalarWhereWithAggregatesInput = {
    AND?: TramoCableScalarWhereWithAggregatesInput | TramoCableScalarWhereWithAggregatesInput[]
    OR?: TramoCableScalarWhereWithAggregatesInput[]
    NOT?: TramoCableScalarWhereWithAggregatesInput | TramoCableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TramoCable"> | string
    nombre?: StringNullableWithAggregatesFilter<"TramoCable"> | string | null
    tipoCable?: StringWithAggregatesFilter<"TramoCable"> | string
    path?: StringWithAggregatesFilter<"TramoCable"> | string
    colorVisual?: StringWithAggregatesFilter<"TramoCable"> | string
    proyectoId?: StringWithAggregatesFilter<"TramoCable"> | string
    posteInicioId?: StringWithAggregatesFilter<"TramoCable"> | string
    posteFinId?: StringWithAggregatesFilter<"TramoCable"> | string
    mufaOrigenId?: StringNullableWithAggregatesFilter<"TramoCable"> | string | null
    cajaDestinoId?: StringNullableWithAggregatesFilter<"TramoCable"> | string | null
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: StringFilter<"Cliente"> | string
    nombre?: StringFilter<"Cliente"> | string
    dni?: StringFilter<"Cliente"> | string
    telefono?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    snMac?: StringNullableFilter<"Cliente"> | string | null
    latitud?: FloatNullableFilter<"Cliente"> | number | null
    longitud?: FloatNullableFilter<"Cliente"> | number | null
    estadoServicio?: StringFilter<"Cliente"> | string
    cajaId?: StringFilter<"Cliente"> | string
    caja?: XOR<CajaScalarRelationFilter, CajaWhereInput>
    averias?: AveriaListRelationFilter
    pagos?: PagoListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    dni?: SortOrder
    telefono?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    snMac?: SortOrderInput | SortOrder
    latitud?: SortOrderInput | SortOrder
    longitud?: SortOrderInput | SortOrder
    estadoServicio?: SortOrder
    cajaId?: SortOrder
    caja?: CajaOrderByWithRelationInput
    averias?: AveriaOrderByRelationAggregateInput
    pagos?: PagoOrderByRelationAggregateInput
    _relevance?: ClienteOrderByRelevanceInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dni?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nombre?: StringFilter<"Cliente"> | string
    telefono?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    snMac?: StringNullableFilter<"Cliente"> | string | null
    latitud?: FloatNullableFilter<"Cliente"> | number | null
    longitud?: FloatNullableFilter<"Cliente"> | number | null
    estadoServicio?: StringFilter<"Cliente"> | string
    cajaId?: StringFilter<"Cliente"> | string
    caja?: XOR<CajaScalarRelationFilter, CajaWhereInput>
    averias?: AveriaListRelationFilter
    pagos?: PagoListRelationFilter
  }, "id" | "dni">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    dni?: SortOrder
    telefono?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    snMac?: SortOrderInput | SortOrder
    latitud?: SortOrderInput | SortOrder
    longitud?: SortOrderInput | SortOrder
    estadoServicio?: SortOrder
    cajaId?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _avg?: ClienteAvgOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
    _sum?: ClienteSumOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cliente"> | string
    nombre?: StringWithAggregatesFilter<"Cliente"> | string
    dni?: StringWithAggregatesFilter<"Cliente"> | string
    telefono?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    snMac?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    latitud?: FloatNullableWithAggregatesFilter<"Cliente"> | number | null
    longitud?: FloatNullableWithAggregatesFilter<"Cliente"> | number | null
    estadoServicio?: StringWithAggregatesFilter<"Cliente"> | string
    cajaId?: StringWithAggregatesFilter<"Cliente"> | string
  }

  export type AveriaWhereInput = {
    AND?: AveriaWhereInput | AveriaWhereInput[]
    OR?: AveriaWhereInput[]
    NOT?: AveriaWhereInput | AveriaWhereInput[]
    id?: StringFilter<"Averia"> | string
    clienteId?: StringFilter<"Averia"> | string
    tecnicoId?: StringNullableFilter<"Averia"> | string | null
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    tecnico?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }

  export type AveriaOrderByWithRelationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    tecnicoId?: SortOrderInput | SortOrder
    cliente?: ClienteOrderByWithRelationInput
    tecnico?: UsuarioOrderByWithRelationInput
    _relevance?: AveriaOrderByRelevanceInput
  }

  export type AveriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AveriaWhereInput | AveriaWhereInput[]
    OR?: AveriaWhereInput[]
    NOT?: AveriaWhereInput | AveriaWhereInput[]
    clienteId?: StringFilter<"Averia"> | string
    tecnicoId?: StringNullableFilter<"Averia"> | string | null
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    tecnico?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }, "id">

  export type AveriaOrderByWithAggregationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    tecnicoId?: SortOrderInput | SortOrder
    _count?: AveriaCountOrderByAggregateInput
    _max?: AveriaMaxOrderByAggregateInput
    _min?: AveriaMinOrderByAggregateInput
  }

  export type AveriaScalarWhereWithAggregatesInput = {
    AND?: AveriaScalarWhereWithAggregatesInput | AveriaScalarWhereWithAggregatesInput[]
    OR?: AveriaScalarWhereWithAggregatesInput[]
    NOT?: AveriaScalarWhereWithAggregatesInput | AveriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Averia"> | string
    clienteId?: StringWithAggregatesFilter<"Averia"> | string
    tecnicoId?: StringNullableWithAggregatesFilter<"Averia"> | string | null
  }

  export type PagoWhereInput = {
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    id?: StringFilter<"Pago"> | string
    clienteId?: StringFilter<"Pago"> | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
  }

  export type PagoOrderByWithRelationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    _relevance?: PagoOrderByRelevanceInput
  }

  export type PagoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    clienteId?: StringFilter<"Pago"> | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
  }, "id">

  export type PagoOrderByWithAggregationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    _count?: PagoCountOrderByAggregateInput
    _max?: PagoMaxOrderByAggregateInput
    _min?: PagoMinOrderByAggregateInput
  }

  export type PagoScalarWhereWithAggregatesInput = {
    AND?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    OR?: PagoScalarWhereWithAggregatesInput[]
    NOT?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pago"> | string
    clienteId?: StringWithAggregatesFilter<"Pago"> | string
  }

  export type ProyectoCreateInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    tramos?: TramoCableCreateNestedManyWithoutProyectoInput
    troncales?: TroncalCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoUncheckedCreateInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    tramos?: TramoCableUncheckedCreateNestedManyWithoutProyectoInput
    troncales?: TroncalUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramos?: TramoCableUpdateManyWithoutProyectoNestedInput
    troncales?: TroncalUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramos?: TramoCableUncheckedUpdateManyWithoutProyectoNestedInput
    troncales?: TroncalUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectoCreateManyInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
  }

  export type ProyectoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: $Enums.Rol
    activo?: boolean
    creadoEn?: Date | string
    averiasAsignadas?: AveriaCreateNestedManyWithoutTecnicoInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: $Enums.Rol
    activo?: boolean
    creadoEn?: Date | string
    averiasAsignadas?: AveriaUncheckedCreateNestedManyWithoutTecnicoInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    averiasAsignadas?: AveriaUpdateManyWithoutTecnicoNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    averiasAsignadas?: AveriaUncheckedUpdateManyWithoutTecnicoNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: $Enums.Rol
    activo?: boolean
    creadoEn?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TroncalCreateInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    creadoEn?: Date | string
    mufas?: MufaCreateNestedManyWithoutTroncalInput
    proyecto: ProyectoCreateNestedOneWithoutTroncalesInput
  }

  export type TroncalUncheckedCreateInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    proyectoId: string
    creadoEn?: Date | string
    mufas?: MufaUncheckedCreateNestedManyWithoutTroncalInput
  }

  export type TroncalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUpdateManyWithoutTroncalNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTroncalesNestedInput
  }

  export type TroncalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    proyectoId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUncheckedUpdateManyWithoutTroncalNestedInput
  }

  export type TroncalCreateManyInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    proyectoId: string
    creadoEn?: Date | string
  }

  export type TroncalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TroncalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    proyectoId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MufaCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutMufaInput
    poste: PosteCreateNestedOneWithoutMufasInput
    troncal: TroncalCreateNestedOneWithoutMufasInput
    tramosOrigen?: TramoCableCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaUncheckedCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    posteId: string
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutMufaInput
    tramosOrigen?: TramoCableUncheckedCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutMufaNestedInput
    poste?: PosteUpdateOneRequiredWithoutMufasNestedInput
    troncal?: TroncalUpdateOneRequiredWithoutMufasNestedInput
    tramosOrigen?: TramoCableUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutMufaNestedInput
    tramosOrigen?: TramoCableUncheckedUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaCreateManyInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    posteId: string
    creadoEn?: Date | string
  }

  export type MufaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MufaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CajaCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    creadoEn?: Date | string
    mufa: MufaCreateNestedOneWithoutCajasInput
    poste: PosteCreateNestedOneWithoutCajasInput
    clientes?: ClienteCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaUncheckedCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    posteId: string
    creadoEn?: Date | string
    clientes?: ClienteUncheckedCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableUncheckedCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufa?: MufaUpdateOneRequiredWithoutCajasNestedInput
    poste?: PosteUpdateOneRequiredWithoutCajasNestedInput
    clientes?: ClienteUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    clientes?: ClienteUncheckedUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUncheckedUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaCreateManyInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    posteId: string
    creadoEn?: Date | string
  }

  export type CajaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CajaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosteCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutPosteInput
    mufas?: MufaCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteUncheckedCreateInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutPosteInput
    mufas?: MufaUncheckedCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableUncheckedCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableUncheckedCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutPosteNestedInput
    mufas?: MufaUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutPosteNestedInput
    mufas?: MufaUncheckedUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUncheckedUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUncheckedUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteCreateManyInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
  }

  export type PosteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TramoCableCreateInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    cajaDestino?: CajaCreateNestedOneWithoutTramosDestinoInput
    mufaOrigen?: MufaCreateNestedOneWithoutTramosOrigenInput
    posteFin: PosteCreateNestedOneWithoutTramosFinInput
    posteInicio: PosteCreateNestedOneWithoutTramosInicioInput
    proyecto: ProyectoCreateNestedOneWithoutTramosInput
  }

  export type TramoCableUncheckedCreateInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    cajaDestino?: CajaUpdateOneWithoutTramosDestinoNestedInput
    mufaOrigen?: MufaUpdateOneWithoutTramosOrigenNestedInput
    posteFin?: PosteUpdateOneRequiredWithoutTramosFinNestedInput
    posteInicio?: PosteUpdateOneRequiredWithoutTramosInicioNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTramosNestedInput
  }

  export type TramoCableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableCreateManyInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
  }

  export type TramoCableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClienteCreateInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    caja: CajaCreateNestedOneWithoutClientesInput
    averias?: AveriaCreateNestedManyWithoutClienteInput
    pagos?: PagoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    cajaId: string
    averias?: AveriaUncheckedCreateNestedManyWithoutClienteInput
    pagos?: PagoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    caja?: CajaUpdateOneRequiredWithoutClientesNestedInput
    averias?: AveriaUpdateManyWithoutClienteNestedInput
    pagos?: PagoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    cajaId?: StringFieldUpdateOperationsInput | string
    averias?: AveriaUncheckedUpdateManyWithoutClienteNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    cajaId: string
  }

  export type ClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    cajaId?: StringFieldUpdateOperationsInput | string
  }

  export type AveriaCreateInput = {
    id?: string
    cliente: ClienteCreateNestedOneWithoutAveriasInput
    tecnico?: UsuarioCreateNestedOneWithoutAveriasAsignadasInput
  }

  export type AveriaUncheckedCreateInput = {
    id?: string
    clienteId: string
    tecnicoId?: string | null
  }

  export type AveriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cliente?: ClienteUpdateOneRequiredWithoutAveriasNestedInput
    tecnico?: UsuarioUpdateOneWithoutAveriasAsignadasNestedInput
  }

  export type AveriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    tecnicoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AveriaCreateManyInput = {
    id?: string
    clienteId: string
    tecnicoId?: string | null
  }

  export type AveriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type AveriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    tecnicoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoCreateInput = {
    id?: string
    cliente: ClienteCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateInput = {
    id?: string
    clienteId: string
  }

  export type PagoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cliente?: ClienteUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
  }

  export type PagoCreateManyInput = {
    id?: string
    clienteId: string
  }

  export type PagoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type PagoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type TramoCableListRelationFilter = {
    every?: TramoCableWhereInput
    some?: TramoCableWhereInput
    none?: TramoCableWhereInput
  }

  export type TroncalListRelationFilter = {
    every?: TroncalWhereInput
    some?: TroncalWhereInput
    none?: TroncalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TramoCableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TroncalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProyectoOrderByRelevanceInput = {
    fields: ProyectoOrderByRelevanceFieldEnum | ProyectoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProyectoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProyectoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProyectoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type EnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[]
    notIn?: $Enums.Rol[]
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AveriaListRelationFilter = {
    every?: AveriaWhereInput
    some?: AveriaWhereInput
    none?: AveriaWhereInput
  }

  export type AveriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioOrderByRelevanceInput = {
    fields: UsuarioOrderByRelevanceFieldEnum | UsuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type EnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[]
    notIn?: $Enums.Rol[]
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type MufaListRelationFilter = {
    every?: MufaWhereInput
    some?: MufaWhereInput
    none?: MufaWhereInput
  }

  export type ProyectoScalarRelationFilter = {
    is?: ProyectoWhereInput
    isNot?: ProyectoWhereInput
  }

  export type MufaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TroncalOrderByRelevanceInput = {
    fields: TroncalOrderByRelevanceFieldEnum | TroncalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TroncalCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    bufferColor?: SortOrder
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
    descripcion?: SortOrder
    ruta?: SortOrder
    proyectoId?: SortOrder
    creadoEn?: SortOrder
  }

  export type TroncalAvgOrderByAggregateInput = {
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
  }

  export type TroncalMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    bufferColor?: SortOrder
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
    descripcion?: SortOrder
    ruta?: SortOrder
    proyectoId?: SortOrder
    creadoEn?: SortOrder
  }

  export type TroncalMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    bufferColor?: SortOrder
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
    descripcion?: SortOrder
    ruta?: SortOrder
    proyectoId?: SortOrder
    creadoEn?: SortOrder
  }

  export type TroncalSumOrderByAggregateInput = {
    cantHilos?: SortOrder
    hilosLibres?: SortOrder
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CajaListRelationFilter = {
    every?: CajaWhereInput
    some?: CajaWhereInput
    none?: CajaWhereInput
  }

  export type PosteScalarRelationFilter = {
    is?: PosteWhereInput
    isNot?: PosteWhereInput
  }

  export type TroncalScalarRelationFilter = {
    is?: TroncalWhereInput
    isNot?: TroncalWhereInput
  }

  export type CajaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MufaOrderByRelevanceInput = {
    fields: MufaOrderByRelevanceFieldEnum | MufaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MufaCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    bufferEntrada?: SortOrder
    hiloEntrada?: SortOrder
    ratioSplitteo?: SortOrder
    hilosDisponibles?: SortOrder
    troncalId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type MufaAvgOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
    hiloEntrada?: SortOrder
    hilosDisponibles?: SortOrder
  }

  export type MufaMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    bufferEntrada?: SortOrder
    hiloEntrada?: SortOrder
    ratioSplitteo?: SortOrder
    hilosDisponibles?: SortOrder
    troncalId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type MufaMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    bufferEntrada?: SortOrder
    hiloEntrada?: SortOrder
    ratioSplitteo?: SortOrder
    hilosDisponibles?: SortOrder
    troncalId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type MufaSumOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
    hiloEntrada?: SortOrder
    hilosDisponibles?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type MufaScalarRelationFilter = {
    is?: MufaWhereInput
    isNot?: MufaWhereInput
  }

  export type ClienteListRelationFilter = {
    every?: ClienteWhereInput
    some?: ClienteWhereInput
    none?: ClienteWhereInput
  }

  export type ClienteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CajaOrderByRelevanceInput = {
    fields: CajaOrderByRelevanceFieldEnum | CajaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CajaCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    colorHiloCaja?: SortOrder
    puertosLibres?: SortOrder
    mufaId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type CajaAvgOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
    puertosLibres?: SortOrder
  }

  export type CajaMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    colorHiloCaja?: SortOrder
    puertosLibres?: SortOrder
    mufaId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type CajaMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    colorHiloCaja?: SortOrder
    puertosLibres?: SortOrder
    mufaId?: SortOrder
    posteId?: SortOrder
    creadoEn?: SortOrder
  }

  export type CajaSumOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
    puertosLibres?: SortOrder
  }

  export type PosteOrderByRelevanceInput = {
    fields: PosteOrderByRelevanceFieldEnum | PosteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PosteCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    tipo?: SortOrder
    altura?: SortOrder
    creadoEn?: SortOrder
  }

  export type PosteAvgOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type PosteMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    tipo?: SortOrder
    altura?: SortOrder
    creadoEn?: SortOrder
  }

  export type PosteMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    tipo?: SortOrder
    altura?: SortOrder
    creadoEn?: SortOrder
  }

  export type PosteSumOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type CajaNullableScalarRelationFilter = {
    is?: CajaWhereInput | null
    isNot?: CajaWhereInput | null
  }

  export type MufaNullableScalarRelationFilter = {
    is?: MufaWhereInput | null
    isNot?: MufaWhereInput | null
  }

  export type TramoCableOrderByRelevanceInput = {
    fields: TramoCableOrderByRelevanceFieldEnum | TramoCableOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TramoCableCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipoCable?: SortOrder
    path?: SortOrder
    colorVisual?: SortOrder
    proyectoId?: SortOrder
    posteInicioId?: SortOrder
    posteFinId?: SortOrder
    mufaOrigenId?: SortOrder
    cajaDestinoId?: SortOrder
  }

  export type TramoCableMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipoCable?: SortOrder
    path?: SortOrder
    colorVisual?: SortOrder
    proyectoId?: SortOrder
    posteInicioId?: SortOrder
    posteFinId?: SortOrder
    mufaOrigenId?: SortOrder
    cajaDestinoId?: SortOrder
  }

  export type TramoCableMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipoCable?: SortOrder
    path?: SortOrder
    colorVisual?: SortOrder
    proyectoId?: SortOrder
    posteInicioId?: SortOrder
    posteFinId?: SortOrder
    mufaOrigenId?: SortOrder
    cajaDestinoId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CajaScalarRelationFilter = {
    is?: CajaWhereInput
    isNot?: CajaWhereInput
  }

  export type PagoListRelationFilter = {
    every?: PagoWhereInput
    some?: PagoWhereInput
    none?: PagoWhereInput
  }

  export type PagoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteOrderByRelevanceInput = {
    fields: ClienteOrderByRelevanceFieldEnum | ClienteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    dni?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    snMac?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    estadoServicio?: SortOrder
    cajaId?: SortOrder
  }

  export type ClienteAvgOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    dni?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    snMac?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    estadoServicio?: SortOrder
    cajaId?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    dni?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    snMac?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    estadoServicio?: SortOrder
    cajaId?: SortOrder
  }

  export type ClienteSumOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ClienteScalarRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type AveriaOrderByRelevanceInput = {
    fields: AveriaOrderByRelevanceFieldEnum | AveriaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AveriaCountOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    tecnicoId?: SortOrder
  }

  export type AveriaMaxOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    tecnicoId?: SortOrder
  }

  export type AveriaMinOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    tecnicoId?: SortOrder
  }

  export type PagoOrderByRelevanceInput = {
    fields: PagoOrderByRelevanceFieldEnum | PagoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PagoCountOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
  }

  export type PagoMaxOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
  }

  export type PagoMinOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
  }

  export type TramoCableCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput> | TramoCableCreateWithoutProyectoInput[] | TramoCableUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutProyectoInput | TramoCableCreateOrConnectWithoutProyectoInput[]
    createMany?: TramoCableCreateManyProyectoInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type TroncalCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput> | TroncalCreateWithoutProyectoInput[] | TroncalUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TroncalCreateOrConnectWithoutProyectoInput | TroncalCreateOrConnectWithoutProyectoInput[]
    createMany?: TroncalCreateManyProyectoInputEnvelope
    connect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
  }

  export type TramoCableUncheckedCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput> | TramoCableCreateWithoutProyectoInput[] | TramoCableUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutProyectoInput | TramoCableCreateOrConnectWithoutProyectoInput[]
    createMany?: TramoCableCreateManyProyectoInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type TroncalUncheckedCreateNestedManyWithoutProyectoInput = {
    create?: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput> | TroncalCreateWithoutProyectoInput[] | TroncalUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TroncalCreateOrConnectWithoutProyectoInput | TroncalCreateOrConnectWithoutProyectoInput[]
    createMany?: TroncalCreateManyProyectoInputEnvelope
    connect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TramoCableUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput> | TramoCableCreateWithoutProyectoInput[] | TramoCableUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutProyectoInput | TramoCableCreateOrConnectWithoutProyectoInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutProyectoInput | TramoCableUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TramoCableCreateManyProyectoInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutProyectoInput | TramoCableUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutProyectoInput | TramoCableUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type TroncalUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput> | TroncalCreateWithoutProyectoInput[] | TroncalUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TroncalCreateOrConnectWithoutProyectoInput | TroncalCreateOrConnectWithoutProyectoInput[]
    upsert?: TroncalUpsertWithWhereUniqueWithoutProyectoInput | TroncalUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TroncalCreateManyProyectoInputEnvelope
    set?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    disconnect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    delete?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    connect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    update?: TroncalUpdateWithWhereUniqueWithoutProyectoInput | TroncalUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TroncalUpdateManyWithWhereWithoutProyectoInput | TroncalUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TroncalScalarWhereInput | TroncalScalarWhereInput[]
  }

  export type TramoCableUncheckedUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput> | TramoCableCreateWithoutProyectoInput[] | TramoCableUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutProyectoInput | TramoCableCreateOrConnectWithoutProyectoInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutProyectoInput | TramoCableUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TramoCableCreateManyProyectoInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutProyectoInput | TramoCableUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutProyectoInput | TramoCableUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type TroncalUncheckedUpdateManyWithoutProyectoNestedInput = {
    create?: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput> | TroncalCreateWithoutProyectoInput[] | TroncalUncheckedCreateWithoutProyectoInput[]
    connectOrCreate?: TroncalCreateOrConnectWithoutProyectoInput | TroncalCreateOrConnectWithoutProyectoInput[]
    upsert?: TroncalUpsertWithWhereUniqueWithoutProyectoInput | TroncalUpsertWithWhereUniqueWithoutProyectoInput[]
    createMany?: TroncalCreateManyProyectoInputEnvelope
    set?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    disconnect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    delete?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    connect?: TroncalWhereUniqueInput | TroncalWhereUniqueInput[]
    update?: TroncalUpdateWithWhereUniqueWithoutProyectoInput | TroncalUpdateWithWhereUniqueWithoutProyectoInput[]
    updateMany?: TroncalUpdateManyWithWhereWithoutProyectoInput | TroncalUpdateManyWithWhereWithoutProyectoInput[]
    deleteMany?: TroncalScalarWhereInput | TroncalScalarWhereInput[]
  }

  export type AveriaCreateNestedManyWithoutTecnicoInput = {
    create?: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput> | AveriaCreateWithoutTecnicoInput[] | AveriaUncheckedCreateWithoutTecnicoInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutTecnicoInput | AveriaCreateOrConnectWithoutTecnicoInput[]
    createMany?: AveriaCreateManyTecnicoInputEnvelope
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
  }

  export type AveriaUncheckedCreateNestedManyWithoutTecnicoInput = {
    create?: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput> | AveriaCreateWithoutTecnicoInput[] | AveriaUncheckedCreateWithoutTecnicoInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutTecnicoInput | AveriaCreateOrConnectWithoutTecnicoInput[]
    createMany?: AveriaCreateManyTecnicoInputEnvelope
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
  }

  export type EnumRolFieldUpdateOperationsInput = {
    set?: $Enums.Rol
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AveriaUpdateManyWithoutTecnicoNestedInput = {
    create?: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput> | AveriaCreateWithoutTecnicoInput[] | AveriaUncheckedCreateWithoutTecnicoInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutTecnicoInput | AveriaCreateOrConnectWithoutTecnicoInput[]
    upsert?: AveriaUpsertWithWhereUniqueWithoutTecnicoInput | AveriaUpsertWithWhereUniqueWithoutTecnicoInput[]
    createMany?: AveriaCreateManyTecnicoInputEnvelope
    set?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    disconnect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    delete?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    update?: AveriaUpdateWithWhereUniqueWithoutTecnicoInput | AveriaUpdateWithWhereUniqueWithoutTecnicoInput[]
    updateMany?: AveriaUpdateManyWithWhereWithoutTecnicoInput | AveriaUpdateManyWithWhereWithoutTecnicoInput[]
    deleteMany?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
  }

  export type AveriaUncheckedUpdateManyWithoutTecnicoNestedInput = {
    create?: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput> | AveriaCreateWithoutTecnicoInput[] | AveriaUncheckedCreateWithoutTecnicoInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutTecnicoInput | AveriaCreateOrConnectWithoutTecnicoInput[]
    upsert?: AveriaUpsertWithWhereUniqueWithoutTecnicoInput | AveriaUpsertWithWhereUniqueWithoutTecnicoInput[]
    createMany?: AveriaCreateManyTecnicoInputEnvelope
    set?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    disconnect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    delete?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    update?: AveriaUpdateWithWhereUniqueWithoutTecnicoInput | AveriaUpdateWithWhereUniqueWithoutTecnicoInput[]
    updateMany?: AveriaUpdateManyWithWhereWithoutTecnicoInput | AveriaUpdateManyWithWhereWithoutTecnicoInput[]
    deleteMany?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
  }

  export type MufaCreateNestedManyWithoutTroncalInput = {
    create?: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput> | MufaCreateWithoutTroncalInput[] | MufaUncheckedCreateWithoutTroncalInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutTroncalInput | MufaCreateOrConnectWithoutTroncalInput[]
    createMany?: MufaCreateManyTroncalInputEnvelope
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
  }

  export type ProyectoCreateNestedOneWithoutTroncalesInput = {
    create?: XOR<ProyectoCreateWithoutTroncalesInput, ProyectoUncheckedCreateWithoutTroncalesInput>
    connectOrCreate?: ProyectoCreateOrConnectWithoutTroncalesInput
    connect?: ProyectoWhereUniqueInput
  }

  export type MufaUncheckedCreateNestedManyWithoutTroncalInput = {
    create?: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput> | MufaCreateWithoutTroncalInput[] | MufaUncheckedCreateWithoutTroncalInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutTroncalInput | MufaCreateOrConnectWithoutTroncalInput[]
    createMany?: MufaCreateManyTroncalInputEnvelope
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MufaUpdateManyWithoutTroncalNestedInput = {
    create?: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput> | MufaCreateWithoutTroncalInput[] | MufaUncheckedCreateWithoutTroncalInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutTroncalInput | MufaCreateOrConnectWithoutTroncalInput[]
    upsert?: MufaUpsertWithWhereUniqueWithoutTroncalInput | MufaUpsertWithWhereUniqueWithoutTroncalInput[]
    createMany?: MufaCreateManyTroncalInputEnvelope
    set?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    disconnect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    delete?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    update?: MufaUpdateWithWhereUniqueWithoutTroncalInput | MufaUpdateWithWhereUniqueWithoutTroncalInput[]
    updateMany?: MufaUpdateManyWithWhereWithoutTroncalInput | MufaUpdateManyWithWhereWithoutTroncalInput[]
    deleteMany?: MufaScalarWhereInput | MufaScalarWhereInput[]
  }

  export type ProyectoUpdateOneRequiredWithoutTroncalesNestedInput = {
    create?: XOR<ProyectoCreateWithoutTroncalesInput, ProyectoUncheckedCreateWithoutTroncalesInput>
    connectOrCreate?: ProyectoCreateOrConnectWithoutTroncalesInput
    upsert?: ProyectoUpsertWithoutTroncalesInput
    connect?: ProyectoWhereUniqueInput
    update?: XOR<XOR<ProyectoUpdateToOneWithWhereWithoutTroncalesInput, ProyectoUpdateWithoutTroncalesInput>, ProyectoUncheckedUpdateWithoutTroncalesInput>
  }

  export type MufaUncheckedUpdateManyWithoutTroncalNestedInput = {
    create?: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput> | MufaCreateWithoutTroncalInput[] | MufaUncheckedCreateWithoutTroncalInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutTroncalInput | MufaCreateOrConnectWithoutTroncalInput[]
    upsert?: MufaUpsertWithWhereUniqueWithoutTroncalInput | MufaUpsertWithWhereUniqueWithoutTroncalInput[]
    createMany?: MufaCreateManyTroncalInputEnvelope
    set?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    disconnect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    delete?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    update?: MufaUpdateWithWhereUniqueWithoutTroncalInput | MufaUpdateWithWhereUniqueWithoutTroncalInput[]
    updateMany?: MufaUpdateManyWithWhereWithoutTroncalInput | MufaUpdateManyWithWhereWithoutTroncalInput[]
    deleteMany?: MufaScalarWhereInput | MufaScalarWhereInput[]
  }

  export type CajaCreateNestedManyWithoutMufaInput = {
    create?: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput> | CajaCreateWithoutMufaInput[] | CajaUncheckedCreateWithoutMufaInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutMufaInput | CajaCreateOrConnectWithoutMufaInput[]
    createMany?: CajaCreateManyMufaInputEnvelope
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
  }

  export type PosteCreateNestedOneWithoutMufasInput = {
    create?: XOR<PosteCreateWithoutMufasInput, PosteUncheckedCreateWithoutMufasInput>
    connectOrCreate?: PosteCreateOrConnectWithoutMufasInput
    connect?: PosteWhereUniqueInput
  }

  export type TroncalCreateNestedOneWithoutMufasInput = {
    create?: XOR<TroncalCreateWithoutMufasInput, TroncalUncheckedCreateWithoutMufasInput>
    connectOrCreate?: TroncalCreateOrConnectWithoutMufasInput
    connect?: TroncalWhereUniqueInput
  }

  export type TramoCableCreateNestedManyWithoutMufaOrigenInput = {
    create?: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput> | TramoCableCreateWithoutMufaOrigenInput[] | TramoCableUncheckedCreateWithoutMufaOrigenInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutMufaOrigenInput | TramoCableCreateOrConnectWithoutMufaOrigenInput[]
    createMany?: TramoCableCreateManyMufaOrigenInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type CajaUncheckedCreateNestedManyWithoutMufaInput = {
    create?: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput> | CajaCreateWithoutMufaInput[] | CajaUncheckedCreateWithoutMufaInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutMufaInput | CajaCreateOrConnectWithoutMufaInput[]
    createMany?: CajaCreateManyMufaInputEnvelope
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
  }

  export type TramoCableUncheckedCreateNestedManyWithoutMufaOrigenInput = {
    create?: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput> | TramoCableCreateWithoutMufaOrigenInput[] | TramoCableUncheckedCreateWithoutMufaOrigenInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutMufaOrigenInput | TramoCableCreateOrConnectWithoutMufaOrigenInput[]
    createMany?: TramoCableCreateManyMufaOrigenInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CajaUpdateManyWithoutMufaNestedInput = {
    create?: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput> | CajaCreateWithoutMufaInput[] | CajaUncheckedCreateWithoutMufaInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutMufaInput | CajaCreateOrConnectWithoutMufaInput[]
    upsert?: CajaUpsertWithWhereUniqueWithoutMufaInput | CajaUpsertWithWhereUniqueWithoutMufaInput[]
    createMany?: CajaCreateManyMufaInputEnvelope
    set?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    disconnect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    delete?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    update?: CajaUpdateWithWhereUniqueWithoutMufaInput | CajaUpdateWithWhereUniqueWithoutMufaInput[]
    updateMany?: CajaUpdateManyWithWhereWithoutMufaInput | CajaUpdateManyWithWhereWithoutMufaInput[]
    deleteMany?: CajaScalarWhereInput | CajaScalarWhereInput[]
  }

  export type PosteUpdateOneRequiredWithoutMufasNestedInput = {
    create?: XOR<PosteCreateWithoutMufasInput, PosteUncheckedCreateWithoutMufasInput>
    connectOrCreate?: PosteCreateOrConnectWithoutMufasInput
    upsert?: PosteUpsertWithoutMufasInput
    connect?: PosteWhereUniqueInput
    update?: XOR<XOR<PosteUpdateToOneWithWhereWithoutMufasInput, PosteUpdateWithoutMufasInput>, PosteUncheckedUpdateWithoutMufasInput>
  }

  export type TroncalUpdateOneRequiredWithoutMufasNestedInput = {
    create?: XOR<TroncalCreateWithoutMufasInput, TroncalUncheckedCreateWithoutMufasInput>
    connectOrCreate?: TroncalCreateOrConnectWithoutMufasInput
    upsert?: TroncalUpsertWithoutMufasInput
    connect?: TroncalWhereUniqueInput
    update?: XOR<XOR<TroncalUpdateToOneWithWhereWithoutMufasInput, TroncalUpdateWithoutMufasInput>, TroncalUncheckedUpdateWithoutMufasInput>
  }

  export type TramoCableUpdateManyWithoutMufaOrigenNestedInput = {
    create?: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput> | TramoCableCreateWithoutMufaOrigenInput[] | TramoCableUncheckedCreateWithoutMufaOrigenInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutMufaOrigenInput | TramoCableCreateOrConnectWithoutMufaOrigenInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutMufaOrigenInput | TramoCableUpsertWithWhereUniqueWithoutMufaOrigenInput[]
    createMany?: TramoCableCreateManyMufaOrigenInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutMufaOrigenInput | TramoCableUpdateWithWhereUniqueWithoutMufaOrigenInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutMufaOrigenInput | TramoCableUpdateManyWithWhereWithoutMufaOrigenInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type CajaUncheckedUpdateManyWithoutMufaNestedInput = {
    create?: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput> | CajaCreateWithoutMufaInput[] | CajaUncheckedCreateWithoutMufaInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutMufaInput | CajaCreateOrConnectWithoutMufaInput[]
    upsert?: CajaUpsertWithWhereUniqueWithoutMufaInput | CajaUpsertWithWhereUniqueWithoutMufaInput[]
    createMany?: CajaCreateManyMufaInputEnvelope
    set?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    disconnect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    delete?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    update?: CajaUpdateWithWhereUniqueWithoutMufaInput | CajaUpdateWithWhereUniqueWithoutMufaInput[]
    updateMany?: CajaUpdateManyWithWhereWithoutMufaInput | CajaUpdateManyWithWhereWithoutMufaInput[]
    deleteMany?: CajaScalarWhereInput | CajaScalarWhereInput[]
  }

  export type TramoCableUncheckedUpdateManyWithoutMufaOrigenNestedInput = {
    create?: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput> | TramoCableCreateWithoutMufaOrigenInput[] | TramoCableUncheckedCreateWithoutMufaOrigenInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutMufaOrigenInput | TramoCableCreateOrConnectWithoutMufaOrigenInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutMufaOrigenInput | TramoCableUpsertWithWhereUniqueWithoutMufaOrigenInput[]
    createMany?: TramoCableCreateManyMufaOrigenInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutMufaOrigenInput | TramoCableUpdateWithWhereUniqueWithoutMufaOrigenInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutMufaOrigenInput | TramoCableUpdateManyWithWhereWithoutMufaOrigenInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type MufaCreateNestedOneWithoutCajasInput = {
    create?: XOR<MufaCreateWithoutCajasInput, MufaUncheckedCreateWithoutCajasInput>
    connectOrCreate?: MufaCreateOrConnectWithoutCajasInput
    connect?: MufaWhereUniqueInput
  }

  export type PosteCreateNestedOneWithoutCajasInput = {
    create?: XOR<PosteCreateWithoutCajasInput, PosteUncheckedCreateWithoutCajasInput>
    connectOrCreate?: PosteCreateOrConnectWithoutCajasInput
    connect?: PosteWhereUniqueInput
  }

  export type ClienteCreateNestedManyWithoutCajaInput = {
    create?: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput> | ClienteCreateWithoutCajaInput[] | ClienteUncheckedCreateWithoutCajaInput[]
    connectOrCreate?: ClienteCreateOrConnectWithoutCajaInput | ClienteCreateOrConnectWithoutCajaInput[]
    createMany?: ClienteCreateManyCajaInputEnvelope
    connect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
  }

  export type TramoCableCreateNestedManyWithoutCajaDestinoInput = {
    create?: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput> | TramoCableCreateWithoutCajaDestinoInput[] | TramoCableUncheckedCreateWithoutCajaDestinoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutCajaDestinoInput | TramoCableCreateOrConnectWithoutCajaDestinoInput[]
    createMany?: TramoCableCreateManyCajaDestinoInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type ClienteUncheckedCreateNestedManyWithoutCajaInput = {
    create?: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput> | ClienteCreateWithoutCajaInput[] | ClienteUncheckedCreateWithoutCajaInput[]
    connectOrCreate?: ClienteCreateOrConnectWithoutCajaInput | ClienteCreateOrConnectWithoutCajaInput[]
    createMany?: ClienteCreateManyCajaInputEnvelope
    connect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
  }

  export type TramoCableUncheckedCreateNestedManyWithoutCajaDestinoInput = {
    create?: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput> | TramoCableCreateWithoutCajaDestinoInput[] | TramoCableUncheckedCreateWithoutCajaDestinoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutCajaDestinoInput | TramoCableCreateOrConnectWithoutCajaDestinoInput[]
    createMany?: TramoCableCreateManyCajaDestinoInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type MufaUpdateOneRequiredWithoutCajasNestedInput = {
    create?: XOR<MufaCreateWithoutCajasInput, MufaUncheckedCreateWithoutCajasInput>
    connectOrCreate?: MufaCreateOrConnectWithoutCajasInput
    upsert?: MufaUpsertWithoutCajasInput
    connect?: MufaWhereUniqueInput
    update?: XOR<XOR<MufaUpdateToOneWithWhereWithoutCajasInput, MufaUpdateWithoutCajasInput>, MufaUncheckedUpdateWithoutCajasInput>
  }

  export type PosteUpdateOneRequiredWithoutCajasNestedInput = {
    create?: XOR<PosteCreateWithoutCajasInput, PosteUncheckedCreateWithoutCajasInput>
    connectOrCreate?: PosteCreateOrConnectWithoutCajasInput
    upsert?: PosteUpsertWithoutCajasInput
    connect?: PosteWhereUniqueInput
    update?: XOR<XOR<PosteUpdateToOneWithWhereWithoutCajasInput, PosteUpdateWithoutCajasInput>, PosteUncheckedUpdateWithoutCajasInput>
  }

  export type ClienteUpdateManyWithoutCajaNestedInput = {
    create?: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput> | ClienteCreateWithoutCajaInput[] | ClienteUncheckedCreateWithoutCajaInput[]
    connectOrCreate?: ClienteCreateOrConnectWithoutCajaInput | ClienteCreateOrConnectWithoutCajaInput[]
    upsert?: ClienteUpsertWithWhereUniqueWithoutCajaInput | ClienteUpsertWithWhereUniqueWithoutCajaInput[]
    createMany?: ClienteCreateManyCajaInputEnvelope
    set?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    disconnect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    delete?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    connect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    update?: ClienteUpdateWithWhereUniqueWithoutCajaInput | ClienteUpdateWithWhereUniqueWithoutCajaInput[]
    updateMany?: ClienteUpdateManyWithWhereWithoutCajaInput | ClienteUpdateManyWithWhereWithoutCajaInput[]
    deleteMany?: ClienteScalarWhereInput | ClienteScalarWhereInput[]
  }

  export type TramoCableUpdateManyWithoutCajaDestinoNestedInput = {
    create?: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput> | TramoCableCreateWithoutCajaDestinoInput[] | TramoCableUncheckedCreateWithoutCajaDestinoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutCajaDestinoInput | TramoCableCreateOrConnectWithoutCajaDestinoInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutCajaDestinoInput | TramoCableUpsertWithWhereUniqueWithoutCajaDestinoInput[]
    createMany?: TramoCableCreateManyCajaDestinoInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutCajaDestinoInput | TramoCableUpdateWithWhereUniqueWithoutCajaDestinoInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutCajaDestinoInput | TramoCableUpdateManyWithWhereWithoutCajaDestinoInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type ClienteUncheckedUpdateManyWithoutCajaNestedInput = {
    create?: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput> | ClienteCreateWithoutCajaInput[] | ClienteUncheckedCreateWithoutCajaInput[]
    connectOrCreate?: ClienteCreateOrConnectWithoutCajaInput | ClienteCreateOrConnectWithoutCajaInput[]
    upsert?: ClienteUpsertWithWhereUniqueWithoutCajaInput | ClienteUpsertWithWhereUniqueWithoutCajaInput[]
    createMany?: ClienteCreateManyCajaInputEnvelope
    set?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    disconnect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    delete?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    connect?: ClienteWhereUniqueInput | ClienteWhereUniqueInput[]
    update?: ClienteUpdateWithWhereUniqueWithoutCajaInput | ClienteUpdateWithWhereUniqueWithoutCajaInput[]
    updateMany?: ClienteUpdateManyWithWhereWithoutCajaInput | ClienteUpdateManyWithWhereWithoutCajaInput[]
    deleteMany?: ClienteScalarWhereInput | ClienteScalarWhereInput[]
  }

  export type TramoCableUncheckedUpdateManyWithoutCajaDestinoNestedInput = {
    create?: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput> | TramoCableCreateWithoutCajaDestinoInput[] | TramoCableUncheckedCreateWithoutCajaDestinoInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutCajaDestinoInput | TramoCableCreateOrConnectWithoutCajaDestinoInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutCajaDestinoInput | TramoCableUpsertWithWhereUniqueWithoutCajaDestinoInput[]
    createMany?: TramoCableCreateManyCajaDestinoInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutCajaDestinoInput | TramoCableUpdateWithWhereUniqueWithoutCajaDestinoInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutCajaDestinoInput | TramoCableUpdateManyWithWhereWithoutCajaDestinoInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type CajaCreateNestedManyWithoutPosteInput = {
    create?: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput> | CajaCreateWithoutPosteInput[] | CajaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutPosteInput | CajaCreateOrConnectWithoutPosteInput[]
    createMany?: CajaCreateManyPosteInputEnvelope
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
  }

  export type MufaCreateNestedManyWithoutPosteInput = {
    create?: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput> | MufaCreateWithoutPosteInput[] | MufaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutPosteInput | MufaCreateOrConnectWithoutPosteInput[]
    createMany?: MufaCreateManyPosteInputEnvelope
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
  }

  export type TramoCableCreateNestedManyWithoutPosteFinInput = {
    create?: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput> | TramoCableCreateWithoutPosteFinInput[] | TramoCableUncheckedCreateWithoutPosteFinInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteFinInput | TramoCableCreateOrConnectWithoutPosteFinInput[]
    createMany?: TramoCableCreateManyPosteFinInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type TramoCableCreateNestedManyWithoutPosteInicioInput = {
    create?: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput> | TramoCableCreateWithoutPosteInicioInput[] | TramoCableUncheckedCreateWithoutPosteInicioInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteInicioInput | TramoCableCreateOrConnectWithoutPosteInicioInput[]
    createMany?: TramoCableCreateManyPosteInicioInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type CajaUncheckedCreateNestedManyWithoutPosteInput = {
    create?: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput> | CajaCreateWithoutPosteInput[] | CajaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutPosteInput | CajaCreateOrConnectWithoutPosteInput[]
    createMany?: CajaCreateManyPosteInputEnvelope
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
  }

  export type MufaUncheckedCreateNestedManyWithoutPosteInput = {
    create?: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput> | MufaCreateWithoutPosteInput[] | MufaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutPosteInput | MufaCreateOrConnectWithoutPosteInput[]
    createMany?: MufaCreateManyPosteInputEnvelope
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
  }

  export type TramoCableUncheckedCreateNestedManyWithoutPosteFinInput = {
    create?: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput> | TramoCableCreateWithoutPosteFinInput[] | TramoCableUncheckedCreateWithoutPosteFinInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteFinInput | TramoCableCreateOrConnectWithoutPosteFinInput[]
    createMany?: TramoCableCreateManyPosteFinInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type TramoCableUncheckedCreateNestedManyWithoutPosteInicioInput = {
    create?: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput> | TramoCableCreateWithoutPosteInicioInput[] | TramoCableUncheckedCreateWithoutPosteInicioInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteInicioInput | TramoCableCreateOrConnectWithoutPosteInicioInput[]
    createMany?: TramoCableCreateManyPosteInicioInputEnvelope
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
  }

  export type CajaUpdateManyWithoutPosteNestedInput = {
    create?: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput> | CajaCreateWithoutPosteInput[] | CajaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutPosteInput | CajaCreateOrConnectWithoutPosteInput[]
    upsert?: CajaUpsertWithWhereUniqueWithoutPosteInput | CajaUpsertWithWhereUniqueWithoutPosteInput[]
    createMany?: CajaCreateManyPosteInputEnvelope
    set?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    disconnect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    delete?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    update?: CajaUpdateWithWhereUniqueWithoutPosteInput | CajaUpdateWithWhereUniqueWithoutPosteInput[]
    updateMany?: CajaUpdateManyWithWhereWithoutPosteInput | CajaUpdateManyWithWhereWithoutPosteInput[]
    deleteMany?: CajaScalarWhereInput | CajaScalarWhereInput[]
  }

  export type MufaUpdateManyWithoutPosteNestedInput = {
    create?: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput> | MufaCreateWithoutPosteInput[] | MufaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutPosteInput | MufaCreateOrConnectWithoutPosteInput[]
    upsert?: MufaUpsertWithWhereUniqueWithoutPosteInput | MufaUpsertWithWhereUniqueWithoutPosteInput[]
    createMany?: MufaCreateManyPosteInputEnvelope
    set?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    disconnect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    delete?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    update?: MufaUpdateWithWhereUniqueWithoutPosteInput | MufaUpdateWithWhereUniqueWithoutPosteInput[]
    updateMany?: MufaUpdateManyWithWhereWithoutPosteInput | MufaUpdateManyWithWhereWithoutPosteInput[]
    deleteMany?: MufaScalarWhereInput | MufaScalarWhereInput[]
  }

  export type TramoCableUpdateManyWithoutPosteFinNestedInput = {
    create?: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput> | TramoCableCreateWithoutPosteFinInput[] | TramoCableUncheckedCreateWithoutPosteFinInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteFinInput | TramoCableCreateOrConnectWithoutPosteFinInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutPosteFinInput | TramoCableUpsertWithWhereUniqueWithoutPosteFinInput[]
    createMany?: TramoCableCreateManyPosteFinInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutPosteFinInput | TramoCableUpdateWithWhereUniqueWithoutPosteFinInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutPosteFinInput | TramoCableUpdateManyWithWhereWithoutPosteFinInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type TramoCableUpdateManyWithoutPosteInicioNestedInput = {
    create?: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput> | TramoCableCreateWithoutPosteInicioInput[] | TramoCableUncheckedCreateWithoutPosteInicioInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteInicioInput | TramoCableCreateOrConnectWithoutPosteInicioInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutPosteInicioInput | TramoCableUpsertWithWhereUniqueWithoutPosteInicioInput[]
    createMany?: TramoCableCreateManyPosteInicioInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutPosteInicioInput | TramoCableUpdateWithWhereUniqueWithoutPosteInicioInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutPosteInicioInput | TramoCableUpdateManyWithWhereWithoutPosteInicioInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type CajaUncheckedUpdateManyWithoutPosteNestedInput = {
    create?: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput> | CajaCreateWithoutPosteInput[] | CajaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: CajaCreateOrConnectWithoutPosteInput | CajaCreateOrConnectWithoutPosteInput[]
    upsert?: CajaUpsertWithWhereUniqueWithoutPosteInput | CajaUpsertWithWhereUniqueWithoutPosteInput[]
    createMany?: CajaCreateManyPosteInputEnvelope
    set?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    disconnect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    delete?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    connect?: CajaWhereUniqueInput | CajaWhereUniqueInput[]
    update?: CajaUpdateWithWhereUniqueWithoutPosteInput | CajaUpdateWithWhereUniqueWithoutPosteInput[]
    updateMany?: CajaUpdateManyWithWhereWithoutPosteInput | CajaUpdateManyWithWhereWithoutPosteInput[]
    deleteMany?: CajaScalarWhereInput | CajaScalarWhereInput[]
  }

  export type MufaUncheckedUpdateManyWithoutPosteNestedInput = {
    create?: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput> | MufaCreateWithoutPosteInput[] | MufaUncheckedCreateWithoutPosteInput[]
    connectOrCreate?: MufaCreateOrConnectWithoutPosteInput | MufaCreateOrConnectWithoutPosteInput[]
    upsert?: MufaUpsertWithWhereUniqueWithoutPosteInput | MufaUpsertWithWhereUniqueWithoutPosteInput[]
    createMany?: MufaCreateManyPosteInputEnvelope
    set?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    disconnect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    delete?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    connect?: MufaWhereUniqueInput | MufaWhereUniqueInput[]
    update?: MufaUpdateWithWhereUniqueWithoutPosteInput | MufaUpdateWithWhereUniqueWithoutPosteInput[]
    updateMany?: MufaUpdateManyWithWhereWithoutPosteInput | MufaUpdateManyWithWhereWithoutPosteInput[]
    deleteMany?: MufaScalarWhereInput | MufaScalarWhereInput[]
  }

  export type TramoCableUncheckedUpdateManyWithoutPosteFinNestedInput = {
    create?: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput> | TramoCableCreateWithoutPosteFinInput[] | TramoCableUncheckedCreateWithoutPosteFinInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteFinInput | TramoCableCreateOrConnectWithoutPosteFinInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutPosteFinInput | TramoCableUpsertWithWhereUniqueWithoutPosteFinInput[]
    createMany?: TramoCableCreateManyPosteFinInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutPosteFinInput | TramoCableUpdateWithWhereUniqueWithoutPosteFinInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutPosteFinInput | TramoCableUpdateManyWithWhereWithoutPosteFinInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type TramoCableUncheckedUpdateManyWithoutPosteInicioNestedInput = {
    create?: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput> | TramoCableCreateWithoutPosteInicioInput[] | TramoCableUncheckedCreateWithoutPosteInicioInput[]
    connectOrCreate?: TramoCableCreateOrConnectWithoutPosteInicioInput | TramoCableCreateOrConnectWithoutPosteInicioInput[]
    upsert?: TramoCableUpsertWithWhereUniqueWithoutPosteInicioInput | TramoCableUpsertWithWhereUniqueWithoutPosteInicioInput[]
    createMany?: TramoCableCreateManyPosteInicioInputEnvelope
    set?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    disconnect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    delete?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    connect?: TramoCableWhereUniqueInput | TramoCableWhereUniqueInput[]
    update?: TramoCableUpdateWithWhereUniqueWithoutPosteInicioInput | TramoCableUpdateWithWhereUniqueWithoutPosteInicioInput[]
    updateMany?: TramoCableUpdateManyWithWhereWithoutPosteInicioInput | TramoCableUpdateManyWithWhereWithoutPosteInicioInput[]
    deleteMany?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
  }

  export type CajaCreateNestedOneWithoutTramosDestinoInput = {
    create?: XOR<CajaCreateWithoutTramosDestinoInput, CajaUncheckedCreateWithoutTramosDestinoInput>
    connectOrCreate?: CajaCreateOrConnectWithoutTramosDestinoInput
    connect?: CajaWhereUniqueInput
  }

  export type MufaCreateNestedOneWithoutTramosOrigenInput = {
    create?: XOR<MufaCreateWithoutTramosOrigenInput, MufaUncheckedCreateWithoutTramosOrigenInput>
    connectOrCreate?: MufaCreateOrConnectWithoutTramosOrigenInput
    connect?: MufaWhereUniqueInput
  }

  export type PosteCreateNestedOneWithoutTramosFinInput = {
    create?: XOR<PosteCreateWithoutTramosFinInput, PosteUncheckedCreateWithoutTramosFinInput>
    connectOrCreate?: PosteCreateOrConnectWithoutTramosFinInput
    connect?: PosteWhereUniqueInput
  }

  export type PosteCreateNestedOneWithoutTramosInicioInput = {
    create?: XOR<PosteCreateWithoutTramosInicioInput, PosteUncheckedCreateWithoutTramosInicioInput>
    connectOrCreate?: PosteCreateOrConnectWithoutTramosInicioInput
    connect?: PosteWhereUniqueInput
  }

  export type ProyectoCreateNestedOneWithoutTramosInput = {
    create?: XOR<ProyectoCreateWithoutTramosInput, ProyectoUncheckedCreateWithoutTramosInput>
    connectOrCreate?: ProyectoCreateOrConnectWithoutTramosInput
    connect?: ProyectoWhereUniqueInput
  }

  export type CajaUpdateOneWithoutTramosDestinoNestedInput = {
    create?: XOR<CajaCreateWithoutTramosDestinoInput, CajaUncheckedCreateWithoutTramosDestinoInput>
    connectOrCreate?: CajaCreateOrConnectWithoutTramosDestinoInput
    upsert?: CajaUpsertWithoutTramosDestinoInput
    disconnect?: CajaWhereInput | boolean
    delete?: CajaWhereInput | boolean
    connect?: CajaWhereUniqueInput
    update?: XOR<XOR<CajaUpdateToOneWithWhereWithoutTramosDestinoInput, CajaUpdateWithoutTramosDestinoInput>, CajaUncheckedUpdateWithoutTramosDestinoInput>
  }

  export type MufaUpdateOneWithoutTramosOrigenNestedInput = {
    create?: XOR<MufaCreateWithoutTramosOrigenInput, MufaUncheckedCreateWithoutTramosOrigenInput>
    connectOrCreate?: MufaCreateOrConnectWithoutTramosOrigenInput
    upsert?: MufaUpsertWithoutTramosOrigenInput
    disconnect?: MufaWhereInput | boolean
    delete?: MufaWhereInput | boolean
    connect?: MufaWhereUniqueInput
    update?: XOR<XOR<MufaUpdateToOneWithWhereWithoutTramosOrigenInput, MufaUpdateWithoutTramosOrigenInput>, MufaUncheckedUpdateWithoutTramosOrigenInput>
  }

  export type PosteUpdateOneRequiredWithoutTramosFinNestedInput = {
    create?: XOR<PosteCreateWithoutTramosFinInput, PosteUncheckedCreateWithoutTramosFinInput>
    connectOrCreate?: PosteCreateOrConnectWithoutTramosFinInput
    upsert?: PosteUpsertWithoutTramosFinInput
    connect?: PosteWhereUniqueInput
    update?: XOR<XOR<PosteUpdateToOneWithWhereWithoutTramosFinInput, PosteUpdateWithoutTramosFinInput>, PosteUncheckedUpdateWithoutTramosFinInput>
  }

  export type PosteUpdateOneRequiredWithoutTramosInicioNestedInput = {
    create?: XOR<PosteCreateWithoutTramosInicioInput, PosteUncheckedCreateWithoutTramosInicioInput>
    connectOrCreate?: PosteCreateOrConnectWithoutTramosInicioInput
    upsert?: PosteUpsertWithoutTramosInicioInput
    connect?: PosteWhereUniqueInput
    update?: XOR<XOR<PosteUpdateToOneWithWhereWithoutTramosInicioInput, PosteUpdateWithoutTramosInicioInput>, PosteUncheckedUpdateWithoutTramosInicioInput>
  }

  export type ProyectoUpdateOneRequiredWithoutTramosNestedInput = {
    create?: XOR<ProyectoCreateWithoutTramosInput, ProyectoUncheckedCreateWithoutTramosInput>
    connectOrCreate?: ProyectoCreateOrConnectWithoutTramosInput
    upsert?: ProyectoUpsertWithoutTramosInput
    connect?: ProyectoWhereUniqueInput
    update?: XOR<XOR<ProyectoUpdateToOneWithWhereWithoutTramosInput, ProyectoUpdateWithoutTramosInput>, ProyectoUncheckedUpdateWithoutTramosInput>
  }

  export type CajaCreateNestedOneWithoutClientesInput = {
    create?: XOR<CajaCreateWithoutClientesInput, CajaUncheckedCreateWithoutClientesInput>
    connectOrCreate?: CajaCreateOrConnectWithoutClientesInput
    connect?: CajaWhereUniqueInput
  }

  export type AveriaCreateNestedManyWithoutClienteInput = {
    create?: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput> | AveriaCreateWithoutClienteInput[] | AveriaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutClienteInput | AveriaCreateOrConnectWithoutClienteInput[]
    createMany?: AveriaCreateManyClienteInputEnvelope
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
  }

  export type PagoCreateNestedManyWithoutClienteInput = {
    create?: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput> | PagoCreateWithoutClienteInput[] | PagoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutClienteInput | PagoCreateOrConnectWithoutClienteInput[]
    createMany?: PagoCreateManyClienteInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type AveriaUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput> | AveriaCreateWithoutClienteInput[] | AveriaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutClienteInput | AveriaCreateOrConnectWithoutClienteInput[]
    createMany?: AveriaCreateManyClienteInputEnvelope
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
  }

  export type PagoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput> | PagoCreateWithoutClienteInput[] | PagoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutClienteInput | PagoCreateOrConnectWithoutClienteInput[]
    createMany?: PagoCreateManyClienteInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CajaUpdateOneRequiredWithoutClientesNestedInput = {
    create?: XOR<CajaCreateWithoutClientesInput, CajaUncheckedCreateWithoutClientesInput>
    connectOrCreate?: CajaCreateOrConnectWithoutClientesInput
    upsert?: CajaUpsertWithoutClientesInput
    connect?: CajaWhereUniqueInput
    update?: XOR<XOR<CajaUpdateToOneWithWhereWithoutClientesInput, CajaUpdateWithoutClientesInput>, CajaUncheckedUpdateWithoutClientesInput>
  }

  export type AveriaUpdateManyWithoutClienteNestedInput = {
    create?: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput> | AveriaCreateWithoutClienteInput[] | AveriaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutClienteInput | AveriaCreateOrConnectWithoutClienteInput[]
    upsert?: AveriaUpsertWithWhereUniqueWithoutClienteInput | AveriaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: AveriaCreateManyClienteInputEnvelope
    set?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    disconnect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    delete?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    update?: AveriaUpdateWithWhereUniqueWithoutClienteInput | AveriaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: AveriaUpdateManyWithWhereWithoutClienteInput | AveriaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
  }

  export type PagoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput> | PagoCreateWithoutClienteInput[] | PagoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutClienteInput | PagoCreateOrConnectWithoutClienteInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutClienteInput | PagoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PagoCreateManyClienteInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutClienteInput | PagoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutClienteInput | PagoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type AveriaUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput> | AveriaCreateWithoutClienteInput[] | AveriaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AveriaCreateOrConnectWithoutClienteInput | AveriaCreateOrConnectWithoutClienteInput[]
    upsert?: AveriaUpsertWithWhereUniqueWithoutClienteInput | AveriaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: AveriaCreateManyClienteInputEnvelope
    set?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    disconnect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    delete?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    connect?: AveriaWhereUniqueInput | AveriaWhereUniqueInput[]
    update?: AveriaUpdateWithWhereUniqueWithoutClienteInput | AveriaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: AveriaUpdateManyWithWhereWithoutClienteInput | AveriaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
  }

  export type PagoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput> | PagoCreateWithoutClienteInput[] | PagoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutClienteInput | PagoCreateOrConnectWithoutClienteInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutClienteInput | PagoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PagoCreateManyClienteInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutClienteInput | PagoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutClienteInput | PagoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type ClienteCreateNestedOneWithoutAveriasInput = {
    create?: XOR<ClienteCreateWithoutAveriasInput, ClienteUncheckedCreateWithoutAveriasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutAveriasInput
    connect?: ClienteWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutAveriasAsignadasInput = {
    create?: XOR<UsuarioCreateWithoutAveriasAsignadasInput, UsuarioUncheckedCreateWithoutAveriasAsignadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAveriasAsignadasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ClienteUpdateOneRequiredWithoutAveriasNestedInput = {
    create?: XOR<ClienteCreateWithoutAveriasInput, ClienteUncheckedCreateWithoutAveriasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutAveriasInput
    upsert?: ClienteUpsertWithoutAveriasInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutAveriasInput, ClienteUpdateWithoutAveriasInput>, ClienteUncheckedUpdateWithoutAveriasInput>
  }

  export type UsuarioUpdateOneWithoutAveriasAsignadasNestedInput = {
    create?: XOR<UsuarioCreateWithoutAveriasAsignadasInput, UsuarioUncheckedCreateWithoutAveriasAsignadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAveriasAsignadasInput
    upsert?: UsuarioUpsertWithoutAveriasAsignadasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAveriasAsignadasInput, UsuarioUpdateWithoutAveriasAsignadasInput>, UsuarioUncheckedUpdateWithoutAveriasAsignadasInput>
  }

  export type ClienteCreateNestedOneWithoutPagosInput = {
    create?: XOR<ClienteCreateWithoutPagosInput, ClienteUncheckedCreateWithoutPagosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPagosInput
    connect?: ClienteWhereUniqueInput
  }

  export type ClienteUpdateOneRequiredWithoutPagosNestedInput = {
    create?: XOR<ClienteCreateWithoutPagosInput, ClienteUncheckedCreateWithoutPagosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPagosInput
    upsert?: ClienteUpsertWithoutPagosInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutPagosInput, ClienteUpdateWithoutPagosInput>, ClienteUncheckedUpdateWithoutPagosInput>
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type NestedEnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[]
    notIn?: $Enums.Rol[]
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[]
    notIn?: $Enums.Rol[]
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type TramoCableCreateWithoutProyectoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    cajaDestino?: CajaCreateNestedOneWithoutTramosDestinoInput
    mufaOrigen?: MufaCreateNestedOneWithoutTramosOrigenInput
    posteFin: PosteCreateNestedOneWithoutTramosFinInput
    posteInicio: PosteCreateNestedOneWithoutTramosInicioInput
  }

  export type TramoCableUncheckedCreateWithoutProyectoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableCreateOrConnectWithoutProyectoInput = {
    where: TramoCableWhereUniqueInput
    create: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput>
  }

  export type TramoCableCreateManyProyectoInputEnvelope = {
    data: TramoCableCreateManyProyectoInput | TramoCableCreateManyProyectoInput[]
    skipDuplicates?: boolean
  }

  export type TroncalCreateWithoutProyectoInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    creadoEn?: Date | string
    mufas?: MufaCreateNestedManyWithoutTroncalInput
  }

  export type TroncalUncheckedCreateWithoutProyectoInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    creadoEn?: Date | string
    mufas?: MufaUncheckedCreateNestedManyWithoutTroncalInput
  }

  export type TroncalCreateOrConnectWithoutProyectoInput = {
    where: TroncalWhereUniqueInput
    create: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput>
  }

  export type TroncalCreateManyProyectoInputEnvelope = {
    data: TroncalCreateManyProyectoInput | TroncalCreateManyProyectoInput[]
    skipDuplicates?: boolean
  }

  export type TramoCableUpsertWithWhereUniqueWithoutProyectoInput = {
    where: TramoCableWhereUniqueInput
    update: XOR<TramoCableUpdateWithoutProyectoInput, TramoCableUncheckedUpdateWithoutProyectoInput>
    create: XOR<TramoCableCreateWithoutProyectoInput, TramoCableUncheckedCreateWithoutProyectoInput>
  }

  export type TramoCableUpdateWithWhereUniqueWithoutProyectoInput = {
    where: TramoCableWhereUniqueInput
    data: XOR<TramoCableUpdateWithoutProyectoInput, TramoCableUncheckedUpdateWithoutProyectoInput>
  }

  export type TramoCableUpdateManyWithWhereWithoutProyectoInput = {
    where: TramoCableScalarWhereInput
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyWithoutProyectoInput>
  }

  export type TramoCableScalarWhereInput = {
    AND?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
    OR?: TramoCableScalarWhereInput[]
    NOT?: TramoCableScalarWhereInput | TramoCableScalarWhereInput[]
    id?: StringFilter<"TramoCable"> | string
    nombre?: StringNullableFilter<"TramoCable"> | string | null
    tipoCable?: StringFilter<"TramoCable"> | string
    path?: StringFilter<"TramoCable"> | string
    colorVisual?: StringFilter<"TramoCable"> | string
    proyectoId?: StringFilter<"TramoCable"> | string
    posteInicioId?: StringFilter<"TramoCable"> | string
    posteFinId?: StringFilter<"TramoCable"> | string
    mufaOrigenId?: StringNullableFilter<"TramoCable"> | string | null
    cajaDestinoId?: StringNullableFilter<"TramoCable"> | string | null
  }

  export type TroncalUpsertWithWhereUniqueWithoutProyectoInput = {
    where: TroncalWhereUniqueInput
    update: XOR<TroncalUpdateWithoutProyectoInput, TroncalUncheckedUpdateWithoutProyectoInput>
    create: XOR<TroncalCreateWithoutProyectoInput, TroncalUncheckedCreateWithoutProyectoInput>
  }

  export type TroncalUpdateWithWhereUniqueWithoutProyectoInput = {
    where: TroncalWhereUniqueInput
    data: XOR<TroncalUpdateWithoutProyectoInput, TroncalUncheckedUpdateWithoutProyectoInput>
  }

  export type TroncalUpdateManyWithWhereWithoutProyectoInput = {
    where: TroncalScalarWhereInput
    data: XOR<TroncalUpdateManyMutationInput, TroncalUncheckedUpdateManyWithoutProyectoInput>
  }

  export type TroncalScalarWhereInput = {
    AND?: TroncalScalarWhereInput | TroncalScalarWhereInput[]
    OR?: TroncalScalarWhereInput[]
    NOT?: TroncalScalarWhereInput | TroncalScalarWhereInput[]
    id?: StringFilter<"Troncal"> | string
    nombre?: StringFilter<"Troncal"> | string
    bufferColor?: StringFilter<"Troncal"> | string
    cantHilos?: IntFilter<"Troncal"> | number
    hilosLibres?: IntFilter<"Troncal"> | number
    descripcion?: StringNullableFilter<"Troncal"> | string | null
    ruta?: StringNullableFilter<"Troncal"> | string | null
    proyectoId?: StringFilter<"Troncal"> | string
    creadoEn?: DateTimeFilter<"Troncal"> | Date | string
  }

  export type AveriaCreateWithoutTecnicoInput = {
    id?: string
    cliente: ClienteCreateNestedOneWithoutAveriasInput
  }

  export type AveriaUncheckedCreateWithoutTecnicoInput = {
    id?: string
    clienteId: string
  }

  export type AveriaCreateOrConnectWithoutTecnicoInput = {
    where: AveriaWhereUniqueInput
    create: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput>
  }

  export type AveriaCreateManyTecnicoInputEnvelope = {
    data: AveriaCreateManyTecnicoInput | AveriaCreateManyTecnicoInput[]
    skipDuplicates?: boolean
  }

  export type AveriaUpsertWithWhereUniqueWithoutTecnicoInput = {
    where: AveriaWhereUniqueInput
    update: XOR<AveriaUpdateWithoutTecnicoInput, AveriaUncheckedUpdateWithoutTecnicoInput>
    create: XOR<AveriaCreateWithoutTecnicoInput, AveriaUncheckedCreateWithoutTecnicoInput>
  }

  export type AveriaUpdateWithWhereUniqueWithoutTecnicoInput = {
    where: AveriaWhereUniqueInput
    data: XOR<AveriaUpdateWithoutTecnicoInput, AveriaUncheckedUpdateWithoutTecnicoInput>
  }

  export type AveriaUpdateManyWithWhereWithoutTecnicoInput = {
    where: AveriaScalarWhereInput
    data: XOR<AveriaUpdateManyMutationInput, AveriaUncheckedUpdateManyWithoutTecnicoInput>
  }

  export type AveriaScalarWhereInput = {
    AND?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
    OR?: AveriaScalarWhereInput[]
    NOT?: AveriaScalarWhereInput | AveriaScalarWhereInput[]
    id?: StringFilter<"Averia"> | string
    clienteId?: StringFilter<"Averia"> | string
    tecnicoId?: StringNullableFilter<"Averia"> | string | null
  }

  export type MufaCreateWithoutTroncalInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutMufaInput
    poste: PosteCreateNestedOneWithoutMufasInput
    tramosOrigen?: TramoCableCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaUncheckedCreateWithoutTroncalInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    posteId: string
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutMufaInput
    tramosOrigen?: TramoCableUncheckedCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaCreateOrConnectWithoutTroncalInput = {
    where: MufaWhereUniqueInput
    create: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput>
  }

  export type MufaCreateManyTroncalInputEnvelope = {
    data: MufaCreateManyTroncalInput | MufaCreateManyTroncalInput[]
    skipDuplicates?: boolean
  }

  export type ProyectoCreateWithoutTroncalesInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    tramos?: TramoCableCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoUncheckedCreateWithoutTroncalesInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    tramos?: TramoCableUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoCreateOrConnectWithoutTroncalesInput = {
    where: ProyectoWhereUniqueInput
    create: XOR<ProyectoCreateWithoutTroncalesInput, ProyectoUncheckedCreateWithoutTroncalesInput>
  }

  export type MufaUpsertWithWhereUniqueWithoutTroncalInput = {
    where: MufaWhereUniqueInput
    update: XOR<MufaUpdateWithoutTroncalInput, MufaUncheckedUpdateWithoutTroncalInput>
    create: XOR<MufaCreateWithoutTroncalInput, MufaUncheckedCreateWithoutTroncalInput>
  }

  export type MufaUpdateWithWhereUniqueWithoutTroncalInput = {
    where: MufaWhereUniqueInput
    data: XOR<MufaUpdateWithoutTroncalInput, MufaUncheckedUpdateWithoutTroncalInput>
  }

  export type MufaUpdateManyWithWhereWithoutTroncalInput = {
    where: MufaScalarWhereInput
    data: XOR<MufaUpdateManyMutationInput, MufaUncheckedUpdateManyWithoutTroncalInput>
  }

  export type MufaScalarWhereInput = {
    AND?: MufaScalarWhereInput | MufaScalarWhereInput[]
    OR?: MufaScalarWhereInput[]
    NOT?: MufaScalarWhereInput | MufaScalarWhereInput[]
    id?: StringFilter<"Mufa"> | string
    codigo?: StringFilter<"Mufa"> | string
    latitud?: FloatFilter<"Mufa"> | number
    longitud?: FloatFilter<"Mufa"> | number
    bufferEntrada?: StringFilter<"Mufa"> | string
    hiloEntrada?: IntFilter<"Mufa"> | number
    ratioSplitteo?: StringFilter<"Mufa"> | string
    hilosDisponibles?: IntFilter<"Mufa"> | number
    troncalId?: StringFilter<"Mufa"> | string
    posteId?: StringFilter<"Mufa"> | string
    creadoEn?: DateTimeFilter<"Mufa"> | Date | string
  }

  export type ProyectoUpsertWithoutTroncalesInput = {
    update: XOR<ProyectoUpdateWithoutTroncalesInput, ProyectoUncheckedUpdateWithoutTroncalesInput>
    create: XOR<ProyectoCreateWithoutTroncalesInput, ProyectoUncheckedCreateWithoutTroncalesInput>
    where?: ProyectoWhereInput
  }

  export type ProyectoUpdateToOneWithWhereWithoutTroncalesInput = {
    where?: ProyectoWhereInput
    data: XOR<ProyectoUpdateWithoutTroncalesInput, ProyectoUncheckedUpdateWithoutTroncalesInput>
  }

  export type ProyectoUpdateWithoutTroncalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramos?: TramoCableUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectoUncheckedUpdateWithoutTroncalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramos?: TramoCableUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type CajaCreateWithoutMufaInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    creadoEn?: Date | string
    poste: PosteCreateNestedOneWithoutCajasInput
    clientes?: ClienteCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaUncheckedCreateWithoutMufaInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    posteId: string
    creadoEn?: Date | string
    clientes?: ClienteUncheckedCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableUncheckedCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaCreateOrConnectWithoutMufaInput = {
    where: CajaWhereUniqueInput
    create: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput>
  }

  export type CajaCreateManyMufaInputEnvelope = {
    data: CajaCreateManyMufaInput | CajaCreateManyMufaInput[]
    skipDuplicates?: boolean
  }

  export type PosteCreateWithoutMufasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteUncheckedCreateWithoutMufasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableUncheckedCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableUncheckedCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteCreateOrConnectWithoutMufasInput = {
    where: PosteWhereUniqueInput
    create: XOR<PosteCreateWithoutMufasInput, PosteUncheckedCreateWithoutMufasInput>
  }

  export type TroncalCreateWithoutMufasInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    creadoEn?: Date | string
    proyecto: ProyectoCreateNestedOneWithoutTroncalesInput
  }

  export type TroncalUncheckedCreateWithoutMufasInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    proyectoId: string
    creadoEn?: Date | string
  }

  export type TroncalCreateOrConnectWithoutMufasInput = {
    where: TroncalWhereUniqueInput
    create: XOR<TroncalCreateWithoutMufasInput, TroncalUncheckedCreateWithoutMufasInput>
  }

  export type TramoCableCreateWithoutMufaOrigenInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    cajaDestino?: CajaCreateNestedOneWithoutTramosDestinoInput
    posteFin: PosteCreateNestedOneWithoutTramosFinInput
    posteInicio: PosteCreateNestedOneWithoutTramosInicioInput
    proyecto: ProyectoCreateNestedOneWithoutTramosInput
  }

  export type TramoCableUncheckedCreateWithoutMufaOrigenInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    cajaDestinoId?: string | null
  }

  export type TramoCableCreateOrConnectWithoutMufaOrigenInput = {
    where: TramoCableWhereUniqueInput
    create: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput>
  }

  export type TramoCableCreateManyMufaOrigenInputEnvelope = {
    data: TramoCableCreateManyMufaOrigenInput | TramoCableCreateManyMufaOrigenInput[]
    skipDuplicates?: boolean
  }

  export type CajaUpsertWithWhereUniqueWithoutMufaInput = {
    where: CajaWhereUniqueInput
    update: XOR<CajaUpdateWithoutMufaInput, CajaUncheckedUpdateWithoutMufaInput>
    create: XOR<CajaCreateWithoutMufaInput, CajaUncheckedCreateWithoutMufaInput>
  }

  export type CajaUpdateWithWhereUniqueWithoutMufaInput = {
    where: CajaWhereUniqueInput
    data: XOR<CajaUpdateWithoutMufaInput, CajaUncheckedUpdateWithoutMufaInput>
  }

  export type CajaUpdateManyWithWhereWithoutMufaInput = {
    where: CajaScalarWhereInput
    data: XOR<CajaUpdateManyMutationInput, CajaUncheckedUpdateManyWithoutMufaInput>
  }

  export type CajaScalarWhereInput = {
    AND?: CajaScalarWhereInput | CajaScalarWhereInput[]
    OR?: CajaScalarWhereInput[]
    NOT?: CajaScalarWhereInput | CajaScalarWhereInput[]
    id?: StringFilter<"Caja"> | string
    codigo?: StringFilter<"Caja"> | string
    latitud?: FloatFilter<"Caja"> | number
    longitud?: FloatFilter<"Caja"> | number
    colorHiloCaja?: StringNullableFilter<"Caja"> | string | null
    puertosLibres?: IntFilter<"Caja"> | number
    mufaId?: StringFilter<"Caja"> | string
    posteId?: StringFilter<"Caja"> | string
    creadoEn?: DateTimeFilter<"Caja"> | Date | string
  }

  export type PosteUpsertWithoutMufasInput = {
    update: XOR<PosteUpdateWithoutMufasInput, PosteUncheckedUpdateWithoutMufasInput>
    create: XOR<PosteCreateWithoutMufasInput, PosteUncheckedCreateWithoutMufasInput>
    where?: PosteWhereInput
  }

  export type PosteUpdateToOneWithWhereWithoutMufasInput = {
    where?: PosteWhereInput
    data: XOR<PosteUpdateWithoutMufasInput, PosteUncheckedUpdateWithoutMufasInput>
  }

  export type PosteUpdateWithoutMufasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteUncheckedUpdateWithoutMufasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUncheckedUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUncheckedUpdateManyWithoutPosteInicioNestedInput
  }

  export type TroncalUpsertWithoutMufasInput = {
    update: XOR<TroncalUpdateWithoutMufasInput, TroncalUncheckedUpdateWithoutMufasInput>
    create: XOR<TroncalCreateWithoutMufasInput, TroncalUncheckedCreateWithoutMufasInput>
    where?: TroncalWhereInput
  }

  export type TroncalUpdateToOneWithWhereWithoutMufasInput = {
    where?: TroncalWhereInput
    data: XOR<TroncalUpdateWithoutMufasInput, TroncalUncheckedUpdateWithoutMufasInput>
  }

  export type TroncalUpdateWithoutMufasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    proyecto?: ProyectoUpdateOneRequiredWithoutTroncalesNestedInput
  }

  export type TroncalUncheckedUpdateWithoutMufasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    proyectoId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TramoCableUpsertWithWhereUniqueWithoutMufaOrigenInput = {
    where: TramoCableWhereUniqueInput
    update: XOR<TramoCableUpdateWithoutMufaOrigenInput, TramoCableUncheckedUpdateWithoutMufaOrigenInput>
    create: XOR<TramoCableCreateWithoutMufaOrigenInput, TramoCableUncheckedCreateWithoutMufaOrigenInput>
  }

  export type TramoCableUpdateWithWhereUniqueWithoutMufaOrigenInput = {
    where: TramoCableWhereUniqueInput
    data: XOR<TramoCableUpdateWithoutMufaOrigenInput, TramoCableUncheckedUpdateWithoutMufaOrigenInput>
  }

  export type TramoCableUpdateManyWithWhereWithoutMufaOrigenInput = {
    where: TramoCableScalarWhereInput
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyWithoutMufaOrigenInput>
  }

  export type MufaCreateWithoutCajasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    creadoEn?: Date | string
    poste: PosteCreateNestedOneWithoutMufasInput
    troncal: TroncalCreateNestedOneWithoutMufasInput
    tramosOrigen?: TramoCableCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaUncheckedCreateWithoutCajasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    posteId: string
    creadoEn?: Date | string
    tramosOrigen?: TramoCableUncheckedCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaCreateOrConnectWithoutCajasInput = {
    where: MufaWhereUniqueInput
    create: XOR<MufaCreateWithoutCajasInput, MufaUncheckedCreateWithoutCajasInput>
  }

  export type PosteCreateWithoutCajasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    mufas?: MufaCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteUncheckedCreateWithoutCajasInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    mufas?: MufaUncheckedCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableUncheckedCreateNestedManyWithoutPosteFinInput
    tramosInicio?: TramoCableUncheckedCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteCreateOrConnectWithoutCajasInput = {
    where: PosteWhereUniqueInput
    create: XOR<PosteCreateWithoutCajasInput, PosteUncheckedCreateWithoutCajasInput>
  }

  export type ClienteCreateWithoutCajaInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    averias?: AveriaCreateNestedManyWithoutClienteInput
    pagos?: PagoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutCajaInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    averias?: AveriaUncheckedCreateNestedManyWithoutClienteInput
    pagos?: PagoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutCajaInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput>
  }

  export type ClienteCreateManyCajaInputEnvelope = {
    data: ClienteCreateManyCajaInput | ClienteCreateManyCajaInput[]
    skipDuplicates?: boolean
  }

  export type TramoCableCreateWithoutCajaDestinoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    mufaOrigen?: MufaCreateNestedOneWithoutTramosOrigenInput
    posteFin: PosteCreateNestedOneWithoutTramosFinInput
    posteInicio: PosteCreateNestedOneWithoutTramosInicioInput
    proyecto: ProyectoCreateNestedOneWithoutTramosInput
  }

  export type TramoCableUncheckedCreateWithoutCajaDestinoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
  }

  export type TramoCableCreateOrConnectWithoutCajaDestinoInput = {
    where: TramoCableWhereUniqueInput
    create: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput>
  }

  export type TramoCableCreateManyCajaDestinoInputEnvelope = {
    data: TramoCableCreateManyCajaDestinoInput | TramoCableCreateManyCajaDestinoInput[]
    skipDuplicates?: boolean
  }

  export type MufaUpsertWithoutCajasInput = {
    update: XOR<MufaUpdateWithoutCajasInput, MufaUncheckedUpdateWithoutCajasInput>
    create: XOR<MufaCreateWithoutCajasInput, MufaUncheckedCreateWithoutCajasInput>
    where?: MufaWhereInput
  }

  export type MufaUpdateToOneWithWhereWithoutCajasInput = {
    where?: MufaWhereInput
    data: XOR<MufaUpdateWithoutCajasInput, MufaUncheckedUpdateWithoutCajasInput>
  }

  export type MufaUpdateWithoutCajasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    poste?: PosteUpdateOneRequiredWithoutMufasNestedInput
    troncal?: TroncalUpdateOneRequiredWithoutMufasNestedInput
    tramosOrigen?: TramoCableUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateWithoutCajasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramosOrigen?: TramoCableUncheckedUpdateManyWithoutMufaOrigenNestedInput
  }

  export type PosteUpsertWithoutCajasInput = {
    update: XOR<PosteUpdateWithoutCajasInput, PosteUncheckedUpdateWithoutCajasInput>
    create: XOR<PosteCreateWithoutCajasInput, PosteUncheckedCreateWithoutCajasInput>
    where?: PosteWhereInput
  }

  export type PosteUpdateToOneWithWhereWithoutCajasInput = {
    where?: PosteWhereInput
    data: XOR<PosteUpdateWithoutCajasInput, PosteUncheckedUpdateWithoutCajasInput>
  }

  export type PosteUpdateWithoutCajasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteUncheckedUpdateWithoutCajasInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUncheckedUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUncheckedUpdateManyWithoutPosteFinNestedInput
    tramosInicio?: TramoCableUncheckedUpdateManyWithoutPosteInicioNestedInput
  }

  export type ClienteUpsertWithWhereUniqueWithoutCajaInput = {
    where: ClienteWhereUniqueInput
    update: XOR<ClienteUpdateWithoutCajaInput, ClienteUncheckedUpdateWithoutCajaInput>
    create: XOR<ClienteCreateWithoutCajaInput, ClienteUncheckedCreateWithoutCajaInput>
  }

  export type ClienteUpdateWithWhereUniqueWithoutCajaInput = {
    where: ClienteWhereUniqueInput
    data: XOR<ClienteUpdateWithoutCajaInput, ClienteUncheckedUpdateWithoutCajaInput>
  }

  export type ClienteUpdateManyWithWhereWithoutCajaInput = {
    where: ClienteScalarWhereInput
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyWithoutCajaInput>
  }

  export type ClienteScalarWhereInput = {
    AND?: ClienteScalarWhereInput | ClienteScalarWhereInput[]
    OR?: ClienteScalarWhereInput[]
    NOT?: ClienteScalarWhereInput | ClienteScalarWhereInput[]
    id?: StringFilter<"Cliente"> | string
    nombre?: StringFilter<"Cliente"> | string
    dni?: StringFilter<"Cliente"> | string
    telefono?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    snMac?: StringNullableFilter<"Cliente"> | string | null
    latitud?: FloatNullableFilter<"Cliente"> | number | null
    longitud?: FloatNullableFilter<"Cliente"> | number | null
    estadoServicio?: StringFilter<"Cliente"> | string
    cajaId?: StringFilter<"Cliente"> | string
  }

  export type TramoCableUpsertWithWhereUniqueWithoutCajaDestinoInput = {
    where: TramoCableWhereUniqueInput
    update: XOR<TramoCableUpdateWithoutCajaDestinoInput, TramoCableUncheckedUpdateWithoutCajaDestinoInput>
    create: XOR<TramoCableCreateWithoutCajaDestinoInput, TramoCableUncheckedCreateWithoutCajaDestinoInput>
  }

  export type TramoCableUpdateWithWhereUniqueWithoutCajaDestinoInput = {
    where: TramoCableWhereUniqueInput
    data: XOR<TramoCableUpdateWithoutCajaDestinoInput, TramoCableUncheckedUpdateWithoutCajaDestinoInput>
  }

  export type TramoCableUpdateManyWithWhereWithoutCajaDestinoInput = {
    where: TramoCableScalarWhereInput
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyWithoutCajaDestinoInput>
  }

  export type CajaCreateWithoutPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    creadoEn?: Date | string
    mufa: MufaCreateNestedOneWithoutCajasInput
    clientes?: ClienteCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaUncheckedCreateWithoutPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    creadoEn?: Date | string
    clientes?: ClienteUncheckedCreateNestedManyWithoutCajaInput
    tramosDestino?: TramoCableUncheckedCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaCreateOrConnectWithoutPosteInput = {
    where: CajaWhereUniqueInput
    create: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput>
  }

  export type CajaCreateManyPosteInputEnvelope = {
    data: CajaCreateManyPosteInput | CajaCreateManyPosteInput[]
    skipDuplicates?: boolean
  }

  export type MufaCreateWithoutPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutMufaInput
    troncal: TroncalCreateNestedOneWithoutMufasInput
    tramosOrigen?: TramoCableCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaUncheckedCreateWithoutPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutMufaInput
    tramosOrigen?: TramoCableUncheckedCreateNestedManyWithoutMufaOrigenInput
  }

  export type MufaCreateOrConnectWithoutPosteInput = {
    where: MufaWhereUniqueInput
    create: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput>
  }

  export type MufaCreateManyPosteInputEnvelope = {
    data: MufaCreateManyPosteInput | MufaCreateManyPosteInput[]
    skipDuplicates?: boolean
  }

  export type TramoCableCreateWithoutPosteFinInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    cajaDestino?: CajaCreateNestedOneWithoutTramosDestinoInput
    mufaOrigen?: MufaCreateNestedOneWithoutTramosOrigenInput
    posteInicio: PosteCreateNestedOneWithoutTramosInicioInput
    proyecto: ProyectoCreateNestedOneWithoutTramosInput
  }

  export type TramoCableUncheckedCreateWithoutPosteFinInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableCreateOrConnectWithoutPosteFinInput = {
    where: TramoCableWhereUniqueInput
    create: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput>
  }

  export type TramoCableCreateManyPosteFinInputEnvelope = {
    data: TramoCableCreateManyPosteFinInput | TramoCableCreateManyPosteFinInput[]
    skipDuplicates?: boolean
  }

  export type TramoCableCreateWithoutPosteInicioInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    cajaDestino?: CajaCreateNestedOneWithoutTramosDestinoInput
    mufaOrigen?: MufaCreateNestedOneWithoutTramosOrigenInput
    posteFin: PosteCreateNestedOneWithoutTramosFinInput
    proyecto: ProyectoCreateNestedOneWithoutTramosInput
  }

  export type TramoCableUncheckedCreateWithoutPosteInicioInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableCreateOrConnectWithoutPosteInicioInput = {
    where: TramoCableWhereUniqueInput
    create: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput>
  }

  export type TramoCableCreateManyPosteInicioInputEnvelope = {
    data: TramoCableCreateManyPosteInicioInput | TramoCableCreateManyPosteInicioInput[]
    skipDuplicates?: boolean
  }

  export type CajaUpsertWithWhereUniqueWithoutPosteInput = {
    where: CajaWhereUniqueInput
    update: XOR<CajaUpdateWithoutPosteInput, CajaUncheckedUpdateWithoutPosteInput>
    create: XOR<CajaCreateWithoutPosteInput, CajaUncheckedCreateWithoutPosteInput>
  }

  export type CajaUpdateWithWhereUniqueWithoutPosteInput = {
    where: CajaWhereUniqueInput
    data: XOR<CajaUpdateWithoutPosteInput, CajaUncheckedUpdateWithoutPosteInput>
  }

  export type CajaUpdateManyWithWhereWithoutPosteInput = {
    where: CajaScalarWhereInput
    data: XOR<CajaUpdateManyMutationInput, CajaUncheckedUpdateManyWithoutPosteInput>
  }

  export type MufaUpsertWithWhereUniqueWithoutPosteInput = {
    where: MufaWhereUniqueInput
    update: XOR<MufaUpdateWithoutPosteInput, MufaUncheckedUpdateWithoutPosteInput>
    create: XOR<MufaCreateWithoutPosteInput, MufaUncheckedCreateWithoutPosteInput>
  }

  export type MufaUpdateWithWhereUniqueWithoutPosteInput = {
    where: MufaWhereUniqueInput
    data: XOR<MufaUpdateWithoutPosteInput, MufaUncheckedUpdateWithoutPosteInput>
  }

  export type MufaUpdateManyWithWhereWithoutPosteInput = {
    where: MufaScalarWhereInput
    data: XOR<MufaUpdateManyMutationInput, MufaUncheckedUpdateManyWithoutPosteInput>
  }

  export type TramoCableUpsertWithWhereUniqueWithoutPosteFinInput = {
    where: TramoCableWhereUniqueInput
    update: XOR<TramoCableUpdateWithoutPosteFinInput, TramoCableUncheckedUpdateWithoutPosteFinInput>
    create: XOR<TramoCableCreateWithoutPosteFinInput, TramoCableUncheckedCreateWithoutPosteFinInput>
  }

  export type TramoCableUpdateWithWhereUniqueWithoutPosteFinInput = {
    where: TramoCableWhereUniqueInput
    data: XOR<TramoCableUpdateWithoutPosteFinInput, TramoCableUncheckedUpdateWithoutPosteFinInput>
  }

  export type TramoCableUpdateManyWithWhereWithoutPosteFinInput = {
    where: TramoCableScalarWhereInput
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyWithoutPosteFinInput>
  }

  export type TramoCableUpsertWithWhereUniqueWithoutPosteInicioInput = {
    where: TramoCableWhereUniqueInput
    update: XOR<TramoCableUpdateWithoutPosteInicioInput, TramoCableUncheckedUpdateWithoutPosteInicioInput>
    create: XOR<TramoCableCreateWithoutPosteInicioInput, TramoCableUncheckedCreateWithoutPosteInicioInput>
  }

  export type TramoCableUpdateWithWhereUniqueWithoutPosteInicioInput = {
    where: TramoCableWhereUniqueInput
    data: XOR<TramoCableUpdateWithoutPosteInicioInput, TramoCableUncheckedUpdateWithoutPosteInicioInput>
  }

  export type TramoCableUpdateManyWithWhereWithoutPosteInicioInput = {
    where: TramoCableScalarWhereInput
    data: XOR<TramoCableUpdateManyMutationInput, TramoCableUncheckedUpdateManyWithoutPosteInicioInput>
  }

  export type CajaCreateWithoutTramosDestinoInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    creadoEn?: Date | string
    mufa: MufaCreateNestedOneWithoutCajasInput
    poste: PosteCreateNestedOneWithoutCajasInput
    clientes?: ClienteCreateNestedManyWithoutCajaInput
  }

  export type CajaUncheckedCreateWithoutTramosDestinoInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    posteId: string
    creadoEn?: Date | string
    clientes?: ClienteUncheckedCreateNestedManyWithoutCajaInput
  }

  export type CajaCreateOrConnectWithoutTramosDestinoInput = {
    where: CajaWhereUniqueInput
    create: XOR<CajaCreateWithoutTramosDestinoInput, CajaUncheckedCreateWithoutTramosDestinoInput>
  }

  export type MufaCreateWithoutTramosOrigenInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutMufaInput
    poste: PosteCreateNestedOneWithoutMufasInput
    troncal: TroncalCreateNestedOneWithoutMufasInput
  }

  export type MufaUncheckedCreateWithoutTramosOrigenInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    posteId: string
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutMufaInput
  }

  export type MufaCreateOrConnectWithoutTramosOrigenInput = {
    where: MufaWhereUniqueInput
    create: XOR<MufaCreateWithoutTramosOrigenInput, MufaUncheckedCreateWithoutTramosOrigenInput>
  }

  export type PosteCreateWithoutTramosFinInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutPosteInput
    mufas?: MufaCreateNestedManyWithoutPosteInput
    tramosInicio?: TramoCableCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteUncheckedCreateWithoutTramosFinInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutPosteInput
    mufas?: MufaUncheckedCreateNestedManyWithoutPosteInput
    tramosInicio?: TramoCableUncheckedCreateNestedManyWithoutPosteInicioInput
  }

  export type PosteCreateOrConnectWithoutTramosFinInput = {
    where: PosteWhereUniqueInput
    create: XOR<PosteCreateWithoutTramosFinInput, PosteUncheckedCreateWithoutTramosFinInput>
  }

  export type PosteCreateWithoutTramosInicioInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaCreateNestedManyWithoutPosteInput
    mufas?: MufaCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableCreateNestedManyWithoutPosteFinInput
  }

  export type PosteUncheckedCreateWithoutTramosInicioInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    tipo?: string
    altura?: string | null
    creadoEn?: Date | string
    cajas?: CajaUncheckedCreateNestedManyWithoutPosteInput
    mufas?: MufaUncheckedCreateNestedManyWithoutPosteInput
    tramosFin?: TramoCableUncheckedCreateNestedManyWithoutPosteFinInput
  }

  export type PosteCreateOrConnectWithoutTramosInicioInput = {
    where: PosteWhereUniqueInput
    create: XOR<PosteCreateWithoutTramosInicioInput, PosteUncheckedCreateWithoutTramosInicioInput>
  }

  export type ProyectoCreateWithoutTramosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    troncales?: TroncalCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoUncheckedCreateWithoutTramosInput = {
    id?: string
    nombre: string
    descripcion?: string | null
    estado?: string
    creadoEn?: Date | string
    troncales?: TroncalUncheckedCreateNestedManyWithoutProyectoInput
  }

  export type ProyectoCreateOrConnectWithoutTramosInput = {
    where: ProyectoWhereUniqueInput
    create: XOR<ProyectoCreateWithoutTramosInput, ProyectoUncheckedCreateWithoutTramosInput>
  }

  export type CajaUpsertWithoutTramosDestinoInput = {
    update: XOR<CajaUpdateWithoutTramosDestinoInput, CajaUncheckedUpdateWithoutTramosDestinoInput>
    create: XOR<CajaCreateWithoutTramosDestinoInput, CajaUncheckedCreateWithoutTramosDestinoInput>
    where?: CajaWhereInput
  }

  export type CajaUpdateToOneWithWhereWithoutTramosDestinoInput = {
    where?: CajaWhereInput
    data: XOR<CajaUpdateWithoutTramosDestinoInput, CajaUncheckedUpdateWithoutTramosDestinoInput>
  }

  export type CajaUpdateWithoutTramosDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufa?: MufaUpdateOneRequiredWithoutCajasNestedInput
    poste?: PosteUpdateOneRequiredWithoutCajasNestedInput
    clientes?: ClienteUpdateManyWithoutCajaNestedInput
  }

  export type CajaUncheckedUpdateWithoutTramosDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    clientes?: ClienteUncheckedUpdateManyWithoutCajaNestedInput
  }

  export type MufaUpsertWithoutTramosOrigenInput = {
    update: XOR<MufaUpdateWithoutTramosOrigenInput, MufaUncheckedUpdateWithoutTramosOrigenInput>
    create: XOR<MufaCreateWithoutTramosOrigenInput, MufaUncheckedCreateWithoutTramosOrigenInput>
    where?: MufaWhereInput
  }

  export type MufaUpdateToOneWithWhereWithoutTramosOrigenInput = {
    where?: MufaWhereInput
    data: XOR<MufaUpdateWithoutTramosOrigenInput, MufaUncheckedUpdateWithoutTramosOrigenInput>
  }

  export type MufaUpdateWithoutTramosOrigenInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutMufaNestedInput
    poste?: PosteUpdateOneRequiredWithoutMufasNestedInput
    troncal?: TroncalUpdateOneRequiredWithoutMufasNestedInput
  }

  export type MufaUncheckedUpdateWithoutTramosOrigenInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutMufaNestedInput
  }

  export type PosteUpsertWithoutTramosFinInput = {
    update: XOR<PosteUpdateWithoutTramosFinInput, PosteUncheckedUpdateWithoutTramosFinInput>
    create: XOR<PosteCreateWithoutTramosFinInput, PosteUncheckedCreateWithoutTramosFinInput>
    where?: PosteWhereInput
  }

  export type PosteUpdateToOneWithWhereWithoutTramosFinInput = {
    where?: PosteWhereInput
    data: XOR<PosteUpdateWithoutTramosFinInput, PosteUncheckedUpdateWithoutTramosFinInput>
  }

  export type PosteUpdateWithoutTramosFinInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutPosteNestedInput
    mufas?: MufaUpdateManyWithoutPosteNestedInput
    tramosInicio?: TramoCableUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteUncheckedUpdateWithoutTramosFinInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutPosteNestedInput
    mufas?: MufaUncheckedUpdateManyWithoutPosteNestedInput
    tramosInicio?: TramoCableUncheckedUpdateManyWithoutPosteInicioNestedInput
  }

  export type PosteUpsertWithoutTramosInicioInput = {
    update: XOR<PosteUpdateWithoutTramosInicioInput, PosteUncheckedUpdateWithoutTramosInicioInput>
    create: XOR<PosteCreateWithoutTramosInicioInput, PosteUncheckedCreateWithoutTramosInicioInput>
    where?: PosteWhereInput
  }

  export type PosteUpdateToOneWithWhereWithoutTramosInicioInput = {
    where?: PosteWhereInput
    data: XOR<PosteUpdateWithoutTramosInicioInput, PosteUncheckedUpdateWithoutTramosInicioInput>
  }

  export type PosteUpdateWithoutTramosInicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutPosteNestedInput
    mufas?: MufaUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUpdateManyWithoutPosteFinNestedInput
  }

  export type PosteUncheckedUpdateWithoutTramosInicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    altura?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutPosteNestedInput
    mufas?: MufaUncheckedUpdateManyWithoutPosteNestedInput
    tramosFin?: TramoCableUncheckedUpdateManyWithoutPosteFinNestedInput
  }

  export type ProyectoUpsertWithoutTramosInput = {
    update: XOR<ProyectoUpdateWithoutTramosInput, ProyectoUncheckedUpdateWithoutTramosInput>
    create: XOR<ProyectoCreateWithoutTramosInput, ProyectoUncheckedCreateWithoutTramosInput>
    where?: ProyectoWhereInput
  }

  export type ProyectoUpdateToOneWithWhereWithoutTramosInput = {
    where?: ProyectoWhereInput
    data: XOR<ProyectoUpdateWithoutTramosInput, ProyectoUncheckedUpdateWithoutTramosInput>
  }

  export type ProyectoUpdateWithoutTramosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    troncales?: TroncalUpdateManyWithoutProyectoNestedInput
  }

  export type ProyectoUncheckedUpdateWithoutTramosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    troncales?: TroncalUncheckedUpdateManyWithoutProyectoNestedInput
  }

  export type CajaCreateWithoutClientesInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    creadoEn?: Date | string
    mufa: MufaCreateNestedOneWithoutCajasInput
    poste: PosteCreateNestedOneWithoutCajasInput
    tramosDestino?: TramoCableCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaUncheckedCreateWithoutClientesInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    posteId: string
    creadoEn?: Date | string
    tramosDestino?: TramoCableUncheckedCreateNestedManyWithoutCajaDestinoInput
  }

  export type CajaCreateOrConnectWithoutClientesInput = {
    where: CajaWhereUniqueInput
    create: XOR<CajaCreateWithoutClientesInput, CajaUncheckedCreateWithoutClientesInput>
  }

  export type AveriaCreateWithoutClienteInput = {
    id?: string
    tecnico?: UsuarioCreateNestedOneWithoutAveriasAsignadasInput
  }

  export type AveriaUncheckedCreateWithoutClienteInput = {
    id?: string
    tecnicoId?: string | null
  }

  export type AveriaCreateOrConnectWithoutClienteInput = {
    where: AveriaWhereUniqueInput
    create: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput>
  }

  export type AveriaCreateManyClienteInputEnvelope = {
    data: AveriaCreateManyClienteInput | AveriaCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type PagoCreateWithoutClienteInput = {
    id?: string
  }

  export type PagoUncheckedCreateWithoutClienteInput = {
    id?: string
  }

  export type PagoCreateOrConnectWithoutClienteInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput>
  }

  export type PagoCreateManyClienteInputEnvelope = {
    data: PagoCreateManyClienteInput | PagoCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type CajaUpsertWithoutClientesInput = {
    update: XOR<CajaUpdateWithoutClientesInput, CajaUncheckedUpdateWithoutClientesInput>
    create: XOR<CajaCreateWithoutClientesInput, CajaUncheckedCreateWithoutClientesInput>
    where?: CajaWhereInput
  }

  export type CajaUpdateToOneWithWhereWithoutClientesInput = {
    where?: CajaWhereInput
    data: XOR<CajaUpdateWithoutClientesInput, CajaUncheckedUpdateWithoutClientesInput>
  }

  export type CajaUpdateWithoutClientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufa?: MufaUpdateOneRequiredWithoutCajasNestedInput
    poste?: PosteUpdateOneRequiredWithoutCajasNestedInput
    tramosDestino?: TramoCableUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateWithoutClientesInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    tramosDestino?: TramoCableUncheckedUpdateManyWithoutCajaDestinoNestedInput
  }

  export type AveriaUpsertWithWhereUniqueWithoutClienteInput = {
    where: AveriaWhereUniqueInput
    update: XOR<AveriaUpdateWithoutClienteInput, AveriaUncheckedUpdateWithoutClienteInput>
    create: XOR<AveriaCreateWithoutClienteInput, AveriaUncheckedCreateWithoutClienteInput>
  }

  export type AveriaUpdateWithWhereUniqueWithoutClienteInput = {
    where: AveriaWhereUniqueInput
    data: XOR<AveriaUpdateWithoutClienteInput, AveriaUncheckedUpdateWithoutClienteInput>
  }

  export type AveriaUpdateManyWithWhereWithoutClienteInput = {
    where: AveriaScalarWhereInput
    data: XOR<AveriaUpdateManyMutationInput, AveriaUncheckedUpdateManyWithoutClienteInput>
  }

  export type PagoUpsertWithWhereUniqueWithoutClienteInput = {
    where: PagoWhereUniqueInput
    update: XOR<PagoUpdateWithoutClienteInput, PagoUncheckedUpdateWithoutClienteInput>
    create: XOR<PagoCreateWithoutClienteInput, PagoUncheckedCreateWithoutClienteInput>
  }

  export type PagoUpdateWithWhereUniqueWithoutClienteInput = {
    where: PagoWhereUniqueInput
    data: XOR<PagoUpdateWithoutClienteInput, PagoUncheckedUpdateWithoutClienteInput>
  }

  export type PagoUpdateManyWithWhereWithoutClienteInput = {
    where: PagoScalarWhereInput
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyWithoutClienteInput>
  }

  export type PagoScalarWhereInput = {
    AND?: PagoScalarWhereInput | PagoScalarWhereInput[]
    OR?: PagoScalarWhereInput[]
    NOT?: PagoScalarWhereInput | PagoScalarWhereInput[]
    id?: StringFilter<"Pago"> | string
    clienteId?: StringFilter<"Pago"> | string
  }

  export type ClienteCreateWithoutAveriasInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    caja: CajaCreateNestedOneWithoutClientesInput
    pagos?: PagoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutAveriasInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    cajaId: string
    pagos?: PagoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutAveriasInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutAveriasInput, ClienteUncheckedCreateWithoutAveriasInput>
  }

  export type UsuarioCreateWithoutAveriasAsignadasInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: $Enums.Rol
    activo?: boolean
    creadoEn?: Date | string
  }

  export type UsuarioUncheckedCreateWithoutAveriasAsignadasInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: $Enums.Rol
    activo?: boolean
    creadoEn?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutAveriasAsignadasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAveriasAsignadasInput, UsuarioUncheckedCreateWithoutAveriasAsignadasInput>
  }

  export type ClienteUpsertWithoutAveriasInput = {
    update: XOR<ClienteUpdateWithoutAveriasInput, ClienteUncheckedUpdateWithoutAveriasInput>
    create: XOR<ClienteCreateWithoutAveriasInput, ClienteUncheckedCreateWithoutAveriasInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutAveriasInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutAveriasInput, ClienteUncheckedUpdateWithoutAveriasInput>
  }

  export type ClienteUpdateWithoutAveriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    caja?: CajaUpdateOneRequiredWithoutClientesNestedInput
    pagos?: PagoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutAveriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    cajaId?: StringFieldUpdateOperationsInput | string
    pagos?: PagoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type UsuarioUpsertWithoutAveriasAsignadasInput = {
    update: XOR<UsuarioUpdateWithoutAveriasAsignadasInput, UsuarioUncheckedUpdateWithoutAveriasAsignadasInput>
    create: XOR<UsuarioCreateWithoutAveriasAsignadasInput, UsuarioUncheckedCreateWithoutAveriasAsignadasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAveriasAsignadasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAveriasAsignadasInput, UsuarioUncheckedUpdateWithoutAveriasAsignadasInput>
  }

  export type UsuarioUpdateWithoutAveriasAsignadasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateWithoutAveriasAsignadasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateWithoutPagosInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    caja: CajaCreateNestedOneWithoutClientesInput
    averias?: AveriaCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutPagosInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
    cajaId: string
    averias?: AveriaUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutPagosInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutPagosInput, ClienteUncheckedCreateWithoutPagosInput>
  }

  export type ClienteUpsertWithoutPagosInput = {
    update: XOR<ClienteUpdateWithoutPagosInput, ClienteUncheckedUpdateWithoutPagosInput>
    create: XOR<ClienteCreateWithoutPagosInput, ClienteUncheckedCreateWithoutPagosInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutPagosInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutPagosInput, ClienteUncheckedUpdateWithoutPagosInput>
  }

  export type ClienteUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    caja?: CajaUpdateOneRequiredWithoutClientesNestedInput
    averias?: AveriaUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    cajaId?: StringFieldUpdateOperationsInput | string
    averias?: AveriaUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type TramoCableCreateManyProyectoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TroncalCreateManyProyectoInput = {
    id?: string
    nombre: string
    bufferColor: string
    cantHilos?: number
    hilosLibres: number
    descripcion?: string | null
    ruta?: string | null
    creadoEn?: Date | string
  }

  export type TramoCableUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    cajaDestino?: CajaUpdateOneWithoutTramosDestinoNestedInput
    mufaOrigen?: MufaUpdateOneWithoutTramosOrigenNestedInput
    posteFin?: PosteUpdateOneRequiredWithoutTramosFinNestedInput
    posteInicio?: PosteUpdateOneRequiredWithoutTramosInicioNestedInput
  }

  export type TramoCableUncheckedUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUncheckedUpdateManyWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TroncalUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUpdateManyWithoutTroncalNestedInput
  }

  export type TroncalUncheckedUpdateWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufas?: MufaUncheckedUpdateManyWithoutTroncalNestedInput
  }

  export type TroncalUncheckedUpdateManyWithoutProyectoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    bufferColor?: StringFieldUpdateOperationsInput | string
    cantHilos?: IntFieldUpdateOperationsInput | number
    hilosLibres?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AveriaCreateManyTecnicoInput = {
    id?: string
    clienteId: string
  }

  export type AveriaUpdateWithoutTecnicoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cliente?: ClienteUpdateOneRequiredWithoutAveriasNestedInput
  }

  export type AveriaUncheckedUpdateWithoutTecnicoInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
  }

  export type AveriaUncheckedUpdateManyWithoutTecnicoInput = {
    id?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
  }

  export type MufaCreateManyTroncalInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    posteId: string
    creadoEn?: Date | string
  }

  export type MufaUpdateWithoutTroncalInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutMufaNestedInput
    poste?: PosteUpdateOneRequiredWithoutMufasNestedInput
    tramosOrigen?: TramoCableUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateWithoutTroncalInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutMufaNestedInput
    tramosOrigen?: TramoCableUncheckedUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateManyWithoutTroncalInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CajaCreateManyMufaInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    posteId: string
    creadoEn?: Date | string
  }

  export type TramoCableCreateManyMufaOrigenInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    cajaDestinoId?: string | null
  }

  export type CajaUpdateWithoutMufaInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    poste?: PosteUpdateOneRequiredWithoutCajasNestedInput
    clientes?: ClienteUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateWithoutMufaInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    clientes?: ClienteUncheckedUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUncheckedUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateManyWithoutMufaInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    posteId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TramoCableUpdateWithoutMufaOrigenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    cajaDestino?: CajaUpdateOneWithoutTramosDestinoNestedInput
    posteFin?: PosteUpdateOneRequiredWithoutTramosFinNestedInput
    posteInicio?: PosteUpdateOneRequiredWithoutTramosInicioNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTramosNestedInput
  }

  export type TramoCableUncheckedUpdateWithoutMufaOrigenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUncheckedUpdateManyWithoutMufaOrigenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClienteCreateManyCajaInput = {
    id?: string
    nombre: string
    dni: string
    telefono?: string | null
    direccion?: string | null
    snMac?: string | null
    latitud?: number | null
    longitud?: number | null
    estadoServicio?: string
  }

  export type TramoCableCreateManyCajaDestinoInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    posteFinId: string
    mufaOrigenId?: string | null
  }

  export type ClienteUpdateWithoutCajaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    averias?: AveriaUpdateManyWithoutClienteNestedInput
    pagos?: PagoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutCajaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
    averias?: AveriaUncheckedUpdateManyWithoutClienteNestedInput
    pagos?: PagoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateManyWithoutCajaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    dni?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    snMac?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableFloatFieldUpdateOperationsInput | number | null
    longitud?: NullableFloatFieldUpdateOperationsInput | number | null
    estadoServicio?: StringFieldUpdateOperationsInput | string
  }

  export type TramoCableUpdateWithoutCajaDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    mufaOrigen?: MufaUpdateOneWithoutTramosOrigenNestedInput
    posteFin?: PosteUpdateOneRequiredWithoutTramosFinNestedInput
    posteInicio?: PosteUpdateOneRequiredWithoutTramosInicioNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTramosNestedInput
  }

  export type TramoCableUncheckedUpdateWithoutCajaDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUncheckedUpdateManyWithoutCajaDestinoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CajaCreateManyPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    colorHiloCaja?: string | null
    puertosLibres?: number
    mufaId: string
    creadoEn?: Date | string
  }

  export type MufaCreateManyPosteInput = {
    id?: string
    codigo: string
    latitud: number
    longitud: number
    bufferEntrada: string
    hiloEntrada: number
    ratioSplitteo?: string
    hilosDisponibles?: number
    troncalId: string
    creadoEn?: Date | string
  }

  export type TramoCableCreateManyPosteFinInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteInicioId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type TramoCableCreateManyPosteInicioInput = {
    id?: string
    nombre?: string | null
    tipoCable: string
    path: string
    colorVisual?: string
    proyectoId: string
    posteFinId: string
    mufaOrigenId?: string | null
    cajaDestinoId?: string | null
  }

  export type CajaUpdateWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    mufa?: MufaUpdateOneRequiredWithoutCajasNestedInput
    clientes?: ClienteUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    clientes?: ClienteUncheckedUpdateManyWithoutCajaNestedInput
    tramosDestino?: TramoCableUncheckedUpdateManyWithoutCajaDestinoNestedInput
  }

  export type CajaUncheckedUpdateManyWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    colorHiloCaja?: NullableStringFieldUpdateOperationsInput | string | null
    puertosLibres?: IntFieldUpdateOperationsInput | number
    mufaId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MufaUpdateWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUpdateManyWithoutMufaNestedInput
    troncal?: TroncalUpdateOneRequiredWithoutMufasNestedInput
    tramosOrigen?: TramoCableUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    cajas?: CajaUncheckedUpdateManyWithoutMufaNestedInput
    tramosOrigen?: TramoCableUncheckedUpdateManyWithoutMufaOrigenNestedInput
  }

  export type MufaUncheckedUpdateManyWithoutPosteInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    latitud?: FloatFieldUpdateOperationsInput | number
    longitud?: FloatFieldUpdateOperationsInput | number
    bufferEntrada?: StringFieldUpdateOperationsInput | string
    hiloEntrada?: IntFieldUpdateOperationsInput | number
    ratioSplitteo?: StringFieldUpdateOperationsInput | string
    hilosDisponibles?: IntFieldUpdateOperationsInput | number
    troncalId?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TramoCableUpdateWithoutPosteFinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    cajaDestino?: CajaUpdateOneWithoutTramosDestinoNestedInput
    mufaOrigen?: MufaUpdateOneWithoutTramosOrigenNestedInput
    posteInicio?: PosteUpdateOneRequiredWithoutTramosInicioNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTramosNestedInput
  }

  export type TramoCableUncheckedUpdateWithoutPosteFinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUncheckedUpdateManyWithoutPosteFinInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteInicioId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUpdateWithoutPosteInicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    cajaDestino?: CajaUpdateOneWithoutTramosDestinoNestedInput
    mufaOrigen?: MufaUpdateOneWithoutTramosOrigenNestedInput
    posteFin?: PosteUpdateOneRequiredWithoutTramosFinNestedInput
    proyecto?: ProyectoUpdateOneRequiredWithoutTramosNestedInput
  }

  export type TramoCableUncheckedUpdateWithoutPosteInicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TramoCableUncheckedUpdateManyWithoutPosteInicioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tipoCable?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    colorVisual?: StringFieldUpdateOperationsInput | string
    proyectoId?: StringFieldUpdateOperationsInput | string
    posteFinId?: StringFieldUpdateOperationsInput | string
    mufaOrigenId?: NullableStringFieldUpdateOperationsInput | string | null
    cajaDestinoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AveriaCreateManyClienteInput = {
    id?: string
    tecnicoId?: string | null
  }

  export type PagoCreateManyClienteInput = {
    id?: string
  }

  export type AveriaUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tecnico?: UsuarioUpdateOneWithoutAveriasAsignadasNestedInput
  }

  export type AveriaUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tecnicoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AveriaUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    tecnicoId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PagoUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type PagoUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type PagoUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
  }



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