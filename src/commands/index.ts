import { GenerateCommand } from './command';
import { GenerateDomainStructureCommand } from './domain';
import { GenerateQuery } from './queries';

export const COMMANDS = [GenerateDomainStructureCommand, GenerateCommand, GenerateQuery];
