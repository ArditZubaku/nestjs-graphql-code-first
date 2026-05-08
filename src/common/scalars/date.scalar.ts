import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("Date", () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description?: string | undefined = "Date custom scalar type";
  // Received from the client
  parseValue: (value: number) => Date | null | undefined
    = (value) => {
      return new Date(value)
    };
  // Returned to the client
  serialize: (value: Date) => number | null | undefined
    = (value) => {
      return value.getTime();
    };

  parseLiteral: (valueNode: ValueNode, variables?: { [key: string]: any; } | null) => Date | null | undefined
    = (ast) => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }

      return null;
    };
}

