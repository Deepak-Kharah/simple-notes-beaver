import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document<string>;

@Schema({ timestamps: true })
export class Note {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
