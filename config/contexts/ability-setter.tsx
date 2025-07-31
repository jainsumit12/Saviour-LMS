import { AbilityBuilder, createMongoAbility } from "@casl/ability";
export const defineRulesFor = ( options?: string[]) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
    if (options) {
      can("read", [...options]);
    }
  return build();
};