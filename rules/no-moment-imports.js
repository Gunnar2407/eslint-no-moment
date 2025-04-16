const rule = {
    defaultOptions: [],
    meta: {
      type: "problem",
      docs: {
        description: "Disallow imports from the restricted module 'moment'",
        recommended: false,
      },
      messages: {
        restrictedImport: "Importing from '{{importName}}' is restricted.",
      },
      schema: [],
    },
    create(context) {
      function reportIfRestricted(importName, node) {
        if (importName === "moment") {
          context.report({
            node,
            messageId: "restrictedImport",
            data: { importName },
          });
        }
      }
  
      return {
        ImportDeclaration(node) {
          if (
            node.source &&
            node.source.type === "Literal" &&
            node.source.value === "moment"
          ) {
            reportIfRestricted("moment", node.source);
          }
        },
  
        CallExpression(node) {
          if (
            node.callee.type === "Identifier" &&
            node.callee.name === "require" &&
            node.arguments.length > 0 &&
            node.arguments[0].type === "Literal" &&
            node.arguments[0].value === "moment"
          ) {
            reportIfRestricted("moment", node.arguments[0]);
          }
        },
  
        ImportExpression(node) {
          if (
            node.source &&
            node.source.type === "Literal" &&
            node.source.value === "moment"
          ) {
            reportIfRestricted("moment", node.source);
          }
        },
      };
    },
  };
  
  module.exports = rule;