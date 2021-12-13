import { FlattenMaps, LeanDocument } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

import { NoteDocument } from '../schemas/note.schema';

export class CreateNoteDto {
  readonly title: string;
  readonly content: string;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}

export declare type NoteReturnDto = FlattenMaps<LeanDocument<NoteDocument>>;
