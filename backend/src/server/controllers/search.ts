import { Body, JsonController, Post } from "routing-controllers";
import { Like } from "typeorm";
import { SEARCH_ROUTE } from "../../constants";
import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import SearchBody from "../types/SearchBody";

const Notes = AppDataSource.getRepository(Note);
@JsonController(SEARCH_ROUTE)
export default class SearchController {
  @Post()
  async home(@Body() body: SearchBody) {
    const notes = await Notes.find({
      relations: ["user"],
      take: body.size,
      skip: body.skip,
      where: {
        text: Like(`%${body.text}%`),
      }
    });
    return notes.map(note=>{
      delete note.user.passwordHash;
      return note;
    });
  }
}