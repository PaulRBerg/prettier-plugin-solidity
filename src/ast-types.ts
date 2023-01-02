import type * as AST from '@solidity-parser/parser/src/ast-types';

export const CommentTypes = ['BlockComment', 'LineComment'] as const;

export type CommentTypeString = typeof CommentTypes[number];

export interface BaseComment {
  type: CommentTypeString;
  range?: [number, number];
  loc?: Location;
  raw: string;
  value: string;
}

export interface BlockComment extends BaseComment {
  type: 'BlockComment';
}
export interface LineComment extends BaseComment {
  type: 'LineComment';
}

export type Comment = BlockComment | LineComment;

export interface SourceUnitWithComments extends AST.SourceUnit {
  comments?: Comment[];
}
export interface UserDefinedTypeNameWithComments
  extends AST.UserDefinedTypeName {
  comments?: Comment[];
}

export interface InheritanceSpecifierWithComments
  extends AST.InheritanceSpecifier {
  comments?: Comment[];
}

export interface ContractDefinitionWithComments extends AST.ContractDefinition {
  comments?: Comment[];
}

export interface PragmaDirectiveWithComments extends AST.PragmaDirective {
  comments?: Comment[];
}
export interface StringLiteralWithComments extends AST.StringLiteral {
  comments?: Comment[];
}
export interface IdentifierWithComments extends AST.Identifier {
  comments?: Comment[];
}

export interface ImportDirectiveWithComments extends AST.ImportDirective {
  comments?: Comment[];
}

export interface VariableDeclarationWithComments
  extends AST.VariableDeclaration {
  comments?: Comment[];
}
export interface StateVariableDeclarationVariableWithComments
  extends AST.StateVariableDeclarationVariable {
  comments?: Comment[];
}

export interface StateVariableDeclarationWithComments
  extends AST.StateVariableDeclaration {
  comments?: Comment[];
}
export interface FileLevelConstantWithComments extends AST.FileLevelConstant {
  comments?: Comment[];
}
export interface UsingForDeclarationWithComments
  extends AST.UsingForDeclaration {
  comments?: Comment[];
}
export interface StructDefinitionWithComments extends AST.StructDefinition {
  comments?: Comment[];
}
export interface ModifierDefinitionWithComments extends AST.ModifierDefinition {
  comments?: Comment[];
}
export interface ModifierInvocationWithComments extends AST.ModifierInvocation {
  comments?: Comment[];
}
export interface FunctionDefinitionWithComments extends AST.FunctionDefinition {
  comments?: Comment[];
}

export interface CustomErrorDefinitionWithComments
  extends AST.CustomErrorDefinition {
  comments?: Comment[];
}

export interface TypeDefinitionWithComments extends AST.TypeDefinition {
  comments?: Comment[];
}

export interface RevertStatementWithComments extends AST.RevertStatement {
  comments?: Comment[];
}
export interface EventDefinitionWithComments extends AST.EventDefinition {
  comments?: Comment[];
}
export interface EnumValueWithComments extends AST.EnumValue {
  comments?: Comment[];
}
export interface EnumDefinitionWithComments extends AST.EnumDefinition {
  comments?: Comment[];
}
export interface ArrayTypeNameWithComments extends AST.ArrayTypeName {
  comments?: Comment[];
}
export interface MappingWithComments extends AST.Mapping {
  comments?: Comment[];
}
export interface FunctionTypeNameWithComments extends AST.FunctionTypeName {
  comments?: Comment[];
}

