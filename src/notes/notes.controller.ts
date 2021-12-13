import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, NoteReturnDto, UpdateNoteDto } from './dto/note.dto';
import { NoteDocument } from './schemas/note.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/strategy.types';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() request: RequestWithUser,
  ): Promise<NoteReturnDto> {
    const user = request.user;
    return this.notesService.create(createNoteDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() request: RequestWithUser): NoteReturnDto[] {
    const notes = request.user.notes;

    console.log(request.user);

    return notes;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() request: RequestWithUser,
  ): Promise<NoteDocument> {
    const user = request.user;
    return this.notesService.findOne(id, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() request: RequestWithUser,
  ): Promise<NoteDocument> {
    const user = request.user;
    return this.notesService.update(id, updateNoteDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() request: RequestWithUser,
  ): Promise<NoteDocument> {
    const user = request.user;
    return this.notesService.remove(id, user._id);
  }
}
