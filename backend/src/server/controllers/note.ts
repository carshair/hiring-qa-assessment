import { Body, CookieParams, Get, JsonController, Param, Post } from "routing-controllers";
import { NOTE_ROUTE } from "../../constants";
import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import NoteBody from "../types/NoteBody";
import { login } from "../utils/login";

const Notes = AppDataSource.getRepository(Note);
@JsonController(NOTE_ROUTE)
export default class NoteController {
  @Post()
  async home(@Body() body: NoteBody, @CookieParams() cookies: Record<string, string>) {
    const token = cookies.token;
    await login(token);
    return Notes.save({
      user: {id: body.userId},
      text: body.text,
    });
  }

  @Get('/:noteId')
  async findOne(@Param('noteId') noteId: string, @CookieParams() cookies: Record<string, string>) {
    // Check login token
    await login(cookies.token);
    const note = await Notes.findOne({
      where: {
        id: noteId,
      }
    });
    return note;
  }
}