export interface BlockWithComments extends AST.Block {
  comments?: Comment[];
}
export interface ExpressionStatementWithComments
  extends AST.ExpressionStatement {
  comments?: Comment[];
}
export interface IfStatementWithComments extends AST.IfStatement {
  comments?: Comment[];
}
export interface UncheckedStatementWithComments extends AST.UncheckedStatement {
  comments?: Comment[];
}
export interface TryStatementWithComments extends AST.TryStatement {
  comments?: Comment[];
}
export interface CatchClauseWithComments extends AST.CatchClause {
  comments?: Comment[];
}
export interface WhileStatementWithComments extends AST.WhileStatement {
  comments?: Comment[];
}
export interface ForStatementWithComments extends AST.ForStatement {
  comments?: Comment[];
}
export interface InlineAssemblyStatementWithComments
  extends AST.InlineAssemblyStatement {
  comments?: Comment[];
}
export interface DoWhileStatementWithComments extends AST.DoWhileStatement {
  comments?: Comment[];
}
export interface ContinueStatementWithComments extends AST.ContinueStatement {
  comments?: Comment[];
}
export interface BreakWithComments extends AST.Break {
  comments?: Comment[];
}
export interface ContinueWithComments extends AST.Continue {
  comments?: Comment[];
}
export interface BreakStatementWithComments extends AST.BreakStatement {
  comments?: Comment[];
}
export interface ReturnStatementWithComments extends AST.ReturnStatement {
  comments?: Comment[];
}
export interface EmitStatementWithComments extends AST.EmitStatement {
  comments?: Comment[];
}
export interface ThrowStatementWithComments extends AST.ThrowStatement {
  comments?: Comment[];
}
export interface VariableDeclarationStatementWithComments
  extends AST.VariableDeclarationStatement {
  comments?: Comment[];
}
export interface ElementaryTypeNameWithComments extends AST.ElementaryTypeName {
  comments?: Comment[];
}
export interface FunctionCallWithComments extends AST.FunctionCall {
  comments?: Comment[];
}
export interface AssemblyBlockWithComments extends AST.AssemblyBlock {
  comments?: Comment[];
}
export interface AssemblyCallWithComments extends AST.AssemblyCall {
  comments?: Comment[];
}
export interface AssemblyLocalDefinitionWithComments
  extends AST.AssemblyLocalDefinition {
  comments?: Comment[];
}
export interface AssemblyAssignmentWithComments extends AST.AssemblyAssignment {
  comments?: Comment[];
}
export interface AssemblyStackAssignmentWithComments
  extends AST.AssemblyStackAssignment {
  comments?: Comment[];
}
export interface LabelDefinitionWithComments extends AST.LabelDefinition {
  comments?: Comment[];
}
export interface AssemblySwitchWithComments extends AST.AssemblySwitch {
  comments?: Comment[];
}
export interface AssemblyCaseWithComments extends AST.AssemblyCase {
  comments?: Comment[];
}
export interface AssemblyFunctionDefinitionWithComments
  extends AST.AssemblyFunctionDefinition {
  comments?: Comment[];
}
export interface AssemblyFunctionReturnsWithComments
  extends AST.AssemblyFunctionReturns {
  comments?: Comment[];
}
export interface AssemblyForWithComments extends AST.AssemblyFor {
  comments?: Comment[];
}
export interface AssemblyIfWithComments extends AST.AssemblyIf {
  comments?: Comment[];
}
export interface SubAssemblyWithComments extends AST.SubAssembly {
  comments?: Comment[];
}
export interface AssemblyMemberAccessWithComments
  extends AST.AssemblyMemberAccess {
  comments?: Comment[];
}
export interface NewExpressionWithComments extends AST.NewExpression {
  comments?: Comment[];
}
export interface TupleExpressionWithComments extends AST.TupleExpression {
  comments?: Comment[];
}
export interface NameValueExpressionWithComments
  extends AST.NameValueExpression {
  comments?: Comment[];
}
export interface NumberLiteralWithComments extends AST.NumberLiteral {
  comments?: Comment[];
}
export interface BooleanLiteralWithComments extends AST.BooleanLiteral {
  comments?: Comment[];
}
export interface HexLiteralWithComments extends AST.HexLiteral {
  comments?: Comment[];
}

export interface BinaryOperationWithComments extends AST.BinaryOperation {
  comments?: Comment[];
}
export interface UnaryOperationWithComments extends AST.UnaryOperation {
  comments?: Comment[];
}
export interface ConditionalWithComments extends AST.Conditional {
  comments?: Comment[];
}
export interface IndexAccessWithComments extends AST.IndexAccess {
  comments?: Comment[];
}
export interface IndexRangeAccessWithComments extends AST.IndexRangeAccess {
  comments?: Comment[];
}
export interface MemberAccessWithComments extends AST.MemberAccess {
  comments?: Comment[];
}
export interface HexNumberWithComments extends AST.HexNumber {
  comments?: Comment[];
}
export interface DecimalNumberWithComments extends AST.DecimalNumber {
  comments?: Comment[];
}
export interface NameValueListWithComments extends AST.NameValueList {
  comments?: Comment[];
}

export type SimpleStatementWithComments =
  | VariableDeclarationStatementWithComments
  | ExpressionStatementWithComments;

