declare module 'require-all-ts' {
  interface IModules {
    [k: string]: any
  }
  interface IMap<T> {
    (name: string, filepath: string): T;
  }
  interface IFilter {
    (...args: any[]): any
  }
  export interface IOptions {
    excludeDirs?: string | RegExp;
    dirname?: string;
    filter?: string | RegExp | IFilter;
    recursive?: boolean;
    resolve?: (resp: any) => any;
    map?: IMap<string>;
  }

  type otions = string | IOptions;

  const requireAll: (options: otions) => IModules;
  export = requireAll;
}
