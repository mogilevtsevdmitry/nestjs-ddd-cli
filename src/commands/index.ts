import { GenerateCommand } from './command';
import { GenerateDomainStructureCommand } from './domain';
import { GenerateEvent } from './events';
import { GenerateQuery } from './queries';

export const COMMANDS = [GenerateDomainStructureCommand, GenerateCommand, GenerateQuery, GenerateEvent];
