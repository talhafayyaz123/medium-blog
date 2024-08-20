import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './domain/tag';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tags')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOkResponse({
    type: [String],
  })
  async findAll(): Promise<Tag['name'][]> {
    return await this.tagsService.findAll();
  }
}
