export interface ModuleStructure {
  [domainName: string]: {
    domain?: {
      entity?: {
        aggregate?: string[];
        "value-object"?: Record<string, unknown>;
      };
      repository?: string[];
    };
    application?: {
      service?: {
        command?: string[];
        query?: string[];
      };
    };
    infrastructure?: {
      repository?: string[];
    };
    interface?: {
      graphql?: string[];
    };
  };
}