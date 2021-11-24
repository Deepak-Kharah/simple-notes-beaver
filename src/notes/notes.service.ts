import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto) {
    // TODO: Validate createNoteDto
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  findAll(): Promise<NoteDocument[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<NoteDocument> {
    let note: NoteDocument;
    try {
      note = await this.noteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Note does not exist`);
    }

    if (!note) {
      throw new NotFoundException(`Note does not exist`);
    }

    return note;
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDocument> {
    try {
      // TODO: validation
      const updatedNote = await this.noteModel
        .findByIdAndUpdate(id, updateNoteDto, { new: true })
        .exec();
      return updatedNote;
    } catch (error) {
      throw new NotFoundException(`Note does not exist`);
    }
  }

  async remove(id: string): Promise<NoteDocument> {
    let note: NoteDocument;
    try {
      note = await this.noteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Note does not exist`);
    }

    if (!note) {
      throw new NotFoundException(`Note does not exist`);
    }

    try {
      return note.remove();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        `Could not able to delete the note`,
      );
    }
  }
}
