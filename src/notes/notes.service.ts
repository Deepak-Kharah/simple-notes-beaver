import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/users.schema';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createNoteDto: CreateNoteDto, userId: string) {
    // TODO: Validate createNoteDto

    try {
      const user = (
        await this.userModel.findByIdAndUpdate(
          userId,
          {
            $push: { notes: { $position: 0, $each: [createNoteDto] } },
          },
          { new: true },
        )
      ).toJSON();

      const createdNote = user.notes[0];
      return createdNote;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(`Could not create the note`);
    }
  }

  async findOne(noteId: string, userId: string): Promise<NoteDocument> {
    try {
      const user = await this.userModel.findById(userId, 'notes').exec();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const note = user.notes.id(noteId);

      if (!note) {
        throw new NotFoundException(`Note does not exist`);
      }

      return note;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Note does not exist`);
    }
  }

  async update(
    noteId: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<NoteDocument> {
    try {
      // TODO: validation
      const users = await this.userModel
        .findOneAndUpdate(
          {
            _id: userId,
            'notes._id': noteId,
          },
          {
            $set: {
              'notes.$.title': updateNoteDto.title,
              'notes.$.content': updateNoteDto.content,
            },
          },
          { new: true, projection: 'notes' },
        )
        .exec();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const updatedNote = users.notes.id(noteId);

      if (!updatedNote) {
        throw new NotFoundException(`Note does not exist`);
      }

      return updatedNote;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Note does not exist`);
    }
  }

  async remove(noteId: string, userId: string): Promise<NoteDocument> {
    let note: NoteDocument;
    let user: UserDocument;
    try {
      user = await this.userModel.findById(userId, 'notes').exec();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      note = user.notes.id(noteId);

      if (!note) {
        throw new NotFoundException(`Note does not exist`);
      }
    } catch (error) {
      throw new NotFoundException(`Note does not exist`);
    }

    try {
      await note.remove();
      await user.save();
      return note;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Could not able to delete the note`,
      );
    }
  }
}
