import type { NodePrinter } from '../types';
import { ArrayTypeName } from './ArrayTypeName';
import { AssemblyAssignment } from './AssemblyAssignment';
import { AssemblyBlock } from './AssemblyBlock';
import { AssemblyCall } from './AssemblyCall';
import { AssemblyCase } from './AssemblyCase';
import { AssemblyFor } from './AssemblyFor';
import { AssemblyFunctionDefinition } from './AssemblyFunctionDefinition';
import { AssemblyIf } from './AssemblyIf';
import { AssemblyLocalDefinition } from './AssemblyLocalDefinition';
import { AssemblyMemberAccess } from './AssemblyMemberAccess';
import { AssemblyStackAssignment } from './AssemblyStackAssignment';
import { AssemblySwitch } from './AssemblySwitch';
import { BinaryOperation } from './BinaryOperation';
import { Block } from './Block';
import { BooleanLiteral } from './BooleanLiteral';
import { Break } from './Break';
import { BreakStatement } from './BreakStatement';
import { CatchClause } from './CatchClause';
import { Conditional } from './Conditional';
import { Continue } from './Continue';
import { ContinueStatement } from './ContinueStatement';
import { ContractDefinition } from './ContractDefinition';
import { CustomErrorDefinition } from './CustomErrorDefinition';
import { DecimalNumber } from './DecimalNumber';
import { DoWhileStatement } from './DoWhileStatement';
import { ElementaryTypeName } from './ElementaryTypeName';
import { EmitStatement } from './EmitStatement';
import { EnumDefinition } from './EnumDefinition';
import { EnumValue } from './EnumValue';
import { EventDefinition } from './EventDefinition';
import { ExpressionStatement } from './ExpressionStatement';
import { FileLevelConstant } from './FileLevelConstant';
import { ForStatement } from './ForStatement';
import { FunctionCall } from './FunctionCall';
import { FunctionDefinition } from './FunctionDefinition';
import { FunctionTypeName } from './FunctionTypeName';
import { HexLiteral } from './HexLiteral';
import { HexNumber } from './HexNumber';
import { Identifier } from './Identifier';
import { IfStatement } from './IfStatement';
import { ImportDirective } from './ImportDirective';
import { IndexAccess } from './IndexAccess';
import { IndexRangeAccess } from './IndexRangeAccess';
import { InheritanceSpecifier } from './InheritanceSpecifier';
import { InlineAssemblyStatement } from './InlineAssemblyStatement';
import { LabelDefinition } from './LabelDefinition';
import { Mapping } from './Mapping';
import { MemberAccess } from './MemberAccess';
import { ModifierDefinition } from './ModifierDefinition';
import { ModifierInvocation } from './ModifierInvocation';
import { NameValueExpression } from './NameValueExpression';
import { NameValueList } from './NameValueList';
import { NewExpression } from './NewExpression';
import { NumberLiteral } from './NumberLiteral';
import { PragmaDirective } from './PragmaDirective';
import { ReturnStatement } from './ReturnStatement';
import { RevertStatement } from './RevertStatement';
import { SourceUnit } from './SourceUnit';
import { StateVariableDeclaration } from './StateVariableDeclaration';
import { StringLiteral } from './StringLiteral';
import { StructDefinition } from './StructDefinition';
import { ThrowStatement } from './ThrowStatement';
import { TryStatement } from './TryStatement';
import { TupleExpression } from './TupleExpression';
import { TypeDefinition } from './TypeDefinition';
import { UnaryOperation } from './UnaryOperation';
import { UncheckedStatement } from './UncheckedStatement';
import { UserDefinedTypeName } from './UserDefinedTypeName';
import { UsingForDeclaration } from './UsingForDeclaration';
import { VariableDeclaration } from './VariableDeclaration';
import { VariableDeclarationStatement } from './VariableDeclarationStatement';
import { WhileStatement } from './WhileStatement';

// TODO remove mockPrinter when parser updates
const mockPrinter: NodePrinter = {
  print: ({}) => {
    return '';
  }
};

export default {
  AssemblyFunctionReturns: mockPrinter,
  SubAssembly: mockPrinter,
  ArrayTypeName,
  AssemblyAssignment,
  AssemblyBlock,
  AssemblyCall,
  AssemblyCase,
  AssemblyFor,
  AssemblyFunctionDefinition,
  AssemblyIf,
  AssemblyLocalDefinition,
  AssemblyMemberAccess,
  AssemblyStackAssignment,
  AssemblySwitch,
  BinaryOperation,
  Block,
  BooleanLiteral,
  Break,
  BreakStatement,
  CatchClause,
  Conditional,
  Continue,
  ContinueStatement,
  ContractDefinition,
  CustomErrorDefinition,
  DecimalNumber,
  DoWhileStatement,
  ElementaryTypeName,
  EmitStatement,
  EnumDefinition,
  EnumValue,
  EventDefinition,
  ExpressionStatement,
  FileLevelConstant,
  ForStatement,
  FunctionCall,
  FunctionDefinition,
  FunctionTypeName,
  HexLiteral,
  HexNumber,
  Identifier,
  IfStatement,
  ImportDirective,
  IndexAccess,
  IndexRangeAccess,
  InheritanceSpecifier,
  InlineAssemblyStatement,
  LabelDefinition,
  Mapping,
  MemberAccess,
  ModifierDefinition,
  ModifierInvocation,
  NameValueExpression,
  NameValueList,
  NewExpression,
  NumberLiteral,
  PragmaDirective,
  ReturnStatement,
  RevertStatement,
  SourceUnit,
  StateVariableDeclaration,
  StringLiteral,
  StructDefinition,
  ThrowStatement,
  TryStatement,
  TupleExpression,
  TypeDefinition,
  UnaryOperation,
  UncheckedStatement,
  UserDefinedTypeName,
  UsingForDeclaration,
  VariableDeclaration,
  VariableDeclarationStatement,
  WhileStatement
};