export type AssemblyLiteralWithComments =
  | StringLiteralWithComments
  | BooleanLiteralWithComments
  | DecimalNumberWithComments
  | HexNumberWithComments
  | HexLiteralWithComments;

export type AssemblyExpressionWithComments =
  | AssemblyCallWithComments
  | AssemblyLiteralWithComments;
export type AssemblyItemWithComments =
  | IdentifierWithComments
  | AssemblyBlockWithComments
  | AssemblyExpressionWithComments
  | AssemblyLocalDefinitionWithComments
  | AssemblyAssignmentWithComments
  | AssemblyStackAssignmentWithComments
  | LabelDefinitionWithComments
  | AssemblySwitchWithComments
  | AssemblyFunctionDefinitionWithComments
  | AssemblyForWithComments
  | AssemblyIfWithComments
  | BreakWithComments
  | ContinueWithComments
  | SubAssemblyWithComments
  | NumberLiteralWithComments
  | StringLiteralWithComments
  | HexNumberWithComments
  | HexLiteralWithComments
  | DecimalNumberWithComments;
export type StatementWithComments =
  | IfStatementWithComments
  | WhileStatementWithComments
  | ForStatementWithComments
  | BlockWithComments
  | InlineAssemblyStatementWithComments
  | DoWhileStatementWithComments
  | ContinueStatementWithComments
  | BreakStatementWithComments
  | ReturnStatementWithComments
  | EmitStatementWithComments
  | ThrowStatementWithComments
  | SimpleStatementWithComments
  | VariableDeclarationStatementWithComments
  | UncheckedStatementWithComments
  | TryStatementWithComments
  | RevertStatementWithComments;
export type TypeNameWithComments =
  | ElementaryTypeNameWithComments
  | UserDefinedTypeNameWithComments
  | MappingWithComments
  | ArrayTypeNameWithComments
  | FunctionTypeNameWithComments;
export type PrimaryExpressionWithComments =
  | BooleanLiteralWithComments
  | HexLiteralWithComments
  | StringLiteralWithComments
  | NumberLiteralWithComments
  | IdentifierWithComments
  | TupleExpressionWithComments
  | TypeNameWithComments;
export type ExpressionWithComments =
  | IndexAccessWithComments
  | IndexRangeAccessWithComments
  | TupleExpressionWithComments
  | BinaryOperationWithComments
  | ConditionalWithComments
  | MemberAccessWithComments
  | FunctionCallWithComments
  | UnaryOperationWithComments
  | NewExpressionWithComments
  | PrimaryExpressionWithComments
  | NameValueExpressionWithComments;
export type ASTNodeWithComments =
  | SourceUnitWithComments
  | PragmaDirectiveWithComments
  | ImportDirectiveWithComments
  | ContractDefinitionWithComments
  | InheritanceSpecifierWithComments
  | StateVariableDeclarationWithComments
  | UsingForDeclarationWithComments
  | StructDefinitionWithComments
  | ModifierDefinitionWithComments
  | ModifierInvocationWithComments
  | FunctionDefinitionWithComments
  | EventDefinitionWithComments
  | CustomErrorDefinitionWithComments
  | EnumValueWithComments
  | EnumDefinitionWithComments
  | VariableDeclarationWithComments
  | UserDefinedTypeNameWithComments
  | MappingWithComments
  | ArrayTypeNameWithComments
  | FunctionTypeNameWithComments
  | BlockWithComments
  | StatementWithComments
  | ElementaryTypeNameWithComments
  | AssemblyBlockWithComments
  | AssemblyCallWithComments
  | AssemblyLocalDefinitionWithComments
  | AssemblyAssignmentWithComments
  | AssemblyStackAssignmentWithComments
  | LabelDefinitionWithComments
  | AssemblySwitchWithComments
  | AssemblyCaseWithComments
  | AssemblyFunctionDefinitionWithComments
  | AssemblyFunctionReturnsWithComments
  | AssemblyForWithComments
  | AssemblyIfWithComments
  | AssemblyLiteralWithComments
  | SubAssemblyWithComments
  | TupleExpressionWithComments
  | BinaryOperationWithComments
  | ConditionalWithComments
  | IndexAccessWithComments
  | IndexRangeAccessWithComments
  | AssemblyItemWithComments
  | ExpressionWithComments
  | NameValueListWithComments
  | AssemblyMemberAccessWithComments
  | CatchClauseWithComments
  | FileLevelConstantWithComments
  | TypeDefinitionWithComments;
