import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NoteDocument, NoteSchema } from 'src/notes/schemas/note.schema';

export type UserDocument = User & Document<string>;

@Schema({ timestamps: true })
export class User extends Document<string> {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [NoteSchema] })
  notes: NoteDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
