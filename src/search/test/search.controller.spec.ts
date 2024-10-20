import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../search.controller';
import { SearchService } from '../search.service';
import { createMock } from '@golevelup/ts-jest';

describe('search controller', () => {
  let searchService: SearchService;
  let searchController: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        { provide: SearchService, useValue: createMock<SearchService>() },
      ],
    }).compile();
    searchService = module.get<SearchService>(SearchService);
    searchController = module.get<SearchController>(SearchController);
  });

  describe('search', () => {
    it('should be able to perform search', async () => {
      jest
        .spyOn(searchService, 'search')
        .mockImplementation(() => Promise.resolve([]));
      const result = await searchController.search(
        { searchQuery: 'charlotte' },
        {
          limit: 1,
        },
      );
      expect(searchController).toBeDefined();
      expect(result).toStrictEqual([]);
    });
  });
});
